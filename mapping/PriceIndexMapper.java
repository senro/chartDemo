package rml.dao;

import rml.model.PriceIndex;
import rml.model.Page;

import java.util.List;

public interface PriceIndexMapper {
    int deleteByPrimaryKey(int id);

    int insert(PriceIndex priceIndex);

    int insertSelective(PriceIndex priceIndex);

    PriceIndex selectByPrimaryKey(int id);

    int updateByPrimaryKeySelective(PriceIndex priceIndex);

    int updateByPrimaryKey(PriceIndex priceIndex);
    
    List<PriceIndex> getAll(Page page);

    int countAll(Page page);
}