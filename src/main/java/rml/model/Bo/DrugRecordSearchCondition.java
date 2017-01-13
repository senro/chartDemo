package rml.model.Bo;

import rml.model.Base;
import rml.model.Page;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

public class DrugRecordSearchCondition extends Page {

    private int userId;

    private String drugName;

    private String drugSpec;//规格

    private String drugFactory;//厂家

    private String drugType;

    private String isValid;

    private String month;

    private String year;

    public String getYear() {

        return year;
    }

    public void setYear(String year) {
        if(year==null||year.equals("")){
            this.year="2016";
        }else{
            this.year = year;
        }

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public String getIsValid() {
        return isValid;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
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