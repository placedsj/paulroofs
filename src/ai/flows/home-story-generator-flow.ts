
'use server';

/**
 * @fileOverview An AI-powered tool for generating a creative story about a client's home.
 * - generateHomeStory - A function that creates a story from a house photo.
 * - GenerateHomeStoryInput - The input type for the generateHomeStory function.
 * - GenerateHomeStoryOutput - The return type for the generateHomeStory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateHomeStoryInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a client's house, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roofType: z.string().describe("The type of new roof being installed (e.g., 'a beautiful new metal roof')."),
});
export type GenerateHomeStoryInput = z.infer<typeof GenerateHomeStoryInputSchema>;


const GenerateHomeStoryOutputSchema = z.object({
  story: z.string().describe('A short, creative, and heartwarming story about the house and the family inside, incorporating the new roof as a key element.'),
});
export type GenerateHomeStoryOutput = z.infer<typeof GenerateHomeStoryOutputSchema>;


export async function generateHomeStory(input: GenerateHomeStoryInput): Promise<GenerateHomeStoryOutput> {
  return generateHomeStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHomeStoryPrompt',
  input: { schema: GenerateHomeStoryInputSchema },
  output: { schema: GenerateHomeStoryOutputSchema },
  prompt: `You are a warm, imaginative storyteller with a knack for seeing the heart in a home. You've been asked by Paul's Roofing, a company with 'Old School Work Ethic,' to write a short, creative story about a client's house based on a photo.

The story should be heartwarming, slightly fantastical, and make the family feel like their home is a special, living place. It's a gift to them before their roofing project begins.

Instructions:
1.  Analyze the provided photo of the house. Look for unique details: the style of the house, the garden, any visible toys, the color of the paint, the surrounding trees.
2.  Write a story (2-4 paragraphs) from the perspective of a friendly observer (like a wise old oak tree or a talkative garden gnome).
3.  Imagine the life and memories made within the walls of the house.
4.  Subtly weave in the upcoming installation of {{{roofType}}} as a new, protective chapter in the home's life, a 'crown' for a deserving king or queen.
5.  Keep the tone light, positive, and full of wonder. This is a feel-good story.

Photo of the house: {{media url=photoDataUri}}
`,
});


const generateHomeStoryFlow = ai.defineFlow(
  {
    name: 'generateHomeStoryFlow',
    inputSchema: GenerateHomeStoryInputSchema,
    outputSchema: GenerateHomeStoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
