$(function() {
	$("#bgbzTable input:radio").click(function() {
		var radioClickVal=$(this).val();
		var parentTr=$(this).closest("tr");
		if(radioClickVal == 0){
			parentTr.removeClass("radioS");
			parentTr.removeClass("radioN");
			parentTr.addClass("radioE");
			}
		else if (radioClickVal == 1){
			parentTr.removeClass("radioE");
			parentTr.removeClass("radioN");
			parentTr.addClass("radioS");
			}
		else if (radioClickVal == 2){
			parentTr.removeClass("radioS");
			parentTr.removeClass("radioE");
			parentTr.addClass("radioN");
			}
		else {
			parentTr.removeClass("radioS");
			parentTr.removeClass("radioN");
			parentTr.removeClass("radioE");
		}
	});
});
//勾选项目时，如果有小项目则自动勾选
function f_chnBox(indexi){
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	var isChecked = inputCheckboxArr[indexi].checked;
	var objTable=document.getElementById ("bgbzTable");
	var objtr = objTable.rows[indexi+1];
	var istjx=$(objtr).find("input[name='istjx']").val();
	var iszbx=$(objtr).find("input[name='iszbx']").val();
	var iszbx=$(objtr).find("input[name='iszbx']").val();
	if(istjx=="1"&&iszbx=="0"){
		for(var i=indexi+1;i<inputCheckboxArr.length;i++){
			var objtr2 = objTable.rows[i+1];
			var istjx2=$(objtr2).find("input[name='istjx']").val();
			if(istjx2=="0"){
				inputCheckboxArr[i].checked=isChecked;
			}else{
				return;
			}
		}	
	}
}
//等级下拉框更改时，给标准要求重新赋值，若检验结果为空，给检验结果赋默认值
function f_chnDj(obj,qualiStanItemId){
	var objval = obj.options[obj.selectedIndex].value;
	var objBzyq = obj.parentNode.parentNode.childNodes[5].childNodes[0];
	var objJyjg = obj.parentNode.parentNode.childNodes[6].childNodes[0];
	var objJyjgmr = obj.parentNode.parentNode.childNodes[0].childNodes[5];
	if($("#isFy").val()=="1"||$("input[name='isFy']:checked").val()=="1"){
		objBzyq = obj.parentNode.parentNode.childNodes[6].childNodes[0];
		objJyjg = obj.parentNode.parentNode.childNodes[7].childNodes[0];
	}
	var objIszdpd= obj.parentNode.parentNode.childNodes[0].childNodes[3];
	var objPdxd= obj.parentNode.parentNode.childNodes[0].childNodes[4];
	objBzyq.value="";
	objIszdpd.value="";
	objPdxd.value="";
	if(objval!=""&&qualiStanItemId!=""){
		for(var i1=0;i1<jsonDj.length;i1++){
			if(jsonDj[i1].qualiStanItemId==qualiStanItemId&&jsonDj[i1].qualiStanItemGraName==objval){
				objBzyq.value=jsonDj[i1].qualiStanItemGraRequire;
				objIszdpd.value=jsonDj[i1].isAutoJudgement;
				objPdxd.value=jsonDj[i1].qualiStanItemGraEqual;
				if(objJyjg.value==""){
					objJyjg.value=objJyjgmr.value;
				}
				break;
			}
		}
	}
}
//检验信息中的等级发生了修改时，更新每个项目的等级下拉框
function f_freshDj(){
	var objTable=document.getElementById ("bgbzTable");
	var rows = $("#bgbzTable input[name='qualiStanItemId']");
	var inspGrade=$("#m_select_freshSampGrade").val();
	if(document.getElementById("m_select_freshSampGrade_span")){
		inspGrade=$("#m_select_freshSampGrade_span").text();//老的页面还是用的biz.js的下拉多选框
	}
	for(var i=0;i<rows.length;i++){
		var objtr = objTable.rows[i+1];
		var dj=$(objtr).find("select[name='inspItemGrade']");
		var bzyq=$(objtr).find("textarea[name='inspItemRequire']");
		for(var i1=0;i1<jsonDj.length;i1++){
			if(jsonDj[i1].qualiStanItemId==rows[i].value){
				
				if(inspGrade!=""&&inspGrade.indexOf(jsonDj[i1].qualiStanItemGraName)!=-1){
					dj.val(jsonDj[i1].qualiStanItemGraName);
					bzyq.val(jsonDj[i1].qualiStanItemGraRequire);
					break;
				}
				if((inspGrade==""||inspGrade=="/")&&jsonDj[i1].qualiStanItemGraName=="—"){
					dj.val(jsonDj[i1].qualiStanItemGraName);
					bzyq.val(jsonDj[i1].qualiStanItemGraRequire);
					break;
				}
			}
		}
	}
}
//常用结果下拉框更改时，给检验结果重新赋值，若检验结果有回车，每一项都要赋值
function f_chnCyjg(obj){
	var objval = obj.options[obj.selectedIndex].value;
	if(objval==""){return;}
	var objJyjg = obj.parentNode.parentNode.childNodes[6].childNodes[0];
	if($("#isFy").val()=="1"||$("input[name='isFy']:checked").val()=="1"){
		objJyjg = obj.parentNode.parentNode.childNodes[7].childNodes[0];
	}
	if(objJyjg.value.indexOf("\n")==-1){
		objJyjg.value=objval;
	}else{
		var jyjgs=objJyjg.value;
		var jg="";
		for(var i=0;i<jyjgs.length;i++){
			jg=jg+jyjgs.charAt(i);
			if(jyjgs.charAt(i)==':'||jyjgs.charAt(i)=='：'){
				jg=jg+objval;
				if(jyjgs.charAt(i+1)!='\n'){
					for(j=i+1;j<jyjgs.length;j++){
						if(jyjgs.charAt(j)=='\n'){
							break;
						}
					}
					i=j-1;
				}
			}
		}
		objJyjg.value=jg;
	}
	
}
//批量设置为合格或不合格
function batchHg(vals){
	var objTable=document.getElementById ("bgbzTable");
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		var inputRadioObj = document.getElementsByName("qualifiedState_"+inputCheckboxArr[i].value);
		inputRadioObj[vals].checked=true;
		var objTr = objTable.rows[i+1];
		var parentTr=$(objTr);
		if(inputRadioObj[1].checked==true){
			parentTr.removeClass("radioS");
			parentTr.removeClass("radioN");
			parentTr.addClass("radioE");
		}else{
			if(inputRadioObj[0].checked==true){
				parentTr.removeClass("radioE");
				parentTr.removeClass("radioN");
				parentTr.addClass("radioS");
			}else{
				if(inputRadioObj[2].checked==true){
					parentTr.removeClass("radioS");
					parentTr.removeClass("radioE");
					parentTr.addClass("radioN");
				}else{
					parentTr.removeClass("radioS");
					parentTr.removeClass("radioN");
					parentTr.removeClass("radioE");
				}
			}
		}
	}
	//全部不判时，默认检验结论为检验结果见附页，20170803 莫少祥
	if(vals=="2"){
		//$("#inspSampResult").val("检验结果见附页。");
	}
}
//批量设置等级、标准要求、检验结果的值
function batchSetVal(){
	var flag=false;
	var objTable=document.getElementById ("bgbzTable");
	var setVal = $("select[name='selectBatch']").val();
	if(setVal==""||$("#batVal").val()==""){
		alert("请设置要赋值的选项和值");
		return;
	}
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			flag=true;
			var objtr = objTable.rows[i+1];
			if(setVal=="dj"){
				var batObj=$(objtr).find("select[name='inspItemGrade']");
			}
			if(setVal=="jyjg"){
				var batObj=$(objtr).find("textarea[name='inspItemResult']");
			}
			if(setVal=="bzyq"){
				var batObj=$(objtr).find("textarea[name='inspItemRequire']");
			}
			if(batObj.val()!=undefined){
				batObj.val($("#batVal").val());
			}
		}
	}
	if(flag==false){
		alert("没有选择任何行");
	}
}
//批量设置检验员
function batchSetJyy(){
	var flag=false;
	var setVal = $("#m_select_batJyy").val();
	if(setVal==""){
		alert("请选择要设置的检验员");
		return;
	}
	var objTable=document.getElementById ("bgbzTable");
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		if(inputCheckboxArr[i].checked==true){
			var objtr = objTable.rows[i+1];
			if($(objtr).find("input[name='istjx']").val()=="1"){
				flag=true;
				$(objtr).find("input[name='newinspItemPersonH']").val($("#m_select_batJyyH").val());
				$(objtr).find("input[name='newinspItemPerson']").val($("#m_select_batJyy").val());
			}
		}
	}
	if(flag==false){
		alert("没有选择任何行");
	}
}
//全选项目
function chkallItem(isChecked){
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		inputCheckboxArr[i].checked=isChecked;
	}
}
function radioInit(){
	var objTable=document.getElementById ("bgbzTable");
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	var bhg=0;
	for(var i=0;i<inputCheckboxArr.length;i++){
		var objTr = objTable.rows[i+1];
		var istjx=$(objTr).find("input[name='istjx']").val();
		var inputRadioObj = document.getElementsByName("qualifiedState_"+inputCheckboxArr[i].value);
		var parentTr=$(objTr);
		if(inputRadioObj[1].checked==true){
			parentTr.removeClass("radioS");
			parentTr.removeClass("radioN");
			parentTr.addClass("radioE");
			if(istjx=="1"){bhg=bhg+1;}
		}else{
			if(inputRadioObj[0].checked==true){
				parentTr.removeClass("radioE");
				parentTr.removeClass("radioN");
				parentTr.addClass("radioS");
			}else{
				if(inputRadioObj[2].checked==true){
					parentTr.removeClass("radioS");
					parentTr.removeClass("radioE");
					parentTr.addClass("radioN");
				}else{
					parentTr.removeClass("radioS");
					parentTr.removeClass("radioN");
					parentTr.removeClass("radioE");
				}
			}
		}
	}
	if(bhg>0){
		alert("共有"+bhg+"个项目不合格");
	}
} 
//自动判定
function f_autoPd(){
	try{
		autoPd();
		radioInit();
	}catch(e){
		;
	}
}
function autoPd(){
	//如果单项判定为“不评价”或检验标准为只出数据，不判，则改为“不判” 
	if ($("#isDxpdObj").val()=="0" || $("#pdbzObj").val()=="3"){
		batchHg(2);
		return;
	}
	var objTable=document.getElementById ("bgbzTable");
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputCheckboxArr.length;i++){
		var objtr = objTable.rows[i+1];
		var istjx=$(objtr).find("input[name='istjx']").val();
		var iszbx=$(objtr).find("input[name='iszbx']").val();
		var fymc=$(objtr).find("input[name='inspItemFymc']").val();
		var xmbh=$(objtr).find("input[name='inspItemCode']").val();
		var xmmc=$(objtr).find("input[name='inspItemName']").val();
		var dw=$(objtr).find("input[name='inspItemDw']").val();
		var bzyq=$(objtr).find("textarea[name='inspItemRequire']").val();
		var jyjg=$(objtr).find("textarea[name='inspItemResult']").val();
		//能否自动判定
		var isauto = $(objtr).find("input[name='isAutoJudgement']").val();
		var pdyj = $(objtr).find("input[name='qualiStanItemGraEqual']").val();	
		var ispd = $(objtr).find("input[name='isDetermine']").val();	 //是否判定
		//判定radio
		var inputRadioObj = document.getElementsByName("qualifiedState_"+inputCheckboxArr[i].value);
		//1、单项判定设置为不判时
		if(ispd=="0"){  
			inputRadioObj[2].checked=true;
			if(istjx=="1"&&iszbx=="0"){ //说明有小项，将所有小项改为不判
				for(var j=i;j<inputCheckboxArr.length;j++){
					var objtr2 = objTable.rows[j+1];
					var fymc2=$(objtr2).find("input[name='inspItemFymc']").val();
					var xmbh2=$(objtr2).find("input[name='inspItemCode']").val();
					if(fymc2==fymc&&xmbh2.substring(0,4)==xmbh){
						var inputRadioObj2 = document.getElementsByName("qualifiedState_"+inputCheckboxArr[j].value);
						inputRadioObj2[2].checked=true;
						i=i+1;
					}else{
						break;
					}
				}
			}
			continue;
		}
		//标准要求和检验结果相等判定为合格
		if(istjx=="1"&&iszbx=="1"&&jyjg!=""&&bzyq==jyjg){
			inputRadioObj[0].checked=true;
			continue;
		}
		//2、不能自动判定则直接退出
		if(isauto=="0"){
			continue;
		}
		//3、其他情况
		if(istjx=="1"&&iszbx=="1"&&jyjg!=""&&bzyq!=""){ //没有子项
			var hg=groupPD(pdyj,bzyq,jyjg,dw);
			if(hg!=-1){
				inputRadioObj[hg].checked=true;
				continue;
			}
		}
		if(istjx=="1"&&iszbx=="0"){ //有子项
			var flaghg=""; //只要有一个子项不合格则大项不合格
			for(var j=i+1;j<inputCheckboxArr.length;j++){
				var objtr2 = objTable.rows[j+1];
				var iszbx2=$(objtr2).find("input[name='iszbx']").val();
				var fymc2=$(objtr2).find("input[name='inspItemFymc']").val();
				var xmbh2=$(objtr2).find("input[name='inspItemCode']").val();
				var inputRadioObj2 = document.getElementsByName("qualifiedState_"+inputCheckboxArr[j].value);
				if(iszbx2=="0"&&fymc2==fymc&&xmbh2.substring(0,4)==xmbh){ //中间项跳过
					continue;
				}
				if(fymc2==fymc&&xmbh2.substring(0,4)==xmbh){ //是子项
					var pdyj2 = $(objtr2).find("input[name='qualiStanItemGraEqual']").val();
					var jyjg2 = $(objtr2).find("textarea[name='inspItemResult']").val();
					var bzyq2 = $(objtr2).find("textarea[name='inspItemRequire']").val();
					var dw2=$(objtr2).find("input[name='inspItemDw']").val();
					if(jyjg2!=""&&bzyq2!=""){
						var hg=groupPD(pdyj2,bzyq2,jyjg2,dw2);
						if(hg!=-1){
							inputRadioObj2[hg].checked=true;
							flaghg+=hg+"";
						}
					} 
					if(j==inputCheckboxArr.length-1){ //已经到了最后一个
						if(flaghg!=""){
							if(flaghg.indexOf("1")!=-1){inputRadioObj[1].checked=true; } //设置大项为不合格
							else{
								if(flaghg.indexOf("0")!=-1){inputRadioObj[0].checked=true; } //设置大项为合格
								else{inputRadioObj[2].checked=true;}
							} 
						}
					}
				}else{
					if(flaghg!=""){
						if(flaghg.indexOf("1")!=-1){inputRadioObj[1].checked=true; } //设置大项为不合格
						else{
							if(flaghg.indexOf("0")!=-1){inputRadioObj[0].checked=true; } //设置大项为合格
							else{inputRadioObj[2].checked=true;}
						} 
					}
					break;
				}
			}
			//已经做出判定,跳出此次循环接着遍历下一个项目，否则继续往后面的代码判断
			if(flaghg!=""){i=j-1;continue;}
		}
		//后面没有其他情况了
	} //end for 
}
function groupPD(pdyj,bzyq,jyjg,dw){ //将所有判定情况组合
	var flaghg=-1;
	//1.1 可以直接用文本值判断的 
	flaghg=textPD(pdyj,bzyq,jyjg);
	if(flaghg!=-1){return flaghg;}
	//1.2 色牢度的判定
	if((bzyq.indexOf("变色")!=-1||bzyq.indexOf("沾色")!=-1)&&(jyjg.indexOf("变色")!=-1||jyjg.indexOf("沾色")!=-1)){
		flaghg=seLaoDuPD(bzyq,jyjg,"变色","沾色");
		if(flaghg!=-1){return flaghg;}
	} 
	if(bzyq.indexOf("干摩")!=-1||bzyq.indexOf("湿摩")!=-1){  
		flaghg=seLaoDuPD(bzyq,jyjg,"干摩","湿摩");
		if(flaghg!=-1){return flaghg;}
	}
	if(dw=="级"){
		flaghg=SLDPD(bzyq,jyjg);
		if(flaghg!=-1){return flaghg;}
	}
	//1.3 数字判定
	flaghg=numberPD(bzyq,jyjg);
	if(flaghg!=-1){return flaghg;}
	//1.4 其他带回车符的项目的判定
	flaghg=otherTextAreaPD(bzyq,jyjg);
	if(flaghg!=-1){return flaghg;}
	return -1;
}
//纯文本判定合格，如检验结果=符合时，则判定为合格
function textPD(pdyjs,bzyqs,jyjgs){
	if(bzyqs=="—"||bzyqs=="-"){  //不判
		return 2;
	}
	//检验结果与判定要求相等，则合格
	if(pdyjs!=""){
		if(pdyjs==jyjgs){return 0;}
		else{return 1;}
	}
	if(jyjgs==bzyqs||jyjgs=="符合"||jyjgs.substring(0,2)=="符合"||jyjgs.substring(0,3)=="未检出"){
		return 0;
	}else{
		if(jyjgs=="不符合"||jyjgs=="未标注"||jyjgs=="未正确标注"||jyjgs.substring(0,3)=="不符合"){
			return 1;
		}
	}
	return -1;
}
/*判断带数字的合格性，标准要求类似＞2——3、＞2~3、＞2、＜3、检验结果类似3、3.4、
 * 经向：33
 * 纬向：44等
 */
