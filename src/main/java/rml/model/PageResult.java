package rml.model;

import java.io.Serializable;
import java.util.List;

import static java.lang.Math.floor;


public class PageResult<T> implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 8400341083688596453L;
    
    
    /**
     * 
     */
    private int totalElements;

	private int size;//分页大小

	private int currentPage;

	private int totalPages;
    /**
     * 
     */
    private List<T> items;
   
    
    /**
     * 
     * 
     */
    private Object data;
    
    private List<Object> dataList;

	public int getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(int totalElements) {
		this.totalElements = totalElements;
	}

	public List<T> getItems() {
		return items;
	}

	public void setItems(List<T> items) {
		this.items = items;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

    public List<Object> getDataList() {
        return dataList;
    }

    public void setDataList(List<Object> dataList) {
        this.dataList = dataList;
    }

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalPages() {
		if (totalElements > 0) {
			this.totalPages = (int) Math.ceil((double) totalElements
					/ (double) size);
		}
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
}
