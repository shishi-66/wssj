//公共js
//时间自定义格式化函数
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
}
function allTrim(str){	
	return str.replace(/\s*/g,''); //去掉所有的空格
} 
function checkInputObjIntVal(obj,defv){
	if(isNaN(obj.value)||obj.value==""){
		obj.value=defv;
	}else{
		if(obj.value!="0"){ //允许输入0
			var reg = /^[1-9]*[1-9][0-9]*$/ ; //大于=0的正整数
			if(!reg.test(obj.value)){
				obj.value=defv;
			}
		}
	}
}
function checkInputInt(obj){
	if(isNaN(obj.value)||obj.value==""){
		obj.value="0";
	}else{
		if(obj.value!="0"){ //允许输入0
			var reg = /^[1-9]*[1-9][0-9]*$/ ; //大于0的正整数
			if(!reg.test(obj.value)){
				obj.value='';
			}
		}
	}
}
function checkInputFloat(obj){
	if(isNaN(obj.value)||obj.value==""){
		obj.value="0";
	}else{
		if(obj.value!="0"){ //允许输入0
			var reg =/(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
			if(!reg.test(obj.value)){
				obj.value='0';
			}else{
				//obj.value=parseFloat(obj.value).toFixed(2); //四舍五入
				obj.value=Math.floor(parseFloat(obj.value)* 100) / 100; //不四舍五入
			}
		}
	}
}
//保留两位小数  
//功能：将浮点数四舍五入，取小数点后2位 
function toDecimal(x) { 
if (isNaN(x)||x=="") { 
return 0; 
} 
return Math.round(parseFloat(x)*100)/100; 
}
//选中或取消td所在行的第一列的checkbox
function tdSelectRow(obj){
	var checkboxobj = $(obj).closest("tr").find("input[type='checkbox']");
	if(checkboxobj.length>=1){
		$(checkboxobj[0]).prop("checked",!checkboxobj[0].checked);
	}
	//obj.parentNode.childNodes[0].childNodes[0].checked=!obj.parentNode.childNodes[0].childNodes[0].checked;
}
function getCheckBoxChectedVals(chkname){
	var str="";
    var obj = document.getElementsByName(chkname);
    if(obj){
    	for(var k=0;k<obj.length;k++){
            if(obj[k].checked){
            	if(str==""){str=obj[k].value}
            	else{str=str+","+obj[k].value;}
            }            
        }
    }
    return str;
}
function getCheckBoxAllVals(chkname){
	var str="";
    var obj = document.getElementsByName(chkname);
    if(obj){
    	for(var k=0;k<obj.length;k++){
            if(str==""){str=obj[k].value}
            else{str=str+","+obj[k].value;}
        }
    }
    return str;
}
function chkall(thisobj,chkname){
	var obj = document.getElementsByName(chkname);
    if(obj){
    	for(var k=0;k<obj.length;k++){
            obj[k].checked=thisobj.checked;            
        }
    }
}
function initCheckBoxByData(objId,objName,d,defaultv){
	for(var i=0;i<d.length;i++){
		var flag="";
		if((","+defaultv+",").indexOf(","+d[i].value+",")!=-1){
			flag=" checked ";
		}
		$("#"+objId).append("<input type='checkbox' name='"+objName+"' "+flag+" value='"+d[i].value+"'>"+d[i].name);
	}
}
function initSelectByData(objId,d,defaultv){
	var selectedIndex=0;
	for(var i=0;i<d.length;i++){
		if(d[i].value==defaultv){selectedIndex=i;}
		//这种写法总是选中最后一个var flag=((d[i].value==defaultv)?'selected="selected"':''); 
		///$("#"+objId).append("<option "+flag+" value='"+d[i].value+"'>"+d[i].name+"</option>");
		document.getElementById(objId).options.add(new Option(d[i].name,d[i].value));
	}
	document.getElementById(objId).selectedIndex=selectedIndex;
}
function initSelectByStr(objId,str,defaultv,flag){
	if(!flag||flag==""){flag=",";}
	var selectedIndex=0;
	var d=str.split(flag);
	for(var i=0;i<d.length;i++){
		if(d[i]==defaultv){selectedIndex=i;}
		document.getElementById(objId).options.add(new Option(d[i],d[i]));
	}
	document.getElementById(objId).selectedIndex=selectedIndex;
}
function initSelectDictData(basePath,dictTypeCode,objId,defaultv){
	var url = basePath+"/dictInfo/getDictByTypeCode.do";
	var d=getAjaxData(url,{dictTypeCode:dictTypeCode},false);
	initSelectByData(objId,d,defaultv);
}
function initRadioDictData(basePath,dictTypeCode,objId,objName,defaultv){
	var url = basePath+"/dictInfo/getDictForRadio.do";
	var d=getAjaxData(url,{dictTypeCode:dictTypeCode},false);
	$("#"+objId).empty();
	var htms="";
	for(var i=0;i<d.length;i++){
		htms+="<label><input type='radio' class='radio' name='"+objName+"' value='"+d[i].value+"' ";
		if(d[i].value==defaultv){htms+=" checked ";}
		htms+=" ><span>"+d[i].label+"</span></label>";
	}
	$("#"+objId).append(htms);
}
function initSelect(url,param,defaultv,objId){
	var d=getAjaxData(url,param,false);
	initSelectByData(objId,d,defaultv);
}
function initRadio(objId,objName,json,value){
	$("#"+objId).empty();
	var htms="";
	$.each(json, function(idx, obj) {
		htms+="<label><input type='radio' class='radio' name='"+objName+"' value='"+obj.value+"' ";
		if(obj.value==value){
			htms+=" checked ";
		}
		htms+=" ><span>"+obj.name+"</span></label>";
	});
	$("#"+objId).append(htms);
}
function getJsonData(url,param,callbackfun){
	$.ajax({
		url: url,cache:false,type : "POST", async:true, 
		data :param,
		success: function(data){
			if(callbackfun&&callbackfun!=""){
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
				callbackfun(d);
			}
		}
	});
}
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
function exportByPost(url,params){
	var form=$("<form>");
	form.attr("action",url);
	form.attr("method","post");
	form.attr("target","_blank");
	if(params){
		for(var q in params){
			if(q!=""){
				form.append(createHiddenInputObj(q,params[q]));
			}
		}
	}
	$("body").append(form);
	form.submit();
	form.remove();
	//form.detach();
}
 
function createHiddenInputObj(name, value) {
	var input = document.createElement("input");
	input.type = "hidden";
	input.id = name;
	input.name = name;
	input.value = value;
	return input;
}

function getNowFormatDate() {
    return getFormatDate(new Date());
}
function getFormatDate(date) {
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//判断当前值是否为空 true:不为空， false:为空
function isNotNull(val){
	var value = $.trim(val);
	if(value != null && value != "null" && value != undefined && value != "" && value != "undefined"){
		return true;
	}else{
		return false;
	}
}
 
String.prototype.trim = function () {//删除左右两端的空格
	return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
};

function pasreEnDate(dateStr, forwardDate) {
	try {
		if (dateStr && dateStr.trim().length != 7) {
			return;
		}
		var dd = dateStr.substring(0, 2);
		var mm = dateStr.substring(2, 5);
		var yy = dateStr.substring(5, 7);
		mm = mm.toUpperCase();
		var em = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
		switch (mm) {
		  case em[0]:
			mm = 1;
			break;
		  case em[1]:
			mm = 2;
			break;
		  case em[2]:
			mm = 3;
			break;
		  case em[3]:
			mm = 4;
			break;
		  case em[4]:
			mm = 5;
			break;
		  case em[5]:
			mm = 6;
			break;
		  case em[6]:
			mm = 7;
			break;
		  case em[7]:
			mm = 8;
			break;
		  case em[8]:
			mm = 9;
			break;
		  case em[9]:
			mm = 10;
			break;
		  case em[10]:
			mm = 11;
			break;
		  case em[11]:
			mm = 12;
			break;
		}
		var now = new Date();
		var year = now.getFullYear();
		if (yy.length == 2) {
			//指定为10进制否则出问题
			yy = parseInt(yy,10); 
			if (forwardDate) { 
			    //只是当前日期以后的日期
				yy = 2000 + yy;
			} else {
				//如出生日期
				var miny = year - (2000 + yy);
				var maxy = year - (1900 + yy);
				if (miny > 0 || maxy < 100) {
					yy = 1900 + yy;
				} else {
					yy = 2000 + yy;
				}
			}
		}
		var nd = mm + "/" + dd + "/" + yy;
		var date2 = new Date(nd);
		return myGetDateText(date2);
	}
	catch (e) {
		return "";
	}
}

//将日期转化为2010-04-09格式的字符串
function myGetDateText(date1) {
	var dateStr = "";
	if (date1) {
		dateStr = date1.getFullYear();
		var month = date1.getMonth() + 1;
		var day = date1.getDate();
		if (month < 10) {
			dateStr += "-0" + month;
		} else {
			dateStr += "-" + month;
		}
		if (day < 10) {
			dateStr += "-0" + day;
		} else {
			dateStr += "-" + day;
		}
	}
	return dateStr;
}

 
//统计页面初始化
function initGrid(colnum,urls){
	$.ajax({  
		url: urls,type:'POST',   
		dataType: 'json',cache: false,  
		async:false,//此处必须为false,要先取值再进行后面的代码
		data:getQueryCondition(),
		success:function(data){
			//alert(JSON.stringify(data)); 
			var strs = "";
			for(var i=0;i<data.length;i++){
				strs+="<tr>";
				for(var j=1;j<=colnum;j++){
					strs+="<td align='center'>"+eval('data[i].col'+j)+"</td>";
				}
				strs+="</tr>";
			}
			//document.getElementById("innerBody").innerHTML=strs; //此方法ie6~9不支持
			var tbodyo = document.getElementsByTagName('tbody');
			var tbody=tbodyo[0];
			if(tbodyo.length>1){
				for(var i=0;i<tbodyo.length;i++){
					if(tbodyo[i].parentNode.id=="tjTable"){
						tbody=tbodyo[i];
						break;
					}
				}
			}
			var div = document.createElement('div'); 
			if(strs==""){
				div.innerHTML = '<table><tr><td colspan='+colnum+'>没有数据</td></tr></table>'; 
			}else{
				div.innerHTML = '<table>' + strs + '</table>'; 
			}
			tbody.parentNode.replaceChild(div.firstChild.firstChild, tbody);
		}
	});
}
/*
 * 初始化统计表格，清空前面几列相同的
 * colnum：总列数，clearNum：前面几列要清空
 */
function initGridClear(colnum,clearNum,urls){
	$.ajax({  
		url: urls,type:'POST',   
		dataType: 'json',  
		cache: false,  
		async:false,//此处必须为false,要先取值再进行后面的代码
		data:getQueryCondition(),
		success:function(data){
			//alert(JSON.stringify(data)); 
			var strs = "";
			for(var i=0;i<data.length;i++){
				strs+="<tr>";
				if(i==0){
					for(var j=1;j<=clearNum;j++){
    					strs+="<td align='center'>"+eval('data[i].col'+j)+"</td>";
    				}
				}else{
					for(var j=1;j<=clearNum;j++){
    					if(eval('data[i-1].col'+j)==eval('data[i].col'+j)){
    						strs+="<td></td>";
    					}else{
    						strs+="<td align='center'>"+eval('data[i].col'+j)+"</td>";
    					}
    				}
				}
				for(var j=(clearNum+1);j<=colnum;j++){
					strs+="<td align='center'>"+eval('data[i].col'+j)+"</td>";
				}
				strs+="</tr>";
			}
			//document.getElementById("innerBody").innerHTML=strs; //此方法ie6~9不支持
			var tbodyo = document.getElementsByTagName('tbody');
			var tbody=tbodyo[0];
			if(tbodyo.length>1){
				for(var i=0;i<tbodyo.length;i++){
					if(tbodyo[i].parentNode.id=="tjTable"){
						tbody=tbodyo[i];
						break;
					}
				}
			}
			var div = document.createElement('div'); 
			if(strs==""){
				div.innerHTML = '<table><tr><td colspan='+colnum+'>没有数据</td></tr></table>'; 
			}else{
				div.innerHTML = '<table>' + strs + '</table>'; 
			}
			tbody.parentNode.replaceChild(div.firstChild.firstChild, tbody);
		}
	});
}
//统计列中的数据链接用post方式打开新窗口
//urls:获取统计数据的url,showurl:点击某个统计结果时打开的url,colnum:要显示的列数
//indexi:要在第几列上放链接，parani:链接地址的参数所表示的name的值所在的列
function initGridUrlPost(urls,showurl,colnum,indexi,paranm,parani){
	$.ajax({  
		url: urls,type:'POST',dataType: 'json',cache: false,  
		async:false,//此处必须为false,要先取值再进行后面的代码
		data:getQueryCondition(),
		success:function(data){
			//alert(JSON.stringify(data)); 
			var strs = "";
			for(var i=0;i<data.length;i++){
				strs+="<tr>";
				for(var j=1;j<=colnum;j++){
					if(j==indexi){
						var vz=eval('data[i].col'+parani);
						strs+="<td align='center'><a href='#'  onclick=\"openPostWindow('"+showurl+"','"+paranm+"','"+vz+"')\" >"+eval('data[i].col'+j)+"</a></td>";
					}else{
						strs+="<td align='center'>"+eval('data[i].col'+j)+"</td>";
					}
				}
				strs+="</tr>";
			}
			//document.getElementById("innerBody").innerHTML=strs; //此方法ie6~9不支持
			var tbodyo = document.getElementsByTagName('tbody');
			var tbody=tbodyo[0];
			if(tbodyo.length>1){
				for(var i=0;i<tbodyo.length;i++){
					if(tbodyo[i].parentNode.id=="tjTable"){
						tbody=tbodyo[i];
						break;
					}
				}
			}
			var div = document.createElement('div'); 
			if(strs==""){
				div.innerHTML = '<table><tr><td colspan='+colnum+'>没有数据</td></tr></table>'; 
			}else{
				div.innerHTML = '<table>' + strs + '</table>'; 
			}
			tbody.parentNode.replaceChild(div.firstChild.firstChild, tbody);
		}
	});
}
function openPostWindow(url, paranm,paranv){  
   var tempForm = document.createElement("form");  
   tempForm.id="tempForm1";  
   tempForm.method="post";  
   tempForm.action=url;  
   tempForm.target="_blank";  

   if(paranv!=""&&paranv!="合计"&&paranv!="小计"&&paranv!="总计"){
	   var hideInput = document.createElement("input");  
	   hideInput.type="hidden";  
	   hideInput.name= paranm;
	   hideInput.value= paranv;
	   tempForm.appendChild(hideInput);
   }
   
   var jsonobj= getQueryCondition();
   for(var key in jsonobj){
	   hideInput = document.createElement("input");  
	   hideInput.type="hidden";  
	   hideInput.name= key;
	   hideInput.value= jsonobj[key];
	   tempForm.appendChild(hideInput);
   }
   document.body.appendChild(tempForm);  
   tempForm.submit();
   document.body.removeChild(tempForm);
}
//window.open('about:blank',name,'height=700, width=1200, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');   

//对百分比的处理，如100.00%改成100%，0.00%改成0
function percentSet(){
	var objTable=document.getElementById ("tjTable");
	var rows = objTable.rows.length;
	var colums = objTable.rows[0].cells.length;
	for(var j=1;j<rows;j++){
		for(var k=0;k<colums;k++){
			var rowobj = objTable.getElementsByTagName("tr")[j];
			var cellobj = rowobj.getElementsByTagName("td")[k];
			var s1=cellobj.innerHTML;
			if(s1=="0.00%"){
				cellobj.innerHTML="0";
			}else{
				if(s1.substring(s1.length-4)==".00%"){
					cellobj.innerHTML=s1.substring(0,s1.length-4)+"%";
				}else{
					if(s1.substring(s1.length-3)==".0%"){
						cellobj.innerHTML=s1.substring(0,s1.length-3)+"%";
					}
				}
			}
		}
	}
}
//统计页面导出按钮
function expoExcel(expourl){  
	$("#fileTitle").val(document.getElementById("tjTitle").innerHTML);
	var objTable=document.getElementById ("tjTable");
	var rows = objTable.rows.length;
	var colums = objTable.rows[0].cells.length;
	$("#closNum").val(colums);
	var tempArr = [];
	for(var i=0;i<colums;i++){
		tempArr.push(objTable.rows[0].cells[i].innerText);
	}
	$("#columnTitle").val(tempArr);
	var tempArr2 = [];
	for(var j=1;j<rows;j++){
		for(var k=0;k<colums;k++){
			tempArr2.push(objTable.rows[j].cells[k].innerText);
		}
	}
	$("#cellData").val(tempArr2);
	if($("#cellData").val()==""){
		return alert("无数据导出！");
	}
	document.formTj.action=expourl;
	document.formTj.submit();
}
 
//给空值补/
function fixNull(objId,sval){
	try{
		var objv = document.getElementById(objId);
		if(objv.value==""){
			objv.value=sval;
		}
	}catch(e){
		alert(objId+":"+e.message);
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
			if(q!=""){
				postData[q] = params[q];
			}
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
function flagBeforesave(){
	var flag=true;
	var elements = document.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
		if(elements[i].hasAttribute('placeholder')){
			var sname=elements[i].getAttribute("placeholder");
			if(sname.indexOf("必填")!=-1){
				if(elements[i].value==""){
					alert(sname);
					flag=false;
					break;
				}
			}
		}
	}
	return flag;
}
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