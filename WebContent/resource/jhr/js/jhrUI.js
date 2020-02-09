
//触摸下拉按钮
//jquery中要使用mouseenter和 mouseleave事件来代替hover()
function btnGroup() {
	$(document).on("mouseover mouseout",".btn-group",function(event){
		if(event.type == "mouseover"){
			$(this).children(".dropdown-menu").show();
		}else if(event.type == "mouseout"){
			$(this).children(".dropdown-menu").hide(); 
		}
	});	
}

//下拉多选
function getOffTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null) offset+=getOffTop(e.offsetParent);
	return offset;
}
function getOffLeft(e){
	var offset=e.offsetLeft;
	if(e.offsetParent!=null) offset+=getOffLeft(e.offsetParent);
	return offset;
}
function m_select_open_byid(objthis,data,divId){	
	$(m_select_open_before(objthis,data,'1')).appendTo("#"+divId); 	
}
function m_select_open(objthis,data){
	$(m_select_open_before(objthis,data,'')).appendTo("body");
}
function m_select_open_before(objthis,data,flag){	
	var defaultv=","+objthis.value+",";
	$('.m_select_pop').remove();
	
	var oleft =getOffLeft(objthis); //clientWidth比offsetWidth少1
	var otop=getOffTop(objthis)+objthis.offsetHeight;
	if(flag=="1"){
		otop=getOffTop(objthis)+objthis.offsetHeight-50;
	}
	//var oleft=objthis.getBoundingClientRect().left;//浏览器getBoundingClientRect接口
	//var otop=objthis.getBoundingClientRect().bottom;//元素底部相对屏幕顶部的距离	
	var owidth=objthis.offsetWidth; 
	var htmls="";
	htmls += '<div class="m_select_pop" style="width:'+owidth+'px;left: '+oleft+'px; top: '+otop+'px;">';
	htmls += '<div class="m_select_pop__content">';
	for(var i=0;i<data.length;i++){
		if(data[i].value!=""){
			var isChecked="";
			if(defaultv.indexOf(","+data[i].name+",")!=-1){isChecked=" checked ";}
			htmls += '<div class="m_select_checkbox"><label class="m_select_checkbox__label">';
			htmls += '<input type="checkbox" onclick="changeMselectCheckbox(this)" value="'+data[i].value+'" title="'+data[i].name+'" '+isChecked+' name="m_select_chkbox_'+objthis.id+'" class="m_select_chkbox">'+data[i].name;
			htmls += '</label></div>';
		}
	}
	htmls += '</div></div>';
	return htmls;
		 
}
function changeMselectCheckbox(thischkobj){
	var objid=thischkobj.name.substring(16); //m_select_chkbox_id
	var objvalue=$("#"+objid).val();
	if(thischkobj.checked==true){
		if($("#"+objid).val()==""){
			$("#"+objid).val(thischkobj.title);
			if($("#"+objid+"H").length>0&&$("#"+objid).attr("readonly")=="readonly"){ //判断有无隐藏域
				$("#"+objid+"H").val(thischkobj.value);
			}
		}else{
			$("#"+objid).val(objvalue+","+thischkobj.title);
			if($("#"+objid+"H").length>0&&$("#"+objid).attr("readonly")=="readonly"){ //判断有无隐藏域
				$("#"+objid+"H").val($("#"+objid+"H").val()+","+thischkobj.value);
			}
		}
	}else{
		var arrName=objvalue.split(",");
		var strId="";strName="";
		for(var i=0;i<arrName.length;i++){
			if(thischkobj.title!=arrName[i]){ 
				strName=strName+arrName[i]+","; 
				if($("#"+objid+"H").length>0&&$("#"+objid).attr("readonly")=="readonly"){ //只读框才有隐藏域
					var arrId=$("#"+objid+"H").val().split(",");
					strId=strId+arrId[i]+","; 
				}
			}
		}
		if(strName!=""){
			strName=strName.substring(0,strName.length-1);
		}
		if(strId!=""){
			strId=strId.substring(0,strId.length-1);
		}
		$("#"+objid).val(strName);
		if($("#"+objid+"H").length>0&&$("#"+objid).attr("readonly")=="readonly"){ //只读框才有隐藏域
			$("#"+objid+"H").val(strId);
		}
	}
}
function m_select_callBackFun(e){ //失去焦点只关闭下拉框，点击checkbox才赋值
	var type = e.target; 
	var className=type.className;
    // alert($(e.target).parents().filter('.authorInfo').length);
    if(className.indexOf("m_select_")==-1){
    	if($('.m_select_pop').length>0){
    		$('.m_select_pop').remove();
    	}
    }
}
//自定义选项卡
function jTab(divId,divIndex){
	var divs=$("#"+divId+" .tabs-content");
	var lis=$("#"+divId+" .tabs-bar li");
	lis[divIndex].className="tabs-on";
	divs[divIndex].className="tabs-content tabs-block";	
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			for(i=0;i<lis.length;i++){
				lis[i].className="";
				divs[i].className="tabs-content"
				this.className="tabs-on";
				divs[this.index].className="tabs-content tabs-block";
			}
		}
	}
}


