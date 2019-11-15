CREATE DATABASE IF NOT EXISTS ynot;

USE ynot;

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `budget_id` varchar(255) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_name` varchar(255) DEFAULT NULL,
  `budget_name` varchar(255) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE USER IF NOT EXISTS 'ynot'@'localhost' IDENTIFIED BY 'ynot';
GRANT ALL PRIVILEGES ON ynot.* to 'ynot'@'localhost';
FLUSH PRIVILEGES;

