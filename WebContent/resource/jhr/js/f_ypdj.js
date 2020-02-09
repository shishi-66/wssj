//样品登记相关：受理、流程监控 
//同步检验项目的要求完成时间、检验组、任务分配时间,流程监控用
function jyxm_tb_sj12_jyz(){
	var sj = $("#yqwcsj1").val();
	var jyz = $("#jyzmc").val();
	if(sj==""&&jyz==""){
		showWarn("时间或检验组为空！",3000);
		return;
	}
	var inputCheckboxArr = $("#wTableInspItem input[name='wTableInspItem_chkbox']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			flag=true;
			var objtr =$(inputCheckboxArr[i]).closest("tr");
			if(sj!=""){
				$(objtr).find("input[name='row_requiredTime']").val(sj);
			}
			if(jyz!=""){
				$(objtr).find("select[name='row_inspTeamId']").val(jyz);
			}
		}
	}
	if (flag==false) {
		showWarn("请选择要同步的行！",3000);
		return;
    }
}
function jyxmall_batchSetVal(objname,vals){ //标记不判项目,不需要选择项目
	var inputCheckboxArr = $("#wTableInspItem input[name='wTableInspItem_chkbox']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		var objtr =$(inputCheckboxArr[i]).closest("tr");
		var batObj=$(objtr).find("input[name='row_"+objname+"']");
		if(batObj.val()==undefined){batObj=$(objtr).find("textarea[name='row_"+objname+"']");}
		if(batObj.val()==undefined){batObj=$(objtr).find("select[name='row_"+objname+"']");}
		if(batObj.val()!=undefined){
			batObj.val(vals);
		}
	}
} 
function jyxm_batchSetVal(objname,vals){ //标记不判项目
	var flag=false;
	var inputCheckboxArr = $("#wTableInspItem input[name='wTableInspItem_chkbox']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			flag=true;
			var objtr =$(inputCheckboxArr[i]).closest("tr");
			var batObj=$(objtr).find("input[name='row_"+objname+"']");
			if(batObj.val()==undefined){batObj=$(objtr).find("textarea[name='row_"+objname+"']");}
			if(batObj.val()==undefined){batObj=$(objtr).find("select[name='row_"+objname+"']");}
			if(batObj.val()!=undefined){
				batObj.val(vals);
			}
		}
	}
	if(flag==false){
		alert("没有选择任何行");
	}
}

function sameTo(mc,frommc){
	$("#"+mc+"Id").val($("#"+frommc+"Id").val());
	$("#"+mc+"Name").val($("#"+frommc+"Name").val());
	if(mc!="inspSampPay"){
		$("#"+mc+"Code").val($("#"+frommc+"Code").val());
		$("#"+mc+"Address").val($("#"+frommc+"Address").val());
		$("#"+mc+"Contact").val($("#"+frommc+"Contact").val());
		$("#"+mc+"Phone").val($("#"+frommc+"Phone").val());
		$("#"+mc+"gzr").val($("#"+frommc+"gzr").val());
		$("#"+mc+"discount").val($("#"+frommc+"discount").val());
		$("#"+mc+"isxy").val($("#"+frommc+"isxy").val());
		$("#"+mc+"dept").val($("#"+frommc+"dept").val());
		if(mc==$("input[name='radio-jfdw']:checked").val()){
			$("#inspSampPayId").val($("#"+frommc+"Id").val());
			$("#inspSampPayName").val($('#'+frommc+"Name").val());
			if($("#inspSampType").val().indexOf("wt")!=-1){
				computeGzrDiscountByEnte($("#"+mc+"gzr").val(),$("#"+mc+"discount").val(),$("#"+mc+"isxy").val(),$("#"+mc+"dept").val());
			}
		}
	}else{
		if($("#inspSampType").val().indexOf("wt")!=-1){
			computeGzrDiscountByEnte($("#"+frommc+"gzr").val(),$("#"+frommc+"discount").val(),$("#"+frommc+"isxy").val(),$("#"+mc+"dept").val());
		}
	}
}
function toEnabledEnte(mc){
	$('#'+mc+"Name").attr('readonly',false);
}
function blurEnteName(mc){
	var ishygzr=0;
	if(mc=="inspSampPay"){
		$("#inspSampPayId").val("");
		ishygzr=1;
	}else{
		if(mc==$("input[name='radio-jfdw']:checked").val()){
			if($("#inspSampPayName").val()!=$('#'+mc+"Name").val()){ //手动录入的企业名称发生了变化，需要清空id
				$("#"+mc+"Id").val(""); 
				$("#inspSampPayId").val("");
				$("#inspSampPayName").val($('#'+mc+"Name").val());
				ishygzr=1;
			}
		}
	}
	if(ishygzr==1){
		//还原工作日和折扣
		if($("#inspSampType").val().indexOf("wt")!=-1){
			$("#inspSampGzr").val(parseInt($("#wtgzr").val()));
			setYuYueRiQi(document.getElementById("inspSampGzr"),parseInt($("#wtgzr").val()));
			$("#inspSampDiscount").val(1);
			blurDiscount(document.getElementById("inspSampDiscount"));
		}else{
			$("#inspSampGzr").val(parseInt($("#jdgzr").val()));
			setYuYueRiQi(document.getElementById("inspSampGzr"),parseInt($("#jdgzr").val()));
		}
	}
}
//检验项目检验费输入框的blur事件
function fun_itempriceBlur(obj){
	if(obj.value==""||isNaN(obj.value)){
		alert("检验费格式不正确，只能输入数字");
		obj.value=obj.title;
	}else{
		if(obj.value!=obj.title){
			obj.title=obj.value;
		}
	}
	setItemPricesAdd();
} 
function setItemPricesAdd(){
	var objs = $("#wTableInspItem input[name='row_inspItemPrice']");
	var jyxmPrices=0;
	for(var i=0;i<objs.length;i++){
		jyxmPrices=jyxmPrices+parseFloat(objs[i].value)*1;
	}
	document.getElementById("span_xmgs").innerHTML="（共 "+objs.length+" 个项目 "+jyxmPrices+" 元）";
	$('#inspSampItemCount').val(objs.length);
	$('#inspSampItemPriceSum').val(jyxmPrices);
	if(global_isFree&&global_isFree=="1"){
		$('#inspSampPrice').val(0);
	}else{
		$('#inspSampPrice').val(toDecimal(jyxmPrices*parseFloat($('#inspSampDiscount').val())));
	}
} 

