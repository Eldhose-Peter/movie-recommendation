import { z } from "zod";

export const filterSchema = z.object({
  query: z.object({
    director: z.string().optional(),
    genre: z.string().optional(),
    minutes: z
      .string()
      .optional()
      .transform((val) => Number(val)),
    yearAfter: z
      .string()
      .optional()
      .transform((val) => Number(val))
  })
});

// Define the average schema by merging the filter schema
export const averageSchema = filterSchema.extend({
  query: filterSchema.shape.query.merge(
    z.object({
      minimalRatings: z.string()
    })
  )
});

export const similaritySchema = filterSchema.extend({
  query: filterSchema.shape.query.merge(
    z.object({
      minimalRatings: z.string(),
      numSimilarRaters: z.string()
    })
  )
});

export type AveragePayload = z.infer<typeof averageSchema>["query"];
