'use server';

/**
 * @fileOverview An AI-powered tool that suggests siding and trim colors to complement a given roof color.
 *
 * - suggestColors - A function that handles the color suggestion process.
 * - SuggestColorsInput - The input type for the suggestColors function.
 * - SuggestColorsOutput - The return type for the suggestColors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestColorsInputSchema = z.object({
  roofColor: z.string().describe('The primary color of the roof (e.g., "Charcoal Grey", "Forest Green").'),
  houseStyle: z.string().optional().describe('The architectural style of the house (e.g., "Colonial", "Ranch", "Modern"). This can help refine color choices.')
});
export type SuggestColorsInput = z.infer<typeof SuggestColorsInputSchema>;

const ColorSuggestionSchema = z.object({
    name: z.string().describe("The name of the color (e.g., 'Dover White', 'Naval Blue')."),
    hex: z.string().describe("The hex code for the color (e.g., '#FFFFFF').")
});

const SuggestColorsOutputSchema = z.object({
  sidingColor: ColorSuggestionSchema,
  trimColor: ColorSuggestionSchema,
  accentColor: ColorSuggestionSchema.describe("An optional accent color for doors or shutters."),
  reasoning: z.string().describe('The reasoning behind the color palette suggestion, explaining why the colors work well together.'),
});
export type SuggestColorsOutput = z.infer<typeof SuggestColorsOutputSchema>;

export async function suggestColors(input: SuggestColorsInput): Promise<SuggestColorsOutput> {
  return suggestColorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestColorsPrompt',
  input: {schema: SuggestColorsInputSchema},
  output: {schema: SuggestColorsOutputSchema},
  prompt: `You are an expert exterior home designer. A client has chosen a roof color and needs help selecting complementary colors for their siding, trim, and accents.

Roof Color: {{{roofColor}}}
{{#if houseStyle}}House Style: {{{houseStyle}}}{{/if}}

Based on this information, provide a palette of colors that will create a beautiful and harmonious exterior.

-   The siding color should be the main body color of the house.
-   The trim color should complement both the roof and the siding. It's often a white, off-white, or a contrasting dark color.
-   The accent color is for details like the front door or shutters and should add a pop of personality.
-   Provide a brief reasoning for your choices, explaining the design principles behind the palette.
-   Return valid hex codes for each color.
`,
});

const suggestColorsFlow = ai.defineFlow(
  {
    name: 'suggestColorsFlow',
    inputSchema: SuggestColorsInputSchema,
    outputSchema: SuggestColorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
