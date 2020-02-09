<%
	/**
	 * 基本项目选择 BasicItem
	 */
%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>

<div class="dialog_bg" id="dialogBasicItem">
	<div class="dialog_block"></div>
	<div class="dialog" style="width:600px">
		<div class="dialog_base">
			<div class="dialog_title">
				选择检验项目
				<div class="dialog_close" title="关闭" onclick="javascript:$('#dialogBasicItem').hide();">
					<i class="icon-remove"></i>
				</div>
			</div>
			<div class="dialog_c" style="height:430px">
				<div class="list list--dialog">
					<div class="list_search">
						<div class="list_search__row">
							<div class="layout--lr">
								<div class="layout__item">项目名称</div>
								<div class="layout__item">
									<input type="text" id="searchBasicItem_1" style="width: 120px" />
								</div>
							</div>
							 
							<div class="layout--lr">								
								<div class="layout__item">项目类别</div>
								<div class="layout__item">
									<select id="searchBasicItem_2">
										<option value="" selected></option>
									</select>
								</div>
							</div>
							<div class="layout--lr">
								<div class="layout__item">
									<input onclick="doSearchBasicItem()" value="搜索" class="btn btn-small btn-primary" type="button" />
								</div>
							</div>
						</div>
					</div>
					<div class="list_content">
						<table class="table--list--default table--striped table--hover">
							<thead><tr>
								<th width="20"><input type="checkbox" 
								onclick='chkall(this,"dialogBasicItemChkbox")'  /></th>
								<th width="90">项目编号</th>
								<th width="200">项目名称</th>
								<th >项目类别</th>
							</tr></thead>
							<tbody id="ViewContentBasicItem"></tbody>
						</table>					
					</div>
					<div class="list_page">
						<div class="page">
							<div class="page__total">共有<span class="page__cur"> <span id="totalSpanBasicItem">0</span> </span>条记录</div>
							<div class="page__tools">
								<div id="pageBasicItem"></div>
							</div>
						</div>		
					</div>					
								
				</div>
			</div>
			<div class="dialog_btn">
				<a class="btn btn-small btn-primary" href="javascript:void(0);" onclick="dialogAddBtnCommon('dialogBasicItem',eval($('#dialogCallBackFunName').val()))">添加</a>
				<a class="btn btn-small btn-primary" href="javascript:void(0);" onclick="dialogAddBtnCommon('dialogBasicItem',eval($('#dialogCallBackFunName').val()));$('#dialogBasicItem').hide();">添加并关闭</a>
				<a class="btn btn-small" href="javascript:void(0);" onclick='javascript:$("#dialogBasicItem").hide();'>关闭</a>
			</div>			
		</div>
	</div>
</div>
<script type="text/javascript">
var dialogBasicItem_itemType=getAjaxData("<%=request.getContextPath()%>/itemCategory/getTreeForSelect.do",{},false); 
for(var i=0;i<dialogBasicItem_itemType.length;i++){
	if(dialogBasicItem_itemType[i].id!=""){
	document.getElementById("searchBasicItem_2").options.add(new Option(dialogBasicItem_itemType[i].name,dialogBasicItem_itemType[i].id));
	}
}
function initArgBasicItem(){
	var obj={};
	obj["orderFields"]="basicItemCode";//排序字段
	obj["order"]="asc";//排序方式
	obj["pageNo"]="1";//当前页
	obj["pageSize"]="10";//每页大小
	obj["basicItemName"]=$("#searchBasicItem_1").val();
	obj["searchItemCode"]=$("#searchBasicItem_2").val();
	return obj;
}
doSearchBasicItem();
function doSearchBasicItem(){
	grid($('#pageBasicItem'),"<%=request.getContextPath()%>/basicItem/listBasicItemWH.do",initArgBasicItem(),$("#totalSpanBasicItem"),$("#ViewContentBasicItem"),initRowBasicItem,"1");
}
function initRowBasicItem(data){
	var dialogSelectedData=$("#dialogSelectedData").val();
	var list=new Array();	
	list.push("<tr ondblclick=\"dialogDblclickCommon('dialogBasicItem',this,eval($('#dialogCallBackFunName').val()))\">");
	list.push("<td><input type='checkbox' name='dialogBasicItemChkbox' value='");
	list.push(data.basicItemCode+"||"+data.basicItemName+"||"+data.iszbx);
	list.push("||"+(data.hasOwnProperty("basicItemIndex")?data.basicItemIndex:"1"));
	list.push("||"+(data.hasOwnProperty("basicItemDw")?data.basicItemDw:""));
	var childitem = data.hasOwnProperty("childItems")?data.childItems:"";
	if(childitem.indexOf("||")!=-1){ //本身含有||分隔符号
		var re=new RegExp("\\|\\|","g"); //“|”为特殊字符，所以前面要加“\\”
		childitem = childitem.replace(re, '**');
	}
	list.push("||"+childitem);
	list.push("' ");
	if(dialogSelectedData.indexOf(","+data.basicItemName+",") != -1){
		list.push(" checked disabled ");
	}
	list.push(" /></td>");
	list.push("<td onclick='dialogSelectRow(this)'>"+data.basicItemCode+"</td>");
	list.push("<td onclick='dialogSelectRow(this)'>"+data.basicItemName+"</td>"); 
	list.push("<td onclick='dialogSelectRow(this)'>"+(data.hasOwnProperty("itemCatName")?data.itemCatName:"")+"</td>"); 
	list.push("</tr>");	
	return list.join("");
}
</script>