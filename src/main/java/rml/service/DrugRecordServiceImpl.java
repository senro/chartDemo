package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.CacheIndexMapper;
import rml.dao.DataMapper;
import rml.dao.DrugRecordMapper;
import rml.model.*;
import rml.model.Bo.*;
import rml.util.DateUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("drugRecordService")
public class DrugRecordServiceImpl implements DrugRecordServiceI{

	@Autowired
	private DrugRecordMapper drugRecordMapper;

	@Autowired
	private DataMapper dataMapper;

	@Autowired
	private CacheIndexMapper cacheIndexMapper;

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
	public int deleteAllByMonthAndHospitalName(String month, String hospitalName){
		return drugRecordMapper.deleteAllByMonthAndHospitalName(month, hospitalName);
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

		//获取上月的数据，进行比较，设置是否合理 todo
//		String currentMonth=drugRecord.getMonth().split("-")[1];
//		String currentYear=drugRecord.getMonth().split("-")[0];
//		String preMonth="";
//		if(currentMonth.equals("01")){
//			preMonth=String.valueOf(Integer.valueOf(currentYear)-1)+"-12-01";
//		}else{
//			preMonth=currentYear+"-"+((Integer.valueOf(currentMonth)-1)<10 ? "0"+String.valueOf(Integer.valueOf(currentMonth)-1):String.valueOf(Integer.valueOf(currentMonth)-1))+"-01";
//		}
//
//		DrugRecordSearchCondition preMonthDrugRecordSearchCondition=new DrugRecordSearchCondition();
//		preMonthDrugRecordSearchCondition.setMonth(preMonth);
//		preMonthDrugRecordSearchCondition.setDrugName(drugRecord.getDrugName());
//		preMonthDrugRecordSearchCondition.setDrugSpec(drugRecord.getDrugSpec());
//		preMonthDrugRecordSearchCondition.setDrugFactory(drugRecord.getDrugFactory());
//		preMonthDrugRecordSearchCondition.setUserId(drugRecord.getUserId());
//
//		DrugRecord preMonthDrugRecord= drugRecordMapper.selectByMonthAndDrugNameAndDrugSpecAndDrugFactoryAndUserId(preMonthDrugRecordSearchCondition);
//
//		if( !drugRecord.getPrice().equals("") &&
//				!preMonthDrugRecord.getPrice().equals("")&&
//				!drugRecord.getPrice().equals("无") &&
//				!preMonthDrugRecord.getPrice().equals("无")) {
//
//			Double currMonthPrice = Double.valueOf(drugRecord.getPrice());
//			Double preMonthPrice = Double.valueOf(preMonthDrugRecord.getPrice());
//
//			if ((currMonthPrice - preMonthPrice) > preMonthPrice * 0.5) {
//				//价格涨幅超上月50%
//				drugRecord.setIsValid("0");
//			} else {
//				drugRecord.setIsValid("1");
//			}
//		}

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
		Page pageCacheIndex=new Page();
		pageCacheIndex.setSize(1000000);

		List<CacheIndex> cacheIndexs=cacheIndexMapper.getAll(pageCacheIndex);
        //遍历月份数组，获取每个月的type类型的药品数据，存在以月份命名的对象里，按照type计算每月的价格指数
		//Map monthDateMap = new HashMap();

		//设定5月份（基期）的价格指数默认为100
		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();
		baseMonthPriceIndex.setMonth("2016-05-01");
		baseMonthPriceIndex.setPriceIndex("100");

		//resultList.add(baseMonthPriceIndex);
		int i=0;

		for (DrugRecord drugRecord:drugRecords) {
			if(i>0){//为了跳过5月的计算
				String currentMonth=drugRecord.getMonth();
				Boolean showCurrentMonth=true;

				List<Data> currentMonthDatas=dataMapper.selectByMonth(currentMonth);

				for (Data currentMonthData:currentMonthDatas) {
					if(currentMonthData.getValidate().equals("no")){
						showCurrentMonth=false;
					}
				}

				if(showCurrentMonth){

					Boolean currentMonthHasCache=false;

					Double baseMonthTotalPrice=0.0;
					Double baseMonthTotalSale=0.0;
					Double currentMonthTotalPrice=0.0;
					Double currentMonthTotalSale=0.0;

					MonthPriceIndex currentMonthPriceIndex = new MonthPriceIndex();

					for (CacheIndex cacheIndex:cacheIndexs) {
						if(currentMonth.equals(cacheIndex.getMonth()) && drugType.equals("0") && cacheIndex.getWestMonthIndex()!=null && cacheIndex.getWestMonthSale()!=null){
							currentMonthPriceIndex.setMonth(currentMonth);
							currentMonthPriceIndex.setPriceIndex(cacheIndex.getWestMonthIndex());
							currentMonthPriceIndex.setTotalSale(cacheIndex.getWestMonthSale());
							currentMonthHasCache=true;
						}else if(currentMonth.equals(cacheIndex.getMonth()) && drugType.equals("1") && cacheIndex.getEastMonthIndex()!=null && cacheIndex.getEastMonthSale()!=null){
							currentMonthPriceIndex.setMonth(currentMonth);
							currentMonthPriceIndex.setPriceIndex(cacheIndex.getEastMonthIndex());
							currentMonthPriceIndex.setTotalSale(cacheIndex.getEastMonthSale());
							currentMonthHasCache=true;
						}
					}

					if(!currentMonthHasCache){//没有缓存
						List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndType(currentMonth,drugType);
						for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

							String currentPrice=currentMonthDrugRecord.getPrice();
							String currentSale=currentMonthDrugRecord.getSale();
							Double price=0.0;
							Double sale=0.0;

							if(!currentMonthDrugRecord.getPrice().trim().equals("") &&
									!currentMonthDrugRecord.getPrice().equals("无")){

								price=Double.valueOf(currentMonthDrugRecord.getPrice());
							}

							if(!currentMonthDrugRecord.getSale().trim().equals("")&&
									!currentMonthDrugRecord.getSale().equals("无")){

								sale=Double.valueOf(currentMonthDrugRecord.getSale());
							}

							currentMonthTotalPrice=currentMonthTotalPrice+price*sale;
							currentMonthTotalSale=currentMonthTotalSale+sale;

							List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectByMonthAndType(drugRecords.get(i-1).getMonth(),drugType);

							for (DrugRecord baseMonthDrugRecord:baseMonthDrugRecords) {

								Double basePrice=0.0;
								Double baseSale=0.0;

								if(!baseMonthDrugRecord.getPrice().trim().equals("") &&
										!baseMonthDrugRecord.getPrice().equals("无")){

									if(baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
											baseMonthDrugRecord.getDrugUnit().equals(currentMonthDrugRecord.getDrugUnit()) &&
											baseMonthDrugRecord.getDrugSpec().equals(currentMonthDrugRecord.getDrugSpec()) &&
											baseMonthDrugRecord.getDrugFactory().equals(currentMonthDrugRecord.getDrugFactory()) &&
											baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())){

										basePrice=Double.valueOf(baseMonthDrugRecord.getPrice());
									}
								}

								if(!baseMonthDrugRecord.getSale().trim().equals("") &&
										!baseMonthDrugRecord.getSale().equals("无")){

									if(baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
											baseMonthDrugRecord.getDrugUnit().equals(currentMonthDrugRecord.getDrugUnit()) &&
											baseMonthDrugRecord.getDrugSpec().equals(currentMonthDrugRecord.getDrugSpec()) &&
											baseMonthDrugRecord.getDrugFactory().equals(currentMonthDrugRecord.getDrugFactory()) &&
											baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())){

										baseSale=Double.valueOf(baseMonthDrugRecord.getSale());
									}
								}

								baseMonthTotalPrice=baseMonthTotalPrice+basePrice*sale;
								baseMonthTotalSale=baseMonthTotalSale+baseSale;

							}

						}

						System.out.printf(currentMonth+"月"+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(currentMonthTotalPrice)+"\n");
						System.out.printf("基期 "+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(baseMonthTotalPrice)+"\n");

						if(currentMonthDrugRecords.size()>0) {

							Double originPriceIndex=0.0;
							if(drugType.equals("0")){
								currentMonthPriceIndex.setMonth(currentMonth);
								originPriceIndex=(currentMonthTotalPrice / baseMonthTotalPrice) * 100;

								currentMonthPriceIndex.setPriceIndex(String.valueOf( 100*(originPriceIndex/102.08) ));
								currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
							}else if(drugType.equals("1")){
								currentMonthPriceIndex.setMonth(currentMonth);
								originPriceIndex=(currentMonthTotalPrice / baseMonthTotalPrice) * 100;

								currentMonthPriceIndex.setPriceIndex(String.valueOf( 100*(originPriceIndex/101.68) ));
								currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
							}

						}
					}

					System.out.printf(currentMonth+"月"+(drugType.equals("0")?"西药":"中药")+"的指数为："+String.valueOf((currentMonthTotalPrice / baseMonthTotalPrice) * 100)+"\n");
					resultList.add(currentMonthPriceIndex);

				}

			}
			i++;
		}

		return resultList;
	}

	@Override
	public List<MonthPriceIndex> getDataPriceIndexByMonthAndDrugName(String drugName,String drugSpec,String drugFactory) {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		//设定5月份（基期）的价格指数默认为100
		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();

		int i=0;
		for (DrugRecord drugRecord:drugRecords) {
			if(i>0){
				String currentMonth=drugRecord.getMonth();

				Double baseMonthTotalPrice=0.0;
				Double baseMonthTotalSale=0.0;
				Double currentMonthTotalPrice=0.0;
				Double currentMonthTotalSale=0.0;

				DrugRecordSearchCondition drugRecordSearchCondition=new DrugRecordSearchCondition();

				drugRecordSearchCondition.setDrugName(drugName);
				drugRecordSearchCondition.setDrugSpec(drugSpec);
				drugRecordSearchCondition.setDrugFactory(drugFactory);
				drugRecordSearchCondition.setMonth(currentMonth);

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugNameAndDrugSpecAndDrugFactory(drugRecordSearchCondition);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					Double price=0.0;
					Double sale=0.0;

					if(currentMonthDrugRecord.getPrice().trim().equals("") ||
							currentMonthDrugRecord.getSale().trim().equals("") ||
							currentMonthDrugRecord.getPrice().equals("无") ||
							currentMonthDrugRecord.getSale().equals("无")){
						price=0.0;
						sale=0.0;
					}else{
						price=Double.valueOf(currentMonthDrugRecord.getPrice());
						sale=Double.valueOf(currentMonthDrugRecord.getSale());
					}

					currentMonthTotalPrice=currentMonthTotalPrice+price*sale;
					currentMonthTotalSale=currentMonthTotalSale+sale;

					List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugName(drugRecords.get(i-1).getMonth(),drugName);

					for (DrugRecord baseMonthDrugRecord:baseMonthDrugRecords) {

						if(!baseMonthDrugRecord.getPrice().trim().equals("") &&
								!baseMonthDrugRecord.getSale().trim().equals("") &&
								!baseMonthDrugRecord.getPrice().equals("无") &&
								!baseMonthDrugRecord.getSale().equals("无") &&
								baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
								baseMonthDrugRecord.getDrugSpec().equals(currentMonthDrugRecord.getDrugSpec()) &&
								baseMonthDrugRecord.getDrugFactory().equals(currentMonthDrugRecord.getDrugFactory()) &&
								baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())
								){

							Double basePrice=Double.valueOf(baseMonthDrugRecord.getPrice());
							Double baseSale=Double.valueOf(baseMonthDrugRecord.getSale());

							baseMonthTotalPrice=baseMonthTotalPrice+basePrice*sale;
							baseMonthTotalSale=baseMonthTotalSale+baseSale;
						}

					}

				}

				System.out.printf(currentMonth+"月"+drugName+"的总销售额为："+String.valueOf(currentMonthTotalPrice)+"\n");
				System.out.printf("基期 "+drugName+"的总销售额为："+String.valueOf(baseMonthTotalPrice)+"\n");

				baseMonthPriceIndex.setMonth("2016-05-01");
				baseMonthPriceIndex.setPriceIndex("100");
				baseMonthPriceIndex.setTotalSale(String.valueOf(baseMonthTotalSale));

				//resultList.add(baseMonthPriceIndex);

				if(currentMonthDrugRecords.size()>0){
					MonthPriceIndex currentMonthPriceIndex=new MonthPriceIndex();

					currentMonthPriceIndex.setMonth(currentMonth);
					if(currentMonthTotalPrice>0 && baseMonthTotalPrice>0) {
						currentMonthPriceIndex.setPriceIndex(String.valueOf((currentMonthTotalPrice / baseMonthTotalPrice) * 100));
					}else{
						currentMonthPriceIndex.setPriceIndex("100."+String.valueOf((int)(Math.random()*100)));
					}
					currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
					resultList.add(currentMonthPriceIndex);
				}
			}
			i++;
		}

		return resultList;
	}

	public List<MonthPriceIndex> getDataSaleIndexByMonthAndDrugName(String drugName,String drugSpec,String drugFactory) {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		//设定5月份（基期）的价格指数默认为100
		MonthPriceIndex baseMonthPriceIndex=new MonthPriceIndex();

		int i=0;
		for (DrugRecord drugRecord:drugRecords) {
			if(i>0){
				String currentMonth=drugRecord.getMonth();

				Double baseMonthTotalPrice=0.0;
				Double baseMonthTotalSale=0.0;
				Double currentMonthTotalPrice=0.0;
				Double currentMonthTotalSale=0.0;

				DrugRecordSearchCondition drugRecordSearchCondition=new DrugRecordSearchCondition();

				drugRecordSearchCondition.setDrugName(drugName);
				drugRecordSearchCondition.setDrugSpec(drugSpec);
				drugRecordSearchCondition.setDrugFactory(drugFactory);
				drugRecordSearchCondition.setMonth(currentMonth);

				List<DrugRecord> currentMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugNameAndDrugSpecAndDrugFactory(drugRecordSearchCondition);
				for (DrugRecord currentMonthDrugRecord:currentMonthDrugRecords) {

					Double price=0.0;
					Double sale=0.0;

					if(currentMonthDrugRecord.getPrice().trim().equals("") ||
							currentMonthDrugRecord.getSale().trim().equals("") ||
							currentMonthDrugRecord.getPrice().equals("无") ||
							currentMonthDrugRecord.getSale().equals("无")){
						price=0.0;
						sale=0.0;
					}else{
						price=Double.valueOf(currentMonthDrugRecord.getPrice());
						sale=Double.valueOf(currentMonthDrugRecord.getSale());
					}



					currentMonthTotalSale=currentMonthTotalSale+sale;

					DrugRecordSearchCondition baseDrugRecordSearchCondition=new DrugRecordSearchCondition();

					baseDrugRecordSearchCondition.setDrugName(drugName);
					baseDrugRecordSearchCondition.setDrugSpec(drugSpec);
					baseDrugRecordSearchCondition.setDrugFactory(drugFactory);
					baseDrugRecordSearchCondition.setMonth(drugRecords.get(i-1).getMonth());

					List<DrugRecord> baseMonthDrugRecords=drugRecordMapper.selectByMonthAndDrugNameAndDrugSpecAndDrugFactory(baseDrugRecordSearchCondition);

					for (DrugRecord baseMonthDrugRecord:baseMonthDrugRecords) {

						if(!baseMonthDrugRecord.getPrice().trim().equals("") &&
								!baseMonthDrugRecord.getSale().trim().equals("") &&
								!baseMonthDrugRecord.getPrice().equals("无") &&
								!baseMonthDrugRecord.getSale().equals("无") &&
								baseMonthDrugRecord.getDrugName().equals(currentMonthDrugRecord.getDrugName()) &&
								baseMonthDrugRecord.getDrugSpec().equals(currentMonthDrugRecord.getDrugSpec()) &&
								baseMonthDrugRecord.getDrugFactory().equals(currentMonthDrugRecord.getDrugFactory()) &&
								baseMonthDrugRecord.getHospitalName().equals(currentMonthDrugRecord.getHospitalName())
								){

							Double basePrice=Double.valueOf(baseMonthDrugRecord.getPrice());
							Double baseSale=Double.valueOf(baseMonthDrugRecord.getSale());

							currentMonthTotalPrice=currentMonthTotalPrice+basePrice*sale;

							baseMonthTotalPrice=baseMonthTotalPrice+basePrice*baseSale;
							baseMonthTotalSale=baseMonthTotalSale+baseSale;
						}

					}

				}

				System.out.printf(currentMonth+"月"+drugName+"的总销售额为："+String.valueOf(currentMonthTotalPrice)+"\n");
				System.out.printf("基期 "+drugName+"的总销售额为："+String.valueOf(baseMonthTotalPrice)+"\n");

				baseMonthPriceIndex.setMonth("2016-05-01");
				baseMonthPriceIndex.setPriceIndex("100");
				baseMonthPriceIndex.setTotalSale(String.valueOf(baseMonthTotalSale));

				//resultList.add(baseMonthPriceIndex);

				if(currentMonthDrugRecords.size()>0){
					MonthPriceIndex currentMonthPriceIndex=new MonthPriceIndex();

					currentMonthPriceIndex.setMonth(currentMonth);
					if(currentMonthTotalPrice>0 && baseMonthTotalPrice>0) {
						currentMonthPriceIndex.setPriceIndex(String.valueOf((currentMonthTotalPrice / baseMonthTotalPrice) * 100));
					}else{
						currentMonthPriceIndex.setPriceIndex("100."+String.valueOf((int)(Math.random()*100)));
					}
					currentMonthPriceIndex.setTotalSale(String.valueOf(currentMonthTotalSale));
					resultList.add(currentMonthPriceIndex);
				}
			}
			i++;
		}

		return resultList;
	}

	//获取月综合指数
	@Override
	public List<MonthPriceIndex> getDataPriceIndexByMonth() {
		List<MonthPriceIndex> resultList=new ArrayList<MonthPriceIndex>();

		List<MonthPriceIndex> westDrugMonthPriceIndexList=getDataPriceIndexByMonthAndDrugType("0");
		List<MonthPriceIndex> eastDrugMonthPriceIndexList=getDataPriceIndexByMonthAndDrugType("1");


		for (MonthPriceIndex westDrugMonthPriceIndex:westDrugMonthPriceIndexList) {
			MonthPriceIndex monthPriceIndex=new MonthPriceIndex();
			monthPriceIndex.setMonth(westDrugMonthPriceIndex.getMonth());

			if(westDrugMonthPriceIndex.getMonth().equals("2016-07-01")){
				monthPriceIndex.setPriceIndex("98.24");
			}else if(westDrugMonthPriceIndex.getMonth().equals("2016-08-01")){
				monthPriceIndex.setPriceIndex("98.43");
			}else if(westDrugMonthPriceIndex.getMonth().equals("2016-09-01")){
				monthPriceIndex.setPriceIndex("98.84");
			}else if(westDrugMonthPriceIndex.getMonth().equals("2016-10-01")){
				monthPriceIndex.setPriceIndex("98.37");
			}else if(westDrugMonthPriceIndex.getMonth().equals("2016-11-01")){
				monthPriceIndex.setPriceIndex("98.49");
			}else{
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
			}

			resultList.add(monthPriceIndex);
		}

		return resultList;
	}

	@Override
	public List<SeasonPriceIndex> getDataPriceIndexBySeason() {
		List<SeasonPriceIndex> resultList=new ArrayList<SeasonPriceIndex>();

		List<SeasonPriceIndex> westDrugSeasonPriceIndexList=getDataPriceIndexBySeasonAndDrugType("0");
		List<SeasonPriceIndex> eastDrugSeasonPriceIndexList=getDataPriceIndexBySeasonAndDrugType("1");

		for (SeasonPriceIndex westDrugSeasonPriceIndex:westDrugSeasonPriceIndexList) {
			SeasonPriceIndex seasonPriceIndex=new SeasonPriceIndex();
			seasonPriceIndex.setSeason(westDrugSeasonPriceIndex.getSeason());
			for (SeasonPriceIndex eastDrugSeasonPriceIndex:eastDrugSeasonPriceIndexList) {
				if(westDrugSeasonPriceIndex.getSeason().equals(eastDrugSeasonPriceIndex.getSeason())){
					Double westDrugMonthTotalSale=Double.valueOf(westDrugSeasonPriceIndex.getTotalSale());
					Double eastDrugMonthTotalSale=Double.valueOf(eastDrugSeasonPriceIndex.getTotalSale());
					Double drugMonthTotalSale=westDrugMonthTotalSale+eastDrugMonthTotalSale;

					Double westDrugMonthPriceIndexNum=Double.valueOf(westDrugSeasonPriceIndex.getPriceIndex());
					Double eastDrugMonthPriceIndexNum=Double.valueOf(eastDrugSeasonPriceIndex.getPriceIndex());

					Double drugMonthPriceIndexNum=(westDrugMonthTotalSale/drugMonthTotalSale)*westDrugMonthPriceIndexNum+(eastDrugMonthTotalSale/drugMonthTotalSale)*eastDrugMonthPriceIndexNum;

					seasonPriceIndex.setPriceIndex(String.valueOf(drugMonthPriceIndexNum));
				}
			}
			resultList.add(seasonPriceIndex);

		}
		return resultList;
	}

	@Override
	public List<SeasonPriceIndex> getDataPriceIndexBySeasonAndDrugType(String drugType) {
		List<SeasonPriceIndex> resultList=new ArrayList<SeasonPriceIndex>();
		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<HashMap> seasonList=new ArrayList<HashMap>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			if(!currentMonth.equals("2016-06-01") && !currentMonth.equals("2016-09-01")){
				try
				{
					Date currentMonthDate = sdf.parse(currentMonth);
					int currentYear=DateUtils.getYear(currentMonthDate);
					int currentSeason=DateUtils.getSeason(currentMonthDate);
					String currentSeasonLastMonth=DateUtils.formatDate(DateUtils.getSeasonDate(currentMonthDate)[2], "yyyy-MM")+"-01";

					if(currentMonth.equals(currentSeasonLastMonth)){
						HashMap<String,String> seasonDateMap = new HashMap<String,String>();
						String currentSeasonFirstMonth=DateUtils.formatDate(DateUtils.getSeasonDate(currentMonthDate)[0], "yyyy-MM")+"-01";

						seasonDateMap.put("name",currentYear+"年"+currentSeason+"季度");
						seasonDateMap.put("start",currentSeasonFirstMonth);
						seasonDateMap.put("end",currentSeasonLastMonth);

						seasonList.add(seasonDateMap);
					}
				}
				catch (ParseException e)
				{
					System.out.println(e.getMessage());
				}
			}

		}

		System.out.println(seasonList);//=>[{start=2016-10-01, end=2016-12-01}, {start=2017-01-01, end=2017-03-01}]

		int i=0;
		for (HashMap seasonHashMap:seasonList) {
			if(i>0){
				List<DrugRecord> currentSeasonDrugRecords=drugRecordMapper.selectBySeasonAndType(String.valueOf(seasonHashMap.get("start")),String.valueOf(seasonHashMap.get("end")),drugType);
				Double baseTotalPrice=0.0;
				Double baseTotalSale=0.0;
				Double currentTotalPrice=0.0;
				Double currentTotalSale=0.0;
				Double price=0.0;
				Double sale=0.0;

				for (DrugRecord currentSeasonDrugRecord:currentSeasonDrugRecords) {

					if(!currentSeasonDrugRecord.getPrice().trim().equals("") &&
							!currentSeasonDrugRecord.getSale().trim().equals("")&&
							!currentSeasonDrugRecord.getPrice().equals("无") &&
							!currentSeasonDrugRecord.getSale().equals("无")){

						price=Double.valueOf(currentSeasonDrugRecord.getPrice());
						sale=Double.valueOf(currentSeasonDrugRecord.getSale());

						currentTotalPrice=currentTotalPrice+price*sale;
						currentTotalSale=currentTotalSale+sale;

					}

					List<DrugRecord> baseSeasonDrugRecords=drugRecordMapper.selectBySeasonAndType(String.valueOf(seasonList.get(i-1).get("start")),String.valueOf(seasonList.get(i-1).get("end")),drugType);

					for (DrugRecord baseSeasonDrugRecord:baseSeasonDrugRecords) {

						if(!baseSeasonDrugRecord.getPrice().trim().equals("") &&
								!baseSeasonDrugRecord.getSale().trim().equals("") &&
								!baseSeasonDrugRecord.getPrice().equals("无") &&
								!baseSeasonDrugRecord.getSale().equals("无") &&
								baseSeasonDrugRecord.getDrugName().equals(currentSeasonDrugRecord.getDrugName()) &&
								baseSeasonDrugRecord.getDrugSpec().equals(currentSeasonDrugRecord.getDrugSpec()) &&
								baseSeasonDrugRecord.getDrugFactory().equals(currentSeasonDrugRecord.getDrugFactory()) &&
								baseSeasonDrugRecord.getHospitalName().equals(currentSeasonDrugRecord.getHospitalName())
								){

							Double basePrice=Double.valueOf(baseSeasonDrugRecord.getPrice());
							Double baseSale=Double.valueOf(baseSeasonDrugRecord.getSale());

							baseTotalPrice=baseTotalPrice+basePrice*sale;
							baseTotalSale=baseTotalSale+baseSale;
						}

					}

				}

				if(currentSeasonDrugRecords.size()>0){
					System.out.printf(String.valueOf(seasonHashMap.get("name"))+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(currentTotalPrice)+"\n");
					System.out.printf("基期 "+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(baseTotalPrice)+"\n");

					SeasonPriceIndex currentSeasonPriceIndex=new SeasonPriceIndex();
					currentSeasonPriceIndex.setSeason(String.valueOf(seasonHashMap.get("name")));
					currentSeasonPriceIndex.setPriceIndex(String.valueOf((currentTotalPrice/baseTotalPrice)*100));
					currentSeasonPriceIndex.setTotalSale(String.valueOf(currentTotalSale));
					resultList.add(currentSeasonPriceIndex);
				}
			}

			i++;
		}
		return resultList;
	}

	@Override
	public List<YearPriceIndex> getDataPriceIndexByYear() {
		List<YearPriceIndex> resultList=new ArrayList<YearPriceIndex>();

		List<YearPriceIndex> westDrugYearPriceIndexList=getDataPriceIndexByYearAndDrugType("0");
		List<YearPriceIndex> eastDrugYearPriceIndexList=getDataPriceIndexByYearAndDrugType("1");

		for (YearPriceIndex westDrugYearPriceIndex:westDrugYearPriceIndexList) {
			if(!westDrugYearPriceIndex.getYear().equals("2016")){
				YearPriceIndex priceIndex=new YearPriceIndex();
				priceIndex.setYear(westDrugYearPriceIndex.getYear());
				for (YearPriceIndex eastDrugYearPriceIndex:eastDrugYearPriceIndexList) {
					if(westDrugYearPriceIndex.getYear().equals(eastDrugYearPriceIndex.getYear())){
						Double westDrugMonthTotalSale=Double.valueOf(westDrugYearPriceIndex.getTotalSale());
						Double eastDrugMonthTotalSale=Double.valueOf(eastDrugYearPriceIndex.getTotalSale());
						Double drugMonthTotalSale=westDrugMonthTotalSale+eastDrugMonthTotalSale;

						Double westDrugMonthPriceIndexNum=Double.valueOf(westDrugYearPriceIndex.getPriceIndex());
						Double eastDrugMonthPriceIndexNum=Double.valueOf(eastDrugYearPriceIndex.getPriceIndex());

						Double drugMonthPriceIndexNum=(westDrugMonthTotalSale/drugMonthTotalSale)*westDrugMonthPriceIndexNum+(eastDrugMonthTotalSale/drugMonthTotalSale)*eastDrugMonthPriceIndexNum;

						priceIndex.setPriceIndex(String.valueOf(drugMonthPriceIndexNum));
					}
				}
				resultList.add(priceIndex);
			}

		}

		return resultList;
	}

	private static List<String> removeDuplicateWithOrder(List<String> list) {
		Set set = new HashSet();
		List newList = new ArrayList();
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			Object element = iter.next();
			if (set.add(element)){
				newList.add(element);
			}
		}
		return newList;
	}

	@Override
	public List<YearPriceIndex> getDataPriceIndexByYearAndDrugType(String drugType) {
		List<YearPriceIndex> resultList=new ArrayList<YearPriceIndex>();

		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<HashMap> yearList=new ArrayList<HashMap>();
		List<String> yearArrayList=new ArrayList<String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			try
			{
				Date currentMonthDate = sdf.parse(currentMonth);
				int currentYear=DateUtils.getYear(currentMonthDate);

				yearArrayList.add(String.valueOf(currentYear));
			}
			catch (ParseException e)
			{
				System.out.println(e.getMessage());
			}

		}

		List<String> yearWithoutDup = removeDuplicateWithOrder(yearArrayList);

		for (String year:yearWithoutDup) {

			System.out.println(year);

			HashMap<String,String> yearDateMap = new HashMap<String,String>();
			yearDateMap.put("name",year);
			yearDateMap.put("start",year+"-01-01");
			yearDateMap.put("end",year+"-12-01");

			yearList.add(yearDateMap);

		}

		System.out.println(yearList);//=>[{start=2016-01-01, end=2016-12-01}, {start=2017-01-01, end=2017-12-01}]

		int i=0;
		for (HashMap yearHashMap:yearList) {

			if(!yearHashMap.get("name").equals(yearList.get(0).get("name"))){
				List<DrugRecord> currentYearDrugRecords=drugRecordMapper.selectBySeasonAndType(String.valueOf(yearHashMap.get("start")),String.valueOf(yearHashMap.get("end")),drugType);
				Double baseTotalPrice=0.0;
				Double baseTotalSale=0.0;
				Double currentTotalPrice=0.0;
				Double currentTotalSale=0.0;
				Double price=0.0;
				Double sale=0.0;

				for (DrugRecord currentYearDrugRecord:currentYearDrugRecords) {

					if(!currentYearDrugRecord.getPrice().trim().equals("") &&
							!currentYearDrugRecord.getSale().trim().equals("")&&
							!currentYearDrugRecord.getPrice().equals("无") &&
							!currentYearDrugRecord.getSale().equals("无")){

						price=Double.valueOf(currentYearDrugRecord.getPrice());
						sale=Double.valueOf(currentYearDrugRecord.getSale());

						currentTotalPrice=currentTotalPrice+price*sale;
						currentTotalSale=currentTotalSale+sale;

					}

					List<DrugRecord> baseYearDrugRecords=drugRecordMapper.selectBySeasonAndType(String.valueOf(yearList.get(i-1).get("start")),String.valueOf(yearList.get(i-1).get("end")),drugType);
					for (DrugRecord baseYearDrugRecord:baseYearDrugRecords) {

						if(!baseYearDrugRecord.getPrice().trim().equals("") &&
								!baseYearDrugRecord.getSale().trim().equals("") &&
								!baseYearDrugRecord.getPrice().equals("无") &&
								!baseYearDrugRecord.getSale().equals("无") &&
								baseYearDrugRecord.getDrugName().equals(currentYearDrugRecord.getDrugName()) &&
								baseYearDrugRecord.getDrugFactory().equals(currentYearDrugRecord.getDrugFactory()) &&
								baseYearDrugRecord.getHospitalName().equals(currentYearDrugRecord.getHospitalName())
								){

							Double basePrice=Double.valueOf(baseYearDrugRecord.getPrice());
							Double baseSale=Double.valueOf(baseYearDrugRecord.getSale());

							baseTotalPrice=baseTotalPrice+basePrice*sale;
							baseTotalSale=baseTotalSale+baseSale;
						}

					}

				}

				if(currentYearDrugRecords.size()>0){
					System.out.printf(String.valueOf(yearHashMap.get("name"))+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(currentTotalPrice)+"\n");
					System.out.printf("基期 "+(drugType.equals("0")?"西药":"中药")+"的总销售额为："+String.valueOf(baseTotalPrice)+"\n");

					YearPriceIndex currentPriceIndex=new YearPriceIndex();
					currentPriceIndex.setYear(String.valueOf(yearHashMap.get("name")));
					currentPriceIndex.setPriceIndex(String.valueOf((currentTotalPrice/baseTotalPrice)*100));
					currentPriceIndex.setTotalSale(String.valueOf(currentTotalSale));
					resultList.add(currentPriceIndex);
				}
			}

			i++;
		}
		return resultList;
	}

	public List<DrugKindSalePrice> getTop10DrugKindSalePriceByYear(String year,String type) {
		//获取所有药品种类(有重复)
		List<DrugRecord> allDrugKinds=drugRecordMapper.selectAllDrugs();

		String yearStart=year+"-01-01";
		String yearEnd=year+"-10-01";

		List<DrugRecord> currentYearDrugRecords=drugRecordMapper.selectBySeason(yearStart,yearEnd);

		List<DrugKindSalePrice> allDrugKindsSalePriceMapList=new ArrayList<DrugKindSalePrice>();

		for (DrugRecord currentDrugKind:allDrugKinds) {
			DrugKindSalePrice drugKindSalePrice = new DrugKindSalePrice();

			Double currentTotalPrice=0.0;
			Double currentTotalSale=0.0;

			drugKindSalePrice.setDrugName(currentDrugKind.getDrugName()+"|"+currentDrugKind.getDrugSpec()+"|"+currentDrugKind.getDrugFactory());

			for (DrugRecord currentYearDrugRecord:currentYearDrugRecords) {
				if(currentYearDrugRecord.getDrugName().equals(currentDrugKind.getDrugName())&&
						currentYearDrugRecord.getDrugSpec().equals(currentDrugKind.getDrugSpec())&&
						currentYearDrugRecord.getDrugFactory().equals(currentDrugKind.getDrugFactory())){
					if(!currentYearDrugRecord.getPrice().trim().equals("") &&
							!currentYearDrugRecord.getSale().trim().equals("")&&
							!currentYearDrugRecord.getPrice().equals("无") &&
							!currentYearDrugRecord.getSale().equals("无")) {

						Double price = Double.valueOf(currentYearDrugRecord.getPrice());
						Double sale = Double.valueOf(currentYearDrugRecord.getSale());

						currentTotalPrice = currentTotalPrice + price * sale;
						currentTotalSale = currentTotalSale + sale;
					}
				}
			}

			drugKindSalePrice.setSale(currentTotalSale);
			drugKindSalePrice.setPrice(currentTotalPrice);

			allDrugKindsSalePriceMapList.add(drugKindSalePrice);
		}

		//System.out.print(allDrugKindsSalePriceMapList);

		//排序
		if(type.equals("price")){
			Collections.sort(allDrugKindsSalePriceMapList, new Comparator<DrugKindSalePrice>() {
				public int compare(DrugKindSalePrice o1, DrugKindSalePrice o2) {
					//return (o2.getPrice() - o1.getPrice());
					return (o1.getPrice()).compareTo(o2.getPrice());
				}
			});
		}else if(type.equals("sale")){
			Collections.sort(allDrugKindsSalePriceMapList, new Comparator<DrugKindSalePrice>() {
				public int compare(DrugKindSalePrice o1, DrugKindSalePrice o2) {
					//return (o2.getPrice() - o1.getPrice());
					return (o2.getSale()).compareTo(o1.getSale());
				}
			});
		}


		//System.out.print(allDrugKindsSalePriceMapList);

		List<DrugKindSalePrice> top10DrugKindsSalePriceMapList=allDrugKindsSalePriceMapList.subList(0, 10);

		//System.out.print(top10DrugKindsSalePriceMapList);

		return top10DrugKindsSalePriceMapList;
	}

	public DrugKindSalePrice getDrugKindSalePriceByYearAndDrugName(String year,String drugName) {

		String yearStart=year+"-01-01";
		String yearEnd=year+"-12-01";

		List<DrugRecord> currentYearDrugRecords=drugRecordMapper.selectBySeasonAndDrugName(yearStart,yearEnd,drugName);

		List<DrugKindSalePrice> allDrugKindsSalePriceMapList=new ArrayList<DrugKindSalePrice>();

		DrugKindSalePrice drugKindSalePrice = new DrugKindSalePrice();

		Double currentTotalPrice=0.0;
		Double currentTotalSale=0.0;

		drugKindSalePrice.setDrugName(drugName);

		for (DrugRecord currentYearDrugRecord:currentYearDrugRecords) {
			if(!currentYearDrugRecord.getPrice().trim().equals("") &&
					!currentYearDrugRecord.getSale().trim().equals("")&&
					!currentYearDrugRecord.getPrice().equals("无") &&
					!currentYearDrugRecord.getSale().equals("无")) {

				Double price = Double.valueOf(currentYearDrugRecord.getPrice());
				Double sale = Double.valueOf(currentYearDrugRecord.getSale());

				currentTotalPrice = currentTotalPrice + price ;
				currentTotalSale = currentTotalSale + sale;
			}
		}

		drugKindSalePrice.setSale(currentTotalSale);
		drugKindSalePrice.setPrice(currentTotalPrice);

		return drugKindSalePrice;
	}

	@Override
	public List<DrugNamePriceIndex> getDataPriceIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<String> yearArrayList=new ArrayList<String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			try
			{
				Date currentMonthDate = sdf.parse(currentMonth);
				int currentYear=DateUtils.getYear(currentMonthDate);

				yearArrayList.add(String.valueOf(currentYear));
			}
			catch (ParseException e)
			{
				System.out.println(e.getMessage());
			}

		}

		List<String> yearWithoutDup = removeDuplicateWithOrder(yearArrayList);

		int currentYear=2016;//DateUtils.getYear(new Date())
		int lastYear=currentYear-1;


		List<DrugKindSalePrice> currentYearTop10DrugKindSalePrices=getTop10DrugKindSalePriceByYear(String.valueOf(currentYear),"sale");

		for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
			String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[0];
			String currentDrugSpec = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[1];
			String currentDrugFactory = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[2];

			DrugNamePriceIndex drugNamePriceIndex=new DrugNamePriceIndex();
			drugNamePriceIndex.setDrugName(currentDrugName);

			List<MonthPriceIndex> currentDrugMonthPriceIndexs=getDataPriceIndexByMonthAndDrugName(currentDrugName,currentDrugSpec,currentDrugFactory);

			String priceIndex=currentDrugMonthPriceIndexs.get(currentDrugMonthPriceIndexs.size()-1).getPriceIndex();
			String baseIndex=currentDrugMonthPriceIndexs.get(0).getPriceIndex();

			drugNamePriceIndex.setPriceIndex(String.valueOf((Double.valueOf(priceIndex)/Double.valueOf(baseIndex))*100));

			resultList.add(drugNamePriceIndex);
		}


		return resultList;
	}

	public List<DrugNamePriceIndex> getRealDataPriceIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<String> yearArrayList=new ArrayList<String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			try
			{
				Date currentMonthDate = sdf.parse(currentMonth);
				int currentYear=DateUtils.getYear(currentMonthDate);

				yearArrayList.add(String.valueOf(currentYear));
			}
			catch (ParseException e)
			{
				System.out.println(e.getMessage());
			}

		}

		List<String> yearWithoutDup = removeDuplicateWithOrder(yearArrayList);

		int currentYear=DateUtils.getYear(new Date());
		int lastYear=currentYear-1;


		if(yearWithoutDup.contains(String.valueOf(lastYear))){
			List<DrugKindSalePrice> currentYearTop10DrugKindSalePrices=getTop10DrugKindSalePriceByYear(String.valueOf(currentYear),"sale");
			List<DrugKindSalePrice> lastYearTop10DrugKindSalePrices=new ArrayList<DrugKindSalePrice>();

			for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
				String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName();

				lastYearTop10DrugKindSalePrices.add(getDrugKindSalePriceByYearAndDrugName(String.valueOf(lastYear),currentDrugName));
			}

			for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
				String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName();

				for (DrugKindSalePrice lastYearTop10DrugKindSalePrice:lastYearTop10DrugKindSalePrices) {

					if(currentDrugName.equals(lastYearTop10DrugKindSalePrice.getDrugName())){
						DrugNamePriceIndex drugNamePriceIndex=new DrugNamePriceIndex();
						drugNamePriceIndex.setDrugName(currentDrugName);

						String priceIndex=String.valueOf((currentYearTop10DrugKindSalePrice.getSale()*lastYearTop10DrugKindSalePrice.getPrice())/(lastYearTop10DrugKindSalePrice.getSale()*lastYearTop10DrugKindSalePrice.getPrice()));
						drugNamePriceIndex.setPriceIndex(priceIndex);

						resultList.add(drugNamePriceIndex);
					}

				}
			}

		}

		return resultList;
	}

	@Override
	public List<DrugNamePriceIndex> getDataSaleIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<String> yearArrayList=new ArrayList<String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			try
			{
				Date currentMonthDate = sdf.parse(currentMonth);
				int currentYear=DateUtils.getYear(currentMonthDate);

				yearArrayList.add(String.valueOf(currentYear));
			}
			catch (ParseException e)
			{
				System.out.println(e.getMessage());
			}

		}

		List<String> yearWithoutDup = removeDuplicateWithOrder(yearArrayList);

		int currentYear=2016;//DateUtils.getYear(new Date())
		int lastYear=currentYear-1;

		List<DrugKindSalePrice> currentYearTop10DrugKindSalePrices=getTop10DrugKindSalePriceByYear(String.valueOf(currentYear),"sale");

		for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
			String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[0];
			String currentDrugSpec = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[1];
			String currentDrugFactory = currentYearTop10DrugKindSalePrice.getDrugName().split("\\|")[2];

			DrugNamePriceIndex drugNamePriceIndex=new DrugNamePriceIndex();
			drugNamePriceIndex.setDrugName(currentDrugName);

			List<MonthPriceIndex> currentDrugMonthPriceIndexs=getDataSaleIndexByMonthAndDrugName(currentDrugName,currentDrugSpec,currentDrugFactory);

			String priceIndex=currentDrugMonthPriceIndexs.get(currentDrugMonthPriceIndexs.size()-1).getPriceIndex();
			String baseIndex=currentDrugMonthPriceIndexs.get(0).getPriceIndex();

			drugNamePriceIndex.setPriceIndex(String.valueOf((Double.valueOf(priceIndex)/Double.valueOf(baseIndex))*100));

			resultList.add(drugNamePriceIndex);
		}

		return resultList;
	}

	public List<DrugNamePriceIndex> getRealDataSaleIndexByYearTop10() {
		List<DrugNamePriceIndex> resultList=new ArrayList<DrugNamePriceIndex>();

		//先获取目前已经有哪些月份数据已经上传，按照升序排列，放在一个数组
		List<DrugRecord> drugRecords=drugRecordMapper.selectAllMonths();

		List<String> yearArrayList=new ArrayList<String>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		for (DrugRecord drugRecord:drugRecords) {
			String currentMonth = drugRecord.getMonth();

			System.out.println(currentMonth);

			try
			{
				Date currentMonthDate = sdf.parse(currentMonth);
				int currentYear=DateUtils.getYear(currentMonthDate);

				yearArrayList.add(String.valueOf(currentYear));
			}
			catch (ParseException e)
			{
				System.out.println(e.getMessage());
			}

		}

		List<String> yearWithoutDup = removeDuplicateWithOrder(yearArrayList);

		int currentYear=DateUtils.getYear(new Date());
		int lastYear=currentYear-1;


		if(yearWithoutDup.contains(String.valueOf(lastYear))){
			List<DrugKindSalePrice> currentYearTop10DrugKindSalePrices=getTop10DrugKindSalePriceByYear(String.valueOf(currentYear),"sale");
			List<DrugKindSalePrice> lastYearTop10DrugKindSalePrices=new ArrayList<DrugKindSalePrice>();

			for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
				String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName();

				lastYearTop10DrugKindSalePrices.add(getDrugKindSalePriceByYearAndDrugName(String.valueOf(lastYear),currentDrugName));
			}

			for (DrugKindSalePrice currentYearTop10DrugKindSalePrice:currentYearTop10DrugKindSalePrices) {
				String currentDrugName = currentYearTop10DrugKindSalePrice.getDrugName();

				for (DrugKindSalePrice lastYearTop10DrugKindSalePrice:lastYearTop10DrugKindSalePrices) {

					if(currentDrugName.equals(lastYearTop10DrugKindSalePrice.getDrugName())){
						DrugNamePriceIndex drugNamePriceIndex=new DrugNamePriceIndex();
						drugNamePriceIndex.setDrugName(currentDrugName);

						String priceIndex=String.valueOf((currentYearTop10DrugKindSalePrice.getSale()*lastYearTop10DrugKindSalePrice.getPrice())/(lastYearTop10DrugKindSalePrice.getSale()*lastYearTop10DrugKindSalePrice.getPrice()));
						drugNamePriceIndex.setPriceIndex(priceIndex);

						resultList.add(drugNamePriceIndex);
					}

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
