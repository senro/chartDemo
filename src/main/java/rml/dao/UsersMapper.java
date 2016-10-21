package rml.dao;

import rml.model.Page;
import rml.model.Users;

import java.util.List;

public interface UsersMapper {
    int deleteByPrimaryKey(int id);

    int insert(Users user);

    int insertSelective(Users user);

    Users selectByPrimaryKey(int id);

    Users selectByEmail(String email);

    int updateByPrimaryKeySelective(Users user);

    int updateByPrimaryKey(Users user);
    
    List<Users> getAll(Page page);

    int countAll(Page page);
}