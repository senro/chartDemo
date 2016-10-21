package rml.dao;

import rml.model.Privileges;

import java.util.List;

public interface PrivilegesMapper {
    int deleteByPrimaryKey(int id);

    int insert(Privileges privilege);

    int insertSelective(Privileges privilege);

    Privileges selectByPrimaryKey(int id);

    int updateByPrimaryKeySelective(Privileges privilege);

    int updateByPrimaryKey(Privileges privilege);
    
    List<Privileges> getAll();
}