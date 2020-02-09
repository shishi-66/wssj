/**
 * 前台分页处理
 * @param obj						分页容器
 * @param url						获取数据的url
 * @param parameter					请求参数对象
 * @param dataRows					是执行一行数据还是所有数据的回调函数
 * @param callBackListFunction		显示当前页数据的回调函数
 */
function grid(pageObj,url,parameter,totalObj,listObj,callBackListFunction,dataRows){
	if(!parameter.hasOwnProperty("pageSize")){
		parameter["pageSize"]=10;
		parameter["pageNo"]=1;
	}
	pageObj.empty(); //先清空掉分页对象
	var defaults={
			skin:'molv',
			groups:5,//
			skip:false,//
			first:false,//
			last:false,
			prev:"上一页",
			next:"下一页"	
	};
	var notfirst = false;
	var options = $.extend(defaults, "");
	$.ajax({
		url:url,type:"post",async:false,dataType:"json",data:parameter,
		success:function(res){
			if(totalObj){
				totalObj.text(res.records);
			}
			if(callBackListFunction){
				listObj.empty();
				if(dataRows=="1"){
					$(res.rows).each(function(i,data) { 		
						listObj.append(callBackListFunction(data));
					});	
				}else{
					callBackListFunction(res.rows);
				}
			}
			if(res.total>1){
				laypage({
					cont: pageObj, //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
					pages: res.total, //通过后台拿到的总页数
					curr:  res.page, 
					first: false,
					skin: options.skin,
					groups: options.groups,
					skip:options.skip,//
					first:options.first,//
					last:options.last,
					prev:options.prev,
					next:options.next,
					jump: function(e){ //触发分页后的回调
						parameter["pageNo"] = e.curr;
						if(notfirst){
							$.ajax({
								url :url,type : "post",async: false,dataType : "json",data:parameter,
		        				success:function(res) {
		        					e.total = e.last = res.total; //重新获取总页数，一般不用写
		        					if(totalObj){
		        						totalObj.text(res.records);
		        					}
		        					if(callBackListFunction){
		        						listObj.empty();
		        						if(dataRows=="1"){
		        							$(res.rows).each(function(i,data) { 		
		        								listObj.append(callBackListFunction(data));
		        							});	
		        						}else{
		        							callBackListFunction(res.rows);
		        						}
		        					}
		        				}  
							});  
						}
					}				
				});
				notfirst=true;
			}
         }  
     }); 
}
function gridNoPage(url,parameter,divTotalId,divDataId,callBackListFunction){
	$.ajax({
		url :url,type : "post",async: false,dataType : "json",
		data:parameter,
		success:function(res) {
			if(res==null||res==""){
				alert("没有找到匹配的结果！");
				$("#"+divDataId).empty();
				if(divTotalId!=null&&divTotalId!=""){
					$("#"+divTotalId).text("0");
				}
			}else{
				if(divTotalId!=null&&divTotalId!=""){
					$("#"+divTotalId).text(res.length);
				}
				$("#"+divDataId).empty();
				for(var i=0;i<res.length;i++){
					$("#"+divDataId).append(callBackListFunction(res[i]));
				}
			}
		}
     });  
}
var selectedRowIds="";
function getSelectedRowIds(){
	selectedRowIds="";
	var inputCheckboxArr = $("#wTableCommon input[type='checkbox']");
	var arrRowIndex=[];
	for(var i=1;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			var id=$(inputCheckboxArr[i]).closest("tr").find("input[name='row_id']").val();
			if(selectedRowIds==""){selectedRowIds=id;}
			else{selectedRowIds+=","+id;}
			arrRowIndex.push(i);
		}
	}
	return arrRowIndex;
}
function getDialogSelectedIds(isMulti){
	var arrRowIndex=getSelectedRowIds();
	if(isMulti=="0"){
		if(arrRowIndex.length!=1){
			alert("请选择一行数据");
			return "";
		}
	}else{
		if(arrRowIndex.length<1){
			alert("请至少选择一行数据");
			return "";
		}
	}
	return selectedRowIds;
}
//如何打开在原页面决定
function editDataRow(){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length!=1){
		alert("请选择一行数据");
	}else{
		toEdit(selectedRowIds);
	}
}
//设置弹出框全屏，且无操作按钮
function resetDialogObjectInfoFull(){
	$("#dialogObjectInfo").show();
	$("#dialogObjectInfo_btn").hide();//隐藏 按钮
	$("#dialogObjectInfo").css("top","1px");
	$("#dialogObjectInfo .dialog_base").css("width",$(window).width()+"px");
	$("#dialogObjectInfo .dialog_base").css("padding-bottom","1px");
	$("#dialogObjectInfo .dialog_c").css("height",($(window).height()-30)+"px");
}
//内嵌方式打开查看或修改页面
function toViewInner(url,id){
	var flag=true;
	if(id==""){
		flag=false;
		var arrRowIndex=getSelectedRowIds();
		if(arrRowIndex.length!=1){
			alert("请选择一行数据");
		}else{
			id=selectedRowIds;flag=true;
		}
	}
	if(flag==true&&id!=""){
		$("#divRight").load(url+id);
	}
}
//弹出窗口方式打开查看页面
function toViewInDialog(url,id,width,height){
	var flag=true;
	if(id==""){
		flag=false;
		var arrRowIndex=getSelectedRowIds();
		if(arrRowIndex.length!=1){
			alert("请选择一行数据");
		}else{
			id=selectedRowIds;flag=true;
		}
	}
	if(flag==true&&id!=""){
		if(width==""){
			width=$(window).width()-200;
		}
		$("#dialogObjectInfo_content").load(url+id);
		$("#dialogObjectInfo .dialog_base").css("width",width+"px");
		if(height!=""){
			$("#dialogObjectInfo .dialog_c").css("height",height+"px");
		}
		$("#dialogObjectInfo").show();
		$("#dialogObjectInfoBtnSave").hide();//隐藏保存按钮
	}
}
//弹出窗口方式打开修改页面
function toEditInDialog(url,id,width,height){
	var flag=true;
	if(id==""){
		flag=false;
		var arrRowIndex=getSelectedRowIds();
		if(arrRowIndex.length!=1){
			alert("请选择一行数据");
		}else{
			id=selectedRowIds;flag=true;
		}
	}
	if(flag==true&&id!=""){
		if(width==""){
			width=$(window).width()-200;
		}
		$("#dialogObjectInfo_content").load(url+id);
		$("#dialogObjectInfo .dialog_base").css("width",width+"px");
		if(height!=""){
			$("#dialogObjectInfo .dialog_c").css("height",height+"px");
		}
		$("#dialogObjectInfo").show();
		$("#dialogObjectInfoBtnSave").show();//显示保存按钮
	}
}
//弹出窗口方式打开新增页面
function toAddInDialog(url,width,height){
	if(width==""){
		width=$(window).width()-200;
	}
	$("#dialogObjectInfo_content").load(url);
	$("#dialogObjectInfo .dialog_base").css("width",width+"px");
	if(height!=""){
		$("#dialogObjectInfo .dialog_c").css("height",height+"px");
	}
	$("#dialogObjectInfo").show();
	$("#dialogObjectInfoBtnSave").show();//显示保存按钮
}
function dialogObjectInfoBtnSave(isfresh){
	var flag=true;
	try{
		if(!validform.form()){
			flag=false;
			msgDialog("","数据验证失败,请重新填写红色提示处的内容！",3000,"","","");
		}
	}catch(e){;}
	if(flag==true){
		document.getElementById("form1_save").onclick();
		if(isfresh=="1"){
			setTimeout("seachByPage();",500);//等保存做完再执行
		}
		$("#dialogObjectInfo").hide();
	}
}
//删除
function deleteDataRow(url){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请选择要删除的行");
	}else{
		if(window.confirm("确定要删除选择的数据吗？")){
			var d=getAjaxData(url+selectedRowIds,{},false);
			if(d.rc == "1"||d.rc=="success"){
				var inputCheckboxArr = $("#wTableCommon input[type='checkbox']");
				arrRowIndex.forEach(function(v){  
					$(inputCheckboxArr[parseInt(v)]).closest("tr").remove();
				});
				try{
					var totals=parseInt($("#totalSpan").text());
					if(totals-arrRowIndex.length>=0){
						$("#totalSpan").text(totals-arrRowIndex.length);
					}else{
						$("#totalSpan").text(0);
					}
				}catch(e){;}
			}
		}
	}
}
function deleteDataRowByCondition(url,keyname,param){
	var arrRowIndex=getSelectedRowIds();
	if(arrRowIndex.length==0){
		alert("请选择要删除的行");
	}else{
		if(window.confirm("确定要删除选择的数据吗？")){
			param[keyname]=selectedRowIds;
			var d=getAjaxData(url,param,false);
			if(d.rc == "1"){
				var inputCheckboxArr = $("#wTableCommon input[type='checkbox']");
				arrRowIndex.forEach(function(v){  
					$(inputCheckboxArr[parseInt(v)]).closest("tr").remove();
				});
				try{
					var totals=parseInt($("#totalSpan").text());
					if(totals-arrRowIndex.length>=0){
						$("#totalSpan").text(totals-arrRowIndex.length);
					}else{
						$("#totalSpan").text(0);
					}
				}catch(e){;}
			}
		}
	}
}

