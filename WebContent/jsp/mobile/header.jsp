<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/mobile/css/mui.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/mobile/css/font-awesome.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resource/mobile/css/jhr.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/jhr/js/globalData_xn.js"></script>
<script src="<%=request.getContextPath() %>/resource/jhr/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/resource/jhr/js/common.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resource/mobile/js/mui.min.js"></script>	
<script src="<%=request.getContextPath()%>/resource/mobile/js/mui.jhr.js"></script>
<title>${sysTitle}</title>
<script>
function toGetSelectData(url,param,id) {
	var json=getAjaxData(url,param,false); //false同步执行，true异步执行
	if(json){
		var html ="";
		for (var i = 0;i < json.length; i++) {
			var d=json[i];
			if(d.name=="请选择"||d.value==""){
				html+="<div class='j_select__option' title=''>全部</div>";
			}else{
				html+="<div class='j_select__option' title='"+d.value+"'>"+d.name+"</div>";
			}
		}
		$("#"+id).html(html);
	}
} 
function toGetTreeDataList(url,param,id) {
	var json=getAjaxData(url,param,false); //false同步执行，true异步执行
	if(json){
		var html ="";
		for (var i = 0;i < json.length; i++) {
			var d=json[i];
			if(d.id==""){
				html+="<div class='j_select__option' title=''>全部</div>";
			}else{
				html+="<div class='j_select__option' title='"+d.id+"'>"+d.name+"</div>";
			}
		}
		$("#"+id).html(html);
	}
}
function showTipMessage(msg,duration){
	duration=isNaN(duration)?3000:duration;
	var m = document.createElement('div');
	m.innerHTML = msg;
	m.style.cssText="width:72%;min-width:220px;background:#000;opacity:0.8;height:40px;color:#fff;line-height:40px;text-align:center; border-radius:5px;position:fixed;top:80%;left:14%;z-index:999999;font-size:14px;";
    document.body.appendChild(m);
	setTimeout(function() {
		var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
		setTimeout(function() { document.body.removeChild(m); }, d * 1000);
	}, duration);
}
</script>