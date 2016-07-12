<?php
//secure this file
include("Functions.php");
session_start();
$function = new DatabaseClasses;

    if (isset($_GET['kill-session'])){
        print_r(session_destroy());
    }

	if(isset($_GET['chkConnection'])){
		print_r($function->chkConnection());
	}

	if(isset($_GET['createDB'])){
		$data = $function->createDB('db_k12');
		if($data == 1){
			echo 1;
		}
	}

	if(isset($_GET['createTables'])){
		$fileDir = '../db/k12.sql';
		if(file_exists($fileDir)){
			$query = file_get_contents($fileDir);
			$query = $function->PDO(false,$query);
			if($query->execute()){
				echo 1;
			}
			else{
				echo 0;
			}
		}
		else{
			echo 0;
		}			
	}

	if(isset($_GET['checkSchoolDetails'])){
		$query = $function->PDO(true,'SELECT * FROM tbl_schoolinfo');
		print_r(json_encode($query));
	}

	if(isset($_GET['login'])){
		$data = $_POST['data'];
		$username = $data[0]['value'];
		$password = sha1($data[1]['value']);
		$date = new DateTime();
		$hash = $date->getTimestamp();

		$query = $function->PDO(true,"SELECT * FROM tbl_user WHERE username = '{$username}' AND password = '{$password}'");
		if(count($query)>0){
			$_SESSION["data"] = [$username,$password,$hash];
			print_r(json_encode($query));
		}
		else{
			echo 0;
		}
	}

	//getters
	if(isset($_GET['get-account'])){
		if(isset($_SESSION['data'])){
			$data = $_SESSION['data'];
			$query = $function->PDO(true,"SELECT * FROM tbl_user WHERE username = '{$data[0]}' AND password = '{$data[1]}'");
			print_r(json_encode($query));
		}
		else{
			print_r(json_encode([]));
		}
	}

	if(isset($_GET['get-schoolInfo'])){
		$data = $_SESSION['data'];
		$query = $function->PDO(true,"SELECT * FROM tbl_schoolinfo");
		print_r(json_encode($query));
	}

	if(isset($_GET['get-students'])){
		$final = [];
		$students = [];
		$query = $function->PDO_ASSOC("SELECT * FROM tbl_studentinfo");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
        		$id = $v['student_id'];
		        $query_studentEd = $function->PDO_ASSOC("SELECT * FROM tbl_student WHERE student_id = '{$id}' ORDER BY `date` DESC");
		        $final[] = ["info"=>$v,"educ"=>$query_studentEd];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
	}

    if (isset($_GET['get-yearLevel'])) {
    	$final = [];
    	$subjects = [];
        $query = $function->PDO_SQL("SELECT * FROM tbl_yearlevel ORDER BY chronological ASC");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
		        $query_section = $function->PDO_SQL("SELECT * FROM tbl_section WHERE `year` = '{$v[0]}' ORDER BY `order` ASC");
		        $query_subject = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE `year` = '{$v[0]}' ORDER BY subject_sort ASC");
		        $final[] = [$v,$query_section,$query_subject];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
    }

    if (isset($_GET['get-assoc-yearLevel'])) {
    	$final = [];
    	$subjects = [];
        $query = $function->PDO_ASSOC("SELECT * FROM tbl_yearlevel ORDER BY chronological ASC");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
        		$year = $v['id'];
		        $query_section = $function->PDO_ASSOC("SELECT * FROM tbl_section WHERE `year` = '{$year}' ORDER BY `order` ASC");
		        $query_subject = $function->PDO_ASSOC("SELECT * FROM tbl_subject WHERE `year` = '{$year}' ORDER BY subject_sort ASC");
		        $final[$v['title']] = [$v,$query_section,$query_subject];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
    }

    if (isset($_GET['get-studentsGradeSheet'])) {
    	$final = [];
    	$data = $_POST['data'];
    	$data = json_decode($data);
    	$year = $data[0]->value;
    	$section = $data[1]->value;
		$details = (count($data)>3) ? [$data[2]->value,$data[3]->value] : [$data[2]->value,""];
		$details = json_encode([$year,$section,$details]);
		$shlYear = $function->PDO(true,"SELECT schoolYearStart,schoolYearEnd FROM tbl_schoolinfo");
		$dateStart = date("Y-m-d",strtotime("01-".$shlYear[0][0]));
		$dateEnd = date("Y-m-d",strtotime("01-".$shlYear[0][1]));

        $query = $function->PDO_SQL("SELECT * FROM tbl_student WHERE (`date` BETWEEN '{$dateStart}' AND '{$dateEnd}') AND (status = 0 AND year = '{$year}' AND section = '{$section}')");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
        		$s_id = $v[1];
		        $q1 = $function->PDO_ASSOC("SELECT * FROM tbl_studentinfo WHERE student_id = '{$s_id}'");
		        $final[] = [$v,$q1[0]];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
    }

	if(isset($_GET['get-grade'])){
		$date = $function->PDO_DateAndTime();
		$grades = [];$_quarters = [];
		$sub_subject = "";

		$data = $_POST['data'];
		$data = json_decode($data);
		$year = $data[0]->value;
		$section = $data[1]->value;
		$subject = $data[2]->value;
		$sub_subject = (count($data)>3) ? $data[3]->value : "";
		$details = json_encode([$year,$section,[$subject,$sub_subject]]);
		$components = ['Written Works','Performance Task','Quarterly Assessment'];
		$quarters = ['First Quarter','Second Quarter','Third Quarter','Fourth Quarter'];
		$shlYear = $function->PDO(true,"SELECT schoolYearStart,schoolYearEnd FROM tbl_schoolinfo");
		$dateStart = date("Y-m-d",strtotime("01-".$shlYear[0][0]));
		$dateEnd = date("Y-m-d",strtotime("01-".$shlYear[0][1]));

		foreach ($quarters as $key => $value) {
			$grades = [];
			foreach($components as $i => $v){
				$q1 = $function->PDO(true,"SELECT * FROM tbl_grades WHERE (`date` BETWEEN '{$dateStart}' AND '{$dateEnd}') AND (component = '{$v}' AND details = '{$details}' AND quarter = '{$value}') ORDER BY `date` ASC");
				$grades[] = $q1;
			}
			$_quarters[$value] = $grades;
		}

		print_r(json_encode($_quarters));
	}

	if(isset($_GET['get-gradeSummary'])){
		$date = $function->PDO_DateAndTime();
		$returngrades = [];$finalgrades = [];$grades = [];$subgrades = [];$_quarters = [];

		$data = $_POST['data'];
		$data = json_decode($data);
		$year = $data[0]->value;
		$section = $data[1]->value;
		$quarters = ['First Quarter','Second Quarter','Third Quarter','Fourth Quarter'];
		$components = ['Written Works','Performance Task','Quarterly Assessment'];
		$shlYear = $function->PDO(true,"SELECT schoolYearStart,schoolYearEnd FROM tbl_schoolinfo");
		$dateStart = date("Y-m-d",strtotime("01-".$shlYear[0][0]));
		$dateEnd = date("Y-m-d",strtotime("01-".$shlYear[0][1]));

        $q_year = $function->PDO(true,"SELECT * FROM tbl_yearlevel WHERE `title` = '{$year}'");
		$q_year = $q_year[0][0];
        $q_subjects = $function->PDO(true,"SELECT * FROM tbl_subject WHERE `year` = '{$q_year}'");

        foreach ($q_subjects as $index => $value) {
			$subject = $value[1];
			$subjectData = json_decode($value[2]);
			$subject = $subjectData[0];
			if((count($subjectData)>1)){
				unset($subjectData[0]); 
				foreach ($subjectData as $innerIndex2 => $innerValue2) {
					$details = json_encode([$year,$section,[$subject,$innerValue2[0]]]);
					$psuedodetails = json_encode([$year,$section,[$subject,"*"]]);
					foreach ($quarters as $key => $value) {
						$grades = [];
						foreach($components as $i => $v){
							$q1 = $function->PDO(true,"SELECT * FROM tbl_grades WHERE (`date` BETWEEN '{$dateStart}' AND '{$dateEnd}') AND (component = '{$v}' AND details = '{$details}' AND quarter = '{$value}') ORDER BY `date` ASC");
							$grades[] = $q1;
						}
						$_quarters[$value] = $grades;
					}
					$subgrades[$innerValue2[0]] = $_quarters;
				}
				$finalgrades[$psuedodetails] = $subgrades;
			}
			else{
				$details = json_encode([$year,$section,[$subject,""]]);
				foreach ($quarters as $key => $value) {
					$grades = [];
					foreach($components as $i => $v){
						$q1 = $function->PDO(true,"SELECT * FROM tbl_grades WHERE (`date` BETWEEN '{$dateStart}' AND '{$dateEnd}') AND (component = '{$v}' AND details = '{$details}' AND quarter = '{$value}') ORDER BY `date` ASC");
						$grades[] = $q1;
					}
					$_quarters[$value] = $grades;

				}
				$finalgrades[$details] = $_quarters;
			}

			$returngrades[] = $finalgrades;
        }
		print_r(json_encode($finalgrades));
	}

	if(isset($_GET['get-subjectDetails'])){
		$date = $function->PDO_DateAndTime();
		$subjectDetails = [];
		$sub_subject = "";
		$data = json_decode($_POST['data']);

		$year = $data[0]->value;
		$subject = $data[2]->value;
		$year = $function->PDO(true,"SELECT * FROM tbl_yearlevel WHERE `title` = '{$year}'");
		$year = $year[0][0];
		$q1 = $function->PDO(true,"SELECT * FROM tbl_subject WHERE `year` = '{$year}'");
		foreach ($q1 as $key => $value) {
			$subj = json_decode($value[2]);
			if($subj[0] == $subject){
				$subjectDetails[] = $value;
			}
		}
		print_r(json_encode($subjectDetails));
	}

	if(isset($_GET['get-subjectsByYear'])){
		$date = $function->PDO_DateAndTime();
		$subjectDetails = [];
		$sub_subject = "";
		$data = json_decode($_POST['data']);

		$year = $data[0]->value;
		$year = $function->PDO(true,"SELECT * FROM tbl_yearlevel WHERE `title` = '{$year}'");
		$year = $year[0][0];
		$q1 = $function->PDO(true,"SELECT * FROM tbl_subject WHERE `year` = '{$year}'");
		foreach ($q1 as $i => $v) {
			$subject = json_decode($v[2]);
			$subjectDetails[] = ['subject'=>$subject[0],'code'=>$v[1],'weight'=>$v[6]];
		}
		print_r(json_encode($subjectDetails));
	}

	if(isset($_GET['get-validateStudentID'])){
	    $data = $_POST['data'];
		$query = $function->PDO(true,"SELECT * FROM tbl_student WHERE student_id = '{$data}'");
		echo count($query)==0 ? "true" : "false";
	}

	//setters
	if(isset($_GET['set-grade'])){
        $id = $function->PDO_IDGenerator('tbl_grades','id');
		$date = $function->PDO_DateAndTime();
		$scores = [];

		$data = $_POST['data'];
		$replace = ['name','value']; $replaceWith = ['id','score'];
		$quarter = $data[0];
		$component = $data[5][0]['value'];
		$highest_score = $data[5][1]['value'];
		$year = $data[1]; $section = $data[2]; $subject = [$data[3],$data[4]];
		$details = json_encode([$year,$section,$subject]);

		unset($data[5][0],$data[5][1]);

		foreach ($data[5] as $key => $value) {
			$scores[] = $value;
		}
		$scores = json_encode($scores);
		$scores = str_replace($replace, $replaceWith, $scores);

		$query = $function->PDO(false,"INSERT INTO  tbl_grades(id,highest_score,scores,quarter,details,component,`date`) VALUES ('{$id}','{$highest_score}','{$scores}','{$quarter}','{$details}','{$component}','{$date}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['set-schoolInfo'])){
		$data = $_POST['data'];
        $id = $function->PDO_IDGenerator('tbl_schoolinfo','id');

		$schoolName = $data[0]['value'];
		$schoolAddress = $data[1]['value'];
		$schoolYearStart = $data[2]['value'];
		$schoolYearEnd = $data[3]['value'];
		$schoolID = $data[4]['value'];
		$schoolRegion = $data[5]['value'];
		$schoolDivision = $data[6]['value'];

        if($data[7]['name'] == 'save'){
			$details = json_encode(['logo.png','bg-banner.jpg',$schoolAddress]);
			$query = $function->PDO(false,"INSERT INTO tbl_schoolinfo(id,schoolName,schoolID,schoolYearStart,schoolYearEnd,region,division,details) VALUES('{$id}','{$schoolName}','{$schoolID}','{$schoolYearStart}','{$schoolYearEnd}','{$schoolRegion}','{$schoolDivision}','{$details}')");
			if($query->execute()){
				echo 1;
			}
			else{
				$Data = $query->errorInfo();
				print_r($Data);
			}
        }
        else{
			$details = json_encode(['logo.png','bg-banner.jpg',$schoolAddress]);
			$query = $function->PDO(false,"UPDATE tbl_schoolinfo SET schoolName = '{$schoolName}',schoolID = '{$schoolID}',schoolYearStart = '{$schoolYearStart}',schoolYearEnd = '{$schoolYearEnd}',region = '{$schoolRegion}',division = '{$schoolDivision}', details = '{$details}'");
			if($query->execute()){
				echo 1;
			}
			else{
				$Data = $query->errorInfo();
				print_r($Data);
			}
        }
	}

	if(isset($_GET['set-yearLevel'])){
		$year = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10'];
		$query = ''; $attr = '';
        foreach ($year as $key => $value) {
        	$id = sha1($key);
        	$chronological = $key+1;

        	if(($value == 'Grade 11') || ($value == 'Grade 12')){
				$attr = 2;
        	}
        	else{
				$attr = 1;
        	}
        	$query .= "INSERT INTO tbl_yearlevel(id,title,chronological,attribute) VALUES('{$id}','{$value}',{$chronological},{$attr});";
        }

		$query = $function->PDO(false,$query);
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['set-section'])){
		$data = $_POST['data'];
		$section = $data[0]['value'];
		$year = $data[1]['value'];
        $id = $function->PDO_IDGenerator('tbl_section','id');
		$order = count($function->PDO(true,"SELECT * FROM tbl_section WHERE `year` = '{$year}'"))+1;

		$query = $function->PDO(false,"INSERT INTO tbl_section(`id`,`section`,`order`,`year`) VALUES('{$id}','{$section}','{$order}','{$year}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['set-subject'])){
		$data = $_POST['data'];

        $id = $function->PDO_IDGenerator('tbl_subject','id');
		$subject_code = $data[0]['value'];
		$subject_title = json_encode([$data[2]['value']]);
		$subject_weight = json_encode([+$data[3]['value'],+$data[4]['value'],+$data[5]['value']]);
		$subject_discription = $data[6]['value'];
		$subject_sort = 1;
		$year = $data[1]['value'];

		$query = $function->PDO(false,"INSERT INTO tbl_subject(`id`,`subject_code`,`subject_title`,`subject_discription`,`subject_sort`,`year`,`weight`) VALUES('{$id}','{$subject_code}','{$subject_title}','{$subject_discription}','{$subject_sort}','{$year}','{$subject_weight}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

    if(isset($_GET['set-sublevelsubject'])){
		$data = $_POST['data'];
		$sublevelesubject = [];

		$year = $data[1]['value'];
		$subject_code = $data[0]['value'];
		$subject_title = $data[2]['value'];
		$subject_discription = $data[3]['value'];

        $Query = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE id = '{$year}'");
        $data = json_decode($Query[0][2]);
        $data[] = [$subject_code,$subject_title,$subject_discription];
        $data = json_encode($data);

		$QueryString = "UPDATE tbl_subject SET subject_title = '{$data}' WHERE id = '{$year}'";
		$Query = $function->PDO_SQLQuery($QueryString);
		if($Query->execute())
			echo 1;
		else{
			print_r(json_encode([$query->errorInfo()]));
		}
    }

	if(isset($_GET['set-studentInfo'])){
		$data = $_POST['data'];
        $id = $function->PDO_IDGenerator('tbl_studentinfo','id');

		$family_name = $data[0]['value'];
		$given_name = $data[1]['value'];
		$middle_name = $data[2]['value'];
		$gender = $data[7]['value'];
		$date_of_birth = $data[4]['value'];
		$place_of_birth = $data[5]['value'];
		$permanent_address = $data[6]['value'];
		$citizenship = $data[8]['value'];
		$height = $data[9]['value'];
		$weight = $data[10]['value'];
		$mother_name = $data[12]['value'];
		$father_name = $data[11]['value'];
		$picture = 'avatar.jpg';
		$date = $function->PDO_DateAndTime();
		$studentid = $data[13]['value'];
		$educ_year = $data[14]['value'];
		$educ_section = $data[15]['value'];

		$query = $function->PDO(false,"INSERT INTO  tbl_studentinfo(id,family_name,given_name,middle_name,gender,date_of_birth,place_of_birth,permanent_address,citizenship,height,weight,mother_name,father_name,picture,student_id,`date`) VALUES ('{$id}','{$family_name}','{$given_name}','{$middle_name}','{$gender}','{$date_of_birth}','{$place_of_birth}','{$permanent_address}','{$citizenship}','{$height}','{$weight}','{$mother_name}','{$father_name}','{$picture}','{$studentid}','{$date}'); INSERT INTO  tbl_student(id,student_id,year,section,`date`) VALUES ('{$id}','{$studentid}','{$educ_year}','{$educ_section}','{$date}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

    if(isset($_GET['set-newImage'])){
        $data = $_POST['data'];
    	$username = $_SESSION['data'][0]; $password = $_SESSION['data'][1];
    	$getUser = $function->PDO_SQL("SELECT * FROM tbl_user WHERE username = '{$username}' AND password = '{$password}'");
    	if(count($getUser) == 1){
			$id = $getUser[0][0];
		}	

        $file = sha1($data[0]).'-'.time().'.apr';
        $handle = fopen('../img/'.$file, 'w+');

        fwrite($handle, $data[2]);
        fclose($handle);

        if($data[1] == 'teacher'){
        	$username = $_SESSION['data'][0]; $password = $_SESSION['data'][1];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_user SET picture = '{$file}' WHERE id = '{$id}'");
        }
        else if($data[1] == 'school'){
	        $Query = $function->PDO_SQL("SELECT * FROM tbl_schoolinfo");
	        $metaData = json_decode($Query[0][7]);
	        $metaData = json_encode([$file,$metaData[1],$metaData[2]]);
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET details = '{$metaData}'");
        }

        if($Query->execute())
            echo 1;
        else{
            $Data = $Query->errorInfo();
            print_r($Data);
        }
    }

    if(isset($_GET['set-userDetails'])){
        $data = $_POST['data'];
        $status = false;
    	$username = $_SESSION['data'][0]; $password = $_SESSION['data'][1];

    	$getUser = $function->PDO_SQL("SELECT * FROM tbl_user WHERE username = '{$username}' AND password = '{$password}'");
    	if(count($getUser) == 1){
			$id = $getUser[0][0];	

	        if($data[0][0]['name'] == 'field_name'){
	        	$value = $data[0][0]['value'];
	            $Query = $function->PDO_SQLQuery("UPDATE tbl_user SET name = '{$value}' WHERE id = '{$id}'");
	            $status = true;
	        }
	        else if($data[0][0]['name'] == 'field_username'){
	        	$value = $data[0][0]['value'];
		        $user = $function->PDO_SQL("SELECT * FROM tbl_user WHERE username = '$value'");
		        if(count($user)==0){
		        	$status = true;
		            $Query = $function->PDO_SQLQuery("UPDATE tbl_user SET username = '{$value}' WHERE id = '{$id}'");	        	
		        }
	        }
	        else if($data[0][0]['name'] == 'field_password'){
	        	$value = $data[0][0]['value'];
	        	$newPassword = sha1($value);
		        $user = $function->PDO_SQL("SELECT * FROM tbl_user WHERE password = '$newPassword'");
		        if(count($user)==0){
		        	$status = true;
		            $Query = $function->PDO_SQLQuery("UPDATE tbl_user SET password = '{$newPassword}' WHERE id = '{$id}'");
		        }
	        }

	        if($status){
		        if($Query->execute()){
		            echo 1;
		            if($data[0][0]['name'] == 'field_username')
		            	$_SESSION['data'][0] = $data[0][0]['value'];

		            if($data[0][0]['name'] == 'field_password')
		            	$_SESSION['data'][1] = sha1($data[0][0]['value']);
		        }
		        else{
		            $Data = $Query->errorInfo();
		            print_r($Data);
		        }   	
	        }
	        else{
	        	print_r(['Error','Information provided cannot be use.']);
	        }
    	}
        else{
        	print_r(['Error','Information provided cannot be use.']);
        }
    }

    if(isset($_GET['set-schoolDetails'])){
        $data = $_POST['data'];
        $Query = "";

        $schoolInfo = $function->PDO_SQL("SELECT * FROM tbl_schoolinfo");
        $id = $schoolInfo[0][0];
        $details = json_decode($schoolInfo[0][7]);

        if($data[0][0]['name'] == 'field_schoolName'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET schoolName = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_schoolAddress'){
        	$value = json_encode([$details[0],$details[1],$data[0][0]['value']]);
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET details = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_schoolID'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET schoolID = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_region'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET region = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_division'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET division = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_yearStart'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET schoolYearStart = '{$value}' WHERE id = '{$id}'");
        }
        else if($data[0][0]['name'] == 'field_yearEnd'){
        	$value = $data[0][0]['value'];
            $Query = $function->PDO_SQLQuery("UPDATE tbl_schoolinfo SET schoolYearEnd = '{$value}' WHERE id = '{$id}'");
        }

        if($Query->execute()){
            echo 1;
        }
        else{
            $Data = $Query->errorInfo();
            print_r($Data);
        }   	
    }

	//deleters
    if(isset($_GET['delete-sublevelsubject'])){
		$data = $_POST['data'];
		$newdata = [];
		$subject_id = $data[0];
		$subject_code = $data[1][0];
		$subject_title = $data[1][1];
		$subject_discription = $data[1][2];
        $Query = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE id = '{$subject_id}'");
        $data = json_decode($Query[0][2]);

        foreach ($data as $i => $v) {
        	if(count($v)==0){
        		$newdata[] = $v;
        	}
        	else{
        		if(($v[1] == $subject_code) && ($v[0] == $subject_title) && ($v[2] == $subject_discription)){
        			// echo "code: {$subject_code}, title: {$subject_title}, value: {$subject_discription}";
        		}
        		else{
	        		$newdata[] = $v;
        		}        		
        	}
        }
        $data = json_encode($newdata);

		$QueryString = "UPDATE tbl_subject SET subject_title = '{$data}' WHERE id = '{$subject_id}'";
		$Query = $function->PDO_SQLQuery($QueryString);
		if($Query->execute())
			echo 1;
		else{
			print_r(json_encode([$query->errorInfo()]));
		}
    }

    if(isset($_GET['delete-subject'])){
    	$data = $_POST['data'];
        $Query = $function->PDO_SQLQuery("DELETE FROM tbl_subject WHERE id = '{$data[0]}'");
        if($Query->execute()){
	        echo 1;
        }
        else{
	        print_r(json_encode($Query->errorInfo()));
        }
    }

    if(isset($_GET['delete-section'])){
    	$data = $_POST['data'];
        $Query = $function->PDO_SQLQuery("DELETE FROM tbl_section WHERE id = '{$data[0]}'");
        if($Query->execute()){
	        echo 1;
        }
        else{
	        print_r(json_encode($Query->errorInfo()));
        }
    }

    if(isset($_GET['drop-database'])){
		$data = $function->dropDB('db_k12');
		if($data == 1){
			echo 1;
		}
    }

    //backups
    if(isset($_GET['buckup-db'])){
		$db = $function->db_buckup();
    	// print_r($db);
        $file = sha1('rufongabrillojr').'-'.time().'.sql';
        $handle = fopen('../db/'.$file, 'w+');

        if(fwrite($handle, $db)){
        	fclose($handle);
        	print_r(json_encode([1,$file]));
        }
    }

?>