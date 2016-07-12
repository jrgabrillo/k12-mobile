var system = function () {
	"use strict";
	return {
		errorNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.error(message,title)
		},	
		successNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.success(message,title)
		},
        modalLarge: function(title, subtitle, body){
        	$("#modalLarge").modal('show');
        	$("#modalLarge .modal-title").html(title);
        	$("#modalLarge .font-bold").html(subtitle);
        	$("#modalLarge .modal-body").html(body);
        },
        close_modalLarge: function(){ 
        	$("#modalLarge").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
        },
        open_modal: function(title, content){
			$("#modal_bottomPopup").openModal();
			$("#modal_bottomPopup h5").html(title);
			$("#modal_bottomPopup .modal_subContent").html(content);
        },
        close_modal: function(){ 
			$("#modal_bottomPopup h5").html("");
			$("#modal_bottomPopup .modal_subContent").html("");
			$("#modal_bottomPopup").closeModal();
        },
        confim: function(title, callback) {
			swal({
		        title: title,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Confirm",
		        animation:false,
		        closeOnConfirm: false
		    }, 
		    function () {
				callback();
		    });		
		},
        searchJSON: function(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(this.searchJSON(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		},
        sortResults : function (data,prop, asc) {
            data = data.sort(function(a, b) {
                if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            });
            return data;
        },
		do_ajax: function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		computeAccount:function(data){
			var a = [], b = [], report, completion = 0;
			$.each(data[0],function(i,v){
				if(v != ""){
					a.push(v);
				}
				else{
					b.push(i);
				}
			});
			completion = Math.floor((a.length / data[0].length) * 100);
			report = [completion,a,b];
			return report;
		},
		send_mail:function(email,message){
			var ajax = this.do_ajax('../assets/harmony/Process.php?send-mail',[email,message]);
			ajax.success(function(data){
			});
		},
		StringCounter:function(input,id,allowed){
		    var a = allowed-input.length;
		    if(a >= 0 && a <= 1){
		        id.html(a+" character remaining");
		    }
		    else if(a == -1){
		        id.html(-1*a+" character exceeded");
		    }
		    else if(a <= -2){
		        id.html(-1*a+" characters exceeded");
		    }
		    else{
		        id.html(a+" characters remaining");
		    }
		},
		date:function(){
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss",
			    autoUpdate: true,
			    messages:{
				    second: "Just now",
				    seconds: "%s seconds %s",
				    minute: "A minute %s",
				    minutes: "%s minutes %s",
				    hour: "A hour %s",
				    hours: "%s hours %s",
				    day: "A day %s",
				    days: "%s days %s",
				    week: "A week %s",
				    weeks: "%s weeks %s",
				    month: "A month %s",
				    months: "%s months %s",
				    year: "A year %s",
				    years: "%s years %s",
				    yesterday: "Yesterday",
				    beforeYesterday: "2 days ago",
				    tomorrow: "Tomorrow",
				    afterTomorrow: "The next day"
				}
			});
		},
		do_upload:function(url,fallback_success,fallback_error){
            var f = document.getElementById('file'),
                pb = document.getElementById('pb'),
                pt = document.getElementById('pt');
            app.uploader({
                files: f,
                progressBar: pb,
                progressText: pt,
                processor: url,
                finished: function(data){
                    var uploads = document.getElementById('uploads'),
                        succeeded = document.createElement('div'),
                        failed = document.createElement('div'),
                        anchor,
                        span,
                        x,string;
                        uploads.innerText = '';
                        
                        if(data.succeeded.length > 0){
                            fallback_success(data.succeeded);                        	
                        }
                        if(data.failed.length > 0){
                            fallback_error(data.failed);
                        }
                },
            });
		},
		truncate: function(string, length, delimiter) {
		   delimiter = delimiter || "&hellip;";
		   return string.length > length ? string.substr(0, length) + delimiter : string;
		},
		get_apr:function(image){
			var ajax = system.do_ajax('../assets/img/'+image,'');
			return ajax.responseText;
		},
		get_aprhome:function(image){
			var ajax = system.do_ajax(image,'');
			return ajax.responseText;
		},
		get_ajax: function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		loader: function(_switch){
			if(_switch){
				$(".progress").removeClass("hide-on-med-and-up hide-on-med-and-down");
			}
			else{
				$(".progress").addClass("hide-on-med-and-up hide-on-med-and-down");
			}
		},
		getRealNumber:function(val){
        	return ($.isNumeric(val)) ? val : 0;
		},
		preloader:function(margintop){
			return "<div class='col s12 center' style='margin-top:"+margintop+"px'>"+
					"	<div class='preloader-wrapper small active'>"+
					"		<div class='spinner-layer spinner-blue'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-red'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-yellow'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"		<div class='spinner-layer spinner-green'>"+
					"			<div class='circle-clipper left'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='gap-patch'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"			<div class='circle-clipper right'>"+
					"				<div class='circle'></div>"+
					"			</div>"+
					"		</div>"+
					"	</div>"+
					"</div>";
		},
		block:function(status){
			if(status){
				$("#block-control").addClass('block-content')
			}
			else{
				$("#block-control").removeClass('block-content')
			}
		}
    };
}();

