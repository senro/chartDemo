package rml.model;

public class Data extends Base {

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getDataUrl() {
        return dataUrl;
    }

    public void setDataUrl(String dataUrl) {
        this.dataUrl = dataUrl;
    }

    public String getDataPath() {
        return dataPath;
    }

    public void setDataPath(String dataPath) {
        this.dataPath = dataPath;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPreMonth() {
        return preMonth;
    }

    public void setPreMonth(String preMonth) {
        this.preMonth = preMonth;
    }


    private int userId;

    private String hospitalName;

    private String dataUrl;

    private String dataPath;

    private String month;

    private String preMonth;

}