package rml.util;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.ConfigurationFactory;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.Properties;

public class ConfigFileUtil {
	
	protected final static Logger logger = Logger.getLogger(ConfigFileUtil.class);

	private static Configuration config = null;
	
	private static long lastModifyTime = 0l;
	
	private static String configFilePath ="config.properties";


	public static Configuration getConfig(){
		try{
			if (config == null) {
				lastModifyTime = new File(configFilePath).lastModified();
				loadConfig(configFilePath);
			}else{
				if(getReload()){
					long nowLastModifyTime=new File(configFilePath).lastModified();
					if(nowLastModifyTime!=lastModifyTime){
						logger.info("检测到配置文件有变动,重新加载配置文件");
						loadConfig(configFilePath);
						lastModifyTime=nowLastModifyTime;
					}
				}
			}
		}catch (ConfigurationException e){
			logger.error(e.getMessage());
		}

		return config;

	}
	
	private static void loadConfig(String configFilePath) throws ConfigurationException{
		System.setProperty("config.file", configFilePath);
		ConfigurationFactory factory = new ConfigurationFactory("config.xml");
		config = factory.getConfiguration();
	}
	
	public static Boolean getReload(){
		if(config==null){
			return true;
		}else{
			return config.getBoolean("config.reload",true);
		}
	}

	public static void setConfig(String message){
		getConfig();
		Properties pro = new Properties();
		try {
			pro.load(new StringReader(message));
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		for(Object t:pro.keySet()){
			config.clearProperty(t.toString());
			config.addProperty(t.toString(), pro.getProperty(t.toString()));
		}  
	}

	public static String getUploadFilePath(){
		getConfig();
		return config.getString("upload.file.file.path");
	}

	public static String getWebRootUrl(){
		getConfig();
		return config.getString("web.root.url");
	}
}