//doubleselect控件,双向选择器

function GBPSelectList(opts) {
    this.width            =  opts.width ? opts.width : "auto";                    //是否允许多选
    this.height            = opts.height ? opts.height : "auto";        //选择框的长度
    this.multiple            = true;                    //是否允许多选 
    this.listSize            = opts.size ? opts.size : 20;        //选择框的长度
    this.isTreeStyle         = Boolean(opts.isTreeStyle);    //是否用树状形式显示数据
    this.isShowCode          = Boolean(opts.isShowCode);     //如果是树状形式，是否显示层次码
    this.ctrlStyle           = opts.ctrlStyle?opts.ctrlStyle:"button";               //按钮样式

    this.needOrder           = true;                   //是否需要排序。（只在普通形式下起作用，树状时必须排序）
 
    this.data                = opts.data;                   
    this.itemList            = this.data;                   //存放所有选择元素的数组
    this.url                 = opts.url ? opts.url:"" ;     //数据源
    this.ajaxOptions         = opts.ajaxOptions ? opts.ajaxOptions:{} ;    //ajax请求参数

    this.leftSelect          = null;                    //左边的选择框控件 
    this.rightSelect         = null;                    //右边的选择框控件 
    this.leftDiv             = null;                    //左边放置列表框的层 
    this.rightDiv            = null;                    //右边放置列表框的层 
    this.leftDiv_innerHTML   = "";                      //左侧选择框层的内部元素， 
    this.rightDiv_innerHTML  = "";                      //右侧选择框层的内部元素 
    this.leftLabel           = null;                    //左边的文字标签控件 
    this.rightLabel          = null;                    //右边的文字标签控件 

    this.namespace           = opts.id;               //控件名称的前缀
    this.leftDivName         = "divAll";                //左边放置列表框的层的名称 
    this.rightDivName        = "divChecked";            //右边放置列表框的层的名称 
    this.leftSelectName      = "sltAll";                //左边列表框的名称 
    this.rightSelectName     = "sltChecked";            //右边列表框的名称 
    this.selectButton        = "btnSelect";             //选中按钮的名称 
    this.selectAllButton     = "btnSelectAll";          //选中所有按钮的名称 
    this.cancelButton        = "btnCancel";             //取消选择按钮的名称 
    this.cancelAllButton     = "btnCancelAll";          //取消所有按钮的名称 

    this.o_children          = [];                      //一级节点列表 
    this.root                = this;                    //根级节点-组件对象 
    this.nodes               = {};                      //存放所有节点 
    var o_this               = this;                    //组件对象引用 
    
    this.onSelect  =  opts.onSelect ? opts.onSelect : null;
    this.onSelectAll  =  opts.onSelectAll ? opts.onSelectAll : null;
    this.onCancel  =  opts.onCancel ? opts.onCancel : null;
    this.onCancelAll  =  opts.onCancelAll ? opts.onCancelAll : null;

    this.buildNode = function(){                        //处理组件显示数据，建立节点列表对象 
        if(this.isTreeStyle){ 
            //构造树形显示风格 
            _build(o_this, 0); 
        }else{ 
            //构造列表显示风格 
            for(var i = 0; i < this.itemList.length; i++){ 
                new GBP_SL_Item(o_this, this.itemList[i]); 
            } 
        } 
    }; 

    //在子类里迭代，是为了效率考虑。 
    function _build(father, level, start){ 
        if(!start) start = 0; 
        for(var i = start; i < o_this.itemList.length; i++){ 
            curLevel = o_this.itemList[i][4]; 
            //是否属于本级节点 
            if(curLevel == (level + 1)){ 
                var obj = new GBP_SL_Item(father, o_this.itemList[i]); 
                //继续下层递归 
                _build(obj, curLevel, i + 1); 
            }else if(curLevel <= level){ 
                //结束本层递归 
                break; 
            } 
        } 
    } 
} 

