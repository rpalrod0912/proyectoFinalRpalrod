(self["webpackChunkproyectofinal"]=self["webpackChunkproyectofinal"]||[]).push([[289],{8281:function(t,o,e){"use strict";e.r(o);var n=e(8081),a=e.n(n),s=e(3645),r=e.n(s),i=r()(a());i.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap);"]),i.push([t.id,".typeSubmit{background-color:green;border-radius:10px;transition:.4s;color:#fff;border:1px solid green;font-family:Noto Sans;font-style:normal;font-weight:600;font-size:1rem;padding:.4rem;padding-left:1.2rem;padding-right:1.2rem;cursor:pointer}.typeSubmit:hover{transform:scale(1.07)}.putDataSubmit{justify-items:center;align-content:center;width:100%;height:3.2rem;background-color:#242424;color:#fff;border:1px solid #000;border-radius:10px;transition:.4s;font-family:Noto Sans;font-style:normal;margin-bottom:1rem;font-weight:600;font-size:1.2rem}.loadingUserInfo,.putDataSubmit{display:flex;align-items:center;justify-content:center}.loadingUserInfo{margin-top:20rem}.showAccountInfo{font-family:Noto Sans;font-style:normal;font-weight:600;display:flex;width:70%;justify-content:center;flex-direction:column;align-items:center}.showAccountInfo .colorButton{background-color:#fff;transition:.4s;border-radius:1px solid #242424}.showAccountInfo .colorButton p{color:#242424}.showAccountInfo .colorButton:hover{background-color:#242424;scale:1.03;border-radius:1px solid #242424}.showAccountInfo .colorButton:hover p{color:#fff}@media(max-width:899px){.showAccountInfo{width:100%}}@media(max-width:550px){.selectedMenu .updateData .infoPanel,.showAccountInfo .putDataSubmit,.showAccountInfo .saveDataButton{width:21rem}}@media(max-width:460px){.selectedMenu .updateData h1,.selectedMenu .updateData h2{font-size:1rem}.selectedMenu .updateData .infoPanel{width:15rem}.showAccountInfo .putDataSubmit{width:16rem;font-size:.9rem}.showAccountInfo .saveDataButton{width:16rem}.showAccountInfo .saveDataButton p{font-size:.9rem}}.saveDataButton{width:30rem;margin-bottom:1rem}.selectedMenu{font-family:Noto Sans;font-style:normal;font-weight:600;padding-top:10rem}section{display:flex}",""]),o["default"]=i},4578:function(t,o,e){"use strict";e.r(o),e.d(o,{default:function(){return A}});e(7658);var n=e(3396);const a={key:1},s={class:"showAccountInfo"},r={key:2,class:"loadingUserInfo"};function i(t,o,e,i,c,u){const l=(0,n.up)("WhiteHeader"),d=(0,n.up)("PopUpModal"),p=(0,n.up)("UserInformation"),f=(0,n.up)("ButtonComponent"),m=(0,n.up)("RightDesktopMenu"),h=(0,n.up)("LoadingSpinner");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(l,{class:"headerPasarela",tipo:"backHeader"}),this.showPopUp?((0,n.wg)(),(0,n.j4)(d,{key:0,"is-opened":!0,msj:"DATOS DE LA CUENTA CAMBIADOS CORRECTAMENTE"})):(0,n.kq)("",!0),c.carga?((0,n.wg)(),(0,n.iD)("section",a,[(0,n._)("div",s,[(0,n.Wm)(p,{onChangePopUpState:u.setToTrue,userData:this.userData,class:"selectedMenu"},null,8,["onChangePopUpState","userData"]),(0,n.Wm)(f,{onClick:o[0]||(o[0]=t=>this.$router.push("/tuinformacion/password")),class:"colorButton saveDataButton",msj:"ACTUALIZAR CONTRASEÑA"}),(0,n.Wm)(f,{onClick:o[1]||(o[1]=t=>this.$router.push("/tuinformacion/email")),class:"colorButton saveDataButton",msj:"ACTUALIZAR EMAIL"})]),(0,n.Wm)(m,{selectedOption:"secondOption",userData:this.userData},null,8,["userData"])])):((0,n.wg)(),(0,n.iD)("section",r,[(0,n.Wm)(h)]))],64)}e(6193);var c=e(6264),u=e(4161),l=(e(4219),e(8612)),d=e(3237),p=e(5586),f=e(6061),m=e(805),h=e(375),g=e(5930),w={name:"UserDataView",data(){return{userData:null,carga:!1,showPopUp:!1}},async mounted(){u.Z.defaults.headers.common={Authorization:`Bearer ${this.$store.state.currentToken}`},document.querySelector("body").classList.contains("bodyStyle")&&document.querySelector("body").classList.toggle("bodyStyle"),await this.getUserData(),this.carga=!0},methods:{async getUserData(){this.carga=!1;const t=await u.Z.get(`${l.API_URL}users/email/${this.$store.state.currentMail}`).then((t=>t.data)).catch((t=>t));this.userData=t},setToTrue(t){this.showPopUp=t}},components:{WhiteHeader:p.Z,LoadingSpinner:c.Z,UserInformation:d.Z,RightDesktopMenu:f.Z,ButtonComponent:m.Z,UserUpdatePassword:h.Z,PopUpModal:g.Z}},y=(e(8084),e(89));const D=(0,y.Z)(w,[["render",i]]);var A=D},8084:function(t,o,e){var n=e(8281);n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals);var a=e(7037).Z;a("c3975148",n,!0,{sourceMap:!1,shadowMode:!1})}}]);
//# sourceMappingURL=289.2edc2f40.js.map