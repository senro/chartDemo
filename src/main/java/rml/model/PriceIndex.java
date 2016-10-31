package rml.model;

public class PriceIndex {
    private Integer id;

    private Integer month;

    private Integer season;

    private Integer year;

    private String westMonth;

    private String westSeason;

    private String westYear;

    private String eastMonth;

    private String eastSeason;

    private String eastYear;

    private String yearTop10Price;

    private String yearTop10Sale;

    private String dataTotal;

    private String createat;

    private String updateat;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getWestMonth() {
        return westMonth;
    }

    public void setWestMonth(String westMonth) {
        this.westMonth = westMonth == null ? null : westMonth.trim();
    }

    public String getWestSeason() {
        return westSeason;
    }

    public void setWestSeason(String westSeason) {
        this.westSeason = westSeason == null ? null : westSeason.trim();
    }

    public String getWestYear() {
        return westYear;
    }

    public void setWestYear(String westYear) {
        this.westYear = westYear == null ? null : westYear.trim();
    }

    public String getEastMonth() {
        return eastMonth;
    }

    public void setEastMonth(String eastMonth) {
        this.eastMonth = eastMonth == null ? null : eastMonth.trim();
    }

    public String getEastSeason() {
        return eastSeason;
    }

    public void setEastSeason(String eastSeason) {
        this.eastSeason = eastSeason == null ? null : eastSeason.trim();
    }

    public String getEastYear() {
        return eastYear;
    }

    public void setEastYear(String eastYear) {
        this.eastYear = eastYear == null ? null : eastYear.trim();
    }

    public String getYearTop10Price() {
        return yearTop10Price;
    }

    public void setYearTop10Price(String yearTop10Price) {
        this.yearTop10Price = yearTop10Price == null ? null : yearTop10Price.trim();
    }

    public String getYearTop10Sale() {
        return yearTop10Sale;
    }

    public void setYearTop10Sale(String yearTop10Sale) {
        this.yearTop10Sale = yearTop10Sale == null ? null : yearTop10Sale.trim();
    }

    public String getDataTotal() {
        return dataTotal;
    }

    public void setDataTotal(String dataTotal) {
        this.dataTotal = dataTotal == null ? null : dataTotal.trim();
    }

    public String getCreateat() {
        return createat;
    }

    public void setCreateat(String createat) {
        this.createat = createat == null ? null : createat.trim();
    }

    public String getUpdateat() {
        return updateat;
    }

    public void setUpdateat(String updateat) {
        this.updateat = updateat == null ? null : updateat.trim();
    }
}