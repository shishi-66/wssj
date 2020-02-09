<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/jhr/css/web.css" />
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/jhr/js/jquery-1.9.1.min.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/lib/laypage/laypage.js"></script>
<title>报告查询</title>
</head>
<body>

<div class="list">
	<div class="list_search">
		<div class="list_search__row">
			<div class="layout--lr">
                <div class="layout__item">防伪查询码</div>
                <div class="layout__item">
                	<input type="text" id="inspSampQueryNumber" />
                </div>
			</div>
			<div class="layout--lr">                
                <div class="layout__item">寄件快递号</div>
                <div class="layout__item">
                	<input type="text" id="inspSampExpressNum" />
                </div>
			</div>
			
			<div class="layout--lr">                				                    
                <div class="layout__item">发票号</div>
                <div class="layout__item">
                	<input type="text" id="invoiceNum" />
                </div>
			</div>
			<div class="layout--lr">                
                <div class="layout__item">验证码</div>
                <div class="layout__item">
					<input type="text" id="imgCode" style="width:80px;" />
				</div>
				<div class="layout__item">
					<img id="codeImg" name="codeImg" style="height:26px" src="<%=request.getContextPath() %>/ImageCodeAction.img" onClick="reCode()" />
				</div>
			</div>
			<div class="layout--lr">
				<div class="layout__item"><button type="button" onclick="doSeach();" class="btn btn-small btn-primary">搜索</button></div>
			</div>	
		</div>
	</div>
	<div class="list_content">
		<table class="table--list--default table--striped table--hover">
			<thead><tr>
               	<th width="100">报告编号</th>
                <th width="180">样品名称</th>
				<th width="160">预约日期</th>
                <th width="100">样品状态</th>
                <th width="120">生产日期/批号</th>
                <th>生产/销售单位</th>
                <!--  <th width="160">委托单位</th>-->
                <th width="120">受理时间</th>
                <th width="90">当前环节</th>
                <th width="90">判定结果</th>
			</tr></thead>
			<tbody id ="div_list"></tbody>
		</table>
	</div>
	<div class="list_page">
		<div class="page-total">共有<span class="c-red"><strong> <span id="totalSpan">0</span></strong></span>条记录</div>
	</div>
</div>
</body>
<script type="text/javascript">
 
function initArg(){
    var obj = {};
    obj["inspSampQueryNumber"]=$("#inspSampQueryNumber").val();
    obj["inspSampExpressNum"]=$("#inspSampExpressNum").val();
    obj["invoiceNum"]=$("#invoiceNum").val();
    obj["imgCode"]=$("#imgCode").val();
	return obj;
}
//查询Grid数据
function doSeach(){
	if($("#inspSampQueryNumber").val()==""&&$("#inspSampExpressNum").val()==""&&$("#invoiceNum").val()==""){
		alert("请至少输入一个查询条件！");
	}else{
		if($("#inspSampExpressNum").val()=="/"||$("#invoiceNum").val()=="/"){
			alert("请输入有效的查询条件！");
		}else{
			var imgCode = $("#imgCode").val();
			if(imgCode==""){
				alert("请填写图形码");   
				return false;
			}
			var checkImgcode = checkCodeImg(imgCode);
			if(checkImgcode=="1"){
				var obj=initArg();
				initDataList(obj);
				reCode();
			}else{
				alert("图形码错误");   
				return false;
			}
			
		}
	}
}
function initDataList(obj){
	var url="<%=request.getContextPath() %>/webQuery/getSampList.do";
	gridNoPage(url,obj,"totalSpan","div_list",initRow);
}
var winw=(screen.availWidth-1)+"px";
var winh=(screen.availHeight-1)+"px";
function toReport(inspSampQueryNumber){
	try{
		var reportUrl="<%=request.getContextPath() %>/webQuery/toOpenReport.do?key="+inspSampQueryNumber;
		var sFeatures="dialogWidth="+winw+";dialogHeight="+winh+";dialogLeft=0;dialogTop=1;help=0;status=no;toolbar=no;location=no;menubar=no;";
		window.showModalDialog(reportUrl,'',sFeatures);
	}catch(e){
		window.open(reportUrl,'','modal=yes,width='+winw+',height='+winh+',resizable=no,scrollbars=yes');
	}
}
function initRow(data){
	var list=new Array();	
	list.push("<tr><td>");
	if(data.filePath==""||data.inspSampStage!="end"){
		list.push(data.inspSampReportNumber);
	}else{
		list.push("<a href='javascript:;' onclick='toReport(\""+data.inspSampQueryNumber+"\")' >"+data.inspSampReportNumber+"</a>");
	}
	list.push("</td><td>"+data.inspSampName+"</td>");
	list.push("<td>"+data.inspSampPredictDate.substring(0,16)+"</td>");
	list.push("<td>"+data.inspSampColor+"</td>");
	list.push("<td>"+data.inspSampBatchNum+"</td>");
	list.push("<td>"+data.scdwName+"</td>");
	//list.push("<td>"+data.wtdwName+"</td>");
	list.push("<td>"+data.createrTime.substring(0,16)+"</td>");
	list.push("<td>"+data.inspSampStage_Name+"</td>");
	var jyjg="";
	if(data.inspSampStage=="end"){
		jyjg=data.inspSampIsQualified_Name;
	}
	list.push("<td>"+jyjg+"</td>");
	list.push("<tr>");	
	return list.join("");
} 
function reCode(){
	var img = document.getElementById("codeImg");  
	document.getElementById("imgCode").value="";
    img.src ="<%=request.getContextPath() %>/ImageCodeAction.img?"+new Date().getTime();  
} 
//获取图片验证码验证的返回值
function checkCodeImg(code){
	var ret="0";
	if(code!=""){
		$.ajax({
			url : "<%=request.getContextPath() %>/webQuery/verificationCode.do",
			type : "post", async: false, dataType : "json",
			data:{
				codeName:"rand",
				code:code
			},
			success:function(msg) {
				ret=msg.rs; 
        	 }});
	}
	return ret;
}
</script>
</html>