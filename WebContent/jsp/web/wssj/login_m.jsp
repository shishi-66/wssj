<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/mobile/css/login.css">
<script type="text/javascript">
var href = window.location.href;
var topHref = window.top.location.href;
if(href != topHref){
	 window.top.location.href = href;
}
$(function() {
	getCookies();
});
function setCookies(username, password){
    var Then = new Date();
    Then.setTime(Then.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = "webusername=" + encodeBase64(encodeBase64(escape(username))) + "&webpassword=" + encodeBase64(encodeBase64(escape(password))) + "&;expires=" + Then.toGMTString();
}
function getCookies() {
    //var cookieString = new   String(document.cookie);
	var cookieString = document.cookie + ";";
	var searchName = "webusername=";
	var startOfCookie = cookieString.indexOf(searchName);
	var endOfCookie;
	if (startOfCookie != -1){
       startOfCookie += searchName.length;
       endOfCookie = cookieString.indexOf(";",startOfCookie);
       result = unescape(cookieString.substring(startOfCookie, endOfCookie));
	}
    if (cookieString.indexOf("&") > 0) {
		var cooke = result.split("&");
		var us=decodeBase64(decodeBase64(cooke[0]));
		var pw=decodeBase64(decodeBase64(cooke[1].substring(cooke[1].indexOf("webpassword=") + 9, cooke[1].length)));
        document.getElementById("userName").value = us;
        document.getElementById("password").value = pw;
		if (us != "") {document.getElementById('cookiesbox').checked=true;}
		if (pw != "") {document.getElementById('cookiesbox1').checked=true;}
    }
}
function encodeBase64(str){
   var base64Arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   var l = str.length;
   var rt = "";
   function process(s,size){
       if(!size) return "";
       var i = 0;
       var rt = "";
       while(i<size){
           var oneHalf = Number(s.charCodeAt(i)).toString(16) + Number(s.charCodeAt(++i)).toString(16) + Number(s.charCodeAt(++i)).toString(16);
           var hd2 = parseInt(oneHalf.substring(0,3),16),bot2 = parseInt(oneHalf.slice(-3),16);
           rt += base64Arr.charAt(Math.floor(hd2/64)) + base64Arr.charAt(hd2%64) + base64Arr.charAt(Math.floor(bot2/64)) + base64Arr.charAt(bot2%64); 
           i += 1;
       }
       return rt;
   }
   if(l % 3 == 0){
      return process(str,l);
   }
   if(l % 3 == 2){
      rt = process(str.slice(0,-2),l-2);
      var bt2 = Number(str.charCodeAt(l-2)).toString(16) + Number(str.charCodeAt(l-1)).toString(16);
      rt += base64Arr.charAt(Math.floor(parseInt(bt2.substring(0,3),16)/64)) + base64Arr.charAt(parseInt(bt2.substring(0,3),16)%64) + base64Arr.charAt(parseInt(bt2.slice(-1),16)*4) + "=";
   }
   if(l % 3 == 1){
      rt = process(str.slice(0,-1),l-1);
      var bt2 = Number(str.charCodeAt(l-1)).toString(2);
      while(bt2.length<8) bt2 = "0"+bt2;
      rt +=  base64Arr.charAt(parseInt(bt2.substring(0,6),2)) + base64Arr.charAt(parseInt(bt2.slice(-2),2)*16) + "=="
   }
   return rt;
}
function decodeBase64(str){
	var base64Arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   var global = {};
   var rt = "";
   str.replace(/=/g,"").replace(/./g,function(a){
      var i = base64Arr.indexOf(a);
      if(global[i] === undefined){
           var hex = Number(i).toString(2);
           while(hex.length<6){
              hex = "0" + hex;
           }
           global[i] = hex;
      }
      return global[i];
   }).replace(/.{8}/g,function(b){
       rt += String.fromCharCode(parseInt(b,2));
       return "";
   });
   return rt;   
}
function del(name){        
    var date=new Date();
    date.setTime(date.getTime()-3*24*60*60*1000);
    var v="";
    document.cookie=name+"="+v+"; expire="+date.toGMTString();
}
function subUser33(){
	$("#errorMessage").html(""); 
	try{
    var username=$("#userName").val(); 
    var password=$("#password").val();
    if(username==""){
   		$("#errorMessage").html("请输入用户名!"); 
     	return false; 
    }else if(password==""){
   	 	$("#errorMessage").html("请输入密码!"); 
     	return false; 
    }else{ 
    	if (document.getElementById('cookiesbox').checked) {		 
    		if (document.getElementById('cookiesbox1').checked) {
    			setCookies(username, password);
    		}else {
    			setCookies(username,'');
    		}
        }else {
    		del("webuserName");
    	}
   		$("#loginsubmit").submit();
       	return false; 
    } 
	}catch(e){
		alert(e.message);
	}
    return false; 
}  
function subUser(){
	$("#loginsubmit").submit();
}
 function cookiesboxc(){
	 if (document.getElementById('cookiesbox1').checked) {	
          document.getElementById('cookiesbox').checked=true;
	 }
 }
 function cookiesboxd(){
	 if (document.getElementById('cookiesbox').checked==false) {	
          document.getElementById('cookiesbox1').checked=false;
	 }
 }
 
 $(document).keydown(function(e){
	 if(e.keyCode == 13) {
		 subUser();
	 }
	 });
</script>
</head>
<body>
<div class="login-box">
	<div class="logo">
	    <span class="logo-icon" ></span>
	   	<span class="logo-txt">
	    	<span class="logo-txt-01">单位名称</span>
	    	<span class="logo-txt-02">网上委托</span>
	   	</span>
	</div>	
	<form action="<%=request.getContextPath()%>/jsp/web/wssj/index.jsp" id="loginsubmit" method="post">
		<div class="login-tip">
			<div id="errorMessage" class='alert-error'>此处是密码错误的提示</div>
		</div>	
		<div class="mui-input-group">
			<div class="mui-input-row">
				<label>账号</label>
				<input id='userName' name="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号" />
			</div>
			<div class="mui-input-row">
				<label>密码</label>
				<input id='password' name="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
			</div>
		</div>
		<div class="login-remembe">
			<div class="login-remembe-item">
				<div class="mui-checkbox mui-left">
					<label>记住账号</label>
					<input name="cookiesbox"  type="checkbox" id="cookiesbox" onClick="cookiesboxd()">
				</div>
			</div>
			<div class="login-remembe-item">
				<div class="mui-checkbox mui-left">
					<label>记住密码</label>
					<input name="cookiesbox1"  type="checkbox" id="cookiesbox1" onClick="cookiesboxc()">
				</div>
			</div>
		</div>
		<div class="login-bar">
			<button type="button" class="mui-btn mui-btn-block mui-btn-primary" onclick="subUser();">登录</button>
		</div>
	</form>
</div>
<div class="copyright">
	没有账号？<a style="color:#005980" href="<%=request.getContextPath() %>/jsp/web/wssj/addUser.jsp" >点此注册</a>
<br><br>
</div>
<div class="copyright">
	技术支持：长沙金慧睿信息科技有限公司
</div>
</body>
</html>