function blurFyxx(objthis){
	var re = /，|；|、|;/gi;
	objthis.value = objthis.value.replace(re,",");
}
function editWTableInspDept(){ //新增、删除检验项目，或修改检验科室时，要更新检验科室要求完成时间表
	if($("#isLingyang").val()=="1"){
		var selectDeptArr = $("#wTableInspItem select[name='row_deptCode']");
		var deptarr=[];
		for(var i=0;i<selectDeptArr.length;i++){
			var deptcode=selectDeptArr[i].options[selectDeptArr[i].selectedIndex].value;
			if(deptarr.indexOf(deptcode)==-1){
				deptarr.push(deptcode);
			}
		}
		if(deptarr.length==0){
			$("#bodyInspDeptData").empty();
		}else{
			//要删除的检验科室
			var inspRecRetIdarr = $("#wTableInspDept input[name='row_inspRecRetId']");
			for(var j=0;j<inspRecRetIdarr.length;){
				if(inspRecRetIdarr[j].value==""){
					var hasDept=false;
					var dept=$(inspRecRetIdarr[j]).closest("tr").find("select[name='row_deptCode']").val();
					for(var i=0;i<deptarr.length;i++){ 
						if(dept==deptarr[i]){
							hasDept=true;break;
						}
					}
					if(hasDept==false){ 
						$(inspRecRetIdarr[j]).closest("tr").remove();
						inspRecRetIdarr = $("#wTableInspDept input[name='row_inspRecRetId']");
						j=0;continue;
					}
				}
				j=j+1;
			}
			//计算要新增的检验科室
			var selectDeptArr = $("#wTableInspDept select[name='row_deptCode']");
			var shtml="";
			for(var i=0;i<deptarr.length;i++){ 
				var hasDept=false;
				for(var j=0;j<selectDeptArr.length;j++){
					if(selectDeptArr[j].options[selectDeptArr[j].selectedIndex].value==deptarr[i]){
						hasDept=true;break;
					}
				}
				if(hasDept==false){ 
					var inspRecRetId="";var requiredTime="";var lyr="&nbsp;";var lysj="&nbsp;";
					for(var k=0;k<jsonLingyData.length;k++){
						if(jsonLingyData[k].deptCode==deptarr[i]){
							inspRecRetId=jsonLingyData[k].inspRecRetId;
							requiredTime=jsonLingyData[k].requireTime;
							lyr=jsonLingyData[k].inspReceiveUserName;
							lysj=jsonLingyData[k].inspReceiveTime;
							break;
						}
					}
					shtml+="<tr><td><input type='hidden' name='row_inspRecRetId' value='"+inspRecRetId+"' >";
					shtml+="<select name='row_deptCode' style='width:140px' class='select input-block-level' >";
					for(var k=0;k<jsonJyksData.length;k++){
						shtml +=  "<option value='"+jsonJyksData[k].value+"' ";
						if(jsonJyksData[k].value==deptarr[i]){
							shtml +=  " selected ";
						}
						shtml +=  " >"+jsonJyksData[k].name+"</option>";
					}
					shtml += "</select></td>";
					if(requiredTime==""){requiredTime=$("#requiredTime").val();}
					if(requiredTime.length>=16){requiredTime=requiredTime.substring(0,16);}
					shtml+="<td><input name='row_requireTime' value='"+requiredTime+"' onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})\" type='text' class='input-block-level' /></td>";
					shtml+="<td>"+lyr+"</td><td>"+lysj+"</td>";
					shtml+="<td><a href='javascript:;' onclick='delWTableInspDeptRow(this)' class='btn btn-success btn-small'>删除</a></td></tr>";
				}
			}
			if(shtml!=""){
				$("#bodyInspDeptData").append(shtml);
			}
		}
	}
}

