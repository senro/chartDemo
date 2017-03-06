package rml.dao;

import rml.model.Page;
import rml.model.CacheIndex;

import java.util.List;

public interface CacheIndexMapper {
    int deleteByPrimaryKey(int id);

    int insert(CacheIndex cacheIndex);

    
    int insertSelective(CacheIndex cacheIndex);

    int updateByPrimaryKeySelective(CacheIndex cacheIndex);

    int updateByPrimaryKey(CacheIndex cacheIndex);

    CacheIndex selectByPrimaryKey(int id);

    List<CacheIndex> getAll(Page page);

    int countAll(Page page);
}