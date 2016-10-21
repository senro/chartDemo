package rml.dao;

import rml.model.Files;
import rml.model.Page;

import java.util.List;

public interface FilesMapper {
    int deleteByPrimaryKey(int id);

    int insert(Files file);

    int insertSelective(Files file);

    Files selectByPrimaryKey(int id);

    Files selectByFileKey(String fileKey);

    Files selectByEmail(String email);

    int updateByPrimaryKeySelective(Files file);

    int updateByPrimaryKey(Files file);
    
    List<Files> getAll(Page page);

    int countAll(Page page);
}