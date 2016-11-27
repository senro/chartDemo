package rml.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rml.dao.PriceIndexMapper;
import rml.model.PriceIndex;
import rml.model.Page;
import rml.model.PageResult;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service("priceIndexService")
public class PriceIndexServiceImpl implements PriceIndexServiceI{

	@Autowired
	private PriceIndexMapper priceIndexMapper;

	@Override
	public int insert(PriceIndex priceIndex) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		priceIndex.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		priceIndex.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return priceIndexMapper.insert(priceIndex);
	}

	@Override
	public PageResult getAll(Page page) {
		PageResult result = new PageResult();

		result.setItems(priceIndexMapper.getAll( page ));
		result.setTotalElements(priceIndexMapper.countAll( page ));
		result.setSize(page.getSize());
		result.setCurrentPage(page.getPage());
		return result;
	}

	@Override
	public PriceIndex getPriceIndexById(int id) {
		return priceIndexMapper.selectByPrimaryKey(id);
	}

	@Override
	public int update(PriceIndex priceIndex) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

		priceIndex.setCreateAt(df.format(new Date()));// new Date()为获取当前系统时间
		priceIndex.setUpdateAt(df.format(new Date()));// new Date()为获取当前系统时间
		return priceIndexMapper.updateByPrimaryKeySelective(priceIndex);
	}

	@Override
	public int delete(int id) {

		return priceIndexMapper.deleteByPrimaryKey(id);
	}

	@Override
	public PriceIndex selectByPrimaryKey(int id) {

		return priceIndexMapper.selectByPrimaryKey(id);
	}

}
