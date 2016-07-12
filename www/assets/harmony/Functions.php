<?php
include("gabruX/Functions.php");
$Function = new DataClasses;

//secure this file
class DatabaseClasses extends DataClasses{

	public $Data;
	public $Row;
	public $Key;
	public $Value;

	function DBCon(){
		$host = "localhost";
		$dataBase = "db_k12";
		$user = "root";
		$password = "";
		try{
			$PDO = new PDO('mysql:host='.$host.';dbname='.$dataBase, $user, $password);
			return $PDO; $PDO = null;
		}
		catch(PDOExcemption $e){
			echo 'There was an error connecting to your database.<br/>';
			echo 'Error:'.$e->getMessage();
		}
	}

	function chkConnection(){
		$data = DatabaseClasses::DBCon();
		if(is_object($data)){
			echo 1;
		}
	}

	function createDB($db){
		$host = "localhost";
		$dataBase = "test";
		$user = "root";
		$password = "";
		try {
			$PDO = new PDO('mysql:host='.$host.';dbname='.$dataBase, $user, $password);
			$PDO->exec("CREATE DATABASE {$db}") or die(print_r($PDO->errorInfo(), true));
			echo 1;
		}
		catch (PDOException $e) {
			die("DB ERROR: ". $e->getMessage());
		}
	}

	function dropDB($db){
		$host = "localhost";
		$dataBase = "test";
		$user = "root";
		$password = "";
		try {
			$PDO = new PDO('mysql:host='.$host.';dbname='.$dataBase, $user, $password);
			$PDO->exec("DROP DATABASE {$db}") or die(print_r($PDO->errorInfo(), true));
			echo 1;
		}
		catch (PDOException $e) {
			die("DB ERROR: ". $e->getMessage());
		}
	}

	function PDO($do,$query){
		$array = array();
		$Data = DatabaseClasses::DBCon();
		$query = $Data->prepare($query);
		if($do){
			$query->execute();
			foreach ($query->fetchAll(PDO::FETCH_NUM) as $key) {
				$array[] = $key;
			}
			return $array;
		}
		else{
			return $query;
		}
	}

	function PDO_DateAndTime(){
		$Query = DatabaseClasses::PDO_Query("SELECT NOW() AS DateAndTime");
		foreach ($Query as $key => $value) {
			return $value[0];
		}
	}

	function PDO_Queried_RowCount($String){
		$Query = DatabaseClasses::PDO_Query($String);
		return $Query->rowCount();
	} 

	function PDO_Query($QueryString){
		$Data = DatabaseClasses::DBCon();
		$Query = $Data->prepare($QueryString);
		$Query->execute();
		return $Query;
	}

	function PDO_SQLQuery($QueryString){
		$Data = DatabaseClasses::DBCon();
		$Query = $Data->prepare($QueryString);
		return $Query;
	}

