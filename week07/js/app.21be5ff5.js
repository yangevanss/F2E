(function(e){function t(t){for(var r,a,i=t[0],c=t[1],s=t[2],l=0,f=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);m&&m(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"23d374eb"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise(function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"07b818ff"}[e]+".css",o=c.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],l=s.getAttribute("data-href");if(l===r||l===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],m.parentNode.removeChild(m),n(u)},m.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(m)}).then(function(){a[e]=0}));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise(function(t,n){r=o[e]=[t,n]});t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var m=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var m=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"18f0":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],u=(n("034f"),n("2877")),i={},c=Object(u["a"])(i,a,o,!1,null,null,null),s=c.exports,l=n("5132"),f=n.n(l),m=n("8c4f"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Start")],1)},h=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{staticClass:"main"},[n("div",{staticClass:"chart_box"},[1===e.selectName?n("div",[n("h1",{on:{click:function(t){return e.getName(!1)}}},[e._v("[匿名聊天]")]),n("h1",{on:{click:function(t){return e.getName(!0)}}},[e._v("[暱稱聊天]")])]):e._e(),2===e.selectName?n("div",{staticClass:"select_name"},[n("p",[e._v("暱稱聊天")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.setName,expression:"setName"}],attrs:{type:"text",placeholder:"輸入暱稱"},domProps:{value:e.setName},on:{input:function(t){t.target.composing||(e.setName=t.target.value)}}}),n("h1",{on:{click:function(t){return e.rename()}}},[e._v("[確定]")])]):e._e(),3===e.selectName?n("div",[n("h1",{on:{click:e.ramdomChart}},[e._v("[隨機配對1對1聊天]")]),n("h1",{on:{click:function(t){return e.allChart()}}},[e._v("[進入聊天大廳]")])]):e._e()])])},v=[],b=(n("7f7f"),{name:"start",data:function(){return{selectName:1,setName:null}},computed:{name:function(){return this.setName||"匿名"}},methods:{getName:function(e){this.selectName=e?2:3},rename:function(){this.name&&(this.selectName=3)},allChart:function(){this.$store.commit("setName",this.name),this.$router.push({name:"chart"}),this.$socket.emit("enter",this.name)},ramdomChart:function(){alert("功能尚未完成")}}}),g=b,y=(n("a966"),Object(u["a"])(g,d,v,!1,null,"32d6e10a",null)),_=y.exports,N={name:"home",components:{Start:_}},w=N,C=Object(u["a"])(w,p,h,!1,null,null,null),O=C.exports;r["a"].use(m["a"]);var j=new m["a"]({routes:[{path:"/",name:"home",component:O},{path:"/chart",name:"chart",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"*",redirect:"/"}]}),k=n("2f62");r["a"].use(k["a"]);var x=new k["a"].Store({state:{user:null},mutations:{setName:function(e,t){this.state.user=t}},actions:{}});r["a"].config.productionTip=!1,r["a"].use(new f.a({debug:!0,connection:"http://localhost:8000/"})),new r["a"]({router:j,store:x,render:function(e){return e(s)}}).$mount("#app")},"64a9":function(e,t,n){},a966:function(e,t,n){"use strict";var r=n("18f0"),a=n.n(r);a.a}});
//# sourceMappingURL=app.21be5ff5.js.map