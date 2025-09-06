
'use server';

/**
 * @fileOverview An AI-powered tool for generating blog posts about roofing.
 * - generateBlogPost - A function that creates a blog post.
 * - GenerateBlogPostInput - The input type for the generateBlogPost function.
 * - GenerateBlogPostOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;
const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The main topic of the blog post (e.g., "Benefits of Asphalt Shingles").'),
  keywords: z.array(z.string()).describe('A list of SEO keywords to include in the post (e.g., "roofing company", "asphalt shingles").'),
});

export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;
const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('A catchy title for the blog post.'),
  slug: z.string().describe('A URL-friendly slug for the blog post (e.g., "why-asphalt-is-awesome").'),
  introduction: z.string().describe("An engaging introduction."),
  mainContent: z.array(z.object({
    heading: z.string().describe("The heading for this section."),
    paragraphs: z.array(z.string()).describe("The paragraphs for this section."),
  })).describe("The main sections of the blog post."),
  conclusion: z.string().describe("A concluding paragraph that summarizes the post."),
  publishedDate: z.string().describe("The publication date in YYYY-MM-DD format."),
});


const prompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `You are a helpful, knowledgeable content writer for "Paul's Roofing," a modern roofing company. Your specialty is writing SEO-friendly blog posts about roofing.

The tone should be professional, informative, and engaging.

Today's Date: ${new Date().toISOString().split('T')[0]}

Instructions:
1.  Generate a blog post based on the provided topic and keywords.
2.  The title must be relevant and engaging.
3.  The content must be structured, with a clear introduction, multiple sections with headings, and a conclusion.
4.  Naturally weave in the provided SEO keywords.
5.  Generate a URL-friendly slug based on the title.
6.  Set the publishedDate to today's date.

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

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}
