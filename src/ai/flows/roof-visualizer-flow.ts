'use server';

/**
 * @fileOverview An AI-powered tool for visualizing new roofs on a user's house.
 * - visualizeRoof - A function that takes a house photo and roof details to generate a new image.
 * - VisualizeRoofInput - The input type for the visualizeRoof function.
 * - VisualizeRoofOutput - The return type for the visualizeRoof function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const VisualizeRoofInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a house, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roofType: z.string().describe("The type of roof to add (e.g., 'metal roof', 'asphalt shingle roof')."),
    roofColor: z.string().describe("The color of the new roof (e.g., 'charcoal grey', 'driftwood brown').")
});
export type VisualizeRoofInput = z.infer<typeof VisualizeRoofInputSchema>;


const VisualizeRoofOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image of the house with the new roof, as a Base64-encoded data URI.'),
});
export type VisualizeRoofOutput = z.infer<typeof VisualizeRoofOutputSchema>;


export async function visualizeRoof(input: VisualizeRoofInput): Promise<VisualizeRoofOutput> {
  return visualizeRoofFlow(input);
}

const visualizeRoofFlow = ai.defineFlow(
  {
    name: 'visualizeRoofFlow',
    inputSchema: VisualizeRoofInputSchema,
    outputSchema: VisualizeRoofOutputSchema,
  },
  async ({ photoDataUri, roofType, roofColor }) => {
    
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            { media: { url: photoDataUri } },
            { text: `Professionally replace the existing roof on this house with a high-quality ${roofColor} ${roofType}. The new roof should look realistic, with proper lighting, shadows, and perspective that matches the original photo. Ensure the final image is a photorealistic depiction of the completed roofing project.` },
        ],
        config: {
            responseModalities: ['IMAGE'],
        },
    });

    if (!media?.url) {
      throw new Error('Image generation failed. The AI model did not return an image.');
    }
    
    return { imageDataUri: media.url };
  }
);
