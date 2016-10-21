package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.RolesMapper;
import rml.model.Roles;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("rolesService")
public class RolesServiceImpl implements RolesServiceI{

	@Autowired
	private RolesMapper rolesMapper;
	
	@Override
	public int insert(Roles roles) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		roles.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		roles.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return rolesMapper.insert(roles);
	}

	@Override
	public List<Roles> getAll() {

		return rolesMapper.getAll();
	}
	
	@Override
	public int update(Roles roles) {

		return rolesMapper.updateByPrimaryKeySelective(roles);
	}

	@Override
	public int delete(int id) {

		return rolesMapper.deleteByPrimaryKey(id);
	}

	@Override
	public Roles selectByPrimaryKey(int id) {

		return rolesMapper.selectByPrimaryKey(id);
	}

}
