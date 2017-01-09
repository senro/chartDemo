package rml.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import rml.util.HttpUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/queryApi")
public class QueryApiController2 {

    private static Logger logger = Logger.getLogger(QueryApiController2.class);

	@RequestMapping(value="/queryPrice", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String queryPrice(HttpServletRequest request, HttpSession session) {
		JSONObject resultJson=new JSONObject();
		logger.info("价格查询！");

		try{
			String cpm=request.getParameter("cpm");
			String cpmbm=request.getParameter("cpmbm");
			String scs=request.getParameter("scs");

			String getResult= HttpUtil.sendGet("http://www.szyyjg.com/androidapi/medic_prices.jsp","cpm="+cpm+"&cpmbm="+cpmbm+"&scs="+scs);

			if(!getResult.equals("")){

				resultJson.put("status","1");
				JSONArray data= JSON.parseArray(getResult.replaceAll("\t",""));

				resultJson.put("data", data);
				resultJson.put("detail","查询成功");

			}else{
				logger.info("没有查到记录");

				resultJson.put("status","0");
				resultJson.put("detail","没有查到相关记录");
			}

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}

	@RequestMapping(value="/queryPriceDetail", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String queryPriceDetail(HttpServletRequest request, HttpSession session) {
		JSONObject resultJson=new JSONObject();
		logger.info("详情查询！");

		try{
			String id=request.getParameter("id");

			String getResult= HttpUtil.sendGet("http://www.szyyjg.com/androidapi/medic_detail.jsp","id="+id);

			if(!getResult.equals("")){

				resultJson.put("status","1");
				JSONObject data= (JSONObject) JSON.parse(getResult.replaceAll("\t",""));

				resultJson.put("data", data);
				resultJson.put("detail","查询成功");

			}else{
				logger.info("没有查到详情");

				resultJson.put("status","0");
				resultJson.put("detail","没有查到详情");
			}

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}


	@RequestMapping(value="/queryService", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String queryService(HttpServletRequest request, HttpSession session) {
		JSONObject resultJson=new JSONObject();
		logger.info("服务查询！");

		try{
			String act=request.getParameter("act");
			String Code=request.getParameter("Code");
			String mtids=request.getParameter("mtids");
			String ServiceName=request.getParameter("ServiceName");
			String PYALL=request.getParameter("PYALL");

			String getResult= HttpUtil.sendGet("http://www.szyyjg.com/androidapi/jqm/ServiceTypeQuery.jsp","act="+act+"&Code="+Code+"&mtids="+mtids+"&ServiceName="+ServiceName+"&PYALL="+PYALL);

			if(!getResult.equals("")){

				resultJson.put("status","1");
				JSONArray data= JSON.parseArray(getResult.replaceAll("\t",""));

				resultJson.put("data", data);
				resultJson.put("detail","查询服务成功");

			}else{
				logger.info("没有查到服务记录");

				resultJson.put("status","0");
				resultJson.put("detail","没有查到相关服务");
			}

		}catch(Exception e){
			logger.error(e.getMessage(), e);
			resultJson.put("status","0");
			resultJson.put("detail",e.getMessage());
		}

		return resultJson.toString();
	}
}
