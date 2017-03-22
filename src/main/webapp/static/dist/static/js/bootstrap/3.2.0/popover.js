define(function(t){"use strict";function o(t){return this.each(function(){var o=e(this),r=o.data("bs.popover"),i="object"==typeof t&&t;(r||"destroy"!=t)&&(r||o.data("bs.popover",r=new n(this,i)),"string"==typeof t&&r[t]())})}var e=t("jquery"),n=(t("static/js/bootstrap/3.2.0/tooltip"),function(t,o){this.init("popover",t,o)});if(!e.fn.tooltip)throw new Error("Popover requires tooltip.js");n.VERSION="3.2.0",n.DEFAULTS=e.extend({},e.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),n.prototype=e.extend({},e.fn.tooltip.Constructor.prototype),n.prototype.constructor=n,n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.setContent=function(){var t=this.tip(),o=this.getTitle(),e=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](o),t.find(".popover-content").empty()[this.options.html?"string"==typeof e?"html":"append":"text"](e),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},n.prototype.hasContent=function(){return this.getTitle()||this.getContent()},n.prototype.getContent=function(){var t=this.$element,o=this.options;return t.attr("data-content")||("function"==typeof o.content?o.content.call(t[0]):o.content)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},n.prototype.tip=function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip};var r=e.fn.popover;return e.fn.popover=o,e.fn.popover.Constructor=n,e.fn.popover.noConflict=function(){return e.fn.popover=r,this},e});