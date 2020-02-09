<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
	<form action="" method="post" id="reg-form">
	<div class="j_spe_list_bgcx">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12">
					<input type="text" id="cxm" name="cxm" placeholder="请输入查询码" />
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<input type="text" name="imgCode" id="imgCode" placeholder="请输入验证码"/>
				</div>
				<div class="col-4">
					<img id="codeImg" name="codeImg" height="40" width="108" src="<%=request.getContextPath() %>/ImageCodeAction.img" onClick="reCode()" />
				</div>
				<div class="col-4">
					<span onClick="reCode()" class="mui-icon mui-icon-refreshempty codeRefresh"></span>
				</div>
			</div>
		</div>	
		<div class="container-fluid">
			<div class="row">
				<div class="col-4">
					<button type="button" class="mui-btn mui-btn-block mui-btn-primary"
						onclick="doSeach(1);">报告查询</button>
				</div>
				<div class="col-4">
					<button type="button" class="mui-btn mui-btn-block mui-btn-primary"
						onclick="doSeach(2)">二维码查询</button>
				</div>
				<div class="col-4">
					<button type="button" class="mui-btn mui-btn-block mui-btn-primary"
						onclick="doSeach(3)">快递查询</button>
				</div>						
			</div>
		</div>
	</div>
	</form>
	<div class="j_spe_show_bgcx" id="bgxx">
		<div id="div-content">
		</div>
	</div>
	<div class="j_spe_show_bgcx" id="bgxx-err">
		<div id="div-err"></div>
	</div>	
</div>
</body>
<script type="text/javascript">
function doSeach(flag){
	var cxm = $("#cxm").val();
	if(cxm==""){
		showTipMessage("请填写查询码！");
		return false;
	}
	var imgCode = $("#imgCode").val();
	if(imgCode==""){
		showTipMessage("请填写图形验证码！");   
		return false;
	}
	var checkImgcode = checkCodeImg(imgCode);
	if(checkImgcode=="1"){
		clearRs();
		if(flag=="1"){getSampInfo(cxm,imgCode);}
		else if(flag=="2"){getImg(cxm);}
		else if(flag=="3"){getExpress(cxm,imgCode);}
		reCode();
	}else{
		showTipMessage("图形验证码错误或已失效！");   
		return false;
	}
}
function getSampInfo(cxm,imgCode){
	var json=getAjaxData("<%=request.getContextPath()%>/webQuery/getSampObj.do",{cxm:cxm,imgCode:imgCode},false); 
	$("#bgxx").show();
	$("#bgxx-err").hide();
	if(json.status=="1"){
		if(json.obje){
			var htmls='<div class="j_dl_box">';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">样品名称：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampName+'</div></div>';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">样品状态：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampColor+'</div></div>';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">批号：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampBatchNum+'</div></div>';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">预计出证日期：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampPredictDateStr+'</div></div>';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">当前环节：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampStage_Name+'</div></div>';
			htmls+='<div class="j_dl j_dl--table"><div class="j_dt">判定结果：</div><div class="j_dd j_dd--text_right">'+json.obje.inspSampIsQualified_Name+'</div></div>';
			if(json.obje.filePath!=""){
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">报告下载：</div><div class="j_dd j_dd--text_right"><a href="#" onclick=\"openPdf()\">点此下载报告</a></div></div>';
			}
			htmls+='</div>';
			$("#div-content").html(htmls);
		}
	}else{
		$("#bgxx").hide();
		$("#bgxx-err").show();
		$("#div-err").text(json.info);
		return false;
	}
}
function getImg(cxm){
	$("#bgxx").show();
	$("#div-content").html("<div class='div-ewm'><img src='<%=request.getContextPath()%>/qrimg?key="+cxm+"' /></div>");
}
function getExpress(cxm,imgCode){
	var json=getAjaxData("<%=request.getContextPath()%>/webQuery/getExpress.do",{cxm:cxm,imgCode:imgCode},false); 
	$("#bgxx").show();
	$("#bgxx-err").hide();
	if(json.hasOwnProperty("rc")){
		$("#bgxx").hide();
		$("#bgxx-err").show();
		$("#div-err").text(json.rs);
	}else{	
		if(json.length==0){
			$("#div-content").html("没有找到快递信息");
		}else{
			var htmls='<div class="j_dl_box">';
			for(var i=0;i<json.length;i++){
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">快递公司：</div><div class="j_dd j_dd--text_right">'+json[i].expressName+'</div></div>';
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">快递单号：</div><div class="j_dd j_dd--text_right">'+json[i].expressNumber+'</div></div>';
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">快递内容：</div><div class="j_dd j_dd--text_right">'+json[i].expressType+'</div></div>';
				var rq = json[i].expressDate;
				if(rq!=""&&rq.length>=10){rq=rq.substring(0,10);}			
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">寄出日期：</div><div class="j_dd j_dd--text_right">'+rq+'</div></div>';
				htmls+='<div class="j_dl j_dl--table"><div class="j_dt">备注：</div><div class="j_dd j_dd--text_right">'+json[i].sampBz+'</div></div>';
				if(i<json.length-1){
					htmls += "<hr>";
				}
			}
			htmls += "</div>";
			$("#div-content").html('<div class="bgxx-kd">'+htmls+'</div>');
		}
	}
}
function clearRs(){
	$("#div-content").html("");
	$("#div-err").text("");
}
function openPdf(){
	var url="<%=request.getContextPath()%>/webQuery/openReportPdf.do?cateogry="+$('#cxm').val();
	window.open(url);
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