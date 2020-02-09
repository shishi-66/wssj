var inspSampPicFile=document.getElementById("inspSampPicFile");
if(inspSampPicFile){
	inspSampPicFile.onchange = function(){
		try{
			var file = this.files[0];
		    if(!!file){
		    	if(typeof FileReader != 'undefined'){    //判断浏览器是否支持
		    		if((file.type).indexOf("image/")==-1){  
		        		alert("请上传图片文件!");  
		        		this.value="";
		         	}else{
		         		var imgMasSize = 1024 * 1024 * 10; // 10MB
		                if(file.size > imgMasSize ) {
		                	alert("图片大小不能超过10MB！");
		                	return;
		                }
		                var imgCompassMaxSize = 300 * 1024; // 超过 300k 就压缩
		                // 存储文件相关信息
		                var imgFile = {};
		                imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
		                imgFile.size = file.size;
		                imgFile.name = file.name;
		                var reader = new FileReader();
		                reader.onload = function(){
		                	var result = this.result;
		                	if(file.size < imgCompassMaxSize) {
		                		writeSampPicHtml(result,imgFile);// 图片不压缩
		                    } else {
		                        compressSampPic(result, imgFile);  // 图片压缩
		                    }
		                }
		                reader.readAsDataURL(file);
		         	}
		    	}else{  
		        	var fileName=this.value;  
		            var suffixIndex=fileName.lastIndexOf(".");  
		            var suffix=fileName.substring(suffixIndex+1).toUpperCase();  
		            if(suffix!="BMP"&&suffix!="JPG"&&suffix!="JPEG"&&suffix!="PNG"&&suffix!="GIF"){  
		            	alert("请上传图片文件！");  
		        		this.value="";
		            }  
		    	}
		    }
		}catch(e){
			alert("浏览器版本太低，不支持");
		}
	};
}
//使用canvas绘制图片并压缩
function compressSampPic (dataURL, imgFile) {
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
        if(imgFile.size>=(1024*1024*4)){ 
        	compressnum=0.3; //7m--88.6k
        }
        var compressedDataUrl = canvas.toDataURL(imgFile.type, compressnum);
     	// 判断是否是ios   if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        writeSampPicHtml(compressedDataUrl,imgFile);
    }
}
function writeSampPicHtml(dataUrl,imgFile){
	var html="<img src='"+dataUrl+"' name='"+imgFile.name+"' title='"+imgFile.type+"'/>";
	$("#cacheSampPicDiv").html(html);
}
function f_getSmapPicData(){
	var dataUrl=$("#cacheSampPicDiv").find("img").attr("src");
	var fname=$("#cacheSampPicDiv").find("img").attr("name");
	var ftype=$("#cacheSampPicDiv").find("img").attr("title");
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
    var fileOfBlob = new File([blob], fname);
    return fileOfBlob;
}
function f_uploadSampPic(){
	var apppath=$("#apppath").val();
	try {
		var file = document.getElementById("inspSampPicFile").files[0];
		if(!!file){
			var formData = new FormData();
			var cacheImgsrc=$("#cacheSampPicDiv").find("img").attr("src");
			if(typeof cacheImgsrc!="undefined"){ //压缩处理后的图片
				formData.append('picFile', f_getSmapPicData());
			}else{
				formData.append('picFile', file);  //交后台压缩处理
			}
		    formData.append('picindex',$("#inspSampPicIndex").val());
		    formData.append('sampid', $("#inspSampId").val());
		    $.ajax({ 
				type: "post",url: apppath+"/uploadFile/saveSampPic.do", 
				data: formData,dataType: "json",cache: false,
		        processData: false,//用于对data参数进行序列化处理 这里必须false 
		        contentType: false, //必须   
				success: function (data) { 
					//console.info(data);
					if(data.status=="1"){
						var fpath = data.path.replace(/\\/g, "/");
						var imgcachesrc=$("#cacheSampPicDiv").find("img").attr("src");
						if(typeof cacheImgsrc=="undefined"){ //没有压缩处理的图片
							cacheImgsrc=$("#apppath").val()+$("#inspSampPicDownUrl").val()+data.path;
							cacheImgsrc=cacheImgsrc.replace(/\\/g,"\/");
						}
						var htms= "<div class='item--upload item--upload--pic' id='div_samppic_"+data.fileId+"'>";
						htms +=   "	<div class='item-check'>";
						htms +=   "		<input name='chbxSampPicFile' type='checkbox' value='"+data.fileId+"'/>";
						htms +=   "	</div>";
						htms +=   "	<div class='item-content'>";
						htms +=   "	  <a id='"+fpath+"' onclick='f_downSampPic(this.id);' href='javascript:void(0);' >";
						htms +=   "		<img width='200' height='200' src='"+cacheImgsrc+"' >";
						htms +=   "	  </a>"; 
						htms +=   "	</div>";
						htms +=   "</div>";
						$("#div_samppic_all").append(htms);
						$("#inspSampPicFile").val("");
						$("#inspSampPicFile").next(".input-file-value").html("");
						var deldiv = document.getElementById("div_samppic_del");
						if(deldiv.style.display=="none"){
							deldiv.style.display="";
						}
					}else{
						alert(data.message);
					}
				},    
			    error : function(data) { 
			        alert(data.status + " : " + data.statusText + " : " + data.responseText);    
			    }   
			});
		}else{
			alert("请选择要上传的图片");
		}
	}catch(e){
		alert("浏览器版本太低，不支持");
	}
	return false;
} 
function f_downSampPic(id){
	var path=$("#apppath").val()+$("#inspSampPicDownUrl").val()+id;
	path=path.replace(/\\/g,"\/"); //js斜杠(\)替换成(\\)，则需要这样写：replaceAll("\\\\","\\\\\\\\");
	window.open(path);
} 
function f_deleteSampPic(){
	var cks = document.getElementsByName("chbxSampPicFile");
	var objlist = new Array();
	for (var i = 0; i<cks.length;i++) {
		if(cks[i].checked==true){
			objlist.push(cks[i].value);
		}
	}
	var pks=objlist.join(',');
	if(pks!=""){
		$.ajax({  
			url: $("#apppath").val()+"/uploadFile/delSampPic.do?id="+pks,
			dataType: 'json', cache: false,  
			success:function(data){
				//alert(JSON.stringify(data)); 
				for(var i=0;i<objlist.length;i++){
					$('#div_samppic_'+objlist[i]).remove();
				}
				var cks1 = document.getElementsByName("chbxSampPicFile");
				if(cks1.length==0){
					var deldiv = document.getElementById("div_samppic_del");
					if(deldiv.style.display==""){
						deldiv.style.display="none";
					}
				}
			}
		});
	}
	else{
		alert("请选择要删除的图片");
	}
	
} 
