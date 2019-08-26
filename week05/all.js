(function () {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    
    //載入圖片,音樂
    const bg = new Image();
    const bg_t = new Image();
    const bg_b = new Image();
    const duck = new Image();
    const duck2 = new Image();
    const duck3 = new Image();
    const superDuck = new Image();
    const superDuck2 = new Image();
    const superDuck3 = new Image();
    const duckLose = new Image();
    const ball_r = new Image();
    const ball_g = new Image();
    const ball_b = new Image();
    const ball_p = new Image();
    const ball_o = new Image();
    const boss_1 = new Image();
    const boss_2 = new Image();
    const star = new Image();
    const goal = new Image();
    
    bg.src = './picture/img_BG.svg';
    bg_t.src = './picture/img_ frame-1.svg';
    bg_b.src = './picture/img_ frame.svg';
    duck.src = './picture/duck_normal_01.svg';
    duck2.src = './picture/duck_normal_02.svg';
    duck3.src = './picture/duck_normal_03.svg';
    superDuck.src = './picture/duck_super_01.svg';
    superDuck2.src = './picture/duck_super_02.svg';
    superDuck3.src = './picture/duck_super_03.svg';
    duckLose.src = './picture/duck_lose.svg';
    ball_r.src = './picture/Ball_01.svg';
    ball_g.src = './picture/Ball_02.svg';
    ball_b.src = './picture/Ball_03.svg';
    ball_p.src = './picture/Ball_04.svg';
    ball_o.src = './picture/Ball_05.svg';
    boss_1.src = './picture/Boss_01.svg';
    boss_2.src = './picture/Boss_02.svg';
    star.src = './picture/SuperStar.svg';
    goal.src = './picture/Goal.svg';

    const bgMusic = new Audio();
    const winMusic = new Audio();
    const loseMusic = new Audio();
    const itemMusic = new Audio();

    bgMusic.src = './music/If_I_Had_a_Chicken.mp3';
    winMusic.src = './music/Cartoon_Bank_Heist_Sting.mp3';
    loseMusic.src = './music/Flighty_Theme.mp3';
    itemMusic.src = './music/Demilitarized_Zone_Sting.mp3';
    
    const balls = [ball_r, ball_g, ball_b, ball_p, ball_o];
    
    //介面按鈕
    const status = document.querySelector('.status');
    const start = document.querySelector('.start');
    const winner = document.querySelector('.win');
    const loser = document.querySelector('.lose');
    const countTime = document.querySelector('.time');
    const startBtn = document.getElementById('start');
    const replayBtn = document.querySelectorAll('#replay');
    function replay(){
        replayBtn.forEach((item)=>{
            item.addEventListener('click', ()=>{
                location.reload();
            })
        })
    }
    function startGame(){
        startBtn.addEventListener('click', ()=>{
            status.style.display = 'none';
            start.style.display = 'none';
            countTime.style.display = 'block';
            setTime();
            draw();
            bgMusic.play();
        })
    }
    //移動鴨子,鴨子狀態
    let duckX = 550;
    let duckY = 550;
    let speed = 30;
    let duckStatus = 1;
    let statusTimer;

    document.addEventListener('keydown', moveRight);
    document.addEventListener('keydown', moveLeft);
    function moveRight(e) {
        if (e.keyCode === 39) {
            if(speed === 30){
                if (duckX >= 930) duckX = 930;
            }else {
                if (duckX >= 850) duckX = 850;
            }
            duckX += speed;
        }
    }
    function moveLeft(e) {
        if (e.keyCode === 37) {
            if(speed === 30){
                if (duckX <= 140) duckX = 140;
            }else {
                if (duckX <= 170) duckX = 170;
            }
            duckX -= speed;
        }
    }
    function duckAnimation() {
        statusTimer = setInterval(() => {
            duckStatus++;
            if (duckStatus === 4) {
                duckStatus = 1;
            } else if (duckStatus === 7) {
                duckStatus = 4;
            }
        }, 300)
    }
    duckAnimation();


    //動畫
    let level = 1; //目前難度等級
    let gameOver = false;

    let itemY = 0; //障礙物座標
    let itemX = 1;

    let bossY = 0; //boss座標
    let bossY_2 = 0;
    let bossX = Math.floor(Math.random() * 5.5) + 1;
    let getBoss = false;

    let reward = 0; //獎勵座標
    let rewardY = 0;
    let getReward = false;

    // 物品範圍
    let failX = null;
    let failWidth = null;
    let bossFailX = null;
    let bossFailWidth = null;
    let bossFailX_2 = null;
    let bossFailWidth_2 = null;
    let starX = null;
    let starWidth = null;

    //場景座標
    let bgY = 0;
    let bg_bY = 779;
    let bg_tY = -175;
    let goalY = -218;

    function draw() {
        //場景動畫
        ctx.drawImage(bg, 0, bgY, 1200, 900);
        ctx.drawImage(bg, 0, bgY-900, 1200, 900);
        ctx.drawImage(bg_b, 0, bg_bY);
        ctx.drawImage(bg_t, 0, bg_tY);
        ctx.drawImage(goal, 565, goalY);
        if(bgY >= 900)bgY = 0;
        if (time <= 7 && goalY <= 70) goalY++;
        if (time <= 5 && bg_tY <= 0) bg_tY++;
        if (time <= 5) {
            duckX = 550;
            if (duckY >= 250) duckY--;
            document.removeEventListener('keydown', moveRight);
            document.removeEventListener('keydown', moveLeft);
        }
        if(time === 0) {
            status.style.display = 'flex';
            winner.style.display = 'flex';
            gameOver = true;
            bgMusic.pause();
            winMusic.play();
        }
        if(time >= 3) {
            bgY+=level;
            bg_bY++
        }

        // 鴨子動畫
        switch (duckStatus) {
            case 1:
                ctx.drawImage(duck, duckX, duckY);
                break;
            case 2:
                ctx.drawImage(duck2, duckX, duckY);
                break;
            case 3:
                ctx.drawImage(duck3, duckX, duckY);
                break;
            case 4:
                ctx.drawImage(superDuck, duckX, duckY);
                break;
            case 5:
                ctx.drawImage(superDuck2, duckX, duckY);
                break;
            case 6:
                ctx.drawImage(superDuck3, duckX, duckY);
                break;
            case 7:
                ctx.drawImage(duckLose, duckX, duckY);
                break;
        }
        //各時間出現障礙物設定
        if (time <= 90 && time > 80) {
            produceItem(1, balls, 2, itemX, 'item')
            if (itemY >= 700) {
                itemY = 0;
                itemX = Math.floor(Math.random() * 8) + 1;
                produceItem(1, balls, 2, itemX, 'item');
                reward += 1;
                getReward = false;
            }
        } else if (time <= 80 && time > 60) {
            level === 2 ? produceItem(2, balls, 4, itemX, 'item')
                : produceItem(1, balls, 2, itemX, 'item');
            if (itemY >= 700) {
                level = 2;
                itemY = 0;
                itemX = Math.floor(Math.random() * 7) + 1;
                produceItem(2, balls, 4, itemX, 'item');
                reward += 1;
                getReward = false;
            }
        } else if (time <= 60 && time > 30) {
            level === 3 ? produceItem(3, balls, 4, itemX, 'item')
                : produceItem(2, balls, 4, itemX, 'item');
            if (itemY >= 700) {
                level = 3;
                itemY = 0;
                itemX = Math.floor(Math.random() * 6) + 1;
                produceItem(3, balls, 4, itemX, 'item');
                reward += 1;
                getReward = false;
            }

            //boss1
            if (getBoss === false) {
                produceItem(0, boss_1, 3, bossX, 'boss1');
            }
            if (bossY >= 700) {
                bossY = 0;
                getBoss = true;
            }
        } else if (time <= 30 && time >= 5) {
            level === 4 ? produceItem(4, balls, 5, itemX, 'item')
                : produceItem(3, balls, 4, itemX, 'item');
            if (itemY >= 700) {
                level = 4;
                itemY = 0;
                itemX = Math.floor(Math.random() * 5) + 1;
                produceItem(4, balls, 5, itemX, 'item');
                reward += 1;
                getReward = false;
            }

            //boss2
            if (getBoss === false) {
                produceItem(0, boss_2, 2, 3, 'boss2');
            }
            if (bossY_2 >= 700) {
                bossY_2 = 0;
                getBoss = true;
            }
        }
        //boss是否出現
        if (time === 30) {
            getBoss = false;
        }
        //剩5秒全部障礙消失
        if (time === 5) {
            level = 1;
            [itemY, bossY, bossY_2] = [-1000, -1000, -1000];
        }
        //獎品出現時段
        if (reward !== 0 && reward % 6 === 0) {
            if (getReward === false) {
                produceItem(0, star, 7, itemX, 'reward')
            }
            if (rewardY >= 700) {
                rewardY = 0;
                getReward = true;
            }
        }
        //失敗判定
        if(duckStatus <= 3){
            if (
                (itemY + 70 >= duckY && duckX + 85 >= failX && duckX <= failWidth)
                || (bossY + 250 >= duckY && duckX + 85 >= bossFailX && duckX <= bossFailWidth)
                || (bossY_2 + 300 >= duckY && duckX + 85 >= bossFailX_2 && duckX <= bossFailWidth_2)
            ) {
                duckStatus = 7;
                clearInterval(statusTimer);
                clearInterval(timer);
                bgMusic.pause();
                loseMusic.play();
                document.removeEventListener('keydown', moveRight);
                document.removeEventListener('keydown', moveLeft);
                setTimeout(()=>{
                    status.style.display = 'flex';
                    loser.style.display = 'block';
                    gameOver = true;
                },1)
            }
        }
        //無敵判定
        if (rewardY + 70 >= duckY && duckX + 85 >= starX && duckX <= starWidth) {
            duckStatus = 4;
            speed = 90;
            itemMusic.play();
            setTimeout(() => {
                duckStatus = 1;
                speed = 30;
            }, 3500);
        }
        if(gameOver === false){
            requestAnimationFrame(draw);
        }
    }

    //產生物件(數量, 物品, 速度, 產生X座標, 種類)
    function produceItem(num, item, speed, rangeX, name) {
        for (let i = 0; i <= num; i++) {
            if (name === 'boss1') {
                ctx.drawImage(item, 110 * (i + rangeX), bossY);
                bossFailX = 110 * rangeX;
                bossFailWidth = 110 * (i + rangeX) + 330;
            };
            if (name === 'boss2') {
                ctx.drawImage(item, 110 * (i + rangeX), bossY_2);
                bossFailX_2 = 110 * rangeX;
                bossFailWidth_2 = 110 * (i + rangeX) + 500;
            };
            if (name === 'item') {
                ctx.drawImage(item[i], 110 * (i + rangeX), itemY);
                failX = 110 * rangeX;
                failWidth = 110 * (i + rangeX) + 70;
            };
            if (name === 'reward') {
                ctx.drawImage(item, 110 * (i + rangeX), rewardY);
                starX = 110 * rangeX;
                starWidth = 110 * (i + rangeX) + 70;
            }
        }
        if (name === 'item') itemY += speed;
        if (name === 'boss1') bossY += speed;
        if (name === 'boss2') bossY_2 += speed;
        if (name === 'reward') rewardY += speed;
    }


    //時間倒數
    let text = document.querySelector('.time p:nth-of-type(2)');
    let time = 90;
    let minute;
    let second;
    let timer;
    function setTime() {
        timer = setInterval(() => {
            time--;
            minute = Math.floor(time / 60);
            second = time % 60;
            if (time === 0) {
                clearInterval(timer);
            }
            second < 10 ? second = '0' + second : second;
            minute < 10 ? minute = '0' + minute : minute;
            text.innerText = `${minute}:${second}`
        }, 1000)
    }

    replay();
    startGame();
})()