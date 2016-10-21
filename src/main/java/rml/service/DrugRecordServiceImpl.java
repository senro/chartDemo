package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.DrugRecordMapper;
import rml.model.DrugRecord;
import rml.model.Page;
import rml.model.PageResult;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("drugRecordService")
public class DrugRecordServiceImpl implements DrugRecordServiceI{

	@Autowired
	private DrugRecordMapper drugRecordMapper;

	@Override
	public int insert(DrugRecord drugRecord) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return drugRecordMapper.insert(drugRecord);
	}

	@Override
	public int insertBatch(List<DrugRecord> drugRecords){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		for (DrugRecord drugRecord:
			 drugRecords) {
			drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
			drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		}

		return drugRecordMapper.insertBatch(drugRecords);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(drugRecordMapper.getAll(page));
		result.setTotalElements(drugRecordMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public List<DrugRecord> getAllByUserIdAndMonth(String month, int userId){
		return drugRecordMapper.getAllByUserIdAndMonth(month,userId);
	}

	@Override
	public int deleteAllByUserIdAndMonth(String month, int userId){
		return drugRecordMapper.deleteAllByUserIdAndMonth(month,userId);
	}

	@Override
	public DrugRecord getDrugRecordById(int id) {
		return drugRecordMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public int update(DrugRecord drugRecord) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		drugRecord.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		drugRecord.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return drugRecordMapper.updateByPrimaryKeySelective(drugRecord);
	}

	@Override
	public int delete(int id) {

		return drugRecordMapper.deleteByPrimaryKey(id);
	}

	@Override
	public DrugRecord selectByPrimaryKey(int id) {

		return drugRecordMapper.selectByPrimaryKey(id);
	}

	@Override
	public int countAll(Page page) {
		return drugRecordMapper.countAll(page);
	}

}
