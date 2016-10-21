var protocol = window.location.protocol + '//',
    host = window.location.host,
    apiHost=GLOBAL_WY_APIHOST,      // 'http://172.16.24.187:9527/hw-sq-wy-web/',
    qrcodeHost=GLOBAL_WY_QRCODEHOST,//推广二维码地址
    baseUrl = protocol + host ;//online:protocol + host +'/estate_system'

window.baseUrl = baseUrl;
window.apiHost = apiHost;
window.qrcodeHost = qrcodeHost;

seajs.config({
    base: baseUrl,
    // 路径配置
    paths: {
        'bootstrap': 'static/js/bootstrap/3.2.0/'
    },
    alias: {
        "navigation": "components/navigation/navigation.js",
        "header": "components/header/header.js",
        "footer": "components/footer/footer.js",
        "login": "components/account/login/login.js",
        "logout": "components/account/logout/logout.js",
        "router": "components/router/router.js",
        //系统管理
        "systemManage": "components/systemManage/systemManage.js",
        //服务管理
        "serviceRepair": "components/serviceManage/serviceRepair/serviceRepair.js",
        "serviceComplaints": "components/serviceManage/serviceComplaints/serviceComplaints.js",
        "serviceVisit": "components/serviceManage/serviceVisit/serviceVisit.js",
        "serviceSetting": "components/serviceManage/serviceSetting/serviceSetting.js",
        //通知公告
        "notice": "components/announcements/notice/notice.js",
        "messageNotice": "components/announcements/messageNotice/messageNotice.js",
        //住户管理
        "householdManage": "components/householdManage/householdManage.js",
        //收入管理
        "incomeList": "components/incomeManage/incomeList/incomeList.js",
        "paySetting": "components/incomeManage/paySetting/paySetting.js",
        //访客管理
        "visitorManage": "components/visitorManage/visitorManage.js",
        //快件管理
        "expressList": "components/expressManage/expressList/expressList.js",
        "ownersDelivery": "components/expressManage/ownersDelivery/ownersDelivery.js",
        //人员管理
        "personnelManage": "components/personnelManage/personnelManage/personnelManage.js",
        //服务单
        "personalService": "components/personnelManage/personalService/personalService.js",
        //维修单
        "personalRepair": "components/personnelManage/personalRepair/personalRepair.js",
        //职位管理
        "positionManage": "components/personnelManage/positionManage/positionManage.js",

        "page": "spm_modules/page/page.js",
        "director": "spm_modules/director/director.js",
        "jquery": "spm_modules/jquery/1.11.3/jquery.js",
        "base": "spm_modules/base/base.js",
        "xhr": "spm_modules/xhr/xhr.js",
        "ajax": "spm_modules/ajax/ajax.js",
        "system-message": "spm_modules/system-message/system-message.js",
        "spin": "spm_modules/spin/spin.js",
        "template": "spm_modules/template/3.0.0/template.js",
        "accounting": "spm_modules/accounting/accounting.js",
        "ajaxfileupload": "spm_modules/ajaxfileupload/ajaxfileupload.js",
        "area-picker":"spm_modules/area-picker/area-picker.js",
        //"audioplayer": "audioplayer/audioplayer.js"
        "change-city": "spm_modules/change-city/change-city.js",
        "checkSubmit": "spm_modules/checkSubmit/checkSubmit.js",
        "date-extend": "spm_modules/date-extend/date-extend.js",
        //"echarts-plain": "echarts-plain/echarts-plain.js"
        "event-proxy": "spm_modules/event-proxy/event-proxy.js",
        "get-query-string": "spm_modules/get-query-string/get-query-string.js",
        "select-checkbox": "spm_modules/select-checkbox/select-checkbox.js",

        'autocomplete':'spm_modules/autocomplete/autocomplete.js',
        'datepicker': 'spm_modules/datepicker/datepicker.js',
        'datetimepicker': 'spm_modules/datetimepicker/datetimepicker.js',
        'pagination': 'spm_modules/pagination/pagination.js',
        'placeholder': 'spm_modules/placeholder/placeholder.js',
        'emojify':'spm_modules/emojify/emojify.js',
        'ztree': 'spm_modules/ztree/ztree.js',
        'summernote': 'spm_modules/summernote/summernote.js',
        'radio': 'spm_modules/hw-radio/0.0.1/hw-radio.js',
        'checkbox': 'spm_modules/hw-checkbox/0.0.1/hw-checkbox.js',
        'parseArgus':'spm_modules/hw-parseArgus/hw-parseArgus.js',
        'tab':'spm_modules/hw-tab/hw-tab.js',
        'jquery-qrcode':'spm_modules/jquery-qrcode/jquery.qrcode.js',
        'boot':'static/js/bootstrap/3.2.0/bootstrap',
        'wn-core':'spm_modules/wn-core/0.0.4/wn-core.js',
        'wn-controlpop':'spm_modules/wn-controlpop/0.0.4/wn-controlpop.js',
        'hw-util':'spm_modules/hw-util/hw-util.js',
        'cookie':'spm_modules/cookie/cookie.js',
        'utilUser':'components/util/utilUser.js',
        'mock':'spm_modules/mock/mock.js',
        'validate':'spm_modules/validate/validate.js',
        'sweetalert':'spm_modules/sweetalert/dist/sweetalert.min.js'

    }
});
