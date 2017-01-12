/*
对ajax层进行一次封装，便于统一处理请求的成功、失败和登录跳转逻辑
同时也可以统一ajax的用法，不会根据用的什么库修改发送ajax的逻辑，
统一在这里修改就行
*/
import { Message } from 'element-ui';

window.__disableNativeFetch=true;

var fetch = require('fetch-ie8');


var successCode="1",
	failCode="0",
	notLoginCode="-99";


function ajax(url,data,successCallback,completeCallback,method,faillCallback,dataType,processData,headers){
	var dataType=dataType||"json";
	var method=method||"post";
	var processData=processData||true;

	if(processData){
		if(typeof data != "string"){
			data=urlParamsObjTranslator(data);
		}
	}
	var fetchResult=fetch(url+(method=="get"?"?"+data:""), {
	  method: method,
	  headers: headers,
	  body: method=="post"?data:""
	}).then(status)
	  .then(json)
	  .then(function(json) {
	    console.log('request succeeded with json response', json);
	    if(String(json.status) === successCode){
	    	successCallback&&successCallback(json);
	    }else if(String(json.status) === failCode){
	    	if(typeof faillCallback === "function"){
				faillCallback&&faillCallback(json);
			}else{
				Message(json.detail||json.message||json.msg||"请求失败！");
			}
	    }else if(String(json.status) === notLoginCode){
	    	if(window.loginUrl){
	    		window.location.href=window.loginUrl;
	    	}
	    }else{
	    	console.log('未识别的status码：', json.status)
	    }

	    completeCallback&&completeCallback(json);
	    
	  }).catch(function(error) {
	    console.log('request failed', error)
	  })

	function status(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response
	  }
	  throw new Error(response.statusText)
	}

	function json(response) {
		if(dataType=="json"){
		    return response.json()
		}else{
			return response;
		}
	}

	return fetchResult;
}

function urlParamsObjTranslator(data,type){
    var type=type||'objToUrl';
    var result=null;

    if(type=='urlToObj'){
        //a=1&b=2&c=3  =>  {a:1,b:2,c:3}
        if(typeof data == 'string'){
            var dataArray=data.split('&');
            result={};
            for(var i=0;i<dataArray.length;i++){
                var dataStr=dataArray[i],
                    dataKey=dataStr.split('=')[0],
                    dataValue=dataStr.split('=')[1];

                result[dataKey]=dataValue;
            }
        }else{
            console.log('urlToObj方式，data必须为a=x&b=xx格式字符串');
        }
    }else{
        //objToUrl方式 {a:1,b:2,c:3}  => a=1&b=2&c=3
        result=[];
        if(typeof data == 'object') {
            for (var key in data) {
            	if(data[key]){
            		//如果值不存在，则不放在请求参数里，todo 可能需要改
                    //防止发送的参数值有特殊字符导致发送请求的时候丢失，需要encodeURIComponent处理一下
                    var tmpStr=key+'='+encodeURIComponent(data[key]);
                    result.push(tmpStr);
				}
            }
            result=result.join('&');
        }else{
            console.log('objToUrl方式，data必须为对象！');
        }
    }

    return result;
}

export default ajax;