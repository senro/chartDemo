package rml.service;

import rml.model.Page;
import rml.model.PageResult;
import rml.model.Data;

public interface DataServiceI {
    PageResult getAll(Page page);

    Data getDataById(int id);

    Data selectByPrimaryKey(int id);

    int insert(Data data);

    int update(Data data);

    int delete(int id);
}