function wtiteInspDeptTable(basePath,inspSampId){
	if($("#isLingyang").val()=="1"){
		$ .ajax({
			url: basePath+"/inspYpdj/getSampLingy.do",
			type: "POST",async: false,dataType: 'json',cache:true,
			data:{key:inspSampId},
			success: function(data1){
				if(data1.length>0){
					jsonLingyData=data1;
					var shtml="";
					for(var i=0;i<data1.length;i++){
						shtml+="<tr><td><input type='hidden' name='row_inspRecRetId' value='"+data1[i].inspRecRetId+"' >";
						shtml+="<select name='row_deptCode' style='width:140px' class='select input-block-level' >";
						for(var k=0;k<jsonJyksData.length;k++){
							shtml +=  "<option value='"+jsonJyksData[k].value+"' ";
							if(jsonJyksData[k].value==data1[i].deptCode){
								shtml +=  " selected ";
							}
							shtml +=  " >"+jsonJyksData[k].name+"</option>";
						}
						shtml += "</select></td>";
						var requiredTime=data1[i].requireTime;
						if(requiredTime==""){requiredTime=$("#requiredTime").val();}
						if(requiredTime.length>=16){requiredTime=requiredTime.substring(0,16);}
						shtml+="<td><input name='row_requireTime' value='"+requiredTime+"' ";
						shtml+=" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})\" type='text' class='input-block-level' /></td>";
						shtml+="<td>"+(data1[i].inspReceiveUserName==""?"&nbsp;":data1[i].inspReceiveUserName)+"</td>";
						shtml+="<td>"+(data1[i].inspReceiveTime==""?"&nbsp;":data1[i].inspReceiveTime)+"</td>";
						shtml+="<td><a href='javascript:;' onclick='delWTableInspDeptRow(this)' class='btn btn-success btn-small'>删除</a></td></tr>";
					}
					$("#bodyInspDeptData").html(shtml);
				}
			}
		});
	}
}
function getWTableInspItemData(){
	var str=",";var listAdd=[];var listUpdate=[];
	var targetjson = {};
	var objtrs=$("#wTableInspItem").find("tr");
	for(var i=1;i<objtrs.length;i++){
		var itemCode = $(objtrs[i]).find("input[name='row_inspItemCode']").val();
		var itemFymc = $(objtrs[i]).find("input[name='row_inspItemFymc']").val();
		var data={};
		var id=$(objtrs[i]).find("input[name='row_inspItemId']").val();
		if(itemCode!=""&&str.indexOf(","+itemFymc+"_"+itemCode+",")==-1){
			str=str+itemFymc+"_"+itemCode+",";
			var inputArr =  $(objtrs[i]).find("input");
			for(var j=0;j<inputArr.length;j++){
				if(inputArr[j].name.substring(0,4)=="row_"){
					data[inputArr[j].name.substring(4)] = inputArr[j].value;
				}
			}
			var areaArr =  $(objtrs[i]).find("textarea");
			for(var j=0;j<areaArr.length;j++){
				if(areaArr[j].name.substring(0,4)=="row_"){
					data[areaArr[j].name.substring(4)] = areaArr[j].value;
				}
			}
			var selectArr =  $(objtrs[i]).find("select");
			for(var j=0;j<selectArr.length;j++){
				if(selectArr[j].name.substring(0,4)=="row_"){
					data[selectArr[j].name.substring(4)] = selectArr[j].options[selectArr[j].selectedIndex].value;
				}
			}
			if(id==""){
				listAdd.push(data);
			}else{
				listUpdate.push(data);
			}
		} 
	}
	if(listAdd.length>0){
		targetjson["addRows"] = listAdd;
	}
	if(listUpdate.length>0){
		targetjson["updateRows"]=listUpdate;
	}
	if($("#inspItemDelIds").val()!=""){
		targetjson["deleteRows"]=$("#inspItemDelIds").val();
	}
	return JSON.stringify(targetjson);
} 
function delWTableInspItemRow(){
	var delIds=$("#inspItemDelIds").val();
	var inputCheckboxArr = $("#wTableInspItem input[name='wTableInspItem_chkbox']");
	var arrRowIndex=[];
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			var id=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_inspItemId']").val();
			if(id!=""){
				if(delIds==""){delIds=id;}
				else{delIds+=","+id;}
			}
			arrRowIndex.push(i);
		}
	}
	if(arrRowIndex.length==0){
		alert("请选择要删除的行");
	}else{
		if(window.confirm("确定要删除选择的数据吗？")){
			$("#inspItemDelIds").val(delIds);
			arrRowIndex.forEach(function(v){  
				$(inputCheckboxArr[parseInt(v)]).closest("tr").remove();
			});
		}
	}
	inputCheckboxArr = $("#wTableInspItem input[name='wTableInspItem_chkbox']");
	if(inputCheckboxArr.length==0){
		document.getElementById("span_xmgs").innerHTML="（共 0 个项目 0 元）";
		$('#inspSampItemCount').val("0");
		$('#inspSampItemPriceSum').val("0");
		$('#inspSampPrice').val("0");
	}else{
		setItemPricesAdd();
	}
	editWTableInspDept();
}
function getWTableInspDeptData(){
	var str=",";var list=[];
	var selectDeptObj=$("#wTableInspDept select[name='row_deptCode']");
	for(var i=0;i<selectDeptObj.length;i++){
		var dept = selectDeptObj[i].options[selectDeptObj[i].selectedIndex].value;
		var data={};
		if(dept!=""&&str.indexOf(","+dept+",")==-1){
			str=str+dept+",";
			var inputArr =  $(selectDeptObj[i]).closest("tr").find("input");
			for(var j=0;j<inputArr.length;j++){
				if(inputArr[j].name.substring(0,4)=="row_"){
					data[inputArr[j].name.substring(4)] = inputArr[j].value;
				}
			}
			var selectArr =  $(selectDeptObj[i]).closest("tr").find("select");
			for(var j=0;j<selectArr.length;j++){
				if(selectArr[j].name.substring(0,4)=="row_"){
					data[selectArr[j].name.substring(4)] = selectArr[j].options[selectArr[j].selectedIndex].value;
				}
			}
			list.push(data);			
		}
	}	
	return JSON.stringify(list);
} 
function delWTableInspDeptRow(obj){
	$(obj).closest("tr").remove();
}

