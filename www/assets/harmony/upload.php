<?php
header('Content-Type:application/json');

$uploaded = [];
$succeeded = [];
$failed = [];
$allowed = ['exe','apk','docx','txt','jpg','jpeg','png','gif','rar','zip'];

if(!empty($_FILES['file'])){
	$name = $_FILES['file']['name'];
	if($_FILES['file']['error'] == 0){
		$temp = $_FILES['file']['tmp_name'];
		$ext = explode('.',$name);
		$ext = strtolower(end($ext));
		$file = sha1($temp).'-'.time().'.'.$ext;
		if(in_array($ext, $allowed) && move_uploaded_file($temp,'../img/people/'.$file)){
			$succeeded[] = array(
				'name' => $name,
				'file' => $file,
			);
		}
		else{
			$failed[] = array(
				'name' => $name,
			);
		}
	}
	else{
		$failed[] = array(
			'name' => $name,
		);
	}

	if(!empty($_POST['ajax'])){
		echo json_encode(array(
			'succeeded' => $succeeded,
			'failed' => $failed
		));
	}
}
else{
	$failed[] = array(
		"Unable to upload the file."
	);
	echo json_encode(array(
		'succeeded' => $succeeded,
		'failed' => $failed
	));
}
?>