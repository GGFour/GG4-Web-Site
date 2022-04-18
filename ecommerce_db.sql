CREATE DATABASE  IF NOT EXISTS `ecommerce_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce_db`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `shopping_session` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `description` text,
  `active` tinyint(1) DEFAULT NULL,
  `starts_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'pixel dungeon','2022-04-18 13:34:30');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`user_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `game_id` int NOT NULL,
  `inventory_id` int NOT NULL,
  `discount_id` int DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` text,
  `path_to_image` varchar(255) DEFAULT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `game_id` (`game_id`),
  KEY `inventory_id` (`inventory_id`),
  KEY `discount_id` (`discount_id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `item_category` (`id`),
  CONSTRAINT `item_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `item_ibfk_3` FOREIGN KEY (`inventory_id`) REFERENCES `item_inventory` (`id`),
  CONSTRAINT `item_ibfk_4` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,2,1,1,NULL,'battle axe','This is a crude and heavy weapon. It\'s specifically designed todeal devastating blows to your enemies.','23',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(2,2,1,2,NULL,'dagger','A well balanced dagger. Sharp and short for dealing fast and effective blows to unsuspecting foes.','20',10,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(3,2,1,3,NULL,'glaive','A bladed staff weapon. This long weapon is an effective tool for keeping your foes in a distance and deal slashing hits.','31',50,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(4,2,1,4,NULL,'brass knuckles','Piece of metal designed to fit around the fingers and gripped by the hand. Increases your punching power dramatically.','17',10,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(5,2,1,5,NULL,'longsword','Widely-used standard straight sword. An accessible sword which inflicts consistent regular damage and high slash damage, making it applicable to avariety of situations.','21',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(6,2,1,6,NULL,'mace','The iron head of this weapon inflicts substantial damage','19',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(7,2,1,7,NULL,'quarterstaff','A staff of hardwood, its ends are shod with iron','16',20,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(8,2,1,8,NULL,'shortsword','It is indeed quite short, just a few inches longer, than a dagger','3',10,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(9,2,1,9,NULL,'spear','A slender wooden rod tipped with sharpened iron','30',20,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(10,2,1,10,NULL,'greatsword','Greatswords are powerful blades with a wide swing radius and long reaching attacks, enabling the wielder to target multiple opponents within theradius of the swing motion.','22',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(11,2,1,11,NULL,'war hammer','Few creatures can withstand the crushing blow of this towering mass of lead and steel, but only the strongest of adventurers can use it effectively.','24',50,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(12,1,1,12,NULL,'cloth armor','This lightweight armor offers basic protection.','25',10,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(13,1,1,13,NULL,'leather armor','Armor made from tanned monster hide. Not as light as cloth armor but provides better protection.','26',20,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(14,1,1,14,NULL,'mail armor','Interlocking metal links make for a tough but flexible suit of armor.','27',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(15,1,1,15,NULL,'plate armor','Enormous plates of metal are joined together into a suit thatprovides unmatched protection to any adventurer strong enough to bear its staggering weight.','28',50,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(16,1,1,16,NULL,'scale armor','The metal scales sewn onto a leather vest create a flexible, yet protective armor.','29',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(17,3,1,17,NULL,'golden key','The notches on this golden key are tiny and intricate. Maybe it can open some chest lock?','11',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(18,3,1,18,NULL,'iron key','This iron key is small and simple. Maybe it can open some door?','10',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(19,3,1,19,NULL,'skeleton key','This key looks serious: its head is shaped like a skull. Probably it can open some serious door.','9',30,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(20,4,1,20,NULL,'wand of amok','The purple light from this wand will make the target run amokattacking random creatures in its vicinity.','4',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(21,4,1,21,NULL,'wand of avalanche','When a discharge of this wand hits a wall (or any other solidobstacle) it causes an avalanche of stones, damaging and stunning all creatures in the affected area.','49',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(22,4,1,22,NULL,'wand of blink','This wand will allow you to teleport in the chosen direction.Creatures and inanimate obstructions will block the teleportation.','50',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(23,4,1,23,NULL,'wand of disintegration','This wand emits a beam of destructive energy, which pierces all creatures in its way. The more targets it hits, the more damage it inflicts to each of them.','51',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(24,4,1,24,NULL,'wand of firebolt','This wand unleashes bursts of magical fire. It will ignite flammable terrain, and will damage and burn a creature it hits.','52',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(25,4,1,25,NULL,'wand of flock','A flick of this wand summons a flock of magic sheep, creatingtemporary impenetrable obstacle.','53',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(26,4,1,26,NULL,'wand of lightning','This wand conjures forth deadly arcs of electricity, which deal damage to several creatures standing close to each other.','54',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(27,4,1,27,NULL,'wand of magic missile','This wand launches missiles of pure magical energy, dealing moderate damage to a target creature.','55',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(28,4,1,28,NULL,'wand of poison','The vile blast of this twisted bit of wood will imbue its target with a deadly venom. A creature that is poisoned will suffer periodic damageuntil the effect ends. The duration of the effect increases with the level of the staff.','56',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(29,4,1,29,NULL,'wand of reach','This utility wand can be used to grab objects from a distanceand to switch places with enemies. Waves of magic force radiated from it will affect all cells on their way triggering traps, trampling high vegetation, opening closed doors and closing open ones.','69',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(30,4,1,30,NULL,'wand of regrowth','When life ceases new life always begins to grow... The eternal cycle always remains!','70',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(31,4,1,31,NULL,'wand of slowness','This wand will cause a creature to move and attack at half its ordinary speed until the effect ends','71',40,'2022-04-18 13:34:30','2022-04-18 13:34:30'),(32,4,1,32,NULL,'wand of teleportation','A blast from this wand will teleport a creature against its will to a random place on the current level.','72',40,'2022-04-18 13:34:30','2022-04-18 13:34:30');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_category`
