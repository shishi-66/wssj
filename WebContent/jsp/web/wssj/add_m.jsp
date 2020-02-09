<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/jsp/mobile/header.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/mobile/css/mui.picker.min.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/mobile/js/mui.picker.min.js"></script>
</head>
<body>
<header class="mui-bar mui-bar-nav">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>			
	<h1 class="mui-title">网上委托单录入</h1>
</header>
<div class="mui-content">
	<div class="j_form">
		<div class="j_tip j_tip--type_02">
			注：带<span class="j_not_null">&#8727;</span>项为必填项
		</div>
		<form id="form1">
		<div class="j_form_items">
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>样品名称：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.inspSampName}" name="inspSampName" id="inspSampName" placeholder="请输入样品名称，必填" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>样品状态：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.inspSampColor}" name="inspSampColor" id="inspSampColor" placeholder="请输入样品状态/颜色，必填" />
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table j_form_item--noborder">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>样品数量：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<input type="text" value="${obj.inspSampAmount}" name="inspSampAmount" id="inspSampAmount" value="1" placeholder="请输入样品数量，必填" />
						</div>
						<div class="j_input__btn">
							<button type="button" class="j_but--input_addon" onclick="popRadioCustom('inspSampAmount','',jsonYpsl,'','2')">数量单位</button>
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					<span class="j_not_null">&#8727;</span>产品类别：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc" onclick="popRadioCustom('prodCatCode','prodCatCode_name',jsonCplb,$('#prodCatCode').val(),'1')">
						<div class="j_input__control">
							<input type="text" value="${obj.prodCatCodeName}" id="prodCatCode_name" readonly="readonly" placeholder="请选择产品类别，必填" />
							<input type="hidden" id="prodCatCode" value="${obj.prodCatCode}" name="prodCatCode"  />
						</div>
						<div class="j_input__btn">
							<button type="button" class="j_but--select"><span class="fa fa-caret-down"></span></button>
						</div>				
					</div>
				</div>
			</div>
			
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					质量等级：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc" >
						<div class="j_input__control">
							<input type="text" value="${obj.inspSampGrade}" name="inspSampGrade" id="inspSampGrade" placeholder="请输入或选择质量等级" />
						</div>
						<div class="j_input__btn">
							<button type="button" onclick="popRadioCustom('inspSampGrade','',jsonSampGrade,$('#inspSampGrade').val(),'1')" class="j_but--select"><span class="fa fa-caret-down"></span></button>
						</div>
					</div>
				</div>
			</div>
			<div class="j_form_item j_form_item--table">
				<div class="j_form_item__label">
					安全类别：
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc" onclick="popRadioCustom('inspSampSafeCategory','',jsonAqlbData,$('#inspSampSafeCategory').val(),'1')">
						<div class="j_input__control">
							<input type="text" value="${obj.inspSampSafeCategory}" name="inspSampSafeCategory" id="inspSampSafeCategory" readonly="readonly" placeholder="请选择安全类别" />
						</div>
						<div class="j_input__btn">
							<button type="button" class="j_but--select"><span class="fa fa-caret-down"></span></button>
						</div>				
					</div>
				</div>
			</div>	
			 
		</div>	
		<div class="j_form_item j_form_item--table">
			<div class="j_form_item__label">
				生产日期：
			</div>
			<div class="j_form_item__control">
				<div class="j_input--mc">
					<div class="j_input__control">
						<input type="text" value="${obj.inspSampBatchNum}" name="inspSampBatchNum" id="inspSampBatchNum" placeholder="请输入生产日期" />
					</div>
				</div>
			</div>
		</div>
		<div class="j_form_item j_form_item--table">
			<div class="j_form_item__label">
				商&emsp;&emsp;标：
			</div>
			<div class="j_form_item__control">
				<div class="j_input--mc">
					<div class="j_input__control">
						<input type="text" value="${obj.inspSampTrademark}" name="inspSampTrademark" id="inspSampTrademark" placeholder="请输入商标" />
					</div>
				</div>
			</div>
		</div>
		<div class="j_form_item j_form_item--table">
			<div class="j_form_item__label">
				样品标识：
			</div>
			<div class="j_form_item__control">
				<div class="j_input--mc">
					<div class="j_input__control">
						<input type="text" value="${obj.inspSampIdentify}" name="inspSampIdentify" id="inspSampIdentify" placeholder="请输入或选择样品标识，如棉100" />
					</div>
					<div class="j_input__btn">
						<button type="button" class="j_but--input_addon" onclick="popRadioCustom('inspSampIdentify','',jsonYpbsData,'','1')">选择</button>
					</div>				
				</div>
			</div>
		</div>
		<div class="j_form_item j_form_item--table">
			<div class="j_form_item__label">
				规格型号：
			</div>
			<div class="j_form_item__control">
				<div class="j_input--mc">
					<div class="j_input__control">
						<input type="text" value="${obj.inspSampSpecification}" id="inspSampSpecification" name="inspSampSpecification"  placeholder="请输入规格型号" />
					</div>
					<div class="j_input__btn">
						<button type="button" class="j_but--input_addon" onclick="popRadioCustom('inspSampSpecification','',jsonGgxh,'','1')">特殊符号</button>
					</div>				
				</div>
			</div>			
		</div>	
		
		<div class="j_form_items">
			<div class="mui-row">
				<div class="mui-col-sm-3 mui-col-xs-3">
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__control">
							<div class="j_input j_input--label">
								<div class="j_input__control">
									<div class="j_input--mc" onclick="popRadioCustom('inspSampGoods','',jsonHhkhData,$('#inspSampGoods').val(),'1')">
										<div class="j_input__control">
											<input type="text" name="inspSampGoods" id="inspSampGoods" readonly="readonly" placeholder="" 
