package rml.util;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import rml.model.Bo.FileInfo;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;

public class LocalFileUtils {

    private static final Logger logger = Logger.getLogger(LocalFileUtils.class);

    public static final String DATA_FORMAT = "yyyyMMddHHmmssSSS";

//    @Autowired
//    private ServletContext servletContext;

    private String uploadPath;

    private String uploadFilePath=ConfigFileUtil.getUploadFilePath();//文件路径

    public FileInfo saveMultipartFile(int userId, MultipartFile file) {
        final String upload = uploadFilePath + userId + "/";
        FileInfo resultFileInfo=new FileInfo();

        try {
            final String imageName = file.getOriginalFilename();
            String suffix = imageName.substring(imageName.lastIndexOf("."));
            String fileName=imageName.split("\\.")[0];
            final String time = DateUtil.getCurrentDateString(DATA_FORMAT) + suffix;
            String newFileName=fileName+"_"+time;

            final String imagePath = upload + newFileName;
            File image = new File(imagePath);
            File parentDir = new File(upload);
            if (!parentDir.exists()) org.apache.commons.io.FileUtils.forceMkdir(parentDir);
            file.transferTo(image);
            String manageUploadUrl = ConfigFileUtil.getWebRootUrl();
            if (!manageUploadUrl.endsWith(File.separator)) {
                manageUploadUrl += File.separator;
            }
            resultFileInfo.setFileUrl((manageUploadUrl + "service/web/download.do?userId=" + userId + "&fileName=" + newFileName).replaceAll("\\\\", "/"));
            resultFileInfo.setFilePath(imagePath);

        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        return resultFileInfo;


    }

    public FileInfo saveMultipartFileUseOriginName(int userId, MultipartFile file) {
        final String upload = uploadFilePath + userId + "/";
        FileInfo resultFileInfo=new FileInfo();

        try {
            final String imageName = file.getOriginalFilename();
            String suffix = imageName.substring(imageName.lastIndexOf("."));
            final String newImageName = imageName;//用原文件名称
            final String imagePath = upload + newImageName;
            File image = new File(imagePath);
            File parentDir = new File(upload);
            if (!parentDir.exists()) org.apache.commons.io.FileUtils.forceMkdir(parentDir);
            file.transferTo(image);
            String manageUploadUrl = ConfigFileUtil.getWebRootUrl();
            if (!manageUploadUrl.endsWith(File.separator)) {
                manageUploadUrl += File.separator;
            }
            resultFileInfo.setFileUrl((manageUploadUrl + "service/web/download.do?userId=" + userId + "&fileName=" + newImageName).replaceAll("\\\\", "/"));
            resultFileInfo.setFilePath(imagePath);

        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        return resultFileInfo;


    }

    public String getUploadPath() {
        return uploadPath;
    }

    public void setUploadPath(String uploadPath) {
        this.uploadPath = uploadPath;
    }

    public String getUploadFilePath() {
        return uploadFilePath;
    }

    public void setUploadFilePath(String uploadFilePath) {
        this.uploadFilePath = uploadFilePath;
    }

}
