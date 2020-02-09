<%
	/**
	 * 表单详情弹出框 dialogObjectInfo 弹出框内容在另外的页面，从后台动态加载页面各项值 
	 * 若要直接在右边内嵌打开，则可以直接调用toViewInner
	 */
%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<div class="dialog_bg" id="dialogObjectInfo">
	<div class="dialog_block"></div>
	<div class="dialog" >
		<div class="dialog_base" >
			<div class="dialog_title">
				<span id="dialogObjectInfoTitle"></span>
				<div class="dialog_close" title="关闭" onclick="javascript:$('#dialogObjectInfo').hide();">
					<i class="icon-remove"></i>
				</div>
			</div><!-- 代码调用时若不写高度，则按默认的470px显示 -->
			<div class="dialog_c" style="height:470px" id="dialogObjectInfo_content"></div>
			<div class="dialog_btn" id="dialogObjectInfo_btn">
				<a style="display:none" class="btn btn-small btn-primary" id="dialogObjectInfoBtnSave" href="javascript:void(0);" onclick="dialogObjectInfoBtnSave('1')">保存</a>
				<a class="btn btn-small" href="javascript:void(0);" onclick='javascript:$("#dialogObjectInfo").hide();'>关闭</a>
			</div>			
		</div>
	</div>
</div>