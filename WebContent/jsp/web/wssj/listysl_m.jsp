<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/mobile/css/mui.picker.min.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/mobile/js/mui.picker.min.js"></script>

</head>
<body>
<div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable mui-slide-in">
	<!--侧滑菜单部分-->
	<aside id="offCanvasSide" class="mui-off-canvas-right">
		<div class="j_filter j_filter--default">
			<div class="j_filter__hd">
				<div class="j_filter__title">更多条件</div>
				<div class="j_filter__tools"><button id="offCanvasHide" type="button"><i class="mui-icon mui-icon-closeempty"></i></button></div>
			</div>
			<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
				<div class="mui-scroll">
					<div class="j_filter__bd">	
						<div class="j_filter__item j_filter__item--default">
							<label>报告编号</label>
							<div class="j_filter__item__control">
								<input type="text" id="inspSampReportNumber" />
							</div>
						</div>					
						<div class="j_filter__item j_filter__item--default">
							<label>生产单位</label>
							<div class="j_filter__item__control">
								<input type="text"  id="scdwName" />
							</div>
						</div>
						<div class="j_filter__item j_filter__item--default">
							<label>快递单号</label>
							<div class="j_filter__item__control">
								<input type="text"  id="inspSampExpressNum" />
							</div>
						</div>
						<div class="j_filter__item j_filter__item--default">
							<label>快递寄出日期<button type="button" class="j_but--input_addon" onclick="pickerrq('inspSampExpressDate','date');">日期选择</button></label>
							<div class="j_filter__item__control">
								<input id="inspSampExpressDate" readonly="readonly" placeholder="请选择日期" type="text" />
							</div>
						</div>
					</div>
				</div>
			</div>				
			<div class="j_filter__fd">
				<div class="j_filter__submit">
					<button type="button" onclick="doMobileSearch1();" class="mui-btn mui-btn-primary">查询</button>
				</div>
			</div>
		</div>
	</aside>
	<!--主界面部分-->
            
	<div class="mui-inner-wrap">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">已受理委托单</h1>
		</header>	
		<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
			<div class="mui-scroll">
				<div class="mui-content-padded">
					<div class="j_search_box j_search_box--default">
						<div class="j_search--default">
							<div class="j_search__control">
								<div class="j_input--mc">
									<div class="j_input__control">
										<input type="text" id="inspSampName" placeholder="输入样品名称"/>
									</div>
									<div class="j_input__btn">
										<div class="j_search_btn_box">
											<button onclick="doMobileSearch()"></button>
											<span class="mui-icon mui-icon-search"></span>
										</div>	
									</div>
								</div>
							</div>
							<div class="j_search__addon">
								<a id="offCanvasShow" class="j_but j_but--primary" href="#">更多条件</a>
							</div>
						</div>
					</div>	
					<div class="j_items--card">
						<div class="j_items__hd">
							<div class="j_items__count" id="totalNum"></div>
						</div>
						<div class="j_items__bd" id="divCur1"></div>
					</div>
					<div id="nextPageDiv" class="j_items--next_page">
						<button id="nextPageBtn" onclick="nextPage();">点击加载更多</button>
					</div>
				</div>
			</div>
		</div>
		<!-- off-canvas backdrop -->
		<div class="mui-off-canvas-backdrop"></div>
	</div>
</div>

        
		
<script type="text/javascript">
var pageNum=1;
var pageSize=10;
$("#nextPageDiv").hide();

mui('body').on('tap','a',function(){ window.top.location.href=this.href; }); 

//侧滑菜单
var offCanvasWrapper = mui('#offCanvasWrapper');
var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
var offCanvasSide = document.getElementById("offCanvasSide");
document.getElementById('offCanvasShow').addEventListener('tap', function() {
	offCanvasWrapper.offCanvas('show');
});
document.getElementById('offCanvasHide').addEventListener('tap', function() {
	offCanvasWrapper.offCanvas('close');
});
mui('#offCanvasSideScroll').scroll();
mui('#offCanvasContentScroll').scroll();
if (mui.os.plus && mui.os.ios) {
	mui.plusReady(function() {
		plus.webview.currentWebview().setStyle({
			'popGesture': 'none'
		});
	});
}

