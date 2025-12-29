import { z } from "zod";

/** Row */
export const rowSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, "Row name is required"),
    seatCount: z.number().int().min(1),
    gapsText: z.string().optional(),
    gaps: z.array(z.number().int().positive()).optional(),
  })
  .superRefine((row, ctx) => {
    if (!row.gaps) return;

    // gap cannot exceed seatCount
    for (const gap of row.gaps) {
      if (gap > row.seatCount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["gaps"],
          message: "Gap cannot exceed seat count",
        });
        return;
      }
    }

    // no duplicate gaps
    if (new Set(row.gaps).size !== row.gaps.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["gaps"],
        message: "Duplicate gap positions are not allowed",
      });
    }
  });


/** Section */
export const sectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Section name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  rowGapAfter: z.number().int().min(0).optional(),
  rows: z.array(rowSchema).min(1, "At least one row is required"),
});

/** Layout */
export const seatLayoutSchema = z.object({
  name: z.string().min(1, "Layout name is required"),
  sections: z.array(sectionSchema).min(1, "At least one section is required"),
});

export type SeatLayoutForm = z.infer<typeof seatLayoutSchema>;
