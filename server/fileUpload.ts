import { adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { storagePut } from "./storage";

/**
 * File Upload Router
 * 
 * Handles file uploads to S3 for lead magnet resources.
 * Supports PDFs and images (thumbnails).
 */

export const fileUploadRouter = router({
  /**
   * Upload a file to S3
   * Admin only - used for uploading lead magnet PDFs and thumbnails
   */
  uploadFile: adminProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
        fileData: z.string(), // Base64 encoded file data
        folder: z.enum(["resources", "thumbnails"]).default("resources"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Decode base64 file data
        const buffer = Buffer.from(input.fileData, "base64");

        // Generate unique filename with timestamp
        const timestamp = Date.now();
        const sanitizedFileName = input.fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const key = `${input.folder}/${timestamp}-${sanitizedFileName}`;

        // Upload to S3
        const result = await storagePut(key, buffer, input.fileType);

        if (!result || !result.url) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to upload file to storage",
          });
        }

        console.log(`[FileUpload] Uploaded: ${key} → ${result.url}`);

        return {
          success: true,
          url: result.url,
          key: result.key,
          fileName: sanitizedFileName,
        };
      } catch (error: any) {
        console.error("[FileUpload] Upload error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to upload file",
        });
      }
    }),

  /**
   * Get presigned URL for file download
   * Used for previewing files before upload
   */
  getFileUrl: adminProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { storageGet } = await import("./storage");
        const result = await storageGet(input.key);

        if (!result || !result.url) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "File not found",
          });
        }

        return {
          url: result.url,
        };
      } catch (error: any) {
        console.error("[FileUpload] Get URL error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get file URL",
        });
      }
    }),
});
