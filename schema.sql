DROP DATABASE IF EXISTS cardscartdb;
CREATE DATABASE cardscartdb;
USE cardscartdb;

CREATE TABLE contacts
(
`id` int NOT NULL AUTO_INCREMENT,
`Name` varchar(50) NOT NULL,
`birthday` varchar(255),
`streetAddress` varchar(50) ,
`city` varchar(50),
`state` varchar(50),
`country` varchar(50),
`postalCode` varchar(15),
`additionalNotes` varchar(70) ,
PRIMARY KEY (id)
);