value=<c:choose>
<c:when test="${obj.inspSampGoods!=null and obj.inspSampGoods!=''}">"${obj.inspSampGoods}"</c:when>
<c:otherwise>"批号"</c:otherwise>
</c:choose> />
										</div>
										<div class="j_input__btn">
											<button type="button" class="j_but--select"><span class="fa fa-caret-down"></span></button>
										</div>				
									</div>									
								</div>
							</div>
						</div>
					</div>				
				</div>
				<div class="mui-col-sm-9 mui-col-xs-9">
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__control">
							<div class="j_input">
								<div class="j_input__control">
									<input type="text" value="${obj.inspSampGoodsNum}" name="inspSampGoodsNum" id="inspSampGoodsNum" placeholder="请输入批号/货号/款号" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">委托单位</div>				
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						单位名称：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.wtdwName}" name="wtdwName" id="wtdwName" placeholder="单位名称必填" />
							</div>
						</div>
					</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						社会信用码：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.wtdwCode}" name="wtdwCode" id="wtdwCode" placeholder="请输入社会信用码" />
							</div>
						</div>
					</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						单位地址：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.wtdwAddress}" name="wtdwAddress" id="wtdwAddress" placeholder="请输入单位地址" />
							</div>
						</div>
					</div>
				</div>
				<div class="mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								联&ensp;系&ensp;人：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.wtdwContact}"  name="wtdwContact" id="wtdwContact" placeholder="请输入单位联系人" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								联系电话：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.wtdwPhone}" name="wtdwPhone" id="wtdwPhone" placeholder="请输入单位联系电话" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">生产单位</div>
				<div class="j_form_items__addon j_form_items__addon--absolute">
					<button type="button" class="j_but--input_addon" onclick="copyEnte('wtdw','scdw')">同委托单位</button>
				</div>
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						单位名称：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.scdwName}" name="scdwName" id="scdwName" placeholder="请输入生产单位名称"  />
							</div>
						</div>
					</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						社会信用码：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.scdwCode}" name="scdwCode" id="scdwCode" placeholder="请输入生产单位社会信用码" />
							</div>
						</div>
					</div>
				</div>
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						单位地址：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.scdwAddress}" name="scdwAddress" id="scdwAddress" placeholder="请输入生产单位地址" />
							</div>
						</div>
					</div>
				</div>
				<div class="mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								联&ensp;系&ensp;人：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.scdwContact}" name="scdwContact" id="scdwContact" placeholder="请输入生产单位联系人" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								联系电话：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.scdwPhone}" name="scdwPhone" id="scdwPhone" placeholder="请输入生产单位联系电话" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>	
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">检验依据<span class="j_form_items__title_tip">可直接录入或从标准库选择</span></div>
				<div class="j_form_items__addon j_form_items__addon--absolute">
					<button type="button" class="j_but--input_addon" onclick="jPopupIdShow('jPopupinspSampStandard')">标准库</button>
				</div>
			</div>
			<div class="j_form_items__bd">
				<input type="hidden" value="${obj.inspSampStandard}" name="inspSampStandard" id="inspSampStandard" />
				<div class="j_spe_items--jyxm" id="inspSampStandardList"></div>
				<div class="j_form_item j_form_item--back">
					<div class="j_form_item__control">
						<div class="j_input--mc">
							<div class="j_input__control">
								<input type="text" id="input_inspSampStandard" placeholder="手动录入检验依据，请用中文分号分开" />
							</div>
							<div class="j_input__btn">
								<button type="button" class="" onclick="addInputValtoList('inspSampStandard','；')">确定</button>
							</div>				
						</div>
					</div>
				</div>
			</div>
		</div>		
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">检验项目<span class="j_form_items__title_tip">可直接录入或从项目库选择</span></div>
				<div class="j_form_items__addon j_form_items__addon--absolute">
					<button type="button" class="j_but--input_addon" onclick="jPopupIdShow('jPopupinspSampItem')">项目库</button>
				</div>
			</div>
			<div class="j_form_items__bd">
				<input type="hidden" value="${obj.inspSampItem}" name="inspSampItem" id="inspSampItem" />
				<div class="j_spe_items--jyxm" id="inspSampItemList"></div>
				<div class="j_form_item j_form_item--back">
					<div class="j_form_item__control">
						<div class="j_input--mc">
							<div class="j_input__control">
								<input type="text" id="input_inspSampItem" placeholder="手动录入项目名称，用中文逗号分开" />
							</div>
							<div class="j_input__btn">
								<button type="button" class="" onclick="addInputValtoList('inspSampItem','，')">确定</button>
							</div>				
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">样品寄出的快递信息</div>				
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						快递名称：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.inspSampExpressName}" name="inspSampExpressName" id="inspSampExpressName" placeholder="请输入寄出样品的快递单位名称"  />
							</div>
						</div>
					</div>
				</div>
				<div class="mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								快递单号：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.inspSampExpressNum}" name="inspSampExpressNum" id="inspSampExpressNum" placeholder="请输入寄出的快递单号" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								<div class="j_label">
									寄出日期：
									<div class="j_label__btn">
										<button type="button" class="j_but--input_addon" onclick="pickerrq('inspSampExpressDate','date');">日期选择</button>
									</div>
								</div>
							</div>
							<div class="j_form_item__control">
								<div class="j_input--mc">
									<div class="j_input__control">
										<input type="text" name="inspSampExpressDate" id="inspSampExpressDate" value="${fn:substring(obj.inspSampExpressDate,0,10)}" readonly="readonly" placeholder="请选择" />
									</div>			
								</div>
							</div>							
						</div>
					</div>
				</div>
				
				
			</div>	
		</div>	
		
		<div class="j_form_items">
			<div class="j_form_items__hd">
				<div class="j_form_items__title">报告收取地址信息（自取报告时不填）</div>				
			</div>
			<div class="j_form_items__bd">
				<div class="j_form_item j_form_item--table">
					<div class="j_form_item__label">
						收件地址：
					</div>
					<div class="j_form_item__control">
						<div class="j_input">
							<div class="j_input__control">
								<input type="text" value="${obj.inspSampJjdz}" name="inspSampJjdz" id="inspSampJjdz" placeholder="请输入收件地址"  />
							</div>
						</div>
					</div>
				</div>
				<div class="mui-row">
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								收件人：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.inspSampJjSjr}" name="inspSampJjSjr" id="inspSampJjSjr" placeholder="请输入收件人" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mui-col-sm-6 mui-col-xs-6">
						<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
							<div class="j_form_item__label">
								收件人电话：
							</div>
							<div class="j_form_item__control">
								<div class="j_input">
									<div class="j_input__control">
										<input type="text" value="${obj.inspSampJjSjdh}" name="inspSampJjSjdh" id="inspSampJjSjdh" placeholder="请输入收件人联系电话" />
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>				
			</div>	
		</div>	
		
		<div class="j_form_items">	
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">	
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">
							送样人：
						</div>
						<div class="j_form_item__control">
							<div class="j_input--mc">
								<div class="j_input__control">
									<input type="text" value="${obj.inspSampSendPerson}" name="inspSampSendPerson" id="inspSampSendPerson" placeholder="请输入送样人" />
								</div>
							</div>
						</div>
					</div>					
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">	
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">
							报告份数：
						</div>
						<div class="j_form_item__control">
							<div class="j_input--mc">
								<div class="j_input__control">
									<input type="text" value="${obj.inspSampReportCount}" name="inspSampReportCount" id="inspSampReportCount" placeholder="请输入报告份数" />
								</div>
							</div>
						</div>
					</div>					
				</div>
			</div>			
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">		
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">
							余样处理方式：
						</div>
						<div class="j_form_item__control">
							<div class="j_input--mc">
								<div class="j_input__control" onclick="popRadioCustom('inspSampRemaining','',jsonYyclData,$('#inspSampRemaining').val(),'1')">
									<input type="text" name="inspSampRemaining" id="inspSampRemaining" readonly="readonly" 