//--------------------------检验依据弹出框end-----------------------------------------
//自定义弹出框，样品选企业信息 -----------------start------------------------------
//打开选企业的弹出框,样品选企业用
function openDialogSampCompanyInfo(dwlx){
	$('#'+dwlx+"Name").attr('readonly',true);
	$("#dialogCompanyInfo").show();
	$("#dialogCallBackFunName").val('dialogCallBackSampCompanyInfo'); //回调函数名
	$("#dialogisMultiSelect").val("0"); //是否多选，1多选，0单选
	$("#dialogSetObjNameId").val(dwlx); //特殊用途
	$("#dialogHasSelectName").val("enteId");
	//每次打开弹出框时，根据已有的值更新被选中的值，页面上的值可能被手动修改过
	$("#dialogSelectedData").val(","+$('#'+dwlx+"Id").val()+",");
	//如果没有数据则执行一次查询
	if($("input[name='dialogCompanyInfoChkbox']").length<1){
		dialogCompanyInfoDoSearch();
	}else{
		dialogInitPageCheck("dialogCompanyInfo");
	}
}
//样品选企业的回调函数
function dialogCallBackSampCompanyInfo(d){
	if(d!=""){
		if(d.indexOf("^^")!=-1){
			alert("请选择一个企业");
		}else{
			var dwlx = $("#dialogSetObjNameId").val();
			var arr = d.split("||");
//0.enteId||1.enteName||2.enteJgdm||3.enteAddress||4.enteContact||5.enteContactPhone||6.isXydw||7.enteGzr||8.enteDiscount||9.deptName....
			var id=arr[0];var name=arr[1];var jgdm=arr[2];
			var address=arr[3];var contact=arr[4];var phone=arr[5];
			var gzr=arr[7];var discount=arr[8];var isXydw=arr[6];var deptName=arr[9];
			var pdata={
				id:arr[0],name:arr[1],jgdm:arr[2],address:arr[3],
				contact:arr[4],phone:arr[5],isXydw:arr[6],
				gzr:arr[7],discount:arr[8],deptName:arr[9]
			};
			if(dwlx=="inspSampPay"){ //根据缴费单位计算工作日和折扣
				$("#inspSampPayId").val(pdata.id);
				$("#inspSampPayName").val(pdata.name);
				if($("#inspSampType").val().indexOf("wt")!=-1){
					computeGzrDiscountByEnte(pdata.gzr,pdata.discount,pdata.isXydw,pdata.deptName);
				}
			}else{
				setSampCompanyInfo(dwlx,pdata);
				if($("input[name='radio-jfdw']:checked").val()==dwlx){
					$("#inspSampPayId").val(id);
					$("#inspSampPayName").val(name);
					if($("#inspSampType").val().indexOf("wt")!=-1){
						computeGzrDiscountByEnte(pdata.gzr,pdata.discount,pdata.isXydw,pdata.deptName);
					}
				}
			}
			$("#dialogSelectedData").val(","+name+",");
		}
	}
} 
function setSampCompanyInfo(dwlx,d){
	$("#"+dwlx+"Id").val(d.id);
	$("#"+dwlx+"Name").val(d.name);
	$("#"+dwlx+"Address").val(d.address);
	$("#"+dwlx+"Contact").val(d.contact);
	$("#"+dwlx+"Phone").val(d.phone);
	$("#"+dwlx+"Code").val(d.jgdm);
	$("#"+dwlx+"isxy").val(d.isxy);
	$("#"+dwlx+"dept").val(d.dept);
	$("#"+dwlx+"gzr").val(d.gzr);
	$("#"+dwlx+"discount").val(d.discount);
}
//委托检验，根据缴费单位计算企业工作日和折扣
function computeGzrDiscountByEnte(gzr,discount,isXydw,deptName){
	//按企业工作日重新计算工作日
	var flag=true;
	if(gzr!=""&&!isNaN(gzr)){
		if(parseInt(gzr)>0&&$("#inspSampType").val().indexOf("wt")!=-1&&parseInt(gzr)!=parseInt($("#inspSampGzr").val())){
			$("#inspSampGzr").val(parseInt(gzr));
			setYuYueRiQi(document.getElementById("inspSampGzr"),15);
			flag=false;
		}
	}
	if(flag==true){ //企业没有工作日时还原默认的工作日
		if($("#inspSampType").val().indexOf("wt")!=-1){
			$("#inspSampGzr").val(parseInt($("#wtgzr").val()));
			setYuYueRiQi(document.getElementById("inspSampGzr"),15);
		}else{
			$("#inspSampGzr").val(parseInt($("#jdgzr").val()));
			setYuYueRiQi(document.getElementById("inspSampGzr"),15);
		}
	}
	//计算折扣
	var flag=true;
	if(discount!=""&&!isNaN(discount)){
		if($("#inspSampType").val().indexOf("wt")!=-1&&parseFloat(discount)!=parseFloat($("#inspSampDiscount").val())){
			$("#inspSampDiscount").val(parseFloat(discount));
			blurDiscount(document.getElementById("inspSampDiscount"));
			flag=false;
		}
	}
	if(flag==true){ //企业没有折扣时还原
		if($("#inspSampType").val().indexOf("wt")!=-1){
			$("#inspSampDiscount").val(1);
			blurDiscount(document.getElementById("inspSampDiscount"));
		}
	}
	//计算是否协议，及协议签订科室
	if(isXydw=="1"){
		$("#isXy").val("1");
	}else if(isXydw=="0"){
		$("#isXy").val("0");
	}else{
		$("#isXy").val("");
	}
	//$("#归属科室").val(deptName);
}
function setYuYueRiQi(objthis,defval){
	var gzr=objthis.value;
	if(gzr==""||isNaN(gzr)){
		gzr=defval;
	}
	gzr=parseInt(gzr);
	var sDate = $("#slsj").val();
	var dDate =getDate(sDate);  
	var yyrq = getWorkDate(dDate,gzr);	
	var wcrq = getWorkDate(dDate,gzr>0?gzr-1:gzr);
	if(dDate.getHours()>=11){
		$("#inspSampPredictDate").val(yyrq+" 17:00");
		$("#requiredTime").val(wcrq+" 17:00");
	}else{
		$("#inspSampPredictDate").val(yyrq+" 10:00");
		$("#requiredTime").val(wcrq+" 10:00");
	}
}
/**
 * 计算当期时间 经过一段工作日后的日期
 * @param {date} startDate 当前时间
 * @param {string} limitDay 工作日
 */
