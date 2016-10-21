package rml.util;

import org.springframework.web.multipart.MultipartFile;

/**
 * 用于操作上传文件
 */
public interface FileUtils {

    public String saveMultipartFile(int userId, MultipartFile file);
    public String saveMultipartFileUseOriginName(int userId, MultipartFile file);
}
