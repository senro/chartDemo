package rml.dao;

import rml.model.PriceIndex;

public interface PriceIndexMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PriceIndex record);

    int insertSelective(PriceIndex record);

    PriceIndex selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PriceIndex record);

    int updateByPrimaryKey(PriceIndex record);
}