package rml.controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rml.model.Bo.FileInfo;
import rml.model.Files;
import rml.model.Users;
import rml.service.FilesServiceI;
import rml.service.UsersServiceI;
import rml.util.ConfigFileUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/service/web")
public class WebController {

	@Autowired
	private UsersServiceI usersService;

	@Autowired
	private FilesServiceI filesService;

    private static Logger logger = Logger.getLogger(WebController.class);

	@RequestMapping(value="/login", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String login(HttpServletRequest request, HttpSession session) {
		JSONObject resultJson=new JSONObject();
		logger.info("用户登录！");

		try{
			String email=request.getParameter("email");
			String password=request.getParameter("password");

			if(email!=null && password!=null){
				Users user=usersService.selectByEmail(email);

				if(user!=null && user.getEmail()!=null){
					//用户存在
					if(user.getPassword()!=null && user.getPassword().equals(password)){
						logger.info("用户登录成功");
						//写入session
						session.setAttribute("userInfo",user);

						JSONObject dataJson=new JSONObject();

						dataJson.put("email",user.getEmail());
						dataJson.put("name",user.getName());
						dataJson.put("updateAt",user.getCreateAt());

						resultJson.put("status","1");
						resultJson.put("data",dataJson);
						resultJson.put("detail","用户登录成功");
					}else{
						logger.info("用户密码错误");

						resultJson.put("status","0");
						resultJson.put("detail","用户密码错误");
					}
				}else{
					logger.info("用户不存在");

					resultJson.put("status","0");
					resultJson.put("detail","用户不存在");
				}
			}else{
				logger.info("参数不全，请传入email, password参数");

				resultJson.put("status","0");
				resultJson.put("detail","参数不全，请传入email, password参数");
			}

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/checkLogin", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String checkLogin(HttpServletRequest request, HttpSession session) {

		JSONObject resultJson=new JSONObject();

		logger.info("检测是否登录");

		resultJson.put("status","1");
		resultJson.put("detail","用户已登录");

		return resultJson.toString();
	}

	@RequestMapping(value="/toLogin", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String toLogin(HttpServletRequest request, HttpSession session) {

		JSONObject resultJson=new JSONObject();

		logger.info("检测是否登录");

		resultJson.put("status","-99");
		resultJson.put("detail","用户未登录");

		return resultJson.toString();
	}

	@RequestMapping(value="/loginOut", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String loginOut(HttpServletRequest request, HttpSession session) {

		JSONObject resultJson=new JSONObject();

		logger.info("登出");

		try{
			session.removeAttribute("userInfo");

			resultJson.put("status","1");
			resultJson.put("detail","登出成功");

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/register", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String register(HttpServletRequest request, HttpSession session) {

		JSONObject resultJson=new JSONObject();
		Users user=new Users();
		logger.info("用户注册！");

		try{
			String email=request.getParameter("email");
			String password=request.getParameter("password");

			user.setEmail(email);
			user.setPassword(password);

			usersService.insert(user);

			logger.info("新增用户成功");

			resultJson.put("status","1");
			resultJson.put("detail","新增用户成功");
		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail","新增用户失败");
		}

		return resultJson.toString();
	}

	/**
	 * 上传excel
	 *
	 * @param file
	 * @param session
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/uploadFile")
	@ResponseBody
	public String uploadFile(@RequestPart MultipartFile file,
							 HttpSession session,
							 HttpServletRequest request) {

		JSONObject resultJson=new JSONObject();

		Users sessionInfo = (Users) session
				.getAttribute("userInfo");

		int userId = sessionInfo.getId();

		try {
			request.setCharacterEncoding("UTF-8");

			FileInfo fileInfo = usersService.saveFile(userId, file);

			Files newFile=new Files();

			newFile.setFileKey(UUID.randomUUID().toString());
			newFile.setFileUrl(fileInfo.getFileUrl());
			newFile.setFilePath(fileInfo.getFilePath());

			filesService.insert(newFile);

			if(StringUtils.isNotEmpty(fileInfo.getFileUrl())){
				resultJson.put("status","1");
				resultJson.put("data",newFile.getFileKey());
				resultJson.put("detail","上传文件成功");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e);
		}

		return resultJson.toString();
	}

	@RequestMapping(method= RequestMethod.GET,value = "/download")
	@ResponseBody
	public String download(HttpServletRequest request,
						 HttpServletResponse response,
						 String userId,
						 String fileName)
			throws ServletException, IOException {

		JSONObject resultJson=new JSONObject();
		try {
			String uploadFilePath= ConfigFileUtil.getUploadFilePath();//文件路径
			//得到要下载的文件名

			fileName = new String(fileName.getBytes("iso8859-1"), "UTF-8");

			userId = new String(userId.getBytes("iso8859-1"), "UTF-8");

			//通过文件名找出文件的所在目录
			String path = uploadFilePath+"\\"+userId+"\\"+fileName;
			//得到要下载的文件
			File file = new File(path);
			//如果文件不存在
			if (!file.exists()) {
				resultJson.put("status","0");
				resultJson.put("detail","上传下载失败，资源不存在");
			}else{
				//设置响应头，控制浏览器下载该文件
				response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
				//读取要下载的文件，保存到文件输入流
				FileInputStream in = new FileInputStream(path);
				//创建输出流
				OutputStream out = response.getOutputStream();
				//创建缓冲区
				byte buffer[] = new byte[1024];
				int len = 0;
				//循环将输入流中的内容读取到缓冲区当中
				while ((len = in.read(buffer)) > 0) {
					//输出缓冲区的内容到浏览器，实现文件下载
					out.write(buffer, 0, len);
				}
				//关闭文件输入流
				in.close();
				//关闭输出流
				out.close();
				resultJson.put("status","1");
				resultJson.put("detail","上传下载成功");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e);
		}
		return resultJson.toString();
	}


}
