package rml.common;

public interface Constant {

    // Default database value
    String SYSTEM_USER = "system";
    String SITE_KEY = "";

    int DEFAULT_PAGE_SIZE = 10;

    // Keys for session
    String KEY_SESSION_INFO = "loginUser";
    String KEY_REQUEST_MESSAGE = "r_message";
    String KEY_CACHE_MANAGE_B_ = "manageb_";
    String KEY_REQUEST_CURRENT_TOP_MENU = "r_current_top_menu"; // 当前用户所选择的Top
    // menu
    String KEY_REQUEST_CURRENT_LEFT_MENU = "r_current_left_menu"; // 当前用户所选择的Top

    String KAPTCHA_SESSION_KEY = "kaptcha";
    int COOKIE_DURATION = 7;// 自动登录Cookie默认保存时间

    String STATUS_SUCCESS = "success";
    String STATUS_ERROR = "error";

    public static final String PUBLISH_STATE_ON = "on";

    String SUCCESS_STATUS = "0";
    String FAIL_STATUS = "1";

    // modules
    String MODULE_LOGIN = "登录";
    String MODULE_LOGOUT = "登出";
    //系统管理
    String MODULE_SYSUSER = "用户管理";
    String MODULE_SYSROLE = "角色管理";
    String MODULE_SYSLOG = "日志查询";
    String MODULE_DEFAULT_SCENARIO = "预留场景管理";
    String MODULE_DATA_SOURCE = "数据源管理";
    //业务管理
    String MODULE_APPLICATION = "应用管理";
    String MODULE_BINDING = "绑定查询";
    String MODULE_UNBINDING = "解绑记录";
    String MODULE_ACCOUNT = "账号管理";
    String MODULE_AUTH = "认证查询";
    String MODULE_STRATEGY = "策略管理";
    String MODULE_PAY = "计费查询";

    //每个sheet最多显示60000条数据
    int EXCEL_EXPORT_NUM=180000;
}
