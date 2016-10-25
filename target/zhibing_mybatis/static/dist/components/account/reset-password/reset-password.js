define("components/account/reset-password/reset-password",function(){define(function(s){var a=s("base"),e=a.userKey,i=s("jquery"),n=s("xhr"),t=n.json,o=n.isNotLogin,l=n.done,r=n.fail;i(document).ready(function(){var s=(i(".navigate-group"),i("#username")),n=(a.global,a.apiHost),d=a.userId,u=a.account,c=(a.username,/^.{6,}$/),f=i("#resetPasswordForm"),v=i("#userId"),m=i("#password"),g=i("#resetPassword"),w=i("#repassword"),b=f.find("[type=submit]"),p=i(".error-message"),C=function(s){p.removeClass("alert-success").addClass("alert-warning").html(s).css({visibility:"visible"})},h=function(s){p.removeClass("alert-warning").addClass("alert-success").html(s||"操作完成。").css({visibility:"visible"})};v.val(d),s.val(u),m.val(""),w.val(""),m.add(g).add(w).on("input",function(){c.test(i.trim(i(this).val()))&&(i(this).removeClass("input-warning"),p.css({visibility:"hidden"}))}),f.submit(function(){return b.hasClass("disabled")?!1:c.test(i.trim(m.val()))?c.test(i.trim(w.val()))?i.trim(w.val())!==i.trim(m.val())?(C("两次新密码不一致"),w.addClass("input-warning").focus(),!1):(i.ajax(i.extend({url:n+"/login/resetPwd.do",data:f.serialize(),beforeSend:function(){b.addClass("disabled")}},t)).done(function(s){var a=function(s){h(s.detail),i.ajax(i.extend({url:n+"/login/logout.do",data:{key:e}},t)).done(function(s){var a=this;setTimeout(function(){s.status=o,l.call(a,s)},2e3)}).fail(function(s){r.call(this,s,"退出失败")}).always(function(){sessionStorage.clear()})},d=function(s){C(s.detail)};l.call(this,s,a,d)}).fail(function(){C("网络繁忙，请稍后重试！")}).always(function(){b.removeClass("disabled")}),!1):(C("确认密码不能小于六位"),w.addClass("input-warning").focus(),!1):(C("新的登录密码不能小于六位"),m.addClass("input-warning").focus(),!1)})})})});