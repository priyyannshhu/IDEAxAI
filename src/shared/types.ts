import z from "zod";

export const BlueprintSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const StartupBlueprintSchema = z.object({
  startupOverview: z.string(),
  problemStatement: z.string(),
  targetAudience: z.string(),
  mvpFeatures: z.string(),
  techStack: z.string(),
  revenueModel: z.string(),
  marketingStrategy: z.string(),
  competitorAnalysis: z.string(),
  uniqueValueProposition: z.string(),
  validationStrategy: z.string(),
  developmentRoadmap: z.string(),
});

export type StartupBlueprint = z.infer<typeof StartupBlueprintSchema>;

export const GenerateBlueprintRequestSchema = z.object({
  idea: z.string().min(10, "Please provide a more detailed idea description"),
});

export type GenerateBlueprintRequest = z.infer<typeof GenerateBlueprintRequestSchema>;
