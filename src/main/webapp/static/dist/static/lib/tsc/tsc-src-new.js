/**
 *
 * 加密，解密 http://tool.lu/js/
 *
 */
var TSCObject = function (data) {
    this.p_device_id;
    this.p_device_id_time;
    this.p_session_id;
    this.p_time_offset;
    this.p_schedule_fun_id;
    this.p_tsc_code_fun_id;
    this.p_check_did_fun_id;
    this.p_relogin_schedule = 900000;
    this.p_partnerCode;
    this.p_appId;
    this.p_externalId;
    this.p_sdc_version = "10";
    this.p_api_type;
    this.p_user_token;
    this.qr_options = {};
    this.cloud_app_key = "de82967019906571ae879c460358e148";
    if (data) this.qr_options = data
};
TSCObject.prototype.init = function (partnerCode, apiType,did,userToken,timeOffset) {
    this.p_partnerCode = partnerCode;
    this.p_api_type = apiType;
    this.p_device_id = did;
    this.p_user_token = userToken;
    this.p_time_offset = timeOffset;
};
TSCObject.prototype.getSessionId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

TSCObject.prototype.generateTscCode = function () {
    this.sdc_login(this);
};
TSCObject.prototype.tscFunc = function () {
    this.sdc_login(this);
};

TSCObject.prototype.sig = function (obj) {
    var sigE = encodeURIComponent(obj);
    sigE = sigE.replace("*", "%2A");
    sigE = sigE.replace(" ", "%20");
    return b64_hmac_sha1(this.cloud_app_key + '&', sigE);
};

TSCObject.prototype.sdc_login = function (obj) {
    clearInterval(obj.p_tsc_code_fun_id);
    obj.p_tsc_code_fun_id = doGenerate(obj.p_api_type, obj.p_device_id, obj.p_user_token, obj.p_partnerCode, obj.p_time_offset, obj.p_sdc_version, obj.qr_options);
};

var tscSdkObj;
function doGenTsc(apiType, qrOptions,did,userToken,timeOffset) {
    tscSdkObj = new TSCObject(qrOptions);
    partnerCode = "000";
    tscSdkObj.init(partnerCode, apiType,did,userToken,timeOffset);
    tscSdkObj.generateTscCode();
}
function showTime(wast_time) {
}
function showStar(i) {
}
var g_PGS_Type = "";
var g_PGS_DeviceId = "";
var g_PGS_UserToken = "";
var g_PGS_PartCode = "";
var g_PGS_TimeOffset = 0;
var g_PGS_Version = "";
var g_PGS_Width = 256;
var g_PGS_Height = 256;
var g_options = {};
function doGenerateInternal() {
    var now = "" + (new Date()).getTime();
    var time = parseInt(now.substring(0, now.length - 3)) - g_PGS_TimeOffset;
    var code = generateDynamicCode(g_PGS_DeviceId, time, g_PGS_UserToken, g_PGS_UserToken, g_PGS_PartCode, g_PGS_Version);
    var data = g_PGS_Type + code;
    generateQRcode(data);
    jQuery('#qrcodeNum').text(data)
}
function generateQRcode(data) {
    var width = 256;
    var height = 256;
    var background = "#efefef";
    var foreground = "#424647";
    if (g_options["width"]) {
        width = g_options["width"]
    }
    ;
    if (g_options["height"]) {
        height = g_options["height"]
    }
    ;
    if (g_options["foreground"]) {
        foreground = g_options["foreground"]
    }
    ;
    if (g_options["background"]) {
        background = g_options["background"]
    }
    ;
    jQuery('#qrcodeCanvas').empty();
    jQuery('#qrcodeCanvas').qrcode({
        width: width,
        height: height,
        background: background,
        foreground: foreground,
        text: data
    })
}
function doGenerate(type, deviceId, userToken, partCode, timeOffset, version, options) {
    g_PGS_Type = type;
    g_PGS_DeviceId = deviceId;
    g_PGS_UserToken = userToken;
    g_PGS_PartCode = partCode;
    g_PGS_TimeOffset = timeOffset;
    g_PGS_Version = version;
    g_options = options;
    if (!g_options) {
        g_options = {}
    }
    ;
    var timeId = setInterval(doGenerateInternal, 1000);
    doGenerateInternal();
    return timeId
}
function generateToken(deviceId, time, userId) {
    var tokenValueString = "";
    var otpstr = time + deviceId + userId;
    var otphex = hex_md5(otpstr);
    var i = 0;
    var digitNum = 0;
    while (i < otphex.length && digitNum < 6) {
        var c = otphex[i++];
        if (!isNaN(c)) {
            tokenValueString += c;
            digitNum++
        }
    }
    return tokenValueString
}
function generateDynamicCode(deviceId, time, userId, userKey, partCode, version) {
    if (8 != userKey.length) {
        return null
    }
    var token = generateToken(deviceId, time, userId);
    var temp = userKey + token;
    var result = encodeNumberID(temp, partCode.substr(0, 3), version);
    return result
}
var hexcase = 0;
var b64pad = "=";
var chrsz = 8;
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data))
}
function core_sha1(x, len) {
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde)
    }
    return Array(a, b, c, d, e)
}
function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d
}
function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514
}
function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160)
}
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF)
}
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
}
function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
    return bin
}
function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
        }
    }
    return str
}