function getWorkDate(sDate,limitDay){
	 var startDate;
	 if (typeof sDate == "string" ) { 
		 startDate =getDate(sDate);  
	 }else{
		 startDate=sDate;
	 }								
	var startTime = startDate.getTime();
	
	var T = 24*60*60*1000; 
	var endTime = startTime+(limitDay*T);
	 
	if(limitDay>0){
		var holidays = 0;
		for(var i=startTime+T;i<=endTime;i+=T){
			var date = new Date(i);
			//此处为节假日逻辑
			if(date.getDay()==0 || date.getDay()==6){  
				holidays++;
			}	    
		}
		return getWorkDate(new Date(endTime),holidays);
	}else{
		return formatDates(startDate,"-");
		//.toLocaleDateString()
	}
}
function getDate(strDate){
    var regEx = new RegExp("\\-","gi");
    strDate = strDate.replace(regEx,"/");
    var milliseconds = Date.parse(strDate);
    var date = new Date();
    date.setTime(milliseconds);
    return date;
}

//格式化当前的系统时间 格式为(yyyy-MM-dd)
function formatDates(date,seperator){								
   var nowMonth = date.getMonth() + 1;
   var hours = date.getHours(); 
   // 获取当前是几号
   var strDate = date.getDate();  
   // 对月份进行处理，1-9月在前面添加一个“0”
   if (nowMonth >= 1 && nowMonth <= 9) {
 	 nowMonth = "0" + nowMonth;
   }
   // 对月份进行处理，1-9号在前面添加一个“0”
   if (strDate >= 0 && strDate <= 9) {
 	 strDate = "0" + strDate;
   }
   // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
   var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
   return nowDate;
}
function blurDiscount(objthis){
	if(isNaN(objthis.value)||objthis.value==""){
		objthis.value=1.0;
	}
	if(Number(objthis.value)<=0||Number(objthis.value)>1){
		objthis.value=1.0;
	}
	if(global_isFree&&global_isFree=="1"){
		$('#inspSampPrice').val(0);
	}else{
		$('#inspSampPrice').val(toDecimal($('#inspSampItemPriceSum').val()*objthis.value));
	}
}
//自定义弹出框，样品选企业信息 -----------------end------------------------------

