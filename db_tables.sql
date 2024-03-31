CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(512) DEFAULT NULL,
  `password_hash` varchar(1024) DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `phone` varchar(120) DEFAULT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_line_1` varchar(1024) DEFAULT NULL,
  `address_line_2` varchar(1024) DEFAULT NULL,
  `landmark` varchar(1024) DEFAULT NULL,
  `state` varchar(512) DEFAULT NULL,
  `zip_code` varchar(512) DEFAULT NULL,
  `country` varchar(512) DEFAULT NULL,
  `is_selected` tinyint(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `inserted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(512) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category` varchar(512) DEFAULT NULL,
  `count` varchar(512) DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `inserted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_ibfk_1` (`merchant_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `buyer_id` int DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `status` varchar(512) DEFAULT NULL,
  `tracking_id` varchar(512) DEFAULT NULL,
  `payment_method` varchar(512) DEFAULT NULL,
  `inserted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `address_id` (`address_id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `merchant_id` (`merchant_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `order_ibfk_4` FOREIGN KEY (`merchant_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
