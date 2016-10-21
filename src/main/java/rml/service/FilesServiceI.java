package rml.service;

import rml.model.Files;
import rml.model.Page;
import rml.model.PageResult;

public interface FilesServiceI {
    PageResult getAll(Page page);

    Files getFilesById(int id);

    Files getFilesByFileKey(String fileKey);

    Files selectByPrimaryKey(int id);

    int insert(Files file);

    int update(Files file);

    int delete(int id);

}
