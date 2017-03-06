package rml.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

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
        if(!month.equals("")){
            Pattern datePattern = Pattern.compile("\\d\\d\\d\\d\\-\\d\\d\\-\\d\\d");
            boolean result = datePattern.matcher(month).find();

            if(result){
                this.month = month;
            }else{
                SimpleDateFormat df = new SimpleDateFormat("yyyy");//设置日期格式
                this.month = df.format(new Date())+"-"+month+"-01";
            }
        }
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

    public String getValidate() {
        if(validate==null){
            this.validate = "no";
        }
        return validate;
    }

    public void setValidate(String validate) {
        this.validate = validate;
    }

    private int userId;

    private String hospitalName;

    private String dataUrl;

    private String dataPath;

    private String month;

    private String validate;

    private String preMonth;

}