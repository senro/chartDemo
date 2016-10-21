package rml.dao;

import rml.model.Roles;

import java.util.List;

public interface RolesMapper {
    int deleteByPrimaryKey(int id);

    int insert(Roles role);

    int insertSelective(Roles role);

    Roles selectByPrimaryKey(int id);

    int updateByPrimaryKeySelective(Roles role);

    int updateByPrimaryKey(Roles role);
    
    List<Roles> getAll();
}