function numberPD(bzyqs,jyjgs){
	jyjgs=jyjgs.replace(new RegExp(/(：)/g),":");
	if(jyjgs.indexOf("\n")==-1){ //没有回车换行
		if(jyjgs.indexOf(":")!=-1){ //有一个结果项，如：经向：333
			var arr1=jyjgs.split(":");
			return tonumberPD(bzyqs,arr1[1]);
		}else{ //直接是结果，如：333
			return tonumberPD(bzyqs,jyjgs);
		}
	}else{ //有回车，如有经纬向的检验结果
		var flaghg="";
		var arr1 = jyjgs.split("\n");
		for(var i=0;i<arr1.length;i++){
			if(arr1[i].indexOf(":")==-1){  //没有结果值，返回
				return -1;break;
			}else{
				var arr2=arr1[i].split(":");
				if(arr2[1]==""||isNaN(arr2[1])){ //没有结果值，返回
					return -1;break;
				}else{
					var hg=tonumberPD(bzyqs,arr2[1]);
					if(hg==-1){return -1;break;}
					else{
						flaghg+=""+hg;
					}
				}
			}
		}
		if(flaghg!=""){
			if(flaghg.indexOf("1")!=-1){return 1; } //不合格
			else{
				if(flaghg.indexOf("2")!=-1){return 2; }  
				else{return 0;}
			}
		}
	}
	return -1;
}
function tonumberPD(bzyqs,jyjgs){
	if(!isNaN(jyjgs)){
		var nQuJian = getQuJianPos(bzyqs);   //得到分隔符的位置,表示两个数之间的范围，只能用~、～、— 这3种分隔符
		switch (bzyqs.substr(0,1)){
		case "-" : 
			if (nQuJian != -1){ // 处理如：-3～+5 、-13～15等
				var nBiaoZhun_min = bzyqs.substring(0, nQuJian) * 1;
				var nBiaoZhun_max = bzyqs.substring(nQuJian+1, bzyqs.length) * 1;
				if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
					return 0; //合格
				}else{
					return 1; //不合格
				}
			}else{
				if(bzyqs.substr(2,bzyqs.length).indexOf("±")!=-1){ //处理如：-34±3
					var arr=bzyqs.split("±");
					var nBiaoZhun_min = arr[0] * 1-arr[1] * 1;
					var nBiaoZhun_max = arr[0] * 1+arr[1] * 1;
					if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
						return 0; //合格
					}else{
						return 1; //不合格
					}
				}
			}	
			break;
		case "+" : 
			if (nQuJian != -1){ // 处理如：+3～-5 、+13～15、+13～+15等
				var nBiaoZhun_min = bzyqs.substring(0, nQuJian) * 1;
				var nBiaoZhun_max = bzyqs.substring(nQuJian+1, bzyqs.length) * 1;
				if(bzyqs.substring(nQuJian+1,nQuJian+2)=="-"){
					nBiaoZhun_min = bzyqs.substring(nQuJian+1, bzyqs.length) * 1;
					nBiaoZhun_max = bzyqs.substring(0,nQuJian) * 1;
				}
				if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
					return 0; //合格
				}else{
					return 1; //不合格
				}
			}else{
				if(bzyqs.substr(2,bzyqs.length).indexOf("±")!=-1){ //处理如：+34±3
					var arr=bzyqs.split("±");
					var nBiaoZhun_min = arr[0] * 1-arr[1] * 1;
					var nBiaoZhun_max = arr[0] * 1+arr[1] * 1;
					if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
						return 0; //合格
					}else{
						return 1; //不合格
					}
				}
			}	
			break;
		case "0" :
		case "1" :
		case "2" :
		case "3" :
		case "4" :
		case "5" :
		case "6" :
		case "7" :
		case "8" :
		case "9" :
			if (nQuJian != -1){ // 处理如：1～3 、13～15等
				var nBiaoZhun_min = bzyqs.substring(0, nQuJian) * 1;
				var nBiaoZhun_max = bzyqs.substring(nQuJian+1, bzyqs.length) * 1;
				if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
					return 0; //合格
				}else{
					return 1; //不合格
				}
			}else{
				if(bzyqs.substr(1,bzyqs.length).indexOf("±")!=-1){ //处理如：34±3
					var arr=bzyqs.split("±");
					var nBiaoZhun_min = arr[0] * 1-arr[1] * 1;
					var nBiaoZhun_max = arr[0] * 1+arr[1] * 1;
					if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
						return 0; //合格
					}else{
						return 1; //不合格
					}
				}
			}		
			break;
		case "≥" :
			if (nQuJian == -1){ // “标准”没有分隔符，如 ≥3
				if(parseFloat(jyjgs)<parseFloat(bzyqs.substr(1, bzyqs.length))){
					return 1; //不合格
				}else{
					return 0;
				}
			} 
			break;
		case "＞" :
		case ">" :
			if (nQuJian == -1){ // “标准”没有分隔符，如 ＞3
				if(parseFloat(jyjgs)<=parseFloat(bzyqs.substr(1, bzyqs.length))){
					return 1; //不合格
				}else{
					return 0;
				}
			}
			break;
		case "≤" :
			if (nQuJian == -1){ // “标准”没有分隔符，如 ≤3
				if(parseFloat(jyjgs)>parseFloat(bzyqs.substr(1, bzyqs.length))){
					return 1; //不合格
				}else{
					return 0;
				}
			} 
			break;
		case "＜" :
		case "<" :
			if (nQuJian == -1){ // “标准”没有分隔符，如 <3
				if(parseFloat(jyjgs)>=parseFloat(bzyqs.substr(1, bzyqs.length))){
					return 1; //不合格
				}else{
					return 0;
				}
			}
			break;
		case "±" :
			if (nQuJian == -1){ // “标准”没有分隔符，如 ±30
				var nBiaoZhun_min = bzyqs.substring(1, bzyqs.length) * (-1);
				var nBiaoZhun_max = bzyqs.substring(1, bzyqs.length) * 1;
				if(parseFloat(jyjgs)<=parseFloat(nBiaoZhun_max)&&parseFloat(jyjgs)>=parseFloat(nBiaoZhun_min)){
					return 0; //合格
				}else{ 
					return 1; //不合格
				}
			}	
			break;
		default :
		}
	}
	return -1; //做不出判断
}
//得到 区间分隔符 的位置，如果有 区间分隔符，则返回其位置，否则，返回－1
function getQuJianPos(pStringToSearch){
	var QUJIAN1 = "~";     //区间分隔符1
	var QUJIAN2 = "～";    //区间分隔符2
	var QUJIAN3 = "—";    //区间分隔符3
	if (pStringToSearch.lastIndexOf(QUJIAN1)!=-1){
		return pStringToSearch.lastIndexOf(QUJIAN1);
	}else{
		if (pStringToSearch.lastIndexOf(QUJIAN2)!=-1){
			return pStringToSearch.lastIndexOf(QUJIAN2);
		}else{ 
			if(pStringToSearch.lastIndexOf(QUJIAN3)!=-1){
				return pStringToSearch.lastIndexOf(QUJIAN3);
			}
		}
	}
	return -1;
}
//无回车换行的色牢度的判定，2——3改成2.3
function SLDPD(bzyq,jyjg){
	var bzyqs=bzyq.replace(new RegExp(/——/g),".");
	bzyqs=bzyqs.replace(new RegExp(/—/g),".");
	bzyqs=bzyqs.replace(new RegExp(/-/g),".");
	if(bzyqs=="."){
		return 2; //不判
	}
	if(bzyqs==""||bzyqs.substring(1)==""||isNaN(bzyqs.substring(1))){
		return -1;
	}
	if(bzyqs.substr(0,1)!="≥"){
		bzyqs="≥"+bzyqs;
	}
	var jyjgs=jyjg.replace(new RegExp(/(：)/g),":");
	jyjgs=jyjgs.replace(new RegExp(/——/g),".");
	jyjgs=jyjgs.replace(new RegExp(/—/g),".");
	jyjgs=jyjgs.replace(new RegExp(/-/g),".");
	//1.检验结果没有子分类的情况
	if(jyjgs.indexOf(":")==-1){
		if(parseFloat(jyjgs)<parseFloat(bzyqs.substring(1))){
			return 1; //不合格
		}else{
			return 0;
		}
	}else{ //2.检验结果有多个子分项的情况
		jyjgs=jyjgs.replace(/\n/g,"^");
		var jyjgarr=jyjgs.split("^");
		var hg="";
		for(var i=0;i<jyjgarr.length;i++){
			var xjg = jyjgarr[i].substring(jyjgarr[i].indexOf(":")+1);
			xjg=xjg.replace(/\s+/g,"");
			if(xjg==""||isNaN(xjg)){break;}
			else{
				if(parseFloat(xjg)<parseFloat(bzyqs.substring(1))){
					return 1; //不合格
					break;
				}else{hg="1";}
			}
		}
		if(hg=="1"){
			return 0; //合格
		}
	}
	return -1;
}
//判断色牢度的合格性
function seLaoDuPD(bzyq,jyjg,bs,zs){
	var bzyqs=bzyq.replace(new RegExp(/(：)/g),":");
	bzyqs=bzyqs.replace(new RegExp(/——/g),".");
	bzyqs=bzyqs.replace(new RegExp(/—/g),".");
	bzyqs=bzyqs.replace(new RegExp(/-/g),".");
	var bsyqarr = bzyqs.split(bs+":");
	var bsyq="";
	for(var k=1;k<bsyqarr[1].length;k++){
		if(bsyqarr[1].charAt(k)=='.'){bsyq+=".";continue;}
		if(isNaN(bsyqarr[1].charAt(k))){break;}
		else{bsyq+=bsyqarr[1].charAt(k);}
	}
	var zsyqarr = bzyqs.split(zs+":");
	var zsyq="";
	for(var k=1;k<zsyqarr[1].length;k++){
		if(zsyqarr[1].charAt(k)=='.'){zsyq+=".";continue;}
		if(isNaN(zsyqarr[1].charAt(k))){break;}
		else{zsyq+=zsyqarr[1].charAt(k);}
	}
	var jyjgs=jyjg.replace(new RegExp(/(：)/g),":");
	jyjgs=jyjgs.replace(new RegExp(/——/g),".");
	jyjgs=jyjgs.replace(new RegExp(/—/g),".");
	jyjgs=jyjgs.replace(new RegExp(/-/g),".");
	jyjgs=jyjgs.replace(/\n/g,"^");
	var jyjgarr=jyjgs.split("^");
	var hg="";
	for(var i=0;i<jyjgarr.length;i++){
		if(jyjgarr[i].indexOf(bs+":")!=-1){
			var bsjgarr = jyjgarr[i].split(bs+":");
			var bsjg="";
			for(var k=0;k<bsjgarr[1].length;k++){
				if(bsjgarr[1].charAt(k)=='.'){bsjg+=".";continue;}
				if(isNaN(bsjgarr[1].charAt(k))){break;}
				else{bsjg+=bsjgarr[1].charAt(k);}
			}
			if(bsjg!=""){
				if(parseFloat(bsjg)<parseFloat(bsyq)){
					return 1; //不合格
				}else{hg="1";}
			}
		}
		if(jyjgarr[i].indexOf(zs+":")!=-1){
			var zsjgarr = jyjgarr[i].split(zs+":");
			var zsjg="";
			for(var k=0;k<zsjgarr[1].length;k++){
				if(zsjgarr[1].charAt(k)=='.'){zsjg+=".";continue;}
				if(isNaN(zsjgarr[1].charAt(k))){break;}
				else{zsjg+=zsjgarr[1].charAt(k);}
			}
			if(zsjg!=""){
				if(parseFloat(zsjg)<parseFloat(zsyq)){
					return 1; //不合格
				}else{hg="1";}
			}
		}
	}
	if(hg=="1"){
		return 0; //合格
	}
	return -1;  
}
//色牢度除外的其他有回车换行的项目的合格性,要求标准要求的项数与检验结果的项数都用：或:分隔
function otherTextAreaPD(bzyq,jyjg){
	var bzyqs=bzyq.replace(new RegExp(/(：)/g),":");
	bzyqs=bzyqs.replace(/\n/g,"^");
	var bzyqArr = bzyqs.split("^");
	var bzyqArrName = new Array(bzyqArr.length);
	var bzyqArrVal = new Array(bzyqArr.length); 
	for(var i=0;i<bzyqArr.length;i++){
		var arr1 = bzyqArr[i].split(":");
		bzyqArrName[i]=arr1[0];
		bzyqArrVal[i]=arr1[1];
	}
	var jyjgs=jyjg.replace(new RegExp(/(：)/g),":");
	jyjgs=jyjgs.replace(/\n/g,"^");
	var jyjgArr = jyjgs.split("^");
	var hg="";
	for(var i=0;i<jyjgArr.length;i++){
		var arr1 = jyjgArr[i].split(":");
		for(var j=0;j<bzyqArrName.length;j++){
			if(bzyqArrName[j]==arr1[0]){
				hg+=numberPD(bzyqArrVal[j],arr1[1])+"";
				break;
			}
		}
	}
	if(hg==""){return -1;}
	if(hg.indexOf("1")!=-1){return 1;} //不合格 
	else{
		if(hg.indexOf("0")!=-1){return 0;}
		else{return 2;}
	}
}
//保存检验员
function getInspItemPersons(){
	var inputPeronIdOld = $("#bgbzTable input[name='oldinspItemPerson']");
	var inputPeronIdNew = $("#bgbzTable input[name='newinspItemPersonH']");
	var keys="";
	for(var i=0;i<inputPeronIdOld.length;i++){
		if(inputPeronIdOld[i].value!=inputPeronIdNew[i].value){
			keys=keys+","+$(inputPeronIdOld[i]).closest("tr").find("input[name='inspItemId']").val();
			var arr = inputPeronIdNew[i].value.split(",");
			for(var j=0;j<arr.length;j++){
				keys+="_"+arr[j];
			}
		}
	}
	if(keys!=""){
		keys=keys.substring(1);
	}
	return keys;
}
//保存前获得检验结果编辑数据
function getInspItemResultAll(){
	var inspItemJson="[";
	var objTable=document.getElementById ("bgbzTable");
	var inputIstjxArr = $("#bgbzTable input[name='istjx']");
	var inputIszbxArr = $("#bgbzTable input[name='iszbx']");
	var inputCheckboxArr = $("#bgbzTable input[name='inspItemId']");
	for(var i=0;i<inputIstjxArr.length;i++){
		var objtr = objTable.rows[i+1];
		var dw=$(objtr).find("input[name='inspItemDw']").val();
		var pd=$(objtr).find("input[type='radio']:checked").val();
		if(pd==undefined){
			pd="";
		}
		if(i>0){
			inspItemJson+=",";
		}
		inspItemJson+="{\"inspItemId\":\""+inputCheckboxArr[i].value+"\"";
		inspItemJson+=",\"inspItemDw\":\""+dw+"\"";
		inspItemJson+=",\"qualifiedState\":\""+pd+"\"";
		if(inputIstjxArr[i].value=="1"&&inputIszbxArr[i].value=="1"){
			var xh=$(objtr).find("input[name='inspItemIndex']").val();
			var dj=$(objtr).find("select[name='inspItemGrade']").val();
			var bzyq=$(objtr).find("textarea[name='inspItemRequire']").val();
			var jyjg=$(objtr).find("textarea[name='inspItemResult']").val();
			var jyff=$(objtr).find("textarea[name='inspItemJyff']").val();
			inspItemJson+=",\"inspItemIndex\":\""+xh+"\"";
			inspItemJson+=",\"inspItemGrade\":\""+dj+"\"";
			inspItemJson+=",\"inspItemRequire\":\""+bzyq+"\"";
			inspItemJson+=",\"inspItemResult\":\""+jyjg+"\"";
			inspItemJson+=",\"inspItemJyff\":\""+jyff+"\"";
			inspItemJson+="}";
		}
		if(inputIstjxArr[i].value=="1"&&inputIszbxArr[i].value=="0"){
			var xh=$(objtr).find("input[name='inspItemIndex']").val();
			var jyff=$(objtr).find("textarea[name='inspItemJyff']").val();
			inspItemJson+=",\"inspItemIndex\":\""+xh+"\"";
			inspItemJson+=",\"inspItemGrade\":\"\"";
			inspItemJson+=",\"inspItemRequire\":\"\"";
			inspItemJson+=",\"inspItemResult\":\"\"";
			inspItemJson+=",\"inspItemJyff\":\""+jyff+"\"";
			inspItemJson+="}";
		}
		if(inputIstjxArr[i].value=="0"&&inputIszbxArr[i].value=="1"){
			var dj=$(objtr).find("select[name='inspItemGrade']").val();
			var bzyq=$(objtr).find("textarea[name='inspItemRequire']").val();
			var jyjg=$(objtr).find("textarea[name='inspItemResult']").val();
			inspItemJson+=",\"inspItemIndex\":\"\"";
			inspItemJson+=",\"inspItemGrade\":\""+dj+"\"";
			inspItemJson+=",\"inspItemRequire\":\""+bzyq+"\"";
			inspItemJson+=",\"inspItemResult\":\""+jyjg+"\"";
			inspItemJson+=",\"inspItemJyff\":\"\"}";
		}
		 
	}
	inspItemJson+="]";
	inspItemJson = inspItemJson.replace(/^[\r\n\s]*|[\r\n\s]*$/g, "");// 表示去掉开头和结尾的回车、换行和空格
	inspItemJson = inspItemJson.replace(/[\r\n]/g, "<br>");//将json中的所有回车换行替换为<br>
	return inspItemJson;
}
//检验项目格式化处理
function formatFormJyxm(){
	var sxm="";
	var sbs="";var scf="";var sjq="";var sph="";var syw="";var sfxa="";var ssld="";swg="";
	var jyxmsep = "，";
	if(global_inspitem_separator&&global_inspitem_separator!=""){jyxmsep=global_inspitem_separator;}
	var objTable=document.getElementById ("bgbzTable");
	var inputIstjxArr = $("#bgbzTable input[name='istjx']");
	for(var i=0;i<inputIstjxArr.length;i++){
		if(inputIstjxArr[i].value=="1"){
			var objtr = objTable.rows[i+1];
			var xmbh=$(objtr).find("input[name='inspItemCode']").val();
			var xmmc=$(objtr).find("input[name='inspItemName']").val();
			if(xmbh=="0001"){sbs="标识";continue;}
			if(xmbh=="0002"){scf=xmmc;continue;}
			if(xmbh=="0003"){sjq="甲醛含量";continue;}
			if(xmbh=="0004"){sph="pH值";continue;}
			if(xmbh=="0006"){syw="异味";continue;}
			if(xmbh=="0005"){sfxa="可分解致癌芳香胺染料";continue;}
			if(xmmc.indexOf("色牢度")!=-1){ssld="染色牢度";continue;}
			if(xmbh=="0035"||xmmc.indexOf("外观质量")!=-1){swg="外观质量";continue;}
			if((jyxmsep+sxm+jyxmsep).indexOf(jyxmsep+xmmc+jyxmsep)==-1){
				if(sxm==""){sxm=xmmc;}
				else{sxm=sxm+jyxmsep+xmmc;}
			}
		}
	}
	var spx="";
	if(sbs!=""){spx=sbs;}
	if(scf!=""){if(spx==""){spx=scf;}else{spx=spx+jyxmsep+scf;}}
	if(sjq!=""){if(spx==""){spx=sjq;}else{spx=spx+jyxmsep+sjq;}}
	if(sph!=""){if(spx==""){spx=sph;}else{spx=spx+jyxmsep+sph;}}
	if(syw!=""){if(spx==""){spx=syw;}else{spx=spx+jyxmsep+syw;}}
	if(sfxa!=""){if(spx==""){spx=sfxa;}else{spx=spx+jyxmsep+sfxa;}}

	if(spx!=""){if(sxm==""){sxm=spx;}else{sxm=spx+jyxmsep+sxm;}}
 	if(ssld!=""){if(sxm==""){sxm=ssld;}else{sxm=sxm+jyxmsep+ssld;}}
 	if(swg!=""){if(sxm==""){sxm=swg;}else{sxm=sxm+jyxmsep+swg;}}
 	sxm=sxm.replace(new RegExp(/(：)/g),"");
 	sxm=sxm.replace(new RegExp(/(:)/g),"");
 	$("#inspSampItem").val(sxm);
}
//检验依据格式化
function formatFormJyyj(){
	var jyyjs=$("#inspSampStandard").val();
	var str1="";
	for(var k=0;k<jyyjs.length;k++){
		if(jyyjs.charAt(k)=="《"){
			for(var j=k+1;j<jyyjs.length;j++){
				if(jyyjs.charAt(j)=="》"){
					k=j;
					break;
				}
			}
		}else{
			str1+=jyyjs.charAt(k);
		}
	}
	//将分号替换成空格
	str1 = str1.replace(/；/g, "  ");
	$("#inspSampStandard").val(str1);
}
//实务质量
function formatFormSwzl(){
	$("#inspSampSwpd").val("经抽样检验，实物质量符合××标准，检验结论为合格。");
	if($("#inspSampBqpd").val()==""){
		$("#inspSampBqpd").val("经抽样检验，产品标识符合××标准，检验结论为合格。");
	}
	if($("#inspSampZhpd").val()==""){
		$("#inspSampZhpd").val("经抽样检验，产品实物质量合格，标识合格，综合判定为合格。");
	}
}
//给检验结论赋值
function f_jyjl(obj){
	var objval = obj.options[obj.selectedIndex].text;
	if(objval!=""){
		var radios = document.getElementsByName("radiojl");
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked==true){
				document.getElementById(radios[i].value).value=objval;
				break;
			}
		}
		obj.selectedIndex=0;
	}
}
