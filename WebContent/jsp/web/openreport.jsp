<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
html,body { margin:0; padding:0;} 
</style>
</head>
<body  scroll="no">
<iframe src="<%=request.getContextPath()%>/webQuery/openReportPdf.do?cateogry=${inspsampid}"  
  style="position: absolute; width: 100%; height: 98%; top:0; left:0;" 
frameborder=0 marginheight=0 marginwidth=0 hspace=0 vspace=0 scrolling=no>
</iframe>
</body>
 
</html>
