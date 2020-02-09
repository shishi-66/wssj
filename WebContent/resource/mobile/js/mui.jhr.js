//滚动穿透
function fixedBody(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;';
}
function looseBody() {
    var body = document.body;
    body.style.position = '';
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}
//弹出层
function jPopupShow(){
	jPopup_mask.show();
	$("#j_popup_box").show();
	fixedBody();
}
//弹出层关闭
function jPopupClose(){
	jPopup_mask._remove();
	$("#j_popup_box").hide();
	$(".j_popup__content").empty();
	$(".mui-scroll").css("transform","translate3d(0px, 0px, 0px)  translateZ(0px)");//还原mui-scroll位置，否则会出现内容显示不正确的bug
	looseBody();
}

//带搜索弹出层
function jPopupIdShow(jPopId){
	jPopup_mask.show();
	$("#"+jPopId).show();
	fixedBody();
}
//带搜索弹出层关闭
function jPopupIdClose(jPopId){
	jPopup_mask._remove();
	$("#"+jPopId).hide();
	$(".j_popup__content").empty();
	$(".j_select__option").removeClass("active");
	$(".mui-scroll").css("transform","translate3d(0px, 0px, 0px)  translateZ(0px)");
	looseBody();
}
//修改页面item赋初始值
function initItemsValue(realId,realValues,flag){
	var htmlitem="";
	var optionValue=realValues.split(flag);	
	for(var i=0;i<optionValue.length;i++){
		htmlitem+="<div class='j_item j_spe_item--jyxm' id='self"+realId+i+"'>";
		htmlitem+="<div class='j_item__tools'><button type='button' onclick=\"delSelf('"+realId+"','"+flag+"','self"+realId+i+"','"+optionValue[i]+"')\"><i class='mui-icon mui-icon-closeempty'></i></button></div>";
		htmlitem+="<div class='j_item__title'>"+optionValue[i]+"</div>";
		htmlitem+="</div>";		
	}	
	$("#"+realId+"List").html(htmlitem);
}
//获取弹出的列表中选中的值，完成赋值操作
function setPopMulitiData(realId,flag){
	var realValues = $("#"+realId).val();
	$("#optionsMulti-"+realId+" input[name='j_select_checkbox']:checked").each(function(){
		if(this.value!=""&&(flag+realValues+flag).indexOf(flag+this.value+flag)==-1){
			if(realValues==""){realValues=this.value;}
			else{realValues=realValues+flag+this.value;}
		}
	});	
	$("#"+realId).val(realValues);
	var htmlitem="";
	var optionValue=realValues.split(flag);
	for(var i=0;i<optionValue.length;i++){
		htmlitem+="<div class='j_item j_spe_item--jyxm' id='self"+realId+i+"'>";
		htmlitem+="<div class='j_item__tools'><button type='button' onclick=\"delSelf('"+realId+"','"+flag+"','self"+realId+i+"','"+optionValue[i]+"')\"><i class='mui-icon mui-icon-closeempty'></i></button></div>";
		htmlitem+="<div class='j_item__title'>"+optionValue[i]+"</div>";
		htmlitem+="</div>";		
	}	
	$("#"+realId+"List").html(htmlitem);
	$("#items"+realId).empty();
	jPopupIdClose("jPopup"+realId);
}
//将手动录入的值加入到真实值中
function addInputValtoList(realId,flag){
	if($("#input_"+realId).val()!=""){
		var arr=$("#input_"+realId).val().split(flag);
		var realValues = $("#"+realId).val();
		for(var i=0;i<arr.length;i++){
			if((flag+realValues+flag).indexOf(flag+arr[i]+flag)==-1){
				if(realValues==""){realValues=arr[i];}
				else{realValues=realValues+flag+arr[i];}
			}
		}
		$("#"+realId).val(realValues);
		var htmlitem="";
		var optionValue=realValues.split(flag);
		for(var i=0;i<optionValue.length;i++){
			htmlitem+="<div class='j_item j_spe_item--jyxm' id='self"+realId+i+"'>";
			htmlitem+="<div class='j_item__tools'><button type='button' onclick=\"delSelf('"+realId+"','"+flag+"','self"+realId+i+"','"+optionValue[i]+"')\"><i class='mui-icon mui-icon-closeempty'></i></button></div>";
			htmlitem+="<div class='j_item__title'>"+optionValue[i]+"</div>";
			htmlitem+="</div>";		
		}	
		$("#"+realId+"List").html(htmlitem);
		$("#input_"+realId).val("");
	}
}
function delSelf(realId,flag,i,delValue){
	$("#"+i).remove();
	var arr=$("#"+realId).val().split(flag);
	var str="";
	for(var j=0;j<arr.length;j++){
		if(arr[j]!=delValue){
			if(str==""){str=arr[j];}
			else{str=str+flag+arr[j];}
		}
	}
	$("#"+realId).val(str);
}
//单项下拉打开
function popRadioCustom(objid,objname,data,defaultv,dataaddon){
	jPopupShow();
	var wHeight=$(window).height();
	var popHeight=44+80;
	var html="<div class='j_items--radio' id='optionRadio'>";
	for(var i=0;i<data.length;i++){
		if(data[i].value!=""){
			if(popHeight<(wHeight-80)){
				popHeight+=42;
			}
			html+="<div class='j_item--radio'>";
			html+="	<div class='mui-radio mui-left'>";
			html+="		<label>"+data[i].name+"</label>";
			html+="		<input name='j_select_radio' type='radio' value='"+data[i].value+"' title='"+data[i].name+"' ";
			if(defaultv==data[i].value){
				html+=" class='input_active' checked ";
			}
			html+="		>";
			html+="	</div>";	
			html+="</div>";
		}			
	}
	html+="</div>";	
	$(".j_popup--select").height(popHeight+"px");
	$(".j_popup--select").css("top",((wHeight-popHeight)/2)+"px");
	$(".j_popup__content").html(html);
	$("#j_popup__ok").attr("onclick","closePopRadioCustom('"+objid+"','"+objname+"','"+dataaddon+"')");
	$('#optionRadio').find("input[name='j_select_radio']").each(function() {
		$(this).click(function() {
			$("#optionRadio input[name='j_select_radio']").removeClass("input_active");
			$(this).addClass("input_active");
		})
	})	
}
//单选下拉关闭
function closePopRadioCustom(objid,objname,dataaddon){
	var optionValue=$("#optionRadio input[name='j_select_radio']:checked").val();
	if(dataaddon==1){
		if(objid){$("#"+objid).val(optionValue);}
		if(objname){
			var optionName=$("#optionRadio input[name='j_select_radio']:checked").attr("title");
			$("#"+objname).val(optionName);
		}
	}
	if(dataaddon==2){
		if(objid){$("#"+objid).val($("#"+objid).val()+optionValue);}
		if(objname){
			var optionName=$("#optionRadio input[name='j_select_radio']:checked").attr("title");
			$("#"+objname).val($("#"+objname).val()+optionName);
		}
	}
	$("#j_popup__ok").attr("onclick","");
	jPopupClose();
}
//多选下拉打开
function popCheckboxCustom(objid,objname,data,defaultv,dataaddon){
	jPopupShow();
	var wHeight=$(window).height();
	var popHeight=44+80;	
	var html="<div class='j_items--radio' id='optionRadio'>";
	for(var i=0;i<data.length;i++){
		if(data[i].value!=""){
			if(popHeight<(wHeight-80)){
				popHeight+=42;
			}			
			html+="<div class='j_item--radio'>";
			html+="	<div class='mui-checkbox mui-left'>";
			html+="		<label>"+data[i].name+"</label>";
			html+="		<input name='j_select_checkbox' type='checkbox' value='"+data[i].value+"' title='"+data[i].name+"' ";
			if((","+defaultv+",").indexOf(","+data[i].value+",")!=-1){
				html+=" class='input_active' checked ";
			}
			html+="		>";
			html+="	</div>";	
			html+="</div>";
		}			
	}
	html+="</div>";	
	$(".j_popup--select").height(popHeight+"px");
	$(".j_popup--select").css("top",((wHeight-popHeight)/2)+"px");	
	$(".j_popup__content").html(html);
	$("#j_popup__ok").attr("onclick","closePopCheckboxCustom('"+objid+"','"+objname+"','"+dataaddon+"')");
	$('#optionRadio').find("input[name='j_select_checkbox']").each(function() {
		var thisthsi=this;
		$(this).click(function() {
			if(this.checked==false){
				$(thisthsi).removeClass("input_active");
			}
		})
	})	
}

