<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/jhr/css/web.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/jhr/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/jhr/js/web.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/lib/laypage/laypage.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/lib/My97DatePicker/WdatePicker.js"></script>

<script type="text/javascript">
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var url=window.location.href;
	if(url.indexOf(".jsp")!=-1){
		window.location.href=url.substring(0,url.length-4)+"_m.jsp";
	}
}
$(function(){
	seachByPage();
});
function seachByPage(){
	var url="<%=request.getContextPath()%>/webSample/list.do";
	grid($('#page1'),url,getQueryCondition(),$("#totalSpan"),$("#div_list"),addThisRow,"1");
	var res={"page":"1","total":"1","records":"2","rows":[{"arrKeys":"","bgbzId":0,"bgbzName":"","bgbzTime":"","c_syrq":"","contrastMonth1":"","contrastMonth2":"","contrastYear1":"","contrastYear2":"","copyCount":"","copyFields":"","createrTime":"2020-02-08 22:41:39","createrTimeStr":"","creator":0,"creatorName":"","deptRequireTime":"","deptRequireTimeEnd":"","deptRequireTimeStart":"","enteDiscount":"","enteGzr":"","enterpriseAreaCode":"","filePath":"","finishTime":"","fsId":0,"fsImgPath":"","fsName":"","fsTime":"","hasIndex":"","insertformat":"","inspDeptCode":"","inspField":"","inspItemCode":"","inspItemJson":"","inspItemResultJson":"","inspItemUnquality":"","inspLingyJson":"","inspReceiveTime":"","inspReceiveTimeEnd":"","inspReceiveTimeStart":"","inspReceiveUserName":"","inspSampAccording":"","inspSampAmount":"","inspSampBatchNum":"","inspSampBqpd":"","inspSampBz":"","inspSampCheckCondition":"","inspSampCheckDate":"","inspSampCheckPerson":"","inspSampColor":"蓝色","inspSampDepartment":"","inspSampDepartmentName":"","inspSampDiscount":"","inspSampExpressDate":"2020-01-23 00:00:00","inspSampExpressName":"邮政","inspSampExpressNum":"9897792942420","inspSampFrom":"","inspSampFrom_Name":"","inspSampFyxx":"","inspSampGoods":"","inspSampGoodsNum":"","inspSampGrade":"","inspSampGzr":"","inspSampId":"200208171336928329728","inspSampIdentify":"","inspSampIsQualified":"","inspSampIsQualified_Name":"","inspSampItem":"","inspSampItemCount":"","inspSampItemPriceSum":"","inspSampJjSjdh":"","inspSampJjSjr":"","inspSampJjdz":"","inspSampKhyq":"","inspSampLocation":"","inspSampName":"运动服12","inspSampPayId":0,"inspSampPayName":"","inspSampPayType":"","inspSampPic":"","inspSampPredictDate":"2020-02-19 17:00:00","inspSampPredictDateStr":"","inspSampPrice":"","inspSampQueryNumber":"","inspSampRemaining":"","inspSampReportBz":"","inspSampReportCount":"","inspSampReportDate":"","inspSampReportDateStr":"","inspSampReportFirstPage":"","inspSampReportFirstPagePath":"","inspSampReportNumber":"W20200002","inspSampReportPage":"","inspSampReportPageName":"","inspSampReportPagePath":"","inspSampReportReceive":"","inspSampReportSeal":"","inspSampResult":"","inspSampSafeCategory":"","inspSampSendDate":"","inspSampSendDateStr":"","inspSampSendPerson":"石柳","inspSampSpecification":"160/85","inspSampStage":"ypdj","inspSampStage_Name":"样品登记","inspSampStandard":"","inspSampState":"2","inspSampState_Name":"","inspSampSwpd":"","inspSampTaskFrom":"","inspSampTrademark":"花艺","inspSampType":"","inspSampType_Name":"","inspSampZhpd":"","inspYear":"","invoiceNum":"","isDxpd":"","isFy":"","isJdcc":"","isLingy":"","isPrint":"","isScdwXsdw":"","isUpload":"","isXy":"","isZhpd":"","jylx":"","listBgfy":[],"listpic":[],"mulChooseSampType":"","newReportNumber":"","noRuleId":"","planBh":"","priceTjType":"","prodCatCode":"","prodCatCodeName":"","prodCode":"","prodName":"","pzId":0,"pzImgPath":"","pzName":"","pzTime":"","receiveDetail":"","reportResFormatItemType":"","reportResFormatItems":"","reportTime":"","requiredTime":"","returnDetail":"","returnReson":"","rwfpId":0,"rwfpName":"","rwfpTime":"","rwlyForReport":"","sampCreTimeEnd":"","sampCreTimeStart":"","sampNumberEnd":"","sampNumberStart":"","sampRequireTimeEnd":"","sampRequireTimeStart":"","sampSendDateEnd":"","sampSendDateStart":"","scdwAddress":"","scdwCode":"","scdwContact":"","scdwId":0,"scdwName":"长沙花艺面料厂","scdwPhone":"","searchEnteName":"","searchEnteType":"","searchSlrq":"","searchYyrq":"","signatureImgPath":"","sjType":"","sjdwAddress":"","sjdwCode":"","sjdwContact":"","sjdwId":0,"sjdwName":"","sjdwPhone":"","sjrq":"","spotCheckAddress":"","spotCheckBaseAmout":"","spotCheckComName":"","spotCheckDate":"","spotCheckDateStr":"","spotCheckNumber":"","spotCheckPerson":"","tjEndDay":"","tjMonth":"","tjProdCat":"","tjStartDay":"","tjType":"","tjTypeVal":"","tjYear":"","topNumber":"","updateTime":"","updateUser":0,"webuserId":"7198b69a333941f39cc2398e89b39172","wt_sjdw":"","wtdwAddress":"","wtdwCode":"","wtdwContact":"","wtdwId":0,"wtdwName":"长沙金慧睿信息科技有限公司","wtdwPhone":"","ypxxBhgxm":"","zjId":0,"zjImgPath":"","zjName":""},{"arrKeys":"","bgbzId":0,"bgbzName":"","bgbzTime":"","c_syrq":"","contrastMonth1":"","contrastMonth2":"","contrastYear1":"","contrastYear2":"","copyCount":"","copyFields":"","createrTime":"2020-02-08 22:41:31","createrTimeStr":"","creator":0,"creatorName":"","deptRequireTime":"","deptRequireTimeEnd":"","deptRequireTimeStart":"","enteDiscount":"","enteGzr":"","enterpriseAreaCode":"","filePath":"","finishTime":"","fsId":0,"fsImgPath":"","fsName":"","fsTime":"","hasIndex":"","insertformat":"","inspDeptCode":"","inspField":"","inspItemCode":"","inspItemJson":"","inspItemResultJson":"","inspItemUnquality":"","inspLingyJson":"","inspReceiveTime":"","inspReceiveTimeEnd":"","inspReceiveTimeStart":"","inspReceiveUserName":"","inspSampAccording":"","inspSampAmount":"","inspSampBatchNum":"","inspSampBqpd":"","inspSampBz":"","inspSampCheckCondition":"","inspSampCheckDate":"","inspSampCheckPerson":"","inspSampColor":"蓝色","inspSampDepartment":"","inspSampDepartmentName":"","inspSampDiscount":"","inspSampExpressDate":"2020-01-23 00:00:00","inspSampExpressName":"邮政","inspSampExpressNum":"9897792942420","inspSampFrom":"","inspSampFrom_Name":"","inspSampFyxx":"","inspSampGoods":"","inspSampGoodsNum":"","inspSampGrade":"","inspSampGzr":"","inspSampId":"200208171320274845696","inspSampIdentify":"","inspSampIsQualified":"0","inspSampIsQualified_Name":"","inspSampItem":"","inspSampItemCount":"","inspSampItemPriceSum":"","inspSampJjSjdh":"","inspSampJjSjr":"","inspSampJjdz":"","inspSampKhyq":"","inspSampLocation":"","inspSampName":"运动服11","inspSampPayId":0,"inspSampPayName":"","inspSampPayType":"","inspSampPic":"","inspSampPredictDate":"2020-02-19 17:00:00","inspSampPredictDateStr":"","inspSampPrice":"","inspSampQueryNumber":"","inspSampRemaining":"","inspSampReportBz":"","inspSampReportCount":"","inspSampReportDate":"","inspSampReportDateStr":"","inspSampReportFirstPage":"","inspSampReportFirstPagePath":"","inspSampReportNumber":"W20200001","inspSampReportPage":"","inspSampReportPageName":"","inspSampReportPagePath":"","inspSampReportReceive":"","inspSampReportSeal":"","inspSampResult":"","inspSampSafeCategory":"","inspSampSendDate":"","inspSampSendDateStr":"","inspSampSendPerson":"石柳","inspSampSpecification":"160/85","inspSampStage":"end","inspSampStage_Name":"结束","inspSampStandard":"","inspSampState":"2","inspSampState_Name":"","inspSampSwpd":"","inspSampTaskFrom":"","inspSampTrademark":"花艺","inspSampType":"","inspSampType_Name":"","inspSampZhpd":"","inspYear":"","invoiceNum":"","isDxpd":"","isFy":"","isJdcc":"","isLingy":"","isPrint":"","isScdwXsdw":"","isUpload":"","isXy":"","isZhpd":"","jylx":"","listBgfy":[],"listpic":[],"mulChooseSampType":"","newReportNumber":"","noRuleId":"","planBh":"","priceTjType":"","prodCatCode":"","prodCatCodeName":"","prodCode":"","prodName":"","pzId":0,"pzImgPath":"","pzName":"","pzTime":"","receiveDetail":"","reportResFormatItemType":"","reportResFormatItems":"","reportTime":"","requiredTime":"","returnDetail":"","returnReson":"","rwfpId":0,"rwfpName":"","rwfpTime":"","rwlyForReport":"","sampCreTimeEnd":"","sampCreTimeStart":"","sampNumberEnd":"","sampNumberStart":"","sampRequireTimeEnd":"","sampRequireTimeStart":"","sampSendDateEnd":"","sampSendDateStart":"","scdwAddress":"","scdwCode":"","scdwContact":"","scdwId":0,"scdwName":"长沙花艺面料厂","scdwPhone":"","searchEnteName":"","searchEnteType":"","searchSlrq":"","searchYyrq":"","signatureImgPath":"","sjType":"","sjdwAddress":"","sjdwCode":"","sjdwContact":"","sjdwId":0,"sjdwName":"","sjdwPhone":"","sjrq":"","spotCheckAddress":"","spotCheckBaseAmout":"","spotCheckComName":"","spotCheckDate":"","spotCheckDateStr":"","spotCheckNumber":"","spotCheckPerson":"","tjEndDay":"","tjMonth":"","tjProdCat":"","tjStartDay":"","tjType":"","tjTypeVal":"","tjYear":"","topNumber":"","updateTime":"","updateUser":0,"webuserId":"7198b69a333941f39cc2398e89b39172","wt_sjdw":"","wtdwAddress":"","wtdwCode":"","wtdwContact":"","wtdwId":0,"wtdwName":"长沙金慧睿信息科技有限公司","wtdwPhone":"","ypxxBhgxm":"","zjId":0,"zjImgPath":"","zjName":""}]}
	$(res.rows).each(function(i,data) { 		
		$("#div_list").append(addThisRow(data));
	});	
} 
function getQueryCondition(){
	var obj={};
	obj["inspSampName"]=$("#inspSampName").val();
	obj["scdwName"]=$("#scdwName").val();
	obj["inspSampExpressNum"]=$("#inspSampExpressNum").val();
	obj["inspSampExpressDate"]=$("#inspSampExpressDate").val();
	obj["inspSampReportNumber"]=$("#inspSampReportNumber").val();
	obj["orderFields"]="inspSampId";
	obj["order"]="desc";
	obj["op"]="ysl";
	return obj;
}
function addThisRow(d){
	var showurl="<%=request.getContextPath()%>/webSample/toOpen.do?op=ysl&key=";
	var hiddenInput="<input type='hidden' name='row_id' value='"+d.inspSampId+"' >"; //公用，主键，必须要有
	hiddenInput +=  "<input type='hidden' name='row_inspSampState' value='"+(d.hasOwnProperty('inspSampState')?d.inspSampState:'')+"' >";
	var rowHtml="<tr><td align='center'><input type='checkbox' name='wTableCommon_chkbox' class='checkbox' />";
	rowHtml += hiddenInput+"</td>";
	rowHtml +="<td onclick='tdSelectRow(this)'>"+d.inspSampReportNumber+"</td>";
	rowHtml +="<td align='center'><a href='"+showurl+d.inspSampId+"' target='_blank' style='color:#03f'>";
	rowHtml += d.inspSampName+"</a></td>";
	rowHtml +="<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('inspSampSpecification')?d.inspSampSpecification:'/')+"</td>";
	rowHtml +="<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('scdwName')?d.scdwName:'')+"</td>";
	rowHtml +="<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('inspSampExpressNum')?d.inspSampExpressNum:'')+"</td>";
	var kdrq = d.hasOwnProperty('inspSampExpressDate')?d.inspSampExpressDate:'';
	if(kdrq!=""){
		kdrq=kdrq.substring(0,10);
	}
	rowHtml += "<td onclick='tdSelectRow(this)' align='center'>"+kdrq+"</td>";
	var stage="已受理";
	if(d.hasOwnProperty("inspSampStage_Name")&&d.inspSampStage_Name!=""){
		stage=d.inspSampStage_Name;
	}
	rowHtml +="<td onclick='tdSelectRow(this)' align='center'>"+stage+"</td>";
	var pdjg = d.hasOwnProperty('inspSampIsQualified')?d.inspSampIsQualified:'';
	if(pdjg=="1"){pdjg="合格";}
	else if(pdjg=="0"){pdjg="不合格";}
	else if(pdjg=="2"){pdjg="不判定";}
	rowHtml += "<td onclick='tdSelectRow(this)' align='center'>"+pdjg+"</td>";
	rowHtml += "<td align='center'><a href='<%=request.getContextPath()%>/webSample/toAdd.do?key="+d.inspSampId+"'>【复制】</a></td>";
	rowHtml += "</tr>";
	$("#div_list").append(rowHtml);
}
function printCyd(){
	var ids = getDialogSelectedIds('1');
   	if(ids!=""){
   		window.open("<%=request.getContextPath()%>/webSample/toPrint.do?keys="+ids);
	}
} 
</script>
<div class="list">
	<div class="list_search">
		<form id="searchForm">
		<div class="list_search__row">
			<div class="layout--lr">
				<div class="layout__item">样品名称</div>
				<div class="layout__item"><input type="text" id="inspSampName" style="width:100px"></div>
			</div>			
			<div class="layout--lr">
				<div class="layout__item">生产单位</div>
				<div class="layout__item"><input type="text" id="scdwName" style="width:100px"></div>
			</div>
			<div class="layout--lr">
				<div class="layout__item">快递单号</div>
				<div class="layout__item"><input type="text" id="inspSampExpressNum" style="width:100px"></div>
			</div>
			<div class="layout--lr">
				<div class="layout__item">快递日期</div>
				<div class="layout__item"><input type="text" onclick="WdatePicker()" id="inspSampExpressDate" style="width:100px"></div>
			</div>
			<div class="layout--lr">
				<div class="layout__item">报告编号</div>
				<div class="layout__item"><input type="text" id="inspSampReportNumber" style="width:100px"></div>
			</div>
			<div class="layout--lr">
				<div class="layout__item">
					<input value="搜索" type="button" onclick="seachByPage()" class="btn btn-primary btn-small" />
				</div>
				<div class="layout__item">
					<input value="重置" type="button" onclick="javascript:$('#searchForm')[0].reset();return false;"  class="btn btn-small" /> 
				</div>
			</div> 
		</div>
		</form>
	</div>
	<div class="list_tools">
		<div class="layout--lr">
			<div class="layout__item">
				<a  href="#" onclick="printCyd();" class="btn btn-success btn-small">
				打印</a>				
			</div>
		</div>
	</div>
	<div class="list_content">
		<table class="table--list--default table--striped table--hover" id="wTableCommon">
			<thead><tr>
				<th width='20'><input class='checkbox' type='checkbox' onclick='chkall(this,"wTableCommon_chkbox")'/></th>
		    	<th width='110'>报告编号</th>
		    	<th width='180'>样品名称</th><th width='180'>规格型号</th>
		    	<th>生产单位</th><th width='160'>快递单号</th><th width='110'>寄出日期</th>
		    	<th width='120'>当前环节</th><th width='80'>判定结果</th><th width='120'></th>
			</tr></thead>
			<tbody id ="div_list"></tbody>
		</table>
	</div>
	<div class="list_page">
		<div class="page">
			<div class="page__total">共有<span class="page__cur"> <span id="totalSpan">0</span> </span>条记录</div>
			<div class="page__tools">
				<div id="page1"></div>
			</div>
		</div>		
	</div>
</div>
