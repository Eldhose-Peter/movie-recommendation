import { z } from "zod";

export const filterSchema = z.object({
  query: z.object({
    genre: z
      .string()
      .optional()
      .transform((val) => Number(val)),
    yearAfter: z
      .string()
      .optional()
      .transform((val) => Number(val)),
    minimalVoters: z
      .string()
      .optional()
      .transform((val) => Number(val))
  })
});

export const similaritySchema = filterSchema.extend({
  query: filterSchema.shape.query.merge(
    z.object({
      numSimilarRaters: z.string()
    })
  )
});
