<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<title>报告查询</title>
</head>
<body>
<header class="mui-bar mui-bar-nav">
	<h1 class="mui-title">报告查询</h1>
</header>
<div class="mui-content">
	<div class="j_spe_show_bgcx">
		<div class="j_dl_box">
			<div class="j_dl j_dl--table">
				<div class="j_dt">产品名称：</div>
				<div class="j_dd j_dd--text_right">${obje.inspSampName}</div>
			</div>
			<div class="j_dl j_dl--table">
				<div class="j_dt">颜色/状态：</div>
				<div class="j_dd j_dd--text_right">${obje.inspSampColor}</div>
			</div>
			<div class="j_dl j_dl--table">
				<div class="j_dt">生产日期/批号：</div>
				<div class="j_dd j_dd--text_right">${obje.inspSampBatchNum}</div>
			</div>
			<div class="j_dl j_dl--table">
				<div class="j_dt">预计出证日期：</div>
				<div class="j_dd j_dd--text_right">${obje.inspSampPredictDateStr}</div>
			</div>
			<div class="j_dl j_dl--table">
				<div class="j_dt">当前状态：</div>
				<div class="j_dd j_dd--text_right">${obje.inspSampStage_Name}</div>
			</div>
			<div class="j_dl j_dl--table">
				<div class="j_dt">判定结果：</div>
				<div class="j_dd j_dd--text_right">${inspSampIsQualified_Name}</div>
			</div>
			<c:if test="${obje.filePath!=null && obje.filePath!='' }">
				<div class="j_dl j_dl--table">
					<div class="j_dt">报告下载：</div>
					<div class="j_dd j_dd--text_right"><a href='#' onclick="openPdf()">点此下载报告</a></div>
				</div>
			</c:if>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
function openPdf(){
	var url="<%=request.getContextPath()%>/webQuery/openReportPdf.do?cateogry=${obje.inspSampQueryNumber}";
	window.open(url);
}
</script>
</html>