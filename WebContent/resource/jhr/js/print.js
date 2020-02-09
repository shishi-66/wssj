function f_chkNum(obj){
	if(isNaN(obj.value)){
		alert("只能输入数字！");
		obj.value="";
		obj.focus();
		return false;
	}
}
function PageSetup_Null(l,r,t,b){
	try{
	var HKEY_Root,HKEY_Path,HKEY_Key;
	HKEY_Root="HKEY_CURRENT_USER";
	HKEY_Path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
     var Wsh=new ActiveXObject("WScript.Shell");
	HKEY_Key="header";
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
	HKEY_Key="footer";
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
	HKEY_Key="margin_left"
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,l); //键值设定--左边边界

	HKEY_Key="margin_top"
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,t); //键值设定--上边边界

	HKEY_Key="margin_right"
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,r); //键值设定--右边边界

	HKEY_Key="margin_bottom"
	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,b); //键值设定--下边边界
	}catch(e){
        var errorMsg = e.message+"\r"+"设置:IE选项->安全->Internet->"+"ActiveX控件和插件"+"\r"+"对未标记为可安全执行脚本的ActiveX的控件初始化并执行脚本->允许/提示";
        alert(errorMsg);
        //return;
	}
}

function PageSetup() {
	var sl="0",sr="0",st="0",sb="0";
	if ($("#sleft").val() != "0"){
		sl = String(Number($("#sleft").val())/25.4);
	}
	if ($("#sright").val() != "0"){
		sr = String(Number($("#sright").val())/25.4);
	}
	if ($("#stop").val() != "0"){
		st = String(Number($("#stop").val())/25.4);
	}
	if ($("#sbottom").val() != "0"){
		sb = String(Number($("#sbottom").val())/25.4);
	}
	PageSetup_Null(sl,sr,st,sb);
	//window.print();
}