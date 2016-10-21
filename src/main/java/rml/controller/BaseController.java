package rml.controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;


public class BaseController {

    public String formatJsonToJsonP(String jsonString,
                                    HttpServletRequest request) {
        StringBuilder result = new StringBuilder();
        if (StringUtils.isNotEmpty(request.getParameter("jsoncallback"))) {
            return result.append(request.getParameter("jsoncallback"))
                    .append('(').append(jsonString).append(')').toString();
        } else {
            return jsonString;
        }
    }

   /***************************************************************************************************************************
    * Common JSON object *
    * *************************************************************************************************************************/
   public class CommonJSON implements Serializable {
       /**
        * 
        */
       private static final long serialVersionUID = 6638198187315651901L;
       private String status;
       private String message;
       private Object data;

       public CommonJSON() {
       }

       public CommonJSON(String status, String message) {
           super();
           this.status = status;
           this.message = message;
       }

       public CommonJSON(String status, String message, Object data) {
           super();
           this.status = status;
           this.message = message;
           this.data = data;
       }

       public String getStatus() {
           return status;
       }

       public void setStatus(String status) {
           this.status = status;
       }

       public String getMessage() {
           return message;
       }

       public void setMessage(String message) {
           this.message = message;
       }

       public Object getData() {
           return data;
       }

       public void setData(Object data) {
           this.data = data;
       }

       @Override
       public String toString() {
           JSONObject job= (JSONObject) JSONObject.toJSON(this);
           String result = job.toString();
           //System.out.println(result);
           return result;
       }

   }
}
