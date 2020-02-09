var jsonYesNo=[{"name":"是","value":"1"},{"name":"否","value":"0"}];
var jsonHhkhData=[{"name":"批号","value":"批号"},{"name":"货号","value":"货号"},{"name":"款号","value":"款号"}];
var jsonAqlbData=[{"name":"","value":""},{"name":"A类","value":"A类"},{"name":"B类","value":"B类"},{"name":"C类","value":"C类"}];
var jsonYyclData=[{"name":"弃样","value":"弃样"},{"name":"取未损部分样","value":"取未损部分样"},{"name":"取全部余样","value":"取全部余样"}];
var jsonBglqData=[{"name":"自取","value":"自取"},{"name":"快递","value":"快递"}];
var sampProdCatArr = new Array(4);
sampProdCatArr[0]  = "服装::学生服,衬衣,大衣,西服,校服,裤,装,衫,T恤,棉服装,服,袜,帽,围巾,衣";
sampProdCatArr[1]  = "面料::面料,里料,布样,丝布,健康布";
sampProdCatArr[2]  = "纱线::纱,线,纱线";
sampProdCatArr[3]  = "棉胎::棉絮,棉胎";
function checkSampName(sval){
	for(var i = 0;i<sampProdCatArr.length;i++){
		var stype=sampProdCatArr[i].substring(0,sampProdCatArr[i].indexOf("::"));
		var sarr=sampProdCatArr[i].substring(sampProdCatArr[i].indexOf("::")+2).split(",");
		for(var j=0;j<sarr.length;j++){
			if(sval.indexOf(sarr[j])!=-1){
				$("#edit_prodCatCode option:contains('"+stype+"')").attr('selected', true); 
				i=100000;
				break;
			}
		}
	}
}
function initSelect(url,param,defaultv,objId){
	var d=getAjaxData(url,param,false);
	initSelectByData(objId,d,defaultv);
}
function initSelectByData(objId,d,defaultv){
	var selectedIndex=0;
	for(var i=0;i<d.length;i++){
		if(d[i].value==defaultv){selectedIndex=i;}
		document.getElementById(objId).options.add(new Option(d[i].name,d[i].value));
	}
	document.getElementById(objId).selectedIndex=selectedIndex;
}
function tdSelectRow(obj){
	var checkboxobj = $(obj).closest("tr").find("input[type='checkbox']");
	if(checkboxobj.length>=1){
		$(checkboxobj[0]).prop("checked",!checkboxobj[0].checked);
	}
}
//网上委托没引用common.js，所以需要写下面的函数（=common.js中的getAjaxData）
function getAjaxData(url,param,basync){
	var d;
	$.ajax({
		url: url,type : "POST",cache:false, async:basync, 
		data :param,
		success: function(data){
			//d = $.parseJSON(data); //jquery.all.js中才有，jquery.js中没有此方法
			if ( typeof data !== "string" || !data ) {
				d=null;
			}else{
				data = jQuery.trim( data );
				if ( window.JSON && window.JSON.parse ) {
					d=window.JSON.parse( data );
				}else{
					if ( rvalidchars.test( data.replace( rvalidescape, "@" )
							.replace( rvalidtokens, "]" )
							.replace( rvalidbraces, "")) ) {
						d= ( new Function( "return " + data ) )();
					}
				}
			}
		}
	});
	return d;
}
//给空值补/
function fixNull(objId,sval){
	try{
		var objv = document.getElementById(objId);
		if(objv.value==""){objv.value=sval;}
	}catch(e){
		alert(objId+":"+e.message);
	}
}
function chkall(thisobj,chkname){
	var obj = document.getElementsByName(chkname);
    if(obj){
    	for(var k=0;k<obj.length;k++){
            obj[k].checked=thisobj.checked;            
        }
    }
}
//ajax方式提交表单
function ajaxSubForm(formId,url,params,isClose,callBackFun){
	var postData = {};
    var formarr = $('#'+formId).serializeArray();
    $.each(formarr, function () {
    	if(postData.hasOwnProperty(this.name)){ //当input类型为checkbox时是多值
    		if(postData[this.name]==""){
        		postData[this.name] = this.value;
        	}else{
        		postData[this.name] = postData[this.name]+","+this.value;
        	}
    	}else{
    		postData[this.name] = this.value;
    	}
    });
	if(params){
		for(var q in params){
			if(q!=""){postData[q] = params[q];}
		}
	}
	$.ajax({
		type: "POST",dataType: "json",url: url,data:postData,
		success: function (d) {
			if(d.rc=="1"||d.rc=="success"){
				if(callBackFun){callBackFun(d.rs);}
				if(isClose=="1"){window.close();}
			}else{
				alert(d.rs);
			}
		},
		error : function() {alert("操作异常！");}
	});
}
//自定义弹出框--------------------------检验依据弹出框start--------------------------------------
//打开选择检验依据的弹出框，分隔符为； 多选 ，值为标准号+产品标准名称,回调函数名dialogCallBackInspStandard
function openDialogInspStandard(objName){
	separator="；";
	$("#dialogInspStandard").show();
	$("#dialogCallBackFunName").val('dialogCallBackInspStandard'); //回调函数名
	$("#dialogisMultiSelect").val("1"); //是否多选，1多选，0单选
	$("#dialogMultiValSeparator").val(separator); //多选时，分隔符
	$("#dialogSetObjIdId").val(""); //给id赋值，一般是隐藏域
	$("#dialogSetObjNameId").val(objName); //给名称赋值
	//每次打开弹出框时，根据已有的值更新被选中的值，页面上的值可能被手动修改过
	var dialogSelectedData=",";
	var objValue = $("#"+objName).val();
	if(objValue!=""){
		var arr=objValue.split(separator);
		for(var i=0;i<arr.length; i++){
			var name=arr[i];
			if(arr[i].indexOf("《")!=-1){name=name.substring(0,name.indexOf("《"));}
			dialogSelectedData+=name+",";
		}
	}
	$("#dialogSelectedData").val(dialogSelectedData);
	//打开后重新设置第一页的选中状态，
	initDialogPageCheckCommon("dialogInspStandard");
}
//选择检验依据的回调函数
function dialogCallBackInspStandard(d){
	if(d!=""){
		var arr = d.split("^^");
		var nameId = $("#dialogSetObjNameId").val();
		var oldNameVal = $("#"+nameId).val();
		var dialogSelectedData=$("#dialogSelectedData").val();
		var separator=$("#dialogMultiValSeparator").val();
		for(var i=0;i<arr.length;i++){
			var arr1 = arr[i].split("||"); //qualityStandId || qualityStandNumber || qualityStandName || isProdStandard ....
			if((separator+oldNameVal+"》").indexOf(separator+arr1[1]+"》")==-1){
				if(arr1[3]=="1"){ //产品标准需要拼接标准名称
					oldNameVal=oldNameVal+separator+arr1[1]+"《"+arr1[2]+"》";
				}else{
					oldNameVal=oldNameVal+separator+arr1[1];
				}
				dialogSelectedData+=arr1[1]+",";
			}
		}
		if(oldNameVal.substring(0,1)==separator){
			oldNameVal=oldNameVal.substring(1,oldNameVal.length);
		}
		$("#"+nameId).val(oldNameVal);
		$("#dialogSelectedData").val(dialogSelectedData);
	}
}
function f_replaceBr(vals) { 
	return vals.replace(/\n/g,"<br/>");
} 
