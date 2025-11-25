CREATE TABLE `milestoneNotifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`signupId` int NOT NULL,
	`milestoneId` varchar(50) NOT NULL,
	`milestoneType` varchar(50) NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`badgePath` varchar(500) NOT NULL,
	`isViewed` int NOT NULL DEFAULT 0,
	`isShared` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `milestoneNotifications_id` PRIMARY KEY(`id`)
);
