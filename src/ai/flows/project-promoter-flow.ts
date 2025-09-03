'use server';

/**
 * @fileOverview An AI-powered tool for generating social media posts about completed projects.
 *
 * - generatePromotion - A function that creates a social media post from project details.
 * - GeneratePromotionInput - The input type for the generatePromotion function.
 * - GeneratePromotionOutput - The return type for the generatePromotion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GeneratePromotionInputSchema = z.object({
  roofType: z.string().describe('The type of roofing material used (e.g., "Standing Seam Metal", "Asphalt Shingles").'),
  roofColor: z.string().describe('The color of the new roof (e.g., "Charcoal Grey", "Driftwood").'),
  location: z.string().describe('The general location of the project (e.g., "in Rothesay", "near Quispamsis").'),
  keyDetail: z.string().optional().describe('A key highlight or special detail about the project (e.g., "Finished in just two days!", "Replaced a 30-year-old leaky roof.").'),
});
export type GeneratePromotionInput = z.infer<typeof GeneratePromotionInputSchema>;


const GeneratePromotionOutputSchema = z.object({
  socialMediaPost: z.string().describe('The generated social media post text, including hashtags.'),
});
export type GeneratePromotionOutput = z.infer<typeof GeneratePromotionOutputSchema>;


export async function generatePromotion(input: GeneratePromotionInput): Promise<GeneratePromotionOutput> {
  return generatePromotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromotionPrompt',
  input: { schema: GeneratePromotionInputSchema },
  output: { schema: GeneratePromotionOutputSchema },
  prompt: `You are a friendly and professional social media manager for "Paul's Roofing". Your goal is to generate an engaging social media post to showcase a recently completed project.

The tone should be proud, professional, and focused on quality and customer satisfaction.

Project Details:
- Roof Type: {{{roofType}}}
- Roof Color: {{{roofColor}}}
- Location: {{{location}}}
{{#if keyDetail}}- Key Highlight: {{{keyDetail}}}{{/if}}

Instructions:
1.  Write a short, engaging paragraph about the project.
2.  Mention the type and color of the roof.
3.  Include a call to action, like asking people to call for a free quote.
4.  End with relevant hashtags, such as #PaulsRoofing #NewRoof #MetalRoofing #AsphaltShingles #QualityCraftsmanship and a location-specific hashtag based on the input.
`,
});


const generatePromotionFlow = ai.defineFlow(
  {
    name: 'generatePromotionFlow',
    inputSchema: GeneratePromotionInputSchema,
    outputSchema: GeneratePromotionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
