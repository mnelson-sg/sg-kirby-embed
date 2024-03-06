(function(){"use strict";function o(e){const t=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g,i=new RegExp(t);return!e||e.match(i)}function l(e,t){const i={youtube:/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,vimeo:/vimeo\.com\/([0-9]+)/,flickr:/^.*(flickr\.com)\/(.*)/,soundcloud:/^.*(soundcloud\.com|snd\.sc)\/(.*)/,twitter:/^.*(twitter\.com)\/(.*)/,instagram:/^.*(instagram\.com)\/(.*)/};return Object.keys(i).indexOf(t)==-1?!1:e.match(i[t])}var b=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("k-field",e._b({staticClass:"k-embed-field k-url-field k-field",attrs:{input:e._uid}},"k-field",e.$props,!1),[e.hasMedia?i("div",{staticClass:"preview",attrs:{"data-provider":e.providerName}},[i("div",{staticClass:"preview-content",domProps:{innerHTML:e._s(e.media.code)}}),i("div",{staticClass:"preview-background"})]):e._e(),i("k-input",e._g(e._b({ref:"input",attrs:{id:e._uid,value:e.inputValue,media:e.media,theme:"field"},on:{setMedia:e.setMedia,startLoading:e.startLoading}},"k-input",e.$props,!1),e.$listeners),[i("div",{staticClass:"k-embed-infos",attrs:{slot:"icon"},slot:"icon"},[i("div",{staticClass:"k-embed-status"},[e.loading?i("span",{staticClass:"k-embed-status-loading"},[i("span",{staticClass:"loader"})]):e.hasMedia?i("span",{staticClass:"k-embed-status-synced"},[e._v(e._s(e.$t("embed.synced"))+" "),i("span",{staticClass:"checkmark"})]):e.syncFailed?i("span",{staticClass:"k-embed-status-failed"},[e._v(e._s(e.$t("embed.failed"))+" "),i("span",{staticClass:"cross"})]):e._e()]),e.link?i("k-button",{staticClass:"k-input-icon-button",attrs:{icon:e.icon,link:e.inputValue,tooltip:e.$t("open"),tabindex:"-1",target:"_blank",rel:"noopener"}}):e._e()],1)])],1)},g=[],H="";function d(e,t,i,h,r,p,_,U){var s=typeof e=="function"?e.options:e;t&&(s.render=t,s.staticRenderFns=i,s._compiled=!0),h&&(s.functional=!0),p&&(s._scopeId="data-v-"+p);var n;if(_?(n=function(a){a=a||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!a&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(a=__VUE_SSR_CONTEXT__),r&&r.call(this,a),a&&a._registeredComponents&&a._registeredComponents.add(_)},s._ssrRegister=n):r&&(n=U?function(){r.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:r),n)if(s.functional){s._injectStyles=n;var I=s.render;s.render=function(x,v){return n.call(v),I(x,v)}}else{var f=s.beforeCreate;s.beforeCreate=f?[].concat(f,n):[n]}return{exports:e,options:s}}const w={extends:"k-url-field",data(){return{media:Object,loading:!1}},props:{provider:String},created(){this.value&&this.value.media&&this.hasLength(this.value.media)&&(this.media=this.value.media)},watch:{inputValue(){this.value&&this.value.media&&this.hasLength(this.value.media)?this.media=this.value.media:this.media={}}},computed:{hasMedia(){return this.hasLength(this.media)&&this.media.code},providerName(){return this.hasMedia&&this.media.providerName?this.media.providerName.toLowerCase():null},syncFailed(){return this.inputValue!=""&&this.isEmbeddableUrl(this.inputValue)&&!this.hasMedia},inputValue(){return this.value&&this.value.input?this.value.input:""}},methods:{setMedia(e){this.media=e,this.stopLoading()},hasLength(e){return Object.keys(e).length},startLoading(){this.loading=!0},stopLoading(){this.loading=!1},isEmbeddableUrl(e){return!(!o(e)||this.provider&&!l(e,this.provider))}}},u={};var k=d(w,b,g,!1,C,null,null,null);function C(e){for(let t in u)this[t]=u[t]}var $=function(){return k.exports}();const y={extends:"k-url-input",props:{provider:String,media:Object},mounted(){this.loadEmbedScripts()},methods:{onInput(e){if(e==""||!this.isEmbeddableUrl(e))return this.media={},this.emitInput(e),!1;e.includes("https://www.instagram.com")&&(e=e.split("?")[0].replace(/\/$/,"")),this.$emit("startLoading"),this.$api.get("kirby-embed/get-data",{url:e}).then(t=>{if(t.status=="success"&&t.data){if(t.data.providerName=="Vimeo"){let i=t.data.code;i=this.htmlToElement(i),i.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),t.data.code=i.outerHTML}this.media=t.data}else this.media={};this.emitInput(e)}).catch(t=>{this.media={},this.emitInput(e)})},emitInput(e){this.$emit("input",{input:e,media:this.media}),this.$emit("setMedia",this.media),this.loadEmbedScripts()},loadEmbedScripts(){if(window.twttr)window.twttr.widgets.load();else if(this.media&&Object.keys(this.media).length&&this.media.providerName.toLowerCase()=="twitter"){const e=document.createElement("script");e.src="https://platform.twitter.com/widgets.js",document.body.appendChild(e)}if(window.instgrm)window.instgrm.Embeds.process();else if(this.media&&Object.keys(this.media).length&&this.media.providerName.toLowerCase()=="instagram"){const e=document.createElement("script");e.src="https://www.instagram.com/embed.js",document.body.appendChild(e)}},isEmbeddableUrl(e){return!(!o(e)||this.provider&&!l(e,this.provider))},htmlToElement(e){let t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild}}};let E,L;const c={};var M=d(y,E,L,!1,j,null,null,null);function j(e){for(let t in c)this[t]=c[t]}var S=function(){return M.exports}(),O=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"k-embed-field-preview"},[i("div",{staticClass:"k-structure-table-text"},[e._v(e._s(e.url)+" "),e.synced?i("span",{staticClass:"k-embed-field-preview-icon"},[e._v("\u2713")]):e._e()])])},N=[];const R={props:{value:String},computed:{url(){return this.value.input.replace(/^\/\/|^.*?:\/\//,"")},synced(){return Object.keys(this.value.media).length}}},m={};var T=d(R,O,N,!1,V,null,null,null);function V(e){for(let t in m)this[t]=m[t]}var F=function(){return T.exports}();panel.plugin("sylvainjule/embed",{fields:{embed:$},components:{"k-embed-input":S,"k-embed-field-preview":F}})})();
