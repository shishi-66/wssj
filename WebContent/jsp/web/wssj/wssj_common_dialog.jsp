<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!-- 通用弹出层 -->
<div id="j_popup_box" class="j_popup--select">
	<div class="j_popup__hd">
		<div class="j_popup__title"></div>
		<div class="j_popup__tools"><button type="button" onclick="jPopupClose()"><i class="mui-icon mui-icon-closeempty"></i></button></div>
	</div>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="j_popup__content"></div>
		</div>
	</div>
	<div class="j_popup__fd">
		<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" onclick="jPopupClose()">取消</button>
		<button type="button" class="mui-btn mui-btn-primary" id="j_popup__ok">确定</button>
	</div>	
</div>

<!-- 检验项目弹出层 -->
<div id="jPopupinspSampItem" class="j_popup">
	<div class="j_popup__hd">
		<div class="j_popup__title"></div>
		<div class="j_popup__tools"><button type="button" onclick="jPopupIdClose('jPopupinspSampItem')"><i class="mui-icon mui-icon-closeempty"></i></button></div>
	</div>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="j_popup__search">
				<div class="j_search_box j_search_box--default">
					<div class="j_search--default">
						<div class="j_search__control">
							<div class="j_input--mc">
								<div class="j_input__control">
									<input type="text" id="query_basicItemName" placeholder="输入检验项目名称">
								</div>
								<div class="j_input__btn">
									<button onclick="getListJyxm()"><span class="mui-icon mui-icon-search"></span></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		
			<div class="j_popup__filter">
				<div class="j_popup__filter__hd"></div>
				<div class="j_popup__filter__bd">
					<div class="j_select j-select--list j-select--list--3col">
						<div class="j_select__control"><input class="j_select__input" type="text" id="query_searchItemCode" value=""></div>
						<div class="j_select__options" id="filterItemJyxm"></div>
					</div>
				</div>
			</div>
			<div id="itemsinspSampItem" class="j_popup__content"></div>
		</div>
	</div>
	<div class="j_popup__fd">
		<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" onclick="jPopupIdClose('jPopupinspSampItem')">取消</button>
		<button type="button" class="mui-btn mui-btn-primary" onclick="setPopMulitiData('inspSampItem','，')">确定</button>
	</div>	
</div>

<!-- 检验依据弹出层 -->
<div id="jPopupinspSampStandard" class="j_popup">
	<div class="j_popup__hd">
		<div class="j_popup__title"></div>
		<div class="j_popup__tools"><button type="button" onclick="jPopupIdClose('jPopupinspSampStandard')"><i class="mui-icon mui-icon-closeempty"></i></button></div>
	</div>
	<div class="mui-scroll-wrapper">
		<div class="mui-scroll">
			<div class="j_popup__search">
				<div class="j_search_box j_search_box--default">
					<div class="j_search--default">
						<div class="j_search__control">
							<div class="j_input--mc">
								<div class="j_input__control">
									<input type="text" id="query_qualityStandNumber" placeholder="输入标准号">
								</div>
								<div class="j_input__btn">
									<button onclick="getListJyyj()"><span class="mui-icon mui-icon-search"></span></button>
								</div>
							</div>					
						</div>
					</div>
				</div>
				<div class="j_search_box j_search_box--default">
					<div class="j_search--default">
						<div class="j_search__control">
							<div class="j_input--mc">
								<div class="j_input__control">
									<input type="text" id="query_qualityStandName" placeholder="输入标准名称">
								</div>
								<div class="j_input__btn">
									<button onclick="getListJyyj()"><span class="mui-icon mui-icon-search"></span></button>
								</div>
							</div>							
						</div>
					</div>
				</div>				
			</div>		
			<div class="j_popup__filter">
				<div class="j_popup__filter__hd"></div>
				<div class="j_popup__filter__bd">
					<div class="j_select j-select--list j-select--list--3col">
						<div class="j_select__control"><input class="j_select__input" type="hidden" id="query_isProdStandard" value=""></div>
						<div class="j_select__options" id="filterItemJyyj">
							<div class='j_select__option active' onclick='doFilterJyyj("")' id='itemCode_'>全部</div>
							<div class='j_select__option' onclick='doFilterJyyj("1")' id='itemCode_1'>产品标准</div>
							<div class='j_select__option' onclick='doFilterJyyj("0")' id='itemCode_0'>方法标准</div>
						</div>
					</div>
				</div>
			</div>
			<div id="itemsinspSampStandard" class="j_popup__content"></div>
		</div>
	</div>
	<div class="j_popup__fd">
		<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" onclick="jPopupIdClose('jPopupinspSampStandard')">取消</button>
		<button type="button" class="mui-btn mui-btn-primary" onclick="setPopMulitiData('inspSampStandard','；')">确定</button>
	</div>	
