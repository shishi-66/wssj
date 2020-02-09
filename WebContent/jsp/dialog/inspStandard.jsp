<%
	/**
	 * 检验依据选择（标准号）InspStandard
	 */
%>
<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>

<div class="dialog_bg" id="dialogInspStandard">
	<div class="dialog_block"></div>
	<div class="dialog" style="width:800px">
		<div class="dialog_base">
			<div class="dialog_title">
				选择检验依据
				<div class="dialog_close" title="关闭" onclick="javascript:$('#dialogInspStandard').hide();">
					<i class="icon-remove"></i>
				</div>
			</div>
			<div class="dialog_c" style="height:440px">
				<div class="list list--dialog">
					<div class="list_search">
						<div class="list_search__row">
							<div class="layout--lr">
								<div class="layout__item">标准号</div>
								<div class="layout__item">
									<input type="text" id="searchInspStandard_1" style="width: 120px" class="" placeholder="输入标准号" />
								</div>
							</div>
							<div class="layout--lr">								
								<div class="layout__item">标准名称</div>
								<div class="layout__item">
									<input type="text" id="searchInspStandard_2" style="width: 120px" class="" placeholder="输入标准名称" />
								</div>
							</div>
							<div class="layout--lr">								
								<div class="layout__item">标准类别</div>
								<div class="layout__item">
									<select id="searchInspStandard_3">
										<option value="">全部</option>
										<option value="1">产品标准</option>
										<option value="0">方法标准</option>
									</select>
								</div>
							</div>
							<div class="layout--lr">
								<div class="layout__item">
									<input onclick="doSearchInspStandard()"	value="搜索" class="btn btn-small btn-primary" type="button" />
								</div>
							</div>
						</div>
					</div>
					<div class="list_content">
						<table class="table--list--default table--striped table--hover">
							<thead><tr>
								<th width="20"><input type="checkbox" 
								onclick='chkall(this,"dialogInspStandardChkbox")'  /></th>
								<th width="160">标准号</th>
								<th width="">标准名称</th>
								<th width="120">产品类别</th>
								<th width="80">标准状态</th>
							</tr></thead>
							<tbody id="ViewContentInspStandard"></tbody>
						</table>					
					</div>
					<div class="list_page">
						<div class="page">
							<div class="page__total">共有<span class="page__cur"> <span id="totalSpanInspStandard">0</span> </span>条记录</div>
							<div class="page__tools">
								<div id="pageInspStandard"></div>
							</div>
						</div>		
					</div>					
								
				</div>
			</div>
			<div class="dialog_btn">
				<a class="btn btn-small btn-primary" href="javascript:void(0);" onclick="dialogAddBtnCommon('dialogInspStandard',eval($('#dialogCallBackFunName').val()))">添加</a>
				<a class="btn btn-small btn-primary" href="javascript:void(0);" onclick="dialogAddBtnCommon('dialogInspStandard',eval($('#dialogCallBackFunName').val()));$('#dialogInspStandard').hide();">添加并关闭</a>
				<a style="display:none" id="dialogInspStandardClearBtn" 
				class="btn btn-small btn-primary" href="javascript:void(0);" onclick="dialogClearBtnCommon('dialogInspStandard')">清空</a>
				<a class="btn btn-small" href="javascript:void(0);" onclick='javascript:$("#dialogInspStandard").hide();'>关闭</a>
			</div>			
		</div>
	</div>
</div>
<script type="text/javascript">
function initArgInspStandard(){
	var obj={};
	obj["orderFields"]="qualityStandNumber";//排序字段
	obj["order"]="asc";//排序方式
	obj["pageNo"]="1";//当前页
	obj["pageSize"]="10";//每页大小
	obj["qualityStandNumber"]=$("#searchInspStandard_1").val();
	obj["qualityStandName"]=$("#searchInspStandard_2").val();
	obj["isProdStandard"]=$("#searchInspStandard_3").val();
	return obj;
}
function doSearchInspStandard(){
	grid($('#pageInspStandard'),"<%=request.getContextPath()%>/qualityStandard/listQualityStandard.do",initArgInspStandard(),$("#totalSpanInspStandard"),$("#ViewContentInspStandard"),initRowInspStandard,"1");
}
function initRowInspStandard(data){
	var dialogSelectedData=$("#dialogSelectedData").val();
	var list=new Array();	
	list.push("<tr ondblclick=\"dialogDblclickCommon('dialogInspStandard',this,eval($('#dialogCallBackFunName').val()))\">");
	list.push("<td><input type='checkbox' name='dialogInspStandardChkbox' value='");
	list.push(data.qualityStandId+"||"+(data.hasOwnProperty("qualityStandNumber")?data.qualityStandNumber:"")+"||"+(data.hasOwnProperty("qualityStandName")?data.qualityStandName:"")+"||"+(data.hasOwnProperty("isProdStandard")?data.isProdStandard:""));
	list.push("' ");
	if(dialogSelectedData.indexOf(","+data.qualityStandNumber+",") != -1){
		list.push(" checked disabled ");
	}
	list.push(" /></td>");
	list.push("<td onclick='dialogSelectRow(this)'>"+data.qualityStandNumber+"</td>");
	list.push("<td onclick='dialogSelectRow(this)'>"+data.qualityStandName+"</td>"); 
	list.push("<td onclick='dialogSelectRow(this)'>"+(data.hasOwnProperty("prodCatName")?data.prodCatName:"")+"</td>"); 
	list.push("<td onclick='dialogSelectRow(this)' align='center'>"+(data.hasOwnProperty("qualityStandState_Name")?data.qualityStandState_Name:"")+"</td>"); 
	list.push("</tr>");	
	return list.join("");
}
</script>