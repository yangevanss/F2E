(function(Vue){
    let vm = new Vue({
        el: '#app',
        data: {
            payMethod: null,
            index: 0,
        },
        methods:{
            selectPay(pay, index){
                this.payMethod = pay;
                this.index = index;
            },
            next(){
                let link = document.querySelector('.pay_next>a');
                if(this.payMethod){
                    if(this.payMethod === 'creditCard') link.href = './main02.html';
                    if(this.payMethod === 'shop') link.href = './main04.html';
                    if(this.payMethod === 'atm') link.href = './main03.html';
                }
            },
        }
    })

})(Vue)