//代替openAddInspItemWin
//---------------------受理选项目弹出框start------------------------------------
function openDialogSampItem(){
	$("#dialogInspSampItem").show();
	$("#dialogCallBackFunName").val('dialogCallBackSampItem'); //回调函数名
	//每次打开弹出框时，根据已有的值更新被选中的值 
	var dialogSelectedData=",";
	var objtrs=$("#wTableInspItem").find("tr");
	for(var i=1;i<objtrs.length;i++){
		var v1=$(objtrs[i]).find("input[name='row_inspItemFymc']").val();
		var v2=$(objtrs[i]).find("input[name='row_inspItemCode']").val();
		dialogSelectedData+=v1+"_"+v2+",";
	}
	$("#dialogSelectedData").val(dialogSelectedData);
	//设置分样
	var dialogFyobj=document.getElementById("dialogInspSampItemfy");
	dialogFyobj.options.length=0; 
	var fyobj = document.getElementById("inspSampFyxx");
	if(fyobj){
		var fy=fyobj.value;
		fy=fy.replace(/,/g,"^");
		fy=fy.replace(/，/g,"^");
		if(fy!=""){
			var arr = fy.split("^");
			for(var i=0;i<arr.length;i++){
				if(arr[i]!=""){
					dialogFyobj.options.add(new Option(arr[i],arr[i]));
				}
			}
			dialogFyobj.selectedIndex=0;
			$("#div_fy").show();
		}else{
			$("#div_fy").hide();
		}
	}else{
		$("#div_fy").hide();
	}
	//打开后重新设置第一页的选中状态，
	initInspSampItemPageCheck();
}
function checkInspItemData(sname){ //判断已选择的检验项目是否重复
	var flag=true;
	var objtrs=$("#wTableInspItem").find("tr");
	for(var i=1;i<objtrs.length;i++){
		var v1=$(objtrs[i]).find("input[name='row_inspItemFymc']").val();
		var v2=$(objtrs[i]).find("input[name='row_inspItemCode']").val();
		if(v1+"_"+v2==sname){
			flag=false;
			break;
		}
	}
	return flag;
}
//回调函数//0.froms||1.fymc||2.itemCode||3.stanItemId||4.itemDw||5.itemName||6.itemIndex||7.itemJyff
//||8.itemStanNo||9.itemStanSfyj||10.itemIszbx||11.itemPrice||12.itemDeptCode||13.itemTeamId||14.stanName....
function dialogCallBackSampItem(d){
	if(d!=""){
		var arr1 = d.split("^^");
		for(var i=0;i<arr1.length;i++){
			var arr = arr1[i].split("||");
			if(checkInspItemData(arr[1]+"_"+arr[2])){
				$("#dialogSelectedData").val($("#dialogSelectedData").val()+arr[1]+"_"+arr[2]+",");
				var rowdata={};
				rowdata["inspItemFymc"]=arr[1];
				rowdata["inspItemCode"]=arr[2];
				rowdata["inspItemDw"]=arr[4];
				rowdata["inspItemName"]=arr[5];
				rowdata["inspItemIndex"]=arr[6];
				rowdata["inspItemJyff"]=arr[7];
				if(arr[0]=="stand"||arr[0]=="methodstan"){
					rowdata["qualiStanItemId"]=arr[3];
					rowdata["qualityStandNumber"]=arr[8];
				}
				rowdata["inspItemSfyj"]=arr[9];
				rowdata["isPackage"]="0";
				rowdata["iszbx"]=arr[10];
				rowdata["inspItemPrice"]=arr[11];
				rowdata["deptCode"]=arr[12];
				rowdata["inspTeamId"]=arr[13];
				var objtrs=$("#wTableInspItem").find("tr").eq(0);
				var cols = $("#wTableInspItem").find("tr").eq(0).find("th").length;
				if(cols>8){
					addInspItemRowLcjk(rowdata);
				}else{
					addInspItemRow(rowdata);
				}
				//更新检验依据的值			
				if(arr[0]=="stand"||arr[0]=="methodstan"){ 
					var standNumber=arr[8];
					if(arr[0]=="stand"){ //方法标准不显示中文名称
						standNumber=standNumber+"《"+arr[14]+"》";
					}
					var jyyjs = $("#inspSampStandard").val();
					if(("；"+jyyjs+"；").indexOf("；"+standNumber+"；")==-1){
						if(jyyjs==""){
							$("#inspSampStandard").val(standNumber);
						}else{
							$("#inspSampStandard").val(jyyjs+"；"+standNumber);
						}
					}
				}
			}
		}
		setItemPricesAdd(); //重新计算检验费
		editWTableInspDept(); //在显示检验科室的要求完成时间表格中添加新的科室
	}
} 

