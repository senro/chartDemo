package rml.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.model.*;
import rml.model.Bo.*;
import rml.service.DrugRecordServiceI;
import rml.service.FilesServiceI;
import rml.util.ExcelUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/service/drugRecord")
public class DrugRecordController {

	@Autowired
	private DrugRecordServiceI drugRecordService;

	@Autowired
	private FilesServiceI filesService;

	ExcelUtil excelUtil=new ExcelUtil();

    private static Logger logger = Logger.getLogger(DrugRecordController.class);


	@RequestMapping(value="/listDrugRecord", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listDrugRecord(HttpServletRequest request, DrugRecordSearchCondition drugRecordSearchCondition) {

		JSONObject resultJson=new JSONObject();

		logger.info("数据列表！");

		try{
			PageResult pageResult = drugRecordService.getAll(drugRecordSearchCondition);

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

	@RequestMapping(value="/getDrugRecordById", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDrugRecordById(HttpServletRequest request,int id) {

		JSONObject resultJson=new JSONObject();

		logger.info("数据列表！");

		try{
			DrugRecord drugRecord = drugRecordService.getDrugRecordById(id);
			resultJson.put("status","1");
			resultJson.put("data",drugRecord);
			resultJson.put("detail","获取数据成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/getDataPriceIndexByMonth", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByMonth(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取月数据的综合价格指数！");

		try{
			List<MonthPriceIndex> data = drugRecordService.getDataPriceIndexByMonth();
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

	@RequestMapping(value="/getDataPriceIndexByMonthAndType", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByMonthAndType(HttpServletRequest request,String drugType) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取当月数据的价格指数！");

		try{
			List<MonthPriceIndex> data = drugRecordService.getDataPriceIndexByMonthAndDrugType(drugType);
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

	@RequestMapping(value="/getDataPriceIndexByMonthAndDrugName", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByMonthAndDrugName(HttpServletRequest request,String drugName) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取单个药品的价格指数！");

		try{
			List<MonthPriceIndex> data = drugRecordService.getDataPriceIndexByMonthAndDrugName(drugName);
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

	@RequestMapping(value="/getDataPriceIndexBySeasonAndType", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexBySeasonAndType(HttpServletRequest request,String drugType) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取季度数据的价格指数！");

//		try{
//			List<SeasonPriceIndex> data = drugRecordService.getDataPriceIndexBySeasonAndDrugType(drugType);
//			resultJson.put("status","1");
//			resultJson.put("data",data);
//			resultJson.put("detail","获取数据成功");
//		}catch(Exception e){
//			logger.error(e.getMessage(), e);
//			resultJson.put("status","0");
//			resultJson.put("detail",e.getMessage());
//		}

		return resultJson.toString();
	}

	@RequestMapping(value="/getDataPriceIndexBySeason", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexBySeason(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取季度数据的价格指数！");

		try{
			List<SeasonPriceIndex> data = drugRecordService.getDataPriceIndexBySeason();
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

	@RequestMapping(value="/getDataPriceIndexByYearAndType", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByYearAndType(HttpServletRequest request,String drugType) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取年数据的价格指数！");

		try{
			List<YearPriceIndex> data = drugRecordService.getDataPriceIndexByYearAndDrugType(drugType);
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

	@RequestMapping(value="/getDataPriceIndexByYear", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByYear(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取季度数据的价格指数！");

		try{
			List<YearPriceIndex> data = drugRecordService.getDataPriceIndexByYear();
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

	@RequestMapping(value="/getDataPriceIndexByYearTop10", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataPriceIndexByYearTop10(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取季度数据的价格指数！");

		try{
			List<DrugNamePriceIndex> data = drugRecordService.getDataPriceIndexByYearTop10();
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

	@RequestMapping(value="/getDataSaleIndexByYearTop10", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getDataSaleIndexByYearTop10(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取季度数据的价格指数！");

		try{
			List<DrugNamePriceIndex> data = drugRecordService.getDataSaleIndexByYearTop10();
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

	@RequestMapping(value="/addDrugRecord", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addDrugRecord(HttpServletRequest request, HttpSession session,DrugRecord drugRecord) {

		JSONObject resultJson=new JSONObject();
		Users user=(Users)session.getAttribute("userInfo");

		logger.info("新增数据！");

		try{
			drugRecord.setUserId(user.getId());
			drugRecord.setHospitalName(user.getName());

			drugRecordService.insert(drugRecord);
			resultJson.put("status","1");
			resultJson.put("detail","新增数据成功");

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/deleteDrugRecord", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteDrugRecord(int id) {

		logger.info("删除数据！");

		JSONObject resultJson=new JSONObject();

		try{
			drugRecordService.delete(id);
			resultJson.put("status","1");
			resultJson.put("detail","删除数据成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/updateDrugRecord", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateDrugRecord(HttpServletRequest request,DrugRecord drugRecord) {

		logger.info("更新数据！");

		JSONObject resultJson=new JSONObject();

		try{

			drugRecordService.update(drugRecord);
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