var urlList="<%=request.getContextPath()%>/webSample/list.do";
var urlEdit="<%=request.getContextPath()%>/webSample/toOpen.do?op=ysl&key="; //未提交

function clearAll(){
	pageNum=1;
	$("#nextPageBtn").text("点击加载更多");
	$("#nextPageBtn").attr('disabled',false);
	$("#divCur1").empty();
	toGetDataList();
}
function doMobileSearch(){
	clearAll();
}
function doMobileSearch1(){	
	clearAll();
	offCanvasWrapper.offCanvas('close');
}
 
function getQueryCondition(){
    var obj ={};
    obj["pageNo"]=pageNum;
    obj["pageSize"]=pageSize;
    obj["orderFields"]="inspSampId";
    obj["order"]="desc";
    obj["op"]="ysl";
    obj["inspSampName"]=$("#inspSampName").val();
	obj["scdwName"]=$("#scdwName").val();
	obj["inspSampExpressNum"]=$("#inspSampExpressNum").val();
	obj["inspSampExpressDate"]=$("#inspSampExpressDate").val();
	obj["inspSampReportNumber"]=$("#inspSampReportNumber").val();
	return obj;
}
function nextPage() {
	pageNum=pageNum+1;
	toGetDataList();
}
function toGetDataList() {
	//var json=getAjaxData(urlList,getQueryCondition(),false); //false同步执行，true异步执行
	var json={"page":"1","total":"1","records":"2","rows":[{"arrKeys":"","bgbzId":0,"bgbzName":"","bgbzTime":"","c_syrq":"","contrastMonth1":"","contrastMonth2":"","contrastYear1":"","contrastYear2":"","copyCount":"","copyFields":"","createrTime":"2020-02-08 22:41:39","createrTimeStr":"","creator":0,"creatorName":"","deptRequireTime":"","deptRequireTimeEnd":"","deptRequireTimeStart":"","enteDiscount":"","enteGzr":"","enterpriseAreaCode":"","filePath":"","finishTime":"","fsId":0,"fsImgPath":"","fsName":"","fsTime":"","hasIndex":"","insertformat":"","inspDeptCode":"","inspField":"","inspItemCode":"","inspItemJson":"","inspItemResultJson":"","inspItemUnquality":"","inspLingyJson":"","inspReceiveTime":"","inspReceiveTimeEnd":"","inspReceiveTimeStart":"","inspReceiveUserName":"","inspSampAccording":"","inspSampAmount":"","inspSampBatchNum":"","inspSampBqpd":"","inspSampBz":"","inspSampCheckCondition":"","inspSampCheckDate":"","inspSampCheckPerson":"","inspSampColor":"蓝色","inspSampDepartment":"","inspSampDepartmentName":"","inspSampDiscount":"","inspSampExpressDate":"2020-01-23 00:00:00","inspSampExpressName":"邮政","inspSampExpressNum":"9897792942420","inspSampFrom":"","inspSampFrom_Name":"","inspSampFyxx":"","inspSampGoods":"","inspSampGoodsNum":"","inspSampGrade":"","inspSampGzr":"","inspSampId":"200208171336928329728","inspSampIdentify":"","inspSampIsQualified":"","inspSampIsQualified_Name":"","inspSampItem":"","inspSampItemCount":"","inspSampItemPriceSum":"","inspSampJjSjdh":"","inspSampJjSjr":"","inspSampJjdz":"","inspSampKhyq":"","inspSampLocation":"","inspSampName":"运动服12","inspSampPayId":0,"inspSampPayName":"","inspSampPayType":"","inspSampPic":"","inspSampPredictDate":"2020-02-19 17:00:00","inspSampPredictDateStr":"","inspSampPrice":"","inspSampQueryNumber":"","inspSampRemaining":"","inspSampReportBz":"","inspSampReportCount":"","inspSampReportDate":"","inspSampReportDateStr":"","inspSampReportFirstPage":"","inspSampReportFirstPagePath":"","inspSampReportNumber":"W20200002","inspSampReportPage":"","inspSampReportPageName":"","inspSampReportPagePath":"","inspSampReportReceive":"","inspSampReportSeal":"","inspSampResult":"","inspSampSafeCategory":"","inspSampSendDate":"","inspSampSendDateStr":"","inspSampSendPerson":"石柳","inspSampSpecification":"160/85","inspSampStage":"ypdj","inspSampStage_Name":"样品登记","inspSampStandard":"","inspSampState":"2","inspSampState_Name":"","inspSampSwpd":"","inspSampTaskFrom":"","inspSampTrademark":"花艺","inspSampType":"","inspSampType_Name":"","inspSampZhpd":"","inspYear":"","invoiceNum":"","isDxpd":"","isFy":"","isJdcc":"","isLingy":"","isPrint":"","isScdwXsdw":"","isUpload":"","isXy":"","isZhpd":"","jylx":"","listBgfy":[],"listpic":[],"mulChooseSampType":"","newReportNumber":"","noRuleId":"","planBh":"","priceTjType":"","prodCatCode":"","prodCatCodeName":"","prodCode":"","prodName":"","pzId":0,"pzImgPath":"","pzName":"","pzTime":"","receiveDetail":"","reportResFormatItemType":"","reportResFormatItems":"","reportTime":"","requiredTime":"","returnDetail":"","returnReson":"","rwfpId":0,"rwfpName":"","rwfpTime":"","rwlyForReport":"","sampCreTimeEnd":"","sampCreTimeStart":"","sampNumberEnd":"","sampNumberStart":"","sampRequireTimeEnd":"","sampRequireTimeStart":"","sampSendDateEnd":"","sampSendDateStart":"","scdwAddress":"","scdwCode":"","scdwContact":"","scdwId":0,"scdwName":"长沙花艺面料厂","scdwPhone":"","searchEnteName":"","searchEnteType":"","searchSlrq":"","searchYyrq":"","signatureImgPath":"","sjType":"","sjdwAddress":"","sjdwCode":"","sjdwContact":"","sjdwId":0,"sjdwName":"","sjdwPhone":"","sjrq":"","spotCheckAddress":"","spotCheckBaseAmout":"","spotCheckComName":"","spotCheckDate":"","spotCheckDateStr":"","spotCheckNumber":"","spotCheckPerson":"","tjEndDay":"","tjMonth":"","tjProdCat":"","tjStartDay":"","tjType":"","tjTypeVal":"","tjYear":"","topNumber":"","updateTime":"","updateUser":0,"webuserId":"7198b69a333941f39cc2398e89b39172","wt_sjdw":"","wtdwAddress":"","wtdwCode":"","wtdwContact":"","wtdwId":0,"wtdwName":"长沙金慧睿信息科技有限公司","wtdwPhone":"","ypxxBhgxm":"","zjId":0,"zjImgPath":"","zjName":""},{"arrKeys":"","bgbzId":0,"bgbzName":"","bgbzTime":"","c_syrq":"","contrastMonth1":"","contrastMonth2":"","contrastYear1":"","contrastYear2":"","copyCount":"","copyFields":"","createrTime":"2020-02-08 22:41:31","createrTimeStr":"","creator":0,"creatorName":"","deptRequireTime":"","deptRequireTimeEnd":"","deptRequireTimeStart":"","enteDiscount":"","enteGzr":"","enterpriseAreaCode":"","filePath":"","finishTime":"","fsId":0,"fsImgPath":"","fsName":"","fsTime":"","hasIndex":"","insertformat":"","inspDeptCode":"","inspField":"","inspItemCode":"","inspItemJson":"","inspItemResultJson":"","inspItemUnquality":"","inspLingyJson":"","inspReceiveTime":"","inspReceiveTimeEnd":"","inspReceiveTimeStart":"","inspReceiveUserName":"","inspSampAccording":"","inspSampAmount":"","inspSampBatchNum":"","inspSampBqpd":"","inspSampBz":"","inspSampCheckCondition":"","inspSampCheckDate":"","inspSampCheckPerson":"","inspSampColor":"蓝色","inspSampDepartment":"","inspSampDepartmentName":"","inspSampDiscount":"","inspSampExpressDate":"2020-01-23 00:00:00","inspSampExpressName":"邮政","inspSampExpressNum":"9897792942420","inspSampFrom":"","inspSampFrom_Name":"","inspSampFyxx":"","inspSampGoods":"","inspSampGoodsNum":"","inspSampGrade":"","inspSampGzr":"","inspSampId":"200208171320274845696","inspSampIdentify":"","inspSampIsQualified":"0","inspSampIsQualified_Name":"","inspSampItem":"","inspSampItemCount":"","inspSampItemPriceSum":"","inspSampJjSjdh":"","inspSampJjSjr":"","inspSampJjdz":"","inspSampKhyq":"","inspSampLocation":"","inspSampName":"运动服11","inspSampPayId":0,"inspSampPayName":"","inspSampPayType":"","inspSampPic":"","inspSampPredictDate":"2020-02-19 17:00:00","inspSampPredictDateStr":"","inspSampPrice":"","inspSampQueryNumber":"","inspSampRemaining":"","inspSampReportBz":"","inspSampReportCount":"","inspSampReportDate":"","inspSampReportDateStr":"","inspSampReportFirstPage":"","inspSampReportFirstPagePath":"","inspSampReportNumber":"W20200001","inspSampReportPage":"","inspSampReportPageName":"","inspSampReportPagePath":"","inspSampReportReceive":"","inspSampReportSeal":"","inspSampResult":"","inspSampSafeCategory":"","inspSampSendDate":"","inspSampSendDateStr":"","inspSampSendPerson":"石柳","inspSampSpecification":"160/85","inspSampStage":"end","inspSampStage_Name":"结束","inspSampStandard":"","inspSampState":"2","inspSampState_Name":"","inspSampSwpd":"","inspSampTaskFrom":"","inspSampTrademark":"花艺","inspSampType":"","inspSampType_Name":"","inspSampZhpd":"","inspYear":"","invoiceNum":"","isDxpd":"","isFy":"","isJdcc":"","isLingy":"","isPrint":"","isScdwXsdw":"","isUpload":"","isXy":"","isZhpd":"","jylx":"","listBgfy":[],"listpic":[],"mulChooseSampType":"","newReportNumber":"","noRuleId":"","planBh":"","priceTjType":"","prodCatCode":"","prodCatCodeName":"","prodCode":"","prodName":"","pzId":0,"pzImgPath":"","pzName":"","pzTime":"","receiveDetail":"","reportResFormatItemType":"","reportResFormatItems":"","reportTime":"","requiredTime":"","returnDetail":"","returnReson":"","rwfpId":0,"rwfpName":"","rwfpTime":"","rwlyForReport":"","sampCreTimeEnd":"","sampCreTimeStart":"","sampNumberEnd":"","sampNumberStart":"","sampRequireTimeEnd":"","sampRequireTimeStart":"","sampSendDateEnd":"","sampSendDateStart":"","scdwAddress":"","scdwCode":"","scdwContact":"","scdwId":0,"scdwName":"长沙花艺面料厂","scdwPhone":"","searchEnteName":"","searchEnteType":"","searchSlrq":"","searchYyrq":"","signatureImgPath":"","sjType":"","sjdwAddress":"","sjdwCode":"","sjdwContact":"","sjdwId":0,"sjdwName":"","sjdwPhone":"","sjrq":"","spotCheckAddress":"","spotCheckBaseAmout":"","spotCheckComName":"","spotCheckDate":"","spotCheckDateStr":"","spotCheckNumber":"","spotCheckPerson":"","tjEndDay":"","tjMonth":"","tjProdCat":"","tjStartDay":"","tjType":"","tjTypeVal":"","tjYear":"","topNumber":"","updateTime":"","updateUser":0,"webuserId":"7198b69a333941f39cc2398e89b39172","wt_sjdw":"","wtdwAddress":"","wtdwCode":"","wtdwContact":"","wtdwId":0,"wtdwName":"长沙金慧睿信息科技有限公司","wtdwPhone":"","ypxxBhgxm":"","zjId":0,"zjImgPath":"","zjName":""}]};
	if(json.hasOwnProperty("records")){
		$("#totalNum").html('共找到<span class="j-color--active">'+json.records+'</span>条数据');
		if(parseInt(json.total)<=1){
			$("#nextPageDiv").hide();
		}else{
			$("#nextPageDiv").show();
		}
		if(parseInt(pageNum)==parseInt(json.total)){
			$("#nextPageBtn").text("没有更多数据了");
			$("#nextPageBtn").attr('disabled',true);  
		}
		var urladd="<%=request.getContextPath()%>/webSample/toAdd.do?key=";
		var html ="";
		for (var i = 0;i < json.rows.length; i++) {
			var d=json.rows[i];
			var url=urlEdit;	
			var rq =d.hasOwnProperty("inspSampExpressDate")?d.inspSampExpressDate:"";
			if(rq!=""){rq=rq.substring(0,10);}
			html+="<div class='j_item j_item--style01'>";
			html+="<div class='j_item__hd'>";
			html+="<div class='mui-row'>";
			html+="<div class='mui-col-sm-5 mui-col-xs-5'><div class='j_dl--show01'><div class='j_dd--block'><strong>"+rq+"</strong></div><div class='j_dt--block'>寄样日期</div></div></div>";			
			//html+="<div class='mui-col-sm-4 mui-col-xs-4'><div class='j_dl--show01'><div class='j_dd--block'>"+(d.hasOwnProperty("inspSampExpressNum")?d.inspSampExpressNum:"")+"</div><div class='j_dt--block'>快递单号</div></div></div>";			
			var stage="";
			if(d.inspSampState=="0"){
				stage="未提交";
				if(d.returnReson!=""){stage="退回";}
			}else if(d.inspSampState=="1"){
				stage="待受理";
			}else if(d.inspSampState=="2"){
				stage="已受理";
				if(d.hasOwnProperty("inspSampStage_Name")&&d.inspSampStage_Name!=""){
					stage=d.inspSampStage_Name;
				}
			}
			html+="<div class='mui-col-sm-7 mui-col-xs-7'><div class='j_dl--show01'><div class='j_dd--block'>"+stage+"</div><div class='j_dt--block'>当前环节</div></div></div>";			
			html+="</div>";
			html+="</div>";
			html+="<div class='j_item__bd'>";	
			html+="<div class='j_item__title'><div class='j_dl--table'><div class='j_dt'>报告编号：</div><div class='j_dd'><strong>"+d.inspSampReportNumber+"</strong></div></div></div>";
			html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>样品名称：</div><div class='j_dd'>"+d.inspSampName+"</div></div></div>";
			html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>样品状态：</div><div class='j_dd'>"+(d.hasOwnProperty("inspSampColor")?d.inspSampColor:"/")+"</div></div></div>";
			html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>生产单位：</div><div class='j_dd'>"+(d.hasOwnProperty("scdwName")?d.scdwName:"/")+"</div></div></div>";			
			html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>规格型号：</div><div class='j_dd'>"+(d.hasOwnProperty("inspSampSpecification")?d.inspSampSpecification:"/")+"</div></div></div>";
			var inspSampIsQualified=d.hasOwnProperty("inspSampIsQualified")?d.inspSampIsQualified:"";
			if(d.hasOwnProperty("inspSampStage")&&d.inspSampStage=="end"){
				if(inspSampIsQualified=="1"){inspSampIsQualified="合格";}
				else if(inspSampIsQualified=="0"){inspSampIsQualified="不合格";}
				else if(inspSampIsQualified=="2"){inspSampIsQualified="不判";}
				else{inspSampIsQualified="";}
			}else{
				inspSampIsQualified="尚未完成检测";
			}			
			html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>判定结果：</div><div class='j_dd'>"+inspSampIsQualified+"</div></div></div>";
			//html+="<div class='j_item__txt'><div class='j_dl--table'><div class='j_dt'>签发日期：</div><div class='j_dd'>"+d.inspSampReportDate.substring(0,10)+"</div></div></div>";
			html+="</div>";	
			html+='	<div class="j_item__tools">';
			html+='		<a href="'+url+d.inspSampId+'" class="mui-btn mui-btn-success">打开</a>';	
			html+='		<a href="'+urladd+d.inspSampId+'"  class="mui-btn mui-btn-success">复制</a>';
			html+='	</div>';	
			html+="</div>";	
		}
		$("#divCur1").append(html);
	}else{
		$("#nextPageDiv").hide();
		$("#totalNum").html('共找到<span class="j-color--active">0</span>条数据');
		$("#divCur1").empty();
	}
}


$(function(){
	toGetDataList();	 
	$(".j-select--list .j_select__option").bind("tap",function(){
		$(this).parent().siblings(".j_select__control").children(".j_select__input").val(this.id);
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	
});

</script>
</body>
</html>