//多选下拉关闭
function closePopCheckboxCustom(objid,objname,dataaddon){
	var optionValue=[];	
	$("#optionRadio input[name='j_select_checkbox']:checked").each(function(){
		optionValue.push($(this).val());
	});
	var optionName=[];	
	$("#optionRadio input[name='j_select_checkbox']:checked").each(function(){
		optionName.push($(this).attr("title"));
	});	
	if(dataaddon==1){
		if(objid){$("#"+objid).val(optionValue);}
		if(objname){$("#"+objname).val(optionName);}
	}
	if(dataaddon==2){
		if(objid){$("#"+objid).val($("#"+objid).val()+optionValue);}
		if(objname){$("#"+objname).val($("#"+objname).val()+optionName);}
	}
	$("#j_popup__ok").attr("onclick","");
	jPopupClose();
}
function pickerrq(objid,types){
	var pickerObj=$(".mui-poppicker");
	if($(pickerObj).length>0){
		$(pickerObj).remove();
	}
	var dtPicker = new mui.DtPicker({
		"type": types
	}); 
	dtPicker.show(function (items) {
		$("#"+objid).val(items);
		dtPicker.dispose()
	})
}
function pickerPop(objid,objname,data,defaultval){
	var pickerObj=$(".mui-poppicker");
	if($(pickerObj).length>0){
		$(pickerObj).remove();
	}
	var picker = new mui.PopPicker(); 
	picker.setData(data);
	//picker.pickers[0].setSelectedIndex(4, 2000);
	//picker.pickers[0].setSelectedValue('fourth', 2000);
	if(defaultval){
		picker.pickers[0].setSelectedValue(defaultval, 2000);
	}
	picker.show(function (items) {
		if(objid){
			$("#"+objid).val(items[0].value);
		}
		if(objname){
			$("#"+objname).val(items[0].text);
		}
		picker.dispose()
	})
}