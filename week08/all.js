(function (Vue) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC0fGV9-aQvfOl6E41sdfQQlWks5Ln00i8",
        authDomain: "f2e-demo-63af9.firebaseapp.com",
        databaseURL: "https://f2e-demo-63af9.firebaseio.com",
        projectId: "f2e-demo-63af9",
        storageBucket: "f2e-demo-63af9.appspot.com",
        messagingSenderId: "593121740564",
        appId: "1:593121740564:web:18754e2c0972be66"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let vm = new Vue({
        el: '#app',
        data: {
            folder: [],
            files: [],
            tool: false,
            open: 1,
            load: 0,
            tempFiles: [],
            tempFolder: []
        },
        mounted() {
            let storageReference = firebase.storage().ref();
            storageReference.listAll().then(res => {
                // console.log(res)
                this.folder = res.prefixes;
                this.files = res.items;
            })
        },
        methods: {
            chooseMethod() {
                this.open = 2;
            },
            openTool() {
                this.tool = true;
            },
            uploadFile(e) {
                let file = e.target.files;
                for (let i = 0; i < file.length; i++) {
                    this.open = 3;
                    let fileName = file[i].name;
                    let storageReference = firebase.storage().ref(fileName);
                    let task = storageReference.put(file[i]);

                    task.on('state_changed', (snapshot) => {
                        // console.log(snapshot);
                        this.load = snapshot.bytesTransferred / snapshot.totalBytes;
                    }, (err) => {
                        console.log(err)
                    }, (success) => {
                        this.open = 1;
                        window.location.reload();
                    })
                }
            },
            uploadFolder(e) {
                console.log(e)
                let file = e.target.files;
                for (let i = 0; i < file.length; i++) {
                    this.open = 3;
                    let fileName = file[i].webkitRelativePath;
                    let storageReference = firebase.storage().ref(fileName);
                    let task = storageReference.put(file[i]);

                    task.on('state_changed', (snapshot) => {
                        this.load = snapshot.bytesTransferred / snapshot.totalBytes;
                    }, (err) => {
                        console.log(err)
                    }, (success) => {
                        this.open = 1;
                        window.location.reload();
                    })
                }
            },
            deleteFiles(index) {
                let path = this.files[index].location.path_;
                // console.log(this.files[index].location.path_);
                let storageReference = firebase.storage().ref(path);
                storageReference.delete().then(() => {
                    window.location.reload();
                });
            },
            downloadFiles(index) {
                let path = this.files[index].location.path_;
                let storageReference = firebase.storage().ref(path);
                let name = storageReference.name;
                storageReference.getDownloadURL().then(url => {
                    // console.log(url);
                    fetch(url).then(res => {
                        return res.blob();
                    }).then(blob => {
                        // console.log(blob);
                        let url = window.URL.createObjectURL(blob);
                        // console.log(url);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = name;
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    })
                })
            },
            deleteFolder(index, folderLocation) {
                let folderPath = folderLocation ||　this.folder[index].location.path_;
                let storageReference = firebase.storage().ref(folderPath);
                storageReference.listAll().then(res => {
                    this.tempFiles = res.items;
                    this.tempFolder = res.prefixes;
                    // console.log(folder);
                })
                .then(() => {
                    this.deleteLoop(this.tempFiles);
                }).then(() => {
                    //如果裡面還有資料夾
                    if (this.tempFolder.length !== 0) {
                        this.deleteFolder('', this.tempFolder[0].location.path_);
                    } else {
                        window.location.reload();
                    }
                })
            },
            deleteLoop(file){
                file.forEach(item => {
                    let target = firebase.storage().ref(item.location.path_);
                    target.delete();
                })
            },
            downloadFolder(index, folderLocation) {
                //目標資料夾
                let folderPath = folderLocation || this.folder[index].location.path_;
                let storageReference = firebase.storage().ref(folderPath);
                //找目標資料夾裡面的內容物
                storageReference.listAll().then(res => {
                    this.tempFiles = res.items;
                    this.tempFolder = res.prefixes;
                }).then(() => {
                    //迴圈內容物下載
                    this.downloadLoop(this.tempFiles);
                })
                .then(() => {
                    if (this.tempFolder.length !== 0) {
                        this.downloadFolder('', this.tempFolder[0].location.path_);
                    }
                })
            },
            downloadLoop(file) {
                file.forEach(item => {
                    let target = firebase.storage().ref(item.location.path_);
                    let name = item.name;
                    target.getDownloadURL().then(url => {
                        // console.log(url);
                        fetch(url).then(res => {
                            return res.blob()
                        }).then(blob => {
                            // console.log(blob);
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement('a');
                            a.href = url;
                            a.download = name;
                            a.style.display = 'none';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        })
                    })
                })
            },
            inside(index) {
                let folderPath = this.folder[index].location.path_;
                let insidePath = firebase.storage().ref(folderPath);
                insidePath.listAll().then(res => {
                    this.folder = res.prefixes;
                    this.files = res.items;
                })
            },
            backRoot() {
                let insidePath = firebase.storage().ref();
                insidePath.listAll().then(res => {
                    this.folder = res.prefixes;
                    this.files = res.items;
                })
            }
        }
    })

})(Vue)