</div>

<script type="text/javascript">
//弹出层区域滚动
mui('.j_popup--select .mui-scroll-wrapper').scroll({
	deceleration: 0.0005
});
mui('.j_popup .mui-scroll-wrapper').scroll({
	deceleration: 0.0005
});
//弹出层遮罩
var jPopup_mask=mui.createMask(function(){
	return false;
});
//质量等级数据
var jsonSampGrade=getAjaxData("<%=request.getContextPath()%>/dictInfo/getDictNameByTypeCode.do",{dictTypeCode:'prodGrade'},false);
//样品数量、抽样基数数据
var jsonYpsl=[{"name":"套","value":"套"},{"name":"件","value":"件"},{"name":"条","value":"条"},{"name":"床","value":"床"},{"name":"包","value":"包"},{"name":"幅","value":"幅"},{"name":"cm","value":"cm"},{"name":"Kg","value":"Kg"}];
//规格型号数据
var jsonGgxh=[{"name":"X","value":"X"}];
//单项判定、综合判定设置
document.getElementById("isZhpd_name").addEventListener("toggle",function(event){
	if(event.detail.isActive){
		document.getElementById("isZhpd").value=1;
	}else{
		document.getElementById("isZhpd").value=0;
	}
})
document.getElementById("isDxpd_name").addEventListener("toggle",function(event){
	if(event.detail.isActive){
		document.getElementById("isDxpd").value=1;
	}else{
		document.getElementById("isDxpd").value=0;
	}
})


function copyEnte(enteType1,enteType2) {
	//$("#"+enteType2+"Id").val($("#"+enteType1+"Id").val());
	$("#"+enteType2+"Name").val($("#"+enteType1+"Name").val());
	$("#"+enteType2+"Code").val($("#"+enteType1+"Code").val());
	$("#"+enteType2+"Address").val($("#"+enteType1+"Address").val());
	$("#"+enteType2+"Contact").val($("#"+enteType1+"Contact").val());
	$("#"+enteType2+"Phone").val($("#"+enteType1+"Phone").val());
}
   
//检验依据
function getQueryConditionJyyj(){
	var obj ={};
	obj["pageNo"]=1;
	obj["pageSize"]=30;
	obj["orderFields"]="qualityStandNumber";
	obj["order"]="asc";
	obj["isProdStandard"]=$("#query_isProdStandard").val();
	obj["qualityStandName"]=$("#query_qualityStandName").val();
	obj["qualityStandNumber"]=$("#query_qualityStandNumber").val();
	return obj;
}

