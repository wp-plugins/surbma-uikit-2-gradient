!function(t){if("function"==typeof define&&define.amd&&define("uikit",function(){var i=t(window,window.jQuery,window.document);return i.load=function(t,e,n,o){var s=t.split(","),a=[],r,u=(o.config&&o.config.uikit&&o.config.uikit.base?o.config.uikit.base:"").replace(/\/+$/g,"");if(!u)throw new Error("Please define base path to UIkit in the requirejs config.");for(r=0;r<s.length;r+=1){var c=s[r].replace(/\./g,"/");a.push(u+"/components/"+c)}e(a,function(){n(i)})},i}),!window.jQuery)throw new Error("UIkit requires jQuery");window&&window.jQuery&&t(window,window.jQuery,window.document)}(function(t,$,i){"use strict";var e=$.UIkit||{},n=$("html"),o=$(window),s=$(document);if(e.fn)return e;if(e.version="2.12.0",e.$doc=s,e.$win=o,e.$html=n,e.fn=function(t,i){var n=arguments,o=t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),s=o[1],a=o[2];return e[s]?this.each(function(){var t=$(this),o=t.data(s);o||t.data(s,o=e[s](this,a?void 0:i)),a&&o[a].apply(o,Array.prototype.slice.call(n,1))}):($.error("UIkit component ["+s+"] does not exist."),this)},e.support={},e.support.transition=function(){var t=function(){var t=i.body||i.documentElement,e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in e)if(void 0!==t.style[n])return e[n]}();return t&&{end:t}}(),e.support.animation=function(){var t=function(){var t=i.body||i.documentElement,e={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"},n;for(n in e)if(void 0!==t.style[n])return e[n]}();return t&&{end:t}}(),e.support.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},e.support.touch="ontouchstart"in window&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,e.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||null,e.Utils={},e.Utils.debounce=function(t,i,e){var n;return function(){var o=this,s=arguments,a=function(){n=null,e||t.apply(o,s)},r=e&&!n;clearTimeout(n),n=setTimeout(a,i),r&&t.apply(o,s)}},e.Utils.removeCssRules=function(t){var i,e,n,o,s,a,r,u,c,l;t&&setTimeout(function(){try{for(l=document.styleSheets,o=0,r=l.length;r>o;o++){for(n=l[o],e=[],n.cssRules=n.cssRules,i=s=0,u=n.cssRules.length;u>s;i=++s)n.cssRules[i].type===CSSRule.STYLE_RULE&&t.test(n.cssRules[i].selectorText)&&e.unshift(i);for(a=0,c=e.length;c>a;a++)n.deleteRule(e[a])}}catch(d){}},0)},e.Utils.isInView=function(t,i){var e=$(t);if(!e.is(":visible"))return!1;var n=o.scrollLeft(),s=o.scrollTop(),a=e.offset(),r=a.left,u=a.top;return i=$.extend({topoffset:0,leftoffset:0},i),u+e.height()>=s&&u-i.topoffset<=s+o.height()&&r+e.width()>=n&&r-i.leftoffset<=n+o.width()?!0:!1},e.Utils.checkDisplay=function(t,i){var e=$("[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]",t||document),n;return t&&!e.length&&(e=$(t)),e.trigger("uk.check.display"),i&&("string"!=typeof i&&(i='[class*="uk-animation-"]'),e.find(i).each(function(){var t=$(this),i=t.attr("class"),e=i.match(/uk\-animation\-(.+)/);t.removeClass(e[0]).width(),t.addClass(e[0])})),e},e.Utils.options=function(t){if($.isPlainObject(t))return t;var i=t?t.indexOf("{"):-1,e={};if(-1!=i)try{e=new Function("","var json = "+t.substr(i)+"; return JSON.parse(JSON.stringify(json));")()}catch(n){}return e},e.Utils.animate=function(t,i){var n=$.Deferred();return t=$(t),t.css("display","none").addClass(i).one(e.support.animation.end,function(){t.removeClass(i),n.resolve()}).width(),t.css("display",""),n.promise()},e.Utils.template=function(t,i){for(var e=t.replace(/\n/g,"\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g,"{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),n=0,o,s,a,r,u,c=[],l=0;n<e.length;){if(o=e[n],o.match(/\{\{\s*(.+?)\s*\}\}/))switch(n+=1,o=e[n],s=o[0],a=o.substring(o.match(/^(\^|\#|\!|\~|\:)/)?1:0),s){case"~":c.push("for(var $i=0;$i<"+a+".length;$i++) { var $item = "+a+"[$i];"),l++;break;case":":c.push("for(var $key in "+a+") { var $val = "+a+"[$key];"),l++;break;case"#":c.push("if("+a+") {"),l++;break;case"^":c.push("if(!"+a+") {"),l++;break;case"/":c.push("}"),l--;break;case"!":c.push("__ret.push("+a+");");break;default:c.push("__ret.push(escape("+a+"));")}else c.push("__ret.push('"+o.replace(/\'/g,"\\'")+"');");n+=1}u=["var __ret = [];","try {","with($data){",l?'__ret = ["Not all blocks are closed correctly."]':c.join(""),"};","}catch(e){__ret = [e.message];}",'return __ret.join("").replace(/\\n\\n/g, "\\n");',"function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n");var d=new Function("$data",u);return i?d(i):d},e.Utils.events={},e.Utils.events.click=e.support.touch?"tap":"click",$.UIkit=e,$.fn.uk=e.fn,$.UIkit.langdirection="rtl"==n.attr("dir")?"right":"left",e.components={},e.component=function(t,i){var n=function(i,e){var o=this;this.element=i?$(i):null,this.options=$.extend(!0,{},this.defaults,e),this.plugins={},this.element&&this.element.data(t,this),this.init(),(this.options.plugins.length?this.options.plugins:Object.keys(n.plugins)).forEach(function(t){n.plugins[t].init&&(n.plugins[t].init(o),o.plugins[t]=!0)}),this.trigger("uk.component.init",[t,this])};return n.plugins={},$.extend(!0,n.prototype,{defaults:{plugins:[]},init:function(){},on:function(){return $(this.element||this).on.apply(this.element||this,arguments)},one:function(){return $(this.element||this).one.apply(this.element||this,arguments)},off:function(t){return $(this.element||this).off(t)},trigger:function(t,i){return $(this.element||this).trigger(t,i)},find:function(t){return this.element?this.element.find(t):$([])},proxy:function(t,i){var e=this;i.split(" ").forEach(function(i){e[i]||(e[i]=function(){return t[i].apply(t,arguments)})})},mixin:function(t,i){var e=this;i.split(" ").forEach(function(i){e[i]||(e[i]=t[i].bind(e))})}},i),this.components[t]=n,this[t]=function(){var i,n;if(arguments.length)switch(arguments.length){case 1:"string"==typeof arguments[0]||arguments[0].nodeType||arguments[0]instanceof jQuery?i=$(arguments[0]):n=arguments[0];break;case 2:i=$(arguments[0]),n=arguments[1]}return i&&i.data(t)?i.data(t):new e.components[t](i,n)},n},e.plugin=function(t,i,e){this.components[t].plugins[i]=e},e.domObservers=[],e.domready=!1,e.ready=function(t){e.domObservers.push(t),e.domready&&t(document)},e.on=function(){return 2==arguments.length&&0===arguments[0].indexOf("uk.domready")&&e.domready&&arguments[1].apply(s),s.on.apply(s,arguments)},e.one=function(){return 2==arguments.length&&0===arguments[0].indexOf("uk.domready")&&e.domready?(arguments[1].apply(s),s):s.one.apply(s,arguments)},e.trigger=function(t,i){return s.trigger(t,i)},e.domObserve=function(t,i){e.support.mutationobserver&&(i=i||function(){},$(t).each(function(){var t=this,n=$(t);if(!n.data("observer"))try{var o=new e.support.mutationobserver(e.Utils.debounce(function(e){i.apply(t,[]),n.trigger("uk.dom.changed")},50));o.observe(t,{childList:!0,subtree:!0}),n.data("observer",o)}catch(s){}}))},e.ready(function(t){e.domObserve($("[data-uk-observe]",t||document))}),e.on("uk.domready",function(){e.domObservers.forEach(function(t){t(document)}),e.domready&&e.Utils.checkDisplay(document)}),e.on("uk.dom.changed",function(t){var i=t.target;e.domObservers.forEach(function(t){t(i)}),e.Utils.checkDisplay(i)}),$(function(){e.trigger("uk.domready.before"),setInterval(function(){var t={x:window.pageXOffset,y:window.pageYOffset},i=function(){(t.x!=window.pageXOffset||t.y!=window.pageYOffset)&&(t={x:window.pageXOffset,y:window.pageYOffset},s.trigger("uk-scroll",[t]))};return $.UIkit.support.touch&&s.on("touchmove touchend MSPointerMove MSPointerUp",i),(t.x||t.y)&&i(),i}(),15),e.trigger("uk.domready"),e.support.touch&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&e.$win.on("load orientationchange resize",e.Utils.debounce(function(){var t=function(){return $(".uk-height-viewport").css("height",window.innerHeight),t};return t()}(),100)),e.trigger("uk.domready.after"),e.domready=!0}),n.addClass(e.support.touch?"uk-touch":"uk-notouch"),e.support.touch){var a=!1,r=".uk-overlay, .uk-overlay-toggle, .uk-caption-toggle, .uk-animation-hover, .uk-has-hover",u;n.on("touchstart MSPointerDown pointerdown",r,function(){a&&$(".uk-hover").removeClass("uk-hover"),a=$(this).addClass("uk-hover")}).on("touchend MSPointerUp pointerup",function(t){u=$(t.target).parents(r),a&&a.not(u).removeClass("uk-hover")})}return e}),function($,t){"use strict";var i=!1,e;t.component("dropdown",{defaults:{mode:"hover",remaintime:800,justify:!1,boundary:t.$win,delay:0},remainIdle:!1,init:function(){var i=this;this.dropdown=this.find(".uk-dropdown"),this.centered=this.dropdown.hasClass("uk-dropdown-center"),this.justified=this.options.justify?$(this.options.justify):!1,this.boundary=$(this.options.boundary),this.flipped=this.dropdown.hasClass("uk-dropdown-flip"),this.boundary.length||(this.boundary=t.$win),"click"==this.options.mode||t.support.touch?this.on("click",function(t){var e=$(t.target);e.parents(".uk-dropdown").length||((e.is("a[href='#']")||e.parent().is("a[href='#']")||i.dropdown.length&&!i.dropdown.is(":visible"))&&t.preventDefault(),e.blur()),i.element.hasClass("uk-open")?(e.is("a:not(.js-uk-prevent)")||e.is(".uk-dropdown-close")||!i.dropdown.find(t.target).length)&&i.hide():i.show()}):this.on("mouseenter",function(t){i.remainIdle&&clearTimeout(i.remainIdle),e&&clearTimeout(e),e=setTimeout(i.show.bind(i),i.options.delay)}).on("mouseleave",function(){e&&clearTimeout(e),i.remainIdle=setTimeout(function(){i.hide()},i.options.remaintime)}).on("click",function(t){var e=$(t.target);i.remainIdle&&clearTimeout(i.remainIdle),(e.is("a[href='#']")||e.parent().is("a[href='#']"))&&t.preventDefault(),i.show()})},show:function(){t.$html.off("click.outer.dropdown"),i&&i[0]!=this.element[0]&&i.removeClass("uk-open"),e&&clearTimeout(e),this.checkDimensions(),this.element.addClass("uk-open"),this.trigger("uk.dropdown.show",[this]),t.Utils.checkDisplay(this.dropdown,!0),i=this.element,this.registerOuterClick()},hide:function(){this.element.removeClass("uk-open"),this.remainIdle=!1,i&&i[0]==this.element[0]&&(i=!1)},registerOuterClick:function(){var n=this;t.$html.off("click.outer.dropdown"),setTimeout(function(){t.$html.on("click.outer.dropdown",function(o){e&&clearTimeout(e);var s=$(o.target);i&&i[0]==n.element[0]&&(s.is("a:not(.js-uk-prevent)")||s.is(".uk-dropdown-close")||!n.dropdown.find(o.target).length)&&(n.hide(),t.$html.off("click.outer.dropdown"))})},10)},checkDimensions:function(){if(this.dropdown.length){this.justified&&this.justified.length&&this.dropdown.css("min-width","");var t=this,i=this.dropdown.css("margin-"+$.UIkit.langdirection,""),e=i.show().offset(),n=i.outerWidth(),o=this.boundary.width(),s=this.boundary.offset()?this.boundary.offset().left:0;if(this.centered&&(i.css("margin-"+$.UIkit.langdirection,-1*(parseFloat(n)/2-i.parent().width()/2)),e=i.offset(),(n+e.left>o||e.left<0)&&(i.css("margin-"+$.UIkit.langdirection,""),e=i.offset())),this.justified&&this.justified.length){var a=this.justified.outerWidth();if(i.css("min-width",a),"right"==$.UIkit.langdirection){var r=o-(this.justified.offset().left+a),u=o-(i.offset().left+i.outerWidth());i.css("margin-right",r-u)}else i.css("margin-left",this.justified.offset().left-e.left);e=i.offset()}n+(e.left-s)>o&&(i.addClass("uk-dropdown-flip"),e=i.offset()),e.left-s<0&&(i.addClass("uk-dropdown-stack"),i.hasClass("uk-dropdown-flip")&&(this.flipped||(i.removeClass("uk-dropdown-flip"),e=i.offset(),i.addClass("uk-dropdown-flip")),setTimeout(function(){(i.offset().left-s<0||!t.flipped&&i.outerWidth()+(e.left-s)<o)&&i.removeClass("uk-dropdown-flip")},0)),this.trigger("uk.dropdown.stack",[this])),i.css("display","")}}});var n=t.support.touch?"click":"mouseenter";t.$html.on(n+".dropdown.uikit","[data-uk-dropdown]",function(i){var e=$(this);if(!e.data("dropdown")){var o=t.dropdown(e,t.Utils.options(e.data("uk-dropdown")));("click"==n||"mouseenter"==n&&"hover"==o.options.mode)&&o.element.trigger(n),o.element.find(".uk-dropdown").length&&i.preventDefault()}})}(jQuery,jQuery.UIkit),function($,t){"use strict";function i(t){var i=$(t),e="auto";if(i.is(":visible"))e=i.outerHeight();else{var n={position:i.css("position"),visibility:i.css("visibility"),display:i.css("display")};e=i.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),i.css(n)}return e}t.component("nav",{defaults:{toggle:">li.uk-parent > a[href='#']",lists:">li.uk-parent > ul",multiple:!1},init:function(){var t=this;this.on("click",this.options.toggle,function(i){i.preventDefault();var e=$(this);t.open(e.parent()[0]==t.element[0]?e:e.parent("li"))}),this.find(this.options.lists).each(function(){var i=$(this),e=i.parent(),n=e.hasClass("uk-active");i.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'),e.data("list-container",i.parent()),n&&t.open(e,!0)})},open:function(t,e){var n=this.element,o=$(t);this.options.multiple||n.children(".uk-open").not(t).each(function(){$(this).data("list-container")&&$(this).data("list-container").stop().animate({height:0},function(){$(this).parent().removeClass("uk-open")})}),o.toggleClass("uk-open"),o.data("list-container")&&(e?o.data("list-container").stop().height(o.hasClass("uk-open")?"auto":0):o.data("list-container").stop().animate({height:o.hasClass("uk-open")?i(o.data("list-container").find("ul:first")):0}))}}),t.ready(function(i){$("[data-uk-nav]",i).each(function(){var i=$(this);if(!i.data("nav"))var e=t.nav(i,t.Utils.options(i.attr("data-uk-nav")))})})}(jQuery,jQuery.UIkit),function($,t){"use strict";function i(i,e,n){var o=$.Deferred(),s=i,a=i,r;return n[0]===e[0]?(o.resolve(),o.promise()):("object"==typeof i&&(s=i[0],a=i[1]||i[0]),r=function(){e&&e.hide().removeClass("uk-active "+a+" uk-animation-reverse"),n.addClass(s).one(t.support.animation.end,function(){n.removeClass(""+s).css({opacity:"",display:""}),o.resolve(),e&&e.css({opacity:"",display:""})}.bind(this)).show()},n.css("animation-duration",this.options.duration+"ms"),e&&e.length?(e.css("animation-duration",this.options.duration+"ms"),e.css("display","none").addClass(a+" uk-animation-reverse").one(t.support.animation.end,function(){r()}.bind(this)).css("display","")):(n.addClass("uk-active"),r()),o.promise())}var e;t.component("switcher",{defaults:{connect:!1,toggle:">*",active:0,animation:!1,duration:200},animating:!1,init:function(){var t=this;if(this.on("click",this.options.toggle,function(i){i.preventDefault(),t.show(this)}),this.options.connect){this.connect=$(this.options.connect).find(".uk-active").removeClass(".uk-active").end(),this.connect.length&&this.connect.on("click","[data-uk-switcher-item]",function(i){i.preventDefault();var e=$(this).data("ukSwitcherItem");if(t.index!=e)switch(e){case"next":case"previous":t.show(t.index+("next"==e?1:-1));break;default:t.show(e)}});var i=this.find(this.options.toggle),e=i.filter(".uk-active");e.length?this.show(e,!1):(e=i.eq(this.options.active),this.show(e.length?e:i.eq(0),!1))}},show:function(n,o){if(!this.animating){n=isNaN(n)?$(n):this.find(this.options.toggle).eq(n);var s=this,a=n,r=e[this.options.animation]||function(t,n){if(!s.options.animation)return e.none.apply(s);var o=s.options.animation.split(",");return 1==o.length&&(o[1]=o[0]),o[0]=o[0].trim(),o[1]=o[1].trim(),i.apply(s,[o,t,n])};o===!1&&(r=e.none),a.hasClass("uk-disabled")||(this.find(this.options.toggle).filter(".uk-active").removeClass("uk-active"),a.addClass("uk-active"),this.options.connect&&this.connect.length&&(this.index=this.find(this.options.toggle).index(a),-1==this.index&&(this.index=0),this.connect.each(function(){var i=$(this),e=i.children(),n=e.filter(".uk-active"),o=e.eq(s.index);s.animating=!0,r.apply(s,[n,o]).then(function(){n.removeClass("uk-active"),o.addClass("uk-active"),t.Utils.checkDisplay(o,!0),s.animating=!1})})),this.trigger("uk.switcher.show",[a]))}}}),e={none:function(){var t=$.Deferred();return t.resolve(),t.promise()},fade:function(t,e){return i.apply(this,["uk-animation-fade",t,e])},"slide-bottom":function(t,e){return i.apply(this,["uk-animation-slide-bottom",t,e])},"slide-top":function(t,e){return i.apply(this,["uk-animation-slide-top",t,e])},"slide-vertical":function(t,e,n){var o=["uk-animation-slide-top","uk-animation-slide-bottom"];return t&&t.index()>e.index()&&o.reverse(),i.apply(this,[o,t,e])},"slide-left":function(t,e){return i.apply(this,["uk-animation-slide-left",t,e])},"slide-right":function(t,e){return i.apply(this,["uk-animation-slide-right",t,e])},"slide-horizontal":function(t,e,n){var o=["uk-animation-slide-left","uk-animation-slide-right"];return t&&t.index()>e.index()&&o.reverse(),i.apply(this,[o,t,e])},scale:function(t,e){return i.apply(this,["uk-animation-scale-up",t,e])}},t.switcher.animations=e,t.ready(function(i){$("[data-uk-switcher]",i).each(function(){var i=$(this);if(!i.data("switcher"))var e=t.switcher(i,t.Utils.options(i.attr("data-uk-switcher")))})})}(jQuery,jQuery.UIkit),function($,t){"use strict";t.component("tab",{defaults:{target:">li:not(.uk-tab-responsive, .uk-disabled)",connect:!1,active:0,animation:!1,duration:200},init:function(){var i=this;this.on("click",this.options.target,function(t){t.preventDefault(),i.find(i.options.target).not(this).removeClass("uk-active").blur(),i.trigger("uk.tab.change",[$(this).addClass("uk-active")])}),this.options.connect&&(this.connect=$(this.options.connect)),this.responsivetab=$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'),this.responsivetab.dropdown=this.responsivetab.find(".uk-dropdown"),this.responsivetab.lst=this.responsivetab.dropdown.find("ul"),this.responsivetab.caption=this.responsivetab.find("a:first"),this.element.hasClass("uk-tab-bottom")&&this.responsivetab.dropdown.addClass("uk-dropdown-up"),this.responsivetab.lst.on("click","a",function(t){t.preventDefault(),t.stopPropagation();var e=$(this);i.element.children(":not(.uk-tab-responsive)").eq(e.data("index")).trigger("click")}),this.on("uk.switcher.show uk.tab.change",function(t,e){i.responsivetab.caption.html(e.text())}),this.element.append(this.responsivetab),this.options.connect&&t.switcher(this.element,{toggle:">li:not(.uk-tab-responsive)",connect:this.options.connect,active:this.options.active,animation:this.options.animation,duration:this.options.duration}),t.dropdown(this.responsivetab,{mode:"click"}),i.trigger("uk.tab.change",[this.element.find(this.options.target).filter(".uk-active")]),this.check(),t.$win.on("resize orientationchange",t.Utils.debounce(function(){i.element.is(":visible")&&i.check()},100)),this.on("uk.check.display",function(){i.element.is(":visible")&&i.check()})},check:function(){var t=this.element.children(":not(.uk-tab-responsive)").removeClass("uk-hidden");if(!(t.length<2)){var i=t.eq(0).offset().top+Math.ceil(t.eq(0).height()/2),e=!1,n,o;if(this.responsivetab.lst.empty(),t.each(function(){$(this).offset().top>i&&(e=!0)}),e)for(var s=0;s<t.length;s++)n=t.eq(s),o=n.find("a"),"none"==n.css("float")||n.attr("uk-dropdown")||(n.addClass("uk-hidden"),n.hasClass("uk-disabled")||this.responsivetab.lst.append('<li><a href="'+o.attr("href")+'" data-index="'+s+'">'+o.html()+"</a></li>"));this.responsivetab[this.responsivetab.lst.children().length?"removeClass":"addClass"]("uk-hidden")}}}),t.ready(function(i){$("[data-uk-tab]",i).each(function(){var i=$(this);if(!i.data("tab"))var e=t.tab(i,t.Utils.options(i.attr("data-uk-tab")))})})}(jQuery,jQuery.UIkit),function(t,$,i){"use strict";var e=[];i.component("toggle",{defaults:{target:!1,cls:"uk-hidden",animation:!1,duration:200},init:function(){var t=this;this.getTogglers(),this.on("click",function(i){t.element.is('a[href="#"]')&&i.preventDefault(),t.toggle()}),e.push(this)},toggle:function(){if(this.totoggle.length)if(this.options.animation){var t=this,e=this.options.animation.split(",");1==e.length&&(e[1]=e[0]),e[0]=e[0].trim(),e[1]=e[1].trim(),this.totoggle.css("animation-duration",this.options.duration+"ms"),this.totoggle.hasClass(this.options.cls)?(this.totoggle.toggleClass(this.options.cls),this.totoggle.each(function(){i.Utils.animate(this,e[0]).then(function(){$(this).css("animation-duration",""),i.Utils.checkDisplay(this)})})):this.totoggle.each(function(){i.Utils.animate(this,e[1]+" uk-animation-reverse").then(function(){$(this).toggleClass(t.options.cls).css("animation-duration",""),i.Utils.checkDisplay(this)}.bind(this))})}else this.totoggle.toggleClass(this.options.cls),i.Utils.checkDisplay(this.totoggle)},getTogglers:function(){this.totoggle=this.options.target?$(this.options.target):[]}}),i.ready(function(t){$("[data-uk-toggle]",t).each(function(){var t=$(this);if(!t.data("toggle"))var e=i.toggle(t,i.Utils.options(t.attr("data-uk-toggle")))}),setTimeout(function(){e.forEach(function(t){t.getTogglers()})},0)})}(this,jQuery,jQuery.UIkit);