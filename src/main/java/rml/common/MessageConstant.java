package rml.common;


public interface MessageConstant {

	public static final String MESSAGE_TYPE_SUCCESS = "success";
	public static final String MESSAGE_TYPE_ERROR = "error";
	public static final String MESSAGE_TYPE_SELFSUCCESS = "self_success";
	public static final String MESSAGE_TYPE_SELFERROR = "self_error";
	public static final String MESSAGE_TYPE_EXCEPTION = "exception";

	public static final String ERROR_LOGIN_NAME_MANDATORY = "error.login.name.mandatory";
	public static final String ERROR_PASSWORD_MANDATORY = "error.password.mandatory";
	public static final String ERROR_VALIDCODE_WRONG = "error.validcode.wrong";
	public static final String ERROR_USER_NOT_EXISTS = "error.user.not.exists";
	public static final String ERROR_USER_PASSWORD_INCORRECT = "error.user.password.incorrect";
	public static final String ERROR_USER_NOT_ACTIVE = "error.user.not.active";
	public static final String SUCCESS_OPERATION = "success.operation";
    public static final String FAILED_OPERATION="failed.operation";
	
	public static final String ERROR_PRIVILEGE_ID_MANDATORY = "error.privilege.id.mandatory";
    public static final String ERROR_PRIVILEGE_NAME_MANDATORY = "error.privilege.name.mandatory";
    public static final String ERROR_PRIVILEGE_ID_EXISTS = "error.privilege.id.exists";
    public static final String ERROR_PRIVILEGE_IN_USE = "error.privilege.in.use";
    public static final String ERROR_ROLE_IN_USE = "error.role.in.use";
    
    public static final String ERROR_USER_ID_EXISTS="error.user.id.exists";

    public static final String ERROR_MENU_NAME_MANDATORY = "error.menu.name.mandatory";
    public static final String ERROR_MENU_PRIVILEGE_MANDATORY = "error.menu.privilege.mandatory";
}
