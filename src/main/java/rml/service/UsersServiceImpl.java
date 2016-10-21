package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rml.dao.UsersMapper;
import rml.model.Bo.FileInfo;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.Users;
import rml.model.Bo.FileInfo;
import rml.util.LocalFileUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service("userService")
public class UsersServiceImpl implements UsersServiceI{

	@Autowired
	private UsersMapper usersMapper;

	LocalFileUtils fileUtils=new LocalFileUtils();

	@Override
	public int insert(Users user) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		user.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		user.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return usersMapper.insert(user);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(usersMapper.getAll(page));
		result.setTotalElements(usersMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public Users getUserById(int id) {
		return usersMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public int update(Users user) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		user.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		user.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return usersMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public int delete(int id) {

		return usersMapper.deleteByPrimaryKey(id);
	}

	@Override
	public Users selectByPrimaryKey(int id) {

		return usersMapper.selectByPrimaryKey(id);
	}

	@Override
	public Users selectByEmail(String email) {

		return usersMapper.selectByEmail(email);
	}

	@Override
	public FileInfo saveFile(int userId, MultipartFile file) {
		return fileUtils.saveMultipartFile(userId, file);
	}

}