//对数据进行检查、过滤、排序处理 
GBPSelectList.prototype.prepareData = function() { 
    var list = new Array(); 
    var arrays = this.itemList; 
    var _pre;
    // 如设置url则ajax请求数据
    if(this.url !=""){
        $.ajax($.extend({
                     type:"POST",
                     dataType:"json",
                     url: this.url,
                     success:function(data, textStatus, jqXHR){
                         arrays =  data;
                     },
                     async:false
                  },this.ajaxOptions));
        this.itemList = arrays;
    }

    //按显示名排序 
    function _sortByName(a,b){ 
        if(a[1] == b[1]) return 0 
        return (a[1] > b[1]) ? 1 : -1; 
    } 

     //按层次码排序 
    function _sortByTreeCode(a,b){ 
        if(a[3] == b[3]) return 0 
        return (a[3] > b[3]) ? 1 : -1; 
    } 

    //检查数据是否完整，过滤不完整数据 
    for(var n = 0; n < arrays.length; n++){ 
        var len = list.length; 
        //列表节点至少要求有两项数据 
        //树形节点至少要求有五项数据 
        if((!this.isTreeStyle && arrays[n].length >= 2) || (this.isTreeStyle && arrays[n].length >= 5)){
             list[len] = arrays[n]; 
        } 
    } 

    //排序 
    if(this.isTreeStyle){ 
        list.sort(_sortByTreeCode); 
    }else if(this.needOrder){ 
        list.sort(_sortByName); 
    } 

    //使用已经排序的节点列表替换原来未排序的节点列表 
    this.itemList = list; 
} 

