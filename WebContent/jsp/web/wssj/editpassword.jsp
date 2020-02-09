<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>修改密码</title>
<%@ include file="/jsp/mobile/header.jsp"%>
<script type="text/javascript">
function subUser(){
	$("#errorMessage").html(""); 
	try{
	    var oldPassword=$("#eidt_oldPassword").val(); 
	    var newPassword1=$("#input_password").val();
	    var newPassword2=$("#confirm_password").val();
	    if(oldPassword==""){
	   		$("#errorMessage").html("旧密码不能为空！"); 
	     	return false; 
	    }else if(newPassword1==""){
	   	 	$("#errorMessage").html("新密码不能为空！"); 
	     	return false; 
	    }else if(newPassword2==""){
	   	 	$("#errorMessage").html("新密码不能为空！"); 
	     	return false; 
	    }else if(newPassword1!=newPassword2){
	   	 	$("#errorMessage").html("两次密码输入不一致！"); 
	     	return false; 
	    }else{
	    	var param = {
    			oldPassword:oldPassword,	
    			newPassWord:newPassword1,	
    			confirm_password:newPassword2,	
	    	};
	    	var d=getAjaxData("<%=request.getContextPath()%>/webSample/updatePassWord.do",param,false);
	    	if(d.rc=="0"){
	    		$("#errorMessage").html(d.rs);
			}else{
				alert("密码修改成功，请重新登陆！");
				window.location.href = "<%=request.getContextPath()%>/wssjlogout.do";
			}	        
	   	}
    }catch(e){
		alert(e.message);
	}
    return false; 
}  
</script>
</head>
<body>
	<form id="userInfoFormEdit">
		<div class="mui-input-group">
			<div class="mui-input-row">
				<label>旧密码</label> <input id='eidt_oldPassword' name="oldPassword"
					type="password" class="mui-input-clear mui-input">
			</div>
			<div class="mui-input-row">
				<label>新密码</label> <input id='input_password' name="newPassWord"
					type="password" class="mui-input-clear mui-input">
			</div>
			<div class="mui-input-row">
				<label>新密码确认</label> <input id='confirm_password' name="confirm_password"
					type="password" class="mui-input-clear mui-input">
			</div>
		</div>
		<div class="login-bar">
			<a class="mui-btn mui-btn-block mui-btn-primary" onclick="subUser();">提交</a>
		</div>
		<div class="login-tip"><div id="errorMessage" class='alert-error'>${message}</div></div>
	</form>
</body>
</html>