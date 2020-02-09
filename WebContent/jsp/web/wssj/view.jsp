<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/jhr/css/web.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/jhr/js/jquery-1.9.1.min.js" ></script>
</head>
<body>

<div class="jhr-container"> 
	<table class="table--form" >
		<tr>
			<td class="td-place" width="90"></td>
			<td class="td-place" width="170"></td>
			<td class="td-place" width="90"></td>
			<td class="td-place" width="170"></td>
			<td class="td-place" width="90"></td>
			<td class="td-place" width="240"></td>
		</tr>
		<c:if test="${obj.inspSampState!=null and obj.inspSampState!='0' and obj.inspSampState!='1' }">
		<tr>
			<td class="td-label">报告编号</td>
			<td class="td-input" colspan="5">${obj.inspSampReportNumber}</td>
		</tr>
		</c:if>
		<tr>
			<td class="td-label">样品名称</td>
			<td class="td-input">${obj.inspSampName}</td>
			<td class="td-label">样品状态</td>
			<td class="td-input">${obj.inspSampColor}</td>
			<td class="td-label">产品类别</td>
			<td class="td-input" id="edit_prodCatCode">${obj.prodCatCodeName }</td>
		</tr>	
		<tr>
			<td class="td-label">样品数量</td>
			<td class="td-input" >${obj.inspSampAmount}</td>
			<td class="td-label">安全类别</td>
			<td class="td-input">${obj.inspSampSafeCategory}</td>
			<td class="td-label">质量等级</td>
			<td class="td-input" >${obj.inspSampGrade}</td>
		</tr>	
		<tr>
			<td class="td-label">生产日期</td>
			<td class="td-input" >${obj.inspSampBatchNum}</td>
			<td class="td-label">商标</td>
			<td class="td-input">${obj.inspSampTrademark}</td>
			<td class="td-label">样品标识</td>
			<td class="td-input">${obj.inspSampIdentify}</td>
		</tr>									
		<tr>
			<td class="td-label">规格型号</td>
			<td class="td-input"  colspan="3">${obj.inspSampSpecification}</td>
	 		<td class="td-label">${obj.inspSampGoods}</td>
			<td class="td-input" >${obj.inspSampGoodsNum}</td>
		</tr>					
		<tr>
			<td class="td-label">委托单位</td>
			<td class="td-input" colspan="5">${obj.wtdwName}&nbsp;&nbsp;${obj.wtdwAddress}&nbsp;
			&nbsp;${obj.wtdwCode}&nbsp;&nbsp;${obj.wtdwContact}&nbsp;&nbsp;${obj.wtdwPhone}
			</td>
		</tr>
		<tr>
			<td class="td-label">生产单位</td>
			<td class="td-input" colspan="5">${obj.scdwName}&nbsp;&nbsp;${obj.scdwAddress}&nbsp;
			&nbsp;${obj.scdwCode}&nbsp;&nbsp;${obj.scdwContact}&nbsp;&nbsp;${obj.scdwPhone}
			</td>
		</tr>				
		<tr>
			<td class="td-label">检验依据</td>
			<td class="td-input" colspan="5">${obj.inspSampStandard}</td>
		</tr>
		<tr>
			<td class="td-label">检验项目</td>
			<td class="td-input" colspan="5">${obj.inspSampItem}</td>
		</tr>
		<tr>
			<td class="td-label">来样快递信息</td>
			<td class="td-input" colspan="5">${obj.inspSampExpressNum} ${obj.inspSampExpressName} ${fn:substring(obj.inspSampExpressDate,0,10)}</td>
		</tr>
		<c:if test="${obj.inspSampReportReceive!=null and obj.inspSampReportReceive=='快递' }">
		<tr>
			<td class="td-label">寄出快递信息</td>
			<td class="td-input" colspan="5">${obj.inspSampJjdz} ${obj.inspSampJjSjr} ${obj.inspSampJjSjdh}</td>
		</tr>
		</c:if>
		<tr>
			<td class="td-label">余样处理方式</td>
			<td class="td-input">${obj.inspSampRemaining}</td>
			<td class="td-label">报告领取方式</td>
			<td class="td-input" >${obj.inspSampReportReceive}</td>
			<td class="td-label">报告份数</td>
			<td class="td-input">${obj.inspSampReportCount}</td>
		</tr>
		<tr> 
			<td class="td-label">送样人</td>
			<td class="td-input">${obj.inspSampSendPerson}</td>
			
		</tr>
		<tr>
			<td class="td-label">备注</td>
			<td class="td-input" colspan="5">${obj.inspSampBz}</td>
		</tr>
		<c:if test="${obj.inspSampState!=null and obj.inspSampState!='0' and obj.inspSampState!='1' }">
			<c:if test="${obj.inspSampState!=null and obj.inspSampStage=='end' }">
		<tr>
			<td class="td-label">判定结果</td>
			<td class="td-input"><c:choose>
<c:when test="${obj.inspSampIsQualified!=null and obj.inspSampIsQualified=='1'}">合格</c:when>
<c:when test="${obj.inspSampIsQualified!=null and obj.inspSampIsQualified=='0'}">不合格</c:when>
<c:when test="${obj.inspSampIsQualified!=null and obj.inspSampIsQualified=='2'}">不判</c:when>
<c:otherwise>--</c:otherwise>
</c:choose></td>
			<td class="td-label">报告签发日期</td>
			<td class="td-input">${fn:substring(obj.inspSampPredictDate,0,10)}</td>
			<td class="td-label">检验费</td>
			<td class="td-input">应收费：${obj.inspSampItemPriceSum}  实收费：${obj.inspSampPrice}</td>
		</tr>			
			</c:if>			
		</c:if>
		<c:if test="${obj.returnReson!=null and obj.returnReson!=''}">
		<tr>
			<td class="td-label">退回原因</td>
			<td class="td-input" colspan="5">${obj.returnReson}
			</td>
		</tr>
		</c:if>
	</table>
</div>
			 
<div class="form-tools">
	<button type="button" class="btn btn-success"  onclick="javascript:window.close();">关闭</button>
	<c:if test="${obj.inspSampStage!=null and obj.inspSampStage=='end' }">
	<button type="button" class="btn btn-success"  onclick="openPdf()">查看报告</button>
	</c:if>
</div>

</body>
<script>
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var url=window.location.href;
	if(url.indexOf(".jsp")!=-1){
		window.location.href=url.substring(0,url.length-4)+"_m.jsp";
	}
}
function openPdf(){
	var url="<%=request.getContextPath()%>/webQuery/openReportPdf.do?cateogry=${obj.inspSampQueryNumber}";
	window.open(url);
}
</script>
</html>