value=<c:choose>
<c:when test="${obj.inspSampRemaining!=null and obj.inspSampRemaining !=''}">"${obj.inspSampRemaining}"</c:when>
<c:otherwise>"取全部余样"</c:otherwise>
</c:choose> />
								</div>
								<div class="j_input__btn">
									<button type="button" class="j_but--select"><span class="fa fa-caret-down"></span></button>
								</div>				
							</div>
						</div>
					</div>				
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">		
					<div class="j_form_item j_form_item--type--ud">
						<div class="j_form_item__label">
							报告领取方式：
						</div>
						<div class="j_form_item__control">
							<div class="j_input--mc" onclick="popRadioCustom('inspSampReportReceive','',jsonBglqData,$('#inspSampReportReceive').val(),'1')">
								<div class="j_input__control">
									<input type="text" name="inspSampReportReceive" id="inspSampReportReceive" readonly="readonly" 
value=<c:choose>
<c:when test="${obj.inspSampReportReceive!=null and obj.inspSampReportReceive!=''}">"${obj.inspSampReportReceive}"</c:when>
<c:otherwise>"快递"</c:otherwise>
</c:choose> />									
								</div>
								<div class="j_input__btn">
									<button type="button" class="j_but--select"><span class="fa fa-caret-down"></span></button>
								</div>				
							</div>
						</div>
					</div>				
				</div>
			</div>			
			<div class="mui-row">
				<div class="mui-col-sm-6 mui-col-xs-6">		
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__label">
							单项判定：
						</div>
						<div class="j_form_item__control">
							<div id="isDxpd_name"  
