(self["webpackChunkproyectofinal"]=self["webpackChunkproyectofinal"]||[]).push([[700],{4245:function(o,t,e){"use strict";e.r(t);var s=e(8081),a=e.n(s),n=e(3645),r=e.n(n),i=r()(a());i.push([o.id,"@import url(https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap);"]),i.push([o.id,".loadingUserInfo{margin-top:20rem}.loadingUserInfo,.showAccountInfo{display:flex;align-items:center;justify-content:center}.showAccountInfo{font-family:Noto Sans;font-style:normal;font-weight:600;width:70%;flex-direction:column}.showAccountInfo .colorButton{background-color:#fff;transition:.4s;border-radius:1px solid #242424}.showAccountInfo .colorButton p{color:#242424}.showAccountInfo .colorButton:hover{background-color:#242424;scale:1.03;border-radius:1px solid #242424}.showAccountInfo .colorButton:hover p{color:#fff}@media(max-width:899px){.showAccountInfo{width:100%}}.saveDataButton{width:30rem;margin-bottom:1rem}.selectedMenu{font-family:Noto Sans;font-style:normal;font-weight:600;padding-top:10rem}section{display:flex}",""]),t["default"]=i},6700:function(o,t,e){"use strict";e.r(t),e.d(t,{default:function(){return D}});var s=e(3396);const a={key:1},n={class:"showAccountInfo pdPwd"},r={key:2,class:"loadingUserInfo"};function i(o,t,e,i,c,u){const l=(0,s.up)("WhiteHeader"),d=(0,s.up)("PopUpModal"),p=(0,s.up)("UserUpdatePassword"),f=(0,s.up)("router-view"),h=(0,s.up)("RightDesktopMenu"),g=(0,s.up)("LoadingSpinner");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(l,{class:"headerPasarela",tipo:"backHeader"}),this.showPopUp?((0,s.wg)(),(0,s.j4)(d,{key:0,"is-opened":!0,msj:"LA CONTRASEÑA HA SIDO ACTUALIZADA CORRECTAMENTE"})):(0,s.kq)("",!0),c.carga?((0,s.wg)(),(0,s.iD)("section",a,[(0,s._)("div",n,[(0,s.Wm)(p,{onChangePopUpState:u.setToTrue,userData:this.userData,class:"selectedMenu"},null,8,["onChangePopUpState","userData"])]),(0,s.Wm)(f),(0,s.Wm)(h,{selectedOption:"secondOption",userData:this.userData},null,8,["userData"])])):((0,s.wg)(),(0,s.iD)("section",r,[(0,s.Wm)(g)]))],64)}e(6193);var c=e(6264),u=e(4161),l=(e(4219),e(8612)),d=e(3237),p=e(5586),f=e(6061),h=e(805),g=e(375),m=e(5930),w={name:"UserDataView",data(){return{userData:null,carga:!1,modo:"datosUsuario",showPopUp:!1}},async mounted(){document.querySelector("body").classList.contains("bodyStyle")&&document.querySelector("body").classList.toggle("bodyStyle"),await this.getUserData(),this.carga=!0},methods:{async getUserData(){this.carga=!1;const o=await u.Z.get(`${l.API_URL}users/email/${this.$store.state.currentMail}`).then((o=>o.data)).catch((o=>o));this.userData=o},setToTrue(o){this.showPopUp=o}},components:{WhiteHeader:p.Z,LoadingSpinner:c.Z,UserInformation:d.Z,RightDesktopMenu:f.Z,ButtonComponent:h.Z,UserUpdatePassword:g.Z,PopUpModal:m.Z}},y=(e(7761),e(89));const U=(0,y.Z)(w,[["render",i]]);var D=U},7761:function(o,t,e){var s=e(4245);s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[o.id,s,""]]),s.locals&&(o.exports=s.locals);var a=e(7037).Z;a("0f4d28bf",s,!0,{sourceMap:!1,shadowMode:!1})}}]);
//# sourceMappingURL=700.8a2ff0fb.js.map