package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rml.dao.CacheIndexMapper;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.CacheIndex;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service("cacheIndexService")
public class CacheIndexServiceImpl implements CacheIndexServiceI{

	@Autowired
	private CacheIndexMapper cacheIndexMapper;


	@Override
	public int insert(CacheIndex cacheIndex) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
          
        
          
              cacheIndex.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
          
          
        
          
          
              cacheIndex.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
          
        

		return cacheIndexMapper.insert(cacheIndex);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();
		result.setItems(cacheIndexMapper.getAll(page));
		result.setTotalElements(cacheIndexMapper.countAll(page));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	
	@Override
	public int update(CacheIndex cacheIndex) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
        
          
              cacheIndex.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
          
        
		return cacheIndexMapper.updateByPrimaryKeySelective(cacheIndex);
	}

	@Override
	public int delete(int id) {

		return cacheIndexMapper.deleteByPrimaryKey(id);
	}

	@Override
	public CacheIndex selectByPrimaryKey(int id) {

		return cacheIndexMapper.selectByPrimaryKey(id);
	}

	

}
