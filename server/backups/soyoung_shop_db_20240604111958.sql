-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: soyoung_shop_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id_brand` int(11) NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'IsNtree','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Innisfree','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Cosrx','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'The Ordinary','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Etude House','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'Missha','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,'Dr. Jart+','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,'Laneige','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,'Clio','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,'Sulwhasoo','0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,'Amuse','0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,'Anua','0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,'Banila Co','0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,'JMsolution','0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,'FRUDIA','2024-05-29 07:45:00','2024-05-29 07:45:00'),(17,'Round Lab','2024-05-29 07:49:20','2024-05-29 07:49:20'),(18,'Ma:nyo','2024-05-29 07:53:15','2024-05-29 07:53:15'),(19,'Fraijour','2024-05-30 18:00:55','2024-05-30 18:00:55'),(20,'Dr.Ceuracle','2024-05-30 18:05:22','2024-05-30 18:05:22'),(21,'DR.G','2024-05-30 18:21:11','2024-05-30 18:21:11'),(22,'3W Clinic','2024-06-01 09:05:10','2024-06-01 09:05:10');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartitems` (
  `id_cart_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_cart` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `cart_item_quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_cart_item`),
  KEY `id_cart` (`id_cart`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id_cart`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
INSERT INTO `cartitems` VALUES (31,4,3,1,'2024-06-04 07:34:45','2024-06-04 07:34:45');
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id_cart` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (2,2,'2024-05-28 12:29:13','2024-05-28 12:29:13'),(3,3,'2024-05-29 08:24:17','2024-05-29 08:24:17'),(4,4,'2024-05-30 07:22:06','2024-05-30 07:22:06'),(5,5,'2024-06-01 09:42:48','2024-06-01 09:42:48'),(6,6,'2024-06-01 09:44:21','2024-06-01 09:44:21'),(7,7,'2024-06-01 09:49:59','2024-06-01 09:49:59'),(8,8,'2024-06-01 10:39:45','2024-06-01 10:39:45'),(9,9,'2024-06-03 16:01:29','2024-06-03 16:01:29');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `id_section` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_category`),
  KEY `id_section` (`id_section`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`id_section`) REFERENCES `sections` (`id_section`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,1,'Очищающие средства','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,'Тонизирование','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,'Основной уход','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,'Солнцезащитные средства','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,1,'Маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,1,'Средства от несовершенств','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,1,'Наборы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,2,'Для тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,2,'Для рук','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,2,'Для ног','0000-00-00 00:00:00','0000-00-00 00:00:00'),(11,2,'Дополнительно','0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,3,'Шампуни','0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,3,'Кондиционеры для волос','0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,3,'Уход за волосами','0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,4,'Аксессуары для макияжа','0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,4,'Основа под макияж','0000-00-00 00:00:00','0000-00-00 00:00:00'),(17,4,'Тональные средства','0000-00-00 00:00:00','0000-00-00 00:00:00'),(18,4,'Для глаз и бровей','0000-00-00 00:00:00','0000-00-00 00:00:00'),(19,4,'Для губ','0000-00-00 00:00:00','0000-00-00 00:00:00'),(20,4,'Румяна','0000-00-00 00:00:00','0000-00-00 00:00:00'),(21,4,'Скульпторы и хайлайтеры','0000-00-00 00:00:00','0000-00-00 00:00:00'),(22,4,'Пудры','0000-00-00 00:00:00','0000-00-00 00:00:00'),(23,4,'Фиксаторы макияжа','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (10,'user1@mail.ru','супееееееерррррррр','2024-05-29 08:27:39','2024-05-29 08:27:39');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iteminfo`
--

DROP TABLE IF EXISTS `iteminfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iteminfo` (
  `id_item_info` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `description` text NOT NULL,
  `skin_type` varchar(100) NOT NULL,
  `volume` int(11) NOT NULL,
  `components` text DEFAULT NULL,
  `applying` text NOT NULL,
  `ingredients` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_item_info`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `iteminfo_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteminfo`
--

LOCK TABLES `iteminfo` WRITE;
/*!40000 ALTER TABLE `iteminfo` DISABLE KEYS */;
INSERT INTO `iteminfo` VALUES (1,1,'Крем-эссенция с ультра защитой от солнца SPF50+ PA++++ Лёгкий защитный крем-эссенция с максимальной защитой от солнца. Имеет текстуру флюида, мягко покрывает кожу, быстро впитывается, не оставляя липкости и не выбеливая кожу.\n\nСредство на основе смешанных (физических и химических) SPF фильтров. При нахождении на открытом солнце более 3 часов необходимо обновление.\nблокирует воздействие UVA- и UVB-лучей,\nподходит для ежедневного применения,\nоказывает увлажняющее действие,\nСоздает влагоудерживающий барьер.','для всех',50,'Гиалуроновая кислота разного молекулярного веса обеспечивает интенсивное и длительное увлажнение кожи во всех слоях.\nNATURAL PROTECTOR - запатентованный компонент для надежной защиты кожи от ожогов, а также от потери влаги.','После основного ухода нанести необходимое количество средства на открытые участки кожи, распределить до полного впитывания. Обновлять по мере необходимости в течение дня.','Water, Propanediol, Ethylhexyl Methoxycinnamate, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, C12-15 Alkyl Benzoate, Niacinamide, Titanium Dioxide, Polyglyceryl-2 Stearate, Cetyl Alcohol, Ethylhexyl Triazone, Cyclopentasiloxane, Stearyl Alcohol, Silica, Glyceryl Stearate, Cetearyl Olivate, Polysorbate 60, Glyceryl Caprylate, Aluminum Hydroxide, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Sorbitan Olivate, Polyhydroxystearic Acid, Methicone, Myristyl Alcohol, Adenosine, Sorbitan Isostearate, Lauryl Alcohol, Sodium Hyaluronate, Vaccinium Angustifolium (Blueberry) Fruit Extract, Butylene Glycol, Malpighia Emarginata (Acerola) Fruit Extract, Coco-Caprylate/Caprate, Vitis Vinifera (Grape) Seed Oil, Prunus Armeniaca (Apricot) Kernel Oil, Propylene Glycol, Biosaccharide Gum-4, Salix Alba (Willow) Bark Extract, Origanum Vulgare Leaf Extract, Mangifera Indica (Mango) Fruit Extract, Hyaluronic Acid, Garcinia Mangostana Peel Extract, Chamaecyparis Obtusa Leaf Extract, Solanum Lycopersicum (Tomato) Seed Oil, Scutellaria Baicalensis Root Extract, Punica Granatum Seed Oil, Portulaca Oleracea Extract, Mangifera Indica (Mango) Seed Oil, Lactobacillus/Soybean Ferment Extract, Citrus Paradisi (Grapefruit) Seed Oil, Cinnamomum Cassia Bark Extract, Tocopherol, Tocopheryl Acetate, Disodium EDTA, Ethylhexylglycerin, 1,2-Hexanediol, Phenoxyethanol, Chlorphenesin, Fragrance','2024-05-29 07:46:36','2024-05-29 07:46:36'),(2,2,'Остаточный срок годности до 2025/01/19\n\nCолнцезащитный крем придает тусклой коже сияние и защищает ее от УФ-излучения сразу же при его нанесении.\nСредство на основе смешанных (физических и химических) SPF фильтров. При нахождении на открытом солнце более 3 часов необходимо обновление.Надежно защищает кожу от ультрафиолета, предотвращая гиперпигментацию, фотостарение и ожоги.\nОказывает мягкое увлажняющее действие, предотвращая потерю влаги.\nВыравнивает тон кожи и придаёт здоровый сияющий финиш.','для кожи, склонной к тусклости и обезвоженности.',50,'Ниацинамид оказывает мягкое осветляющее действие, способствует выравниванию тона и борьбе с гиперпигментацией.\nЖемчужная пудра способствует выравниванию тона кожи, оказывает лёгкое осветляющее действие, придаёт сияние и здоровый цвет лица.\nКомплекс растительных экстрактов оказывает антиоксидантное и тонизирующее действие, способствует увлажнению кожи и выравниванию тона.','После основного ухода нанести необходимое количество средства на открытые участки кожи, распределить до полного впитывания. Обновлять по мере необходимости в течение дня.','Water, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Glycerin, Dipropylene Glycol, Dibutyl Adipate, C12-15 Alkyl Benzoate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Niacinamide, Ethylhexyl Triazone, Glyceryl Stearate, Cetearyl Alcohol, Cetyl Alcohol, Polysorbate 60, Dimethicone, PEG-100 Stearate, Aluminum Hydroxide, Cetearyl Olivate, Glyceryl Caprylate, Sorbitan Olivate, Polyhydroxystearic Acid, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Stearyl Alcohol, Cetearyl Glucoside, Methicone, Myristyl Alcohol, Adenosine, Lauryl Alcohol, Sorbitan Isostearate, Pearl Powder, Citrus Unshiu Peel Extract, Malpighia Emarginata (Acerola) Fruit Extract, Coco-Caprylate/Caprate, Butylene Glycol, Glucose, Macadamia Ternifolia Seed Oil, Vitis Vinifera (Grape) Seed Oil, Prunus Armeniaca (Apricot) Kernel Oil, Propylene Glycol, PEG-5 Rapeseed Sterol, Cholesterol, Brassica Campestris (Rapeseed) Sterols, Biosaccharide Gum-4, Mangifera Indica (Mango) Fruit Extract, Hydrogenated Lecithin, Glutathione, Garcinia Mangostana Peel Extract, Ceteth-5, Ceteth-3, Solanum Lycopersicum (Tomato) Seed Oil, Sodium Ascorbyl Phosphate, Punica Granatum Seed Oil, Mangifera Indica (Mango) Seed Oil, Citrus Paradisi (Grapefruit) Seed Oil, Cetyl Phosphate, Tocopherol, Tocopheryl Acetate, Ethylhexylglycerin, 1,2-Hexanediol, Disodium EDTA, Chlorphenesin, Phenoxyethanol, Fragrance','2024-05-29 07:47:59','2024-05-29 07:47:59'),(3,3,'Смягчающая пенка-скраб для умывания с экстрактом соевых бобов эффективно очищает кожу и деликатно отшелушивает.\n','для всех типов кожи без повреждений и воспалительных процессов.',150,'Экстракт сои укрепляет барьерную функцию, оказывает регенерирующее и разглаживающее действие.\nРисовая и овсяная пудры оказывают отшелушивающее действие, способствуют обновлению кожи.\nСквалан восстанавливает барьерную функцию кожи, активно питает и смягчает, устраняя сухость и шелушения и препятствуя потере влаги.\nКерамиды активно восстанавливают и укрепляют защитный барьер, защищают от негативного воздействия окружающей среды, препятствуют трансэпидермальной потере влаги.\nЛецитин способствует восстановлению барьерной функции кожи, предотвращает раздражения и обезвоженность.','Вспенить необходимое количество средства в ладонях или с помощью аксессуаров, распределить пену мягкими массирующими движениями на лице, затем смыть водой комфортной температуры.\n\n','Water, Glycerin , Sodium Cocoyl Isethionate, Potassium Cocoyl Glycinate, Cetearyl Alcohol , Sodium C14-16 Olefin Sulfonate, Acrylates Copolymer, Sodium Cocoyl Glutamate, Hydrogenated Coconut Acid, Phaseolus Angularis Seed Powder, Glycine Max (Soybean) Seed Extract, Oryza Sativa (Rice) Powder, Avena Sativa (Oat) Kernel Flour, Coix Lacryma-Jobi Ma-yuen Seed Powder, Phaseolus Radiatus Seed Powder, Squalane, Limnanthes Alba (Meadowfoam) Seed Oil, Ceramide NP, Phytosphingosine , Hydrogenated Lecithin , Sodium Isethionate, Potassium Benzoate, Butylene Glycol , Polyquaternium-67, Hexadecene, 1,2-Hexanediol, Trisodium Ethylenediamine Disuccinate, Tetradecene, Sorbitol, Citric Acid','2024-05-29 07:50:36','2024-05-29 07:50:36'),(4,4,'Успокаивающая пенка для умывания с янтарной кислотой деликатно очищает кожу лица без раздражений и стянутости. Мягко и бережно очищает кожу от излишков себума и поверхностных загрязнений, не вызывая чувство стянутости.\nУспокаивает кожу в процессе очищения, помогает в работе с воспалениями, покраснениями и раздражениями.\nПомогает деликатно отшелушивать ороговевший слой клеток, стимулируя процессы обновления.\nРегулирует выработку себума, предотвращая появление жирного блеска и загрязнение пор.\n','для всех',150,'Экстракт хауттюйнии сердцевидной обеспечивает активное успокаивающее и противовоспалительное действие, снимая покраснения и устраняя высыпания.\nЯнтарная кислота оказывает противовоспалительное и заживляющее действие, очищает поры от излишков себума и способствует выравниванию тона кожи.\nЭкстракт цинанхума оказывает укрепляющее действие, помогает снять раздражения и предотвращает нарушение барьерной функции кожи.\nЭкстракт алтея оказывает смягчающее и успокаивающее действие.\nСалициловая кислота оказывает противовоспалительное и себорегулирующее действие, устраняет покраснения и растворяет излишки себума, способствует сужению пор.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.','Вспенить необходимое количество средства в ладонях или с помощью аксессуаров, распределить пену мягкими массирующими движениями на лице, затем смыть водой комфортной температуры.','Water, Disodium Cocoamphodiacetate, Sodium Cocoyl Alaninate, Sodium Methyl Cocoyl Taurate, Glycerin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Disodium 2-Sulfolaurate, Sodium Chloride, Methylpropanediol, Houttuynia Cordata Extract, Quillaja Saponaria Bark Extract, Cynanchum Atratum Extract, Althaea Rosea Flower Extract, Chitosan, 1,2-Hexanediol, Caprylyl Glycol, Tromethamine, Coco-Glucoside, Panthenol, Salicylic Acid, Succinic Acid, Butylene Glycol, Lauryl Hydroxysultaine, Polyglyceryl-4 Caprate, Sodium Cocoyl Isethionate, Sodium Citrate, Sodium Phytate, Hexylene Glycol, Ethylhexylglycerin, Citric Acid, Protease, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Ceramide NP, Dipropylene Glycol, Pentylene Glycol, Cholesterol, Fragrance(Parfum)','2024-05-29 07:52:16','2024-05-29 07:52:16'),(5,5,'Мягкая пенка для умывания с содой деликатно очищает поры от загрязнений и излишков себума. Мягко очищает кожу без стянутости, убирает излишки себума и другие виды загрязнений.\nУспокаивает и смягчает кожу в процессе очищения, препятствует раздражениям и покраснениям.\nМягко регулирует работу сальных желёз, способствует сужению пор.\n','для всех типов кожи',150,'Экстракт алоэ оказывает смягчающее, увлажняющее и успокаивающее действие, регенерирует и снимает покраснения.\nЭкстракт брокколи оказывает антиоксидантное действие, защищает кожу от воздействия окружающей среды и свободных радикалов, повышает эффективность УФ-защиты.\nЭкстракт базилика деликатно регулирует работу сальных желёз, предотвращает жирный блеск и помогает в поддержании чистоты пор.\nЭкстракт полыни снижает чувствительность, устраняет покраснения и раздражения.\nРисовая пудра оказывает деликатное отшелушивающее действие, способствует обновлению кожи.\nСода эффективно очищает кожу от излишков себума, оказывает отшелушивающее действие.','Вспенить необходимое количество средства в ладонях или с помощью аксессуаров, распределить пену мягкими массирующими движениями на лице, затем смыть водой комфортной температуры.','Purified water, sodium cocoyl isethionate, glycerin, glyceryl stearate, stearyl alcohol, coco-betaine, potassium cocoyl glycinate, sodium methyl cocoyl taurate, cape aloe leaf extract, soap grass leaf extract, spinach Extract, Cabbage Extract, Broccoli Extract, Okra Fruit Extract, Eggplant Fruit Extract, Turmeric Root Extract, Holy Basil Leaf Extract, True Coral Extract, Peony Extract, Artemisia Extract, Sangujeolcho Extract, Herbaceous Plant Extract, Motherwort Extract, Lavender Pollen, Butyl Len glycol, drumstick seed oil, peony flower extract, pumpkin powder, rice powder, mung bean powder, fresh herb leaf/stem extract, mugwort leaf water, Indian mulberry leaf extract, malt extract, Indian mulberry flower extract, sodium bicarbonate , Quillaja Bark Extract, Ivy God Fruit Extract, Ceramide NP, Acorn Powder, Panthenol, Sodium Chloride, Coco-Glucoside, Sodium Myristoyl Glutamate, Ethylhexylglycerin, Citric Acid, Caprylyl Glycol, 1,2 -Hexanediol, rosemary leaf oil, bergamot oil, orange peel oil, limonene, linalool','2024-05-29 07:54:14','2024-05-29 07:54:14'),(6,6,'Успокаивающий тонер для лица с экстрактом хауттюйнии обеспечивает комфортное глубокое увлажнение кожи, устранение покраснений и раздражений, а также работу с воспалениями. Глубоко увлажняет и смягчает кожу, устраняя сухость и обезвоженность, предотвращает потерю влаги и восстанавливает её баланс после умывания.\nАктивно успокаивает кожу, оказывает интенсивное противовоспалительное действие, устраняя покраснения, раздражения и высыпания.\nМягко отшелушивает и регулирует работу сальных желёз, предотвращая жирный блеск и расширенные поры.\n','для всех типов кожи, склонной к покраснениям и раздражениям.',250,'Экстракт хауттюйнии сердцевидной обеспечивает активное успокаивающее и противовоспалительное действие, снимая покраснения и устраняя высыпания.\nБетаин глубоко увлажняет кожу, укрепляет защитную функцию кожи, оказывает смягчающее действие и укрепляет клеточные мембраны.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nЭкстракт сахарного тростника деликатно обновляет клетки эпидермиса, способствует разглаживанию текстуры кожи и усиливает проникновение активных компонентов.\nЭкстракт портулака снимает воспаления, успокаивает кожу и снижает её чувствительность, а также регулирует работу сальных желёз.\nЭкстракт ромашки обладает противовоспалительными, антибактериальными и успокаивающими свойствами, способствует улучшению микроциркуляции.\nЭкстракт винограда оказывает поросужающее и себорегулирующее действие.\nЭкстракт яблока оказывает мягкое отшелушивающее, поросужающее и антиоксидантное действие.\nЦентелла азиатская активно успокаивает кожу, снимает покраснения и раздражения, снижает чувствительность и оказывает смягчающее действие.','В качестве первого этапа ухода нанести необходимое количество средства на очищенную кожу лица с помощью хлопкового диска или ладоней, распределить до полного впитывания, затем перейти к остальным этапам ухода.','Houttuynia Cordata Extract (77%), purified water, 1,2-hexanediol, glycerin, betaine, centella asiatica extract, chest tree extract, burdock root extract, mud mushroom extract, purslane extract, grape extract, apple extract, sugar cane extract , panthenol, matricaria flower extract, sodium hyaluronate, hydroxypropyl trimonium hyaluronate, hydrolyzed hyaluronic acid, sodium acetylated hyaluronate, hyaluronic acid, Sodium hyaluronate crosspolymer, potassium hyaluronate, methyl propanediol, butylene glycol, isopentyldiol, acrylate/C10-30 alkyl acrylate crosspolymer, tromethamine, disodium EDTA','2024-05-29 07:56:14','2024-05-29 07:56:14'),(7,7,'Питательный молочный тонер для лица с экстрактом корня ямса обеспечивает мягкость и упругость кожи, а также ровный тон.\nПреимущества: \nГлубоко питает и увлажняет кожу, устраняет сухость и шелушения, препятствуя их возникновению.\nПомогает укрепить барьерную функцию кожи и защитить её от потери влаги и внешнего воздействия.\nСпособствует выравниванию тона кожи, препятствует гиперпигментации и потере упругости.','для всех типов кожи.',200,'Экстракт корня ямса оказывает мощное антиоксидантное и противовоспалительное действие, защищает кожу от преждевременного старения.\nМасло семян пенника лугового обеспечивает активное питание кожи, способствует сохранению упругости и гладкости кожи.\nМасло макадами активно питает и смягчает кожу, восстанавливает защитный барьер и препятствует потере влаги.\nМасло арганы глубоко питает кожу, способствует устранению сухости и шелушений, препятствуя возрастным изменениям.\nКерамиды активно восстанавливают и укрепляют защитный барьер, защищают от негативного воздействия окружающей среды, препятствуют трансэпидермальной потере влаги.\nЛецитин способствует восстановлению барьерной функции кожи, предотвращает раздражения и обезвоженность.\nЭкстракт сои укрепляет барьерную функцию, оказывает регенерирующее и разглаживающее действие.\nРисовые экстракты глубоко питают кожу, замедляют процессы старения, сохраняя эластичность, а также выравнивают тон.\n','В качестве первого этапа ухода нанести необходимое количество средства на очищенную кожу лица с помощью хлопкового диска или ладоней, распределить до полного впитывания, затем перейти к остальным этапам ухода.','Dioscorea Japonica Root Extract, Glycerin, Butylene Glycol, 1,2-Hexanediol, Water, Trehalose, Panthenol, Helianthus Annuus (Sunflower) Seed Oil, Limnanthes Alba (Meadowfoam) Seed Oil, Macadamia Ternifolia Seed Oil, Argania Spinosa Kernel Oil, Inulin Lauryl Carbamate, Sodium Surfactin, Ceramide NP, Cholesterol, Stearic Acid, Deoxyphytantriyl Palmitamide MEA, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Hibiscus Esculentus Fruit Extract, Nelumbo Nucifera Root Extract, Undaria Pinnatifida Extract, Laminaria Japonica Extract, Glycine Max (Soybean) Seed Extract, Cocos Nucifera (Coconut) Fruit Extract, Oryza Sativa (Rice) Extract, Prunus Amygdalus Dulcis (Sweet Almond) Seed Extract, Avena Sativa (Oat) Meal Extract, Malt Extract, Pentylene Glycol, Caprylyl Glycol, Hydroxyacetophenone, Sodium Polyacrylate, Citric Acid, Disodium EDTA','2024-05-29 07:57:58','2024-05-29 07:57:58'),(8,8,'Увлажняющий тонер с гиалуроновой кислотой восполняет запас влаги после умывания и предотвращает обезвоживание кожи лица.\nПреимущества: \nГлубоко увлажняет и освежает кожу, устраняет обезвоженность и стянутость после умывания и усиливает основной уход.\nУспокаивает кожу, снимает раздражения и покраснения, препятствует воспалительным процессам.\nСпособствует поддержанию барьерной функции и упругости кожи.','для всех типов кожи',200,'Гиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.\nТрегалоза способствует усилению барьерных функций кожи, устраняет шелушения и покраснения.\nЭкстракт корня алтея оказывает смягчающее и успокаивающее действие.\nЭкстракт алоэ оказывает смягчающее, увлажняющее и успокаивающее действие, регенерирует и снимает покраснения.\nБерезовый сок оказывает освежающее и тонизирующее действие, снимает раздражения, ускоряет процессы заживления.\nЭкстракт портулака снимает воспаления, успокаивает кожу и снижает её чувствительность, а также регулирует работу сальных желёз.\nБета-глюкан восстанавливает защитный барьер кожи, способствует снятию покраснений и препятствует потере влаги.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.','В качестве первого этапа ухода нанести необходимое количество средства на очищенную кожу лица с помощью хлопкового диска или ладоней, распределить до полного впитывания, затем перейти к остальным этапам ухода.','Water, Propanediol, 1,2-Hexanediol, Sodium Hyaluronate, Trehalose, Sodium PCA, Glycerin, HyaluronicAcid, Aloe Barbadensis Leaf Extract, Althaea Rosea Root Extract, Betula Alba Juice, Portulaca Oleracea Extract, Hydrolyzed Sodium Hyaluronate, Beta-Glucan, Panthenol, Pentylene Glycol, Caprylyl Glycol, Butylene Glycol','2024-05-29 08:00:26','2024-05-29 08:00:26'),(9,9,'Восстанавливающий крем для лица с муцином улитки глубоко увлажняет и регенерирует кожу лица. Глубоко увлажняет и питает кожу без ощущения жирной плёнки, устраняет сухость и шелушения.\nСпособствует восстановлению и поддержанию упругости и эластичности кожи, разглаживает рельеф.\nОказывает успокаивающее и регенерирующее действие.','для всех типов кожи',100,'Муцин улитки способствует регенерации тканей, оказывает смягчающее и заживляющее действие, препятствует возрастным изменениям.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.\nАллантоин оказывает разглаживающее действие, улучшает и выравнивает текстуру кожи.\n Пантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nАденозин улучшает микроциркуляцию, оказывает антивозрастное и регенерирующее действие.','Нанести необходимое количество средства на очищенную и тонизированную кожу лица на последнем этапе ухода, мягко распределить до полного впитывания.','Snail Secretion Filtrate, Betaine, Caprylic/Capric Triglyceride, Cetearyl Olivate, Sorbitan Olivate, Sodium Hyaluronate, Cetearyl Alcohol, Stearic acid, Arginine, Dimethicone, Carbomer, Panthenol, Allantoin, Sodium Polyacrylate, Xanthan Gum, Ethyl Hexanediol, Adenosine, Phenoxyethanol.','2024-05-29 08:02:42','2024-05-29 08:02:42'),(10,10,'Обновляющий крем для лица с ретинолом направлен на эффективное разглаживающее и действие и предотвращение возрастных изменений. Ускоряет клеточное обновление кожи, препятствует появлению неровностей рельефа и морщин.\nПредотвращает потерю влаги, способствуя сохранению гладкости и упругости кожи.\nОказывает регенерирующее действие, способствует устранению покраснений и выравниванию тона кожи.\n','для всех типов кожи',20,'Пантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nМасло ши глубоко питает кожу, устраняет сухость и шелушения, восстанавливает и укрепляет защитный барьер, препятствуя потере влаги.\nЛецитин способствует восстановлению барьерной функции кожи, предотвращает раздражения и обезвоженность.\nВитамин Е оказывает мощное антиоксидантное действие, препятствуя возрастным изменениям и защищает кожу от свободных радикалов.\nРетинол активирует процесс обновления клеток, разглаживая мелкие морщины, стимулируя регенерацию тканей, выравнивает рельеф и тон кожи.\nГлутатион оказывает осветляющее действие, устраняет и предотвращает пигментные пятна, выравнивает тон кожи.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.','В конце вечернего ухода нанести необходимое количество средства на очищенную и тонизированную кожу лица на последнем этапе ухода, мягко распределить до полного впитывания.','Water, Caprylic/Capric Triglyceride, Propanediol, Glycerin, Tocopheryl Acetate, Cetearyl Alcohol, Trehalose, Panthenol, Butyrospermum Parkii (Shea) Butter, Glycine Soja (Soybean) Oil, Ammonium Acryloyldimethyltaurate/VP Copolymer, Dimethicone, Glyceryl Polymethacrylate, Helianthus Annuus (Sunflower) Seed Oil, Polyglyceryl-10 Stearate, Hydrogenated Lecithin, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Carbomer, Tromethamine, Glyceryl Stearate, Polysilicone-11, Sodium Sulfite, Tocopherol, Daucus Carota Sativa (Carrot) Root Extract, Retinol(0.1%), Allantoin, Glyceryl Caprylate, Oryza Sativa (Rice) Bran Wax, Tocotrienols, Stearic Acid, Polyglyceryl-3 Methylglucose Distearate, Palmitic Acid, Disodium EDTA, Ethylhexylglycerin, Adenosine, Sorbitan Isostearate, Elaeis Guineensis (Palm) Oil, BHT, Beta-Carotene, Myristic Acid, Lauric Acid, Ascorbic Acid, Limnanthes Alba (Meadowfoam) Seed Oil, 3-O-Ethyl Ascorbic Acid, Glutathione, Sodium Hyaluronate, 1,2-Hexanediol, Hydrolyzed Hyaluronic Acid, Sodium Hyaluronate Crosspolymer, Hyaluronic Acid, Sodium Acetylated Hyaluronate','2024-05-29 08:03:57','2024-05-29 08:03:57'),(11,11,'Гидрофильное масло с центеллой мягко растворяет стойкий макияж и сильные загрязнения.\nУспокаивает, увлажняет и охлаждает кожу, обеспечивая мягкое, но эффективное очищение.\nИдеально подходит для ежедневного использования, очищающее масло удаляет до 99% загрязняющих веществ окружающей среды, включая мелкую пыль. \nПомогает сделать кожу чистой и свежей, не оставляя ощущения жирности.\n','для всех типов кожи',200,'Комплекс масел активно питает кожу лица, восстанавливает и укрепляет защитный барьер, препятствует сухости и шелушениям.\nВитамин Е оказывает мощное антиоксидантное действие, препятствуя возрастным изменениям и защищает кожу от свободных радикалов\nЦентелла азиатская активно успокаивает кожу, снимает покраснения и раздражения, снижает чувствительность и оказывает смягчающее действие','Мягкими массирующими движениями нанесите необходимое количество очищающего масла на сухое лицо. Добавьте немного воды и массируйте еще 30 секунд. Тщательно промойте теплой водой.','Ethylhexyl Palmitate, Sorbeth-30 Tetraoleate, Triethylhexanoin, Glycine Soja (Soybean) Oil, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Citrus Aurantifolia (Lime) Oil, Citrus Limon (Lemon) Peel Oil, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Tocopherol, Helianthus Annuus (Sunflower) Seed Oil, Caprylyl Glycol, Ethylhexylglycerin, Avena Sativa (Oat) Kernel Oil, Olea Europaea (Olive) Fruit Oil, Oenothera Biennis (Evening Primrose) Oil, Persea Gratissima (Avocado) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Water, 1,2-Hexanediol, Centella Asiatica Extract, Centella Asiatica Leaf Extract, Centella Asiatica Root Extract, Pinus Pinaster Bark Extract, Asiaticoside, Asiatic Acid, Madecassoside, Madecassic Acid.','2024-05-29 08:06:38','2024-05-29 08:06:38'),(12,12,'Очищающее гидрофильное масло с экстрактом полыни очищает кожу от декоративной косметики и загрязнений, накопившихся в течение дня, оказывает успокаивающий эффект и способствует себорегуляции.\n\nГлубоко очищает кожу, растворяя все виды декоративной косметики и солнцезащитных средств.\n\nРастворяет излишки себума и очищает кожу от загрязнений.\n\nОказывает успокаивающее и себорегулирующее действие.','кожи, склонной к повышенной выработке себума и расширенным порам, а также покраснениям.',210,'Масло бергамота устраняет воспалительные процессы, способствует себорегуляции и сужению пор, освежает и выравнивает тон.\n\nЭкстракт полыни снижает чувствительность, устраняет покраснения и раздражения.\n\nСалициловая кислота оказывает противовоспалительное и себорегулирующее действие, устраняет покраснения и растворяет излишки себума, способствует сужению пор.\n\nКомплекс масел сохраняет защитный барьер при очищении кожи, препятствует сухости и шелушениям.\n\nЭкстракт солодки оказывает противовоспалительное и успокаивающее действие, способствует снятию покраснений и раздражений, выравнивает тон кожи.\n\nЭкстракт зеленого чая оказывает антиоксидантное и увлажняющее действие, защищает кожу от свободных радикалов и успокаивает покраснения.\n\nЭкстракт папайи отшелушивает мертвые клетки, выравнивает рельеф кожи, очищает, стимулирует регенерацию.\n\nЭкстракт алоэ оказывает смягчающее, увлажняющее и успокаивающее действие, регенерирует и снимает покраснения.','Нанести необходимое количество средства на сухое лицо сухими руками. Мягко распределить массирующими движениями до полного растворения макияжа, смыть теплой водой.','Ethylhexyl Palmitate, Sorbeth-30 Tetraoleate, Cetyl Ethylhexanoate, Citrus Aurantium Bergamia (Bergamot) Peel Oil, Litsea Cubeba Fruit Oil, Olea Europaea (Olive) Fruit Oil, Prunus Armeniaca (Apricot) Kernel Oil, Macadamia Ternifolia Seed Oil, Citrus Nobilis (Mandarin Orange) Peel Oil, Artemisia Princeps Leaf Extract, Tocopheryl Acetate, Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina Fruit Oil, Salicylic Acid, Water, Glycyrrhiza Uralensis (Licorice) Root Extract, Diospyros Kaki Leaf Extract, Morus Alba Bark Extract, Opuntia Coccinellifera Fruit Extract, Butylene Glycol, 1,2-Hexanediol, Camellia Sinensis Leaf Extract, Galactomyces Ferment Filtrate, Carica Papaya (Papaya) Fruit Extract, Aloe Barbadensis Leaf Extract, Citral, Limonene, Linalool, Citric Acid, Sodium Citrate, Glycolic Acid, Lactic Acid.','2024-05-30 18:03:05','2024-05-30 18:03:05'),(13,13,'Освежающее гидрофильное масло на основеn травяных экстрактов очищает кожу от декоративной косметики и загрязнений, накопившихся в течение дня, оказывает успокаивающий эффект. Глубоко очищает кожу, растворяя все виды декоративной косметики и себумные пробки. \nОказывает успокаивающее и освежающее действие. \n','для всех типов кожи',200,'Масло сои притягивает загрязнения и излишки себума, очищая поры и смягчая кожу.\n\nЭкстракт зелёного чая освежает кожу, выравнивает тон.\n\nМасла оливы, жожоба, моринги и миндаля смягчают кожу при очищении.\nМасла виноградных косточек, эвкалипта и чайного дерева, а также экстракты полыни, шалфея оказывают антибактериальное, противовоспалительное, поросужающее и себорегулирующее свойства.','Нанести необходимое количество средства на сухое лицо сухими руками. Мягко распределить массирующими движениями до полного растворения макияжа, смыть теплой водой.','Sorbeth-30 Soybean Oil Tetraoleate, Isoamyl Laurate, Caprilic / Capric Triglyceride, Green Tea Oil, Olive Oil, Grape Seed Oil, Wormwood Oil, Sage Oil, Jojoba Oil, Glyceryl Caprylate, Almond Oil, Moringa Oil, Tea Tree Oil, Eucalyptus Leaf Oil Rosemary Leaf Oil, Lavender Oil, Tocopherol, Green Tea Extract, Wormwood Extract, Papaya Fruit Extract, Patchouli Oil, Boswelia Gum','2024-05-30 18:04:54','2024-05-30 18:04:54'),(14,14,'Гидрофильное масло с пробиотиками направлено на глубокое очищение кожи от загрязнений и сохранение здорового микробиома. Растворяет все виды макияжа, SPF средств и тональных основ. Очищает кожу от поверхностных загрязнений и излишков себума..\nОказывает смягчающее и успокаивающее действие, предотвращает обезвоживание при очищении.\nСпособствует сохранению здорового микробиома кожи.','Всех типов кожи, склонной к обезвоженности',155,'Комплекс масел активно смягчает кожу лица, сохраняет защитный барьер, препятствует сухости и шелушениям.\nКомплекс бифидобактерий поддерживает здоровый микробиом кожи, препятствуя развитию патогенной бактериальной среды.\nКомплекс цитрусовых экстрактов оказывает мягкое осветляющее действие, спососбствует выравниванию тона кожи и насыщает её антиоксидантами.','Необходимое количество средства распределите сухими руками на сухой коже лица массажными движениями до полного растворения макияжа и загрязнений. Затем добавьте немного воды и массируйте до растворения средства в лёгкое молочко, после чего полностью смойте средство водой и приступите ко второму этапу очищения пенкой или гелем.','Helianthus Annuus (Sunflower) Seed Oil, Cetyl Ethylhexanoate, Sorbeth-30 Tetraoleate, Sorbitan Sesquioleate, Caprylic/Capric Triglyceride, Citrus Paradisi (Grapefruit) Peel Oil, Citrus Aurantium Dulcis (Orange) Peel Oil, Caprylyl Glycol, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Olea Europaea (Olive) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Limnanthes Alba (Meadowfoam) Seed Oil, Macadamia Ternifolia Seed Oil, Ethylhexylglycerin, Pentaerythrityl Tetra-DiT-Butyl Hydroxyhydrocinnamate, Tocopheryl Acetate, Water, Tocopherol, Butylene Glycol, Lactobacillus Ferment, 1,2-Hexanediol, Lactococcus Ferment Lysate, Saccharomyces Ferment Filtrate, Lactobacillus Ferment Lysate, Bifida Ferment Lysate, Bifida Ferment Filtrate','2024-05-30 18:06:56','2024-05-30 18:06:56'),(15,15,'Лёгкое гидрофильное масло с морской водой эффективно очищает кожу от тональных средств и SPF. Эффективно очищает кожу от загрязнений и излишков себума, растворяет тональные основы и солнцезащитные средства.\nСмягчает и успокаивает кожу, препятствует появлению раздражений и покраснений.\nСпособствует сохранению влаги в процессе демакияжа и деликатной себорегуляции.\n\n','Всех типов кожи, склонной к обезвоженности',200,'Морская вода в качестве основы средства оказывает комфортное увлажняющее действие, насыщая кожу полезными минералами и микроэлементами.\nКомплекс масел активно питает кожу лица, восстанавливает и укрепляет защитный барьер, препятствует сухости и шелушениям.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.','Необходимое количество средства распределите сухими руками на сухой коже лица массажными движениями до полного растворения макияжа и загрязнений.','Ethylhexyl Stearate, Sorbeth-30 Tetraoleate, Diisostearyl Malate, Ethylhexylglycerin, Water, Oenothera Biennis (Evening Primrose) Oil, Limnanthes Alba (Meadowfoam) Seed Oil, Persea Gratissima (Avocado) Oil, Vitis Vinifera (Grape) Seed Oil, Canola Oil, Macadamia Integrifolia Seed Oil, Sea Water, Butylene Glycol, Allantoin, Panthenol, 1,2-Hexanediol, Caprylic/Capric Triglyceride, Phosphatidylcholine, Hyaluronic Acid, Ceramide NP, Glycine, Hydrolyzed Hyaluronic Acid, Glutamic Acid, Serine, Sodium Hyaluronate, Lysine, Alanine, Arginine, Threonine, Proline, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Salvia Officinalis (Sage) Oil, Tocopherol, Limonene, Linalool.','2024-05-30 18:08:38','2024-05-30 18:08:38'),(16,16,'Очищающий бальзам с центеллой великолепно справится с любым макияжем и окажет успокаивающее действие, заряжая кожу энергией. Не вызывает раздражений или ощущения неприятного стягивания дермы, а напротив будет помогать снять воспаления, покраснения и оставить чувствительную кожу хорошо увлажнённой после очищения.\nМоментально снимает раздражения, зуд и убирает покраснения, способствует укреплению и восстановлению защитных функций кожи, помимо этого, смягчает и питает чувствительную кожу. \nВеликолепно растворяет макияж и при этом питает, и увлажняет кожный покров.  \nИмеет очень нежную текстуру щербета, которая мгновенно тает от тает от температуры тела и превращается в масло, а после контакта с водой — в молочко, которое легко смывается.','для всех типов кожи',120,'Комплекс масел активно питает кожу лица, восстанавливает и укрепляет защитный барьер, препятствует сухости и шелушениям\nЦентелла азиатская активно успокаивает кожу, снимает покраснения и раздражения, снижает чувствительность и оказывает смягчающее действие\nЭкстракт коры сосны обыкновенной обладает антиоксидантным, P-витаминным, вяжущим, капилляроукрепляющим, противовоспалительным, антимикробным действием, повышает упругость кожи.','Нанесите небольшое количество щербета поверх макияжа и нежными массажными движениями смойте макияж, после чего умойтесь теплой водой','Ethylhexyl Palmitate, Sorbeth-30 Tetraoleate, Caprylic/Capric Triglyceride, Polyethylene, Lavandula Angustifolia (Lavender) Oil, Helianthus Annuus (Sunflower) Seed Oil, Eucalyptus Globulus Leaf Oil, Caprylyl Glycol, Ethylhexylglycerin, Anthemis Nobilis Flower Oil, Avena Sativa (Oat) Kernel Oil, Butyrospermum Parkii (Shea) Butter, Cocos Nucifera (Coconut) Oil, Olea Europaea (Olive) Fruit Oil, Oenothera Biennis (Evening Primrose) Oil, Persea Gratissima (Avocado) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Water, 1,2-Hexanediol, Centella Asiatica Extract, Centella Asiatica Leaf Extract, Centella Asiatica Root Extract, Pinus Pinaster Bark Extract, Asiaticoside, Asiatic Acid, Madecassoside, Madecassic Acid','2024-05-30 18:11:14','2024-05-30 18:11:14'),(17,17,'Очищающий гидрофильный бальзам с морской водой обеспечивает эффективное и комфортное очищение кожи. Эффективно растворяет тональные основы, декоративную косметику и солнцезащитные средства.\nОчищает кожу от излишков себума и других видов загрязнений.\nПрепятствует потере влаги и раздражениям в процессе демакияжа.','для всех типов кожи',100,'Морская вода в качестве основы средства оказывает комфортное увлажняющее действие, насыщая кожу полезными минералами и микроэлементами.\nМасло виноградной косточки оказывает успокаивающее противовоспалительное действие.\nМасло семян пенника лугового обеспечивает активное питание кожи, способствует сохранению упругости и гладкости кожи.\nМасло бергамота устраняет воспалительные процессы, способствует себорегуляции и сужению пор, освежает и выравнивает тон.','Необходимое количество средства распределите сухими руками на сухой коже лица массажными движениями до полного растворения макияжа и загрязнений. Затем добавьте немного воды и массируйте до растворения средства в лёгкое молочко, после чего полностью смойте средство водой и приступите ко второму этапу очищения пенкой или гелем.','Ethylhexyl Palmitate, Isopropyl Palmitate, Sorbeth-30 Tetraoleate, Helianthus Annuus (Sunflower) Seed Oil, Synthetic Wax, Sorbitan Sesquioleate, Sea Water, Oenothera Biennis (Evening Primrose) Oil, Vitis Vinifera (Grape) Seed Oil, Limnanthes Alba (Meadowfoam) Seed Oil, 1,2-Hexanediol, Butylene Glycol, Protease, Pentaerythrityl Tetra-Di-T-Butyl Hydroxyhydrocinnamate, Bis-Ethoxydiglycol Cyclohexane 1,4-Dicarboxylate, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Salvia Officinalis (Sage) Oil, Tocopherol, Limonene, Linalool.','2024-05-30 18:12:36','2024-05-30 18:12:36'),(18,18,'Очищающая вода для снятия макияжа с морской водой обеспечивает эффективное очищение кожи от декоративных средств и загрязнений. Помогает деликатно очистить кожу, поддерживая ее оптимальный pH-баланс и не оставляя жирной пленки. \nУспокаивает и смягчает кожу, предотвращает появление раздражений и покраснений.\nСпособствует сохранению влаги в процессе очищения.\n','для всех типов кожи',400,'Морская вода в качестве основы средства оказывает комфортное увлажняющее действие, насыщая кожу полезными минералами и микроэлементами.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.\nКомплекс аминокислот оказывает регенерирующее действие, способствует укреплению барьерной функции кожи и сохранению упругости.','Нанесите нужное количество средства на хлопковый диск, протрите лицо до полного очищения кожи от декоративной косметики, затем умойтесь тёплой водой и приступите к следующему этапу очищения.','Water, Polyglyceryl-10 Laurate, 1,2-Hexanediol, Pentylene Glycol, Polyglyceryl-4 Caprate, Panthenol, Sea Water, Ethylhexylglycerin, Disodium EDTA, Butylene Glycol, Allantoin, Hyaluronic Acid, Caprylic/Capric Triglyceride, Phosphatidylcholine, Hydrolyzed Hyaluronic Acid, Sodium Hyaluronate, Ceramide NP, Glycine, Glutamic Acid, Serine, Lysine, Alanine, Arginine, Threonine, Proline','2024-05-30 18:15:31','2024-05-30 18:15:31'),(19,19,'Очищающие салфетки для снятия макияжа с морской водой обеспечивают эффективное очищение кожи от декоративных средств и загрязнений. Помогают деликатно очистить кожу, поддерживая ее оптимальный pH-баланс и не оставляя жирной пленки. \nНе раздражают кожу, способствуют снятию покраснений и раздражений.\nСпособствует сохранению влаги в процессе очищения.\nУдобно носить с собой или брать в дорогу.\nОбъём: 30 шт.\n','для всех типов кожи',0,'Морская вода в качестве основы средства оказывает комфортное увлажняющее действие, насыщая кожу полезными минералами и микроэлементами.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.\nАллантоин оказывает разглаживающее действие, улучшает и выравнивает текстуру кожи.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.','Достаньте из пачки одну салфетку. Аккуратно очистите салфеткой лицо от макияжа и загрязнений. Избегайте попадания средства в глаза.','Water, Methylpropanediol, Dipropylene Glycol, Polyglyceryl-6 Caprylate, Sea Water, Sodium Hyaluronate, Sodium Acetylated Hyaluronate, Hydrolyzed Hyaluronic Acid, Allantoin, Dipotassium Glycyrrhizate, Panthenol, Maltodextrin, Sodium Metabisulfite, Protease, Polyglyceryl-4 Caprate, Sodium Citrate, Hydroxyacetophenone, Decylene Glycol, Laurylpyridinium Chloride, Levulinic Acid, Sodium Levulinate, Disodium EDTA, 1,2-Hexanediol, Citric Acid.','2024-05-30 18:17:17','2024-05-30 18:17:17'),(20,20,'Очищающая вода для снятия макияжа PYUNKANG YUL Low pH Cleansing Water помогает поддерживать нормальный кислотно-щелочный баланс и укрепляет естественный защитный барьер кожи. Деликатно очищает, удаляя макияж и излишки себума, не оставляет чувство стянутости или сухости, а также оказывает легкий успокаивающий эффект.','для всех типов кожи',290,'Пять видов гиалуроновой кислоты – обеспечивают максимальное увлажнение, помогают  восстанавливать водный баланс и удерживать влагу в клетках кожи.\nЭкстракты портулака и бобы мунг - мягко очищают кожу, не вызывают раздражения или чувство стянутости.\nЭкстракт гамамелиса - регулирует работу сальных желез и способствует сужению пор.\nЭкстракты зелёного чая - тонизирует, увлажняет и также успокаивает раздражённую кожу.\nЭкстракт центеллы азиатской -  оказывает успокаивающее, противовоспалительное и заживляющее действия, снимает покраснения, раздражения и зуд.','Нанесите необходимое количество средства на ватный диск. Приложите к глазам смоченный диск на несколько секунд, деликатно удалите макияж. Тем же образом применяйте средство для очищения губ или лица. После использования средства умойтесь пенкой.','вода, дипропиленгликоль, пропандиол, 1,2-Гександиол, С12-14 парес-12, Цитрат натрия, дитиол натрия, бутиленгликоль, Октилдодеканол, экстракт семян бобов мунг, Экстракт корня корневища коптиса, экстракт центеллы азиатской, экстракт портулака, экстракт зеленого чая, экстракт листвы гамамелиса, пентиленгликоль, экстракт корня солодки, экстракт листьев чайного дерева, экстракт шлемника, гиалуронат натрия, 3D гиалуроновая кислота, Гидролизованная гиалуроновая кислота, гиалуроновая кислота, Керамид NP, каприловый лальгликоль, этилгексилглицерин, лимонная кислота, глицерин.','2024-05-30 18:20:02','2024-05-30 18:20:02'),(21,21,'Двухфазное средство для снятия макияжа для чувствительной кожи Dr.G Green Deep Lip&Eye Remover поможет очистить нежную кожу глаз и губ от плотного макияжа, не повреждая эпидермис. Средство бережно удаляет косметические средства, в том числе и на жирной основе, при этом не суша кожу и не нарушая ее водно-липидного баланса. Гидролизованная гиалуроновая кислота проникает в глубокие слои эпидермиса и активно увлажняет кожу, восстанавливая и поддерживая оптимальный уровень влаги в клетках эпидермиса.','для всех типов кожи',120,'Масло макадамии содержит более 80% насыщенных жирных кислот. Обладает регенерирующим, смягчающим, противовоспалительным, омолаживающим, и увлажняющим свойствами. Нормализует водно-жировой баланс сухой кожи, тонизирует и повышает ее упругость, замедляет процессы старения.\nМасло виноградных косточек - мощный антиоксидант, оказывает увлажняющее и противовоспалительное действие, помогает при акне и угревой сыпи, ускоряет заживление повреждений, способствует выработке коллагена и эластина и препятствует старению кожи.\nМасло ромашки оказывает противовоспалительное и антибактериальное действие, контролирует работу сальных желез, абсорбирует излишнюю жирность, осветляет пигментацию, способствует заживлению ранок и рубцов.\nСоль гиалуроновой кислоты имеет молекулы, меньшие по размеру, чем у обычной гиалуроновой кислоты, за счет чего глубже проникают в кожу и более эффективны. Интенсивно увлажняет кожу и образует на ней тонкую пленку, предотвращающую потерю влаги, питает эпидермис минералами и витаминами, разглаживает морщины, возвращает упругость тканям, уменьшает воспаления и стимулирует заживление ран, активирует защитные свойства кожи.\nГиалуроновая кислота глубоко увлажняет кожу и образует на ней тонкую пленку, предотвращающую потерю влаги, питает эпидермис минералами и витаминами, разглаживает морщины, возвращает упругость тканям, уменьшает воспаления и стимулирует заживление ран, активирует защитные свойства кожи.','1. Встряхните флакон несколько раз для лучшего смешивания слоев. Обильно смочите средством ватный диск и приложите к коже глаз или губ на несколько секунд для лучшего растворения макияжа.\n\n2. Аккуратно протрите кожу вокруг глаз и губ для удаления макияжа.\n\n3. Смойте остатки теплой водой.','Water(Aqua/Eau), Cyclohexasiloxane, Isohexadecane, 1,2-Hexanediol, Glycerin, Sodium Chloride, Caprylyl/Capryl Glucoside, Sodium Citrate, Allantoin, Macadamia Ternifolia Seed Oil, Vitis Vinifera (Grape) Seed Oil, Camellia Sinensis Seed Oil, Butylene Glycol, Panthenol, Leuconostoc/Radish Root Ferment nitrate, Citric Acid, Disodium EDTA, Propanediol, Sodium Hyaluronate Crosspolymer, Saponaria Officinalis Leaf Extract, Quillaja Saponaria Bark Extract, Hydrolyzed Glycosaminogly- cans, Sodium Hyaluronate, Lactobacillus, Benzyl Glycol, Daucus Carota Sativa (Carrot) Root Extract, Hydrolyzed Hyaluronic Acid, Bifida Ferment Lysate, Ethylhexylglycerin, Hyaluronic Acid, Raspberry Ketone','2024-05-30 18:22:46','2024-05-30 18:22:46'),(22,22,'Мягкие отшелушивающие тонер-пэды для лица с экстрактом хауттюйнии и глюконолактоном направлены на деликатное очищение кожи от ороговевшего слоя клеток. Увлажняют и смягчают кожу, предотвращая сухость и обезвоженность.\nОказывают отшелушивающее действие, очищая кожу от ороговевшего слоя клеток, стимулируя процессы обновления и усиливая действие ежедневного ухода.\nРегулируют работу сальных желёз, предотвращая жирный блеск и расширенные поры.\nОказывают интенсивное противовоспалительное действие, устраняя покраснения, раздражения и высыпания.','Всех типов кожи, склонной к покраснениям и раздражениям.',70,'Экстракт хауттюйнии сердцевидной обеспечивает активное успокаивающее и противовоспалительное действие, снимая покраснения и устраняя высыпания.\nГлюконолактон (PHA) оказывает деликатное отшелушивающее действие, очищая верхний слой эпидермиса от ороговевших клеток, делает кожу более ровной и гладкой, освежая и выравнивая тон кожи.\nЭкстракт хвои эффективно снимает покраснения и устраняет очаги воспалений.\nЭкстракт зеленого чая оказывает антиоксидантное и увлажняющее действие, защищает кожу от свободных радикалов и успокаивает покраснения.\nЭкстракт портулака снимает воспаления, успокаивает кожу и снижает её чувствительность, а также регулирует работу сальных желёз.\nЦентелла азиатская активно успокаивает кожу, снимает покраснения и раздражения, снижает чувствительность и оказывает смягчающее действие.','Деликатно протереть очищенную кожу лица тонер-пэдом, дать остаткам эссенции впитаться. Затем приступить к основному уходу.','Guttuinia cordata extract (77%), water, Gluconolactone, propanediol, tromethamine, butylene glycol, 1,2-hexanediol, betaine, Ammonium acryloyldimethyl taurate VP copolymer, Elm root extract, Arrowroot root extract, Pine needle extract, Evening primrose extract, Green tea extract, Bussenica seed extract, purslane extract, centella asiatica extract, madecassoside, asiatic acid, asiaticoside, madecassic acid, sodium phytate','2024-05-30 18:28:01','2024-05-30 18:28:01'),(23,23,'Противовоспалительные тонер-пэды для лица с экстрактом сосны и центеллы направлены на активную работу с высыпаниями и покраснениями, а также мягкое отшелушивание.','Всех типов кожи.',50,'Экстракт сосны эффективно снимает покраснения и устраняет очаги воспалений.\nЦентелла азиатская активно успокаивает кожу, снимает покраснения и раздражения, снижает чувствительность и оказывает смягчающее действие.\nБетаин глубоко увлажняет кожу, укрепляет защитную функцию кожи, оказывает смягчающее действие и укрепляет клеточные мембраны.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.\nЭкстракт листьев дерева Ним обладает успокаивающим и антибактериальным действием, предотвращает покраснения и высыпания.\nГлюконолактон (PHA) оказывает деликатное отшелушивающее действие, очищая верхний слой эпидермиса от ороговевших клеток, делает кожу более ровной и гладкой, освежая и выравнивая тон кожи.\nLHA кислота способствует деликатному обновлению кожи и оказывая антибактериальное, противовоспалительное действие.\nЯнтарная кислота оказывает противовоспалительное и заживляющее действие, очищает поры от излишков себума и способствует выравниванию тона кожи.','Деликатно протереть очищенную кожу лица тонер-пэдом, дать остаткам эссенции впитаться. Затем приступить к основному уходу.','Pinus Densiflora Leaf Extract (508,807Ppm), Water, Propanediol, Dipropylene Glycol, 1,2-Hexanediol, Centella Asiatica Extract (10,520Ppm), Betaine, Sodium Hyaluronate, Butylene Glycol, Caprylyl Glycol, Centella Asiatica Leaf Extract (1,000Ppm), Cinnamomum Camphora (Camphor) Leaf Extract, Panthenol, Glycoproteins, Ethylhexylglycerin, Dipotassium Glycyrrhizate, Melia Azadirachta Leaf Extract, Melia Azadirachta Flower Extract, Madecassoside (0.5200Ppm), Asiaticoside (0.5200Ppm), Asiatic Acid (0.5200Ppm), Madecassic Acid (0.5200Ppm), Hydroxyacetophenone, Gluconolactone, Capryloyl Salicylic Acid, C12-14 Pareth-12, Succinic Acid, Ammonium Acryloyldimethyltaurate/​VP Copolymer, Sodium Citrate, Pantolactone, Disodium EDTA','2024-05-30 18:29:38','2024-05-30 18:29:38'),(24,24,'Увлажняющие пэды для чувствительной кожи направлены на смягчающее и восстанавливающее действие.','Всех типов кожи.',70,'Салициловая кислота оказывает противовоспалительное и себорегулирующее действие, устраняет покраснения и растворяет излишки себума, способствует сужению пор.\nБетаин глубоко увлажняет кожу, укрепляет защитную функцию кожи, оказывает смягчающее действие и укрепляет клеточные мембраны.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nГлюконолактон (PHA) оказывает деликатное отшелушивающее действие, очищая верхний слой эпидермиса от ороговевших клеток, делает кожу более ровной и гладкой, освежая и выравнивая тон кожи.\nГиалуроновая кислота глубоко увлажняет кожу, сохраняя влагу внутри, препятствует обезвоживанию и сухости, а также способствует сохранению гладкости и упругости кожи.','Мягко протрите чистую сухую кожу лица сначала рельефной стороны, особое внимание уделите Т-зоне и проблемным участкам, затем гладкой стороной пэда. Средство используется после умывания, на этапе тонизирования','Water, Butylene Glycol, Propanediol, Glycerin, 1,2-Hexanediol, Betaine Salicylate, Betaine, Panthenol, Allantoin, Polyglyceryl-10 Myristate, Polyglyceryl-10 Laurate, Sodium Hydroxide, Gluconolactone, Sodium Hyaluronate, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Carbomer, Arginine, Citrus Limon (Lemon) Peel Oil, Pentylene Glycol, Sodium Hyaluronate Crosspolymer, Hydrolyzed Hyaluronic Acid, Hydrolyzed Sodium Hyaluronate, Hyaluronic Acid, Ethylhexylglycerin, Squalane','2024-05-30 18:31:15','2024-05-30 18:31:15'),(25,25,'Увлажняющие пэды для чувствительной кожи направлены на смягчающее и восстанавливающее действие.','кожи склонной к высыпаниям, чувствительности и обезвоженности',70,'Вода листьев зелёного чая - насыщает кожу витаминами и минералами, увлажняет, тонизирует, контролирует жирность кожи. Улучшает цвет лица и придает коже здоровое сияние. Обладает антивозрастным и омолаживающим действием, тонизирует и укрепляет кожу.\nРНА-кислота - увлажняет кожу, выравнивает цвет и рельеф эпидермиса, оказывает фотопротекторное воздействие, обладает противовоспалительным эффектом, регулирует процесс естественной кератинизации кожи. Глюконолактон применяется в лечебных средствах при воспалительных заболеваниях кожи, сопровождающихся гиперкератозом: псориаз, акне, дерматиты\nЭкстракт семян сенны туполистной - отличается лечебными, а также общеоздоравливающими свойствами. Способствует устранению первых признаков возрастных изменений.\nПантенол - стимулирует восстановление целостности кожных покровов, снимает покраснения и раздражение, обладает ранозаживляющими свойствами.\nАллантоин - смягчает, интенсивно увлажняет кожу, способствует сужению пор и нормализации выработки кожного сала, обладает противовоспалительными свойствами, успокаивает раздраженную кожу.','Достаньте пилинг-пэд. Мягко протрите чистую сухую кожу лица сначала рельефной стороной, особое внимание уделите Т-зоне и проблемным участкам, затем гладкой стороной пэда. Средство используется после умывания, на этапе тонизирования. Пилинг-пэды подходят для ежедневного применения. Не требует смывания.','Camellia Sinensis Leaf Water(Green tea water), Butylene Glycol, Taraxacum Officinale (Dandelion) Leaf Extract, Centella Asiatica Extract, Hamamelis Virginiana (Witch Hazel) Leaf Extract, Melaleuca Alternifolia (Tea Tree) Leaf Extract, Artemisia Princeps Extract, 1.2-Hexanediol, Cassia Obtusifolia Seed Extract, Lactobionic Acid, Maltodextrin, Panthenol, Polyglyceryl-10 Laurate, Polyglyceryl-10 Myristate, Glycerine, Arginine, Allantoin, Asiaticoside, Asiatic acid, Madecassic acid, Sodium Hyaluronate, Gardenia Florida Fruit Extract, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Menthyl Lactate, Mentha Haplocalix Extract','2024-05-30 18:32:43','2024-05-30 18:32:43'),(26,26,'Пилинг-диски, пропитанные сывороткой с экстрактом зеленого винограда, предназначены для отшелушивания отмерших клеток, а также для ухода за кожей с расширенными порами, борьбы с \"черными точками\" и излишней жирностью кожи. Запатентованный комплекс ANTI SEBUM P позволяет применять диски даже для чувствительной кожи. Благодаря увеличенному размеру дисков их можно использовать для очищения спины или коленей.','для всех типов кожи',70,'Экстракт зеленого винограда благодаря высокому содержанию природных антоксидантов, защищает кожу от преждевременного старения, оказывает прекрасное увлажняющее и освежающее действие, способствует нормализации выработки себума и сужению пор.\nПантенол оказывает успокаивающее и регенерирующее действие, снимает покраснения и раздражения, снижает чувствительность кожи.\nЭкстракт кожуры цитрусовых способствует стимуляции синтеза коллагена, действует укрепляюще, омолаживает, отбеливает и отшелушивает, возвращает тонус коже.','1. Используйте после умывания, на чистую сухую кожу. Рельефной стороной диска помассируйте кожу лица, избегая зоны глаз.\n\n2. Используйте противоположную гладкую сторону для ухода за кожей с помощью круговых движений.','Water, Vitis Vinifera (Grape) Fruit Extract, 1,2-Hexanediol, Methylpropanediol, Butylene Glycol, Sodium Citrate, Propanediol, betaine salicylate, Polyglyceryl-10 Laurate, Pentylene Glycol, Hydroxyethyl Urea, Panthenol, Ethylhexylglycerin, Disodium EDTA, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Lavandula Hybrida Oil, Juniperus Virginiana Oil, Cupressus Sempervirens Leaf/Nut/Stem Oil, Citrus Aurantium Dulcis (Orange) Peel Oil, Polyquaternium-51, Citrus Paradisi (Grapefruit) Peel Oil, Tannic Acid, Ulmus Davidiana Root Extract, Pueraria Lobata Root Extract, Pinus Palustris Leaf Extract, Oenothera Biennis (Evening Primrose) Flower Extract, Chlorphenesin','2024-05-30 18:34:38','2024-05-30 18:34:38');
/*!40000 ALTER TABLE `iteminfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderitems` (
  `id_order_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `order_item_quantity` int(11) NOT NULL,
  `order_item_sale` tinyint(4) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_order_item`),
  KEY `id_order` (`id_order`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,1,3,0,3870.00),(2,2,1,1,0,1290.00),(3,3,6,1,0,2699.00),(4,4,3,3,0,7470.00),(5,5,8,2,0,3798.00),(6,5,7,1,0,1999.00),(7,6,2,1,0,1290.00),(8,7,2,2,0,2580.00),(9,7,4,1,0,2399.00),(10,8,3,1,0,2490.00),(11,9,1,3,0,3870.00),(12,9,6,1,0,2699.00),(13,16,26,1,0,2690.00),(14,16,2,1,10,1161.00),(15,17,4,20,15,40783.00),(16,18,2,1,10,1161.00),(17,19,2,1,10,1161.00),(18,20,1,1,10,1161.00),(19,21,3,1,0,2290.00);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `creation_date` datetime NOT NULL,
  `id_store` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('в обработке','заказ принят','готов к выдаче','выдан','отменен') NOT NULL DEFAULT 'в обработке',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_order`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,'','','2024-05-29 08:25:03',0,3870.00,'отменен','2024-05-29 08:25:03','2024-05-29 09:07:25'),(2,3,'пупупу','89141105693','2024-05-29 08:26:34',1,1290.00,'отменен','2024-05-29 08:26:34','2024-06-01 08:34:52'),(3,2,'Диана','89965468770','2024-05-29 11:16:46',2,2699.00,'отменен','2024-05-29 11:16:46','2024-06-01 08:34:56'),(4,2,'Диана','+79961101010','2024-05-29 11:20:42',2,7470.00,'готов к выдаче','2024-05-29 11:20:42','2024-06-01 08:35:04'),(5,2,'Аня','89965468770','2024-05-29 11:24:49',3,5797.00,'выдан','2024-05-29 11:24:49','2024-06-01 08:35:00'),(6,2,'Диана','89141105693','2024-05-29 11:25:31',1,1290.00,'готов к выдаче','2024-05-29 11:25:31','2024-05-30 06:16:45'),(7,2,'Лиза','8914110569','2024-05-30 11:08:01',2,4979.00,'отменен','2024-05-30 11:08:01','2024-05-30 11:18:01'),(8,4,'Лия','+79141105690','2024-05-30 11:22:20',3,2490.00,'выдан','2024-05-30 11:22:20','2024-06-01 08:35:07'),(9,4,'поля','89830034477','2024-05-30 12:28:15',3,6569.00,'готов к выдаче','2024-05-30 12:28:15','2024-05-31 10:08:28'),(16,4,'Диана','89141105693','2024-05-31 10:07:26',1,3851.00,'в обработке','2024-05-31 10:07:26','2024-05-31 10:07:26'),(17,4,'Диана','89141105693','2024-06-03 07:11:45',1,40783.00,'в обработке','2024-06-03 07:11:45','2024-06-03 07:11:45'),(18,2,'Даша','89965468770','2024-06-03 10:50:11',3,1161.00,'в обработке','2024-06-03 10:50:11','2024-06-03 10:50:11'),(19,2,'вововов','89141105693','2024-06-03 10:50:32',3,1161.00,'в обработке','2024-06-03 10:50:32','2024-06-03 10:50:32'),(20,2,'вововов','89141105693','2024-06-03 10:51:54',2,1161.00,'в обработке','2024-06-03 10:51:54','2024-06-03 10:51:54'),(21,9,'Диана','89141105693','2024-06-03 16:03:50',3,2290.00,'заказ принят','2024-06-03 16:03:50','2024-06-03 16:05:20');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `ru_product_name` varchar(255) NOT NULL,
  `eng_product_name` varchar(255) NOT NULL,
  `id_section` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `id_subcategory` int(11) DEFAULT NULL,
  `id_brand` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sale` tinyint(4) DEFAULT NULL,
  `published` tinyint(1) DEFAULT 0,
  `new_status` tinyint(4) NOT NULL DEFAULT 0,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `final_price` decimal(10,2) GENERATED ALWAYS AS (round(`price` * (1 - ifnull(`sale`,0) / 100),2)) STORED,
  PRIMARY KEY (`id_product`),
  KEY `id_brand` (`id_brand`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`id_brand`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Солнцезащитная крем-эссенция','Frudia Ultra UV Shield Sun Essence SPF50+/PA++++',0,4,15,16,1290.00,'33ec9a31-98b3-4f4d-9728-af144c637f16.jpg',10,0,1,0,'2024-05-29 07:46:36','2024-06-03 10:51:54',1161.00),(2,'Солнцезащитная крем-основа ОСГ','FRUDIA Tone Up Base Sun Cream SPF50+/PA+++     ',0,4,15,16,1290.00,'c6facc3d-c56e-4007-b863-502f11c722e4.jpg',10,1,0,6,'2024-05-29 07:47:59','2024-06-03 10:50:32',1161.00),(3,'Смягчающая пенка-скраб для умывания с экстрактом соевых бобов','Round Lab Soybean Cleanser',0,1,1,17,2290.00,'e1128d10-6204-41ae-92c6-b04735cd2953.jpg',0,1,1,5,'2024-05-29 07:50:36','2024-06-03 16:03:50',2290.00),(4,'Успокаивающая пенка для умывания с янтарной кислотой','ANUA Heartleaf Succinic Moisture Cleansing Foam',0,1,1,13,2399.00,'af6602d2-b194-4e8e-a1da-946b802e5710.jpg',15,0,0,0,'2024-05-29 07:52:16','2024-06-03 07:11:45',2039.15),(5,'Мягкая пенка для умывания с содой','Ma:nyo Factory Purifying Cleansing Soda Foam',NULL,1,1,18,1890.00,'97ac4461-b502-4621-b0c9-a8fa63bf424c.jpg',0,0,0,15,'2024-05-29 07:54:14','2024-06-03 06:56:08',1890.00),(6,'Успокаивающий тонер для лица с экстрактом хауттюйнии','ANUA Heartleaf 77% Soothing Toner',NULL,2,7,13,2699.00,'ef394af6-84b9-49a7-a35d-8405badf3673.jpg',0,1,1,9,'2024-05-29 07:56:14','2024-06-01 08:34:56',2699.00),(7,'Питательный молочный тонер для лица с экстрактом корня ямса','IsNtree Yam Root Vegan Milk Toner',NULL,2,7,1,1999.00,'3bc4cfdf-c1ad-44ff-a157-593c1ac7afa5.jpg',0,1,1,14,'2024-05-29 07:57:58','2024-05-29 11:24:49',1999.00),(8,'Увлажняющий тонер с гиалуроновой кислотой','IsNtree Hyaluronic Acid Toner',NULL,2,7,1,1899.00,'9d3ecbc3-40b7-45a5-a34a-35b1ef5e062d.jpg',0,1,1,8,'2024-05-29 08:00:26','2024-05-29 11:24:49',1899.00),(9,'Восстанавливающий крем для лица с муцином улитки','COSRX Advanced Snail 92 All in one Cream',0,3,10,3,3200.00,'be2b3e62-d3cc-4207-8e28-ba22ffe79115.jpg',30,1,0,10,'2024-05-29 08:02:42','2024-06-03 11:32:07',2240.00),(10,'Обновляющий крем для лица с ретинолом','CosRX The Retinol 0.1 Cream',0,3,10,3,2290.00,'9d92a074-7003-4f1e-9654-2d35285f3bf3.jpg',55,1,0,10,'2024-05-29 08:03:57','2024-06-03 11:32:15',1030.50),(11,'Гидрофильное масло с центеллой','COSRX PURE FIT CICA CLEAR CLEANSING OIL ',NULL,1,3,3,3990.00,'ded62137-f74e-42cb-8613-b48593c98137.jpg',0,1,0,10,'2024-05-29 08:06:38','2024-05-29 08:06:38',3990.00),(12,'Очищающее гидрофильное масло с экстрактом полыни',' Fraijour Original Herb Wormwood Cleansing Oil',NULL,1,3,19,1690.00,'bde58179-2159-4bb7-99f1-ef3881295d26.jpg',0,1,0,10,'2024-05-30 18:03:05','2024-05-30 18:03:05',1690.00),(13,'Освежающее гидрофильное масло с травами','Ma:nyo Factory Herb Green Cleansing Oil',NULL,1,3,18,3990.00,'71c72713-2b2c-4c70-b775-b361177bae40.jpg',0,1,0,10,'2024-05-30 18:04:54','2024-05-30 18:04:54',3990.00),(14,'Гидрофильное масло с пробиотиками','Dr.Ceuracle Pro Balance Pure Deep Cleansing Oil',NULL,1,3,20,3290.00,'193d0ef1-6d9e-4d51-8e1d-87df7cc6f2fd.jpg',0,1,0,20,'2024-05-30 18:06:56','2024-05-30 18:06:56',3290.00),(15,'Лёгкое гидрофильное масло с морской водой','Round Lab 1025 Dokdo Cleansing Oil',NULL,1,3,17,2590.00,'31541d38-448a-4112-94c5-84c59e967101.jpg',0,1,0,20,'2024-05-30 18:08:38','2024-05-30 18:08:38',2590.00),(16,'Очищающий бальзам с центеллой','COSRX Cica Smoothing Cleansing Balm',0,1,4,3,3199.00,'30752776-b8f4-4246-ba33-0d37d01e7694.jpg',0,1,0,10,'2024-05-30 18:11:14','2024-05-30 18:24:01',3199.00),(17,'Очищающий гидрофильный бальзам с морской водой','Round Lab 1025 Dokdo Cleansing Balm',0,1,4,17,2490.00,'16d49986-f625-4b37-9360-29ea002492e4.jpg',0,1,0,30,'2024-05-30 18:12:36','2024-05-30 18:24:21',2490.00),(18,'Очищающая вода для снятия макияжа с морской водой','Round Lab 1025 Dokdo Cleansing Water',NULL,1,5,17,1700.00,'9f034d62-e03e-4c24-adb5-d1a2ab0d0d38.jpg',0,1,0,15,'2024-05-30 18:15:31','2024-05-30 18:15:31',1700.00),(19,'Очищающие салфетки для снятия макияжа с морской водой','Round Lab 1025 Dokdo Cleansing Tissue',NULL,1,5,17,1200.00,'ee0c0d29-9f4b-4827-b792-83cb82bcc330.jpg',0,1,0,10,'2024-05-30 18:17:17','2024-05-30 18:17:17',1200.00),(20,'Очищающая вода для снятия макияжа с низким','pH PYUNKANG YUL Low pH Cleansing Water',NULL,1,5,17,1890.00,'f7d2c8b5-b051-4cdb-85e7-155d342cbe35.jpg',0,1,0,10,'2024-05-30 18:20:02','2024-05-30 18:20:02',1890.00),(21,'Двухфазное средство для снятия макияжа','DR.G Green Deep Lip & Eye Remover',NULL,1,5,21,1490.00,'35b90bc6-baf1-48df-9f92-2a84ee5a81c4.jpg',0,1,0,16,'2024-05-30 18:22:46','2024-05-30 18:22:46',1490.00),(22,'Отшелушивающие тонер-пэды для лица с экстрактом хауттюйнии и глюконолактоном','ANUA Heartleaf 77% Clear Pad',NULL,2,8,13,2890.00,'a60ef32d-e468-4c34-82ad-bd2dca07882f.jpg',0,1,0,12,'2024-05-30 18:28:01','2024-05-30 18:28:01',2890.00),(23,'Противовоспалительные тонер-пэды для лица с экстрактом сосны и центеллы','Round Lab Pine Calming Cica Pad',NULL,2,8,17,2550.00,'7ec7e51a-a6b6-45f7-bbe5-096f0d75c0cf.jpg',0,1,0,10,'2024-05-30 18:29:38','2024-05-30 18:29:38',2550.00),(24,'Увлажняющие пэды для чувствительной кожи','COSRX One Step Moisture Up Pad',NULL,2,8,3,3100.00,'9a87437d-a58f-49ac-b4e0-201d6a770e50.jpg',0,1,0,10,'2024-05-30 18:31:15','2024-05-30 18:31:15',3100.00),(25,'Успокаивающие пэды для чувствительной кожи','COSRX One Step Green Hero Calming Pad',NULL,2,8,3,3100.00,'d6fb6eb2-2a20-4060-b56d-ad7c627d0933.jpg',0,1,0,10,'2024-05-30 18:32:43','2024-05-30 18:32:43',3100.00),(26,'Отшелушивающие пэды с зеленым виноградом','FRUDIA Green Grape Pore Peeling Pad',NULL,2,8,16,2690.00,'6e5d3d2e-cff1-4a65-a26f-ed351f1b0102.jpg',0,1,0,9,'2024-05-30 18:34:38','2024-05-31 10:07:26',2690.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER product_quantity_trigger BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.quantity <= 0 THEN
        SET NEW.published = 0;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
  `id_section` int(11) NOT NULL AUTO_INCREMENT,
  `section_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_section`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'Уход для лица','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Уход для тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Волосы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'Декоративная косметика','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Здоровье','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `id_store` int(11) NOT NULL AUTO_INCREMENT,
  `store_address` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_store`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Улица Петровского, 12; 1 этаж; правое крыло;','2024-05-29 10:26:01','2024-05-29 10:26:01'),(2,'​Проспект Ленина, 16​3 павильон; 1 этаж;','2024-05-29 10:26:01','2024-05-29 10:26:01'),(3,'​ЦУМ Якутск​; Улица Курашова, 4; ​4 этаж;','2024-05-29 11:14:08','2024-05-29 11:14:08');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id_subcategory` int(11) NOT NULL AUTO_INCREMENT,
  `id_category` int(11) NOT NULL,
  `subcategory_name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_subcategory`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,1,'Пенки для умывания','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,1,'Гидрофильное масло','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,1,'Щербеты','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,1,'Для снятия макияжа','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,1,'Пилинг для лица','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,2,'Тонеры','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,2,'Тонер-пэды','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,3,'Крем для лица','0000-00-00 00:00:00','0000-00-00 00:00:00'),(11,3,'Гель для лица','0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,3,'Эмульсии','0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,3,'Крем для кожи вокруг глаз','0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,3,'Мультифункционалоьные стики и бальзамы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,4,'Солнцезащитные крема','0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,4,'Солнцезащитные стики','0000-00-00 00:00:00','0000-00-00 00:00:00'),(17,4,'Солнцезащитные спреи','0000-00-00 00:00:00','0000-00-00 00:00:00'),(18,5,'Альгинатные маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(19,5,'Гидрогелевые маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(20,5,'Очищающие маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(21,5,'Тканевые маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(22,5,'Наборы масок','0000-00-00 00:00:00','0000-00-00 00:00:00'),(23,5,'Смываемые маски','0000-00-00 00:00:00','0000-00-00 00:00:00'),(24,8,'Гели для душа','0000-00-00 00:00:00','0000-00-00 00:00:00'),(25,8,'Скрабы для тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(26,8,'Антицелюлитные средства','0000-00-00 00:00:00','0000-00-00 00:00:00'),(27,8,'Увлажняющие средства для тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(28,8,'Мисты для тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(29,9,'Кремы для рук','0000-00-00 00:00:00','0000-00-00 00:00:00'),(30,9,'Маски для рук','0000-00-00 00:00:00','0000-00-00 00:00:00'),(31,10,'Кремы для ног','0000-00-00 00:00:00','0000-00-00 00:00:00'),(32,10,'Маски для ног','0000-00-00 00:00:00','0000-00-00 00:00:00'),(33,10,'Пилинг носочик','0000-00-00 00:00:00','0000-00-00 00:00:00'),(34,11,'Зубные пасты','0000-00-00 00:00:00','0000-00-00 00:00:00'),(35,11,'Зубные щетки','0000-00-00 00:00:00','0000-00-00 00:00:00'),(36,11,'Товары для гигиены тела','0000-00-00 00:00:00','0000-00-00 00:00:00'),(37,14,'Филлеры для волос','0000-00-00 00:00:00','0000-00-00 00:00:00'),(38,14,'Пилинг для кожи головы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(39,14,'Маски для волос','0000-00-00 00:00:00','0000-00-00 00:00:00'),(40,14,'Несмываемый уход для волос','0000-00-00 00:00:00','0000-00-00 00:00:00'),(41,17,'BB и СС кремы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(42,17,'Кушон','0000-00-00 00:00:00','0000-00-00 00:00:00'),(43,17,'Тональные основы','0000-00-00 00:00:00','0000-00-00 00:00:00'),(44,17,'Консиллер/Корректор','0000-00-00 00:00:00','0000-00-00 00:00:00'),(45,18,'Карандаши для бровей','0000-00-00 00:00:00','0000-00-00 00:00:00'),(46,18,'Подводки для глаз','0000-00-00 00:00:00','0000-00-00 00:00:00'),(47,18,'Карандаши для глаз','0000-00-00 00:00:00','0000-00-00 00:00:00'),(48,18,'Тени для век','0000-00-00 00:00:00','0000-00-00 00:00:00'),(49,18,'Тушь','0000-00-00 00:00:00','0000-00-00 00:00:00'),(50,19,'Блески и масла для губ','0000-00-00 00:00:00','0000-00-00 00:00:00'),(51,19,'Помады','0000-00-00 00:00:00','0000-00-00 00:00:00'),(52,19,'Тинты для губ','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'USER',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@mail.ru','$2b$05$eVq6.w.lSOcEK5iePantLeOHrUp3GD5KTXi9/byLICqTPhTmvbKkO','ADMIN','2024-05-28 12:28:52','2024-05-28 12:28:52'),(2,'user1@mail.ru','$2b$05$WQd6du0SWJCQvRq3tjquSuqDiaych78rYPcvDAn9l7f/SGVLvkAFK','USER','2024-05-28 12:29:13','2024-05-28 12:29:13'),(3,'lizzzka@mail.ru','$2b$05$VrOniPNXfa.Hg9wvHmfa6etrHlUgQTpbrDebhguGvlDI23g2WcaUK','USER','2024-05-29 08:24:17','2024-05-29 08:24:17'),(4,'user2@mail.ru','$2b$05$VO/nuNE1J9Gla19VQuySGuAqo1/FwNLmY5QG1kADZ3Nu4Qo0XmqeS','USER','2024-05-30 07:22:06','2024-05-30 07:22:06'),(5,'user4@mail.ru','$2b$05$WHeCkLGABoPJ4hlXWmYmwu.me.Y1liOD7Mk73ey.V6Ij7TudOqcRu','USER','2024-06-01 09:42:48','2024-06-01 09:42:48'),(6,'user5@mail.ru','$2b$05$FD7iTO9PfeukiuQnYPvqyuDmn6wB8RW8MHdFnIvoD7/blBPFAe0VS','USER','2024-06-01 09:44:21','2024-06-01 09:44:21'),(7,'user6@mail.ru','$2b$05$oi1Zh0GRwNKgXu.KM6AKmOmqM6yW8IxKT0HSvBHBkxkOrtuffdv7G','USER','2024-06-01 09:49:59','2024-06-01 09:49:59'),(8,'user12@mail.ru','$2b$05$.vpt4hFGD4.K6HG3QXrGiu.6MW7K66Agcm8r4DsgVvnATSTpnbXmW','USER','2024-06-01 10:39:45','2024-06-01 10:39:45'),(9,'s@gmail.com','$2b$05$/NOfoQABMP53/fyo4DDHQuLLriGzR4S6b1wnIjKqeencXp9L7z10a','USER','2024-06-03 16:01:29','2024-06-03 16:01:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlistitems`
--

DROP TABLE IF EXISTS `wishlistitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlistitems` (
  `id_wish_list_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_wish_list` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_wish_list_item`),
  KEY `id_wish_list` (`id_wish_list`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `wishlistitems_ibfk_1` FOREIGN KEY (`id_wish_list`) REFERENCES `wishlists` (`id_wish_list`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wishlistitems_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlistitems`
--

LOCK TABLES `wishlistitems` WRITE;
/*!40000 ALTER TABLE `wishlistitems` DISABLE KEYS */;
INSERT INTO `wishlistitems` VALUES (14,2,3),(17,2,2),(19,9,7),(20,4,3);
/*!40000 ALTER TABLE `wishlistitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlists` (
  `id_wish_list` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_wish_list`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
INSERT INTO `wishlists` VALUES (2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9);
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-04 18:19:59
