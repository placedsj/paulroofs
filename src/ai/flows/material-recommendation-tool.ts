'use server';

/**
 * @fileOverview An AI-powered tool that recommends roofing materials and colors based on house style and location.
 *
 * - recommendMaterials - A function that handles the material recommendation process.
 * - RecommendMaterialsInput - The input type for the recommendMaterials function.
 * - RecommendMaterialsOutput - The return type for the recommendMaterials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMaterialsInputSchema = z.object({
  houseStyle: z
    .string()
    .describe('The architectural style of the house (e.g., Colonial, Ranch, Modern).'),
  location: z
    .string()
    .describe('The geographical location of the house (city, state/province).'),
});
export type RecommendMaterialsInput = z.infer<typeof RecommendMaterialsInputSchema>;

const RecommendMaterialsOutputSchema = z.object({
  materialRecommendation: z.string().describe('Recommended roofing material.'),
  colorRecommendation: z.string().describe('Recommended color for the roofing.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type RecommendMaterialsOutput = z.infer<typeof RecommendMaterialsOutputSchema>;

export async function recommendMaterials(input: RecommendMaterialsInput): Promise<RecommendMaterialsOutput> {
  return recommendMaterialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMaterialsPrompt',
  input: {schema: RecommendMaterialsInputSchema},
  output: {schema: RecommendMaterialsOutputSchema},
  prompt: `You are an expert roofing consultant. Based on the house style and location provided, recommend a roofing material and color that is both aesthetically pleasing and weather-resistant.

House Style: {{{houseStyle}}}
Location: {{{location}}}

Consider factors such as:
* The typical weather patterns in the specified location.
* The architectural style of the house and what materials/colors would complement it.
* The durability and longevity of the roofing material.

Provide a brief explanation for your recommendations.
`,
});

const recommendMaterialsFlow = ai.defineFlow(
  {
    name: 'recommendMaterialsFlow',
    inputSchema: RecommendMaterialsInputSchema,
    outputSchema: RecommendMaterialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
