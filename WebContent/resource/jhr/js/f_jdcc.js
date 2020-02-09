function blurFyxx(objthis){
	var re = /，|；|、|;/gi;
	objthis.value = objthis.value.replace(re,",");
}
//---------------------------- 省局监督抽查选企业的弹出框start-------------------------------------
function openDialogSampCompany(dwlx,callBackFunName){
	$('#'+dwlx+"Name").attr('readonly',true);
	$("#dialogCompanyInfo").show();
	$("#dialogCallBackFunName").val(callBackFunName); //回调函数名
	$("#dialogisMultiSelect").val("0"); //是否多选，1多选，0单选
	$("#dialogSetObjNameId").val(dwlx); //特殊用途
	$("#dialogHasSelectName").val("enteName");
	//每次打开弹出框时，根据已有的值更新被选中的值，页面上的值可能被手动修改过
	$("#dialogSelectedData").val(","+$('#'+dwlx+"Name").val()+",");
	//如果没有数据则执行一次查询
	if($("input[name='dialogCompanyInfoChkbox']").length<1){
		dialogCompanyInfoDoSearch();
	}else{
		dialogInitPageCheck("dialogCompanyInfo");
	}
}
//回调函数
function dialogCallBackSampCompanyJdcc(d){
	if(d!=""){
		if(d.indexOf("^^")!=-1){
			alert("请选择一个企业");
		}else{
			var dwlx = $("#dialogSetObjNameId").val();
			var arr = d.split("||");
//0.enteId||1.enteName||2.enteJgdm||3.enteAddress||4.enteContact||5.enteContactPhone||6.isXydw||7.enteGzr||8.enteDiscount||9.deptName....
			$("#"+dwlx+"Name").val(arr[1]);
			$("#"+dwlx+"Code").val(arr[2]);
			$("#"+dwlx+"Address").val(arr[3]);
			$("#"+dwlx+"Contact").val(arr[4]);
			$("#"+dwlx+"Phone").val(arr[5]);
			if($("input[name='radio-jfdw']:checked").val()==dwlx){
				$("#inspSampPayName").val(name);
			}
			$("#dialogSelectedData").val(","+arr[1]+",");
		}
	}
} 
function toEnabledEnte(mc){
	$('#'+mc+"Name").attr('readonly',false);
}
function sameTo(mc,frommc){
	$("#"+mc+"Name").val($("#"+frommc+"Name").val());
	if(mc!="inspSampPay"){
		$("#"+mc+"Code").val($("#"+frommc+"Code").val());
		$("#"+mc+"Address").val($("#"+frommc+"Address").val());
		$("#"+mc+"Contact").val($("#"+frommc+"Contact").val());
		$("#"+mc+"Phone").val($("#"+frommc+"Phone").val());		
		if(mc==$("input[name='radio-jfdw']:checked").val()){
			$("#inspSampPayName").val($('#'+frommc+"Name").val());
		}
	}
}
function blurEnteName(mc){
	if(mc==$("input[name='radio-jfdw']:checked").val()){
		if($("#inspSampPayName").val()!=$('#'+mc+"Name").val()){  
			$("#inspSampPayName").val($('#'+mc+"Name").val());			
		}
	}	
}
//---------------------------- 选企业的弹出框end-------------------------------------
