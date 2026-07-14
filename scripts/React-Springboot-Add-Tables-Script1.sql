CREATE DATABASE IF NOT EXISTS `reactlibrarydatabase`;
USE `reactlibrarydatabase`;

DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
	`id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(40) DEFAULT NULL,
    `author` VARCHAR(40) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `copies` INT DEFAULT NULL,
    `copies_available` INT DEFAULT NULL,
    `category` VARCHAR(10) DEFAULT NULL,
    `img` VARCHAR(200) DEFAULT NULL
);

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
	`id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) DEFAULT NULL,
    `date` DATETIME(0) DEFAULT NULL,
    `rating` DECIMAL(3,2) DEFAULT NULL CHECK (rating >= 0 AND rating <= 5),
    `book_id` INT DEFAULT NULL,
    `review_description` TEXT DEFAULT NULL
);

INSERT INTO `review` VALUES
(1, 'ahmad.rezaei@gmail.com', '2025-05-20 10:30:00', 4.5, 1, 'Excellent book for learning software engineering with Python.'),
(2, 'sara.mohammadi@yahoo.com', '2025-05-19 15:20:00', 4.0, 1, 'Good but some chapters are too advanced for beginners.'),
(3, 'reza.karimi@gmail.com', '2025-05-18 09:15:00', 4.8, 2, 'Amazing examples! Really helped me understand advanced concepts.'),
(4, 'narges.ahmadi@yahoo.com', '2025-05-17 14:45:00', 4.2, 2, 'Good book but needs more explanation on some topics.'),
(5, 'mohsen.jalili@gmail.com', '2025-05-21 11:00:00', 4.9, 3, 'Perfect for Android development! Highly recommended.');

DROP TABLE IF EXISTS `checkout`;
CREATE TABLE `checkout` (
	`id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) DEFAULT NULL,
    `checkout_date` DATE DEFAULT NULL,
    `return_date`  DATE DEFAULT NULL,
    `book_id` INT DEFAULT NULL
);

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
	`id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`user_email` VARCHAR(45) DEFAULT NULL,
    `title` VARCHAR(40) DEFAULT NULL,
    `question` TEXT DEFAULT NULL,
    `admin_email` VARCHAR(45) DEFAULT NULL,
    `response` TEXT DEFAULT NULL,
    `closed` BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS `history`;
CREATE TABLE history (
    `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `user_email` VARCHAR(45) DEFAULT NULL,
    `checkout_date` DATE DEFAULT NULL,
    `return_date` DATE DEFAULT NULL,
    `title` VARCHAR(40) DEFAULT NULL,
    `author` VARCHAR(40)DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `img` VARCHAR(200) DEFAULT NULL
);


