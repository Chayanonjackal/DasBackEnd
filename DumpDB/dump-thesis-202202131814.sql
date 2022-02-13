-- MySQL dump 10.13  Distrib 5.5.36, for Win64 (x86)
--
-- Host: localhost    Database: thesis
-- ------------------------------------------------------
-- Server version	5.5.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `privateprediction`
--

DROP TABLE IF EXISTS `privateprediction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privateprediction` (
  `pp_id` int(11) NOT NULL AUTO_INCREMENT,
  `citizen_id` varchar(100) NOT NULL,
  `first_name_th` varchar(100) NOT NULL,
  `last_name_th` varchar(100) NOT NULL,
  `priority` varchar(100) NOT NULL,
  `gpax` varchar(100) NOT NULL,
  `pat1` varchar(100) NOT NULL,
  `pat2` varchar(100) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `school_province_name` varchar(100) NOT NULL,
  `credit_sum` varchar(100) NOT NULL,
  `onet01` varchar(100) NOT NULL,
  `onet02` varchar(100) NOT NULL,
  `onet03` varchar(100) NOT NULL,
  `onet04` varchar(100) NOT NULL,
  `onet05` varchar(100) NOT NULL,
  `gat1_current` varchar(100) NOT NULL,
  `gat2_current` varchar(100) NOT NULL,
  `predic` varchar(100) NOT NULL,
  `scoredprobabilities` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`pp_id`),
  KEY `privateprediction_fk` (`user_id`),
  CONSTRAINT `privateprediction_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privateprediction`
--

LOCK TABLES `privateprediction` WRITE;
/*!40000 ALTER TABLE `privateprediction` DISABLE KEYS */;
INSERT INTO `privateprediction` VALUES (1,'1104555112451','chas','pp','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.984685480594635',1),(2,'1104555112451','chas','pp','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.984685480594635',1),(3,'1104555112451','chas','pp','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.984685480594635',1),(5,'1104555112451','chas','pp','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.984685480594635',1),(46,'2121212121212','ฟหก','ฟหก','10','123','123','123','พระหฤทัย','กรุงเทพมหานคร','123','123','123','123','123','123','132','123','No','0.0123932408168912',38);
/*!40000 ALTER TABLE `privateprediction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentprediction`
--

DROP TABLE IF EXISTS `studentprediction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentprediction` (
  `sp_id` int(11) NOT NULL AUTO_INCREMENT,
  `citizen_id` varchar(100) NOT NULL,
  `first_name_th` varchar(100) NOT NULL,
  `last_name_th` varchar(100) NOT NULL,
  `priority` varchar(100) NOT NULL,
  `gpax` varchar(100) NOT NULL,
  `pat1` varchar(100) NOT NULL,
  `pat2` varchar(100) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `school_province_name` varchar(100) NOT NULL,
  `credit_sum` varchar(100) NOT NULL,
  `onet01` varchar(100) NOT NULL,
  `onet02` varchar(100) NOT NULL,
  `onet03` varchar(100) NOT NULL,
  `onet04` varchar(100) NOT NULL,
  `onet05` varchar(100) NOT NULL,
  `gat1_current` varchar(100) NOT NULL,
  `gat2_current` varchar(100) NOT NULL,
  `predic` varchar(100) NOT NULL,
  `scoredprobabilities` varchar(100) NOT NULL,
  `add_year` varchar(100) NOT NULL,
  PRIMARY KEY (`sp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentprediction`
--

LOCK TABLES `studentprediction` WRITE;
/*!40000 ALTER TABLE `studentprediction` DISABLE KEYS */;
INSERT INTO `studentprediction` VALUES (87,'1104555112451','ชบา','แก้ว','1','3.35','123','110','พระหฤทัยดอนเมือง','กระบี่','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.984685480594635','2020'),(88,'1104555112451','ชญา','เปรม','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.9925656914711','2022'),(89,'1212121212121','เอม','ผกา','2','12','123','123','ดอนเมืองทหารอากาศบำรุง','กาญจนบุรี','95','70.2','50','40.5','53.14','30.55','80.12','60','Yes','0.600425720214844','2022'),(91,'1104555112451','ชญา','เปรม','1','123','123','123','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','123','123','123','123','123','123','123','123','No','0.0224839448928833','2022'),(93,'1212121212121','เขมกิน','กลิ่นหอม','1','3.31','82','66','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','93.5','55','45','45','42.5','59.8','89','50','No','0.0237284395843744','2022'),(98,'1104555112451','ชญา','เปรม','1','3.35','123','110','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','95','74.5','45','37.5','53.13','43.55','78.13','60','Yes','0.9925656914711','2022'),(99,'1152455112454','เขมกิน','กลิ่นหอม','1','3.31','82','66','พระหฤทัยดอนเมือง','กรุงเทพมหานคร','93.5','55','45','45','42.5','59.8','89','50','No','0.0237284395843744','2022');
/*!40000 ALTER TABLE `studentprediction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` char(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_un` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'aom','$2a$10$QK.9MIhg8KHuaCdIM7I5tOTZ3TDvqr9oFfRfipLjaHsv2XvB2BVzS','Cha','Pr','A'),(36,'testadmin','$2a$10$28ZtOmBb6fs1lB.9BAzIMOJp7Ul.AembAUno0KX1uqMsGldRu6C5.','admin','admin','A'),(37,'testteacher','$2a$10$.agukeUa5k3d98DI/S0jw.O/vFo9DIO6VE1ayTqHq5wfrOp0FcifW','teacher','teacher','T'),(38,'admin','$2a$10$Rd0OvexbRDCj1lDdYcRcmus20lf5C/vY9qOOLRgcCLqYSz3qy9.Li','admin','admin','A'),(40,'admin2','$2a$10$3zPFHRh7n6r2CiZmJWUpxOyXTOBykbgZmJKxtC726MSvE/tHZA5..','admin2','admin2','A');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'thesis'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-13 18:14:23
