CREATE TABLE `leadMagnetDownloads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadMagnetId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(200),
	`facilityName` varchar(200),
	`facilityType` varchar(50),
	`residentCount` int,
	`jobTitle` varchar(100),
	`phoneNumber` varchar(20),
	`calculatorLeadId` int,
	`utmSource` varchar(100),
	`utmMedium` varchar(100),
	`utmCampaign` varchar(100),
	`ipAddress` varchar(45),
	`userAgent` text,
	`downloadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leadMagnetDownloads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leadMagnets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`type` varchar(50) NOT NULL,
	`category` varchar(50) NOT NULL,
	`fileUrl` varchar(500) NOT NULL,
	`thumbnailUrl` varchar(500),
	`fileSize` int,
	`downloadCount` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leadMagnets_id` PRIMARY KEY(`id`)
);