function addInspItemRow(d){
	var hiddenInput="<input type='hidden' name='row_inspItemId' value='"+(d.hasOwnProperty('inspItemId')?d.inspItemId:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_qualiStanItemId' value='"+(d.hasOwnProperty('qualiStanItemId')?d.qualiStanItemId:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemCode' value='"+(d.hasOwnProperty('inspItemCode')?d.inspItemCode:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemSfyj' value='"+(d.hasOwnProperty('inspItemSfyj')?d.inspItemSfyj:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspTeamId' value='"+(d.hasOwnProperty('inspTeamId')?d.inspTeamId:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_isPackage' value='"+(d.hasOwnProperty('isPackage')?d.isPackage:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemFymc' value='"+(d.hasOwnProperty('inspItemFymc')?d.inspItemFymc:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemDw' value='"+(d.hasOwnProperty('inspItemDw')?d.inspItemDw:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_iszbx' value='"+(d.hasOwnProperty('iszbx')?d.iszbx:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemName' value='"+(d.hasOwnProperty('inspItemName')?d.inspItemName:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemIndex' value='"+(d.hasOwnProperty('inspItemIndex')?d.inspItemIndex:'999')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_taskTime' value='"+(d.hasOwnProperty('taskTime')?d.taskTime:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_requiredTime' value='"+(d.hasOwnProperty('requiredTime')?d.requiredTime:'')+"' >";
	var tdCheckBox="<td><input type='checkbox' name='wTableInspItem_chkbox' class='checkbox' />";
	tdCheckBox += hiddenInput+"</td>";
	var rowHtml="<tr>";
	rowHtml += tdCheckBox;
	rowHtml += "<td>"+$("#wTableInspItem").find("tr").length+"</td>";
	var inspItemName=d.inspItemName;
	if(d.hasOwnProperty('inspItemFymc')&&typeof(d.inspItemFymc) != "undefined"&&d.inspItemFymc!='null' && d.inspItemFymc!="" && d.inspItemFymc!=null&&d.inspItemFymc!="undefined"){
		inspItemName=d.inspItemFymc+"_"+inspItemName;
	}
	rowHtml += "<td onclick='tdSelectRow(this)'><span name='span_inspItemName'>"+inspItemName+"</span></td>";
	var inspItemPrice=d.hasOwnProperty('inspItemPrice')?d.inspItemPrice:'0';
	rowHtml += "<td onclick='tdSelectRow(this)'><input type='text' name='row_inspItemPrice' value='"+inspItemPrice+"' title='"+inspItemPrice+"' onblur='fun_itempriceBlur(this)' class='input-block-level'></td>";
	//rowHtml += "<td><textarea name='row_inspItemJyff' rows=1  class='areanew' onfocus='this.rows=4;' onblur='this.rows=1;'>"+(d.hasOwnProperty('inspItemJyff')?d.inspItemJyff:'')+"</textarea></td>";
	rowHtml += "<td onclick='tdSelectRow(this)'><textarea name='row_inspItemJyff' onfocus=\"this.style.height='100px'\" onblur=\"this.style.height='20px'\">"+(d.hasOwnProperty('inspItemJyff')?d.inspItemJyff:'')+"</textarea></td>";
	
	rowHtml += "<td onclick='tdSelectRow(this)'><select name='row_isDetermine' style='width:60px' class='select input-block-level' >";
	if(d.hasOwnProperty('isDetermine')&&d.isDetermine=="0"){
		rowHtml +=  "<option value='1' >是</option>";
		rowHtml +=  "<option value='0' selected>否</option>";
	}else{
		rowHtml +=  "<option value='1' selected>是</option>";
		rowHtml +=  "<option value='0' >否</option>";
	}
	rowHtml +=  "</select></td>";
	
	rowHtml += "<td onclick='tdSelectRow(this)'><select name='row_deptCode' onchange='editWTableInspDept()' style='width:90px' class='select input-block-level' >";
	var deptCode=d.hasOwnProperty('deptCode')?d.deptCode:'';
	for(var k=0;k<jsonJyksData.length;k++){
		rowHtml +=  "<option value='"+jsonJyksData[k].value+"' ";
		if(jsonJyksData[k].value==deptCode||(deptCode==""&&k==0)){
			rowHtml +=  " selected ";
		}
		rowHtml +=  " >"+jsonJyksData[k].name+"</option>";
	}
	rowHtml += "</select></td>";
	
	var qualityStandNumber=d.hasOwnProperty('qualityStandNumber')?d.qualityStandNumber:'';
	rowHtml += "<td onclick='tdSelectRow(this)'><span name='span_qualityStandNumber'>"+qualityStandNumber+"</span></td>";
	rowHtml += "</tr>";
	$("#bodyInspItemData").append(rowHtml);
}
function addInspItemRowLcjk(d){
	var hiddenInput="<input type='hidden' name='row_inspItemId' value='"+(d.hasOwnProperty('inspItemId')?d.inspItemId:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_qualiStanItemId' value='"+(d.hasOwnProperty('qualiStanItemId')?d.qualiStanItemId:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemCode' value='"+(d.hasOwnProperty('inspItemCode')?d.inspItemCode:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemSfyj' value='"+(d.hasOwnProperty('inspItemSfyj')?d.inspItemSfyj:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemFymc' value='"+(d.hasOwnProperty('inspItemFymc')?d.inspItemFymc:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemDw' value='"+(d.hasOwnProperty('inspItemDw')?d.inspItemDw:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_iszbx' value='"+(d.hasOwnProperty('iszbx')?d.iszbx:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemName' value='"+(d.hasOwnProperty('inspItemName')?d.inspItemName:'')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_inspItemIndex' value='"+(d.hasOwnProperty('inspItemIndex')?d.inspItemIndex:'999')+"' >";
	hiddenInput +=  "<input type='hidden' name='row_taskTime' value='"+(d.hasOwnProperty('taskTime')?d.taskTime:'')+"' >";
	var tdCheckBox="<td><input type='checkbox' name='wTableInspItem_chkbox' class='checkbox' />";
	tdCheckBox += hiddenInput+"</td>";
	var rowHtml="<tr>";
	rowHtml += tdCheckBox;
	rowHtml += "<td>"+$("#wTableInspItem").find("tr").length+"</td>";
	var inspItemName=d.inspItemName;
	if(d.hasOwnProperty('inspItemFymc')&&typeof(d.inspItemFymc) != "undefined"&&d.inspItemFymc!='null' && d.inspItemFymc!="" && d.inspItemFymc!=null&&d.inspItemFymc!="undefined"){
		inspItemName=d.inspItemFymc+"_"+inspItemName;
	}
	rowHtml += "<td><span name='span_inspItemName'>"+inspItemName+"</span></td>";
	var inspItemPrice=d.hasOwnProperty('inspItemPrice')?d.inspItemPrice:'0';
	rowHtml += "<td><input type='text' name='row_inspItemPrice' value='"+inspItemPrice+"' title='"+inspItemPrice+"' onblur='fun_itempriceBlur(this)' class='input-block-level'></td>";
	rowHtml += "<td><textarea name='row_inspItemJyff' rows=1  class='areanew' onfocus='this.rows=4;' onblur='this.rows=1;'>"+(d.hasOwnProperty('inspItemJyff')?d.inspItemJyff:'')+"</textarea></td>";
	
	rowHtml += "<td><select name='row_isDetermine' style='width:60px' class='select input-block-level' >";
	if(d.hasOwnProperty('isDetermine')&&d.isDetermine=="0"){
		rowHtml +=  "<option value='1' >是</option>";
		rowHtml +=  "<option value='0' selected>否</option>";
	}else{
		rowHtml +=  "<option value='1' selected>是</option>";
		rowHtml +=  "<option value='0' >否</option>";
	}
	rowHtml +=  "</select></td>";
	
	rowHtml += "<td><select name='row_isPackage' style='width:60px' class='select input-block-level' >";
	if(d.hasOwnProperty('isPackage')&&d.isPackage=="1"){
		rowHtml +=  "<option value='1' selected>是</option>";
		rowHtml +=  "<option value='0' >否</option>";
	}else{
		rowHtml +=  "<option value='1' >是</option>";
		rowHtml +=  "<option value='0' selected>否</option>";
	}
	rowHtml +=  "</select></td>";
	
	var requiredTime=d.hasOwnProperty('requiredTime')?d.requiredTime:'';
	if(requiredTime!=""&&requiredTime.length>=16){
		requiredTime=requiredTime.substring(0,16);
	}
	rowHtml += "<td><input type='text' name='row_requiredTime' value='"+requiredTime+"' onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})\" class='input-block-level'></td>";
	
	rowHtml += "<td><select name='row_deptCode' onchange='editWTableInspDept()' style='width:90px' class='select input-block-level' >";
	var deptCode=d.hasOwnProperty('deptCode')?d.deptCode:'';
	for(var k=0;k<jsonJyksData.length;k++){
		rowHtml +=  "<option value='"+jsonJyksData[k].value+"' ";
		if(jsonJyksData[k].value==deptCode||(deptCode==""&&k==0)){
			rowHtml +=  " selected ";
		}
		rowHtml +=  " >"+jsonJyksData[k].name+"</option>";
	}
	rowHtml += "</select></td>";
	
	rowHtml += "<td><select name='row_inspTeamId' style='width:90px' class='select input-block-level' >";
	var inspTeamId=d.hasOwnProperty('inspTeamId')?d.inspTeamId:'';
	for(var k=0;k<jsonJyz.length;k++){
		rowHtml +=  "<option value='"+jsonJyz[k].value+"' ";
		if(jsonJyz[k].value==inspTeamId||(inspTeamId==""&&k==0)){
			rowHtml +=  " selected ";
		}
		rowHtml +=  " >"+jsonJyz[k].name+"</option>";
	}
	rowHtml += "</select></td>";
	
	var qualityStandNumber=d.hasOwnProperty('qualityStandNumber')?d.qualityStandNumber:'';
	rowHtml += "<td><span name='span_qualityStandNumber'>"+qualityStandNumber+"</span></td>";
	rowHtml += "</tr>";
	$("#bodyInspItemData").append(rowHtml);
} 
//---------------------受理选项目弹出框end----------------------------------------

