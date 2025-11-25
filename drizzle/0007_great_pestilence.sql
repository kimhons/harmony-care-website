ALTER TABLE `calculatorLeads` ADD `nurtureSequence` text;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `lastNurtureEmail` varchar(50);--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `lastNurtureEmailSentAt` timestamp;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `nurtureCompleted` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `leadScore` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `leadTier` varchar(20) DEFAULT 'cold' NOT NULL;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `engagementScore` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `calculatorLeads` ADD `lastEngagementAt` timestamp;