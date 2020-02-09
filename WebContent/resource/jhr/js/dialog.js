function customIframeDialog(title,url,backFunDialog,width,height,padding){
	var dialog = '';
	dialog += '<div class="dialog_bg" id="customIframeDialog1" style="padding-top:'+padding+'px">';	
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=          '<div class="dialog_base">';
	dialog +=             '<div class="dialog_c_nospace" style="height:'+height+'px">';
	dialog +=				'<iframe src="'+url+'" id="dialogIframe1" width="100%" height="'+height+'" frameborder="no" border="0" ></iframe>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	if ($("#customIframeDialog1").length === 0) {
		$(dialog).appendTo("body");
		$("#customIframeDialog1").show();
	}		
}
function customIframeDialogWithClose(title,url,backFunDialog,width,height,padding){
	var dialog = '';
	dialog += '<div class="dialog_bg" id="customIframeDialog2" style="padding-top:'+padding+'px">';	
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=          '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">';
	dialog +=                  "<div class='dialog_close' title='关闭' onclick=\"$('#customIframeDialog2').remove()\"><i class='icon-remove'></i></div>";
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_c_nospace" style="height:'+height+'px">';
	dialog +=				'<iframe src="'+url+'" width="100%" height="'+height+'" frameborder="no" border="0" ></iframe>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	if ($("#customIframeDialog2").length === 0) {
		$(dialog).appendTo("body");
		$("#customIframeDialog2").show();
	}		
}
//提示弹框 msg：提示信息 showTime：提示时间
function msgDialog(title,msg,showTime,width,height,padding){
	width=(width==""?"400":width);
	height=(height==""?"100":height);
	padding=(padding==""?"200":padding);
	if(title==""){title="提示";}
	var dialog = '';
	dialog += '<div class="dialog_bg" id="hintDialog" style="padding-top:'+padding+'px">';
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=         '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">';
	dialog +=                  title+"<div class='dialog_close' title='关闭' onclick=\"$('#hintDialog').remove()\"><i class='icon-remove'></i></div>";
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_c" id="hintDialogmsg" style="height:'+height+'px">'+msg+'</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	if ($("#hintDialog").length === 0) {
		$(dialog).appendTo("body");
		$("#hintDialog").show();
	}
	setTimeout(function(){$("#hintDialog").remove();}, showTime);
}
/**
* 确认弹框 info:提示信息 confirmFun:点击确认执行函数
* 例如：confirmDialog('确定要删除吗？','grid($(\'#page1\'),urlOrg,initArg(),initTotal,getList)');
*/
function confirmDialog(title,info,confirmFun,width,height,padding){
	width=width==""?"400":width;
	height=height==""?"100":height;
	padding=padding==""?"200":padding;
	if(title==""){title="提示";}
	var dialog = '';
	dialog += '<div class="dialog_bg" id="confirmDialog" style="padding-top:'+padding+'px">';
	dialog +=     '<div class="dialog_block"></div>';
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=         '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">';
	dialog +=                 title+'<div class="dialog_close" title="关闭"><i class="icon-remove"></i></div>';
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_c" style="height:'+height+'px">';
	dialog +=                 info;
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_btn">';
	dialog +=                 '<a class="btn btn-primary" href="javascript:void(0);" id="confirmOkBtn" onclick="">确定</a>';
	dialog +=                 '<a class="btn" href="javascript:void(0);" id="confirmCloseBtn" >取消</a>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	
	if ($("#confirmDialog").length === 0) {
		$(dialog).appendTo("body");$("#confirmDialog").show();
	}	
	$("#confirmOkBtn").bind("click",function(){
		$("#confirmDialog").remove();
    });
	if(confirmFun){
		$("#confirmOkBtn").attr("onclick",confirmFun);
	}
     $("#confirmCloseBtn").bind("click",function(){
		$("#confirmDialog").remove();
     });
     $(".dialog_close").bind("click",function(){
		$("#confirmDialog").remove();
     });     
}
 
