package rml.Interceptor;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import rml.dao.DrugRecordMapper;
import rml.dao.PriceIndexMapper;
import rml.model.Bo.DrugRecordSearchCondition;
import rml.model.Page;
import rml.model.PriceIndex;
import rml.model.Users;
import rml.util.DateUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * @author senro
 */
public class ApiInterceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = Logger.getLogger(ApiInterceptor.class);

    @Autowired
    private DrugRecordMapper drugRecordMapper;
    @Autowired
    private PriceIndexMapper priceIndexMapper;


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        //创建session
        HttpSession session =request.getSession();

        //获取请求地址
        String url =request.getRequestURL().toString();

        //获得session中的用户
        Users user =(Users) session.getAttribute("userInfo");

        Page page=new Page();
        DrugRecordSearchCondition drugRecordSearchCondition=new DrugRecordSearchCondition();

        int allDrugRecordsCount=drugRecordMapper.countAll(drugRecordSearchCondition);
        List<PriceIndex> allPriceIndexs=priceIndexMapper.getAll(page);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

        if(url.matches("(.*)getDataPriceIndexByMonthAndType(.*)")){
//            String drugType=request.getParameter("drugType");
//
//            if( allPriceIndexs.size()==0 || (allPriceIndexs.size()>0 && DateUtils.compare_date( allPriceIndexs.get(0).getCreateAt(),df.format(new Date()))==1) ){
//                //指数已过期，需要重新计算，通过此请求
//                return true;
//            }else{
//                if(drugType.equals("0")){
//                    //西药
//                    response.sendRedirect(request.getContextPath()+"/service/web/returnResult.do?result="+allPriceIndexs.get(0).getWestMonth());
//                }else{
//                    //中药
//                    response.sendRedirect(request.getContextPath()+"/service/web/returnResult.do?result="+allPriceIndexs.get(0).getEastMonth());
//                }
//                return false;
//            }

        }


        return true;
    }


    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        System.out.print(response);
        //获取请求地址
        String url =request.getRequestURL().toString();

        //获得session中的用户
        //String resultJsonString =(String)request.getAttribute("resultJsonString");

        if(url.matches("(.*)getDataPriceIndexByMonthAndType(.*)")){
            String drugType=request.getParameter("drugType");

            if(drugType.equals("0")){
                //西药

            }else{
                //中药

            }

        }
    }


    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
