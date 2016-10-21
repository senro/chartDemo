package rml.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.model.Privileges;
import rml.service.PrivilegesServiceI;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/service/privileges")
public class PrivilegesController {

	@Autowired
	private PrivilegesServiceI privilegesService;

    private static Logger logger = Logger.getLogger(PrivilegesController.class);
	
	@RequestMapping(value="/listPrivilege", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listUser(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		logger.info("权限列表！");

		try{
			List <Privileges> list = privilegesService.getAll();
			JSONArray dataJson=new JSONArray();

			resultJson.put("status","1");
			resultJson.put("data",list);
			resultJson.put("detail","获取权限列表成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/addPrivilege", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addUser(Privileges privilege) {

		JSONObject resultJson=new JSONObject();

		logger.info("新增权限！");

		try{
			privilegesService.insert(privilege);
			resultJson.put("status","1");
			resultJson.put("detail","新增权限成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail","新增权限失败");
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/deletePrivilege", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteUser(int id) {

		JSONObject resultJson=new JSONObject();
		
		logger.info("删除权限！");
		
		try{
			privilegesService.delete(id);
			resultJson.put("status","1");
			resultJson.put("detail","删除权限成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail","删除权限失败");
		}
		return resultJson.toString();
	}

	@RequestMapping(value="/updatePrivilege", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateUser(Privileges privilege) {

		JSONObject resultJson=new JSONObject();
		
		logger.info("更新权限！");
		
		try{
			privilegesService.update(privilege);
			resultJson.put("status","1");
			resultJson.put("detail","更新权限成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail","更新权限失败");
		}
		
		return resultJson.toString();
	}
}
