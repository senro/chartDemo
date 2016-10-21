package rml.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.model.Roles;
import rml.service.RolesServiceI;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/service/roles")
public class RolesController {

	@Autowired
	private RolesServiceI rolesService;

    private static Logger logger = Logger.getLogger(RolesController.class);
	
	@RequestMapping(value="/listRole", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listUser(HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();
		String logMsg;

		logger.info("角色列表！");

		try{
			List <Roles> list = rolesService.getAll();
			JSONArray dataJson=new JSONArray();

			logMsg="获取角色列表成功";
			resultJson.put("status","1");
			resultJson.put("data",list);
			resultJson.put("detail",logMsg);

			logger.error(logMsg);
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/addRole", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addUser(Roles role) {

		JSONObject resultJson=new JSONObject();
		String logMsg;

		logger.info("新增角色！");

		try{
			if(role.getRoleName()!=null && role.getPrivilegeIds()!=null){
				rolesService.insert(role);
				logMsg="新增角色成功";

				resultJson.put("status","1");
				resultJson.put("detail",logMsg);
			}else{
				logMsg="新增角色参数roleName,privilegeIds异常";

				resultJson.put("status","0");
				resultJson.put("detail",logMsg);
			}

			logger.error(logMsg);
		}catch(Exception e){
			logMsg=e.getMessage();
			logger.error(logMsg, e);
			resultJson.put("status","0");
			resultJson.put("detail",logMsg);
		}


		return resultJson.toString();
	}

	@RequestMapping(value="/deleteRole", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteUser(int id) {

		JSONObject resultJson=new JSONObject();
		String logMsg;

		logger.info("删除角色！");

		try{
			if(id!=0){
				rolesService.delete(id);

				logMsg="删除角色成功";
				resultJson.put("status","1");
				resultJson.put("detail",logMsg);
			}else{
				logMsg="删除角色参数id异常";
				resultJson.put("status","0");
				resultJson.put("detail",logMsg);
			}

			logger.error(logMsg);
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}
		return resultJson.toString();
	}

	@RequestMapping(value="/updateRole", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateUser(Roles role) {

		JSONObject resultJson=new JSONObject();
		String logMsg;

		logger.info("更新角色！");

		try{
			if(role.getId()!=0){
				rolesService.update(role);
				logMsg="更新角色成功";
				resultJson.put("status","1");
				resultJson.put("detail",logMsg);
			}else{
				logMsg="更新角色参数id异常";
				resultJson.put("status","0");
				resultJson.put("detail",logMsg);
			}

			logger.error(logMsg);
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}
}
