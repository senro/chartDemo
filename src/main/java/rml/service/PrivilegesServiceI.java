package rml.service;

import rml.model.Privileges;

import java.util.List;

public interface PrivilegesServiceI {
    List<Privileges> getAll();

    Privileges selectByPrimaryKey(int id);

    int insert(Privileges privilege);

    int update(Privileges privilege);

    int delete(int id);

}
