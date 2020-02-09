<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/mobile/css/mui.picker.min.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/mobile/js/mui.picker.min.js"></script>
</head>
<body>
<header class="mui-bar mui-bar-nav">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>			
	<h1 class="mui-title">注册信息修改</h1>
</header> 
<div class="mui-content">
	<div class="j_form">
		<div class="j_tip j_tip--type_02">
			注：带<span class="j_not_null">&#8727;</span>项为必填项
		</div>
		<form id="form1">
		<div class="j_form_items">			
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>姓名：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.userName}" name="userName" id="userName" placeholder="请输入姓名，必填" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>手机号：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.userPhone}" name="userPhone" id="userPhone" placeholder="请输入您的手机号码，必填" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>邮箱：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.userEmail}" name="userEmail" id="userEmail" placeholder="请输入您的邮箱，必填" />
						</div>
					</div>
				</div>
			</div>
			 
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					单位名称：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.enteName}" name="enteName" id="enteName" placeholder="请输入委托单位名称" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					社会信用码：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.enteCode}" name="enteCode" id="enteCode" placeholder="请输入委托单位社会信用码" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					单位地址：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.enteAddress}" name="enteAddress" id="enteAddress" placeholder="请输入委托单位名称" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					单位联系人：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.enteContact}" name="enteContact" id="enteContact" placeholder="请输入委托单位联系人" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					单位联系电话：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.entePhone}" name="entePhone" id="entePhone" placeholder="请输入委托单位联系电话" />
						</div>
					</div>
				</div>
			</div>
			
			
		</div>
		
		<div class="j_form__tools--submit">
			<button type="button" class="mui-btn mui-btn-success" onClick="save();return false;">确定</button>
		</div>
		</form>

	</div>	
</div>
<script type="text/javascript">
function save(){
	if(flagBeforesave()){
		ajaxSubForm('form1',"<%=request.getContextPath()%>/webSample/updateUser.do",{},'1',callBackSaveForm1);
	}	
}
function callBackSaveForm1(rs){
	showTipMessage(rs);
}
</script>
</body>
</html>