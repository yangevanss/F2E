(function (Vue) {
    let vw = new Vue({
        el: '#app',
        data: {
            input: '',
            title: '',
            show: false,
            p: [],
            done: [],
            sec: 0,
            min: 25,
            timer: null,
            rest: null,
            stop: false,
            restTimer: false,
            class1: true,
            class2: false,
            class3: false,
            class4: false,
            icon: 'play_arrow',
            background: {},
            color: {},
            mp3: [
                { name: 'None', check1: false, check2: false },
                { name: 'Beseeched', src: './Beseeched.mp3', check1: false, check2: true },
                { name: 'Rainbow', src: './End_of_the_Rainbow.mp3', check1: true, check2: false },
            ],
            pages: [
                { name: 'to-do list', status: true, i: 'list', active: true },
                { name: 'analytics', status: false, i: 'assessment', active: false },
                { name: 'ringtones', status: false, i: 'library_music', active: false },
            ],
        },
        computed: {
            timeS() {
                return this.sec <= 9 ? '0' + this.sec : this.sec;
            },
            timeM() {
                return this.min <= 9 ? '0' + this.min : this.min;
            },
            music() {
                let check = ''
                this.mp3.forEach(mp3 => {
                    if (mp3.check1 === true) {
                        check = mp3.src;
                    }
                })
                let audio = new Audio(check);
                return audio;
            },
            restMusic() {
                let check = ''
                this.mp3.forEach(mp3 => {
                    if (mp3.check2 === true) {
                        check = mp3.src;
                    }
                })
                let audio = new Audio(check);
                return audio;
            }
        },
        methods: {
            keydownHandler() {
                if (this.input) {
                    this.p.push(this.input);
                    this.input = '';
                }
                this.p.length > 3 ? this.show = true : this.show = false;
            },
            completeHandler(index) {
                if(index >= 0){
                    this.done.push(this.p[index]);
                }else {
                    this.done.push(this.p[0]);
                }
                this.p.splice(index, 1);
                this.min = 25;
                this.sec = 0;
                this.class1 = true;
                this.class2 = false;
                this.class3 = false;
                this.class4 = false;
                this.icon = 'play_arrow';
                this.p.length > 3 ? this.show = true : this.show = false;
            },
            recoverHandle(items, index) {
                this.p.push(items);
                this.done.splice(index, 1);
            },
            removeHandler(index) {
                this.done.splice(index, 1);
            },
            setTime() {
                if (this.stop === false) {
                    this.background.backgroundColor = '';
                    this.color.color = '';
                    this.restTimer = false;
                    this.stop = true;
                    this.timer = setInterval(() => {
                        if (this.p.length !== 0) {
                            this.icon = 'pause';
                            this.class1 = false;
                            this.class2 = true;
                            this.class3 = false;
                            this.class4 = false;
                            if (this.sec > 0) {
                                this.sec--;
                            } else if (this.min > 0) {
                                this.sec = 60;
                                this.sec--;
                                this.min--;
                            } else if (this.min === 0 && this.sec === 0) {
                                this.stop = false;
                                clearInterval(this.timer);
                                this.min = 5;
                                this.restTime();
                                this.done.push(this.p[0]);
                                this.p.splice(0, 1);
                                this.title = this.p[0];
                                this.music.play();
                            }
                        } else {
                            this.stop = false;
                            clearInterval(this.timer);
                            this.min = 25;
                            this.sec = 0;
                        }
                    }, 1000)
                }
            },
            restTime() {
                if (this.stop === false) {
                    this.icon = 'pause';
                    this.class1 = false;
                    this.class2 = false;
                    this.class3 = false;
                    this.class4 = true;
                    this.background.backgroundColor = '#E5F3FF';
                    this.color.color = '#00A7FF';
                    this.restTimer = true;
                    this.stop = true;
                    this.rest = setInterval(() => {
                        if (this.sec > 0) {
                            this.sec--;
                        } else if (this.min > 0) {
                            this.sec = 60;
                            this.sec--;
                            this.min--;
                        } else if (this.sec === 0 && this.min === 0) {
                            clearInterval(this.rest);
                            this.min = 25;
                            this.stop = false;
                            this.class1 = true;
                            this.class2 = false;
                            this.class3 = false;
                            this.class4 = false;
                            this.icon = 'play_arrow';
                            this.setTime();
                            this.restMusic.play();
                        }
                    }, 1000)
                }

            },
            countDown() {
                this.title = this.p[0];
                if (this.restTimer) {
                    this.restTime();
                } else {
                    this.setTime();
                }
            },
            stopCount() {
                this.stop = false;
                this.icon = 'play_arrow';
                if (this.restTimer) {
                    this.class1 = false;
                    this.class2 = false;
                    this.class3 = true;
                    this.class4 = false;
                    clearInterval(this.rest);
                    this.music.pause();
                } else {
                    this.class1 = true;
                    this.class2 = false;
                    this.class3 = false;
                    this.class4 = false;
                    clearInterval(this.timer);
                    this.restMusic.pause();
                }
            },
            firstHandler(index) {
                this.icon = 'play_arrow';
                this.p.unshift(this.p[index]);
                this.p.splice(index + 1, 1);
                this.title = this.p[0];
                this.min = 25;
                this.sec = 0;
                this.restTimer = false;
                this.class1 = true;
                this.class2 = false;
                this.class3 = false;
                this.class4 = false;
                this.background.backgroundColor = '';
                this.color.color = '';
            },
            activeMusic(items) {
                this.mp3.forEach(mp3 => {
                    mp3.check1 = false;
                })
                items.check1 = true;
            },
            breakMusic(items) {
                this.mp3.forEach(mp3 => {
                    mp3.check2 = false;
                })
                items.check2 = true;
            },
            changePage(name) {
                this.pages.forEach(page => {
                    if (name === page.name) {
                        page.status = true;
                        page.active = true;
                    } else {
                        page.status = false;
                        page.active = false;
                    }
                })
            },
        }
    })
})(Vue);
(function ($) {
    let main = document.querySelector('.main');
    let main2 = document.querySelector('.main2');
    let more = document.querySelector('#more');
    let list = document.querySelector('#list');
    let assessment = document.querySelector('#assessment');
    let library_music = document.querySelector('#library_music');
    let X = document.querySelector('.slide i');
    $(list).on('click', changeMain);
    $(more).on('click', changeMain);
    $(assessment).on('click', changeMain);
    $(library_music).on('click', changeMain);
    $(X).on('click', changeMain2);
    function changeMain() {
        $(main).fadeOut(300, () => {
            $(main2).css({ 'display': 'flex' });
            $(main2).fadeIn(300);
        })
    }
    function changeMain2() {
        $(main2).fadeOut(300, () => {
            $(main).css({ 'display': 'flex' });
            $(main).fadeIn(300);
        })
    }
})($)
