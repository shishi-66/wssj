<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="expires" content="no-cache" />
<%@ include file="/jsp/common/headerPagePrint.jsp"%>
</head>
<body >
<div class="pageBar Noprint" >
<OBJECT id=WebBrowser classid=CLSID:8856F961-340A-11D0-A96B-00C04FD705A2 height=0 width=0  VIEWASTEXT></OBJECT>
左<input type="text" id="sleft" onblur="f_chkNum(this)" style="width:40"  value="0">
右<input type="text" id="sright" onblur="f_chkNum(this)" style="width:40"  value="0">
上<input type="text" id="stop" onblur="f_chkNum(this)" style="width:40" value="0">
下<input type="text" id="sbottom" onblur="f_chkNum(this)" style="width:40" value="0">
<input type=button value=打印 onclick="try{document.all.WebBrowser.ExecWB(6,1)}catch(e){window.print();}">     
<!--<input type=button value=直接打印 onclick=PageSetup();document.all.WebBrowser.ExecWB(6,6)>-->     
<input type=button value=页面设置 onclick="try{document.all.WebBrowser.ExecWB(8,1)}catch(e){alert('该浏览器不支持，请使用ie浏览器');}">   
<input type=button value=打印预览 onclick="try{document.all.WebBrowser.ExecWB(7,1)}catch(e){alert('该浏览器不支持，请使用ie浏览器');}"> 
</div>
<div id="pldy" style="height:280mm">
</div>
 
</body>
<script type="text/javascript">
PageSetup();
$(function() {
	$.ajax({
		url : "<%=request.getContextPath()%>/webSample/listprint.do",
		type : "post",async: false,dataType : "json",
		data:{keys : "${ids}"},
		success:function(json) {			
			for(var i=0;i<json.length;i++){				
				pldy.innerHTML += "<iframe id='frame_"+i+"' src='<%=request.getContextPath()%>/jsp/inspection/inspFlow_wssj/print_n.jsp' width='100%' height='100%' frameborder='0' scrolling='no'></iframe>";
				//if(i<json.length){
					//pldy.innerHTML += "<div class='PageNext'></div>";
				//}
			}	
			$(json).each(function(i,data1) {
				var iframe = document.getElementById("frame_"+i);
				$(iframe).load(function(){                             //  等iframe加载完毕  
					readToPage(iframe.contentWindow,data1);  
				});													
			});	
        }
	});
});
function readToPage(iframeWindow,data){		
	
	var spanarr = iframeWindow.document.getElementsByTagName("span");
	var idname;var realname;
	for(var i=0;i<spanarr.length;i++){
		idname = spanarr[i].id;
		realname = idname;	
		if(idname.substring(0,5)=="date_"){
			realname = idname.substring(5);
		}else if(idname.substring(0,7)=="dateHH_"){
			realname = idname.substring(7);
		}else if(idname.substring(0,9)=="dateHHmm_"){
			realname = idname.substring(9);
		}else if(idname.substring(0,11)=="dateHHmmss_"){
			realname = idname.substring(11);
		}else if(idname.substring(0,8)=="noempty_"){
			realname = idname.substring(8);
		}else if(idname.substring(0,5)=="heng_"){
			realname = idname.substring(5);
		}else if(idname.substring(0,8)=="yesorno_"){
			realname = idname.substring(8);
		}else if(idname.substring(0,8)=="panding_"){
			realname = idname.substring(8);
		}		
		if(typeof(data[realname])!="undefined"){
			if(idname.substring(0,5)=="date_"){
				spanarr[i].innerText=data[realname].substring(0,10); //2017-01-01
			}else if(idname.substring(0,7)=="dateHH_"){
				spanarr[i].innerText=data[realname].substring(0,13); //2017-01-01 09
			}else if(idname.substring(0,9)=="dateHHmm_"){
				spanarr[i].innerText=data[realname].substring(0,16); //2017-01-01 09:30
			}else if(idname.substring(0,11)=="dateHHmmss_"){
				spanarr[i].innerText=data[realname].substring(0,19); //2017-01-01 09:30:00
			}else if(idname.substring(0,8)=="noempty_"){
				spanarr[i].innerText=data[realname]==""?"/":data[realname];
			}else if(idname.substring(0,5)=="heng_"){
				var defv=data[realname];
				if(defv==""||defv=="——"||defv=="—"){defv="/";}
				spanarr[i].innerText=defv;
			}else if(idname.substring(0,8)=="yesorno_"){
				if(data[realname]=="1"){spanarr[i].innerText="是";}
				else if(data[realname]=="0"){spanarr[i].innerText="否";}
				else{spanarr[i].innerText="/";}
			}else if(idname.substring(0,8)=="panding_"){
				if(data[realname]=="1"){spanarr[i].innerText="是";}
				else if(data[realname]=="0"){spanarr[i].innerText="否";}
				else if(data[realname]=="2"){spanarr[i].innerText="不判";}
				else{spanarr[i].innerText="";}
			}else{
				spanarr[i].innerText=data[realname];
			}	
		}	
	}
	//iframeWindow.document.getElementById("btn1").onclick(); //画条码
}
 
</script>

</html>
