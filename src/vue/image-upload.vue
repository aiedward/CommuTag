<template lang="html">
	<div class="image-upload">
		<img :src="imageData" v-show="showPreview">
		<input type="file" ref="uploadBt" hidden @change="UpdateFile">
	</div>
</template>

<script>

export default {
	name:"image-upload",
	props: {
		"maxResW":{type: Number,default: 1024},
		"maxResH":{type: Number,default: 1024},
		"showPreview": Boolean,
		"src": String
	},
	data: function () {
		return {
			file: null,
			imageData: null,
			url: "",
			additionData: {},
			OnSucc: null,
			OnFail: null,
			OnProgress: null,
			OnChange: null,
			maxW: 1024,
			maxH: 1024,
			uploading: false,
			exif: {}
		};
	},
	created: function(){
		if(this.src){
			this.imageData = this.src;
		}
		if(this.maxResW) this.maxW = this.maxResW;
		if(this.maxResH) this.maxH = this.maxResH;
	},
	methods: {
		SetMaxRes: function(maxW,maxH){
			this.maxW = maxW;
			this.maxH = maxH;
		},
		SelectFile: function(){
			var elem = this.$refs.uploadBt;
			elem.click();
		},
		UpdateFile: function(e){
			var files = e.target.files;
			if(FileReader && files && files.length) {
				var reader = new FileReader();
				reader.onload = function(){		//read file ready
					//convert dataUrl to arraybuffer
					function _base64ToArrayBuffer(base64) {
						var binary_string = atob(base64);
						var len = binary_string.length;
						var bytes = new Uint8Array(len);
						for (var i = 0; i < len; i++) {
							bytes[i] = binary_string.charCodeAt(i);
						}
						return bytes.buffer;
					}
					var data = _base64ToArrayBuffer(reader.result.split(",")[1]);
					var tags = ExifReader.load(data);
					this.exif = {};
					//console.log(tags);

					//get gps & time data from exif
					if(tags.GPSLatitude && tags.GPSLongitude){
						var lat = parseFloat(tags.GPSLatitude.description);
						var lng = parseFloat(tags.GPSLongitude.description);
						if(lat && lng){
							this.exif.lat = lat;
							this.exif.lng = lng;
						}
					}
					
					if(tags.DateTime){
						var t = tags.DateTime.description.split(" ");
						var d = t[0].replace(/:/g,"-");
						this.exif.time = d+" "+t[1];
					}
					//console.log(this.exif);

					var ShowImage = function(result){
						var img = new Image();
						img.onload = function(){	//image load ready
							this.FitCanvasFromImage(img);
							if(this.OnChange){
								this.OnChange();
							}
						}.bind(this);
						img.onerror = function(){
							if(this.OnFail){
								this.OnFail("Load File fail");
							}
						}.bind(this);
						img.src = result;
					}.bind(this);

					var ext = this.file.name.substr(this.file.name.length-5);
					if(ext.toLowerCase() == ".heic" && this.$q.platform.is.desktop){
						//console.log("convert heic to jpg");
						heic2any({
							blob: this.file,
							toType: "image/jpeg",
						}).then(function(result){
							var url = URL.createObjectURL(result);
							ShowImage(url);
						});
					}
					else{
						//console.log("show image");
						ShowImage(reader.result);
					}

				}.bind(this);
				this.file = files[0];
				this.$emit("loading");
				reader.readAsDataURL(files[0]);
			}
		},
		FitCanvasFromImage: function(image){
			var srcCanvas = document.createElement("canvas");
			srcCanvas.width = image.width;
			srcCanvas.height = image.height;
			var srcCtx = srcCanvas.getContext('2d');	
			srcCtx.save();
			srcCtx.drawImage(image,0,0);
			srcCtx.restore();

			var scaleW = this.maxW/image.width;
			var scaleH = this.maxH/image.height;
			var scale = Math.min(scaleW,scaleH);
			var w = image.width*scale;
			var h = image.height*scale;
			var dstCanvas = this.ResizeImage(srcCanvas,w,h);

			this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
		},
		FitCanvasFromCanvas: function(canvas){
			var scaleW = this.maxW/canvas.width;
			var scaleH = this.maxH/canvas.height;
			var scale = Math.min(scaleW,scaleH);
			var w = canvas.width*scale;
			var h = canvas.height*scale;
			var dstCanvas = this.ResizeImage(canvas,w,h);

			this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
		},
		CropImage: function(canvas,x,y,w,h){
			var dstCanvas = document.createElement("canvas");
			dstCanvas.width = w;
			dstCanvas.height = h;
			var dstCtx = dstCanvas.getContext('2d');	
			dstCtx.save();
			dstCtx.drawImage(canvas,x,y,w,h,0,0,w,h);
			dstCtx.restore();
			return dstCanvas;
		},
		ResizeImage: function(canvas,w,h){
			var resizeW = Math.max(canvas.width*0.5,w);
			var resizeH = Math.max(canvas.height*0.5,h);
			var srcCanvas = canvas;
			//每次降一半，減少鋸齒
			while(resizeW>w || resizeH>h){
				var dstCanvas = document.createElement("canvas");
				dstCanvas.width = resizeW;
				dstCanvas.height = resizeH;
				var dstCtx = dstCanvas.getContext('2d');	
				dstCtx.drawImage(srcCanvas,0,0,srcCanvas.width,srcCanvas.height,0,0,resizeW,resizeH);
				srcCanvas = dstCanvas;
				resizeW = Math.max(srcCanvas.width*0.5,w);
				resizeH = Math.max(srcCanvas.height*0.5,h);
			}
			//最終size
			var dstCanvas = document.createElement("canvas");
			dstCanvas.width = w;
			dstCanvas.height = h;
			var dstCtx = dstCanvas.getContext('2d');	
			dstCtx.drawImage(srcCanvas,0,0,srcCanvas.width,srcCanvas.height,0,0,w,h);
			return dstCanvas;
		},
		UploadImage: function(){
			if(this.uploading) return;

			this.uploading = true;
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var formData = new FormData();
			for(var key in this.additionData){
				formData.append(key,this.additionData[key]);
			}
			formData.append("uploadImage",this.imageData);
			$.ajax({
				url: this.url,
				headers: {"csrf-token":csrfToken},
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				xhr: function(){
					var xhr = $.ajaxSettings.xhr();
					if(xhr.upload && this.OnProgress){
						xhr.upload.addEventListener("progress",this.OnProgress, false);
					}
					return xhr;
				}.bind(this),
				success: function(result) {
					this.uploading = false;
					if(result.status != "ok"){
						switch(result.message){
							case "blacklist":
								return alert("黑名單使用者無此權限");
							default:
								return alert("上傳影像失敗");
						}
					}
					if(this.OnSucc){
						return this.OnSucc(result);
					}
				}.bind(this),
				error: function(jqXHR, textStatus, errorMessage){
					this.uploading = false;
					if(this.OnFail){
						return this.OnFail(errorMessage);
					}
				}.bind(this)
			});
		}
	}
}
</script>

<style lang="scss">
.image-upload{
	width: 100%;
	height: 100%;
	img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>