//构造组件，并显示在页面上 
GBPSelectList.prototype.make = function() { 
    //检查、过滤、排序数据 
    this.prepareData(); 

    var txt , obj; 

    txt = "<table width='"+this.width +"' height='"+ this.height +"' style= 'border-collapse: collapse'  bordercolor= '#E6EFFA'  align='center' cellpadding='0' cellspacing='2'>"

              + " <tr align='center'>" 
          //   + "   <td valign='top' width='30%'><div align='left' style='FONT-SIZE: 9pt;padding-top:2px;padding-bottom:2px;'>可用列表</div>"
               + "   <td valign='top' width='30%'>"
              + "     <div  id='" + this.namespace + this.leftDivName + "'></div>"
              + "   </td>" 
             + "   <td valign='middle' width='5%' >" 
             + "     <input type='button' name='" + this.namespace + this.selectButton + "' id='" + this.namespace + this.selectButton + "' class='" + this.ctrlStyle + "' style='width:40px;margin-left:3px;margin-right:3px;' value='  >  '><br><br>"
              + "     <input type='button' name='" + this.namespace + this.selectAllButton + "'  id='" + this.namespace + this.selectAllButton + "' class='" + this.ctrlStyle + "' style='width:40px;margin-left:3px;margin-right:3px;' value='  >> '><br><br>"
              + "     <input type='button' name='" + this.namespace + this.cancelButton + "' id='" + this.namespace + this.cancelButton + "' class='" + this.ctrlStyle + "' style='width:40px;margin-left:3px;margin-right:3px;' value='  <  '><br><br>"
              + "     <input type='button' name='" + this.namespace + this.cancelAllButton + "' id='" + this.namespace + this.cancelAllButton + "' class='" + this.ctrlStyle + "' style='width:40px;margin-left:3px;margin-right:3px;' value=' <<  '>"
              + "   </td>" 
           //  + "   <td valign='top' width='30%'><div align='left' style='FONT-SIZE: 9pt;padding-top:2px;padding-bottom:2px;'>已选择列表</div>"
                + "   <td valign='top' width='30%'>"
              + "     <div  id='" + this.namespace + this.rightDivName + "' align='left'></div>"
              + "   </td>" 
             + " </tr>" 
             + "</table>" ; 

    ///生成对象 
    //document.write(txt) ;
    $("#"+this.namespace).append(txt);

    var oThis = this; 
    
    //关联控制对象 
    this.leftDiv = document.getElementById(this.namespace + this.leftDivName); 
    this.rightDiv = document.getElementById(this.namespace + this.rightDivName);
 
    //关联按钮单击事件 
    obj = document.getElementById(this.namespace + this.selectButton); 
    obj.onclick = function() {
         if(oThis.onSelect){//用户自定义选中事件，合并选中处理逻辑
           //判断是否多选模式 
            var values = new Array(); 
            //处理哪个对象 
            var obj = oThis.leftSelect; 
            if(oThis.multiple){ 
                for(var i = 0; i < obj.options.length; i++){ 
                    if(obj.options[i].selected){ 
                        values[values.length] = obj.options[i].value; 
                    } 
                } 
            }else{ 
                if(obj.selectedIndex > -1){ 
                    values[0] = obj[obj.selectedIndex].value; 
                } 
            } 
           oThis.onSelect.call(oThis,values);
       }
        oThis.doSelect(1);
    };

    obj = document.getElementById(this.namespace + this.selectAllButton); 
    obj.onclick = function() { 
        if(oThis.onSelectAll){
            var values = new Array();  
            var obj = oThis.leftSelect; 
            if(oThis.multiple){ 
                for(var i = 0; i < obj.options.length; i++){ 
                        values[values.length] = obj.options[i].value; 
                } 
            }
           oThis.onSelectAll.call(oThis,values);
        }
        oThis.doAll(1);
    }; 

    obj = document.getElementById(this.namespace + this.cancelButton); 
    obj.onclick = function() { 
        if(oThis.onCancel){
            var values = new Array();  
            var obj = oThis.rightSelect; 
            if(oThis.multiple){ 
                for(var i = 0; i < obj.options.length; i++){ 
                    if(obj.options[i].selected){ 
                        values[values.length] = obj.options[i].value; 
                    } 
                } 
            }else{ 
                if(obj.selectedIndex > -1){ 
                    values[0] = obj[obj.selectedIndex].value; 
                } 
            } 
           oThis.onCancel.call(oThis,values);
        }
        oThis.doSelect(-1);
    }; 

    obj = document.getElementById(this.namespace + this.cancelAllButton); 
    obj.onclick = function() { 
        if(oThis.onCancelAll){
            var values = new Array();  
            var obj = oThis.rightSelect; 
            if(oThis.multiple){ 
                for(var i = 0; i < obj.options.length; i++){ 
                        values[values.length] = obj.options[i].value; 
                } 
            }
           oThis.onCancelAll.call(oThis,values);
        }
        oThis.doAll(-1) 
    }; 

    //生成节点对象列表 
    this.buildNode(); 

    //刷新页面显示 
    this.update(); 
}; 

