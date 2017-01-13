package rml.model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

public class DrugRecord extends Base {

    private int userId;

    private String hospitalName;

    private String drugName;

    private String drugSpec;//规格

    private String drugUnit;//计量单位

    private String drugFactory;//厂家

    private String drugType;

    private String sale;

    private String price;

    private String isValid="1";

    private String month;

    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public String getDrugSpec() {
        return drugSpec;
    }

    public void setDrugSpec(String drugSpec) {
        this.drugSpec = drugSpec;
    }

    public String getDrugUnit() {
        return drugUnit;
    }

    public void setDrugUnit(String drugUnit) {
        this.drugUnit = drugUnit;
    }

    public String getDrugFactory() {
        return drugFactory;
    }

    public void setDrugFactory(String drugFactory) {
        this.drugFactory = drugFactory;
    }

    public String getDrugType() {
        return drugType;
    }

    public void setDrugType(String drugType) {
        this.drugType = drugType;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    public String getPrice() {

        if(price!=null && !price.equals("")){
            Pattern datePattern = Pattern.compile("\\.{2,}");
            boolean result = datePattern.matcher(price).find();

            if(result){
                return price.replaceAll("\\.\\.", ".");
            }
        }

        return price;
    }

    public void setPrice(String price) {
        this.price = price;
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
}