package rml.service;

import org.springframework.web.multipart.MultipartFile;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.CacheIndex;

import java.util.List;

public interface CacheIndexServiceI {
    PageResult getAll(Page page);

    CacheIndex selectByPrimaryKey(int id);

    

    int insert(CacheIndex cacheIndex);

    int update(CacheIndex cacheIndex);

    int delete(int id);

}
