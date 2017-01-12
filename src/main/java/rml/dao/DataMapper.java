package rml.dao;

import rml.model.Data;
import rml.model.DrugRecord;
import rml.model.Page;

import java.util.ArrayList;
import java.util.List;

public interface DataMapper {
    int deleteByPrimaryKey(int id);

    int insert(Data data);

    int insertSelective(Data data);

    Data selectByPrimaryKey(int id);

    List<Data> selectByMonth(String month);

    int updateByPrimaryKeySelective(Data data);

    int updateByPrimaryKey(Data data);
    
    List<Data> getAll(Page page);

    int countAll(Page page);
}