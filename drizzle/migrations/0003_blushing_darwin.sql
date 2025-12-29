CREATE TABLE `seat_layout_templates` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`layout` json NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seat_layout_templates_id` PRIMARY KEY(`id`)
);
