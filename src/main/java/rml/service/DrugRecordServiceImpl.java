package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.DrugRecordMapper;
import rml.model.Bo.MonthPriceIndex;
import rml.model.DrugRecord;
import rml.model.Page;
import rml.model.PageResult;

import java.text.SimpleDateFormat;
import java.util.*;

@Service("drugRecordService")
public class DrugRecordServiceImpl implements DrugRecordServiceI{

	@Autowired
	private DrugRecordMapper drugRecordMapper;

	@Override
	public int insert(DrugRecord drugRecord) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return drugRecordMapper.insert(drugRecord);
	}

	@Override
	public int insertBatch(List<DrugRecord> drugRecords){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		for (DrugRecord drugRecord:
			 drugRecords) {
			drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
			drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		}

		return drugRecordMapper.insertBatch(drugRecords);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(drugRecordMapper.getAll(page));
		result.setTotalElements(drugRecordMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public List<DrugRecord> getAllByUserIdAndMonth(String month, int userId){
		return drugRecordMapper.getAllByUserIdAndMonth(month,userId);
	}

	@Override
	public int deleteAllByMonthAndUserId(String month, int userId){
		return drugRecordMapper.deleteAllByMonthAndUserId(month,userId);
	}

	@Override
	public DrugRecord getDrugRecordById(int id) {
		return drugRecordMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public int update(DrugRecord drugRecord) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return drugRecordMapper.updateByPrimaryKeySelective(drugRecord);
	}

	@Override
	public int delete(int id) {

		return drugRecordMapper.deleteByPrimaryKey(id);
	}

	@Override
	public DrugRecord selectByPrimaryKey(int id) {

		return drugRecordMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<MonthPriceIndex> getDataPriceIndexByMonthAndDrugType(String drugType) {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();
        //遍历月份数组，获取每个月的type类型的药品数据，存在以月份命名的对象里，按照type计算每月的价格指数
		//Map monthDateMap = new HashMap();
		List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectByMonthAndType("2016-05-01",drugType);

		//设定5月份（基期）的价格指数默认为100
		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();
		baseMonthPriceIndex.setMonth("2016-05-01");
		baseMonthPriceIndex.setPriceIndex("100");
		resultList.add(baseMonthPriceIndex);

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth=drugRecord.getMonth();

			if(!currentMonth.equals("2016-05-01")){
				Double baseMonthTotalPrice=0.0;
				Double currentMonthTotalPrice=0.0;

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndType(currentMonth,drugType);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					if(!currentMonthDrugRecord.getPrice().trim().equals("") &&
							!currentMonthDrugRecord.getSale().trim().equals("")&&
							!currentMonthDrugRecord.getPrice().equals("无") &&
							!currentMonthDrugRecord.getSale().equals("无")){

						Double price=Double.valueOf(currentMonthDrugRecord.getPrice());
						Double sale=Double.valueOf(currentMonthDrugRecord.getSale());

						currentMonthTotalPrice=currentMonthTotalPrice+price*sale;

						for (DrugRecord baseMonthDrugRecord:baseMonthDrugRecords) {

							if(!baseMonthDrugRecord.getPrice().trim().equals("") &&
									!baseMonthDrugRecord.getSale().trim().equals("") &&
									!baseMonthDrugRecord.getPrice().equals("无") &&
									!baseMonthDrugRecord.getSale().equals("无") &&
									baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
									baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())
									){

								Double basePrice=Double.valueOf(baseMonthDrugRecord.getPrice());
								Double baseSale=Double.valueOf(baseMonthDrugRecord.getSale());

								baseMonthTotalPrice=baseMonthTotalPrice+basePrice*sale;
							}

						}

					}

				}

				System.out.printf(String.valueOf(currentMonthTotalPrice)+"\n");
				System.out.printf(String.valueOf(baseMonthTotalPrice)+"\n");

				if(currentMonthDrugRecords.size()>0) {
					MonthPriceIndex currentMonthPriceIndex = new MonthPriceIndex();
					currentMonthPriceIndex.setMonth(currentMonth);
					currentMonthPriceIndex.setPriceIndex(String.valueOf((currentMonthTotalPrice / baseMonthTotalPrice) * 100));
					resultList.add(currentMonthPriceIndex);
				}
			}
		}

		return resultList;
	}

	@Override
	public List<MonthPriceIndex> getDataPriceIndexByMonthAndDrugName(String drugName) {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();
		//遍历月份数组，获取每个月的type类型的药品数据，存在以月份命名的对象里，按照type计算每月的价格指数
		//Map monthDateMap = new HashMap();
		List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugName("2016-05-01",drugName);

		//设定5月份（基期）的价格指数默认为100
		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();
		baseMonthPriceIndex.setMonth("2016-05-01");
		baseMonthPriceIndex.setPriceIndex("100");
		resultList.add(baseMonthPriceIndex);

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth=drugRecord.getMonth();

			if(!currentMonth.equals("2016-05-01")){
				Double baseMonthTotalPrice=0.0;
				Double currentMonthTotalPrice=0.0;

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugName(currentMonth,drugName);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					if(!currentMonthDrugRecord.getPrice().trim().equals("") &&
							!currentMonthDrugRecord.getSale().trim().equals("")&&
							!currentMonthDrugRecord.getPrice().equals("无") &&
							!currentMonthDrugRecord.getSale().equals("无")){

						Double price=Double.valueOf(currentMonthDrugRecord.getPrice());
						Double sale=Double.valueOf(currentMonthDrugRecord.getSale());

						currentMonthTotalPrice=currentMonthTotalPrice+price*sale;

						for (DrugRecord baseMonthDrugRecord:baseMonthDrugRecords) {

							if(!baseMonthDrugRecord.getPrice().trim().equals("") &&
									!baseMonthDrugRecord.getSale().trim().equals("") &&
									!baseMonthDrugRecord.getPrice().equals("无") &&
									!baseMonthDrugRecord.getSale().equals("无") &&
									baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
									baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())
									){

								Double basePrice=Double.valueOf(baseMonthDrugRecord.getPrice());
								Double baseSale=Double.valueOf(baseMonthDrugRecord.getSale());

								baseMonthTotalPrice=baseMonthTotalPrice+basePrice*sale;
							}

						}

					}

				}

				System.out.printf(String.valueOf(currentMonthTotalPrice)+"\n");
				System.out.printf(String.valueOf(baseMonthTotalPrice)+"\n");

				if(currentMonthDrugRecords.size()>0){
					MonthPriceIndex currentMonthPriceIndex=new MonthPriceIndex();
					currentMonthPriceIndex.setMonth(currentMonth);
					currentMonthPriceIndex.setPriceIndex(String.valueOf((currentMonthTotalPrice/baseMonthTotalPrice)*100));
					resultList.add(currentMonthPriceIndex);
				}

			}
		}

		return resultList;
	}

	@Override
	public int countAll(Page page) {
		return drugRecordMapper.countAll(page);
	}

}
