import * as z from "zod"

export const ravePatchSchema = z.object({
  name: z.string().min(1),
  candy: z.string().optional(),
  anecdotes: z.string().optional(),
  quantity: z.number().optional().superRefine((value, ctx) => {
    if (value !== undefined && value <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantity must be greater than 0",
      });
    }
    return value;
  }),
  ayn: z.number().int(),
  genre: z.string().min(1),
  location: z.string().min(1),
  rank: z.number().int(),
  date: z.date()
})


export const ravePostSchema = z.object({
  name: z.string().min(1),
  candy: z.string().optional(),
  anecdotes: z.string().optional(),
  quantity: z.number().optional().superRefine((value, ctx) => {
    if (value !== undefined && value <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantity must be greater than 0",
      });
    }
    return value;
  }),
  ayn: z.number().int(),
  genre: z.string().min(1),
  location: z.string().min(1),
  rank: z.number().int(),
  date: z.date()
})