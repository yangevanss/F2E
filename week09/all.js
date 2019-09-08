(function(Vue){
    let vm = new Vue({
        el: '#app',
        data: {
            easyMDE: null,
            note: [
                {
                    id: 'text_0',
                    title: 'Demo',
                    star: false
                }
            ],
            index: 0,
            favorite: false,
            darkMode: false,
        },
        mounted(){
            this.easyMDE = new EasyMDE({
                element: document.getElementById(`${this.note[0].id}`),
            });
            this.easyMDE.value('Demo');
        },
        methods: {
            changeNote(){
                return new Promise((res, rej)=>{
                    this.easyMDE.toTextArea();
                    this.easyMDE = null;
                    res(this.index)
                }).then((index)=>{
                    this.easyMDE = new EasyMDE({
                        element: document.getElementById(`${this.note[index].id}`),
                    });
                })
            },
            createNote(){
                this.note.push({
                    id: `text_${this.note.length}`,
                    title: `Text_${this.note.length}`,
                    star: false
                })
                this.index = this.note.length - 1;
                this.changeNote();
            },
            selectNote(index){
                this.index = index;
                return new Promise((res, rej)=>{
                    this.changeNote();
                    res();
                }).then(()=>{
                    // console.log(this.easyMDE.value())
                    let title = this.easyMDE.value().split(' ').join().replace(/[\n\r]/g, '').split('', 15).join('');
                    // console.log(title)
                    if(this.easyMDE.value())this.note[index].title = title;
                })
            },
            addFavorite(index){
                !this.note[index].star ? this.note[index].star = true : this.note[index].star = false;
            },
            showFavorite(){
                !this.favorite ? this.favorite = true : this.favorite = false;
            },
            changeMode(){
                !this.darkMode ? this.darkMode = true : this.darkMode = false;
            }
        }
    })


})(Vue)