package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.DataMapper;
import rml.model.Bo.MonthPriceIndex;
import rml.model.Data;
import rml.model.DrugRecord;
import rml.model.Page;
import rml.model.PageResult;

import java.text.SimpleDateFormat;
import java.util.*;

@Service("dataService")
public class DataServiceImpl implements DataServiceI{

	@Autowired
	private DataMapper dataMapper;

	@Override
	public int insert(Data data) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		data.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		data.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return dataMapper.insert(data);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(dataMapper.getAll(page));
		result.setTotalElements(dataMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public Data getDataById(int id) {
		return dataMapper.selectByPrimaryKey(id);
	}

	@Override
	public int update(Data data) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		data.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		data.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return dataMapper.updateByPrimaryKeySelective(data);
	}

	@Override
	public int delete(int id) {

		return dataMapper.deleteByPrimaryKey(id);
	}

	@Override
	public Data selectByPrimaryKey(int id) {

		return dataMapper.selectByPrimaryKey(id);
	}

}
