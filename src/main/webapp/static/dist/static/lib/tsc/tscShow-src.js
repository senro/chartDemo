/**
 * Created by sql on 14-7-28.
 * 加密，解密：http://tool.lu/js/
 */

var tscParam = getTscParam();
var sessionId = tscParam.sessionId;
var tsctype = tscParam.type;
var tscwidth = tscParam.width;
var tscheight = tscParam.height;
var customerEmail = tscParam.customerEmail;
var ha_timeid;
var quick = true;


function checkLogin() {
    if (!quick) {
        return;
    }
    var _time = new Date().getTime();
    $.post("checkquicklogin?s=" + sessionId + "&t=" + _time, {}, function (result) {
        var res = jQuery.parseJSON(result);
        if ('S' === res.status) {
            clearInterval(ha_timeid); //stop check the status.
            if (null != res.url) {
                window.location.href = res.url;
            } else {
                window.location.href = "memberCenter/";
            }

        }
    });
}

$(function () {
    var partnerCode = '000';
    var appId = '10125';
    var appKey = '4598a284c38efa20fd0747b1b567a079';
    var externalId = partnerCode + "|" + appId + "|" + sessionId;
    if ('002' == tsctype) {
        externalId = partnerCode + "|" + appId + "|" + customerEmail + "|" + sessionId + "|1";
    } else {
        ha_timeid = setInterval(checkLogin, 3000);
    }
    doGenTsc(appId, externalId, tsctype, appKey, {width: tscwidth, height: tscheight});
});

function clearIntervalTime() {
    clearInterval(ha_timeid);
}

function qrLogin() {
    quick = true;
}

function traditionLogin() {
    quick = false;
}

function isQRLogin() {
    return quick;
}