//普通弹出框
function customDialog(title,innerData,backFunDialog,width,height,padding){
	width=width==""?"400":width;
	height=height==""?"200":height;
	padding=padding==""?"120":padding;
	if(title==""){title="提示";}
	var dialog = '';
	dialog += '<div class="dialog_bg" id="customDialog1" style="padding-top:'+padding+'px">';	
	dialog +=     '<div class="dialog_block"></div>';
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=          '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">';
	dialog +=                  title+'<div class="dialog_close" title="关闭"><i class="icon-remove"></i></div>';
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_c" style="height:'+height+'px">';
	dialog +=                  innerData;
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_btn">';
	dialog +=                 '<a class="btn btn-primary" href="javascript:void(0);" id="dialog1OkBtn" onclick="">确定</a>';
	dialog +=                 '<a class="btn" href="javascript:void(0);" id="dialog1CloseBtn">关闭</a>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	
	if ($("#customDialog1").length === 0) {
		$(dialog).appendTo("body");$("#customDialog1").show();
	}		
	$("#dialog1OkBtn").bind("click",function(){
		if(backFunDialog){backFunDialog();}
		else{
			$("#customDialog1").remove();
		}
     });
     $("#dialog1CloseBtn").bind("click",function(){
		$("#customDialog1").remove();
     });
     $(".dialog_close").bind("click",function(){
		$("#customDialog1").remove();
     });     
}
//同一个页面多个域调用对话框时，避免重复写多个回调函数
function customDialogToObj(title,innerData,backObjIds,backFunDialog,width,height,padding){
	width=width==""?"400":width;
	height=height==""?"200":height;
	padding=padding==""?"120":padding;
	if(title==""){title="提示";}
	var dialog = '';
	dialog += '<div class="dialog_bg" id="customDialogToObj1" style="padding-top:'+padding+'px">';
	dialog += '<input type="hidden" id="customDialogCallBackOrgIds" value="'+backObjIds+'">';	
	dialog +=     '<div class="dialog_block"></div>';
	dialog +=     '<div class="dialog" style="width:'+width+'px">';
	dialog +=          '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">';
	dialog +=                  title+'<div class="dialog_close" title="关闭"><i class="icon-remove"></i></div>';
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_c" style="height:'+height+'px">';
	dialog +=                  innerData;
	dialog +=             '</div>';
	dialog +=             '<div class="dialog_btn">';
	dialog +=                 '<a class="btn btn-primary" href="javascript:void(0);" id="dialog1OkBtn" onclick="">确定</a>';
	dialog +=                 '<a class="btn" href="javascript:void(0);" id="dialog1CloseBtn">关闭</a>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	
	if ($("#customDialogToObj1").length === 0) {
		$(dialog).appendTo("body");
	}		
	$("#dialog1OkBtn").attr("onclick",backFunDialog);
	$("#dialog1OkBtn").bind("click",function(){
		//if(backFunDialog)backFunDialog();
		$("#customDialogToObj1").remove();
     });
     $("#dialog1CloseBtn").bind("click",function(){
		$("#customDialogToObj1").remove();
     });
     $(".dialog_close").bind("click",function(){
		$("#customDialogToObj1").remove();
     });     
}
//自定义弹出框，弹出框内容在页面中
function customInnerDialog(dialogId,selOneOrMore,callBackFunName){
	$("#"+dialogId).show();
	$("#dialogSelType").val(selOneOrMore==""?"one":selOneOrMore);
	$("#dialogCallBackFunName").val(callBackFunName);
	//document.getElementById(dialogId).style.display="";
}
//同一个页面多个域调用对话框时，避免重复写多个回调函数
function customInnerDialogToObj(dialogId,selOneOrMore,callBackFunName,objIdArr){
	$("#"+dialogId).show();
	$("#dialogSelType").val(selOneOrMore==""?"one":selOneOrMore);
	$("#dialogCallBackOrgIds").val(objIdArr);
	$("#dialogCallBackFunName").val(callBackFunName);
	//document.getElementById(dialogId).style.display="";
}
 
