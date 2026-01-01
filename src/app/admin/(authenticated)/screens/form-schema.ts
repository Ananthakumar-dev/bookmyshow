import { z } from "zod";

export const screenSchema = z.object({
  name: z.string().min(1, "Screen name is required"),
  theaterId: z.string().min(1, "Select a theater"),
  seatLayoutTemplateId: z.string().min(
    1,
    "Select a seat layout template"
  ),
});

export type ScreenForm = z.infer<typeof screenSchema>;