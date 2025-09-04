'use server';

/**
 * @fileOverview An AI-powered tool for refining rough daily project log notes into professional entries.
 *
 * - refineLogEntry - A function that cleans up and formats a log entry.
 * - RefineLogEntryInput - The input type for the refineLogEntry function.
 * - RefineLogEntryOutput - The return type for the refineLogEntry function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const RefineLogEntryInputSchema = z.object({
  rawNotes: z.string().describe('The rough, unedited notes for a daily project log entry.'),
});
export type RefineLogEntryInput = z.infer<typeof RefineLogEntryInputSchema>;


const RefineLogEntryOutputSchema = z.object({
  refinedEntry: z.string().describe('The polished, professional version of the log entry.'),
});
export type RefineLogEntryOutput = z.infer<typeof RefineLogEntryOutputSchema>;


export async function refineLogEntry(input: RefineLogEntryInput): Promise<RefineLogEntryOutput> {
  return refineLogEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineLogEntryPrompt',
  input: { schema: RefineLogEntryInputSchema },
  output: { schema: RefineLogEntryOutputSchema },
  prompt: `You are an assistant for a professional roofer named Paul. Your task is to take his rough, quickly-typed daily log notes and refine them into clear, professional, and well-written log entries.

The tone should be concise and professional. Correct any spelling or grammar mistakes. Expand on abbreviations where appropriate (e.g., 'w/' becomes 'with'). The output should be a single, coherent sentence or two.

Do not add any extra information that isn't present in the notes. Just clean up what's there.

Raw Notes:
"{{{rawNotes}}}"
`,
});


const refineLogEntryFlow = ai.defineFlow(
  {
    name: 'refineLogEntryFlow',
    inputSchema: RefineLogEntryInputSchema,
    outputSchema: RefineLogEntryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
