//var ftype = file.type; //如：image/jpeg、text/plain、application/msword、application/vnd.ms_excel、rar文件是空值
//if(ftype!=""&&ftype.substring(0,6)=="image/"){  //file.type.split("/")[1];
var attachFileFile=document.getElementById("attachFileFile");
if(attachFileFile){
	attachFileFile.onchange = function(){
		try{
			var file = this.files[0];
		    if(!!file){
		    	if(typeof FileReader != 'undefined'){    //判断浏览器是否支持
		    		if((file.type).indexOf("image/")!=-1){ //是图片才压缩处理
		    			var imgMasSize = 1024 * 1024 * 20; // 20MB
		    	        if(file.size > imgMasSize ) {
		    	        	alert("图片大小不能超过20MB！");
		    	        	return;
		    	        }
		    	        var imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
		    	        // 存储文件相关信息
		    	        var imgFile = {};
		    	        imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
		    	        imgFile.size = file.size;
		    	        imgFile.name = file.name;
		    	        var reader = new FileReader();
		    	        reader.onload = function(){
		    	        	var result = this.result;
		    	        	if(file.size < imgCompassMaxSize) {
		    	        		writeImgHtml(result,imgFile);// 图片不压缩
		    	            } else {
		    	                compressimg(result, imgFile);  // 图片压缩
		    	            }
		    	        }
		    	        reader.readAsDataURL(file);
		    		}
		    	}
		    }
	    }catch(e){
			alert("浏览器版本太低，不支持");
		}
	};
}
//使用canvas绘制图片并压缩
function compressimg (dataURL, imgFile) {
	var img = new window.Image();
    img.src = dataURL;
    img.onload = function () {
    	var canvas = document.createElement('canvas');
    	var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var compressnum=0.1; //值越大，压缩越多,604k--39.9k
        if(imgFile.size>=(1024*1024*1)){ 
        	compressnum=0.2; //4m--820k
        }
        if(imgFile.size>=(1024*1024*5)){ 
        	compressnum=0.3; //7m--88.6k
        }
        var compressedDataUrl = canvas.toDataURL(imgFile.type, compressnum);
     	// 判断是否是ios   if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
     	writeImgHtml(compressedDataUrl,imgFile);
    }
}
function writeImgHtml(dataUrl,imgFile){
	var html="<img src='"+dataUrl+"' name='"+imgFile.name+"' title='"+imgFile.type+"'/>";
	$("#cacheImgDiv").html(html);
}
function f_getAttachmentImgData(){
	var dataUrl=$("#cacheImgDiv").find("img").attr("src");
	var fname=$("#cacheImgDiv").find("img").attr("name");
	var ftype=$("#cacheImgDiv").find("img").attr("title");
	// 这里使用二进制方式处理dataUrl
    var binaryString = window.atob(dataUrl.split(',')[1]);
    var arrayBuffer = new ArrayBuffer(binaryString.length);
    var intArray = new Uint8Array(arrayBuffer);
    for (var i = 0, j = binaryString.length; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i);
    }
    var data = [intArray];
    var blob;
    try {
        blob = new Blob(data, { type: ftype });
    } catch (error) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (error.name === 'TypeError' && window.BlobBuilder){
        	var builder = new BlobBuilder();
            builder.append(arrayBuffer);
            blob = builder.getBlob(ftype);
        } else {
            throw new Error('版本过低，不支持上传图片');
        }
    }
    // blob 转file
    //var fileOfBlob = new File([blob], fname);
    //return fileOfBlob;
    var formData = new FormData();
    try{
    	var fileOfBlob = new File([blob], fname); //ie不支持
    	formData.append('fjFile', fileOfBlob);
    }catch(e){
    	formData.append('fjFile', blob,fname);
    }
    return formData;
}
function f_uploadAttachment(){
	var apppath=$('#apppath').val(); //得到应用名称，如：/inspyc
	try{
		var file = document.getElementById("attachFileFile").files[0];
		if(!!file){
			processingDialog(); //打开正在处理的框子
			var formData = new FormData();
			var cacheImgsrc="";
			if(file.type.indexOf("image")!=-1){ //是图片
				var cacheImgsrc1=$("#cacheImgDiv").find("img").attr("src");
				if(typeof cacheImgsrc1!="undefined"){ //压缩处理后的图片
					cacheImgsrc=cacheImgsrc1;
					formData=f_getAttachmentImgData();
					formData.append('compressFileType',file.type); //经过处理后的图片，文件类型变成了application/octet-stream
				}else{
					formData.append('fjFile', file);  //交后台压缩处理
				}
			}else{
				formData.append('fjFile', file);
			}
		    formData.append('fileTitle',$("#attachFileFileTitle").val());
		    formData.append('reTable', $("#attachFileReTable").val());
		    formData.append('reId', $("#attachFileReId").val());
		    $.ajax({ 
				type: "post",url: apppath+"/uploadFile/saveAttachment.do", 
				data: formData,dataType: "json",cache: false,
		        processData: false,//用于对data参数进行序列化处理 这里必须false 
		        contentType: false, //必须   
				success: function (data) { 
					//console.info(data);
					$("#processingDialog").remove(); //关闭正在处理的框
					if(data.status=="1"){
						var fpath = data.path.replace(/\\/g, "/");
						var fname=data.fileTitle;
						var imgsrc=apppath+"/resource/jhr/images/default-fj.jpg"; //文件的默认图片
						if(cacheImgsrc!=""){
							imgsrc=cacheImgsrc;
							if(fname==""){fname=$("#cacheImgDiv").find("img").attr("name");}
						}else{
							if(fname==""){fname=data.fileReName;}
						}
						var htms= "<div class='item--upload item--upload--compact' id='div_attachment_"+data.attachId+"'>";
						htms +=   "	<div class='item-check'>";
						htms +=   "		<input name='chbxAttachmentFile' type='checkbox' value='"+data.attachId+"'/>";
						htms +=   "	</div>";
						htms +=   "	<div class='item-content'>";
						htms +=   "	  <a href='javascript:void(0);' id='"+fpath+"' onclick='f_downAttachment(this.id);'>";
						htms +=   "		<img width='120' height='120' src='"+imgsrc+"'>";
						htms +=   "	  </a>";
						htms +=   "	</div>"; 
						htms +=   "	<div class='item-title'>";
						htms +=   "	  <a id='"+fpath+"' onclick='f_downAttachment(this.id);' href='javascript:void(0);'>"+fname+"</a>";
						htms +=   " </div>";
						htms +=   "</div>";
						$("#div_attachment_all").append(htms);
						$("#attachFileFile").val("");
						$("#attachFileFile").next(".input-file-value").html("");
						var deldiv = document.getElementById("div_attachment_del");
						if(deldiv.style.display=="none"){
							deldiv.style.display="";
						}
					}else{
						alert(data.message);
					}
				},    
			    error : function(data) { 
			    	$("#processingDialog").remove(); //关闭正在处理的框
			        alert(data.status + " : " + data.statusText + " : " + data.responseText);    
			    }   
			});
		}else{
			alert("请选择要上传的附件");
		}
	}catch(e){
		alert("浏览器版本太低，不支持");
	}
	return false;
}
function f_downAttachment(id){
	var path=$("#attachFileDownUrl").val()+id;
	path=path.replace(/\\/g,"\/"); //js斜杠(\)替换成(\\)，则需要这样写：replaceAll("\\\\","\\\\\\\\");
	window.open(path);
}
function f_deleteAttachment(){
	var apppath=$('#apppath').val();
	var cks = document.getElementsByName("chbxAttachmentFile");
	var objlist = new Array();
	for (var i = 0; i<cks.length;i++) {
		if(cks[i].checked==true){
			objlist.push(cks[i].value);
		}
	}
	var pks=objlist.join(',');
	if(pks!=""){
		$.ajax({  
			url: apppath+"/uploadFile/delAttachment.do?attachId="+pks,
			dataType: 'json',cache: false,  
			success:function(data){
				//alert(JSON.stringify(data)); 
				for(var i=0;i<objlist.length;i++){
					$('#div_attachment_'+objlist[i]).remove();
				}
				var cks1 = document.getElementsByName("chbxAttachmentFile");
				if(cks1.length==0){
					var deldiv = document.getElementById("div_attachment_del");
					if(deldiv.style.display==""){
						deldiv.style.display="none";
					}
				}
			}
		});
	}
	else{
		alert("请选择要删除的附件");
	}
} 
 