--

DROP TABLE IF EXISTS `item_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_category`
--

LOCK TABLES `item_category` WRITE;
/*!40000 ALTER TABLE `item_category` DISABLE KEYS */;
INSERT INTO `item_category` VALUES (1,'armor','','2022-04-18 13:34:30'),(2,'weapon','','2022-04-18 13:34:30'),(3,'key','','2022-04-18 13:34:30'),(4,'wand','','2022-04-18 13:34:30'),(5,'potion','','2022-04-18 13:34:30'),(6,'other','','2022-04-18 13:34:30');
/*!40000 ALTER TABLE `item_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_inventory`
--

DROP TABLE IF EXISTS `item_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL DEFAULT '100',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_inventory`
--

LOCK TABLES `item_inventory` WRITE;
/*!40000 ALTER TABLE `item_inventory` DISABLE KEYS */;
INSERT INTO `item_inventory` VALUES (1,100,'2022-04-18 13:34:30'),(2,100,'2022-04-18 13:34:30'),(3,100,'2022-04-18 13:34:30'),(4,100,'2022-04-18 13:34:30'),(5,100,'2022-04-18 13:34:30'),(6,100,'2022-04-18 13:34:30'),(7,100,'2022-04-18 13:34:30'),(8,100,'2022-04-18 13:34:30'),(9,100,'2022-04-18 13:34:30'),(10,100,'2022-04-18 13:34:30'),(11,100,'2022-04-18 13:34:30'),(12,100,'2022-04-18 13:34:30'),(13,100,'2022-04-18 13:34:30'),(14,100,'2022-04-18 13:34:30'),(15,100,'2022-04-18 13:34:30'),(16,100,'2022-04-18 13:34:30'),(17,100,'2022-04-18 13:34:30'),(18,100,'2022-04-18 13:34:30'),(19,100,'2022-04-18 13:34:30'),(20,100,'2022-04-18 13:34:30'),(21,100,'2022-04-18 13:34:30'),(22,100,'2022-04-18 13:34:30'),(23,100,'2022-04-18 13:34:30'),(24,100,'2022-04-18 13:34:30'),(25,100,'2022-04-18 13:34:30'),(26,100,'2022-04-18 13:34:30'),(27,100,'2022-04-18 13:34:30'),(28,100,'2022-04-18 13:34:30'),(29,100,'2022-04-18 13:34:30'),(30,100,'2022-04-18 13:34:30'),(31,100,'2022-04-18 13:34:30'),(32,100,'2022-04-18 13:34:30');
/*!40000 ALTER TABLE `item_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `items` text NOT NULL,
  `total` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_session`
--

DROP TABLE IF EXISTS `shopping_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_session`
--

LOCK TABLES `shopping_session` WRITE;
/*!40000 ALTER TABLE `shopping_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(32) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `lastname` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `pswd` varchar(255) NOT NULL,
  `path_to_logo` varchar(32) DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `usertype_id` int NOT NULL DEFAULT '1',
  `session_id` int DEFAULT NULL,
  `coins` int NOT NULL DEFAULT '200',
  `high_score` int DEFAULT NULL,
  `subscribed` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `firstname` (`firstname`),
  UNIQUE KEY `lastname` (`lastname`),
  UNIQUE KEY `username` (`username`),
  KEY `payment_id` (`payment_id`),
  KEY `usertype_id` (`usertype_id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `user_payment` (`id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`usertype_id`) REFERENCES `user_type` (`id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `shopping_session` (`id`),
  CONSTRAINT `user_chk_1` CHECK ((`coins` >= 0)),
  CONSTRAINT `user_chk_2` CHECK ((`high_score` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_payment`
--

DROP TABLE IF EXISTS `user_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_types` varchar(32) DEFAULT NULL,
  `provider` varchar(32) DEFAULT NULL,
  `account_number` int DEFAULT NULL,
  `expiry` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment`
--

LOCK TABLES `user_payment` WRITE;
/*!40000 ALTER TABLE `user_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'user'),(2,'admin'),(3,'developer');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 16:35:22
