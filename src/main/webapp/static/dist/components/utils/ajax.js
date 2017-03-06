define("components/utils/ajax.jsx",function(e,t,o){"use strict";function n(e,t,o,n,c,f,d,g,p){function h(e){if(e.status>=200&&e.status<300)return e;throw new Error(e.statusText)}function j(e){return"json"==d?e.json():e}var d=d||"json",c=c||"post",g=g||!0;g&&"string"!=typeof t&&(t=s(t));var v=i(e+("get"==c?"?"+t:""),{method:c,headers:p,body:"post"==c?t:""}).then(h).then(j).then(function(e){console.log("request succeeded with json response",e),String(e.status)===l?o&&o(e):String(e.status)===a?"function"==typeof f?f&&f(e):r.Message(e.detail||e.message||e.msg||"请求失败！"):String(e.status)===u?window.loginUrl&&(window.location.href=window.loginUrl):console.log("未识别的status码：",e.status),n&&n(e)})["catch"](function(e){console.log("request failed",e)});return v}function s(e,t){var t=t||"objToUrl",o=null;if("urlToObj"==t)if("string"==typeof e){var n=e.split("&");o={};for(var s=0;s<n.length;s++){var r=n[s],i=r.split("=")[0],l=r.split("=")[1];o[i]=l}}else console.log("urlToObj方式，data必须为a=x&b=xx格式字符串");else if(o=[],"object"==typeof e){for(var a in e)if(e[a]){var u=a+"="+encodeURIComponent(e[a]);o.push(u)}o=o.join("&")}else console.log("objToUrl方式，data必须为对象！");return o}Object.defineProperty(t,"__esModule",{value:!0});var r=e("node_modules/element-ui/lib/element-ui.common");window.__disableNativeFetch=!0;var i=e("node_modules/fetch-ie8/fetch"),l="1",a="0",u="-99";t["default"]=n,o.exports=t["default"]});