(function (Vue) {
    let vm = new Vue({
        el: '#app',
        data: {
            index: 0,
            music: [
                { artist: 'Kevin MacLeod', name: 'Bright_Wish', src: './music/Bright_Wish.mp3', imgSrc: './picture/8C9Evy.png' },
                { artist: 'Kevin MacLeod', name: 'Carny_s_Dance', src: './music/Carny_s_Dance.mp3', imgSrc: './picture/mZdA12.png' },
                { artist: 'Riot', name: 'A_Long_Cold_Sting', src: './music/A_Long_Cold_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80' },
                { artist: 'John Deley and the 41 Players', name: 'Almost_a_Year_Ago_Sting', src: './music/Almost_a_Year_Ago_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1500762728065-466b7a170c96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { artist: 'Riot', name: 'Bomber_Sting', src: './music/Bomber_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1579521368384-d7fb00ac080f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' },
                { artist: 'The 126ers', name: 'On_My_Way_Home_Sting', src: './music/On_My_Way_Home_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1579550752291-74213f625700?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80' },
                { artist: 'The U.S. Marine Corps Band', name: 'Dinner_Chimes', src: './music/Dinner_Chimes.mp3', imgSrc: 'https://images.unsplash.com/photo-1579489667799-0f49a083efc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' },
                { artist: 'John Deley and the 41 Players', name: 'Dixie_Outlandish_Sting', src: './music/Dixie_Outlandish_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
                { artist: 'Riot', name: 'One_Step_Closer', src: './music/One_Step_Closer.mp3', imgSrc: 'https://images.unsplash.com/photo-1578605002661-69450a97476d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80' },
                { artist: 'John Deley and the 41 Players', name: 'Minor_Mush_Sting', src: './music/Minor_Mush_Sting.mp3', imgSrc: 'https://images.unsplash.com/photo-1578283862070-85ed5daa8c9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=281&q=80' },

            ],
            originalMusic: [],
            startMusic: false,//是否開始音樂
            isLoop: 0,
            isShuffle: false,
            currentTime: null,
            durationTime: null,
            touch: false,
            followPage: false,
            playListPage: false,
            AD: 0,
            VIP: false,
            search: '',
        },
        computed: {
            //目前音樂
            nowSong() {
                return this.music[this.index].src;
            },
            //目前播放
            nowPlaying() {
                let audio = document.querySelector('audio');
                return audio;
            },
            //目前時間
            nowTimer() {
                let second = this.currentTime || 0;
                let minute = Math.floor(second / 60);
                if (second >= 60) second = second % 60;
                second < 10 ? second = '0' + second : second;
                return `${minute}:${second}`;
            },
            //剩餘時間
            allTimer() {
                let second = this.durationTime - this.currentTime || 0;
                let minute = Math.floor(second / 60);
                if (second >= 60) second = second % 60;
                second < 10 ? second = '0' + second : second;
                return `${minute}:${second}`;
            },
            //進度條長度
            timeProgress() {
                let progress = (this.currentTime / this.durationTime) * 100 || 0;
                return progress;
            },
        },
        mounted() {
            this.backgroundImgChange();
            this.originalMusic = [...this.music];
        },
        methods: {
            //換背景圖片
            backgroundImgChange() {
                let backgroundImg = document.querySelector('.background');
                let listBackgroundImg = document.querySelector('.play_list');
                backgroundImg.style.backgroundImage = `url(${this.music[this.index].imgSrc})`;
                listBackgroundImg.style.backgroundImage = `url(${this.music[this.index].imgSrc})`;
            },
            //上一首
            previous() {
                let length = this.music.length;
                this.index -= 1;
                this.index = (this.index + length) % length;
                this.backgroundImgChange();
                this.nowPlaying.paused ? this.nowPlaying.autoplay = false : this.nowPlaying.autoplay = true;
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            //下一首
            nextSong() {
                let length = this.music.length;
                this.index += 1;
                this.index = (this.index + length) % length;
                this.backgroundImgChange();
                this.nowPlaying.paused ? this.nowPlaying.autoplay = false : this.nowPlaying.autoplay = true;
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            //播放
            playSong(index = this.index) {
                this.index = index;
                this.nowPlaying.paused ? this.nowPlaying.play() : this.nowPlaying.pause();
                this.nowPlaying.autoplay = true;
                this.backgroundImgChange();
            },
            isPlay() {
                this.startMusic = true;
            },
            isPause() {
                this.startMusic = false;
            },
            //設定循環模式
            loopControl() {
                //0=不循環, 1=循環全部歌單, 2=單曲循環
                if (this.isLoop === 0) {
                    this.isLoop = 1
                    this.nowPlaying.loop = false;
                } else if (this.isLoop === 1) {
                    this.isLoop = 2
                    this.nowPlaying.loop = true;
                } else {
                    this.isLoop = 0
                    this.nowPlaying.loop = false;
                }
            },
            //隨機播放
            shuffle() {
                this.isShuffle === false ? this.isShuffle = true : this.isShuffle = false;
                if (this.isShuffle === true) {
                    //把目前音樂拿出來，其他重新洗牌，再把目前音樂放到第一個
                    let nowMusic = this.music[this.index];
                    this.music.splice(this.index, 1);
                    this.music.sort(() => {
                        return Math.random() > 0.5 ? -1 : 1;
                    })
                    this.music.unshift(nowMusic);
                    this.index = 0;//把音樂指定到第一個
                } else if (this.isShuffle === false) {
                    //把目前音樂記下來，順序還原後，把index指定回原本音樂
                    let nowMusic = this.music[this.index].name;
                    this.music = [...this.originalMusic];
                    this.music.forEach((item, index) => {
                        if (item.name === nowMusic) {
                            this.index = index;
                        }
                    })
                }
                this.backgroundImgChange();
            },
            //下一首
            ended() {
                if (this.isLoop === 0) {
                    this.nextSong();
                } else {
                    this.nextSong();
                    this.nowPlaying.autoplay = true;
                }
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            //廣告時段
            ADTimeSlot() {
                if (this.AD === 3) {
                    this.AD = 0;
                    this.followPage = true;
                    this.nowPlaying.pause();
                    this.isPause();
                    this.nowPlaying.autoplay = false;
                }
            },
            buyVip() {
                this.VIP = true;
            },
            //更新目前時間
            updateTime() {
                this.currentTime = Math.floor(this.nowPlaying.currentTime);
                this.durationTime = Math.floor(this.nowPlaying.duration);
                this.timerBar();
            },
            //進度條
            timerBar() {
                let bar = document.querySelector('.time_bar');
                let barBtn = document.querySelector('.time_bar_btn');
                bar.style.width = `${this.timeProgress}%`;
                barBtn.style.left = `${this.timeProgress}%`;
            },
            //點擊調整進度條
            clickBarTimer(e) {
                if (!this.nowPlaying.currentTime) return;
                let bar = document.querySelector('.time_bar_bg');
                let clickTime = (e.offsetX / bar.offsetWidth) * this.durationTime;
                this.nowPlaying.currentTime = Math.floor(clickTime);
            },
            //(手機觸控)
            moveBarTime(e) {
                if (!this.touch) return;
                this.nowPlaying.pause();
                let rect = e.target.getBoundingClientRect();
                let client = e.touches[0].pageX - rect.width;
                let bar = document.querySelector('.time_bar_bg');
                let clickTime = (client / bar.offsetWidth) * this.durationTime;
                this.nowPlaying.currentTime = Math.floor(clickTime);
            },
            touchStart() {
                this.touch === false ? this.touch = true : this.touch = false;
                if (!this.touch) {
                    this.nowPlaying.play();
                }
            },
            follow() {
                this.followPage === false ? this.followPage = true : this.followPage = false;
            },
            playList() {
                this.playListPage === false ? this.playListPage = true : this.playListPage = false;
            }

        }
    })
})(Vue);
