package rml.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.model.*;
import rml.model.Bo.MonthPriceIndex;
import rml.service.DataServiceI;
import rml.service.DrugRecordServiceI;
import rml.service.FilesServiceI;
import rml.service.UsersServiceI;
import rml.util.ConfigFileUtil;
import rml.util.ExcelUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/service/data")
public class DataController {

	@Autowired
	private DataServiceI dataService;

	@Autowired
	private UsersServiceI usersService;

	@Autowired
	private DrugRecordServiceI drugRecordService;

	@Autowired
	private FilesServiceI filesService;

	ExcelUtil excelUtil=new ExcelUtil();

    private static Logger logger = Logger.getLogger(DataController.class);


	@RequestMapping(value="/listData", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listData(HttpServletRequest request, HttpSession session,Page page) {

		Users user=(Users)session.getAttribute("userInfo");
		JSONObject resultJson=new JSONObject();

		logger.info("数据列表！");

		try{
			page.setUserId(user.getId());
			PageResult pageResult = dataService.getAll( page );
			JSONArray dataJson=new JSONArray();

			resultJson.put("status","1");
			resultJson.put("data",pageResult);
			resultJson.put("detail","获取数据列表成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/getDataById", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataById(HttpServletRequest request,int id) {

		JSONObject resultJson=new JSONObject();

		logger.info("数据列表！");

		try{
			Data data = dataService.getDataById(id);
			resultJson.put("status","1");
			resultJson.put("data",data);
			resultJson.put("detail","获取数据成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}


	@RequestMapping(value="/addData", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addData(HttpServletRequest request, HttpSession session,Data data, String fileKey) {

		JSONObject resultJson=new JSONObject();
		Users user=(Users)session.getAttribute("userInfo");

		logger.info("新增数据！");

		try{

			if(fileKey!=null && data.getMonth()!=null){

				Files getFile=filesService.getFilesByFileKey(fileKey);

				if(user.getRoleId()==1){
					if(data.getUserId()==0){
						data.setUserId(user.getId());
					}
				}else{
					data.setUserId(user.getId());
				}

				data.setHospitalName(usersService.getUserById(data.getUserId()).getName());
				data.setDataPath(getFile.getFilePath());
				data.setDataUrl(getFile.getFileUrl());


				List<DrugRecord> excelDrugRecords= new ArrayList<DrugRecord>();

				//从excel导入的所有药品数据列表
				excelDrugRecords=excelUtil.readExcel(data);

				//从数据库已有的数据中筛选出该用户上月的所有药品数据，保存在一个list里
				if(!data.getPreMonth().equals(data.getMonth())){
					List<DrugRecord> preMonthDrugRecords = drugRecordService.getAllByUserIdAndMonth(data.getPreMonth(),data.getUserId());

					//把当前excel的数据和上月的数据进行比较，价格超过上月2倍的，作一个isValid：1标记
					if(preMonthDrugRecords.size()>0){
						for (DrugRecord excelDrugRecord:
								excelDrugRecords) {
							for (DrugRecord preMonthDrugRecord:
									preMonthDrugRecords) {
								//通过比对药名、规格、厂家去对应数据
								if( excelDrugRecord.getDrugName().equals(preMonthDrugRecord.getDrugName())&&
										excelDrugRecord.getDrugSpec().equals(preMonthDrugRecord.getDrugSpec())&&
										excelDrugRecord.getDrugFactory().equals(preMonthDrugRecord.getDrugFactory())
										){

									if( !excelDrugRecord.getPrice().equals("") &&
											!preMonthDrugRecord.getPrice().equals("")&&
											!excelDrugRecord.getPrice().equals("无") &&
											!preMonthDrugRecord.getPrice().equals("无")) {

										//System.out.printf(preMonthDrugRecord.getMonth()+"\n");
										//System.out.printf(excelDrugRecord.getDrugName()+"\n");
										//System.out.printf(preMonthDrugRecord.getUpdateAt()+"\n");
										//System.out.printf(preMonthDrugRecord.getPrice()+"\n");

										Double currMonthPrice = Double.valueOf(excelDrugRecord.getPrice());
										Double preMonthPrice = Double.valueOf(preMonthDrugRecord.getPrice());

										if ((currMonthPrice - preMonthPrice) > preMonthPrice * 0.5) {
											//价格涨幅超上月50%
											excelDrugRecord.setIsValid("0");
										} else {
											excelDrugRecord.setIsValid("1");
										}
									}
								}
							}
						}
					}
				}

				//如果当月数据已经存在，则先删除之前上传过的数据再插入新上传的数据，超级管理员没有此限制
				List<DrugRecord> currMonthDrugRecords = drugRecordService.getAllByUserIdAndMonth(data.getMonth(),user.getId());
				if(user.getRoleId()!=1 && currMonthDrugRecords.size()>0){
					drugRecordService.deleteAllByMonthAndUserId(data.getMonth(),user.getId());
				}
				drugRecordService.insertBatch(excelDrugRecords);

				dataService.insert(data);
				resultJson.put("status","1");
				resultJson.put("detail","新增数据成功");
			}else{
				resultJson.put("status","0");
				resultJson.put("detail","dataUrl,month参数异常！");
			}

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/deleteData", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteData(int id) {

		logger.info("删除数据！");

		JSONObject resultJson=new JSONObject();

		try{
			Data data = dataService.getDataById(id);
			drugRecordService.deleteAllByMonthAndUserId(data.getMonth(),data.getUserId());
			dataService.delete(id);

			resultJson.put("status","1");
			resultJson.put("detail","删除数据成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/updateData", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateData(HttpServletRequest request,Data Data) {

		logger.info("更新数据！");

		JSONObject resultJson=new JSONObject();

		try{

			dataService.update(Data);
			resultJson.put("status","1");
			resultJson.put("detail","更新数据成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();


	}
}
