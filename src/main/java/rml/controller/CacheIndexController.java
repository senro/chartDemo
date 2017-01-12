package rml.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.CacheIndex;
import rml.service.CacheIndexServiceI;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/service/cacheIndex")
public class CacheIndexController {

	private CacheIndexServiceI cacheIndexService;

    private static Logger logger = Logger.getLogger(CacheIndexController.class);

	public CacheIndexServiceI getCacheIndexService() {
		return cacheIndexService;
	}

	@Autowired
	public void setCacheIndexService(CacheIndexServiceI cacheIndexService) {
		this.cacheIndexService = cacheIndexService;
	}

	@RequestMapping(value="/getCacheIndex", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listUser(HttpServletRequest request,Page page) {

		JSONObject resultJson=new JSONObject();

		logger.info("获取指数缓存列表！");

		try{
			PageResult pageResult = cacheIndexService.getAll(page);
			JSONArray dataJson=new JSONArray();

			resultJson.put("status","1");
			resultJson.put("data",pageResult);
			resultJson.put("detail","获取用户列表成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/getCacheIndexById", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getUserById(HttpServletRequest request,int id) {

		JSONObject resultJson=new JSONObject();

		logger.info("根据主键获取指数缓存！");

		try{
			CacheIndex cacheIndex = cacheIndexService.selectByPrimaryKey(id);
			resultJson.put("status","1");
			resultJson.put("data",cacheIndex);
			resultJson.put("detail","获取用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/addCacheIndex", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addUser(HttpServletRequest request,CacheIndex cacheIndex) {

		JSONObject resultJson=new JSONObject();

		logger.info("新增指数缓存！");

		try{
			cacheIndexService.insert(cacheIndex);
            resultJson.put("status","1");
            resultJson.put("detail","新增用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/deleteCacheIndex", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteUser(int id) {

		logger.info("删除指数缓存！");

		JSONObject resultJson=new JSONObject();

		try{
			cacheIndexService.delete(id);
			resultJson.put("status","1");
			resultJson.put("detail","删除用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/updateCacheIndex", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateUser(HttpServletRequest request,CacheIndex cacheIndex) {

		logger.info("更新指数缓存！");

		JSONObject resultJson=new JSONObject();

		try{

			cacheIndexService.update(cacheIndex);
			resultJson.put("status","1");
			resultJson.put("detail","更新用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();


	}
}
