import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact request submitted successfully",
        id: contactRequest.id,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      } else {
        console.error("Error creating contact request:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Get all contact requests (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Update contact request status
  app.patch("/api/contact/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status || typeof status !== "string") {
        return res.status(400).json({
          success: false,
          message: "Status is required and must be a string",
        });
      }

      const updatedRequest = await storage.updateContactRequestStatus(id, status);
      
      if (!updatedRequest) {
        return res.status(404).json({
          success: false,
          message: "Contact request not found",
        });
      }

      res.json({
        success: true,
        message: "Status updated successfully",
        request: updatedRequest,
      });
    } catch (error) {
      console.error("Error updating contact request status:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
