package rml.dao;

import rml.model.DrugRecord;
import rml.model.Page;

import java.util.List;

public interface DrugRecordMapper {
    int deleteByPrimaryKey(int id);

    int insert(DrugRecord drugRecord);

    int insertBatch(List<DrugRecord> drugRecords);

    int insertSelective(DrugRecord drugRecord);

    DrugRecord selectByPrimaryKey(int id);

    List<DrugRecord> selectBySeasonAndType(String startMonth, String drugType);

    List<DrugRecord> selectAllMonths();

    List<DrugRecord> selectByMonthAndType(String month, String drugType);

    List<DrugRecord> selectByMonthAndDrugName(String month, String drugName);

    int updateByPrimaryKeySelective(DrugRecord drugRecord);

    int updateByPrimaryKey(DrugRecord drugRecord);
    
    List<DrugRecord> getAll(Page page);

    List<DrugRecord> getAllByUserIdAndMonth(String month,int userId);

    int deleteAllByMonthAndUserId(String month,int userId);

    int countAll(Page page);
}