	function PDO_ShowTable($Table,$Column = "*",$Condition = "*"){
		if($Column == '*' || $Condition == "*"){
			$Array = array();
			$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table");
			foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
				$Array[] = $key;
			}
			return $Array;
		}
		else{
			$Array = array();
			$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
			foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
				$Array[] = $key;
			}
			return $Array;
		}
	}

	function PDO_SQL($SQLString){
		$Array = array();
		$Query = DatabaseClasses::PDO_Query($SQLString);
		foreach ($Query->fetchAll(PDO::FETCH_NUM) as $key) {
			$Array[] = $key;
		}
		return $Array;
	}

	function PDO_ASSOC($SQLString){
		$Array = array();
		$Query = DatabaseClasses::PDO_Query($SQLString);
		foreach ($Query->fetchAll(PDO::FETCH_ASSOC) as $key) {
			$Array[] = $key;
		}
		return $Array;
	}

	function PDO_RowCount($Table,$Column,$Condition){
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
		return $Query->rowCount();
	}

	function PDO_ShowRow($Table,$Column,$Condition){
		$Array = array();
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table WHERE $Column = '$Condition'");
		if($Query->rowCount() > 0){
			foreach ($Query->fetch(PDO::FETCH_NUM) as $key => $value) {
				$Array[] = $value;
			}
			return $Array;
		}
	}

	function PDO_TableCounter($Table){
		$Query = DatabaseClasses::PDO_Query("SELECT * FROM $Table'");
		return $Query->rowCount();
	}

	function PDO_IDGenerator($Table,$ID){
		$Status = true;
		for($x=0;$Status == true;$x++){
			$TempID = sha1(DatabaseClasses::PDO_TableCounter($Table)+$x);
			$Query = DatabaseClasses::PDO_RowCount($Table,$ID,$TempID);
			if($Query == 0){
				$Status = false;
			}
		}
		return $TempID;
	}

	function CheckUserLog($Username,$Password){
		if(!isset($Username) && !isset($Password))
			return true;
	}

	function PDO_StudentIDNumberGenerator($Table,$ID){
		$Status = true; $RetString = ""; $Zero = '';
		$Query = DatabaseClasses::PDO_SQLQuery("SELECT * FROM $Table");
		$Query->execute(); $Num = $Query->rowCount();
		for($x=0;$x<5-strlen($Num);$x++){
			$Zero.="0";
		}
		$Year = substr(DatabaseClasses::PDO_DateNow(),2,2);
		$TempNum = $Zero.$Query->rowCount();

		return $Year.'-LN-'.$TempNum;
	}

	function PDO_DateNow(){
		$Query = DatabaseClasses::PDO_SQLQuery("SELECT NOW() as Date");
		$Query->execute();
		return $Query->fetch(PDO::FETCH_NUM)[0];
	}

	function db_buckup(){
		$sql=""; $createsql=""; $subcreatesql=""; $insertsql=""; $subinsertsql="";
		$q1 = DatabaseClasses::PDO(true,"SHOW TABLES");
		foreach ($q1 as $i1 => $v1) {
			$q2 = DatabaseClasses::PDO(true,"DESCRIBE {$v1[0]}");
			$subcreatesql=""; $pri = ""; $columns = "";
			foreach ($q2 as $i2 => $v2) {
				$columns .= "`{$v2[0]}`";
				if(count($q2)!=($i2+1)){$columns .= ", ";}
				if($v2[3] == "PRI"){ $pri = $v2[0]; }
				$null = ($v2[2] == "NO") ? "NOT NULL" : "NULL";
				$subcreatesql .= "`{$v2[0]}` {$v2[1]} {$null},\n";
			}
			$subcreatesql .= "PRIMARY KEY (`{$pri}`)";
			$createsql = "CREATE TABLE IF NOT EXISTS `{$v1[0]}` (\n{$subcreatesql}\n) ENGINE=InnoDB DEFAULT CHARSET=latin1;\n\n";

			$insertsql="";
			$q3 = DatabaseClasses::PDO(true,"SELECT * FROM {$v1[0]}");
			foreach ($q3 as $i3 => $v3) {
				$subinsertsql="";
				foreach ($v3 as $_i3 => $_v3) {
					$subinsertsql .= "'{$_v3}'";
					if(count($v3)!=($_i3+1)){$subinsertsql .= ", ";}
				}
				$insertsql .= "({$subinsertsql})";
				if(count($q3)!=($i3+1)){$insertsql .= ",\n";}
			}
			$insertsql = "INSERT INTO `{$v1[0]}` ({$columns}) VALUES \n{$insertsql};\n\n";

			$sql .= "-- Table structure for `{$v1[0]}`-- \n{$createsql}-- Dumping data for table `{$v1[0]}`-- \n{$insertsql}\n\n";
		}
		$sql = "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\nSET time_zone = \"+00:00\";\n\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\n/*!40101 SET NAMES utf8 */;\n\n{$sql}\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;\n\n-- Buckup function --\n-- Developed by Rufo N. Gabrillo Jr. --";

		return $sql;
	}
}
?>