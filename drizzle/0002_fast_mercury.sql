ALTER TABLE `signups` ADD `emailsSent` text;--> statement-breakpoint
ALTER TABLE `signups` ADD `lastEmailSent` timestamp;--> statement-breakpoint
ALTER TABLE `signups` ADD `emailOptOut` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `signups` ADD `campaignStatus` varchar(50) DEFAULT 'active' NOT NULL;