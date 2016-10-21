/**
 * Created by sql on 14-7-28.
 */

var tscParam = getTscParam();
var sessionId = tscParam.sessionId;
var tsctype = tscParam.type;
var tscwidth = tscParam.width;
var tscheight = tscParam.height;
var deviceId;
var userToken;
var timeOffSet;
var ha_timeid;
var quick = true;
var ha_userTokenFectch;
var ha_synctime;
var ha_did;

function checkLogin() {
    if (!quick) {
        return;
    }
    var _time = new Date().getTime();
    $.post(getAppPath()+"/checkquicklogin?s=" + sessionId+"&t=" + _time, {}, function (result) {
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
    var partnerCode = '002';
   /* var appId = '11354';
    var appKey = '99a4f300ad1f93f6776bfc976e7e9b7d';*/

   /* var appId = '11146';
    var appKey = 'cd3f7eb4efc608fa46a92a88afb68a4f';*/
    
     /*var externalId = partnerCode + "|" + appId + "|" + sessionId;
   if ('002' == tsctype) {
        externalId = partnerCode + "|" + appId + "|" + customerEmail + "|" + sessionId + "|1";
    } else {
        ha_timeid = setInterval(checkLogin, 3000);
    }*/
    //var tsctype = '002';
    //var systemNo = 'bbbfde46adcc43ee93e518fc0e78dba3';
//    var externalId = systemNo + "|" + account+ "|" +tscsecuridServerUrl;
    //var externalId = appId + "|" + systemNo + "|" + sessionId;

    if ('002' == tsctype) {
        ha_timeid = setInterval(checkLogin, 3000);
    }
    loginSynctime();
    loginTokenFetch();
    
//    doGenTsc(appId, externalId, tsctype, appKey, {width: tscwidth, height: tscheight});
    
    
});


function loginSynctime(){
	var _time = new Date().getTime();
    $.post(getAppPath()+"/loginSynctime?t=" + _time, {}, function (result) {
        var res = jQuery.parseJSON(result);
        timeOffSet = res.timeOffSet;
        GenTscFetch();
    });
}
function loginTokenFetch(){
        $.post(getAppPath()+"/loginTokenFetch?&type=" + tsctype, {}, function (result) {
            var res = jQuery.parseJSON(result);
            userToken = res.userToken;
            deviceId = res.deviceId;

            GenTscFetch();
        });
}
function GenTscFetch(){
	if (deviceId != null && deviceId != '' && deviceId != 'undefined'
      	 && userToken != null && userToken != '' && userToken != 'undefined'
      		 && timeOffSet != null && timeOffSet != '' && timeOffSet != 'undefined') {
      	setInterval(tscFun, 600000);
      	doGenTsc(tsctype, {width: tscwidth, height: tscheight},deviceId,userToken,timeOffSet);
	}
}

function tscFun(){
	loginSynctime();
	loginTokenFetch();
}

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


