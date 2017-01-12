var systemMessage = require('egis-system-message');
var $ = require('egis-jquery');
var statusCode = {
    404: function () {
        systemMessage.error('网络错误');
    },
    500: function () {
        systemMessage.error('网络错误！');
    },

    501: function () {
        systemMessage.error('网络错误！');
    },

    502: function () {
        systemMessage.error('网络错误！');
    },

    503: function () {
        systemMessage.error('网络错误！');
    }
};

var global =window,
//sessionStorage = base.sessionStorage,
    currentPageUrl = location.href.split('?').shift(),
    loginPageUrl = window.baseUrl + '/login.html',

// data.status
// '0'      失败--表示请求完成，但没有可用的数据
// '1'      成功--表示请求完成，有可用的数据
// '-99'    未登录
    isFail = '0',
    isDone = '1',
    isNotLogin = '-99',

    jsonp = {
        type: 'GET',
        dataType: 'jsonp',
        statusCode: statusCode
    },
    json = {
        type: 'GET',
        dataType: 'json',
        statusCode: statusCode
    },
    jsonpost = {
        type: 'POST',
        dataType: 'json',
        statusCode: statusCode
    };

/**
 * 统一处理请求成功时接口返回的消息
 *    '-99'，未登录，转到登录页
 *    '1'，接口返回可用结果时，调用doneFn回调函数
 *    '0'，其它，调用failFn回调函数，并在控制台显示错误信息
 * @param {Object} data
 * @param {Function} doneFn 可选
 * @param {Function} failFn 可选
 */
function done(data, doneFn, failFn) {
    if ($.isEmptyObject(data = data || {})) {
        fail.call(this, data, '返回的信息为空对象');
        return;
    }

    //clearNullValue(data);

    switch (data.status) {
        case isNotLogin:
            //sessionStorage.clear();
            global.location.href = loginPageUrl;
            break;
        case isDone:
            $.isFunction(doneFn) && doneFn(data);
            break;
        // 无可用数据时，优选调用 failFn
        // 如果没有传 failFn 则调用 doneFn
        // 在无可用数据时，在控制台报错
        case isFail:
            if ($.isFunction(failFn)) {
                failFn(data);
            } else {
                if (currentPageUrl !== loginPageUrl) {
                    try {
                        $.isFunction(doneFn) && doneFn(data);
                    } catch (e) {}
                }
            }
            fail.call(this, data);
            break;
        default:
            fail.call(this, data);
            break;
    }
}

/**
 * 统一处理请求失败与请求成功后不可用的错误消息
 * @param {Object} jqXHR
 * @param {String} errorMsg 可选
 */
function fail(jqXHR, errorMsg) {
    var context = this,
        newline = '\n',
        indentation = Array(10).join(' '),
        property = [
            'message',
            'result',
            'statusText',
            'status',
            'detail',
            'url'
        ],
        errorInfo = [];

    if (errorMsg) {
        jqXHR[ property[0] ] = errorMsg;
        if (global.console) {
            global.console.error(errorMsg)
        }
    }

    $.each(property, function (i, n) {
        if (jqXHR[ n ] || context[ n ]) {
            errorInfo[errorInfo.length] =
                newline + n + ' :' + newline +
                indentation + (jqXHR[ n ] || context[ n ]);
        }
    });

    if (global.console) {
        global.console.error(errorInfo.join(''));
    }
}

function always() {
}


/**
 * 提交表单时，将无值的表单项过滤掉
 * @param $form $('#formId')
 * @param handler 处理函数 可选
 * @returns {String}
 */
function clearEmptyValue($form, handler) {
    var dataArray = [];
    $.each($form.serializeArray(), function (i, n) {
        if (n.value !== '') {
            n.value = $.trim(n.value);
            $.isFunction(handler) && handler(n);
            dataArray.push(n);
        }
    });
    return $.param(dataArray);
}


function clearNullValue(obj) {
    $.each(obj || {}, function (key, val) {
        if (val === null ||
            ($.isArray(val) && val.length === 0)) {
            delete obj[key];
        } else if ($.isArray(val) ||
            $.isPlainObject(val)) {
            clearNullValue(val);
        }
    });
}


module.exports= {
    isNotLogin: isNotLogin,
    jsonp: jsonp,
    json: json,
    jsonpost: jsonpost,
    statusCode: statusCode,

    done: done,
    fail: fail,
    always: always,

    clearEmptyValue: clearEmptyValue,
    clearNullValue: clearNullValue
};
