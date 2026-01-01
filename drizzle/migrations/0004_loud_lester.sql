CREATE TABLE `screens` (
	`id` varchar(36) NOT NULL,
	`theater_id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`seat_layout_template_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `screens_id` PRIMARY KEY(`id`)
);
