<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<script type="text/javascript">
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var url=window.location.href;
	if(url.indexOf(".jsp")!=-1){
		window.location.href=url.substring(0,url.length-4)+"_m.jsp";
	}
}
</script>
</head>
<body>
<div class="j_head--index">
	<div class="j_head__title">张三，您好</div>
	<div class="j_head__tools">
		<a class="j_but" href="#topPopover"><span class="j_but__icon mui-icon mui-icon-bars"></span></a>
	</div>
</div>
<div id="topPopover" class="mui-popover">
	<div class="mui-popover-arrow"></div>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell"><a href="<%=request.getContextPath()%>/jsp/web/wssj/editpassword.jsp" >密码修改</a></li>
				<li class="mui-table-view-cell"><a href="<%=request.getContextPath()%>/jsp/web/wssj/editUser.jsp" >注册信息修改</a></li>
				<li class="mui-table-view-cell"><a href="#" onclick="logOut();return false;">退出</a></li>
			</ul>
		</div>
	</div>
</div>
<div class="j_tools j_tools--main">
 <a class="j_but" href="<%=request.getContextPath()%>/jsp/web/wssj/add.jsp" target="_blank"><span 
 class="j_but__icon fa fa-file-text-o j-color-icon--success"></span><span 
 class="j_but__txt">录入委托单</span></a>
 
 <a class="j_but" href="<%=request.getContextPath()%>/jsp/web/wssj/listwtj.jsp" target="_blank"><span 
 class="j_but__icon fa fa-building-o j-color-icon--warning"></span><span 
 class="j_but__txt">未提交委托单</span></a>
 
 <a class="j_but" href="<%=request.getContextPath()%>/jsp/web/wssj/listdsl.jsp" target="_blank"><span 
 class="j_but__icon fa fa-building-o j-color-icon--danger"></span><span 
 class="j_but__txt">待受理委托单</span></a>
 
 <a class="j_but" href="<%=request.getContextPath()%>/jsp/web/wssj/listysl.jsp" target="_blank"><span 
 class="j_but__icon fa fa-calendar-check-o j-color-icon--success"></span><span 
 class="j_but__txt">已受理委托单</span></a>
 
 <a class="j_but" href="<%=request.getContextPath()%>/jsp/web/webQuery.jsp" target="_blank"><span 
 class="j_but__icon fa fa-shopping-basket j-color-icon--info"></span><span 
 class="j_but__txt">报告查询</span></a>
	
</div>
 
<script type="text/javascript">
$(function(){
});
function logOut(){
	window.top.location.href = "<%=request.getContextPath()%>/jsp/web/wssj/index.jsp";
}

</script>
</body>
</html>
