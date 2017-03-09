package rml.dao;

import rml.model.Bo.DrugRecordSearchCondition;
import rml.model.DrugRecord;
import rml.model.Page;

import java.util.List;

public interface DrugRecordMapper {
    int deleteByPrimaryKey(int id);

    int insert(DrugRecord drugRecord);

    int insertBatch(List<DrugRecord> drugRecords);

    int insertSelective(DrugRecord drugRecord);

    DrugRecord selectByPrimaryKey(int id);

    List<DrugRecord> selectBySeasonAndType(String startMonth, String endMonth, String drugType);

    List<DrugRecord> selectBySeason(String startMonth, String endMonth);

    List<DrugRecord> selectBySeasonAndDrugName(String startMonth, String endMonth, String drugName);

    List<DrugRecord> selectAllMonths();

    List<DrugRecord> selectAllDrugs();

    List<DrugRecord> selectByMonthAndType(String month, String drugType);

    List<DrugRecord> selectByMonthAndDrugName(String month, String drugName);

    List<DrugRecord> selectByMonthAndDrugNameAndDrugSpecAndDrugFactory(DrugRecordSearchCondition drugRecordSearchCondition);

    DrugRecord selectByMonthAndDrugNameAndDrugSpecAndDrugFactoryAndUserId(DrugRecordSearchCondition drugRecordSearchCondition);

    int updateByPrimaryKeySelective(DrugRecord drugRecord);

    int updateByPrimaryKey(DrugRecord drugRecord);
    
    List<DrugRecord> getAll(Page page);

    List<DrugRecord> getAllByUserIdAndMonth(String month,int userId);

    int deleteAllByMonthAndUserId(String month,int userId);

    int deleteAllByMonthAndHospitalName(String month,String hospitalName);

    int countAll(Page page);
}