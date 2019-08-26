let player;
let vm;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'VtOdSAxCufY',
        events: {
            'onStateChange': vm.onPlayerStateChange
        }
    });
}
; (function (Vue) {
    vm = new Vue({
        el: '#app',
        data: {
            music: [
                { id: 'VtOdSAxCufY', artist: 'TaeYeon', song: 'U R', img: './picture/57b7760782cf54e37bf2317906e57bf5.jpg' },
                { id: 'UUb4glO7Ggs', artist: 'TaeYeon', song: 'Four Seasons', img: './picture/KHS_1887_TY_shop1_110904.jpg' },
                { id: 'QZ0Atp720dM', artist: 'TaeYeon', song: 'All About You', img: './picture/papers.co-hq74-taeyeon-girl-kpop-bw-dark-36-3840x2400-4k-wallpaper.jpg' },
                { id: 'rgXIpzHvD-g', artist: 'TaeYeon', song: 'Circus', img: './picture/papers.co-hq60-taeyeon-girl-snsd-black-dark-36-3840x2400-4k-wallpaper.jpg' },
                { id: 'GhvRt0SWyEM', artist: 'TaeYeon', song: 'Time Walking On Memories', img: './picture/C6aO0mlUwAAK38n.jpg' },
                { id: 'bHq8ayg_5OM', artist: 'TaeYeon', song: 'Rain', img: './picture/C8dftlJXcAA1njJ.jpg' },
                { id: 'xgvi8FHEvIk', artist: 'TaeYeon', song: '11:11', img: './picture/taeyeon1.jpg' },
                { id: 'Ogx32-flZKo', artist: 'TaeYeon', song: 'This Christmas', img: './picture/0e9d501db42366a5058d660952936712.jpg' },

            ],
            lyricsUrl: './lyrics.json',
            lyrics: [],
            isLyric: false,
            originalMusic: [],
            index: 0,
            isPlay: false,
            isLoop: 0,
            isShuffle: false,
            currentTime: 0,
            durationTime: 0,
            playList: false,
            AD: 0,
            ADPage: false,
            VIP: false,
            search: '',
        },
        mounted() {
            this.originalMusic = [...this.music];
            this.getLyrics();
            this.backgroundImg();
            this.nowTime();
        },
        computed: {
            current() {
                let minute = Math.floor(this.currentTime / 60);
                let second = this.currentTime % 60;
                second < 10 ? second = '0' + second : second;
                return `${minute}:${second}`
            },
            duration() {
                let minute = Math.floor((this.durationTime - this.currentTime) / 60);
                let second = (this.durationTime - this.currentTime) % 60;
                second < 10 ? second = '0' + second : second;
                return `${minute}:${second}`
            },
        },
        methods: {
            getLyrics(){
                fetch(this.lyricsUrl).then(res=>{
                    return res.json();
                }).then(myJson=>{
                    myJson.forEach(json=>{
                        this.lyrics.push(json);
                    })
                })
            },
            displayLyric(){
                this.isLyric === false ? this.isLyric = true : this.isLyric = false;
            },
            //播放
            playSong() {
                if (this.isPlay) {
                    player.pauseVideo();
                    this.isPlay = false;
                } else {
                    player.playVideo();
                    this.isPlay = true;
                }
            },
            //下一首
            nextSong() {
                this.index = (this.index + this.music.length + 1) % this.music.length;
                if (!this.isPlay) {
                    player.cueVideoById({
                        videoId: this.music[this.index].id
                    });
                } else {
                    player.loadVideoById({
                        videoId: this.music[this.index].id
                    });
                }
                this.backgroundImg();
                this.isLyric = false;
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            //上一首
            rewindSong() {
                this.index = (this.index + this.music.length - 1) % this.music.length;
                if (!this.isPlay) {
                    player.cueVideoById({
                        videoId: this.music[this.index].id
                    });
                } else {
                    player.loadVideoById({
                        videoId: this.music[this.index].id
                    });
                }
                this.backgroundImg();
                this.isLyric = false;
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            //循環模式
            loopControl() {
                if (this.isLoop === 0) {
                    this.isLoop = 1;
                } else if (this.isLoop === 1) {
                    this.isLoop = 2;
                } else {
                    this.isLoop = 0;
                }
            },
            //隨機播放
            shuffleControl() {
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
                    let nowMusic = this.music[this.index].song;
                    this.music = [...this.originalMusic];
                    this.music.forEach((item, index) => {
                        if (item.song === nowMusic) {
                            this.index = index;
                        }
                    })
                }
            },
            nowTime() {
                let timer = setInterval(() => {
                    this.currentTime = Math.floor(player.getCurrentTime());
                    this.durationTime = Math.floor(player.getDuration());
                    this.timeBar();
                }, 1000);
            },
            //換背景
            backgroundImg() {
                let mainBackground = document.querySelector('.main');
                let listBackground = document.querySelector('.main_playlist');
                mainBackground.style.backgroundImage = `url(${this.music[this.index].img})`;
                listBackground.style.backgroundImage = `url(${this.music[this.index].img})`;
            },
            //時間條
            timeBar() {
                let timeBar = document.querySelector('.player_time_bar');
                let nowTimeBar = document.querySelector('.time_bar_now');
                nowTimeBar.style.width = `${(timeBar.offsetWidth / this.durationTime) * this.currentTime}px`;
            },
            moveTimeBar(e){
                player.seekTo(e.target.value, true);
                this.timeBar();
            },
            changeMusic(index) {
                this.index = index;
                if (!this.isPlay) {
                    player.cueVideoById({
                        videoId: this.music[this.index].id
                    });
                } else {
                    player.loadVideoById({
                        videoId: this.music[this.index].id
                    });
                }
                this.backgroundImg();
                this.isLyric = false;
                if (!this.VIP) {
                    this.AD += 1;
                    this.ADTimeSlot();
                }
            },
            changePlayList() {
                this.playList === false ? this.playList = true : this.playList = false;
            },
            //廣告時段
            ADTimeSlot() {
                if (this.AD === 3) {
                    this.AD = 0;
                    this.ADPage = true;
                    player.pauseVideo();
                }
            },
            showAD() {
                this.ADPage === false ? this.ADPage = true : this.ADPage = false;
            },
            buyVip() {
                this.VIP = true;
            },
            //監控目前音樂狀態
            onPlayerStateChange(e) {
                if (e.data === YT.PlayerState.PLAYING) {
                    this.isPlay = true;
                } else if (e.data === YT.PlayerState.PAUSED) {
                    this.isPlay = false;
                } else if (e.data === YT.PlayerState.ENDED) {
                    if (this.isLoop === 0) this.isPlay = false;
                    if (this.isLoop === 1) this.nextSong();
                    if (this.isLoop === 2) player.playVideo();
                }
                console.log(e.data);
            }
        }
    })
})(Vue)