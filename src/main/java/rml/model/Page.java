package rml.model;


import java.io.Serializable;


public class Page implements Serializable {
    private static final long serialVersionUID = 3579558131326166573L;
    private int page = 1;
    private int size = 20;
    private Integer limit;
    private Integer offset;
    private String sort;
    private String order;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getLimit() {
        this.limit = size;
        return limit;

    }

    public Integer getOffset() {
        if (page!= 0 && size != 0) {
            this.offset = (page - 1) * size;
        }
        return offset;
    }

    public String getSort() {
//        return StringUtil.underscoreName(sort);
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }


}