//选中/取消选中 
GBPSelectList.prototype.doSelect = function(isSelect) { 
    var values = new Array(); 

    //处理哪个对象 
    var obj = (isSelect == 1) ? this.leftSelect : this.rightSelect; 

    //判断是否多选模式 
    if(this.multiple){ 
        for(var i = 0; i < obj.options.length; i++){ 
            if(obj.options[i].selected){ 
                values[values.length] = obj.options[i].value; 
            } 
        } 
    }else{ 
        if(obj.selectedIndex > -1){ 
            values[0] = obj[obj.selectedIndex].value; 
        } 
    } 

    if( values.length == 0) return; 

    //处理下级节点 
    for(var n = 0; n < values.length; n++){ 
        this.nodes[values[n]].doSelect(isSelect); 
    } 

    //刷新页面显示 
    this.update() 
}; 

//全部选中/取消 
GBPSelectList.prototype.doAll = function(isSelect) { 
    for(var i = 0; i < this.o_children.length; i++){ 
        this.o_children[i].doSelect(isSelect); 
    } 

    this.update() 
}; 

//更新select元素的界面显示 
GBPSelectList.prototype.update = function(){ 
    //用innerHTML来设置select元素，可以加快速度，减少屏幕闪烁 
    //给层元素赋初值 

    this.root.rightDiv_innerHTML = "<select id='" + this.namespace + this.rightSelectName + "' " +"name='" + this.namespace + this.rightSelectName + "' " + (this.multiple ? "multiple" : "") + " size='" + this.listSize + "' style='width:100%'>";
    this.root.leftDiv_innerHTML = "<select id='" + this.namespace + this.leftSelectName + "' " + (this.multiple ? "multiple" : "") + " size='" + this.listSize + "' style='width:100%'>";
 
    //处理子节点状态，根据子节点的状态设置父节点状态 
    for(var i = 0; i < this.o_children.length; i++){ 
        this.o_children[i].doStatus(); 
    } 
    //生成页面显示 
    for(var i = 0; i < this.o_children.length; i++){ 
        this.o_children[i].update(); 
    } 

    //直接用innerHTML，速度最快 
    this.leftDiv.innerHTML = this.root.leftDiv_innerHTML + "</select>";
    this.rightDiv.innerHTML = this.root.rightDiv_innerHTML + "</select>";

    //重新获取两侧select元素，并为其绑定双击事件 
    var oThis = this; 

    this.leftSelect = document.getElementById(this.namespace + this.leftSelectName);
    this.leftSelect.ondblclick = function() {        
         if(oThis.onSelect){//用户自定义选中事件，合并选中处理逻辑
               //判断是否多选模式 
                var values = new Array(); 
                //处理哪个对象 
                var obj = this; 
                if(this.multiple){ 
                    for(var i = 0; i < obj.options.length; i++){ 
                        if(obj.options[i].selected){ 
                            values[values.length] = obj.options[i].value; 
                        } 
                    } 
                }else{ 
                    if(obj.selectedIndex > -1){ 
                        values[0] = obj[obj.selectedIndex].value; 
                    } 
                } 
            oThis.onSelect.call(oThis,values);
         }
         oThis.doSelect(1) ;
    }; 

    this.rightSelect  = document.getElementById(this.namespace + this.rightSelectName);
    this.rightSelect .ondblclick = function() { 
        if(oThis.onCancel){//用户自定义选中事件，合并选中处理逻辑
           //判断是否多选模式 
            var values = new Array(); 
            //处理哪个对象 
            var obj = this; 
            if(this.multiple){ 
                for(var i = 0; i < obj.options.length; i++){ 
                    if(obj.options[i].selected){ 
                        values[values.length] = obj.options[i].value; 
                    } 
                } 
            }else{ 
                if(obj.selectedIndex > -1){ 
                    values[0] = obj[obj.selectedIndex].value; 
                } 
            } 
           oThis.onCancel.call(oThis,values);
        }
        oThis.doSelect(-1) 
    }; 
}; 

/*==================== 节点对象代码 ====================*/ 
/* 
1、构造方法 
2、节点选择/取消方法 
3、节点状态处理方法 
4、节点页面显示实现方法*/ 

