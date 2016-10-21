package rml.common;

public class ManageException extends RuntimeException {
	private static final long serialVersionUID = 1311805475257436749L;
	private String errorCode;

	public ManageException(String errorCode) {
		this.errorCode = errorCode;
	}

	public ManageException(String errorCode, Throwable tx) {
		super(tx);
		this.errorCode = errorCode;
	}

	public ManageException(String errorCode, String message, Throwable tx) {
		super(message, tx);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

}
