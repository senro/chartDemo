package rml.common;

import org.apache.log4j.Logger;

import java.io.Serializable;

/**
 * 邮件信息类
 */
public class MailBean implements Serializable {
    private static final Logger logger = Logger.getLogger(MailBean.class);

    private String from = "hue-service@tongfudun.com";
    private String fromName = "hue-service";
    private String[] toEmails;
    private String subject;
    private String content;

    public String getFrom() {
        return from;
    }

    public String getFromName() {
        return fromName;
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    public String[] getToEmails() {
        return toEmails;
    }

    public void setToEmails(String[] toEmails) {
        this.toEmails = toEmails;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
