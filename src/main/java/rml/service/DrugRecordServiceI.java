package rml.service;

import rml.model.Bo.DrugNamePriceIndex;
import rml.model.Bo.MonthPriceIndex;
import rml.model.Bo.SeasonPriceIndex;
import rml.model.Bo.YearPriceIndex;
import rml.model.DrugRecord;
import rml.model.Page;
import rml.model.PageResult;

import java.util.List;

public interface DrugRecordServiceI {
    PageResult getAll(Page page);

    List<DrugRecord> getAllByUserIdAndMonth(String month,int userId);

    List<MonthPriceIndex> getDataPriceIndexByMonth();

    List<MonthPriceIndex> getDataPriceIndexByMonthAndDrugType(String drugType);

    List<MonthPriceIndex> getDataPriceIndexByMonthAndDrugName(String drugName);

    List<SeasonPriceIndex> getDataPriceIndexBySeason();

    List<SeasonPriceIndex> getDataPriceIndexBySeasonAndDrugType(String drugType);

    List<YearPriceIndex> getDataPriceIndexByYear();

    List<YearPriceIndex> getDataPriceIndexByYearAndDrugType(String drugType);

    List<DrugNamePriceIndex> getDataPriceIndexByYearTop10();

    List<DrugNamePriceIndex> getDataSaleIndexByYearTop10();

    int deleteAllByMonthAndUserId(String month,int userId);

    DrugRecord getDrugRecordById(int id);

    DrugRecord selectByPrimaryKey(int id);

    int insert(DrugRecord drugRecord);

    int insertBatch(List<DrugRecord> drugRecords);

    int update(DrugRecord drugRecord);

    int delete(int id);

    int countAll(Page page);

}
