<%
	/**
	 * 弹出框要用到的隐藏域
	 */
%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<input type="hidden" id="dialogCallBackFunName"><!-- 弹出框的回调函数名 -->
<input type="hidden" id="dialogSelectedData" value=","><!-- 存放弹出框被选中的值 -->
<input type="hidden" id="dialogisMultiSelect" ><!-- 弹出框是单选还是多选，1=多选，0单选 -->
<input type="hidden" id="dialogMultiValSeparator" ><!-- 弹出框是多选时，多值的分隔符 -->
<input type="hidden" id="dialogSetObjIdId" ><!-- 弹出框选择值后要赋值的控件名id，真实的值-->
<input type="hidden" id="dialogSetObjNameId" ><!-- 弹出框选择值后要赋值的控件名id，显示的值用 -->
<input type="hidden" id="dialogHasSelectName" ><!-- 弹出框判断是否选择过的属性 -->