//自定义弹出窗口确定按钮的执行函数,执行完会关闭弹出框
function dialogOkFun(dialogId,checkBoxId,callBackFun){
	var obj = document.getElementsByName(checkBoxId);
	var selectType = $("#dialogSelType").val();
	var strs = "";
	for(var i=0;i<obj.length;i++){
		if(obj[i].checked==true){
			if(selectType == "one"){
				strs=obj[i].value;
				break;
			}else{
				if(strs==""){strs=obj[i].value;}
				else{strs+="^^"+obj[i].value;}
			}
		}
	}	
	if(callBackFun){
		callBackFun(strs);
	}
	$("#"+dialogId).hide();
}
//自定义弹出窗口确定按钮的执行函数,执行完不关闭弹出框
function dialogOkFunNotClose(checkBoxId,callBackFun){
	var obj = document.getElementsByName(checkBoxId);
	var selectType = $("#dialogSelType").val();
	var strs = "";
	for(var i=0;i<obj.length;i++){
		if(obj[i].checked==true){
			if(selectType == "one"){
				strs=obj[i].value;
				break;
			}else{
				if(strs==""){strs=obj[i].value;}
				else{strs+="^^"+obj[i].value;}
			}
		}
	}	
	if(callBackFun){
		callBackFun(strs);
	}	
}
//弹出窗口点击td时选中该行前面的checkbox
function dialogSelectRow(obj){
	var checkObj = $(obj).closest("tr").find("input[type='checkbox']")[0];
	if(!checkObj.disabled){
		checkObj.checked=!checkObj.checked; 
	}
}
//正在处理，不能关闭的弹出框
function processingDialog(){
	var dialog = '';
	dialog += '<div class="dialog_bg" id="processingDialog" style="padding-top:120px">';
	dialog +=     '<div class="dialog_block"></div>';
	dialog +=     '<div class="dialog" style="width:300px">';
	dialog +=         '<div class="dialog_base">';
	dialog +=             '<div class="dialog_title">正在处理数据，请稍等......</div>';
	dialog +=             '<div class="dialog_c" style="text-align:center;padding:20px 0">'; 
	dialog +=                 '<img src="data:image/gif;base64,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"/>';
	dialog +=             '</div>';
	dialog +=         '</div>';
	dialog +=    '</div>';
	dialog += '</div>';
	if ($("#processingDialog").length === 0) {
		$(dialog).appendTo("body");
	}	
}
 

 
//打开通用的弹出框赋值用：checkbox的值以id||name开头的
function openDialogCommon(objId,objName,isMultiSelect,separator,dialogId){
	$("#"+dialogId).show();
	if(isMultiSelect=="1"&&($("#"+objName).attr("readonly")=="readonly"||$("#"+objName).attr("disabled")=="disabled")){
		$("#"+dialogId+"ClearBtn").show();
	}else{
		$("#"+dialogId+"ClearBtn").hide();
	}
	$("#dialogCallBackFunName").val('dialogCallBackCommon'); //回调函数名
	$("#dialogisMultiSelect").val(isMultiSelect); //是否多选，1多选，0单选
	$("#dialogMultiValSeparator").val(separator); //多选时，分隔符
	$("#dialogSetObjIdId").val(objId); //给id赋值，一般是隐藏域
	$("#dialogSetObjNameId").val(objName); //给名称赋值
	//每次打开弹出框时，根据已有的值更新被选中的值，页面上的值可能被手动修改过
	var dialogSelectedData=",";
	var objValue = $("#"+objName).val();
	if(isMultiSelect=="1"){ //多选
		if(objValue!=""){
			var arr=objValue.split(separator);
			for(var i=0;i<arr.length; i++){
				dialogSelectedData+=arr[i]+",";
			}
		}
	}else{
		dialogSelectedData+=objValue+",";
	}
	$("#dialogSelectedData").val(dialogSelectedData);
	//打开后重新设置第一页的选中状态，如果选中的值不是第2个||则需要自定义写该函数
	initDialogPageCheckCommon(dialogId);
}
//打开通用的弹出框的回调函数
function dialogCallBackCommon(d){
	if(d!=""){
		var arr = d.split("^^");
		var idId = $("#dialogSetObjIdId").val();
		var nameId = $("#dialogSetObjNameId").val();
		var oldNameVal = $("#"+nameId).val();
		var oldIdVal = "";
		if(idId!=""){
			oldIdVal = $("#"+idId).val();
		}
		var dialogSelectedData=$("#dialogSelectedData").val();
		if($("#dialogisMultiSelect").val()=="1"){ //多选
			var separator=$("#dialogMultiValSeparator").val();
			for(var i=0;i<arr.length;i++){
				var arr1 = arr[i].split("||"); //id || name || ....
				if((separator+oldNameVal+separator).indexOf(separator+arr1[1]+separator)==-1){
					oldNameVal=oldNameVal+separator+arr1[1];
					if(idId!=""){
						oldIdVal=oldIdVal+separator+arr1[0];
					}
					dialogSelectedData+=arr1[1]+",";
				}
			}
			if(oldNameVal.substring(0,1)==separator){
				oldNameVal=oldNameVal.substring(1,oldNameVal.length);
				if(idId!=""){
					oldIdVal=oldIdVal.substring(1,oldIdVal.length);
				}
			}
			$("#"+nameId).val(oldNameVal);
			if(idId!=""){
				$("#"+idId).val(oldIdVal);
			}
		}else{
			if(d.indexOf("^^")!=-1){
				alert("只能选择一个值");
			}else{
				var arr1 = d.split("||");
				dialogSelectedData+=arr1[1]+",";
				$("#"+nameId).val(arr1[1]);
				if(idId!=""){
					$("#"+idId).val(arr1[0]);
				}
			}
		}
		$("#dialogSelectedData").val(dialogSelectedData);
	}
}
//双击弹出框内的行的函数
function dialogDblclickCommon(dialogId,trobj,callBackFun){
	var chkobj=$(trobj).find("input[type='checkbox']");
	if(chkobj[0].disabled!=true&&chkobj[0].checked==false){
		if($("#dialogHasSelectName").val()!=""){
			chkobj[0].disabled=true; 
		}
		callBackFun(chkobj[0].value);
		$("#"+dialogId).hide();
	}
}
//点击弹出框添加按钮执行的操作
function dialogAddBtnCommon(dialogId,callBackFun){
	var isMultiSelect=$("#dialogisMultiSelect").val();
	var obj = document.getElementsByName(dialogId+"Chkbox");
	var strs = "";
	var flag=true;
	if(isMultiSelect=="1"){
		for(var i = 0;i < obj.length;i++){
			if(obj[i].checked==true&&obj[i].disabled==false){
				if(strs == ""){strs = obj[i].value;}
				else{strs += "^^" + obj[i].value;} //分隔符不能用^，因检验员的分隔符也是^
				if($("#dialogHasSelectName").val()!=""){
					obj[i].disabled=true; 
				}
			}
		}
	}else{
		for(var i = 0;i < obj.length;i++){
			if(obj[i].checked==true&&obj[i].disabled==false){
				if(strs == ""){
					strs = obj[i].value;
					if($("#dialogHasSelectName").val()!=""){
						obj[i].disabled=true; 
					}
				}else{
					alert("只能选择一个");flag=false;break;
				}
			}
		}
	}
	if(flag==true){
		callBackFun(strs);
	}
}
//弹出框初始化第一页数据的勾选状态
function initDialogPageCheckCommon(dialogId){
	var dialogSelectedData=$("#dialogSelectedData").val();
	var chkobj = document.getElementsByName(dialogId+"Chkbox");
	for(var i=0;i<chkobj.length;i++){
		var arr = chkobj[i].value.split("||");
		if(dialogSelectedData.indexOf(","+arr[1]+",")==-1){
			chkobj[i].checked=false;
			chkobj[i].disabled=false;
		}else{
			chkobj[i].checked=true;
			chkobj[i].disabled=true;
		}
	}
}
function dialogInitPageCheck(dialogId){
	var hasSelect =$("#dialogHasSelectName").val();
	if(hasSelect!=""){
		var arr = hasSelect.split(",");
		var dialogSelectedData=$("#dialogSelectedData").val();
		var chkobj = document.getElementsByName(dialogId+"Chkbox");
		for(var i=0;i<chkobj.length;i++){
			var trobj = $(chkobj[i]).closest("tr");
			var str="";
			for(var j=0;j<arr.length;j++){
				var v1 = $(trobj).find("input[name='"+dialogId+"_"+arr[j]+"']").val();
				if(j>0){
					str=str+"_";
				}	
				str=str+v1;
			}
			if(str!=""){
				if(dialogSelectedData.indexOf(","+str+",") == -1){
					chkobj[i].checked=false;
					chkobj[i].disabled=false;
				}else{
					chkobj[i].checked=true;
					chkobj[i].disabled=true;
				}
			}
		} 
	}
}
//弹出框清空数据
function dialogClearBtnCommon(dialogId){
	var idId = $("#dialogSetObjIdId").val();
	var nameId = $("#dialogSetObjNameId").val();
	if(idId!=""){
		$("#"+idId).val("");
	}
	if(nameId!=""){
		$("#"+nameId).val("");
	}
	$("#dialogSelectedData").val(","); //清空后被选中状态也要重置
	initDialogPageCheckCommon(dialogId);
} 