function getListJyyj() {
	var json=getAjaxData("<%=request.getContextPath()%>/qualityStandard/listQualityStandard.do",getQueryConditionJyyj(),false); 
	if(json.hasOwnProperty("records")){
		var html ="<div class='j_items--radio' id='optionsMulti-inspSampStandard'>";
		for (var i = 0;i < json.rows.length; i++) {
			var d=json.rows[i];
			html+="<div class='j_item--radio'>";
			html+="<div class='mui-checkbox mui-left'>";
				html+="<label>";
				html+="<span class='j_item__title'>"+d.qualityStandNumber+"</span>";
				html+="<span class='j_item__txt'>"+d.qualityStandName+"</span>";
				html+="</label>";
				var mc = d.qualityStandNumber;
				if(d.hasOwnProperty("isProdStandard")&&d.isProdStandard=="1"){
					mc = mc+"《"+d.qualityStandName+"》";
				}
				html+="<input name='j_select_checkbox' type='checkbox' value='"+mc+"'>";
			html+="</div>";	
			html+="</div>";		
		}
		html+="</div>";	
		$("#itemsinspSampStandard").html(html);
	}
}
function doFilterJyyj(itemCode){
	$("#query_isProdStandard").val(itemCode);
	$("#itemCode_"+itemCode).siblings().removeClass("active");
	$("#itemCode_"+itemCode).addClass("active");
	getListJyyj();
}
//检验项目
function getQueryConditionJyxm(){
    var obj ={};
    obj["pageNo"]=1;
    obj["pageSize"]=30;
    obj["orderFields"]="basicItemCode";
    obj["order"]="asc";
	obj["basicItemName"]=$("#query_basicItemName").val();
	obj["searchItemCode"]=$("#query_searchItemCode").val();
	return obj;
}
function getListJyxm() {
	var json=getAjaxData("<%=request.getContextPath()%>/basicItem/listBasicItemWH.do",getQueryConditionJyxm(),false); //false同步执行，true异步执行
	if(json.hasOwnProperty("records")){
		var jyxms=$("#inspSampItem").val();	
		var html ="<div class='j_items--radio' id='optionsMulti-inspSampItem'>";
		for (var i = 0;i < json.rows.length; i++) {
			var d=json.rows[i];
			html+="<div class='j_item--radio'>";
			html+="<div class='mui-checkbox mui-left'>";
			html+="<label>"+d.basicItemName+"</label>";
			var isChecks="";
			if(("，"+jyxms+"，").indexOf("，"+d.basicItemName+"，")!=-1){
				isChecks=" checked ";
			}
			html+="<input name='j_select_checkbox' type='checkbox' "+isChecks+" value='"+d.basicItemName+"'>";
			html+="</div>";	
			html+="</div>";		
		}
		html+="</div>";	
		$("#itemsinspSampItem").html(html);
	}
}
 
function doFilterJyxm(itemCode){
	$("#query_searchItemCode").val(itemCode);
	$("#itemCode_"+itemCode).siblings().removeClass("active");
	$("#itemCode_"+itemCode).addClass("active");
	getListJyxm();
}

var itemTypeHtml="";
var jsonItemType=getAjaxData("<%=request.getContextPath()%>/itemCategory/getTreeForSelect.do",{},false); 
for(var i=0;i<jsonItemType.length;i++){
	if(jsonItemType[i].name==""){
		itemTypeHtml+="<div class='j_select__option' onclick='doFilterJyxm(\""+jsonItemType[i].id+"\")' id='itemCode_"+jsonItemType[i].id+"'>全部</div>";					
	}else{
		itemTypeHtml+="<div class='j_select__option' onclick='doFilterJyxm(\""+jsonItemType[i].id+"\")' id='itemCode_"+jsonItemType[i].id+"'>"+jsonItemType[i].name+"</div>";
	}
}
itemTypeHtml+="</div></div>";
$("#filterItemJyxm").html(itemTypeHtml);

function beforesave(){
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
	if(flag){
		//给空值补/
		fixNull("inspSampTrademark","/");
		fixNull("inspSampSendPerson","/");
		fixNull("inspSampSpecification","/");
		fixNull("inspSampBatchNum","/");
		fixNull("wtdwName","/");
		fixNull("scdwName","/");
		fixNull("inspSampGoodsNum","/");
		fixNull("inspSampIdentify","/");
		fixNull("inspSampBz","/");
	}	
	return flag;
}

</script>
