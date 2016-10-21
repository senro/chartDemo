package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.FilesMapper;
import rml.model.Files;
import rml.model.Page;
import rml.model.PageResult;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service("filesService")
public class FilesServiceImpl implements FilesServiceI{

	@Autowired
	private FilesMapper filesMapper;

	@Override
	public int insert(Files file) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		file.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		file.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return filesMapper.insert(file);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(filesMapper.getAll(page));
		result.setTotalElements(filesMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public Files getFilesById(int id) {
		return filesMapper.selectByPrimaryKey(id);
	}

	@Override
	public Files getFilesByFileKey(String fileKey) {
		return filesMapper.selectByFileKey(fileKey);
	}
	
	@Override
	public int update(Files file) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		file.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		file.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return filesMapper.updateByPrimaryKeySelective(file);
	}

	@Override
	public int delete(int id) {

		return filesMapper.deleteByPrimaryKey(id);
	}

	@Override
	public Files selectByPrimaryKey(int id) {

		return filesMapper.selectByPrimaryKey(id);
	}

}
