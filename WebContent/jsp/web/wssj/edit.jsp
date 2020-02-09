<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/jhr/css/core.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/jhr/css/form.css" />
<script src="<%=request.getContextPath() %>/resource/jhr/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/resource/jhr/js/web.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/resource/lib/laypage/laypage.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resource/lib/jquery.validate.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resource/jhr/js/dialog.js" type="text/javascript" ></script>
<script src="<%=request.getContextPath()%>/resource/lib/My97DatePicker/WdatePicker.js" type="text/javascript" ></script>
<script type="text/javascript">
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	var url=window.location.href;
	if(url.indexOf(".jsp")!=-1){
		window.location.href=url.substring(0,url.length-4)+"_m.jsp";
	}
}
var validform;
$(function() {
	var rules={
		inspSampName:{required: true,maxlength: 50}, 
		inspSampAmount:{required: true,maxlength: 20},
		inspSampColor:{required: true,maxlength: 50},
		inspSampBatchNum:{maxlength: 256},
		inspSampIdentify:{maxlength: 128},
		inspSampSpecification:{maxlength: 128},
		inspSampTrademark:{maxlength: 50},
		inspSampBz:{maxlength: 220},
		wtdwName:{maxlength: 120},
		wtdwAddress:{maxlength: 120},
		wtdwContact:{maxlength: 16},
		wtdwPhone:{maxlength: 32},
		wtdwCode:{maxlength: 64},
		scdwName:{maxlength: 120},
		scdwAddress:{maxlength: 120},
		scdwContact:{maxlength: 16},
		scdwPhone:{maxlength: 32},
		scdwCode:{maxlength: 64},
		inspSampStandard:{maxlength: 1200} 
	};
	validform=validform("form1",rules);
	//产品类别下拉框
	var cplb = "${obj.prodCatCode}";
	var cplbData=getAjaxData("<%=request.getContextPath()%>/sampCategory/getTreeForSelect.do",{},false);
	var selectedIndex=0;
	for(var i=0;i<cplbData.length;i++){
		if(cplbData[i].id==cplb){selectedIndex=i;}
		document.getElementById("edit_prodCatCode").options.add(new Option(cplbData[i].name,cplbData[i].id));
	}
	document.getElementById("edit_prodCatCode").selectedIndex=selectedIndex;
	//样品等级
	initSelect("<%=request.getContextPath()%>/dictInfo/getDictNameByTypeCode.do",{dictTypeCode:'prodGrade'},"","sel_inspSampGrade");
	initSelectByData("isDxpd",jsonYesNo,"${obj.isDxpd}");
	initSelectByData("isZhpd",jsonYesNo,"${obj.isZhpd}");
	initSelectByData("inspSampGoods",jsonHhkhData,"${obj.inspSampGoods}"); 
	initSelectByData("inspSampSafeCategory",jsonAqlbData,"${obj.inspSampSafeCategory}"); 
	//余样处理
	var vals="${obj.inspSampRemaining}";
	if(vals==""){vals="取全部余样";}
	initSelectByData("inspSampRemaining",jsonYyclData,vals);
	var vals="${obj.inspSampReportReceive}";
	if(vals==""){vals="快递";}
	initSelectByData("inspSampReportReceive",jsonBglqData,vals);
		
});
function sameTo(mc,frommc){
	$("#"+mc+"Name").val($("#"+frommc+"Name").val());
	$("#"+mc+"Code").val($("#"+frommc+"Code").val());
	$("#"+mc+"Address").val($("#"+frommc+"Address").val());
	$("#"+mc+"Contact").val($("#"+frommc+"Contact").val());
	$("#"+mc+"Phone").val($("#"+frommc+"Phone").val());	
}
function save(saveType){
	var isSuccess=true;
	if(!validform.form()){
		alert("数据验证失败,请重新填写红色提示处的内容！");
		isSuccess=false;
		return;
	}
	if(isSuccess){
		//给空值补/
		fixNull("inspSampTrademark","/");
		fixNull("inspSampSendPerson","/");
		fixNull("inspSampSpecification","/");
		fixNull("inspSampBatchNum","/");
		fixNull("wtdwName","/");
		fixNull("scdwName","/");
		fixNull("inspSampGoodsNum","/");
		fixNull("inspSampIdentify","/");
		//return;
		if(saveType=="bc"||(saveType=="tj"&&window.confirm("提交后不能再修改，确认提交吗？"))){
			var sop={};
			if(saveType=="tj"){sop={op:'tj'};}
			ajaxSubForm('form1',"<%=request.getContextPath()%>/webSample/update.do",sop,'0',callBackSaveForm1);
		}
	}
}
function callBackSaveForm1(rs){
	alert(rs);window.close();
	window.location.href="<%=request.getContextPath() %>/webSample/toListWtj.do";
}
</script>
</head>
<body>
<div class="form-box">注：带<span class="txt--notnull">&#8727;</span>项为必填项</div>
<form id="form1">
	<input type="hidden" name="inspSampId" value="${obj.inspSampId}">
	<div class="form-box"> 
		<table class="table--form" >
			<tr>
				<td class="td-place" width="90"></td>
				<td class="td-place" width="170"></td>
				<td class="td-place" width="80"></td>
				<td class="td-place" width="170"></td>
				<td class="td-place" width="90"></td>
				<td class="td-place" width="190"></td>
			</tr>
			<tr>
				<td class="td-label"><span class="txt--notnull">&#8727;</span>样品名称</td>
				<td class="td-input">
					<input type="text" name="inspSampName" id="inspSampName" value="${obj.inspSampName}" 
					onblur="checkSampName(this.value)" class="input-block-level"/>
				</td>
				<td class="td-label"><span class="txt--notnull">&#8727;</span>样品颜色</td>
				<td class="td-input">
					<input type="text" name="inspSampColor" id="inspSampColor" value="${obj.inspSampColor}"  class="input-block-level"/>
				</td>
				<td class="td-label"><span class="txt--notnull">&#8727;</span>产品类别</td>
				<td class="td-input"  >
					<select name="prodCatCode" id="edit_prodCatCode"  >
					</select>
				</td>
			</tr>
			<tr>
				<td class="td-label"><span class="txt--notnull">&#8727;</span>样品数量</td>
				<td class="td-input">
					<input type="text" name="inspSampAmount" id="inspSampAmount" value="${obj.inspSampAmount}" class="input-block-level"/>
				</td>
				<td class="td-label">质量等级</td>
				<td class="td-input">
					<div class="input-select-box" >
						<div class="item-input" >
							<input id="inspSampGrade" name="inspSampGrade" value="${obj.inspSampGrade}" type="text" class="input-block-level"/>
						</div>
						<div class="item-select" >
							<select class="select" id="sel_inspSampGrade" onchange="$('#inspSampGrade').val(this.options[this.selectedIndex].value);" >
								<option value=""></option>								
							</select>								
						</div>
					</div>
				</td>
				<td class="td-label">安全类别</td>
				<td class="td-input">
					<select id="inspSampSafeCategory" name="inspSampSafeCategory" type="select"></select>
				</td>
			</tr>
			<tr>
				<td class="td-label">生产日期</td>
				<td class="td-input">
					<input name="inspSampBatchNum" id="inspSampBatchNum" value="${obj.inspSampBatchNum}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label">商&emsp;&emsp;标</td>
				<td class="td-input">
					<input name="inspSampTrademark" id="inspSampTrademark" value="${obj.inspSampTrademark}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label">样品标识</td>
				<td class="td-input">
					<input name="inspSampIdentify" id="inspSampIdentify" value="${obj.inspSampIdentify}" placeholder="如棉100" type="text" class="input-block-level"/>
				</td>
			</tr>
			<tr>
				<td class="td-label">规格型号</td>
				<td class="td-input" colspan="3">
					<input name="inspSampSpecification" id="inspSampSpecification" value="${obj.inspSampSpecification}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label"><select id="inspSampGoods" name="inspSampGoods" ></select></td>
				<td class="td-input">
					<input name="inspSampGoodsNum" id="inspSampGoodsNum" value="${obj.inspSampGoodsNum}" type="text" class="input-block-level"/>
				</td>
			</tr>
			<tr style="background:#eeeeee;">
			<td colspan="6">
				<table style="width:100%">
	        		<tr>
		            <th width="110">&nbsp;</th>
		            <th width="190">单位名称</th>
		            <th width="">地址</th>
		            <th width="140">机构代码</th>
		            <th width="60">联系人</th>
		            <th width="110">联系电话</th>
					</tr>
				<tr>
		            <td style="background:#fff">委托单位</td>
					<td class="td-input">
						<input name="wtdwName" id="wtdwName" value="${obj.wtdwName}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="wtdwAddress" id="wtdwAddress" value="${obj.wtdwAddress}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="wtdwCode" id="wtdwCode" value="${obj.wtdwCode}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="wtdwContact" id="wtdwContact" value="${obj.wtdwContact}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="wtdwPhone" id="wtdwPhone" value="${obj.wtdwPhone}" type="text" class="input-block-level"/>
					</td>
		        </tr>
		        <tr>
		            <td style="background:#fff">生产单位&nbsp;<a href="javascript:;"   
						onclick="sameTo('scdw','wtdw');" >⇈同上</a>	
		            </td>
		            <td class="td-input" >
						<input name="scdwName" id="scdwName" value="${obj.scdwName}" onblur="blurEnteName('scdw')" type="text" class="input-block-level"/>
					</td>
		            <td class="td-input">
						<input name="scdwAddress" id="scdwAddress" value="${obj.scdwAddress}"  type="text" class="input-block-level"/>
					</td>
		            <td class="td-input">
						<input name="scdwCode" id="scdwCode" value="${obj.scdwCode}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="scdwContact" id="scdwContact" value="${obj.scdwContact}" type="text" class="input-block-level"/>
					</td>
					<td class="td-input">
						<input name="scdwPhone" id="scdwPhone" value="${obj.scdwPhone}" type="text" class="input-block-level"/>
					</td>
		        </tr>
	       	</table>
	       	</td>
			</tr>
			<tr> 
				<td class="td-label"><a href='javascript:void(0);' 
				onclick="openDialogInspStandard('inspSampStandard')" class="btn-success btn-small">检验依据</a></td>
				<td class="td-input" colspan="5" >
					<textarea name="inspSampStandard" id="inspSampStandard" style="height:44px" class="textarea-block-level">${obj.inspSampStandard}</textarea>
				</td>
			</tr>
			<tr> 
				<td class="td-label" ><a href='javascript:void(0);' 
				onclick="openDialogCommon('','inspSampItem','1','，','dialogBasicItem')" class="btn-success btn-small">检验项目</a></td>
				<td class="td-input" colspan="5">
					<textarea name="inspSampItem" id="inspSampItem" style="height:44px" class="textarea-block-level">${obj.inspSampItem}</textarea>
				</td>
			</tr>
			<tr>
				<td class="td-label">寄出快递号</td>
				<td class="td-input">
					<input name="inspSampExpressNum" id="inspSampExpressNum" value="${obj.inspSampExpressNum}" class="input-block-level"/>
				</td>
				<td class="td-label">快递名称</td>
				<td class="td-input">
					<input name="inspSampExpressName" id="inspSampExpressName" value="${obj.inspSampExpressName}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label">寄出日期</td>
				<td class="td-input">
					<input name="inspSampExpressDate" id="inspSampExpressDate" onclick="WdatePicker()" value="${fn:substring(obj.inspSampExpressDate,0,10)}" type="text" class="input-block-level"/>
				</td>
			</tr>
			<tr>
				<td class="td-label">快递收件人</td>
				<td class="td-input">
					<input name="inspSampJjSjr" id="inspSampJjSjr" value="${obj.inspSampJjSjr}" class="input-block-level"/>
				</td>
				<td class="td-label">收件人电话</td>
				<td class="td-input">
					<input name="inspSampJjSjdh" id="inspSampJjSjdh" value="${obj.inspSampJjSjdh}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label">收件地址</td>
				<td class="td-input">
					<input name="inspSampJjdz" id="inspSampJjdz" value="${obj.inspSampJjdz}" type="text" class="input-block-level"/>
				</td>
			</tr>
			<tr> 	
				<td class="td-label">送样人</td>
				<td class="td-input">
					<input name="inspSampSendPerson" id="inspSampSendPerson" value="${obj.inspSampSendPerson}"  type="text" class="input-block-level"/>
				</td>
				<td class="td-label">报告份数</td>
				<td class="td-input">
					<input name="inspSampReportCount" id="inspSampReportCount" value="${obj.inspSampReportCount}" type="text" class="input-block-level"/>
				</td>
				<td class="td-label">余样处理方式</td>
				<td class="td-input" >
					<select id="inspSampRemaining" name="inspSampRemaining" type="select">
					</select>
				</td>
			</tr>
			<tr> 	
				<td class="td-label">报告领取方式</td>
				<td class="td-input">
					<select id="inspSampReportReceive" name="inspSampReportReceive" ></select>
				</td>
				<td class="td-label">单项判定</td>
				<td class="td-input">
					<select id="isDxpd" name="isDxpd"></select>
				</td>
				<td class="td-label">综合判定</td>
				<td class="td-input" >
					<select id="isZhpd" name="isZhpd"></select>
				</td>
			</tr>
			<tr>
				<td class="td-label">备注</td>
				<td class="td-input" colspan="5">
					<textarea name="inspSampBz" id="inspSampBz" style="height:40px"  class="textarea-block-level">${obj.inspSampBz}</textarea>
				</td>
			</tr>
			<c:if test="${obj.returnReson!=null and obj.returnReson!=''}">
			<tr>
				<td class="td-label">退回原因</td>
				<td class="td-input" colspan="5">${obj.returnReson}
				</td>
			</tr>
			</c:if>
		</table>
	</div>
	<div class="form-tools">
		<button type="button" class="btn btn-success" onclick="save('bc');return false;">保存退出</button>
		<button type="button" class="btn btn-success" onclick="save('tj');return false;">保存并提交</button>
	</div>
</form>
<!-- 弹出框 -->
<%@ include file="/jsp/dialog/dialogHiddenInput.jsp"%>
<%@ include file="/jsp/dialog/inspStandard.jsp"%>
<%@ include file="/jsp/dialog/basicItem.jsp"%>
 
</body>
</html>