SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- Table structure for `tbl_grades`-- 
CREATE TABLE IF NOT EXISTS `tbl_grades` (
`id` varchar(50) NOT NULL,
`highest_score` int(3) NOT NULL,
`scores` text NOT NULL,
`quarter` varchar(100) NOT NULL,
`details` varchar(100) NOT NULL,
`component` varchar(100) NOT NULL,
`date` varchar(100) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_grades`-- 
INSERT INTO `tbl_grades` (`id`, `highest_score`, `scores`, `quarter`, `details`, `component`, `date`) VALUES 
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '50', '[{"id":"123456","score":"49"},{"id":"123458","score":"50"},{"id":"123457","score":"50"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Written Works', '2016-06-06 23:49:20'),
('17ba0791499db908433b80f37c5fbc89b870084b', '100', '[{"id":"123456","score":"95"},{"id":"123458","score":"98"},{"id":"123457","score":"99"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Quarterly Assessment', '2016-06-08 11:32:24'),
('1b6453892473a467d07372d45eb05abc2031647a', '10', '[{"id":"123459","score":"9"}]', 'First Quarter', '["Grade 2","Section 1",["subject 1",""]]', 'Written Works', '2016-06-03 23:38:23'),
('356a192b7913b04c54574d18c28d46e6395428ab', '10', '[{"id":"123457","score":"9"},{"id":"123456","score":"9"},{"id":"123458","score":"8"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Performance Task', '2016-06-03 21:58:50'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '20', '[{"id":"123457","score":"10"},{"id":"123456","score":"19"},{"id":"123458","score":"19"}]', 'First Quarter', '["Grade 1","Section 1",["Mapeh 1","HEALTH-1"]]', 'Written Works', '2016-06-05 14:35:20'),
('7b52009b64fd0a2a49e6d8a939753077792b0554', '10', '[{"id":"123456","score":"10"},{"id":"123458","score":"9"},{"id":"123457","score":"8"}]', 'Third Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Performance Task', '2016-06-30 00:16:58'),
('902ba3cda1883801594b6e1b452790cc53948fda', '100', '[{"id":"123457","score":"90"},{"id":"123456","score":"87"},{"id":"123458","score":"99"}]', 'First Quarter', '["Grade 1","Section 1",["Mapeh 1","HEALTH-1"]]', 'Written Works', '2016-06-05 19:31:12'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '100', '[{"id":"123457","score":"99"},{"id":"123456","score":"98"},{"id":"123458","score":"100"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Written Works', '2016-06-06 18:09:19'),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '100', '[{"id":"123456","score":"98"},{"id":"123458","score":"99"},{"id":"123457","score":"100"}]', 'First Quarter', '["Grade 1","Section 1",["Mathematics 1",""]]', 'Performance Task', '2016-06-07 14:56:34'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '20', '[{"id":"123457","score":"18"},{"id":"123456","score":"20"},{"id":"123458","score":"20"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Performance Task', '2016-06-03 20:14:15'),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '30', '[{"id":"123456","score":"15"},{"id":"123458","score":"26"},{"id":"123457","score":"19"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Written Works', '2016-06-12 14:32:36'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '10', '[{"id":"123457","score":"8"},{"id":"123456","score":"9"},{"id":"123458","score":"10"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Written Works', '2016-06-05 18:11:57'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '20', '[{"id":"123457","score":"18"},{"id":"123456","score":"20"},{"id":"123458","score":"20"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Performance Task', '2016-06-03 20:11:56'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '100', '[{"id":"123457","score":"95"},{"id":"123456","score":"94"},{"id":"123458","score":"99"}]', 'First Quarter', '["Grade 1","Section 1",["English 1",""]]', 'Performance Task', '2016-06-06 16:01:36');



-- Table structure for `tbl_schoolinfo`-- 
CREATE TABLE IF NOT EXISTS `tbl_schoolinfo` (
`id` varchar(50) NOT NULL,
`schoolName` varchar(100) NOT NULL,
`schoolID` varchar(10) NOT NULL,
`schoolYearStart` varchar(20) NOT NULL,
`schoolYearEnd` varchar(20) NOT NULL,
`region` varchar(50) NOT NULL,
`division` varchar(50) NOT NULL,
`details` varchar(500) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_schoolinfo`-- 
INSERT INTO `tbl_schoolinfo` (`id`, `schoolName`, `schoolID`, `schoolYearStart`, `schoolYearEnd`, `region`, `division`, `details`) VALUES 
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Macabito Elementary School', '123456', '01-2016', '12-2016', '1', '1', '["df58248c414f342c81e056b40bee12d17a08bf61-1467684116.apr","bg-banner.jpg","Macabito Calasiao Pangasinan"]');



-- Table structure for `tbl_section`-- 
CREATE TABLE IF NOT EXISTS `tbl_section` (
`id` varchar(50) NOT NULL,
`section` varchar(100) NOT NULL,
`order` int(2) NOT NULL,
`year` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_section`-- 
INSERT INTO `tbl_section` (`id`, `section`, `order`, `year`) VALUES 
('1b6453892473a467d07372d45eb05abc2031647a', 'Section 4', '4', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Section 2', '2', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Section 3', '3', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Grade 1', '1', 'Section 1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Section 1', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Grade 1', '2', 'Section 1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Section 1', '1', '356a192b7913b04c54574d18c28d46e6395428ab');



-- Table structure for `tbl_student`-- 
CREATE TABLE IF NOT EXISTS `tbl_student` (
`id` varchar(50) NOT NULL,
`student_id` varchar(20) NOT NULL,
`year` varchar(20) NOT NULL,
`section` varchar(20) NOT NULL,
`date` varchar(20) NOT NULL,
`status` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_student`-- 
INSERT INTO `tbl_student` (`id`, `student_id`, `year`, `section`, `date`, `status`) VALUES 
('356a192b7913b04c54574d18c28d46e6395428ab', '123457', 'Grade 1', 'Section 1', '2016-05-25 00:19:36', '0'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '123459', 'Grade 2', 'Section 1', '2016-06-03 22:46:55', '0'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '123456', 'Grade 1', 'Section 1', '2016-05-25 00:17:44', '0'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', '123458', 'Grade 1', 'Section 1', '2016-05-25 00:30:21', '0');



-- Table structure for `tbl_studentinfo`-- 
CREATE TABLE IF NOT EXISTS `tbl_studentinfo` (
`id` varchar(50) NOT NULL,
`family_name` varchar(50) NOT NULL,
`given_name` varchar(50) NOT NULL,
`middle_name` varchar(50) NOT NULL,
`gender` varchar(10) NOT NULL,
`date_of_birth` varchar(10) NOT NULL,
`place_of_birth` varchar(100) NOT NULL,
`permanent_address` varchar(100) NOT NULL,
`citizenship` varchar(20) NOT NULL,
`height` varchar(10) NOT NULL,
`weight` varchar(10) NOT NULL,
`mother_name` varchar(100) NOT NULL,
`father_name` varchar(100) NOT NULL,
`picture` varchar(100) NOT NULL,
`date` varchar(20) NOT NULL,
`student_id` varchar(50) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_studentinfo`-- 
INSERT INTO `tbl_studentinfo` (`id`, `family_name`, `given_name`, `middle_name`, `gender`, `date_of_birth`, `place_of_birth`, `permanent_address`, `citizenship`, `height`, `weight`, `mother_name`, `father_name`, `picture`, `date`, `student_id`) VALUES 
('356a192b7913b04c54574d18c28d46e6395428ab', 'perez', 'carla carmela', 'perez', 'Female', '1994/05/25', 'Pangasinan', 'Pangasinan', 'Filipino', '140', '48', 'Mother Name', 'Father Name', 'avatar.jpg', '2016-05-25 00:19:36', '123457'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Pascual', 'Piolo', 'Gabrillo', 'Male', '1993/01/26', 'Pangasinan', 'Pangasinan', 'Filipino', '160', '43', 'Consorcia Gabrillo', 'Rufo Gabrillo Sr.', 'avatar.jpg', '2016-06-03 22:46:55', '123459'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Gabrillo', 'Rufo Jr.', 'Narcisi', 'Male', '1993/01/26', 'San Carlos Pangasinan', 'Macabito Calasiao Pangasinan', 'Filipino', '165.58', '53', 'Consorcia Gabrillo', 'Rufo Gabrillo Sr.', 'avatar.jpg', '2016-05-25 00:17:44', '123456'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Carranza', 'Baden Darwin', 'Carranza', 'Male', '1971/05/20', 'Pangasinan', 'Pangasinan', 'Filipino', '167.4', '75.5', 'Mother Name', 'Father Name', 'avatar.jpg', '2016-05-25 00:30:21', '123458');



-- Table structure for `tbl_subject`-- 
CREATE TABLE IF NOT EXISTS `tbl_subject` (
`id` varchar(50) NOT NULL,
`subject_code` varchar(20) NOT NULL,
`subject_title` varchar(1000) NOT NULL,
`subject_discription` varchar(250) NOT NULL,
`subject_sort` varchar(2) NOT NULL,
`year` varchar(50) NOT NULL,
`weight` varchar(20) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_subject`-- 
INSERT INTO `tbl_subject` (`id`, `subject_code`, `subject_title`, `subject_discription`, `subject_sort`, `year`, `weight`) VALUES 
('1b6453892473a467d07372d45eb05abc2031647a', 'FIL-1', '["Filipino 1"]', '', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[40,40,20]'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'subject-1', '["subject 1"]', 'ssss', '1', '356a192b7913b04c54574d18c28d46e6395428ab', '[40,40,20]'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'ENG-1', '["English 1"]', '', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[40,40,20]'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'SCI-1', '["Science 1"]', '', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[40,40,20]'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'MATH-1', '["Mathematics 1"]', '', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[40,40,20]'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'MAPEH-1', '["Mapeh 1",["ARTS 1","Arts 1",""],["P.E. 1","Physical Education 1",""],["MUSIC-1","Music 1",""],["HEALTH-1","Health 1",""]]', 'Mapeh - Music, Arts, Physical Education and Health', '1', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '[30,45,25]');



-- Table structure for `tbl_user`-- 
CREATE TABLE IF NOT EXISTS `tbl_user` (
`id` varchar(50) NOT NULL,
`name` varchar(100) NOT NULL,
`username` varchar(50) NOT NULL,
`password` varchar(50) NOT NULL,
`picture` varchar(60) NOT NULL,
`status` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_user`-- 
INSERT INTO `tbl_user` (`id`, `name`, `username`, `password`, `picture`, `status`) VALUES 
('01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'Rufo N. Gabrillo Jr.', 'PineApple', '2a53ebdfc88fa63438f2deb136a8c3cea0bb33ff', 'e499eddcde8da81019b1f7d4b60f050653766037-1467684086.apr', '1');



-- Table structure for `tbl_yearlevel`-- 
CREATE TABLE IF NOT EXISTS `tbl_yearlevel` (
`id` varchar(50) NOT NULL,
`title` varchar(250) NOT NULL,
`chronological` int(2) NOT NULL,
`attribute` int(1) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table `tbl_yearlevel`-- 
INSERT INTO `tbl_yearlevel` (`id`, `title`, `chronological`, `attribute`) VALUES 
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Grade 10', '10', '1'),
('1b6453892473a467d07372d45eb05abc2031647a', 'Grade 5', '5', '1'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Grade 2', '2', '1'),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Grade 4', '4', '1'),
('902ba3cda1883801594b6e1b452790cc53948fda', 'Grade 8', '8', '1'),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Grade 6', '6', '1'),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Grade 1', '1', '1'),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Grade 7', '7', '1'),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Grade 3', '3', '1'),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Grade 9', '9', '1');




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Buckup function --
-- Developed by Rufo N. Gabrillo Jr. --