import { z } from "zod";

export const averageSchema = z.object({
  query: z.object({
    minimalRatings: z.string()
  })
});

export type AveragePayload = z.infer<typeof averageSchema>["query"];
