define(function (require,exports,module) {
    var base = require('base'),
        userKey = base.userKey;

    var $ = require('jquery');

    var xhr = require('xhr'),
        json = xhr.json,
        isNotLogin = xhr.isNotLogin,
        doneCallback = xhr.done,
        failCallback = xhr.fail;


    // /hoss/sys/resetPwd.do
    $(document).ready(function(){
        var $nav = $('.navigate-group'),
            $oldUsername = $('#username'),

            global = base.global,
            apiHost = base.apiHost,
            userId = base.userId,
            account = base.account,
            username = base.username,

            regPassword = /^.{6,}$/,
            $resetPasswordForm = $('#resetPasswordForm'),
            $userId = $('#userId'),
            $password = $('#password'),
            $resetPassword = $('#resetPassword'),
            $repeatPassword = $('#repassword'),
            $submit = $resetPasswordForm.find('[type=submit]'),
            $message = $('.error-message'),
            showWarning = function (msg) {
                $message.
                    removeClass('alert-success').
                    addClass('alert-warning').
                    html(msg).css({
                        visibility: 'visible'
                    });
            },
            showSuccess = function (msg) {
                $message.
                    removeClass('alert-warning').
                    addClass('alert-success').
                    html(msg || '操作完成。').css({
                        visibility: 'visible'
                    });
            };


        $userId.val(userId);
        $oldUsername.val(account);

        $password.val('');
        $repeatPassword.val('');



        $password.add($resetPassword).add($repeatPassword).on('input', function(){
            if (regPassword.test($.trim($(this).val()))) {
                $(this).removeClass('input-warning');
                $message.css({
                    visibility: 'hidden'
                });
            }
        });

        $resetPasswordForm.submit(function(){
            if ($submit.hasClass('disabled')) {
                return false;
            }

//            if (!regPassword.test($.trim($password.val()))) {
//                showWarning('登录密码不能小于六位');
//                $password.addClass('input-warning').focus();
//                return false;
//            }

            if (!regPassword.test($.trim($password.val()))) {
                showWarning('新的登录密码不能小于六位');
                $password.addClass('input-warning').focus();
                return false;
            }

            if (!regPassword.test($.trim($repeatPassword.val()))) {
                showWarning('确认密码不能小于六位');
                $repeatPassword.addClass('input-warning').focus();
                return false;
            }

            if ($.trim($repeatPassword.val()) !== $.trim($password.val())) {
                showWarning('两次新密码不一致');
                $repeatPassword.addClass('input-warning').focus();
                return false;
            }



            $.ajax($.extend({
                url: apiHost + '/login/resetPwd.do',
                data: $resetPasswordForm.serialize(),
                beforeSend: function () {
                    $submit.addClass('disabled');
                }
            }, json))
            .done(function (data) {
                var useful = function (data) {
                        showSuccess(data.detail);

                        $.ajax($.extend({
                            url: apiHost + '/login/logout.do',
                            data: {
                                key: userKey
                            }
                        }, json)).
                        done(function (logout) {
                            var that = this;
                            setTimeout(function(){
                                logout.status = isNotLogin;
                                doneCallback.call(that, logout);
                            }, 2000);
                        }).
                        fail(function (jqXHR) {
                            failCallback.call(this, jqXHR, '退出失败');
                        }).
                        always(function () {
                            sessionStorage.clear();
                        });
                    },
                    useless = function (data) {
                        showWarning(data.detail);
                    };

                doneCallback.call(this, data, useful, useless);
            })
            .fail(function () {
                showWarning('网络繁忙，请稍后重试！');
            })
            .always(function () {
                $submit.removeClass('disabled');
            });

            return false;
        });
    });
});