<c:choose>
<c:when test="${obj.isDxpd==null or obj.isDxpd eq '' or obj.isDxpd eq '1'}">class="mui-switch mui-active"</c:when>
<c:otherwise>class="mui-switch"</c:otherwise>
</c:choose> />							
								<div class="mui-switch-handle"></div>
							</div>
							<input type="hidden" name="isDxpd" id="isDxpd" value="${obj.isDxpd}"/>
						</div>
					</div>
				</div>
				<div class="mui-col-sm-6 mui-col-xs-6">						
					<div class="j_form_item j_form_item--table j_form_item--noborder">
						<div class="j_form_item__label">
							综合判定：
						</div>
						<div class="j_form_item__control">
							<div id="isZhpd_name"  
<c:choose>
<c:when test="${obj.isZhpd==null or obj.isZhpd eq '' or obj.isZhpd eq '1'}">class="mui-switch mui-active"</c:when>
<c:otherwise>class="mui-switch"</c:otherwise>
</c:choose> />	
								<div class="mui-switch-handle"></div>
							</div>
							<input type="hidden" name="isZhpd" id="isZhpd" value="${obj.isZhpd}"/>
						</div>
					</div>	
				</div>
			</div>		
		</div>
		 	
		<div class="j_form_items">
			<div class="j_form_item j_form_item--type--ud j_form_item--noborder">
				<div class="j_form_item__label">
					<div class="j_label">
						备注：
					</div>					
				</div>
				<div class="j_form_item__control">
					<div class="j_input--mc">
						<div class="j_input__control">
							<textarea class="j_textarea--row" name="inspSampBz" id="inspSampBz" placeholder="请输入">${obj.inspSampBz }</textarea>
						</div>			
					</div>			
				</div>
			</div>
		</div>
		<div class="j_form__tools--submit">
			<button type="button" class="mui-btn mui-btn-success" onClick="save33('bc');return false;">保存并退出</button>
			<button type="button" class="mui-btn mui-btn-primary" onClick="save33('tj');return false;">保存并提交</button>
		</div>
		</form>

	</div>	
</div>
<%@ include file="/jsp/web/wssj/wssj_common_dialog.jsp"%>
<script type="text/javascript">
//产品类别数据
var jsonCplb=[];
<%-- var cplbData=getAjaxData("<%=request.getContextPath()%>/sampCategory/getTreeForSelect.do",{},false);
for(var i=0;i<cplbData.length;i++){
	if("${obj.prodCatCode}"==cplbData[i].id){
		$("#prodCatCode_name").val(cplbData[i].name);
	}
	if(cplbData[i].id!=""){
		jsonCplb.push({"name":cplbData[i].name,"value":cplbData[i].id});
	}
} --%>
if("${obj.inspSampStandard}"!=""){
	initItemsValue("inspSampStandard","${obj.inspSampStandard}","；");
}
if("${obj.inspSampItem}"!=""){
	initItemsValue("inspSampItem","${obj.inspSampItem}","，");
}
 
function save(saveType){
	if(saveType=="bc"||(saveType=="tj"&&window.confirm("提交后不能再修改，确认提交吗？"))){
		if(beforesave()){
			var sop={};
			if(saveType=="tj"){sop={op:'tj'};}
			ajaxSubForm('form1',"<%=request.getContextPath()%>/webSample/add.do",sop,'0',callBackSaveForm1);
		}
	}
}
function callBackSaveForm1(rs){
	showTipMessage(rs);
	window.location.href="<%=request.getContextPath() %>/webSample/toListWtj.do";
}
</script>
</body>
</html>




