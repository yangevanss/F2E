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
            tempPath: null,
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
                let path;
                for (let i = 0; i < file.length; i++) {
                    this.open = 3;
                    let fileName = file[i].name;
                    !this.tempPath ? path = fileName : path = `/${this.tempPath}/${fileName}`;
                    let storageReference = firebase.storage().ref(path);
                    let task = storageReference.put(file[i]);

                    task.on('state_changed', (snapshot) => {
                        // console.log(snapshot);
                        this.load = snapshot.bytesTransferred / snapshot.totalBytes;
                    }, (err) => {
                        console.log(err)
                    }, (success) => {
                        this.open = 1;
                        this.backRoot();
                    })
                }
            },
            uploadFolder(e) {
                let file = e.target.files;
                let path;
                for (let i = 0; i < file.length; i++) {
                    this.open = 3;
                    let fileName = file[i].webkitRelativePath;
                    !this.tempPath ? path = fileName : path = `/${this.tempPath}/${fileName}`;
                    let storageReference = firebase.storage().ref(path);
                    let task = storageReference.put(file[i]);

                    task.on('state_changed', (snapshot) => {
                        this.load = snapshot.bytesTransferred / snapshot.totalBytes;
                    }, (err) => {
                        console.log(err)
                    }, (success) => {
                        this.open = 1;
                        this.backRoot();
                    })
                }
            },
            deleteFiles(index) {
                let path = this.files[index].location.path_;
                // console.log(this.files[index].location.path_);
                let storageReference = firebase.storage().ref(path);
                storageReference.delete().then(() => {
                    this.backRoot();
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
            deleteFolder(index, temp) {
                let tempFiles = [];
                let tempFolder = [];
                let folder = temp || this.folder[index].location.path_;
                let folderPath =  firebase.storage().ref(folder);
                folderPath.listAll().then(res=>{
                    tempFiles = res.items;
                    tempFolder = res.prefixes;
                }).then(()=>{
                    tempFiles.forEach(item=>{
                        firebase.storage().ref(item.location.path_).delete().then(()=>{
                            this.backRoot();
                        });
                    });
                    if(tempFolder.length !== 0){
                        tempFolder.forEach(item=>{
                            this.deleteFolder('', item.location.path_);
                        })
                    }
                })
            },
            downloadFolder(index) {
                let tempFiles = [];
                let path = this.folder[index].location.path_;
                let folderPath = firebase.storage().ref(path);
                folderPath.listAll().then(res=>{
                    tempFiles = res.items;
                }).then(()=>{
                    this.downloadLoop(tempFiles);
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
                    this.tempPath = folderPath;
                })
            },
            backRoot() {
                let insidePath = firebase.storage().ref();
                insidePath.listAll().then(res => {
                    this.folder = res.prefixes;
                    this.files = res.items;
                    this.tempPath = null;
                })
            }
        }
    })

})(Vue)