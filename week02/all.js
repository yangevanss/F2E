(function (Vue) {
    let vm = new Vue({
        el: '#app',
        data: {
            start: false,
            win: false,
            //總牌數
            cards: [
                { name: 'spade', num: 1, type: 'black', src: './Picture/52 cards/spade – 3.svg' },
                { name: 'spade', num: 2, type: 'black', src: './Picture/52 cards/spade – 3-1.svg' },
                { name: 'spade', num: 6, type: 'black', src: './Picture/52 cards/spade – 3-2.svg' },
                { name: 'spade', num: 5, type: 'black', src: './Picture/52 cards/spade – 3-3.svg' },
                { name: 'spade', num: 4, type: 'black', src: './Picture/52 cards/spade – 3-4.svg' },
                { name: 'spade', num: 3, type: 'black', src: './Picture/52 cards/spade – 3-5.svg' },
                { name: 'spade', num: 7, type: 'black', src: './Picture/52 cards/spade – 3-6.svg' },
                { name: 'spade', num: 8, type: 'black', src: './Picture/52 cards/spade – 3-7.svg' },
                { name: 'spade', num: 9, type: 'black', src: './Picture/52 cards/spade – 3-8.svg' },
                { name: 'spade', num: 10, type: 'black', src: './Picture/52 cards/spade – 3-9.svg' },
                { name: 'spade', num: 13, type: 'black', src: './Picture/52 cards/spade – 3-10.svg' },
                { name: 'spade', num: 12, type: 'black', src: './Picture/52 cards/spade – 3-11.svg' },
                { name: 'spade', num: 11, type: 'black', src: './Picture/52 cards/spade – 3-12.svg' },
                { name: 'heart', num: 3, type: 'red', src: './Picture/52 cards/heart – 4.svg' },
                { name: 'heart', num: 2, type: 'red', src: './Picture/52 cards/heart – 4-1.svg' },
                { name: 'heart', num: 1, type: 'red', src: './Picture/52 cards/heart – 4-2.svg' },
                { name: 'heart', num: 4, type: 'red', src: './Picture/52 cards/heart – 4-3.svg' },
                { name: 'heart', num: 5, type: 'red', src: './Picture/52 cards/heart – 4-4.svg' },
                { name: 'heart', num: 6, type: 'red', src: './Picture/52 cards/heart – 4-5.svg' },
                { name: 'heart', num: 7, type: 'red', src: './Picture/52 cards/heart – 4-6.svg' },
                { name: 'heart', num: 11, type: 'red', src: './Picture/52 cards/heart – 4-7.svg' },
                { name: 'heart', num: 10, type: 'red', src: './Picture/52 cards/heart – 4-8.svg' },
                { name: 'heart', num: 9, type: 'red', src: './Picture/52 cards/heart – 4-9.svg' },
                { name: 'heart', num: 8, type: 'red', src: './Picture/52 cards/heart – 4-10.svg' },
                { name: 'heart', num: 12, type: 'red', src: './Picture/52 cards/heart – 4-11.svg' },
                { name: 'heart', num: 13, type: 'red', src: './Picture/52 cards/heart – 4-12.svg' },
                { name: 'diamond', num: 1, type: 'red', src: './Picture/52 cards/diamond – 2.svg' },
                { name: 'diamond', num: 2, type: 'red', src: './Picture/52 cards/diamond – 2-1.svg' },
                { name: 'diamond', num: 3, type: 'red', src: './Picture/52 cards/diamond – 2-2.svg' },
                { name: 'diamond', num: 4, type: 'red', src: './Picture/52 cards/diamond – 2-3.svg' },
                { name: 'diamond', num: 8, type: 'red', src: './Picture/52 cards/diamond – 2-4.svg' },
                { name: 'diamond', num: 7, type: 'red', src: './Picture/52 cards/diamond – 2-5.svg' },
                { name: 'diamond', num: 6, type: 'red', src: './Picture/52 cards/diamond – 2-6.svg' },
                { name: 'diamond', num: 5, type: 'red', src: './Picture/52 cards/diamond – 2-7.svg' },
                { name: 'diamond', num: 9, type: 'red', src: './Picture/52 cards/diamond – 2-8.svg' },
                { name: 'diamond', num: 10, type: 'red', src: './Picture/52 cards/diamond – 2-9.svg' },
                { name: 'diamond', num: 11, type: 'red', src: './Picture/52 cards/diamond – 2-10.svg' },
                { name: 'diamond', num: 12, type: 'red', src: './Picture/52 cards/diamond – 2-11.svg' },
                { name: 'diamond', num: 13, type: 'red', src: './Picture/52 cards/diamond – 2-12.svg' },
                { name: 'club', num: 1, type: 'black', src: './Picture/52 cards/club – 3.png' },
                { name: 'club', num: 2, type: 'black', src: './Picture/52 cards/club – 3-1.png' },
                { name: 'club', num: 4, type: 'black', src: './Picture/52 cards/club – 3-2.png' },
                { name: 'club', num: 3, type: 'black', src: './Picture/52 cards/club – 3-3.png' },
                { name: 'club', num: 5, type: 'black', src: './Picture/52 cards/club – 3-4.png' },
                { name: 'club', num: 6, type: 'black', src: './Picture/52 cards/club – 3-5.png' },
                { name: 'club', num: 7, type: 'black', src: './Picture/52 cards/club – 3-6.png' },
                { name: 'club', num: 11, type: 'black', src: './Picture/52 cards/club – 3-7.png' },
                { name: 'club', num: 12, type: 'black', src: './Picture/52 cards/club – 3-8.png' },
                { name: 'club', num: 8, type: 'black', src: './Picture/52 cards/club – 3-9.png' },
                { name: 'club', num: 10, type: 'black', src: './Picture/52 cards/club – 3-10.png' },
                { name: 'club', num: 13, type: 'black', src: './Picture/52 cards/club – 3-11.png' },
                { name: 'club', num: 9, type: 'black', src: './Picture/52 cards/club– 3-12.png' },
            ],
            //左上牌區
            blankBoxes: [
                [],
                [],
                [],
                []
            ],
            //右上牌區
            standardBoxes: [
                [],
                [],
                [],
                []
            ],
            undoBox: [],
            //下方牌區
            cardBoxes: Array.from({ length: 8 }, () => []),
            //時間
            timer: null,
            second: 0,
            minute: 0,
            moves: 0,
            //目前拿取卡片
            target: null,
            //目前卡片牌區
            targetBoxes: null,
            pause: false,
            restartG: false,
            newG: false,
        },
        computed: {
            timeS() {
                return this.second < 10 ? '0' + this.second : this.second;
            },
            timeM() {
                return this.minute < 10 ? '0' + this.minute : this.minute;
            },
            gameOver() {
                let score = 0;
                this.standardBoxes.forEach(box=>{
                    if(box.length === 13)score +=1;
                })
                if(score === 4){
                    clearInterval(this.timer);
                    return this.win = true;
                }
            }
        },
        mounted() {
            this.enterGame();
            this.randomCards();
            this.dealCard();
        },
        methods: {
            enterGame() {
                setTimeout(() => {
                    this.start = true;
                    this.setTime();
                }, 3000)
            },
            //洗牌
            randomCards() {
                this.cards.sort(() => {
                    let num = Math.random() > 0.5 ? -1 : 1;
                    return num;
                });
            },
            //發牌
            dealCard() {
                for (i = 0; i < this.cards.length; i++) {
                    switch (i % 8) {
                        case 0:
                            this.cardBoxes[0].push(this.cards[i]);
                            break;
                        case 1:
                            this.cardBoxes[1].push(this.cards[i]);
                            break;
                        case 2:
                            this.cardBoxes[2].push(this.cards[i]);
                            break;
                        case 3:
                            this.cardBoxes[3].push(this.cards[i]);
                            break;
                        case 4:
                            this.cardBoxes[4].push(this.cards[i]);
                            break;
                        case 5:
                            this.cardBoxes[5].push(this.cards[i]);
                            break;
                        case 6:
                            this.cardBoxes[6].push(this.cards[i]);
                            break;
                        case 7:
                            this.cardBoxes[7].push(this.cards[i]);
                            break;
                    }
                }
            },
            //倒數
            setTime() {
                this.timer = setInterval(() => {
                    if (this.second < 60) {
                        this.second += 1;
                    } else {
                        this.second = 0;
                        this.minute += 1;
                    }
                }, 1000)
            },
            //牌區拿卡
            dragFormBoxes(card, cardBox) {
                if (card.src !== cardBox[cardBox.length - 1].src || this.pause === true) return;
                this.target = card;
                this.targetBoxes = cardBox;
            },
            //放到左上牌區
            dropToBlankBoxes(blankBox) {
                event.preventDefault();
                if (!this.target) return;
                if (blankBox.length < 1) {
                    blankBox.push(this.target);
                    this.targetBoxes.pop();
                    this.target = null;
                    this.moves += 1;
                    this.undoBox.push({
                        from: this.targetBoxes, toBoxes: blankBox
                    })
                }
            },
            //放到下方牌區
            dropToCardBoxes(cardBox) {
                event.preventDefault();
                let lastCard = cardBox[cardBox.length - 1];
                if(cardBox.length <= 0) {
                    cardBox.push(this.target);
                    this.targetBoxes.pop();
                    this.target = null;
                    this.moves += 1;
                    this.undoBox.push({
                        from: this.targetBoxes, toBoxes: cardBox
                    })
                }else {
                    if (!this.target || this.target.type === lastCard.type) return;
                    if (lastCard.num - 1 === this.target.num) {
                        cardBox.push(this.target);
                        this.targetBoxes.pop();
                        this.target = null;
                        this.moves += 1;
                        this.undoBox.push({
                            from: this.targetBoxes, toBoxes: cardBox
                        })
                    }
                }
            },
            //放到右上牌區
            dropToStandardBoxes(standardBox) {
                event.preventDefault();
                let lastStandCard = standardBox[standardBox.length - 1];
                if (!this.target) return;
                if (standardBox.length === 0) {
                    if (this.target.num === 1) {
                        standardBox.push(this.target);
                        this.targetBoxes.pop();
                        this.target = null;
                        this.moves += 1;
                        this.undoBox.push({
                            from: this.targetBoxes, toBoxes: standardBox
                        })
                    }
                } else {
                    if (lastStandCard.num + 1 === this.target.num && lastStandCard.name === this.target.name) {
                        standardBox.push(this.target);
                        this.targetBoxes.pop();
                        this.target = null;
                        this.moves += 1;
                        this.undoBox.push({
                            from: this.targetBoxes, toBoxes: standardBox
                        })
                    }
                }
            },
            //上一步
            undo() {
                let lastUndo = this.undoBox[this.undoBox.length - 1];
                if (this.undoBox.length === 0) return;
                lastUndo.from.push(lastUndo.toBoxes[lastUndo.toBoxes.length - 1]);
                lastUndo.toBoxes.pop();
                this.undoBox.pop();
                this.moves -= 1;
            },
            allowDrop(e) {
                e.preventDefault();
            },
            //關閉選項視窗
            backGame() {
                this.pause = false;
                this.restartG = false;
                this.newG = false;
                this.setTime();
            },
            //開啟選項視窗
            restartGame() {
                if (this.pause === true) return;
                this.pause = true;
                this.restartG = true;
                clearInterval(this.timer);
            },
            newGame() {
                if (this.pause === true) return;
                this.pause = true;
                this.newG = true;
                clearInterval(this.timer);
            },
            //重製設定
            reset() {
                this.backGame();
                this.second = 0;
                this.minute = 0;
                this.moves = 0;
                this.target = null;
                this.targetBoxes = null;
                this.blankBoxes = [[], [], [], []];
                this.standardBoxes = [[], [], [], []];
            },
            //新遊戲
            playNewGame() {
                this.reset();
                this.cardBoxes = Array.from({ length: 8 }, () => []);
                this.randomCards();
                this.dealCard();
                this.win = false;
            },
            //重新開始這局
            restartThisGame() {
                this.reset();
                this.cardBoxes = Array.from({ length: 8 }, () => []);
                this.dealCard();
                this.win = false;
            },
            beforeEnter(e) {
                e.css({opacity: 0})
            },
            enter(e){
                e.animate({ opacity: 1 }, 1000, done)
            },

        }
    })
})(Vue)