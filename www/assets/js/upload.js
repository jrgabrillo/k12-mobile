var app = app || {};
(function(o){
	var ajax, getFormData, setProgress, setDefaultProgress;
	ajax = function(data){
		var xmlhttp = new XMLHttpRequest(), uploaded;
		xmlhttp.addEventListener('readystatechange', function(){
			if(this.readyState == 4){
				if(this.status == 200){
					uploaded = JSON.parse(this.response);
					if(typeof o.options.finished == 'function')
						o.options.finished(uploaded);
				}
				else{
					if(typeof o.options.error == 'function')
						o.options.error();
				}
			}
		})

		xmlhttp.upload.addEventListener('progress',function(event){
			var percent;
			if(event.lengthComputable == true){
				percent = Math.round((event.loaded / event.total) * 100);
				setProgress(percent);
				if(percent = '100%'){
                    //$("#pt").delay(1000).hide(200);
					$("#file").clear;
					$("#submit_UploadFile").addClass('disabled');
					//here
				}
			}
		})
		xmlhttp.open('post',o.options.processor);
		xmlhttp.send(data);
	};

	getFormData = function(source){
		var data = new FormData();
		for (var i=0;i<source.length;i++){
			data.append('file',source[i])
		}
		data.append('ajax',true);
		return data;
	};

	setProgress = function(value){
		if(o.options.progressText != undefined){
			//o.options.progressText.innerText = 'Uploading...';
		}
	};

	o.uploader = function(options){
		o.options = options;
		if(o.options.files != undefined)
			ajax(getFormData(o.options.files.files));
	};

}(app));
