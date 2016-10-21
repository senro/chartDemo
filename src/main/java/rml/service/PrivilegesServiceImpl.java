package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.PrivilegesMapper;
import rml.model.Privileges;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("privilegesService")
public class PrivilegesServiceImpl implements PrivilegesServiceI{

	@Autowired
	private PrivilegesMapper privilegesMapper;
	
	@Override
	public int insert(Privileges privileges) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		privileges.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		privileges.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return privilegesMapper.insert(privileges);
	}

	@Override
	public List<Privileges> getAll() {

		return privilegesMapper.getAll();
	}
	
	@Override
	public int update(Privileges privileges) {

		return privilegesMapper.updateByPrimaryKey(privileges);
	}

	@Override
	public int delete(int id) {

		return privilegesMapper.deleteByPrimaryKey(id);
	}

	@Override
	public Privileges selectByPrimaryKey(int id) {

		return privilegesMapper.selectByPrimaryKey(id);
	}

}
