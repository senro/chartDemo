var $ = require('egis-jquery');
var xhr = require('./xhr');
var systemMessage = require('egis-system-message');

var BeforeSend = function (xhr) {

};

var Complete = function () {
};

var statusCode = xhr.statusCode;


/***
 * 异步处理函数
 * @param asyncUrl 请求接口
 * @param requestParam 请求参数
 * @param callback 回调函数
 * @param beforeSend 前置函数
 * @param complete 处理完成
 */
function ajax(asyncUrl, requestParam, callback, beforeSend, complete, type, uselessCallback) {

    $.ajax({
        type: type || 'post',
        dataType: 'json',
        url: asyncUrl,
        data: requestParam || '',
        beforeSend: beforeSend || BeforeSend,
        complete: complete || Complete,
        statusCode: statusCode
    }).done(function (data) {

        function useful(data) {
            if (!$.isFunction(callback)) {
                callback = function (data) {
                };
            }
            callback(data);
        }

        function useless(data) {
            uselessCallback&&uselessCallback(data);
            if(!uselessCallback){
                systemMessage.error(data.detail || '操作失败！');
            }

        }

        xhr.done(data, useful, useless);
    }).fail(function (jqXHR) {
        xhr.fail.call(this, jqXHR, '操作失败！');
    });
}

/***
 * 同步处理函数
 * @param asyncUrl 请求接口
 * @param requestParam 请求参数
 * @param callback 回调函数
 * @param beforeSend 前置函数
 * @param complete 处理完成
 */
function syncAjax(asyncUrl, requestParam, callback, beforeSend, complete, type, uselessCallback) {

    $.ajax({
        type: type || 'post',
        dataType: 'json',
        url: asyncUrl,
        async:false,
        data: requestParam || '',
        beforeSend: beforeSend || BeforeSend,
        complete: complete || Complete,
        statusCode: statusCode
    }).done(function (data) {

        function useful(data) {
            if (!$.isFunction(callback)) {
                callback = function (data) {
                };
            }
            callback(data);
        }

        function useless(data) {
            uselessCallback&&uselessCallback(data);
            if(!uselessCallback){
                systemMessage.error(data.detail || '操作失败！');
            }

        }

        xhr.done(data, useful, useless);
    }).fail(function (jqXHR) {
        xhr.fail.call(this, jqXHR, '操作失败！');
    });
}

/***
 * 异步处理函数(jsonPadding)
 * @param asyncUrl 请求接口
 * @param requestParam 请求参数
 * @param callback 回调函数
 * @param beforeSend 前置函数
 * @param complete 处理完成
 */
function ajaxJSONP(asyncUrl, requestParam, callback, beforeSend, complete, type) {

    $.ajax({
        type: type || 'post',
        dataType: 'jsonp',
        jsonp:window.jsonp||'callback',
        url: asyncUrl,
        data: requestParam || '',
        beforeSend: beforeSend || BeforeSend,
        complete: complete || Complete,
        statusCode: statusCode
    }).done(function (data) {
        function useful(data) {
            if (!$.isFunction(callback)) {
                callback = function (data) {
                };
            }
            callback(data);
        }

        function useless(data) {
            systemMessage.info(data.detail || '操作失败！');
        }

        xhr.done(data, useful, useless);
    }).fail(function (jqXHR) {
        xhr.fail.call(this, jqXHR, '操作失败！');
    });
}

exports.ajax = ajax;
exports.syncAjax = syncAjax;
exports.ajaxJSONP = ajaxJSONP;