!function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/production",n(n.s=89)}({0:function(t,e,n){"use strict";function o(t,e,n,o,s,a,r,i){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):s&&(l=i?function(){s.call(this,this.$root.$options.shadowRoot)}:s),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}n.d(e,"a",(function(){return o}))},1:function(t,e,n){"use strict";var o,s=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},a=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),r={};function i(t,e,n){for(var o=0;o<e.length;o++){var s={css:e[o][1],media:e[o][2],sourceMap:e[o][3]};r[t][o]?r[t][o](s):r[t].push(h(s,n))}}function l(t){var e=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var s=n.nc;s&&(o.nonce=s)}if(Object.keys(o).forEach((function(t){e.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(e);else{var r=a(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var c,u=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function d(t,e,n,o){var s=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=u(e,s);else{var a=document.createTextNode(s),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(a,r[e]):t.appendChild(a)}}function f(t,e,n){var o=n.css,s=n.media,a=n.sourceMap;if(s?t.setAttribute("media",s):t.removeAttribute("media"),a&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var p=null,m=0;function h(t,e){var n,o,s;if(e.singleton){var a=m++;n=p||(p=l(e)),o=d.bind(null,n,a,!1),s=d.bind(null,n,a,!0)}else n=l(e),o=f.bind(null,n,e),s=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else s()}}t.exports=function(t,e,n){return(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=s()),t=n.base?t+n.base:t,e=e||[],r[t]||(r[t]=[]),i(t,e,n),function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){r[t]||(r[t]=[]),i(t,e,n);for(var o=e.length;o<r[t].length;o++)r[t][o]();r[t].length=e.length,0===r[t].length&&delete r[t]}}}},119:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("form",{directives:[{name:"show",rawName:"v-show",value:"login"===t.mode,expression:"mode === 'login'"}],ref:"loginForm",staticClass:"q-pa-xl",attrs:{action:t.pwLoginAction,method:"POST"}},[t.method.google||t.method.facebook?n("div",{staticClass:"column"},[n("div",{staticClass:"text-h5 text-center"},[t._v("社群登入")]),t._v(" "),t.method.google?n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"red",label:"Google 登入"},on:{click:function(e){return t.LoginByGoogle()}}}):t._e(),t._v(" "),t.method.facebook?n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"blue-9",label:"Facebook 登入"},on:{click:function(e){return t.LoginByFacebook()}}}):t._e()],1):t._e(),t._v(" "),t.method.google||t.method.facebook?n("q-separator",{staticClass:"q-my-md"}):t._e(),t._v(" "),n("div",{staticClass:"column"},[n("div",{staticClass:"text-h5 text-center"},[t._v("信箱登入")]),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"email",outlined:"",dense:"",placeholder:"請輸入電子信箱"},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t帳號\n\t\t\t\t")]},proxy:!0}]),model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"password",type:"password",outlined:"",dense:"",placeholder:"請輸入密碼"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.LoginByPassword()}},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t密碼\n\t\t\t\t")]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"grey-9",label:"信箱登入"},on:{click:function(e){return t.LoginByPassword()}}}),t._v(" "),n("div",{staticClass:"row"},[n("q-chip",{staticClass:"col",attrs:{clickable:"",color:"orange","text-color":"white",icon:"alarm_on",label:"忘記密碼"},on:{click:function(e){return t.ForgetPassword()}}}),t._v(" "),n("q-chip",{staticClass:"col",attrs:{clickable:"",color:"brown","text-color":"white",icon:"face",label:"註冊新帳號"},on:{click:function(e){return t.ChangeMode("signup")}}})],1),t._v(" "),n("q-item",{attrs:{clickable:"",tag:"a",href:"/"}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"home"}})],1),t._v(" "),n("q-item-section",[n("q-item-label",{staticClass:"text-subtitle1"},[t._v("回首頁")])],1)],1)],1)],1),t._v(" "),n("form",{directives:[{name:"show",rawName:"v-show",value:"signup"===t.mode,expression:"mode === 'signup'"}],ref:"signupForm",staticClass:"q-pa-xl",attrs:{action:t.pwSignupAction,method:"POST"}},[t.method.google||t.method.facebook?n("div",{staticClass:"column"},[n("div",{staticClass:"text-h5 text-center"},[t._v("快速註冊")]),t._v(" "),t.method.google?n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"red",label:"Google 登入"},on:{click:function(e){return t.LoginByGoogle()}}}):t._e(),t._v(" "),t.method.facebook?n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"blue-9",label:"Facebook 登入"},on:{click:function(e){return t.LoginByFacebook()}}}):t._e()],1):t._e(),t._v(" "),t.method.google||t.method.facebook?n("q-separator",{staticClass:"q-my-md"}):t._e(),t._v(" "),n("div",{staticClass:"column"},[n("div",{staticClass:"text-h5 text-center"},[t._v("信箱登入")]),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"email",outlined:"",dense:"",placeholder:"請輸入電子信箱"},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t帳號\n\t\t\t\t")]},proxy:!0}]),model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"name",outlined:"",dense:"",placeholder:"請輸入姓名"},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t姓名\n\t\t\t\t")]},proxy:!0}]),model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"password",type:"password",outlined:"",dense:"",placeholder:"請輸入密碼"},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t密碼\n\t\t\t\t")]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{type:"password",outlined:"",dense:"",placeholder:"請再次確認密碼"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.SignupByPassword()}},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t確認密碼\n\t\t\t\t")]},proxy:!0}]),model:{value:t.passwordConfirm,callback:function(e){t.passwordConfirm=e},expression:"passwordConfirm"}}),t._v(" "),n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"grey-9",label:"註冊"},on:{click:function(e){return t.SignupByPassword()}}}),t._v(" "),n("q-item",{attrs:{clickable:""},on:{click:function(e){return t.ChangeMode("login")}}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"keyboard_backspace"}})],1),t._v(" "),n("q-item-section",[n("q-item-label",{staticClass:"text-subtitle1"},[t._v("返回登入")])],1)],1)],1)],1),t._v(" "),n("form",{directives:[{name:"show",rawName:"v-show",value:"resetPassword"===t.mode,expression:"mode === 'resetPassword'"}],ref:"resetForm",staticClass:"q-pa-xl"},[n("div",{staticClass:"column"},[n("div",{staticClass:"text-h5 text-center"},[t._v("重設密碼")]),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{name:"password",type:"password",outlined:"",dense:"",placeholder:"請輸入新密碼"},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t新密碼\n\t\t\t\t")]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),n("q-input",{staticClass:"q-my-sm",attrs:{type:"password",outlined:"",dense:"",placeholder:"請再次確認密碼"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.ResetPassword()}},scopedSlots:t._u([{key:"before",fn:function(){return[t._v("\n\t\t\t\t\t確認密碼\n\t\t\t\t")]},proxy:!0}]),model:{value:t.passwordConfirm,callback:function(e){t.passwordConfirm=e},expression:"passwordConfirm"}}),t._v(" "),n("q-btn",{staticClass:"q-ma-sm q-pa-xs full-width",attrs:{color:"grey-9",label:"重設密碼"},on:{click:function(e){return t.ResetPassword()}}}),t._v(" "),n("q-item",{attrs:{clickable:""},on:{click:function(e){return t.ChangeMode("login")}}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"keyboard_backspace"}})],1),t._v(" "),n("q-item-section",[n("q-item-label",{staticClass:"text-subtitle1"},[t._v("返回登入")])],1)],1)],1)])])};o._withStripped=!0;var s=n(3),a=(n(23),{name:"login",data:function(){return{intentUrl:"",email:"",name:"",password:"",passwordConfirm:"",token:"",mode:"login",pwLoginAction:"/auth/login-by-password",pwSignupAction:"/auth/signup-by-password",method:{}}},created:function(){var t=s.a.GetUrlParameter();t.intentUrl&&(this.intentUrl=encodeURIComponent(t.intentUrl)),1==t.reset&&(this.mode="resetPassword",this.token=t.token),t.message&&alert(decodeURIComponent(t.message)),$.get("/auth/method",function(t){"ok"==t.status&&(this.method=t.data)}.bind(this))},methods:{ChangeMode:function(t){this.mode=t},LoginByGoogle:function(){var t="/auth/login-by-google";this.intentUrl&&(t+="?intentUrl="+this.intentUrl),window.location.href=t},LoginByFacebook:function(){var t="/auth/login-by-facebook";this.intentUrl&&(t+="?intentUrl="+this.intentUrl),window.location.href=t},LoginByPassword:function(){return""==this.email?alert("請輸入電子信箱"):s.a.ValidateEmail(this.email)?""==this.password?alert("請輸入密碼"):(this.intentUrl&&(this.pwLoginAction="/auth/login-by-password?intentUrl="+this.intentUrl),void this.$refs.loginForm.submit()):alert("請輸入正確的電子信箱")},SignupByPassword:function(){return""==this.email?alert("請輸入電子信箱"):s.a.ValidateEmail(this.email)?""==this.password?alert("請輸入密碼"):""==this.name?alert("請輸入姓名"):this.password!=this.passwordConfirm?alert("請確認密碼一致"):(this.intentUrl&&(this.pwSignupAction="/auth/signup-by-password?intentUrl="+this.intentUrl),void this.$refs.signupForm.submit()):alert("請輸入正確的電子信箱")},ForgetPassword:function(){if(""==this.email)return alert("請在帳號欄位輸入電子信箱");if(!s.a.ValidateEmail(this.email))return alert("請輸入正確的電子信箱");var t=$("meta[name='csrf-token']").attr("content"),e={};e.email=this.email,e._csrf=t,$.post("/auth/forget-password",e,function(t){if("ok"==t.status)alert("修改密碼的連結已寄至您的信箱，請點擊連結並更新密碼");else switch(t.message){case"send email not enabled":alert("網站尚未開啟自動寄信功能，請聯絡管理員協助處理");break;default:alert("忘記密碼處理失敗")}}.bind(this))},ResetPassword:function(){if(""==this.password)return alert("請輸入新密碼");if(this.password!=this.passwordConfirm)return alert("請確認密碼一致");var t=$("meta[name='csrf-token']").attr("content"),e={};e.password=this.password,e.token=this.token,e._csrf=t,$.post("/auth/reset-password",e,function(t){if("ok"==t.status)alert("密碼已更新，請重新登入");else switch(t.message){case"invalid token":alert("連結已失效");break;default:alert("密碼更新失敗")}window.location.href="/login"}.bind(this))}}}),r=(n(90),n(0)),i=Object(r.a)(a,o,[],!1,null,null,null);i.options.__file="src/vue/login.vue";var l=i.exports;new Vue({el:"#loginApp",components:{login:l}})},2:function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var s=(r=o,i=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),"/*# ".concat(l," */")),a=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[n].concat(a).concat([s]).join("\n")}var r,i,l;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o=0;o<t.length;o++){var s=[].concat(t[o]);n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),e.push(s)}},e}},23:function(t,e,n){var o=n(1),s=n(24);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var a={insert:"head",singleton:!1},r=(o(t.i,s,a),s.locals?s.locals:{});t.exports=r},24:function(t,e,n){(e=n(2)(!1)).push([t.i,'html,body{height:100%;margin:0;padding:0;background-color:#edffef}*{box-sizing:border-box;font-family:"微軟正黑體", "Microsoft JhengHei"}\n',""]),t.exports=e},3:function(t,e,n){"use strict";var o={GetUrlParameter:function(){for(var t=window.location.search.substring(1).split("&"),e={},n=0;n<t.length;n++){var o=t[n].split("=");e[o[0]]=o[1]}return e},GetUrlHash:function(){for(var t=window.location.hash.substr(1).split("&"),e={},n=0;n<t.length;n++){var o=t[n].split("=");e[o[0]]=o[1]}return e},ValidateEmail:function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)},PadLeft:function(t,e,n){var o=e-String(t).length+1;return o>0?new Array(o).join(n||"0")+t:t}};e.a=o},64:function(t,e,n){var o=n(1),s=n(91);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var a={insert:"head",singleton:!1},r=(o(t.i,s,a),s.locals?s.locals:{});t.exports=r},89:function(t,e,n){t.exports=n(119)},90:function(t,e,n){"use strict";var o=n(64);n.n(o).a},91:function(t,e,n){(e=n(2)(!1)).push([t.i,".login{width:100%;max-width:400px;margin:auto}\n",""]),t.exports=e}});