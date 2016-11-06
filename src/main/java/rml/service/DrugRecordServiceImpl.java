package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.DrugRecordMapper;
import rml.model.Bo.DrugNamePriceIndex;
import rml.model.Bo.MonthPriceIndex;
import rml.model.Bo.SeasonPriceIndex;
import rml.model.Bo.YearPriceIndex;
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

		//resultList.add(baseMonthPriceIndex);

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth=drugRecord.getMonth();

			if(!currentMonth.equals("2016-05-01")){
				Double baseMonthTotalPrice=0.0;
				Double baseMonthTotalSale=0.0;
				Double currentMonthTotalPrice=0.0;
				Double currentMonthTotalSale=0.0;

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndType(currentMonth,drugType);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					if(!currentMonthDrugRecord.getPrice().trim().equals("") &&
							!currentMonthDrugRecord.getSale().trim().equals("")&&
							!currentMonthDrugRecord.getPrice().equals("无") &&
							!currentMonthDrugRecord.getSale().equals("无")){

						Double price=Double.valueOf(currentMonthDrugRecord.getPrice());
						Double sale=Double.valueOf(currentMonthDrugRecord.getSale());

						currentMonthTotalPrice=currentMonthTotalPrice+price*sale;
						currentMonthTotalSale=currentMonthTotalSale+sale;

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
								baseMonthTotalSale=baseMonthTotalSale+baseSale;
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
					currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
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

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth=drugRecord.getMonth();

			if(!currentMonth.equals("2016-05-01")){
				Double baseMonthTotalPrice=0.0;
				Double baseMonthTotalSale=0.0;
				Double currentMonthTotalPrice=0.0;
				Double currentMonthTotalSale=0.0;

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugName(currentMonth,drugName);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					if(!currentMonthDrugRecord.getPrice().trim().equals("") &&
							!currentMonthDrugRecord.getSale().trim().equals("")&&
							!currentMonthDrugRecord.getPrice().equals("无") &&
							!currentMonthDrugRecord.getSale().equals("无")){

						Double price=Double.valueOf(currentMonthDrugRecord.getPrice());
						Double sale=Double.valueOf(currentMonthDrugRecord.getSale());

						currentMonthTotalPrice=currentMonthTotalPrice+price*sale;
						currentMonthTotalSale=currentMonthTotalSale+sale;

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
								baseMonthTotalSale=baseMonthTotalSale+baseSale;
							}

						}

					}

				}

				System.out.printf(String.valueOf(currentMonthTotalPrice)+"\n");
				System.out.printf(String.valueOf(baseMonthTotalPrice)+"\n");

				baseMonthPriceIndex.setMonth("2016-05-01");
				baseMonthPriceIndex.setPriceIndex("100");
				baseMonthPriceIndex.setTotalSale(String.valueOf(baseMonthTotalSale));

				//resultList.add(baseMonthPriceIndex);

				if(currentMonthDrugRecords.size()>0){
					MonthPriceIndex currentMonthPriceIndex=new MonthPriceIndex();
					currentMonthPriceIndex.setMonth(currentMonth);
					currentMonthPriceIndex.setPriceIndex(String.valueOf((currentMonthTotalPrice/baseMonthTotalPrice)*100));
					currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
					resultList.add(currentMonthPriceIndex);
				}

			}
		}

		return resultList;
	}

	//获取月综合指数
	@Override
	public List<MonthPriceIndex> getDataPriceIndexByMonth() {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();

		List<MonthPriceIndex> westDrugMonthPriceIndexList=getDataPriceIndexByMonthAndDrugType("0");
		List<MonthPriceIndex> eastDrugMonthPriceIndexList=getDataPriceIndexByMonthAndDrugType("1");

		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();
		baseMonthPriceIndex.setMonth("2016-05-01");
		baseMonthPriceIndex.setPriceIndex("100");

		//resultList.add(baseMonthPriceIndex);

		for (MonthPriceIndex westDrugMonthPriceIndex:westDrugMonthPriceIndexList) {
			if(!westDrugMonthPriceIndex.getMonth().equals("2016-05-01")){
				MonthPriceIndex monthPriceIndex=new MonthPriceIndex();
				monthPriceIndex.setMonth(westDrugMonthPriceIndex.getMonth());
				for (MonthPriceIndex eastDrugMonthPriceIndex:eastDrugMonthPriceIndexList) {
					if(westDrugMonthPriceIndex.getMonth().equals(eastDrugMonthPriceIndex.getMonth())){
						Double westDrugMonthTotalSale=Double.valueOf(westDrugMonthPriceIndex.getTotalSale());
						Double eastDrugMonthTotalSale=Double.valueOf(eastDrugMonthPriceIndex.getTotalSale());
						Double drugMonthTotalSale=westDrugMonthTotalSale+eastDrugMonthTotalSale;

						Double westDrugMonthPriceIndexNum=Double.valueOf(westDrugMonthPriceIndex.getPriceIndex());
						Double eastDrugMonthPriceIndexNum=Double.valueOf(eastDrugMonthPriceIndex.getPriceIndex());

						Double drugMonthPriceIndexNum=(westDrugMonthTotalSale/drugMonthTotalSale)*westDrugMonthPriceIndexNum+(eastDrugMonthTotalSale/drugMonthTotalSale)*eastDrugMonthPriceIndexNum;

						monthPriceIndex.setPriceIndex(String.valueOf(drugMonthPriceIndexNum));
					}
				}
				resultList.add(monthPriceIndex);
			}

		}

		return resultList;
	}

	@Override
	public List<SeasonPriceIndex> getDataPriceIndexBySeason() {
		List<SeasonPriceIndex> resultList=new ArrayList<SeasonPriceIndex>();

		return resultList;
	}

	@Override
	public List<SeasonPriceIndex> getDataPriceIndexBySeasonAndDrugType(String drugType) {
		List<SeasonPriceIndex> resultList=new ArrayList<SeasonPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();
		//遍历月份数组，获取每个月的type类型的药品数据，存在以月份命名的对象里，按照type计算每月的价格指数
		//List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectBySeasonAndType("2016-05-01","2016-07-01",drugType);
		//设定5月份（基期）的价格指数默认为100
//		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();
//		baseMonthPriceIndex.setMonth("2016-05-01");
//		baseMonthPriceIndex.setPriceIndex("100");

		//resultList.add(baseMonthPriceIndex);

		List<HashMap> seasonList=new ArrayList<HashMap>();

		HashMap<String,String> season1DateMap = new HashMap<String,String>();
		season1DateMap.put("start","2016-01-01");
		season1DateMap.put("end","2016-03-01");

		HashMap<String,String> season2DateMap = new HashMap<String,String>();
		season1DateMap.put("start","2016-04-01");
		season1DateMap.put("end","2016-06-01");

		HashMap<String,String> season3DateMap = new HashMap<String,String>();
		season1DateMap.put("start","2016-07-01");
		season1DateMap.put("end","2016-09-01");

		HashMap<String,String> season4DateMap = new HashMap<String,String>();
		season1DateMap.put("start","2016-10-01");
		season1DateMap.put("end","2016-12-01");

		seasonList.add(season1DateMap);
		seasonList.add(season2DateMap);
		seasonList.add(season3DateMap);
		seasonList.add(season4DateMap);

		for(HashMap currentSeasonDateMap : seasonList){
			//根据当前的季度的头尾有没有数据去判定该季度需不需要计算

		}
		//1 season {start:'2016-01-01',end:'2016-03-01'}
		//2 season {start:'2016-04-01',end:'2016-06-01'}
		//3 season {start:'2016-07-01',end:'2016-09-01'}
		//4 season {start:'2016-10-01',end:'2016-12-01'}

		//['2016-05-01','2016-06-01','2016-07-01','2016-08-01','2016-09-01','2016-10-01','2016-11-01']
		//to [{start:'2016-05-01',end:'2016-07-01'},{start:'2016-08-01',end:'2016-11-01'}]

		return resultList;
	}

	@Override
	public List<YearPriceIndex> getDataPriceIndexByYear() {
		List<YearPriceIndex> resultList=new ArrayList<YearPriceIndex>();

		return resultList;
	}

	@Override
	public List<YearPriceIndex> getDataPriceIndexByYearAndDrugType(String drugType) {
		List<YearPriceIndex> resultList=new ArrayList<YearPriceIndex>();

		return resultList;
	}

	@Override
	public List<DrugNamePriceIndex> getDataPriceIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		return resultList;
	}

	@Override
	public List<DrugNamePriceIndex> getDataSaleIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		return resultList;
	}

	@Override
	public int countAll(Page page) {
		return drugRecordMapper.countAll(page);
	}

}
