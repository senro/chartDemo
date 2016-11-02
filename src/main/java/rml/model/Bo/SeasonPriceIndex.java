package rml.model.Bo;

public class SeasonPriceIndex {

    private String priceIndex;

    private String season;

    private String totalSale;

    public String getTotalSale() {
        return totalSale;
    }

    public void setTotalSale(String totalSale) {
        this.totalSale = totalSale;
    }

    public String getPriceIndex() {
        return priceIndex;
    }

    public void setPriceIndex(String priceIndex) {
        this.priceIndex = priceIndex;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}