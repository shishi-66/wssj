<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
</head>
<body>
<header class="mui-bar mui-bar-nav">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>			
	<h1 class="mui-title">委托单</h1>
</header>
<div class="mui-content">
	<div class="j_form">
		<div class="j_form_items">
			<c:if test="${obj.inspSampState!=null and obj.inspSampState!='0' and obj.inspSampState!='1' }">
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">报告编号：${obj.inspSampReportNumber}</div>
			</div>
			</c:if>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">样品名称：${obj.inspSampName}</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">样品状态：${obj.inspSampColor}</div>
			</div>
			 
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">样品数量：${obj.inspSampAmount}</div>
					</div>
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">产品类别：<span id="prodCatCode_name"></span></div>
<script type="text/javascript">
var cplbData=getAjaxData("<%=request.getContextPath()%>/sampCategory/getTreeForSelect.do",{},false);
for(var i=0;i<cplbData.length;i++){
	if("${obj.prodCatCode}"==cplbData[i].id){
		$("#prodCatCode_name").html(cplbData[i].name);
		break;
	}
}
</script>
					</div>
				</div>
			</div>
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">质量等级：${obj.inspSampGrade}</div>
					</div>
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">安全类别：${obj.inspSampSafeCategory}</div>						
					</div>
				</div>
			</div>
		</div>
			 
		<div class="j_form_items">
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">生产日期：${obj.inspSampBatchNum}</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">商&emsp;&emsp;标：${obj.inspSampTrademark}</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">样品标识：${obj.inspSampIdentify}</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">规格型号：${obj.inspSampSpecification}</div>
			</div>	
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">${obj.inspSampGoods}：${obj.inspSampGoodsNum}</div>
			</div>	
		</div>
		
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">委托单位</div>
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">单位名称：${obj.wtdwName}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">社会信用码：${obj.wtdwCode}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">单位地址：${obj.wtdwAddress}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">联系人：${obj.wtdwContact}&nbsp;${obj.wtdwPhone}</div>
				</div>
			</div>	
		</div>
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">生产单位</div>
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">单位名称：${obj.scdwName}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">社会信用码：${obj.scdwCode}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">单位地址：${obj.scdwAddress}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">联系人：${obj.scdwContact}&nbsp;${obj.scdwPhone}</div>
				</div>
			</div>	
		</div>	
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">检验依据</div>
			</div>
			<div class="j_form_items__bd">${obj.inspSampStandard}</div>
		</div>		
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">检验项目</div>
			</div>
			<div class="j_form_items__bd">${obj.inspSampItem}</div>
		</div>
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">样品寄出的快递信息</div>				
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">快递单号：${obj.inspSampExpressNum}</div>
				</div>
				<div class="mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">快递名称：${obj.inspSampExpressName}</div>
						</div>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">寄出日期：${fn:substring(obj.inspSampExpressDate,0,10)}</div>							
						</div>
					</div>
				</div>
			</div>	
		</div>
		<c:if test="${obj.inspSampReportReceive!=null and obj.inspSampReportReceive=='快递' }">
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">报告收取地址信息</div>				
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">收件地址：${obj.inspSampJjdz}</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">收件人：${obj.inspSampJjSjr}&nbsp;${obj.inspSampJjSjdh}</div>
				</div>
			</div>	
		</div>	
		</c:if>
		
		<div class="j_form_items">
			<div class="j_form_item j_form_item--type--ud">
				<div class="j_form_item__label">余样处理方式：${obj.inspSampRemaining}</div>
			</div>				
			<div class="j_form_item j_form_item--type--ud">
				<div class="j_form_item__label">报告领取方式：${obj.inspSampReportReceive}</div>
			</div>	
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">	
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">送样人：${obj.inspSampSendPerson}</div>
					</div>					
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">	
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">报告份数：${obj.inspSampReportCount}</div>
					</div>					
				</div>
			</div>	
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">		
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__label">单项判定：<c:choose>
<c:when test="${obj.isDxpd!=null and obj.isDxpd=='1'}">是</c:when>
<c:otherwise>否</c:otherwise>
</c:choose>
						</div>
					</div>
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">						
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__label">综合判定：<c:choose>
<c:when test="${obj.isZhpd!=null and obj.isZhpd=='1'}">是</c:when>
<c:otherwise>否</c:otherwise>
</c:choose>
						</div>
					</div>	
				</div>
			</div> 		
		</div>
		<div class="j_form_items">
		<c:if test="${obj.inspSampState!=null and obj.inspSampState!='0' and obj.inspSampState!='1' }">
			<c:if test="${obj.inspSampState!=null and obj.inspSampStage=='end' }">
				<c:if test="${obj.inspSampIsQualified!=null and obj.inspSampIsQualified=='1' }">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">综合判定：合格</div>
					</div>	
				</c:if>
				<c:if test="${obj.inspSampIsQualified!=null and obj.inspSampIsQualified=='0' }">
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">综合判定：不合格</div>
					</div>	
				</c:if>
				<div class="j_form_item j_form_item--type--ud">
					<div class="j_form_item__label">报告签发日期：${fn:substring(obj.inspSampPredictDate,0,10)}</div>
				</div>
				<div class="j_form_item j_form_item--type--ud">
					<div class="j_form_item__label">应收费：${obj.inspSampItemPriceSum}</div>
				</div>
				<div class="j_form_item j_form_item--type--ud">
					<div class="j_form_item__label">实收费：${obj.inspSampPrice}</div>
				</div>			
			</c:if>
			
		</c:if>
			<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
				<div class="j_form_item__label">备注：${obj.inspSampBz}</div>
			</div> 
		</div>
		<div class="j_form__tools--submit">
			<button type="button" class="mui-btn mui-btn-success"  onclick="javascript:history.back(-1);">返回</button>
			<c:if test="${obj.inspSampStage!=null and obj.inspSampStage=='end' }">
			<button type="button" class="mui-btn mui-btn-success"  onclick="openPdf()">查看报告</button>
			</c:if>
		</div>
	</div>	
</div>

</body>
<script>
function openPdf(){
	var url="<%=request.getContextPath()%>/webQuery/openReportPdf.do?cateogry=${obj.inspSampQueryNumber}";
	window.open(url);
}
</script>
</html>
