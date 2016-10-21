/**
 * FileUtil.java
 * 
 * Copyright(C)2008 Founder Corporation.
 * written by Founder Corp.
 */
package rml.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * [类名]<br>
 * FileUtil<br>
 * [功能概要]<br>
 * <br>
 * <br>
 * [変更履歴]<br>
 * 2014-4-18 ver1.00 新建 dong.li<br>
 * 
 * @version 1.00
 */
public class FileUtil {

    /**
     * 日志打印对象
     */
    private static final Log logger = LogFactory.getLog(FileUtil.class);

    // 删除整个目录，包括子目录 方法
    public static void deleteFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            if (file.isDirectory()) {
                File[] filelist = file.listFiles();
                for (File subfile : filelist) {
                    deleteFile(subfile.getAbsolutePath());
                }
            }
            file.delete();
        }
    }

    /**
     * 自己写文件，一解决在linux中renameTo不能工作的问题
     * 
     * @param f
     * @param newFile
     * @throws IOException
     */
    public static void writeTo(File f, File newFile) throws IOException {
        FileInputStream fis = new FileInputStream(f);
        FileOutputStream fos = new FileOutputStream(newFile);
        try {
            byte[] buf = new byte[8192];
            do {
                int rc = fis.read(buf);
                if (rc == -1)
                    break;
                fos.write(buf, 0, rc);
            } while (true);
        } finally {
            fis.close();
            fos.close();
        }
    }

    // 复制文件
    public static boolean copyFile(File src, File dst) throws IOException {
        // if the parameters are same,then don't excute anything.or it make original file null.
        if (!src.getAbsolutePath().equalsIgnoreCase(dst.getAbsolutePath())) {
            InputStream in = new FileInputStream(src);
            OutputStream out = new FileOutputStream(dst);
            // Transfer bytes from in to out
            byte[] buf = new byte[1024 * 5];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            // out.flush();
             in.close();
            out.close();
        }
        return true;
    }

    // 上传文件
    public static boolean upFile(InputStream in, String TargetPath) throws FileNotFoundException, IOException {
        // if the parameters are same,then don't excute anything.or it make original file null.
        File targetfile = new File(TargetPath);

        if (!targetfile.exists())
            makeFile(TargetPath);
        OutputStream out = new FileOutputStream(TargetPath);
        try {
            //System.out.println("=upFile begin transfer file=");
            // Transfer bytes from in to out
            byte[] buf = new byte[1024 * 5];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
        } catch (FileNotFoundException e) {
            // TODO 自动生成 catch 块
            e.printStackTrace();
            throw e;
        } catch (IOException e) {
            // TODO 自动生成 catch 块
            e.printStackTrace();
            throw e;
        } finally {
            in.close();
            out.close();
        }

        return true;
    }

    // 删除文件
    public static boolean delFileByName(String file) throws Exception {
        File f = new File(file);

        // File fB = new File(file1);
        if (f.exists()) {
            logger.info("begin delete the file==>" + file + "  from the file system!");
            f.delete();
        } else {
            logger.info(file + "not in the file system!");
        }
        
        return true;
    }

    /**
     * 创建目录 不存在时创建。已存在目录时，直接返回。
     * 
     * @param folderPath
     *            :目录路径
     * @return
     * @throws IOException
     */
    public static boolean createFolder(String folderPath) throws IOException {
        boolean result = false;
        File f = new File(folderPath);
        if (!f.isDirectory())
            result = f.mkdirs();
        return result;
    }

    /**
     * 删除目录下所有文件
     * 
     * @param directory
     *            (File 对象)
     */
    public static boolean emptyDirectory(File directory) {
        File[] entries = directory.listFiles();
        for (int i = 0; i < entries.length; i++) {
            entries[i].delete();
        }
        return true;
    }

    /**
     * 创建文件
     * 
     * @param filepath
     *            :文件所在目录路径,比如:c:/test/test.txt test目录必须存在。
     * @return
     */
    public static boolean makeFile(String filepath) throws IOException {
        boolean result = false;
        File file = new File(filepath);

        result = file.createNewFile();

        file = null;
        return result;
    }

    /**
     * 删除文件
     * 
     * @param filepath
     *            :文件所在物理路径
     * @return
     */
    public static boolean isDel(String filepath) {
        boolean result = false;
        File file = new File(filepath);
        result = file.delete();
        file = null;
        return result;
    }

    /**
     * 文件重命名
     * 
     * @param filepath
     *            :文件所在物理路径
     * @param destname
     *            :新文件名
     * @return
     */
    public static boolean renamefile(String filepath, String destname) {
        boolean result = false;
        File f = new File(filepath);
        String fileParent = f.getParent();
        String filename = f.getName();
        File rf = new File(fileParent + File.separator + destname);
        if (f.renameTo(rf)) {
            result = true;
        }
        f = null;
        rf = null;
        return result;
    }

    /**
     * 将文件内容写入文件中
     * 
     * @param filepath
     *            :文件所在物理路径
     * @param content
     *            :写入内容
     * @throws Exception
     */
    public static boolean WriteFile(String filepath, String content) throws Exception {
        FileWriter filewriter = new FileWriter(filepath, true); // 写入多行 第2个参数=true append的方式写入
        PrintWriter printwriter = new PrintWriter(filewriter);
        printwriter.println(content);
        printwriter.flush();
        printwriter.close();
        filewriter.close();
        return true;
    }

    /**
     * 日志备份
     * 
     * @param filePath
     *            :日志备份路径
     * @param baksize
     *            :日志备份大小参考值(字节大小)
     * @throws IOException
     */
    public static boolean logBak(String filePath, long baksize) throws IOException {
        File f = new File(filePath);
        long len = f.length();
        SimpleDateFormat simpledateformat = new SimpleDateFormat("yyyyMMddHHmmss");
        String s = simpledateformat.format(new Date());
        String fileName = f.getName();
        int dot = fileName.indexOf(".");
        String bakName = s + fileName.substring(dot);
        //System.out.println(bakName);
        if (len >= baksize) {
            renamefile(filePath, bakName);
            makeFile(filePath);
        }
        f = null;
        return true;
    }
    
    /**
     * 创建临时文件
     * @param multipart
     * @return
     * @throws IllegalStateException
     * @throws IOException
     */
    public static File multipartToFile(MultipartFile multipart) throws IllegalStateException, IOException {
    	Random random = new Random();
    	int randomNum = random.nextInt(99999999);
    	String prefix = String.valueOf(randomNum);
    	String suffix = multipart.getOriginalFilename().substring(multipart.getOriginalFilename().lastIndexOf("."));
        File tmpFile = File.createTempFile(prefix, suffix);
        multipart.transferTo(tmpFile);
        return tmpFile;
    }
    
    /** 
     * 将字符串写入指定文件
     * 
     * @param res      原字符串 
     * @param filePath 文件路径 
     * @return 成功标记 
     */ 
    public static File string2File(String res) {
            BufferedReader bufferedReader = null;
            BufferedWriter bufferedWriter = null;
            File tmpFile = null;
            try { 
	            	Random random = new Random();
	            	int randomNum = random.nextInt(99999999);
	            	String prefix = String.valueOf(randomNum);
	            	String suffix = ".html";
	                tmpFile = File.createTempFile(prefix, suffix);
                    bufferedReader = new BufferedReader(new StringReader(res));
                    bufferedWriter = new BufferedWriter(new FileWriter(tmpFile));
                    char buf[] = new char[1024];         //字符缓冲区 
                    int len; 
                    while ((len = bufferedReader.read(buf)) != -1) { 
                            bufferedWriter.write(buf, 0, len); 
                    } 
                    bufferedWriter.flush(); 
                    bufferedReader.close(); 
                    bufferedWriter.close(); 
            } catch (IOException e) {
                    e.printStackTrace(); 
                    return tmpFile; 
            } finally { 
                    if (bufferedReader != null) { 
                            try { 
                                    bufferedReader.close(); 
                            } catch (IOException e) {
                                    e.printStackTrace(); 
                            } 
                    } 
            } 
            return tmpFile; 
    }
}
