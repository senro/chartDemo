package rml.service;

import rml.model.Roles;

import java.util.List;

public interface RolesServiceI {
    List<Roles> getAll();

    Roles selectByPrimaryKey(int id);

    int insert(Roles user);

    int update(Roles user);

    int delete(int id);

}
