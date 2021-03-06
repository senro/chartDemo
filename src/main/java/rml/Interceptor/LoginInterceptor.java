package rml.Interceptor;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import rml.dao.DrugRecordMapper;
import rml.model.PriceIndex;
import rml.model.Users;
import rml.model.Page;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



/**
 * @author senro
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = Logger.getLogger(LoginInterceptor.class);

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


        if(user ==null)
        {
            logger.error("您尚未登录！");
            //重定向
            response.sendRedirect(request.getContextPath()+"/service/web/toLogin.do");

            return false;
        }

        return true;
    }


    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        System.out.print(response);
    }


    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
