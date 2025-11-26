ALTER TABLE `leadMagnetDownloads` ADD `nurtureSequence` text;--> statement-breakpoint
ALTER TABLE `leadMagnetDownloads` ADD `lastNurtureEmail` varchar(50);--> statement-breakpoint
ALTER TABLE `leadMagnetDownloads` ADD `lastNurtureEmailSentAt` timestamp;--> statement-breakpoint
ALTER TABLE `leadMagnetDownloads` ADD `nurtureCompleted` int DEFAULT 0 NOT NULL;