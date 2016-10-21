package rml.service;

import org.springframework.web.multipart.MultipartFile;
import rml.model.Bo.FileInfo;
import rml.model.Page;
import rml.model.PageResult;
import rml.model.Users;

import java.util.List;

public interface UsersServiceI {
    PageResult getAll(Page page);

    Users getUserById(int id);

    Users selectByPrimaryKey(int id);

    Users selectByEmail(String email);

    int insert(Users user);

    int update(Users user);

    int delete(int id);

    FileInfo saveFile(int userId, MultipartFile file);
}
