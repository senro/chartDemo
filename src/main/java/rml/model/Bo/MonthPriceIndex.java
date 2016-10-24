package rml.model.Bo;

import rml.model.Page;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

public class MonthPriceIndex {

    private String priceIndex;

    private String month;

    public String getPriceIndex() {
        return priceIndex;
    }

    public void setPriceIndex(String priceIndex) {
        this.priceIndex = priceIndex;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}