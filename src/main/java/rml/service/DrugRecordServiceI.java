package rml.service;

import rml.model.DrugRecord;
import rml.model.Page;
import rml.model.PageResult;

import java.util.List;

public interface DrugRecordServiceI {
    PageResult getAll(Page page);

    List<DrugRecord> getAllByUserIdAndMonth(String month,int userId);

    int deleteAllByUserIdAndMonth(String month,int userId);

    DrugRecord getDrugRecordById(int id);

    DrugRecord selectByPrimaryKey(int id);

    int insert(DrugRecord drugRecord);

    int insertBatch(List<DrugRecord> drugRecords);

    int update(DrugRecord drugRecord);

    int delete(int id);

    int countAll(Page page);

}
