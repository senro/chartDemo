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
import rml.model.Users;
import rml.service.UsersServiceI;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/service/users")
public class UsersController {

	private UsersServiceI usersService;

    private static Logger logger = Logger.getLogger(UsersController.class);

	public UsersServiceI getUsersService() {
		return usersService;
	}

	@Autowired
	public void setUsersService(UsersServiceI usersService) {
		this.usersService = usersService;
	}

	@RequestMapping(value="/listUser", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String listUser(HttpServletRequest request,Page page) {

		JSONObject resultJson=new JSONObject();

		logger.info("用户列表！");

		try{
			PageResult pageResult = usersService.getAll(page);
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

	@RequestMapping(value="/getUserById", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String getUserById(HttpServletRequest request,int id) {

		JSONObject resultJson=new JSONObject();

		logger.info("用户列表！");

		try{
			Users user = usersService.getUserById(id);
			resultJson.put("status","1");
			resultJson.put("data",user);
			resultJson.put("detail","获取用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/addUser", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addUser(HttpServletRequest request,Users user) {

		JSONObject resultJson=new JSONObject();

		logger.info("新增用户！");

		try{

			usersService.insert(user);
			resultJson.put("status","1");
			resultJson.put("detail","新增用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/deleteUser", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String deleteUser(int id) {

		logger.info("删除用户！");

		JSONObject resultJson=new JSONObject();

		try{
			usersService.delete(id);
			resultJson.put("status","1");
			resultJson.put("detail","删除用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/updateUser", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String updateUser(HttpServletRequest request,Users user) {

		logger.info("更新用户！");

		JSONObject resultJson=new JSONObject();

		try{

			usersService.update(user);
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
