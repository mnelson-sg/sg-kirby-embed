(function() {
  "use strict";
  function isUrl(value) {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    const regex = new RegExp(pattern);
    return !value || value.match(regex);
  }
  function matchProvider(value, provider) {
    const patterns = {
      "youtube": /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
      "vimeo": /vimeo\.com\/([0-9]+)/,
      "flickr": /^.*(flickr\.com)\/(.*)/,
      "soundcloud": /^.*(soundcloud\.com|snd\.sc)\/(.*)/,
      "twitter": /^.*(twitter\.com)\/(.*)/,
      "instagram": /^.*(instagram\.com)\/(.*)/
    };
    const patternKeys = Object.keys(patterns);
    if (patternKeys.indexOf(provider) == -1) return false;
    return value.match(patterns[provider]);
  }
  function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render) {
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      options._compiled = true;
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const _sfc_main$2 = {
    extends: "k-url-field",
    data() {
      return {
        media: Object,
        loading: false
      };
    },
    props: {
      provider: String
    },
    created() {
      if (this.value && this.value.media && this.hasLength(this.value.media)) {
        this.media = this.value.media;
        console.log(this.media);
      }
    },
    watch: {
      inputValue() {
        if (this.value && this.value.media && this.hasLength(this.value.media)) {
          this.media = this.value.media;
        } else {
          this.media = {};
        }
      }
    },
    computed: {
      hasMedia() {
        return this.hasLength(this.media) && this.media.code;
      },
      providerName() {
        return this.hasMedia && this.media.providerName ? this.media.providerName.toLowerCase() : null;
      },
      syncFailed() {
        return this.inputValue != "" && this.isEmbeddableUrl(this.inputValue) && !this.hasMedia;
      },
      inputValue() {
        return this.value && this.value.input ? this.value.input : "";
      }
    },
    methods: {
      onInputValue(value) {
        if (value === "" || !this.isEmbeddableUrl(value)) {
          this.media = {};
          this.emitInput(value);
          return false;
        }
        if (value.includes("https://www.instagram.com")) {
          value = value.split("?")[0].replace(/\/$/, "");
        }
        if (value.includes("x.com")) {
          value = value.replace("x.com", "twitter.com");
        }
        this.$emit("startLoading");
        this.$panel.api.get("kirby-embed/get-data", { url: value }).then((response) => {
          if (response["status"] == "success" && response["data"]) {
            if (response["data"]["providerName"] == "Vimeo") {
              let iframe = response["data"]["code"];
              iframe = this.htmlToElement(iframe);
              iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
              response["data"]["code"] = iframe.outerHTML;
            }
            this.media = response["data"];
          } else {
            this.media = {};
          }
          this.emitInput(value);
        }).catch((error) => {
          this.media = {};
          this.emitInput(value);
        });
      },
      emitInput(value) {
        this.$emit("input", { input: value, media: this.media });
        this.$emit("setMedia", this.media);
        this.loadEmbedScripts();
      },
      loadEmbedScripts() {
        if (window.twttr) {
          window.twttr.widgets.load();
        } else if (this.media && Object.keys(this.media).length && this.media.providerName.toLowerCase() == "twitter") {
          const embed = document.createElement("script");
          embed.src = "https://platform.twitter.com/widgets.js";
          document.body.appendChild(embed);
        }
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        } else if (this.media && Object.keys(this.media).length && this.media.providerName.toLowerCase() == "instagram") {
          const embed = document.createElement("script");
          embed.src = "https://www.instagram.com/embed.js";
          document.body.appendChild(embed);
        }
      },
      isEmbeddableUrl(value) {
        if (!isUrl(value)) return false;
        if (this.provider && !matchProvider(value, this.provider)) return false;
        return true;
      },
      htmlToElement(html) {
        let template = document.createElement("template");
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
      },
      setMedia(media) {
        this.media = media;
        this.stopLoading();
      },
      hasLength(obj) {
        return Object.keys(obj).length;
      },
      startLoading() {
        this.loading = true;
      },
      stopLoading() {
        this.loading = false;
      }
    }
  };
  var _sfc_render$2 = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("k-field", _vm._b({ staticClass: "k-embed-field k-url-field k-field", attrs: { "input": _vm._uid } }, "k-field", _vm.$props, false), [_vm.hasMedia ? _c("div", { staticClass: "preview", attrs: { "data-provider": _vm.providerName } }, [_c("div", { staticClass: "preview-content", domProps: { "innerHTML": _vm._s(_vm.media.code) } }), _c("div", { staticClass: "preview-background" })]) : _vm._e(), _c("k-input", _vm._g(_vm._b({ ref: "input", attrs: { "id": _vm._uid, "media": _vm.media.url, "theme": "field" }, on: { "input": _vm.onInputValue, "setMedia": _vm.setMedia, "startLoading": _vm.startLoading }, model: { value: _vm.inputValue, callback: function($$v) {
      _vm.inputValue = $$v;
    }, expression: "inputValue" } }, "k-input", _vm.$props, false), _vm.$listeners), [_c("div", { staticClass: "k-embed-infos", attrs: { "slot": "icon" }, slot: "icon" }, [_c("div", { staticClass: "k-embed-status" }, [_vm.loading ? _c("span", { staticClass: "k-embed-status-loading" }, [_c("span", { staticClass: "loader" })]) : _vm.hasMedia ? _c("span", { staticClass: "k-embed-status-synced" }, [_vm._v(_vm._s(_vm.$t("embed.synced")) + " "), _c("span", { staticClass: "checkmark" })]) : _vm.syncFailed ? _c("span", { staticClass: "k-embed-status-failed" }, [_vm._v(_vm._s(_vm.$t("embed.failed")) + " "), _c("span", { staticClass: "cross" })]) : _vm._e()]), _vm.link ? _c("k-button", { staticClass: "k-input-icon-button", attrs: { "icon": _vm.icon, "link": _vm.inputValue, "tooltip": _vm.$t("open"), "tabindex": "-1", "target": "_blank", "rel": "noopener" } }) : _vm._e()], 1)])], 1);
  };
  var _sfc_staticRenderFns$2 = [];
  _sfc_render$2._withStripped = true;
  var __component__$2 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$2,
    _sfc_render$2,
    _sfc_staticRenderFns$2
  );
  __component__$2.options.__file = "/home/mnelson/repos/sg-kirby-embed/src/components/embedField.vue";
  const embedField = __component__$2.exports;
  const _sfc_main$1 = {
    extends: "k-url-input",
    props: {
      provider: String,
      media: Object
    },
    mounted() {
      this.loadEmbedScripts();
    },
    methods: {}
  };
  const _sfc_render$1 = null;
  const _sfc_staticRenderFns$1 = null;
  var __component__$1 = /* @__PURE__ */ normalizeComponent(
    _sfc_main$1,
    _sfc_render$1,
    _sfc_staticRenderFns$1
  );
  __component__$1.options.__file = "/home/mnelson/repos/sg-kirby-embed/src/components/embedInput.vue";
  const embedInput = __component__$1.exports;
  const _sfc_main = {
    props: {
      value: String,
      field: Object
    },
    computed: {
      url() {
        return this.value.input.replace(/^\/\/|^.*?:\/\//, "");
      },
      isSynced() {
        return Object.keys(this.value.media).length && this.value.media.code !== null;
      },
      iconSrc() {
        return this.$panel.$urls.site + "/media/plugins/sylvainjule/embed/svg/" + this.providerIcon;
      },
      providerIcon() {
        if (this.isSynced) {
          if (this.field.icons) {
            let provider = this.value.media.providerName;
            let icons = ["Vimeo", "Flickr", "Instagram", "SoundCloud", "Spotify", "Twitter", "YouTube"];
            if (icons.includes(provider)) {
              return "embed-icon-" + provider.toLowerCase() + ".svg";
            } else {
              return "embed-icon-synced.svg";
            }
          } else {
            return "embed-icon-synced.svg";
          }
        } else {
          return "embed-icon-failed.svg";
        }
      }
    }
  };
  var _sfc_render = function render() {
    var _vm = this, _c = _vm._self._c;
    return _c("div", { staticClass: "k-embed-field-preview" }, [_c("div", { staticClass: "k-embed-field-preview-inner k-bubble", attrs: { "data-has-text": "true" } }, [_c("div", { staticClass: "k-embed-icon k-frame" }, [_c("img", { attrs: { "src": _vm.iconSrc } })]), _c("div", { staticClass: "k-embed-url" }, [_vm._v(" " + _vm._s(_vm.url) + " ")])])]);
  };
  var _sfc_staticRenderFns = [];
  _sfc_render._withStripped = true;
  var __component__ = /* @__PURE__ */ normalizeComponent(
    _sfc_main,
    _sfc_render,
    _sfc_staticRenderFns
  );
  __component__.options.__file = "/home/mnelson/repos/sg-kirby-embed/src/components/embedPreview.vue";
  const embedPreview = __component__.exports;
  panel.plugin("sylvainjule/embed", {
    fields: {
      embed: embedField
    },
    components: {
      "k-embed-input": embedInput,
      "k-embed-field-preview": embedPreview
    }
  });
})();
