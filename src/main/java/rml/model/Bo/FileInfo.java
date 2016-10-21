package rml.model.Bo;

import rml.model.Base;

public class FileInfo extends Base {


    private String fileUrl;

    private String filePath;

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

}