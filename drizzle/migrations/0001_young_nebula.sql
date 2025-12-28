CREATE TABLE `movie_casts` (
	`id` varchar(36) NOT NULL,
	`movie_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(100) NOT NULL,
	`image_url` varchar(512),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `movie_casts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`duration` int NOT NULL,
	`release_date` date NOT NULL,
	`genres` json NOT NULL,
	`language` varchar(50) NOT NULL,
	`language_versions` json NOT NULL,
	`poster_url` varchar(512) NOT NULL,
	`trailer_url` varchar(512),
	`certification` varchar(10) NOT NULL,
	`status` varchar(20) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `movies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `movie_casts` ADD CONSTRAINT `movie_casts_movie_id_movies_id_fk` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE no action ON UPDATE no action;