//---------------------检验管理列表用----------------------------------
//视图查询条件，编制-复审-批准-打印 公用：
function getInspSampQueryCommon(){
	var obj={};
	obj["inspSampReportNumber"]=$("#inspSampReportNumber").val();
	obj["inspSampName"]=$("#inspSampName").val();
	obj["searchYyrq"]=$("#searchYyrq").val();
	obj["searchEnteType"]=$("#searchEnteType").val();
	obj["searchEnteName"]=$("#searchEnteName").val();
	obj["orderFields"]="inspSampReportNumber";
	obj["order"]="asc";
	return obj;
}
//视图列表显示，编制-复审-批准-打印 公用：样品编号、样品名称、预约日期、检验类别、样品状态、委托单位、受检单位
function addInspSampRowCommon(d){
	var hiddenInput="<input type='hidden' name='row_id' value='"+d.inspSampId+"' >"; //公用，主键，必须要有
	hiddenInput +=  "<input type='hidden' name='row_inspSampStage' value='"+(d.hasOwnProperty('inspSampStage')?d.inspSampStage:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspSampState' value='"+(d.hasOwnProperty('inspSampState')?d.inspSampState:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspSampReportNumber' value='"+d.inspSampReportNumber+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspSampQueryNumber' value='"+d.inspSampQueryNumber+"' >";
	var requiredTime=(d.hasOwnProperty('requiredTime')?d.requiredTime:'');
	if(requiredTime!=""&&requiredTime.length>=16){requiredTime=requiredTime.substring(0,16);}
	hiddenInput +=  "<input type='hidden' name='row_requiredTime' value='"+requiredTime+"' >";
	var tdCheckBox="<td align='center'><input type='checkbox' name='wTableCommon_chkbox' class='checkbox' />";
	tdCheckBox += hiddenInput+"</td>";
	var rowHtml="<tr>"+tdCheckBox;
	rowHtml +="<td align='center'><a href='javascript:;' onclick=toEdit('"+d.inspSampId+"');";
	rowHtml +=" style='color:#03F' >"+d.inspSampReportNumber+"</a></td>";
	rowHtml +="<td onclick='tdSelectRow(this)'>";
	if(d.inspSampState.indexOf('back_back')!=-1){
		rowHtml +="<font color='#3CB371'> ";
	}else{
		if(d.inspSampState.indexOf('back')!=-1){
			rowHtml +="<font color='red'> ";
		}
	} 
	rowHtml +=d.inspSampName+"</font></td>";
	var yyrq = d.hasOwnProperty('inspSampPredictDate')?d.inspSampPredictDate:'';
	if(yyrq!=""){
		if("<%=currDay%>"==(yyrq.substring(0,10))){
			yyrq="<font color='red'>"+yyrq.substring(0,16)+"</font>";
		}else{
			if("<%=currDay%>">(yyrq.substring(0,10))){
				yyrq="<font color='#B8860B'>"+yyrq.substring(0,16)+"</font>";
			}else{
				yyrq=yyrq.substring(0,16);
			}
		}
	}
	rowHtml += "<td onclick='tdSelectRow(this)' align='center'>"+yyrq+"</td>";
	rowHtml += "<td onclick='tdSelectRow(this)' align='center'>"+(d.hasOwnProperty('inspSampType_Name')?d.inspSampType_Name:'')+"</td>";
	rowHtml += "<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('inspSampColor')?d.inspSampColor:'')+"</td>";
	rowHtml += "<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('wtdwName')?d.wtdwName:'')+"</td>";
	rowHtml += "<td onclick='tdSelectRow(this)'>"+(d.hasOwnProperty('sjdwName')?d.sjdwName:'')+"</td>";
	rowHtml += "</tr>";
	$("#div_list").append(rowHtml);
}
//视图页面导出报告
function listExportBg(basepath){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length!=1){
		alert("请选择一行数据");
	}else{
		window.open(basepath+"/insp/export_bg.do?key="+selectedRowIds);
	}
}
//视图页面打开报告
function listViewBg(basepath){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length!=1){
		alert("请选择一行数据");
	}else{
		window.open(basepath+"/insp/jybgActivexView.do?key="+selectedRowIds);
	}
}
function doOpenInspFlowForList(){  //流程记录
	var key="";var bh="";
	var inputCheckboxArr = $("#wTableCommon input[type='checkbox']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			var id=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_id']").val();
			bh=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_inspSampReportNumber']").val();
			if(key==""){key=id;}
			else{key+=","+id;}
		}
	}
	if(key==""||key.indexOf(",")!=-1){
		alert("请选择一行数据");
	}else{
		document.getElementById("inspSampId").value=key;
		$("#dialogInspFlowTitle").text(bh+" 的流程记录");
		$("#dialogInspFlow").show();
		initDialogInspFlowData();  //执行弹出框里面的函数
	}
}
//送下一环节
function doToNext(url){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请至少选择一条数据");
	}else{
		if(window.confirm("确定要送下一环节吗？")){
			var d=getAjaxData(url,{key:selectedRowIds},false);
			if(d.rc == "success"||d.rc == "1"){
				seachByPage();
			}else{
				alert("操作失败！");
			} 
		}
	}
}
//退回上一环节
function goStageBack(url){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请至少选择一条数据");
	}else{
		$("#dialogInspSampBack").show();
		$("#dialogCallBackFunName").val('dialogCallBackInspSampBack'); //回调函数名
		$("#dialogSetObjIdId").val(selectedRowIds);  //存储勾选的id
		$("#dialogSetObjNameId").val(url); //存储url
	}
}
function dialogCallBackInspSampBack(backReason){
	$.ajax({
		type: "POST",async: false,dataType: 'json',cache:false,
		url: $("#dialogSetObjNameId").val(),
		data:{key:$("#dialogSetObjIdId").val(),backReason:backReason},
		success: function(data){
			seachByPage();
			$("#dialogInspSampBack").hide();
		}
	});
}
//退回指定的环节
function goStageBackAnyone(basePath,stagestr){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请至少选择一条数据");
	}else{
		$("#dialogCallBackFunName").val('dialogCallBackInspSampBackAny'); //回调函数名
		$("#dialogSetObjIdId").val(selectedRowIds);  //存储勾选的id
		$("#dialogSetObjNameId").val(basePath+"/insp/changeStage.do"); //存储url
		var stageobj = document.getElementById("dialogInspSampBackAny_backStage");
		stageobj.options.length=0;
		stageobj.options.add(new Option("",""));
		var arr1=stagestr.split(",");
		for(var i=0;i<arr1.length;i++){
			var sname="";
			if(arr1[i]=="ypdj"){sname="样品登记";}
			else if(arr1[i]=="jyjg"){sname="检验结果";}
			else if(arr1[i]=="bgbz"){sname="报告编制";}
			else if(arr1[i]=="fs"){sname="复审";}
			if(sname!=""){
				$("#dialogInspSampBackAny_backStage").append("<option value='"+arr1[i]+"'>"+sname+"</option>");
			}
		}
		$("#dialogInspSampBackAny").show();
	}
}
function dialogCallBackInspSampBackAny(backStage,backReason){
	$.ajax({
		type: "POST",async: false,dataType: 'json',cache:false,
		url: $("#dialogSetObjNameId").val(),
		data:{ids:$("#dialogSetObjIdId").val(),backReason:backReason,backStage:backStage},
		success: function(data){
			seachByPage();
			$("#dialogInspSampBackAny").hide();
		}
	});
}
function doExportDdd(basePath){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请至少选择一条数据");
	}else{
		window.open(basePath+"/insp/export_ddd.do?key="+selectedRowIds);
	}
}
function doPrintDdd(basePath,pagename){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请至少选择一条记录");
	}else{
		window.open(basePath+"/inspYpdj/toPrint_ypxx.do?keys="+selectedRowIds+"&p="+pagename);
	}
}
function doSelectPrint(thisobj,basePath){
	if($("#printSelect").val()=="printTmLodop"){
		printTM(basePath,$("#printSelect").val());
		thisobj.selectedIndex=0;
	}else{
		var arrRowIndex=getSelectedRowIds();
		if(arrRowIndex.length==0){
			alert("请至少选择一条记录");
		}else{
			var url =basePath+"/inspYpdj/toPrint_ypxx.do?keys="+selectedRowIds+"&p=";
		   	var pagename="";
			if($("#printSelect").val()!=""){
				pagename=$("#printSelect").val();
			}
			thisobj.selectedIndex=0;
			window.open(url+pagename);
		}
	}
}
function printTM(basePath,pagename){
	var str="";
	var inputCheckboxArr = $("#wTableCommon input[type='checkbox']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			var time=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_requiredTime']").val();
			var tm=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_inspSampQueryNumber']").val();
			var acount=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_count1']").val();
			var bcount=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_count2']").val();
			if(str==""){
				str=tm+"_" + acount+ "_"+bcount+ "_"+time;
			}else{
				str=str+","+tm+"_" + acount+ "_"+bcount+ "_"+time;
			}
		}
	}
	if(str==""){
		alert("请至少选择一行数据");
	}else{
		exportByPost(basePath+"/inspYpdj/toPrint_ypxx.do",{keys:str,p:pagename});
	}
}
function doCopy(){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length!=1){
		alert("请选择一行数据");
	}else{
		$("#dialogInspSampCopy").show();
		$("#dialogSetObjIdId").val(selectedRowIds); //存储勾选的样品id
	}
}
