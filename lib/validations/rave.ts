import * as z from "zod"

export const ravePostSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  candy: z.string().optional(),
  memories: z.string().optional(),
  quantity: z.coerce.number().optional(),
  ayn: z.coerce.number().lte(1000, 'Ayn cannot be greater than 1000.'),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  djs: z.string().min(2, {
    message: "Djs must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "Date of rave is required.",
  })
})

export const raveUpdateSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  candy: z.string().optional(),
  quantity: z.coerce.number().optional(),
  ayn: z.coerce.number().lte(1000, 'Ayn cannot be greater than 1000.'),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  djs: z.string().min(2, {
    message: "Djs must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "Date of rave is required.",
  })
})