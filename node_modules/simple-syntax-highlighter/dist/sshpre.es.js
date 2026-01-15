import { openBlock as h, createElementBlock as b, normalizeClass as x, renderSlot as E, createTextVNode as f, createCommentVNode as w, createElementVNode as v } from "vue";
const T = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, a] of e)
    n[l] = a;
  return n;
}, s = {
  quote: /("(?:\\"|[^"])*")|('(?:\\'|[^'])*')/,
  comment: /(\/\/.*?(?:\n|$)|\/\*.*?\*\/)/,
  htmlTag: /(<([^>])*>)/,
  htmlentity: /(&amp;[a-zA-Z0-9#]+;)/,
  punctuation: /(!==?|(?:[[\](){}.:;,+\-?=!]|&lt;|&gt;)+|&&|\|\|)/,
  number: /(-?(?:\.\d+|\d+(?:\.\d+)?))/,
  boolean: /\b(true|false)\b/
}, p = {
  shell: {
    quote: s.quote,
    comment: /(#.*?)(?:\n|$)/,
    keyword: /(?:^|\b)(npm|yarn|install|run)(?:\b|$)/,
    param: /( --(?:save|save-dev))(?:\s|$)/
  },
  xml: {
    doctype: /(&lt;\!DOCTYPE.*?&gt;)/,
    quote: s.quote,
    comment: /(&lt;!--.*?--&gt;)/,
    htmlentity: s.htmlentity,
    tag: /(&lt;\/?)([a-zA-Z\-:]+)(.*?)(\/?&gt;)/
  },
  html: {
    doctype: /(DOCTYPE)/,
    quote: s.quote,
    comment: /(&lt;!--.*?--&gt;)/,
    htmlentity: s.htmlentity,
    tag: /(&lt;\/?)([a-z]\w*)(.*?)(\/?&gt;)/
  },
  "html-vue": {
    doctype: /(DOCTYPE)/,
    quote: s.quote,
    comment: /(&lt;!--.*?--&gt;)/,
    htmlentity: s.htmlentity,
    tag: /(&lt;\/?)([a-zA-Z][\w\d-]*)((?:.|\s)*?)(\/?&gt;)/
  },
  pug: {
    text: /((?:^|\n)[ \t]*|^)\|([ \t]*)([^\n]+(?=\s*(?:\n|$)))/,
    text2: /([ \t]*)([.#\-\w\d]+(?:\([^)]*\))*)\.\n((?:\n+(?=\4[ \t]+)|(?=\4[ \t]+).+?(?:\n|$)*?)*)(?=\s*(?:\n|$))/,
    quote: s.quote,
    comment: /(^|\n)([ \t]*|^)(\/\/-[ \t]*(?:[^\n]*?(?:\n\10[ \t]+[^\n]*)+|[^\n]+(?=\n|$)))/,
    tag: /([a-zA-Z][\w\d-]*|)([.#][a-zA-Z][-.\w\d]*|)\b(?:\((.*?)\))?(\.?)([ \t]*)([^\n]+)?(?=\n|$)/,
    punctuation: /(!==?|(?:[#[\]().,+\-?=!|]|&lt;|&gt;)+)/
  },
  css: {
    quote: s.quote,
    comment: /(\/\*.*?\*\/)/,
    pseudo: /(:(?:hover|active|focus|visited|not|before|after|(?:first|last|nth)-child))/,
    "selector keyword vendor": /(@-(?:moz|o|webkit|ms)-(?=keyframes\s))/,
    "selector keyword": /((?:@(?:import|media|font-face|keyframes)|screen|print|and)(?=[\s({])|keyframes|\s(?:ul|ol|li|table|div|pre|p|a|img|br|hr|h[1-6]|em|strong|span|html|body|iframe|video|audio|input|button|form|label|fieldset|small|abbr|i|dd|dt)\b)(?=.*\{})/,
    variable: /(--[a-zA-Z0-9\-]+)/,
    selector: /((?:[.#-\w*+ >:,[\]="~\n]|&gt;)+)(?=\s*\{)/,
    "attribute keyword vendor": /(-(?:moz|o|webkit|ms)-(?=transform|transition|user-select|tap-highlight-color|animation|background-size|box-shadow))/,
    "attribute keyword": /\b(content|float|display|position|top|left|right|bottom|(?:(?:max|min)-)?width|(?:(?:max|min|line)-)?height|font(?:-(?:family|style|size|weight|variant|stretch))?|vertical-align|color|opacity|visibility|z-index|pointer-events|user-select|transform(?:-(?:origin|style|delay|duration|property|timing-function))?|transition(?:-(?:delay|duration))?|animation(?:-(?:name|delay|duration|direction|fill-mode))?|backface-visibility|backdrop-filter|background(?:-(?:color|position|image|repeat|size|attachment|origin|clip|blend-mode))?|(?:padding|margin|border)(?:-(?:top|left|right|bottom))?|border(?:-(?:radius|color|width|style|spacing))|white-space|text-(?:align|transform|decoration|shadow|indent)|overflow(?:-(?:x|y))?|(?:letter|word)-spacing|word-break|box-(?:sizing|shadow)|stroke(?:-(?:width|opacity|dasharray|dashoffset|linecap|linejoin))?|fill|speak|outline|user-select|cursor|flex(?:-(?:direction|flow|grow|shrink|basis|wrap))?|(?:justify|align)-(?:content|self|items))(?=\s*:)/,
    "value keyword vendor": /(-(?:moz|o|webkit|ms)-(?=linear-gradient))/,
    "value keyword": /\b(inherit|initial|normal|none|unset|auto|inline(?:-(?:block|flex))?|block|flex|absolute|relative|static|fixed|sticky|hidden|visible|top|left|right|bottom|center|middle|baseline|solid|dotted|dashed|line-through|(?:over|under)line|wavy|double|(?:pre-|no)?wrap|pre|break-word|(?:upper|lower)case|capitalize|italic|bold|attr\(.*?\)|linear|ease(?:-in)?(?:-out)?|all|infinite|cubic-bezier|(?:translate|rotate)(?:[X-Z]|3d)?|skew[XY]?|scale|(?:no-)?repeat|repeat(?:-x|-y)|contain|cover|url|(?:repeating-)?(?:linear|radial)-gradient|inset|pointer|(?:flex-)?(?:start|end)|space-(?:between|evenly|around)|stretch|revert|row(?:-reverse)?|column(?:-reverse)?)(?=\s*[,;}(]|\s+[\da-z!])/,
    "value keyword important": /( ?!important)/,
    number: s.number,
    color: /(transparent|#(?:[\da-fA-F]{6}|[\da-fA-F]{3})|rgba?\([\d., ]*\))/,
    htmlentity: /(&.*?;)/,
    punctuation: /([:,;{}@#()!]+|&lt;|&gt;)/,
    attribute: /([a-zA-Z-]+)(?=\s*:)/,
    unit: /(px|pt|cm|%|r?em|m?s|deg|vh|vw|vmin|vmax)(?=(?:\s*[;,{}})]|\s+[-\da-z#]))/
  },
  json: {
    quote: s.quote,
    comment: s.comment,
    number: s.number,
    boolean: s.boolean,
    punctuation: /([[\](){}:;,-]+)/
  },
  js: {
    quote: s.quote,
    comment: s.comment,
    number: /\b(\d+(?:\.\d+)?|null)\b/,
    boolean: s.boolean,
    this: /\b(this)(?=\W)/,
    keyword: /\b(new|getElementsBy(?:Tag|Class|)Name|getElementById|querySelector|querySelectorAll|arguments|if|else|do|return|case|default|(?:f|F)unction|typeof|instanceof|undefined|document|window|while|for|forEach|switch|in|break|continue|delete|length|var|let|const|export|import|as|require|from|Class|constructor|Number|Boolean|String|Array|Object|RegExp|Integer|Date|Promise|async|await|(?:clear|set)(?:Timeout|Interval)|parse(?:Int|Float)|Math(?=\.)|isNaN)(?=\W)/,
    punctuation: /(!==?|(?:[[\]!(){}:;,+\-%*/?=]|&lt;|&gt;)+|\.+(?![a-zA-Z])|&amp;&amp;|\|\|)/,
    variable: /(\.?[a-zA-Z_][\w\d]*)/,
    htmlentity: /(&.*?;)/,
    "external-var": /(\$|jQuery|JSON)(?=\W|$)/
  },
  php: {
    quote: s.quote,
    comment: s.comment,
    special: /(&lt;\?php|\?&gt;|__(?:DIR|FILE|LINE)__)/,
    punctuation: s.punctuation,
    number: s.number,
    boolean: s.boolean,
    variable: /(\$[\w\d_]+)/,
    keyword: /\b(define|echo|die|exit|print_r|var_dump|if|else|elseif|do|return|case|default|function|\$this|while|foreach|for|switch|in|break|continue|empty|isset|unset|parse_ini_file|session_(?:start|destroy|id)|header|json_(?:encode|decode)|error_log|(require|include)(:?_once)?|try|throw|new|Exception|catch|finally|preg_(?:match|replace)|list|strlen|substr|str_replace|array_(?:keys|values))(?=\W|$)/
  },
  sql: {
    quote: s.quote,
    comment: /((?:\-\-|#)\s.*?(?:\n|$)|\/\*.*?\*\/)/,
    punctuation: s.punctuation,
    number: /\b(\d+(?:\.\d+)?|null)\b/,
    boolean: s.boolean,
    keyword: /\b(\*|CREATE|DATABASE|TABLE|GRANT|ALL|PRIVILEGES|IDENTIFIED|FLUSH|ALTER|MODIFY|DROP|TRUNCATE|CONSTRAINT|ADD|(?:(?:PRIMARY|FOREIGN|UNIQUE) )?KEY|REFERENCES|AUTO_INCREMENT|COMMENT|DEFAULT|UNSIGNED|CHARSET|COLLATE|CHARACTER|ENGINE|SQL_MODE|USE|IF|NOT|NULL|EXISTS|SELECT|UPDATE|DELETE|INSERT(?: INTO)?|VALUES|SET|FROM|WHERE|(?:ORDER|GROUP) BY|LIMIT|(?:(?:LEFT|RIGHT|INNER|OUTER) |)JOIN|AS|ON|COUNT|CASE|TO|WHEN|BETWEEN|AND|OR|IN|LIKE|CONCAT|CURRENT_TIMESTAMP)(?=\W|$)/,
    "var-type": /\b((?:var)?char|(?:tiny|small|medium|big)?int|decimal|float|double|real|bit|boolean|date(?:time)?|time(?:stamp)?|year|(?:tiny|medium|long)?(?:text|blob)|enum)\b/
  }
}, k = {
  xml: /(\s*)([a-zA-Z\d\-:]+)=("|')(.*?)\3/g,
  html: /(\s*)([a-zA-Z-]+)=("|')(.*?)\3/g,
  "html-vue": /(\s*)([@:#]?[a-zA-Z\d-]+)(?:(?:=("|')(.*?)\3)|)/g,
  pug: /(\s*|,)([@:#]?[a-zA-Z\d-]+)(?:(?:=("|')(.*?)\3)|)/g
}, $ = {
  shell: { quote: 2 },
  xml: { quote: 2, tag: 4 },
  html: { quote: 2, tag: 4 },
  "html-vue": { quote: 2, tag: 4 },
  pug: { text: 3, text2: 3, quote: 2, comment: 3, tag: 6 },
  json: { quote: 2 },
  php: { quote: 2 },
  sql: { quote: 2 },
  css: { quote: 2 },
  js: { quote: 2 }
}, m = (t) => t.map((e) => {
  if (!e.children || typeof e.children == "string")
    return e.children || "";
  if (Array.isArray(e.children))
    return m(e.children);
  if (e.children.default)
    return m(e.children.default());
}).join(""), A = {
  name: "sshpre",
  props: {
    language: { type: String, default: "" },
    label: { type: [String, Boolean], default: !1 },
    reactive: { type: Boolean, default: !1 },
    dark: { type: Boolean, default: !1 },
    copyButton: { type: Boolean, default: !1 }
  },
  data: () => ({
    knownLanguages: Object.keys(p),
    content: "",
    slotTexts: ""
  }),
  methods: {
    htmlize(t) {
      return t.replace(/&(lt|gt|amp);/g, (e, n) => ({ lt: "<", gt: ">", amp: "&" })[n]);
    },
    unhtmlize(t) {
      return t.replace(/[<>]/g, (e) => ({ "<": "&lt;", ">": "&gt;" })[e]);
    },
    isColorDark(t) {
      let e, n, l, a, o, i;
      if (e = t.match(/rgba?\((.*),\s*(.*),\s*(.*?)(?:,\s*([^)]*))\)/))
        l = parseInt(e[1]) <= 100, a = parseInt(e[2]) <= 100, o = parseInt(e[3]) <= 100, i = parseFloat(e[4]) < 0.3;
      else if (n = t.match(/#([\da-f]{3}(?:[\da-f]{3})?)/)) {
        const r = n[1].length === 3;
        l = parseInt(n[1][0]) <= 9, a = parseInt(n[1][r ? 1 : 2]) <= 9, o = parseInt(n[1][r ? 2 : 4]) <= 9;
      }
      return (l && a && o || l && a && !o || !l && a && o) && !i;
    },
    createRegexPattern() {
      let t = "";
      const e = [];
      for (const n in p[this.language]) {
        const l = $[this.language][n] || 1;
        for (let a = 0; a < l; a++)
          e.push(n);
        t += (t ? "|" : "") + p[this.language][n].source;
      }
      return [t, e];
    },
    syntaxHighlightHtmlTag(t) {
      const e = (l, a, o, i, r) => `${a}<span class="attribute">${o}</span>` + (r ? '<span class="punctuation">=</span>' : "") + (r ? `<span class="quote">${i || ""}${r || ""}${i || ""}</span>` : "");
      let n = (t[2] || "").replace(k[this.language], e);
      if (this.language === "pug") {
        const l = (t[1] || "").replace(/#[a-z\d-]+/g, (a) => `<span class="id">${a}</span>`).replace(/\.[a-z\d-]+/g, (a) => `<span class="class">${a}</span>`);
        return n && (n = '<span class="punctuation">(</span>' + n + '<span class="punctuation">)</span>'), `<span class="tag-name">${t[0] || ""}</span>${l}${n}` + (t[3] ? '<span class="punctuation">.</span>' : "") + (t[4] || "") + (t[5] ? `<span class="text">${t[5]}</span>` : "");
      }
      return `<span class="punctuation">${t[0]}</span><span class="tag-name">${t[1]}</span>` + n + `<span class="punctuation">${t[3]}</span>`;
    },
    syntaxHighlightContent(t) {
      if (!this.knownLanguages.includes(this.language))
        return t;
      const [e, n] = this.createRegexPattern();
      return this.unhtmlize(t).replace(new RegExp(e, "gs"), (l, ...a) => {
        a = a.slice(0, a.length - 2);
        let o;
        const i = this.language === "pug";
        let r = a.find((c, u) => c && (o = n[u]) && c);
        if (o === "quote")
          r = this.unhtmlize(r);
        else if (o === "comment")
          if (i) {
            const [c, u, d] = a.slice(n.indexOf("comment"));
            r = `${c}${u}${this.unhtmlize(d)}`;
          } else
            r = this.unhtmlize(r);
        else {
          if (o === "text" && i)
            return `${a[0]}<span class="punctuation">|</span>${a[1]}<span class="text">${a[2]}</span>`;
          if (o === "text2" && i) {
            const [, , , c, u, d] = a, y = this.syntaxHighlightContent(u);
            return `${c}${y}<span class="punctuation">.</span>
<span class="text">${d}</span>`;
          } else {
            if (o === "tag" && ["xml", "html", "html-vue", "pug"].includes(this.language))
              return this.syntaxHighlightHtmlTag(a.slice(n.indexOf("tag")));
            if (o === "variable" && r[0] === "." && this.language === "js")
              return `<span class="punctuation">.</span><span class="obj-attr">${r.substr(1)}</span>`;
          }
        }
        let g = "";
        return o === "color" && this.language === "css" && (g = ` style="background-color: ${r};color: #${this.isColorDark(r) ? "fff" : "000"}"`), o && `<span class="${o}"${g}>${r}</span>` || "";
      });
    },
    checkSlots() {
      const t = this.$slots.default && m(this.$slots.default()) || "";
      this.slotTexts !== t && (this.slotTexts = t, this.content = this.syntaxHighlightContent(this.slotTexts));
    },
    copyCode(t) {
      t.target.insertAdjacentHTML(
        "afterend",
        `<textarea id="clipboard-textarea">${this.$refs.code.innerText}</textarea>`
      );
      const e = document.getElementById("clipboard-textarea");
      e.select(), e.setSelectionRange(0, 99999), document.execCommand("copy"), e.remove(), this.$emit("copied", this.$refs.code.innerText);
    }
  },
  mounted() {
    this.checkSlots();
  }
}, C = ["data-type", "data-label", "reactive"], _ = ["innerHTML"];
function q(t, e, n, l, a, o) {
  return h(), b("div", {
    class: x(["ssh-pre", { "ssh-pre--dark": n.dark }]),
    "data-type": n.language,
    "data-label": n.label || null,
    reactive: n.reactive && o.checkSlots() || null
  }, [
    n.copyButton ? (h(), b("button", {
      key: 0,
      class: "ssh-pre__copy",
      onClick: e[0] || (e[0] = (...i) => o.copyCode && o.copyCode(...i))
    }, [
      E(t.$slots, "copy-button", {}, () => [
        f("Copy")
      ])
    ])) : w("", !0),
    f(),
    v("pre", {
      ref: "code",
      class: "ssh-pre__content",
      innerHTML: t.content
    }, null, 8, _)
  ], 10, C);
}
const N = /* @__PURE__ */ T(A, [["render", q]]);
export {
  N as default
};
