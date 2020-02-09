////---------------------检验管理表单用----------------------------------
//打开流程记录弹出框
function openDialogInspFlow(){
	$("#dialogInspFlowTitle").text(document.getElementById("inspSampNumber").value+" 的流程记录");
	$("#dialogInspFlow").show();
	initDialogInspFlowData();  //执行弹出框里面的函数
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
  

//检验项目检验结果查看
function loadItemRow_view(json){
	var itemHtml="";
	var isFy=false;
	if($("#isFy").val()=="1"){
		isFy=true;
	}
	var fymcFirst="!@#";
	for(var i=0;i<json.length;i++){
		var data=json[i];
		var td1="<td align='center'>"+(i+1)+"</td>";
		var tdFymc="<td></td>";
		if(isFy){
			if(data.inspItemFymc!=fymcFirst){
				tdFymc="<td>"+data.inspItemFymc+"</td>";
				fymcFirst=data.inspItemFymc;
			}
		}
		var tdXmmc="<td><div class='item'>"+data.inspItemName+"</div></td>";
		var tdDw="<td align='center'>"+data.inspItemDw+"</td>";
		var tdDj="<td align='center'>"+data.inspItemGrade+"</td>";
		var tdBzyq="<td>"+f_replaceBr(data.inspItemRequire)+"</td>";
		var tdJyjg="<td>"+f_replaceBr(data.inspItemResult)+"</td>"
		var tdJyff="<td>"+f_replaceBr(data.inspItemJyff)+"</td>";
		var tdJyyj="<td>"+f_replaceBr(data.qualityStandNumber)+"</td>";
		var personName=[];
		if(data.istjx=="1"){
			var personstr = (data.hasOwnProperty('inspItemPersonName')?data.inspItemPersonName:'');
			if(personstr!=""){  //id^name,id^name
				var arr1=personstr.split(",");
				for(var ii=0;ii<arr1.length;ii++){
					personName.push(arr1[ii].substring(arr1[ii].indexOf("^")+1));
				}
			}
		}
		var tdJyy="<td align='center'>"+personName.join(',')+"</td>";
		var tdPd="<td align='center'>"+data.qualifiedStateName+"</td>";
		if(data.qualifiedState=='0'){
			tdPd="<td align='center'><font color='red'>"+data.qualifiedStateName+"</font></td>";
		}
		if(data.qualifiedState=='2'){
			tdPd="<td align='center'><font color='#858585'>"+data.qualifiedStateName+"</font></td>";
		}
		if(data.istjx=="1"&&data.iszbx=="1"){ //1.无小项的大项
			itemHtml+="<tr class='tr-lev-1'>"+td1;
			if(isFy){
				itemHtml+=tdFymc;
			}
			itemHtml+=tdXmmc; //项目名称
			itemHtml+=tdDw; //单位
			itemHtml+=tdDj; //等级
			itemHtml+=tdBzyq; //标准要求
			itemHtml+=tdJyjg; //检验结果
			itemHtml+=tdPd; //合格判定
			itemHtml+=tdJyff; //检验方法
			itemHtml+=tdJyyj;  //检验依据
			itemHtml+=tdJyy; //检验员
			itemHtml+="</tr>";
		}//无小项的大项end
		if(data.istjx=="1"&&data.iszbx=="0"){ //2.有小项的大项
			itemHtml+="<tr class='tr-lev-1 tr-lev-1-c'>"+td1;
			if(isFy){
				itemHtml+=tdFymc;
			}
			itemHtml+=tdXmmc; //项目名称
			itemHtml+=tdDw; //单位
			itemHtml+="<td></td>"; //等级
			itemHtml+="<td></td>"; //标准要求
			itemHtml+="<td></td>"; //检验结果
			itemHtml+=tdPd; //合格判定
			itemHtml+=tdJyff; //检验方法
			itemHtml+=tdJyyj;  //检验依据
			itemHtml+=tdJyy; //检验员
			itemHtml+="</tr>";
		}//有小项的大项end
		if(data.istjx=="0"&&data.iszbx=="1"){ //3.小项
			itemHtml+="<tr class='tr-lev-2'>"+td1;
			if(isFy){
				itemHtml+="<td>&nbsp;</td>";
			}
			//项目名称的处理：
			itemHtml+="<td class='td-itemxx'>";
			var middleArr =data.itemMiddleName.split("^^");
			var divCount = (data.inspItemCode.length-2)/2-1;
			//1.写空div 
			if(data.itemMiddleName!=""){
				for(var x1=0;x1<(divCount-1-middleArr.length);x1++){
					itemHtml+="<div class='item-child len-"+divCount+"'>&nbsp;</div>";
				}
			}else{
				for(var x1=0;x1<(divCount-1);x1++){
					itemHtml+="<div class='item-child len-"+divCount+"'>&nbsp;</div>";
				}
			}
			//2.写中间项目
			if(data.itemMiddleName!=""){
				for(var x2=0;x2<middleArr.length;x2++){
					itemHtml+="<div class='item-child len-"+divCount+"'><i class='icon-angle-right'></i>"+middleArr[x2]+"</div>";
				}
			}
			//3.写自己
			itemHtml+="<div class='item-child len-"+divCount+"'><i class='icon-angle-right'></i>"+data.inspItemName+"</div>";
			itemHtml+="</td>";
			//项目名称end
			itemHtml+=tdDw; //单位
			itemHtml+=tdDj; //等级
			itemHtml+=tdBzyq; //标准要求
			itemHtml+=tdJyjg; //检验结果
			itemHtml+=tdPd; //合格判定
			itemHtml+="<td></td>"; //检验方法
			itemHtml+="<td></td>";
			itemHtml+="<td></td>"; //检验员
			itemHtml+="</tr>";
		}//小项end
	}
	//document.getElementById("tdForItem").innerHTML=strs; //此方法ie6~9不支持
	var tbodyo = document.getElementsByTagName('tbody');
	var tbody=tbodyo[0];
	if(tbodyo.length>1){
		for(var i=0;i<tbodyo.length;i++){
			if(tbodyo[i].parentNode.id=="bgbzTable"){
				tbody=tbodyo[i];
				break;
			}
		}
	}
	var div = document.createElement('div'); 
	div.innerHTML = '<table >' + itemHtml + '</table>'; 
	tbody.parentNode.replaceChild(div.firstChild.firstChild, tbody);
	//document.getElementById("tdForItem").innerHTML=tbHead+itemHtml+"</table>";
}
function exportBg(basepath,key){
   	window.open(basepath+"/insp/export_bg.do?key="+key);
}
function viewBg(basepath,key){
   	window.open(basepath+"/insp/jybgActivexView.do?key="+key);
}
