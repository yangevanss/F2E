(function ($) {
    function add() {
        let $text = $('input[type=text]');
        let $todo = document.querySelector('.todo');
        let $doIt = document.querySelector('#doIt');
        //輸入TODO事項傳到清單裡
        $text.on('keydown', function (e) {
            if (e.keyCode === 13) {
                //有輸入value才傳入
                if (this.value) {
                    $($todo).prepend(`<div class="todoBox">
                    <div>
                    <div class="boxCircle"></div>
                    <p>${this.value}</p>
                    </div>
                    <div>
                    <i class="material-icons">
                    play_circle_outline
                    </i>
                    </div>
                    </div>`)
                    $($doIt).after(`<div class="todoBox2">
                    <div>
                    <div class="boxCircle2"></div>
                    <p>${this.value}</p>
                    </div>
                    <div>
                    <i class="material-icons">
                    play_circle_outline
                    </i>
                    </div>
                    </div>`)
                    this.value = '';
                    more();
                }
            }
        })
    }
    add()
    function more() {
        let $more = document.querySelector('#more');
        let $allTodo = $('.todo').find('.todoBox');
        //清單超過3個即隱藏
        for (i = 0; i < $allTodo.length; i++) {
            i < 3 ? $allTodo.eq(i).show() : $allTodo.eq(i).hide();
        }
        $allTodo.length < 3 ? $($more).hide() : $($more).show();
        //點擊more出現全部清單
        $($more).on('click', function () {
            $allTodo.show();
            $($more).hide();
        })
    }
    function changePage() {
        let $main = document.querySelector('.main');
        let $main2 = document.querySelector('.main2');
        let $X = document.querySelector('.slide i');
        let $list = document.querySelector('#list');
        let $assessment = document.querySelector('#assessment');
        let $library_music = document.querySelector('#library_music');
        $($list).on('click', function () {
            $($main).fadeOut(300, function () {
                $($main2).css({ 'display': 'flex' });
                $($main2).fadeIn();
            })
        })
        $($X).on('click', function () {
            $($main2).fadeOut(300, function () {
                $($main).fadeIn()
            })
        })
    }
    changePage()
    function addTitle() {
        let $main = document.querySelector('.main');
        let $main2 = document.querySelector('.main2');
        let $title = document.querySelector('.title p');
        let $titleCircle = document.querySelector('.title>div');
        let $slideTitle = document.querySelector('.playTodo p');
        $($main).on('click', '.todoBox i', function (e) {
            let title = $(this.closest('.todoBox')).find('p').text();
            $($title).text(title);
            $($slideTitle).text(title);
            $($titleCircle).addClass('titleCircle');
        })
        $($main2).on('click', '.todoBox2 i', function (e) {
            let title = $(this.closest('.todoBox2')).find('p').text();
            $($title).text(title);
            $($slideTitle).text(title);
            $($titleCircle).addClass('titleCircle');
        })
    }
    addTitle()
    function remove() {
        let $main = document.querySelector('.main');
        let $main2 = document.querySelector('.main2');
        let $done = document.querySelector('#done');
        $($main).on('click', '.boxCircle', function () {
            let $box = $(this).closest('.todoBox');
            let $box2 = document.querySelector('.todoBox2');
            $($box).fadeOut(300, function () {
                $($box).remove()
            });
            $($box2).addClass('done');
            $($done).after($box2);
            more();
        })
        $($main2).on('click', '.boxCircle2', function () {
            let $box = document.querySelector('.todoBox');
            let $box2 = $(this).closest('.todoBox2');
            $($box).remove();
            more();
            if ($($box2).hasClass('done') === false) {
                $box2.fadeOut(300, function () {
                    $(this).fadeIn();
                    $(this).addClass('done');
                    $($done).after($box2);
                })
            } else {
                $($box2).remove();
            }
        })
    }
    remove()
    function countDown() {
        let $main = document.querySelector('.main');
        let $stop = document.querySelector('#stop');
        let $min = document.querySelector('#min');
        let $sec = document.querySelector('#sec');
        let $done = document.querySelector('#done');
        let sec = 60;
        let min = 24;
        let getTime = '';
        let click = false;
        let $boxes = '';
        let $boxes2 = '';
        function setTime() {
            getTime = setInterval(function () {
                if (sec > 0) {
                    sec -= 1;
                } else if (min > 0) {
                    sec = 60;
                    sec -= 1;
                    min -= 1;
                } else if(min === 0 && sec === 0) {
                    $($done).after($boxes2);
                    $(boxes2).addClass('done');
                    $($boxes).remove();
                    clearInterval(getTime);
                }
                $($sec).text(sec);
                $($min).text(min);
            }, 1)
        }
        $($main).on('click', '#play', '.todoBox', function(){
            $boxes = document.querySelector('.todoBox') 
            $boxes2 = document.querySelector('.todoBox2');
                if (click === false && $boxes) {
                    setTime();
                    click = true;
                } 
        });
        $($stop).on('click', function (e) {
            click = false;
            clearInterval(getTime);
            e.stopPropagation();
        })
    }
    countDown()

})($)