/*! layPage v1.2 - 分页插件 By 贤心 http://sentsin.com/layui/laypage MIT License */
;!function(){"use strict";function a(d){var e="laypagecss";a.dir="dir"in a?a.dir:f.getpath+"/laypage.css",new f(d),a.dir&&!b[c](e)&&f.use(a.dir,e)}var b,c,d,e,f;a.v="1.2",b=document,c="getElementById",d="getElementsByTagName",e=0,f=function(a){var b=this,c=b.config=a||{};c.item=e++,b.render(!0)},f.on=function(a,b,c){return a.attachEvent?a.attachEvent("on"+b,function(){c.call(a,window.even)}):a.addEventListener(b,c,!1),f},f.getpath=function(){var a=document.scripts,b=a[a.length-1].src;return b.substring(0,b.lastIndexOf("/")+1)}(),f.use=function(c,e){var f=b.createElement("link");f.type="text/css",f.rel="stylesheet",f.href=a.dir,e&&(f.id=e),b[d]("head")[0].appendChild(f),f=null},f.prototype.type=function(){var a=this.config;return"object"==typeof a.cont?void 0===a.cont.length?2:3:void 0},f.prototype.view=function(){var b=this,c=b.config,d=[],e={};c.pages=0|c.pages,c.curr=0|c.curr||1,c.groups="groups"in c?0|c.groups:5,c.first="first"in c?c.first:1,c.last="last"in c?c.last:c.pages,c.prev="prev"in c?c.prev:"上一页",c.next="next"in c?c.next:"下一页",c.groups>c.pages&&(c.groups=c.pages),e.index=Math.ceil((c.curr+(c.groups>1&&c.groups!==c.pages?1:0))/(0===c.groups?1:c.groups)),c.curr>1&&c.prev&&d.push('<a href="javascript:;" class="laypage_prev" data-page="'+(c.curr-1)+'">'+c.prev+"</a>"),e.index>1&&c.first&&0!==c.groups&&d.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="首页">'+c.first+"</a><span>…</span>"),e.poor=Math.floor((c.groups-1)/2),e.start=e.index>1?c.curr-e.poor:1,e.end=e.index>1?function(){var a=c.curr+(c.groups-e.poor-1);return a>c.pages?c.pages:a}():c.groups,e.end-e.start<c.groups-1&&(e.start=e.end-c.groups+1);for(;e.start<=e.end;e.start++)e.start===c.curr?d.push('<span class="laypage_curr" '+(/^#/.test(c.skin)?'style="background-color:'+c.skin+'"':"")+">"+e.start+"</span>"):d.push('<a href="javascript:;" data-page="'+e.start+'">'+e.start+"</a>");return c.pages>c.groups&&e.end<c.pages&&c.last&&0!==c.groups&&d.push('<span>…</span><a href="javascript:;" class="laypage_last" title="尾页"  data-page="'+c.pages+'">'+c.last+"</a>"),e.flow=!c.prev&&0===c.groups,(c.curr!==c.pages&&c.next||e.flow)&&d.push(function(){return e.flow&&c.curr===c.pages?'<span class="page_nomore" title="已没有更多">'+c.next+"</span>":'<a href="javascript:;" class="laypage_next" data-page="'+(c.curr+1)+'">'+c.next+"</a>"}()),'<div name="laypage'+a.v+'" class="laypage_main laypageskin_'+(c.skin?function(a){return/^#/.test(a)?"molv":a}(c.skin):"default")+'" id="laypage_'+b.config.item+'">'+d.join("")+function(){return c.skip?'<span class="laypage_total"><label>到第</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>页</label><button type="button" class="laypage_btn">确定</button></span>':""}()+"</div>"},f.prototype.jump=function(a){var i,j,b=this,c=b.config,e=a.children,g=a[d]("button")[0],h=a[d]("input")[0];for(i=0,j=e.length;j>i;i++)"a"===e[i].nodeName.toLowerCase()&&f.on(e[i],"click",function(){var a=0|this.getAttribute("data-page");c.curr=a,b.render()});g&&f.on(g,"click",function(){var a=0|h.value.replace(/\s|\D/g,"");a&&a<=c.pages&&(c.curr=a,b.render())})},f.prototype.render=function(a){var d=this,e=d.config,f=d.type(),g=d.view();2===f?e.cont.innerHTML=g:3===f?e.cont.html(g):b[c](e.cont).innerHTML=g,e.jump&&e.jump(e,a),d.jump(b[c]("laypage_"+e.item)),e.hash&&!a&&(location.hash="!"+e.hash+"="+e.curr)},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:window.laypage=a}();