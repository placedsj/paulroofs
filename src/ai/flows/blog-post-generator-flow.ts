'use server';

/**
 * @fileOverview An AI-powered tool for generating hilarious, dad-joke-filled blog posts about roofing.
 * - generateBlogPost - A function that creates a blog post.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The main topic of the blog post (e.g., "Benefits of Metal Roofing in Winter").'),
  keywords: z.array(z.string()).describe('A list of SEO keywords to include in the post (e.g., "Quispamsis roofing", "metal roof").'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;


const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('A catchy, pun-filled title for the blog post.'),
  slug: z.string().describe('A URL-friendly slug for the blog post (e.g., "why-metal-roofs-are-cool").'),
  introduction: z.string().describe("An engaging introduction with a dad joke."),
  mainContent: z.array(z.object({
    heading: z.string().describe("The heading for this section."),
    paragraphs: z.array(z.string()).describe("The paragraphs for this section, each ending with a pun or dad joke if possible."),
  })).describe("The main sections of the blog post."),
  conclusion: z.string().describe("A concluding paragraph that summarizes the post and has a final dad joke."),
  publishedDate: z.string().describe("The publication date in YYYY-MM-DD format."),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;


export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `You are a helpful, knowledgeable, and hilarious content writer for "Paul's Roofing," a company based in Quispamsis, New Brunswick. Your specialty is writing SEO-friendly blog posts about metal and asphalt roofing, but with a twist: every post must be filled with puns and classic dad jokes.

The tone should be lighthearted and funny, but the information must be accurate and genuinely useful for homeowners in Southern New Brunswick.

Today's Date: ${new Date().toISOString().split('T')[0]}

Instructions:
1.  Generate a blog post based on the provided topic and keywords.
2.  The title must be a pun or a play on words related to roofing.
3.  The introduction must include a cheesy dad joke.
4.  Each paragraph in the main content should try to end with a pun if it feels natural.
5.  The conclusion needs a final, groan-worthy dad joke.
6.  The content must be structured, with a clear introduction, multiple sections with headings, and a conclusion.
7.  Naturally weave in the provided SEO keywords, especially location-based ones like "Quispamsis," "Rothesay," "Saint John," or "Southern New Brunswick."
8.  Generate a URL-friendly slug based on the title.
9.  Set the publishedDate to today's date.

Topic: {{{topic}}}
Keywords: {{{keywords}}}
`,
});


const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
