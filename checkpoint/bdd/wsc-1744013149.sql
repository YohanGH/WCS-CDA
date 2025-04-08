CREATE TABLE IF NOT EXISTS `Recruiter` (
	`id` integer primary key NOT NULL UNIQUE,
	`login` TEXT NOT NULL UNIQUE,
	`password` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `Candidate` (
	`id` integer primary key NOT NULL UNIQUE,
	`login` TEXT NOT NULL UNIQUE,
	`password` TEXT NOT NULL,
	`lastname` TEXT NOT NULL,
	`firstname` TEXT NOT NULL,
	`email` TEXT NOT NULL,
	`presentation` TEXT,
	`phone_number` TEXT
);
CREATE TABLE IF NOT EXISTS `Company` (
	`id` integer primary key NOT NULL UNIQUE,
	`name` TEXT NOT NULL,
	`description` TEXT NOT NULL,
	`recruiter_id` INTEGER NOT NULL UNIQUE,
FOREIGN KEY(`recruiter_id`) REFERENCES `Recruiter`(`id`)
);
CREATE TABLE IF NOT EXISTS `Job_offer` (
	`id` integer primary key NOT NULL UNIQUE,
	`title_post` TEXT NOT NULL,
	`job_description` TEXT NOT NULL,
	`city_post` TEXT NOT NULL,
	`company_id` INTEGER NOT NULL,
FOREIGN KEY(`company_id`) REFERENCES `Company`(`id`)
);
CREATE TABLE IF NOT EXISTS `job_applications` (
	`id` integer primary key NOT NULL UNIQUE,
	`candidate_id` INTEGER NOT NULL,
	`job_offer_id` INTEGER NOT NULL UNIQUE,
FOREIGN KEY(`candidate_id`) REFERENCES `Candidate`(`id`),
FOREIGN KEY(`job_offer_id`) REFERENCES `Job_offer`(`id`)
);