var validation = function () {
	"use strict";
	return {
		email: function(email){
			var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		    if (filter.test(email)) {
		        return true;
		    }
		    else {
		        return false;
		    }
	    },
		validate_form:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				var inputtype = $("input[name='"+v['name']+"']").data('inputtype');
				if(typeof inputtype != 'undefined'){
					if(inputtype == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}							
					}
				}
			});
			return [flag,fields];
		},
		validate:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				if(typeof $("input[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("input[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else if(typeof $("textarea[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("textarea[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("textarea[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("textarea[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("textarea[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else{
					//console.log('x');
				}
			});
			return [flag,fields];
		}
    };
}();

var ini = function () {
	"use strict";
	return {
		installDatabase:function(){
			var data = system.get_ajax('assets/harmony/Process.php?get-yearlevel',"");
			data.success(function(data){
			});
		},
		checkConnection:function(){
			var data = system.get_ajax('assets/harmony/Process.php?chkConnection',"");
			data.success(function(data){
				if(data != 1){ 
					// not connected
					console.log("not connected");
				}
				else{
					console.log($("#display_schoolDetails"));
					console.log("connected");
					$("#display_schoolDetails").removeClass("hidden");
					$("#display_connectionError").addClass("hidden");
				}
			});
		},
		ini:function(){
			ini.checkConnection();
			_process.autoConnect();
            _process.checkSchoolDetails();
            _process.logIn();
		},
    };
}();

var _process = function () {
	"use strict";
	return {		
		autoConnect:function(){
			$("a[data-cmd='dbConnect']").click(function(){
				system.loader(true);
				Materialize.toast('Creating database. Do not interupt.',2000,'',function(){
					var data = system.get_ajax('assets/harmony/Process.php?createDB',"");
					data.success(function(data){
						if(data == 1){
							Materialize.toast('Database created.',5000,'',function(){
								Materialize.toast('Adding tables.',5000,'',function(){
									var data = system.get_ajax('assets/harmony/Process.php?createTables',"");
									data.success(function(data){
										console.log(data);
										if(data != 0){
											system.loader(false);
											Materialize.toast('Connected. You will be redirected.',4000,'',function(){
												window.location.href = '../k12';
											});
										}
										else{
											console.log(data);
											Materialize.toast('Cannot process auto-connect.',4000);
										}
									});									
								});
							});
						}
						else{
							console.log(data);
							Materialize.toast('Cannot process auto-connect.',4000);
						}
					});					
				});
			})
		},
		checkSchoolDetails:function(){
			var data = system.get_ajax('assets/harmony/Process.php?checkSchoolDetails',"");
			data.success(function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.length > 0){
					console.log('with school data. show school data');
					$("#display_schoolDetails").removeClass("hidden");
				}
				else{
					console.log('log in');
				}
			});
		},
		logIn:function(){
			$("a[data-cmd='login']").click(function(){
				var data = $(".login-form").serializeArray();
				var data = system.get_ajax('assets/harmony/Process.php?login',data);
				data.success(function(data){
					if(data != 0){
						Materialize.toast('Login success. You will be redirected.',2000,'',function(){
					    	$(location).attr('href','account/');
						});
					}
					else{
						// failed login
						Materialize.toast('Login failed',2000,'',function(){
					    	// $(location).attr('href','account/');
						});
					}
				});
			});
		},
    };
}();

var mobile = function(){
    "use strict";
    return {
    	ini:function(){
            $(window).load(function() {
                window.loaded = true;
            });
    	},
    	get_IP:function(){
            $("#form_getIP").validate({
                rules: {
                    field_ipAddress: {required: true,ipv4: true}
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if(placement){$(placement).append(error)} 
                    else{error.insertAfter(element);}
                },
                submitHandler: function (form) {
                    var form = $(form).serializeArray();
					var ajax = system.do_ajax('http://'+form[0]['value']+'/test.file','');
					if(ajax.responseText == 'granted'){
				        localStorage.setItem('nice-ip',form[0]['value']);
			            Materialize.toast('Success',1000,'',function(){
			                $('#display_getIP').slideUp(100);
			            });
					}
					else{
			            Materialize.toast('Unknown IP Address',1000,'',function(){
			            });
					}
                }
            }); 
    	},
    	login:function(){
	        var nice_ip = localStorage.getItem('nice-ip');
            $("#form_login").validate({
                rules: {
                    field_loginUsername: {required: true},
                    field_loginPassword: {required: true}
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if(placement){$(placement).append(error)} 
                    else{error.insertAfter(element);}
                },
                submitHandler: function (form) {
                    var form = $(form).serializeArray();
                    console.log(form);

					var data = system.get_ajax('http://'+nice_ip+'/github-personal/k12/k12-web/assets/harmony/Process.php?login',form);
					data.success(function(data){
						if(data != 0){
							Materialize.toast('Login success',2000,'',function(){
						    	$(location).attr('href','account/#cmd=index;content=schoolInfo');
							});
						}
						else{
							Materialize.toast('Login failed',2000,'',function(){
							});
						}
					});

                }
            });
    	},
    };
}();

var grade = function () {
    "use strict";
    return {
        table: function(){
			return {
				"grades": [
					{"min":0,"max":3.99,"value":60},
					{"min":4.00,"max":7.99,"value":61},
					{"min":8.00,"max":11.99,"value":62},
					{"min":12.00,"max":15.99,"value":63},
					{"min":16.00,"max":19.99,"value":64},
					{"min":20.00,"max":23.99,"value":65},
					{"min":24.00,"max":27.99,"value":66},
					{"min":28.00,"max":31.99,"value":67},
					{"min":32.00,"max":35.99,"value":68},
					{"min":36.00,"max":39.99,"value":69},
					{"min":40.00,"max":43.99,"value":70},
					{"min":44.00,"max":47.99,"value":71},
					{"min":48.00,"max":51.99,"value":72},
					{"min":52.00,"max":55.99,"value":73},
					{"min":56.00,"max":59.99,"value":74},
					{"min":60.00,"max":61.59,"value":75},
					{"min":61.60,"max":63.19,"value":76},
					{"min":63.20,"max":64.79,"value":77},
					{"min":64.80,"max":66.39,"value":78},
					{"min":66.40,"max":67.99,"value":79},
					{"min":68.00,"max":69.59,"value":80},
					{"min":69.60,"max":71.19,"value":81},
					{"min":71.20,"max":72.79,"value":82},
					{"min":72.80,"max":74.39,"value":83},
					{"min":74.40,"max":75.99,"value":84},
					{"min":76.00,"max":77.59,"value":85},
					{"min":77.60,"max":79.19,"value":86},
					{"min":79.20,"max":80.79,"value":87},
					{"min":80.80,"max":82.39,"value":88},
					{"min":82.40,"max":83.99,"value":89},
					{"min":84.00,"max":85.59,"value":90},
					{"min":85.60,"max":87.19,"value":91},
					{"min":87.20,"max":88.79,"value":92},
					{"min":88.80,"max":90.39,"value":93},
					{"min":90.40,"max":91.99,"value":94},
					{"min":92.00,"max":93.59,"value":95},
					{"min":93.60,"max":95.19,"value":96},
					{"min":95.20,"max":96.79,"value":97},
					{"min":96.80,"max":98.39,"value":98},
					{"min":98.40,"max":99.99,"value":99},
					{"min":100,"max":100,"value":100}
				]
			}
        },
        search:function(search,grade){
        	var data = [];
        	search = Number(search);
        	$.each(grade['grades'],function(i,v){
        		if((Number(v['min'])<=search) && (Number(v['max'])>=search)){
        			data.push(v);
        			return false;
        		}
        	});
        	return data;
        }
    };
}();