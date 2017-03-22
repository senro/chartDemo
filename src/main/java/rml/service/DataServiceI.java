package rml.service;

import rml.model.Bo.MonthPriceIndex;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.Data;

import java.util.List;

public interface DataServiceI {
    PageResult getAll(Page page);

    Data getDataById(int id);

    Data selectByPrimaryKey(int id);

    List<Data> selectByMonth(String month);

    int insert(Data data);

    int update(Data data);

    int delete(int id);
}
