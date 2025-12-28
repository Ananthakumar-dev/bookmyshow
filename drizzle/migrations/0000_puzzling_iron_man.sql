CREATE TABLE `theaters` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`city` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`phone` varchar(20),
	`email` varchar(255),
	`photo` varchar(512),
	`latitude` decimal(9,6),
	`longitude` decimal(9,6),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `theaters_id` PRIMARY KEY(`id`)
);
