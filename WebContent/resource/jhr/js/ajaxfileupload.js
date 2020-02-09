function checkFileWordPdf(fileid){
	var filepath=$("#"+fileid).val();
	if(filepath==null||filepath==""){
		alert("请选择要上传的文件！");
	}else{
		var fileName=filepath.match(/[^\/]*$/)[0];
		var strRegex = "(.pdf|.docx|.doc)$";  
		var re=new RegExp(strRegex);
		if (re.test(fileName.toLowerCase())){
		       return true;
		}		
	}
	return false;
}
function checkFileDoc(fileid){
	var filepath=$("#"+fileid).val();
	if(filepath==null||filepath==""){
		alert("请选择要上传的文件！");
	}else{
		var fileName=filepath.match(/[^\/]*$/)[0];
		var strRegex = "(.doc)$";  
		var re=new RegExp(strRegex);
		if (re.test(fileName.toLowerCase())){
		       return true;
		}		
	}
	return false;
}

function isImgs(str){
  var strRegex = "(.bmp|.jpg|.jpeg|.gif|.png)$"; //用于验证图片扩展名的正则表达式
  var re=new RegExp(strRegex);
  if (re.test(str.toLowerCase())) {
       return true;
  }else{
     alert("对不起!,文件的扩展名必须为bmp,jpg,jpeg,gif,png格式"); 
     return false;
  }
}
function checkImg(fileId){
	var flag=false;
	var filepath=$("#"+fileId).val();
	if(filepath==null||filepath==""){
		alert("请选择要上传的文件！");
	}else{
		var fileName=filepath.match(/[^\/]*$/)[0];
		if(isImgs(fileName)){
			flag=true;
		}
	}
	return flag;
}
  
function ajaxDeleteFile(url,param){
	if(window.confirm("确认删除吗?")){
		var fpath = $('#edit_attachmentPath').val().replace(/\\/g, "/");
		$.ajax({  
			url: url+fpath,
			dataType: 'json',cache: false,data:param, 
			success:function(data){
				//alert(JSON.stringify(data)); 
				if((data.status&&data.status=="1")||(data.rc&&data.rc=="1")){
					$("#edit_attachmentPath").val("");
					$("#loadingUrl").attr("src","");
					$("#loadingUrl").hide();
				}
			}
		});
	}
}

function ajaxUploadFile(urlup,urlshow,fileId,param1,params,filetype){
	var formFile = new FormData();
    formFile.append(param1, document.getElementById(fileId).files[0]); //加入文件对象
    if(params){
		for(var q in params){
			if(q!=""){
				formFile.append(q,params[q]);
			}
		}
	}
    $.ajax({ 
		type: "post",url: urlup,data: formFile,dataType: "json",cache: false,
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须   
		success: function (json) { 
			if((json.status&&json.status=="1")||(json.rc&&json.rc=="1")){
				$("#edit_attachmentPath").val(json.path);
				if(filetype=="img"){
					$("#loadingUrl").attr("src",urlshow+ json.path);
				}else if(filetype=="file"){
					var a="<a href='"+urlshow+encodeURIComponent(json.path)+"' ";
					a+=" target='_blank' style='color:#03F'>点击下载</a>";
					$("#loadingUrl").html(a);
				}
				$("#loadingUrl").show();
			}
		},    
	    error : function(data) {  
	    	alert(data.status + " : " + data.statusText + " : " + data.responseText);    
	    }   
	});
	return false;
}