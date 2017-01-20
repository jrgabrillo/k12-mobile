// do not delete
console.log('%cDeveloped By: Rufo N. Gabrillo Jr. (2016)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.k12 = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
	var app = new Framework7({material: true});			 
	var $$ = Dom7;
	var processor = 'k12/assets/harmony/Process.php';
	var directory = 'k12/';

	var swiper = app.swiper('.swiper-container', {
	    speed: 400,
	    spaceBetween: 100,
	    direction: 'vertical'
	}); 

    // System functions - general usage
		var notification = function(title,message,button,timeout,loader,_functionOpen,_functionClose){
		    if(loader == true){
		        preloader(true);
		        block(true);
		    }

			var timeout = (timeout == "")?false:timeout;
		    app.addNotification({
		        title: title,
		        message: message,
		        button:button,
		        onClose:function(){
				    if(_functionClose != false){
			        	_functionClose();
				    }
		        }
		    });

		    if(timeout != false){
			    setTimeout(function(){
				    if(loader == true){
				        preloader(false);
				        block(false);
				    }
			    	app.closeNotification(".notification-item");
			    },timeout);
		    }
		    if(_functionOpen != false){
			    _functionOpen();		    	
		    }
		};
		var popover = function(title,message){
			var mainView = app.addView('.view-main');			 
		    app.addNotification({
		        title: title,
		        message: message
		    });
		};		
		var do_ajax = function(url,data){
	        return $$.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		};
		var get_apr = function(source){
			var ajax = do_ajax(source,'');
			return ajax.responseText;
		};
		var get_ajax = function(url,data,_error){
			var ret = "";
	        return $$.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        error: function(e) {
		        	_error();
		        	console.log(e);
		            console.log("Error occured")
		        },
		        success:function(e){
		        	console.log(e);
		        	return e;
		        },
		        beforeSend:function(e){
		        	console.log(e.status);
		        },
		        complete:function(e){
		        	console.log(e);
		        }
		    });
		};
		var request = function(url,data,_error){
			var ret = "";
		 	try{
		        $$.ajax({
			        type: "POST",
			        url: url,
			        data: {data: data},
			        async: !1,
			        beforeSend:function(e){
			        	ret = e.status;
			        	console.log(e);
			        },
			        complete:function(e){
			        	ret = e.status;
			        	console.log(e);
			        },
			        success:function(e){
			        	ret = e.status;
			        }
			    });
		 	}
		 	catch(e){
	        	ret = 0;
		 	}
		 	return ret;
		};
		var getRealNumber = function(val){
	    	return ($.isNumeric(val)) ? val : 0;
		};
		var preloader = function(status){
			if(status){
			    var container = $$('body');
			    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
			    app.showProgressbar(container, 'multi');
			}
			else{
		        app.hideProgressbar();				
			}
		};
		var block = function(status){
			if(status){
		        app.popup('.loader');
			}
			else{
		        app.closeModal('.loader');
			}
		};
		var logoHandler = function(){
			var bg = 'img/img-bg.jpg';
			var logo = 'img/logo.png';
			bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
			logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

			$("img[src='img/logo.png']").attr({'src':logo});
			$(".panel .panel-bg").attr({'style':'background-image:url('+bg+');'});
		}
		var getDeviceSize = function(){
			var device = window;
			return window.innerWidth;
		}
	// end general usage

	// Getting the IP Address
		var ini_getIP = function(){
			swiper.lockSwipes();
			logoHandler();
	        var data = localStorage.getItem('saved-ip');
			data = ((data == "") || (data == null))?false:data;

			if(data == false){
		        getIP();
				$$('a[data-popup=".ip-help"]').on('click', function () {
					var _this = this;
					$$(_this).addClass('disabled');
					var content =   "<div class='content-block'>"+
										"    <h1>IP Address (Internet Protocol)</h1>"+
										"    <p class=''>This number is an exclusive number all information technology devices (printers, routers, modems, et al) use which identifies and allows them the ability to communicate with each other on a computer network.</p>"+
										"    <p class=''><a class='close-notification button  button-fill color-gray ripple-white'>Close</a></p>"+
										"</div>";

					app.popover(content, this);
					notification('k12',content,false,"",false,
						function(){
							$$(".modal-overlay").removeClass('modal-overlay-visible');
							$$(".modal-overlay").addClass('modal-overlay-invisible');
						},
						function() {
							$$(_this).removeClass('disabled');
						}
					);
				});
			}
			else{
				notification("k12","Accessing saved IP Address.",false,5000,true,function(){
	                setTimeout(function(){
	                    access_getIP(data);                    	
	                }, 1000);
				},false);
			}	        
		};
		var getIP = function(){
			var _this = this;
			$$('a[data-cmd="getIP"]').on('click',function(){
				$$(this).addClass('disabled');
				var form = app.formToJSON('#form_getIP');
	            if(form['field_rememberIPAddress'].length == 1){
			        localStorage.setItem('saved-ip',form['field_ipAddress']);
	            }
	            else{
			        localStorage.setItem('saved-ip',"");
	            }
	            access_getIP(form['field_ipAddress']);
			});
		};
		var access_getIP = function(ip){
			var ajax = request('http://'+ip+'/k12/test.file','');
			if(ajax == 200){
				console.log(ajax);
				notification("k12","Access granted",false,2000,true,function(){
					localStorage.setItem('nice-ip',ip);
					swiper.removeSlide(0);
					getSchoolInfo();
					ini_login();
				},false);
			}
			else{
				$$('a[data-cmd="getIP"]').removeClass('disabled');
				notification("k12","Unknown Server.",false,2000,true,false,false);
			}
		};
		var getSchoolInfo = function(){
			var nice_ip = localStorage.getItem('nice-ip');
			var ajax = do_ajax('http://'+nice_ip+'/'+processor+'?get-schoolInfo',"");
			var data = JSON.parse(ajax.responseText);
			data = JSON.parse(data[0][7]);
			var bg = data[1], logo = data[0];

			var _bg = bg.split('.');
			if(_bg[1] != 'apr')
				bg = 'img/img-bg.jpg';
			else
				bg = get_apr('http://'+nice_ip+'/'+directory+'assets/img/'+bg);

			var _logo = logo.split('.');
			if(_logo[1] != 'apr')
				logo = 'img/logo.jpg';
			else
				logo = get_apr('http://'+nice_ip+'/'+directory+'assets/img/'+logo);

			localStorage.setItem('bg',bg);
			localStorage.setItem('logo',logo);
			localStorage.setItem('schoolInfo',ajax.responseText);
		};
	// end getting the IP Address

	// Getting the log in details
		var ini_login = function(){
			swiper.lockSwipes();
			logoHandler();
	        var data = localStorage.getItem('saved-login');
			data = ((data == "") || (data == null))?false:data;

			if(data != false){
				notification("k12","Retrieving saved username and password.",false,5000,true,function(){
                    setTimeout(function(){
		            	access_login(data);
                    }, 1000);
				},false);
			}
			else{
		        login();
			}
		};
    	var login = function(){
            var _this = this;
			$$('a[data-cmd="checkIP"]').on('click',function(){
				$$(this).addClass('disabled');
				var form = app.formToJSON('#form_login');
                var field = JSON.stringify([{'name':'field_username','value':form['field_username']},{'name':'field_password','value':form['field_password']}]);
	            if(form['field_rememberLogin'].length == 1){
			        localStorage.setItem('saved-login',field);
                }
                else{
			        localStorage.setItem('saved-login',"");
                }
                access_login(field);
			});
    	};
		var access_login = function(form){
			try{
				var data = JSON.parse(form);
				var nice_ip = localStorage.getItem('nice-ip');
				var ajax = do_ajax('http://'+nice_ip+'/'+processor+'?login',data);
				localStorage.setItem('user-details',ajax.responseText);
				if(ajax.responseText != 0){
					notification("k12","Success",false,2000,true,function(){
						content();
					},false);					
				}
				else{
					$$('a[data-cmd="checkIP"]').removeClass('disabled');
					notification("k12","Failed",false,2000,true,false,false);
			        login();
				}
			}
			catch(e){
				notification("k12","Failed",false,2000,true,false,false);
		        login();
			}
		}
	// end getting the log in details

	// main processes
    	var ini_mainProcess = function(){
    		logoHandler();
			var app = new Framework7({material: true});
	        getIP.ini();
    	};
    	var forgetIP = function(){
    		$$("a[data-cmd='forget-ip']").on('click',function(){
    			localStorage.removeItem('saved-ip','');
    			localStorage.removeItem('nice-ip','');
    			window.location.reload();
    		})
    	};
    	var logout = function(){
    		$$("a[data-cmd='account-logout']").on('click',function(){
    			localStorage.removeItem('saved-login','');
    			localStorage.removeItem('user-details','');
    			window.location.reload();
    		})
    	};
    	var welcomeScreen = function(){
    		$$("a[data-cmd='WelcomeScreen']").on('click',function(){
    			localStorage.clear();
    			window.location.reload();
    		})
    	};
    	var content = function(){
			var content = do_ajax('templates/admin/index.html','');
			$$('div[data-node="page-initialization"]').html(content.responseText);
			content = do_ajax('templates/admin/home.html','');
			innerContent(content.responseText);
    		logoHandler();
			forgetIP();
			logout();
			welcomeScreen();
			account();
    	};
    	var innerContent = function(content){
			$$('#display-content').html(content);    		
    	};
    	var account = function(){
			var nice_ip = localStorage.getItem('nice-ip');
    		var source = 'k12//assets/img/';
    		var data = localStorage.getItem('user-details');
    		data = JSON.parse(data);

    		var img = get_apr('http://'+nice_ip+'/'+source+'/'+data[0][4]);

    		$$("div.panel div.primary img").attr({src:img});
    		$$("div.panel div[data-node='display-name']").html(data[0][1]);

    		grading();
    		home();
    	};
    	var grading = function(){
    		gradingSheet();
    		summaryGrades();
    	};
    	var gradingSheet = function(){
    		$$("a[data-cmd='display-gradingSheet']").on('click',function(){
				var content = do_ajax('templates/admin/options_gradeSheet.html','');
				innerContent(content.responseText);
				_gradingSheet();
    		});
    	};
    	var summaryGrades = function(){
    		$$("a[data-cmd='display-summaryGrading']").on('click',function(){
				var content = do_ajax('templates/admin/grade-summary.html','');
				innerContent(content.responseText);
				list_summaryGrade();
    		});
    	};
    	var home = function(){
    		$$("a[data-cmd='display-home']").on('click',function(){
				var content = do_ajax('templates/admin/home.html','');
				innerContent(content.responseText);
	    		logoHandler();
    		});
    	};
    	var getUserDetails = function(){
    		var data = localStorage.getItem('user-details');
    		return JSON.parse(data);
    	};
	// end main processes

	// main grading process
		var controls_gradingSheet = function(){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-assoc-yearLevel',"");
			var data = JSON.parse(data.responseText);
			var options = "<option disabled='' selected>Choose year level</option>";
			$$.each(data,function(i,v){
				if(v[1].length>0){
					options += "<option value='"+v[0]['title']+"'>"+v[0]['title']+"</option>";
				}
			})
			$$("#field_year").html(options);

			$$("#field_year").change(function(){
				var selected = $$("#field_year").val(), options = '';
				var options = "<option disabled='' selected>Choose section</option>";
				$$.each(data[selected][1],function(i,v){
					options += "<option value='"+v['section']+"'>"+v['section']+"</option>";
				});

				$$("#field_subject").attr({"disabled":true});
				$$("#field_subject").html("<option disabled='' selected>Choose subject</option>");
				$$("#display_sublevelsubject").addClass('hidden');

				$$("#field_section").removeAttr('disabled');
				$$("#field_section").html(options);
			});

			$$("#field_section").change(function(){
				var selected = $$("#field_year").val(), options = '';
				var options = "<option disabled='' selected>Choose subject</option>";
				$$.each(data[selected][2],function(i,v){
					var sub_data = JSON.parse(v['subject_title']);
					options += "<option value='"+sub_data[0]+"'>"+sub_data[0]+"</option>";
				});

				$$("#field_subject").removeAttr('disabled');
				$$("#field_subject").html(options);
			});

			$$("#field_subject").change(function(){
				var selected = $("#field_year").val(), subject = $(this).val(), options = '';
				var options = "<option disabled='' selected>Choose subject</option>";
				$$.each(data[selected][2],function(i,v){
					var sub_data = JSON.parse(v['subject_title']);
					if(sub_data[0] == subject){
						$$("#display_sublevelsubject").removeClass('hidden');
						if(sub_data.length<=1){
							$$("#display_sublevelsubject").addClass('hidden');
						}
						for(var x=1;x<sub_data.length;x++){
							options += "<option value='"+sub_data[x][0]+"'>"+sub_data[x][0]+"</option>";
						}
					}
				});

				$$("#field_subsubject").removeAttr('disabled');
				$$("#field_subsubject").html(options);
			});
		};
		var _gradingSheet = function(){
			controls_gradingSheet();
			var id = getUserDetails();
			// console.log(id[0][0]);
			$$('a[data-cmd="submit-form"]').on('click',function(){
				$$(this).addClass('disabled');
				var form = app.formToJSON('#form_gradesheet');
                var fields = JSON.stringify([{},{'name':'field_year','value':form['field_year']},{'name':'field_section','value':form['field_section']},{'name':'field_subject','value':form['field_subject']}]);
				localStorage.setItem('controls_gradingSheet',fields);
				get_grade(fields,id[0][0]);
				get_student(fields,id[0][0]);
		  		get_subjectDetails(fields,id[0][0]);
				var content = do_ajax('templates/admin/grading-sheet.html','');
				innerContent(content.responseText);
				list_gradingSheet();
			});
		};
		var get_grade = function(controls,id){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-grade',[controls,id]);
			localStorage.setItem("grades_gradeSheetQuarter",data.responseText);
		};
		var get_student = function(controls,id){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-studentsGradeSheet',controls);
	        localStorage.setItem('students_gradingSheet',data.responseText);
		};
		var get_subjectDetails = function(controls,id){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-subjectDetails',controls);
	        localStorage.setItem('subject_gradingSheet',data.responseText);
		};	
		var list_gradingSheet = function(){	
			$$('a[data-cmd="submit-form"]').removeClass('disabled');
	        var data_controls = JSON.parse(localStorage.getItem('controls_gradingSheet'));
	        var data_grades = JSON.parse(localStorage.getItem('grades_gradeSheet'));
	        var data_gradesAll = JSON.parse(localStorage.getItem('grades_gradeSheetQuarter'));
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var data_subject = JSON.parse(localStorage.getItem('subject_gradingSheet'));
	        var content = "",_content = "", content_finalGrade = "";
	        data_subject = JSON.parse(data_subject[0][6]);

    		var components = ['Written Works','Performance Task','Quarterly Assessment'];
			var colors = ['teal lighten-5','green lighten-5','blue lighten-5'];
			var ps = 100;
			var ws = [data_subject[1],data_subject[0],data_subject[2]];

			var allContent = "",tabs = "",tabContent = "", initialGrade = 0, finalGrade = [], finalGrade_student = [], totalGrade = 0;
	        $$.each(data_gradesAll,function(index_grade,value_grade){
	        	var content = "" ; 
				var sub_tabContent = "", sub_content = "", grades = "", headers = "";
				$$.each(data_students,function(index_genderInner,value_genderInner){
					var sub_columnContent = "", sub_headers = "", highScore = "",summaryTabContent = "";
					initialGrade = 0;
					$$.each(value_grade,function(index_grade2,value_grade2){
						var totalScore = 0, totalHighScore = 0;
						if(value_grade2.length>0){
							$$.each(value_grade2,function(index_grade3,value_grade3){
								grades = JSON.parse(value_grade3[2]);
								var search = JSON.search(grades, '//*[id="'+value_genderInner[1]['student_id']+'"]/score');
								sub_headers += "<td class='"+colors[index_grade2]+"'>#"+(index_grade3+1)+"</td>";
								highScore += "<td class='"+colors[index_grade2]+"'>"+value_grade3[1]+"</td>";
								sub_columnContent += "<td class='"+colors[index_grade2]+"'>"+search+"</td>";
								totalScore = totalScore + Number(search);
								totalHighScore = totalHighScore + Number(value_grade3[1]);
							});
						}
						else{
							sub_headers += "";
							highScore += "";
							sub_columnContent += "";
							totalScore = 0;
							totalHighScore = 0;
						}
						var calc = [getRealNumber(((totalScore/totalHighScore)*100)),getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
						initialGrade = initialGrade + getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));	

						sub_headers += "<td class='"+colors[index_grade2]+" center-align'>Total</td><td class='"+colors[index_grade2]+" center-align'>PS</td><td class='"+colors[index_grade2]+" center-align'>WS</td>";
						highScore += "<td class='"+colors[index_grade2]+" center-align'>"+totalHighScore+"</td><td class='"+colors[index_grade2]+" center-align'>"+ps+"</td><td class='"+colors[index_grade2]+" center-align red-text'>"+ws[index_grade2]+"%</td>";
						sub_columnContent += "<td class='"+colors[index_grade2]+" center-align'>"+totalScore+"</td>"+
										"<td class='"+colors[index_grade2]+" center-align'>"+parseFloat(calc[0]).toFixed(2)+"</td>"+
										"<td class='"+colors[index_grade2]+" center-align red-text'>"+parseFloat(calc[1]).toFixed(2)+"</td>";
					});
					finalGrade.push({student_id:value_genderInner[1]['student_id'],quarter:index_grade,score:_search(parseFloat(initialGrade).toFixed(2),_table())[0]['value']});

					headers =   "<tr>"+
								"	<th class=' center-align' colspan='2'></th>"+
									sub_headers+
								"</tr>"+
								"<tr>"+
								"	<th class=' center-align'>Name of Learners</th><th></th>"+
									highScore+
								"	<th class=' blue lighten-3 center-align'>"+ps+"</th>"+
								"	<th class=' blue lighten-2 center-align'>"+ps+"</th>"+
								"</tr>";
					sub_content +=  "<tr>"+
									"	<td>"+value_genderInner[1]['family_name']+" "+value_genderInner[1]['given_name']+"</td><td>"+value_genderInner[1]['gender']+"</td>"+
										sub_columnContent+
									"	<td class=' center-align blue lighten-3'>"+parseFloat(initialGrade).toFixed(2)+"</td>"+
									"	<td class=' center-align blue lighten-2'>"+_search(parseFloat(initialGrade).toFixed(2),_table())[0]['value']+"</td>"+
									"</tr>";
				});

				tabContent +=   "<li class='accordion-item' data-node='"+(index_grade.replace(' ',''))+"'>"+
								"	<a href='' class='item-link item-content no-ripple'><div class='item-inner'><div class='item-title'>"+index_grade+"</div></div></a>"+
								"	<div class='accordion-item-content'>"+
								"		<div id='"+(index_grade.replace(' ',''))+"' style='padding:2rem;'>"+
								"			<table id='' class='_listStudent display dataTable striped bordered'>"+
								"			    <thead>"+
		 						"			        <tr>"+
								"			            <th width='150px;' colspan='2'></th>"+
								"			            <th colspan='"+(value_grade[0].length+3)+"' class='center-align "+colors[0]+"'>Written Works "+ws[0]+"%</th>"+
								"			            <th colspan='"+(value_grade[1].length+3)+"' class='center-align "+colors[1]+"'>Performance Task "+ws[1]+"%</th>"+
								"			            <th colspan='"+(value_grade[2].length+3)+"' class='center-align "+colors[2]+"'>Quarterly Assessment "+ws[2]+"%</th>"+
								"						<th class='center-align blue lighten-3' rowspan='2'>Initial Grade</th>"+
								"						<th class='center-align blue lighten-2' rowspan='2'>Quarterly Grade</th>"+
								"			        </tr>"+
													 headers+
		 						"			    </thead>"+
													sub_content+
							    "			</table>"+
								"		</div>"+
								"	</div>"+
								"</li>";
	        });

			var sub_content = "", headers = ""; content = "";
			sub_content = "";
			$$.each(data_students,function(index_gender2,value_gender2){
				var sub_columnContent = "", sub_headers = "", _finalgrade = 0;
				var grades = JSON.search(finalGrade,'//*[student_id="'+value_gender2[1]['student_id']+'"]');
				$$.each(grades,function(index_grade,value_grade){
					sub_headers += "<th class=' center-align'>"+value_grade['quarter']+"</th>";
					sub_columnContent += "<td class='center-align'>"+value_grade['score']+"</td>";
					_finalgrade = _finalgrade + value_grade['score'];
				});

				headers = "<tr>"+
							"	<th width='150px;' class=' center-align'></th><th width='150px;' class=' center-align'></th>"+
								sub_headers+
							"	<th class=' center-align blue lighten-2'>Final Grade</th>"+
							"	<th class=' center-align blue lighten-3 hidden'>Remarks</th>"+
							"</tr>";

				sub_content += "<tr>"+
								"	<td width='150px;'>"+value_gender2[1]['family_name']+" "+value_gender2[1]['given_name']+", "+value_gender2[1]['middle_name']+"</td><td>"+value_gender2[1]['gender']+"</td>"+
									sub_columnContent+
								"	<td class=' center-align blue lighten-2'>"+getRealNumber(_finalgrade/4)+"</td>"+
								"	<td class=' center-align blue lighten-3 hidden'></td>"+
								"</tr>";
			});

			$$("#_gradeSection").html(data_controls[0]['value']+" - "+data_controls[1]['value']);
			$$("#_subject").html(data_controls[2]['value']);

        	allContent =  "<div class='row'>"+
	   					  "		<table class=''>"+	
 						  "			<tr>"+
						  "			    <td>Year: "+data_controls[1]['value']+"</td>"+
						  "			</tr>"+
 						  "			<tr>"+
						  "			    <td>Section: "+data_controls[2]['value']+"</td>"+
						  "			</tr>"+
 						  "			<tr>"+
						  "			    <td>Subject: "+data_controls[3]['value']+"</td>"+
						  "			</tr>"+
						  "		</table>"+
	   					  "		<div class='list-block accordion-list'>"+
						  "			<ul class='collapsible collapsible-accordion' data-collapsible='accordion' style='max-width:"+getDeviceSize()+"px;'>"+
						  				tabContent+
						  "				<li class='accordion-item' data-node='FinaleGrade'>"+
						  "					<a href='' class='item-link item-content no-ripple'><div class='item-inner'><div class='item-title'>Final Grade</div></div></a>"+
						  "					<div class='accordion-item-content'>"+
						  "						<div id='Summary' style='padding:2rem;'>"+
						  "							<table class='_finalGrade display dataTable striped bordered'>"+
						  "							    <thead>"+
						  									headers+
						  "							    </thead>"+
						  "							    <tbody>"+
						  									sub_content+
						  "								    </tbody>"+
						  "							</table>"+
						  "						</div>"+
						  "					</div>"+
						  "				</li>"+
						  "			</ul>"+
	   					  "		</div>"+
						  "</div>";

			$('#display_studentList').html(allContent);

			var table = $('.dataTable').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 },
		            { width: '20%', targets: 0},
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: true,
		        bPaginate: false,
		        iDisplayLength: -1,
				sScrollY:        "300px",
				sScrollX:        "300px",
				bScrollCollapse: true,
				fixedColumns:   {
				    rightColumns: 1,
				},
		    });

            $$('ul.collapsible').click(function(){
            	var data = $(this).find('li.active').data('node');
            	if((typeof data != undefined || data != 'undefined')){
	            	localStorage.setItem('open-tab',data);
            	}
            });

			notification('k12','Collecting Information. Please wait.',false,1000,false,
				function(){
		            var data = localStorage.getItem('open-tab');
		            $("ul li[data-node='"+data+"']").addClass('active');
		            $("ul li[data-node='"+data+"'] div.collapsible-header").addClass('active');
		            $("ul li[data-node='"+data+"'] #"+data).css({"display":"block"});
				},
				function(){}
			);
		};
		var get_subjectsByYear = function(controls,id){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-subjectsByYear',controls);
			localStorage.setItem("details_subjectsByYear",data.responseText);
		};
		var get_gradeSummary = function(controls,id){
			var nice_ip = localStorage.getItem('nice-ip');
			var data = do_ajax('http://'+nice_ip+'/'+processor+'?get-gradeSummary',[controls,id]);
			localStorage.setItem("grades_gradeSummary",data);
			show_studentGrade(data.responseText);
		};
		var list_summaryGrade = function(){
			controls_gradingSheet();
			var id = getUserDetails();
			$$('a[data-cmd="submit-form"]').on('click',function(){
				$$(this).addClass('disabled');
				var form = app.formToJSON('#form_gradesheet');
				console.log(form);
                var fields = JSON.stringify([{},{'name':'field_year','value':form['field_year']},{'name':'field_section','value':form['field_section']}]);
				localStorage.setItem('controls_gradingSheet',fields);
				get_student(fields,id[0][0]);
		  		get_subjectsByYear(fields,id[0][0]);
		  		get_gradeSummary(fields,id[0][0]);
				// var content = do_ajax('templates/admin/grading-sheet.html','');
				// innerContent(content.responseText);
				// list_gradingSheet();
			});
		};
		var show_studentGrade = function(data){
			$$('a[data-cmd="submit-form"]').removeClass('disabled');
			data = JSON.parse(data);	        
	        var data_students = JSON.parse(localStorage.getItem('students_gradingSheet'));
	        var subjectDetail = JSON.parse(localStorage.getItem('details_subjectsByYear'));
			var gender = [{"male":JSON.search(data_students, '//*[gender="Male"]'),"female":JSON.search(data_students, '//*[gender="Female"]')}];
			var quarters = {'First Quarter':1,'Second Quarter':2,'Third Quarter':3,'Fourth Quarter':4};
			var ws = [];

			var sub_tabContent = "", sub_content = "", grades = "", headers = "";
			var allContent = "", tabs = "", tabContent = "", initialGrade = 0, finalGrade = [], meta_finalGrade = [], finalGrade_student = [], totalGrade = 0;
			var content = "", subContent = "", subjectContent = "", subjectHeader = "", quarterHeader = "", quarterSubHeader, subjectDetails;
			var finalGradeTotal = 0, grandTotal = 0;
			var subjectCount = 0; var subject = ""; var _finalGrade_student = [];

			$$.each(data_students,function(index_gender2,value_gender2){
				subjectContent = ""; subjectHeader = ""; quarterHeader = ""; quarterSubHeader = ""; grandTotal = 0; subjectCount = 0;
				finalGrade_student = [];
				$$.each(data,function(index_summary,value_summary){
					var _subject = JSON.parse(index_summary);
					ws = JSON.search(subjectDetail, '//*[subject="'+_subject[2][0]+'"]'); 
					ws = JSON.parse(ws[0]['weight']); 
					ws = [ws[1],ws[0],ws[2]];
					finalGradeTotal = 0; 
					subjectDetails = JSON.parse(index_summary);
					subject = _subject[2][0];
					if(subjectDetails[2][1] == "*"){
						var activated = 0, _quarters = [];
						meta_finalGrade = [];
						finalGrade = [];
						$$.each(value_summary,function(index_summary1,value_summary1){
							$$.each(value_summary1,function(index_summary2,value_summary2){
								initialGrade = 0;
								$$.each(value_summary2,function(index_grade2,value_grade2){
									var totalScore = 0, totalHighScore = 0;
									if(value_grade2.length>0){
										$$.each(value_grade2,function(index_grade3,value_grade3){
											grades = JSON.parse(value_grade3[2]);
											var search = JSON.search(grades, '//*[id="'+value_gender2[1]['student_id']+'"]/score');
											totalScore = totalScore + Number(search);
											totalHighScore = totalHighScore + Number(value_grade3[1]);
										});
									}
									else{
										totalScore = 0;
										totalHighScore = 0;
									}
									var calc = [getRealNumber(((totalScore/totalHighScore)*100)),getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
									initialGrade = initialGrade + getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));
								});

								var x = _search(parseFloat(initialGrade).toFixed(2),_table())[0]['value'];
								meta_finalGrade.push({student_id:value_gender2[1]['student_id'],subject:index_summary1,quarter:index_summary2,score:_search(parseFloat(initialGrade).toFixed(2),_table())[0]['value']});
							});
						});

						var a = JSON.search(meta_finalGrade, '//*[student_id="'+value_gender2[1]['student_id']+'"]'), b = [], _subtotal = 0, _total = 0;
						$$.each(quarters,function(i,v){
							b = JSON.search(a, '//*[quarter="'+i+'"]');
							_subtotal = 0;
							$$.each(b,function(_i,_v){
								_subtotal = _subtotal + _v['score'];
							})
							finalGrade.push({student_id:value_gender2[1]['student_id'],subject:subjectDetails[2][0],quarter:i,score:getRealNumber((_subtotal/4))});
							quarterSubHeader +="<th class='center-align'>"+v+"</th>";
						});
						var __grades = meta_finalGrade;
						finalGrade_student.push({subject,__grades});
					}
					else{
						finalGrade = [];
						$$.each(value_summary,function(index_summary2,value_summary2){ 
							initialGrade = 0;
							$$.each(value_summary2,function(index_grade2,value_grade2){
								var totalScore = 0, totalHighScore = 0;
								if(value_grade2.length>0){
									$$.each(value_grade2,function(index_grade3,value_grade3){
										grades = JSON.parse(value_grade3[2]);
										var search = JSON.search(grades, '//*[id="'+value_gender2[1]['student_id']+'"]/score');
										totalScore = totalScore + Number(search);
										totalHighScore = totalHighScore + Number(value_grade3[1]);
									});
								}
								else{
									totalScore = 0;
									totalHighScore = 0;
								}

								var calc = [getRealNumber(((totalScore/totalHighScore)*100)),getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)))];
								initialGrade = initialGrade + getRealNumber((((totalScore/totalHighScore)*100)*(ws[index_grade2]/100)));							
							});
							var x = _search(parseFloat(initialGrade).toFixed(2),_table())[0]['value'];
							finalGrade.push({student_id:value_gender2[1]['student_id'],subject:subjectDetails[2][0],quarter:index_summary2,score:_search(parseFloat(initialGrade).toFixed(2),_table())[0]['value']});
							quarterSubHeader +="<th class='center-align'>"+quarters[index_summary2]+"</th>";
						});
						var __grades = finalGrade;
						finalGrade_student.push({subject,__grades});
					}

					quarterSubHeader +="<th class='center-align'>Final Grade</th>";
					quarterHeader +="<th colspan='4' class='center-align'>Quarter</th><th></th>";
					subjectHeader +="<td colspan='5'class='center-align'>"+subjectDetails[2][0]+"</td>";
					finalGradeTotal = parseFloat(((finalGrade[0]['score']+finalGrade[1]['score']+finalGrade[2]['score']+finalGrade[3]['score'])/4)).toFixed(2);
					subjectContent +="<td class='center-align'>"+finalGrade[0]['score']+"</td><td class='center-align'>"+finalGrade[1]['score']+"</td><td class='center-align'>"+finalGrade[2]['score']+"</td><td class='center-align'>"+finalGrade[3]['score']+"</td><td class='center-align'>"+finalGradeTotal+"</td>";
					subjectCount++;
					grandTotal = Number(grandTotal)+Number(finalGradeTotal);
				});
				
				var s_id = value_gender2[1]['student_id'];
				_finalGrade_student.push({s_id,finalGrade_student});

				subjectHeader = "<tr>"+
								"	<td rowspan='2' colspan='2'></td>"+subjectHeader+"<td rowspan='3'><strong>General Average</strong></td>"+
								"</tr>"+
								"<tr>"+
									quarterHeader+
								"</tr>"+
								"<tr>"+
								"	<th width='250px;'>Name of Learners</th><th width='150px;'>Gender</th>"+quarterSubHeader+
								"</tr>";
				subContent +=   "<tr>"+
								"	<td>"+value_gender2[1]['family_name']+" "+value_gender2[1]['given_name']+", "+value_gender2[1]['middle_name']+"</td><td>"+value_gender2[1]['gender']+"</td>"+subjectContent+"<td class='center-align'>"+parseFloat((grandTotal/subjectCount)).toFixed(2)+"</td>"+
								"</tr>";
			});
	

			$$('#display_studentList').attr({'style':'max-width:'+(getDeviceSize()-40)+'px;'}); 

			content =   "<div class='col s12'>"+
						"	<table id='studentsGradeSummary' class='_listStudent responsive-table display dataTable'>"+
 						"		<thead>"+
									subjectHeader+
 						"		</thead>"+
 						"		<tbody>"+
 									subContent+
 						"		</tbody>"+
						"	</table>"+
						"</div>";

			$$('#display_studentList').html(content); 
			$$('#display_studentList .card .card-content').attr('style','padding:10px; overflow-x: scroll;');
		
			var table = $('#studentsGradeSummary').DataTable({
		        "columnDefs": [
		            { "visible": false, "targets": 1 },
		            { width: '20%', targets: 0},
		        ],
		        "order": [[ 0, 'asc' ]],
		        bLengthChange: true,
		        bPaginate: false,
		        iDisplayLength: -1,
				sScrollY:        "300px",
				sScrollX:        "300px",
				bScrollCollapse: true,
				fixedColumns:   {
				    rightColumns: 1,
				},
		    });

		    $$('#studentsGradeSummary tbody').on('click','tr.group',function(){
		        var currentOrder = table.order()[0];
		        if(currentOrder[0] === 2 && currentOrder[1] === 'asc') {
		            table.order([1,'desc']).draw();
		        }
		        else{
		            table.order([1,'asc']).draw();
		        }
		    });

            localStorage.setItem('_finalGrade_student',JSON.stringify(_finalGrade_student));
			notification('k12','Collecting Information. Please wait.',false,1000,false,
				function(){},
				function(){}
			);
		};
	// end main grading process

	// grade transmutation
        var _table = function(){
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
        };
        var _search = function(search,grade){
        	var data = [];
        	search = Number(search);
        	$.each(grade['grades'],function(i,v){
        		if((Number(v['min'])<=search) && (Number(v['max'])>=search)){
        			data.push(v);
        			return false;
        		}
        	});
        	return data;
        };
	// end grade transmutation
	/*
	*/
    return {
        hooks: {
            appInit: function () {

            	var deviceSize = getDeviceSize();
            	console.log(deviceSize);
            	ini_getIP();
            }
        }
    }

};

var k12_app = new Framework7({
	k12:true
});