//节点对象 
function GBP_SL_Item(o_parent, o_item){ 
    this.father = o_parent;                                //上级节点引用 
    this.root = o_parent.root;                             //根级节点引用 
    this.o_children = [];                                  //下级节点数组 
    this.info = o_item;                                    //节点对象 
    this.status = o_item[2] ?  1 : -1 ;                    //节点是否默认选中标志 
    this.level = this.root.isTreeStyle ? o_item[4] : 1;    //节点级次 
    this.value = o_item[0];                                //节点编号 
    this.showText = o_item[1];                             //节点显示名称 

    //根据定义处理显示名称格式 
    if(this.root.isShowCode) 
        // 是否显示层级编码 
        this.showText = this.showText + " - " + o_item[3]; 

    if(this.level > 0) 
        //处理显示缩进 
        this.showText = "__________________".substr(0, (this.level - 1)).replace(/_/g, "&nbsp;&nbsp;") + this.showText;
 
    //加入父级节点的下级节点列表 
    o_parent.o_children[o_parent.o_children.length] = this; 

    //加入所有节点列表 
    this.root.nodes[this.value] = this; 
} 

//节点的选择函数 
GBP_SL_Item.prototype.doSelect = function(isSelected){ 
    this.status = isSelected; 

    //选择上级会自动选择其所有下级 
    for(var i = 0; i < this.o_children.length; i++){ 
        this.o_children[i].doSelect(isSelected); 
    } 
}; 

//递归处理指定节点及其下级节点状态 
GBP_SL_Item.prototype.doStatus = function(){ 
    //没有下级节点 
    if(this.o_children.length == 0) return this.status; 

    var selectedCount = 0, partSelectCount = 0, unselectedCount = 0; 
    var returnStatus = null; 

    for(var i = 0; i < this.o_children.length; i++){ 
        //递归处理下级节点状态 
        returnStatus = this.o_children[i].doStatus(); 

        if(returnStatus == 1) selectedCount += 1; 
        if(returnStatus == 0) partSelectCount += 1; 
        if(returnStatus == -1) unselectedCount += 1; 
    } 

    if(selectedCount > 0 && unselectedCount == 0 && partSelectCount == 0){ 
        //下级全部选中 
        this.status = 1; 
    }else if(unselectedCount > 0 && selectedCount == 0 && partSelectCount == 0){
         //下级一个都没选中 
        this.status = -1; 
    }else{ 
        //下级部分选中 
        this.status = 0; 
    } 

    return this.status; 
}; 

//更新界面显示 
GBP_SL_Item.prototype.update = function(){ 
    //status：1表示选中；0表示下级部分选中；-1表示未选 
    if(this.status == -1 || this.status == 0){ 
        this.root.leftDiv_innerHTML += "<option value='" + this.value + "'>" + this.showText + "</option>\n";
     } 

    if(this.status == 1 || this.status == 0){ 
        this.root.rightDiv_innerHTML += "<option value='" + this.value + "'>" + this.showText + "</option>\n";
     } 

    //递归处理下级节点 
    for(var i = 0; i < this.o_children.length; i++){ 
        this.o_children[i].update(); 
    } 
}; 

/*==================== 组件扩展方法 ====================*/ 

//获得选中的值，返回的是个包含节点编号的数组 
GBPSelectList.prototype.getSelectedValues = function() { 
    var values = new Array(); 
    for(var n = 0; n < this.root.rightSelect.options.length; n++){
        values[n] = this.root.rightSelect.options[n].value;
    } 
    return values; 
}; 

//查看右侧记录的详细信息，返回的是个包含节点对象的二维数组 
GBPSelectList.prototype.getRows = function() { 
    var values = new Array(); 
    for(var n = 0; n < this.root.rightSelect.options.length; n++){
        values[values.length] = this.root.nodes[this.root.rightSelect.options[n].value].info;
     } 
    return values; 
}; 

//查看选中记录的详细信息，返回的是个包含节点对象的二维数组 
GBPSelectList.prototype.getSelectedRows = function() { 
    var values = new Array(); 
    for(var n = 0; n < this.root.rightSelect.options.length; n++){
        if(this.root.rightSelect[n].selected)
            values[values.length] = this.root.nodes[this.root.rightSelect.options[n].value].info;
     } 
    return values; 
}; 




