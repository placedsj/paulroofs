
'use server';

/**
 * @fileOverview An AI-powered tool for generating roofing quotes.
 * - generateQuote - A function that creates a detailed quote based on project details.
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuoteInputSchema = z.object({
  clientName: z.string().describe('The name of the client.'),
  clientAddress: z.string().describe('The address of the project.'),
  roofType: z.enum(['Metal', 'Asphalt Shingles']).describe('The type of roofing material.'),
  roofSize: z.number().describe('The size of the roof in square feet.'),
  specialRequests: z.string().optional().describe('Any special requests from the client.'),
});
export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

const LineItemSchema = z.object({
    item: z.string().describe('Description of the line item.'),
    quantity: z.number().describe('Quantity of the item.'),
    unitCost: z.number().describe('Cost per unit.'),
    total: z.number().describe('Total cost for the line item (quantity * unitCost).')
});

const GenerateQuoteOutputSchema = z.object({
  quoteId: z.string().describe('A unique identifier for the quote (e.g., Q-2024-001).'),
  date: z.string().describe('The date the quote was generated (e.g., YYYY-MM-DD).'),
  validUntil: z.string().describe('The date the quote is valid until (30 days from generation).'),
  lineItems: z.array(LineItemSchema).describe('A detailed list of materials and labor costs.'),
  subtotal: z.number().describe('The sum of all line item totals.'),
  tax: z.number().describe('The calculated tax amount (e.g., 15% of subtotal).'),
  total: z.number().describe('The final quote total (subtotal + tax).'),
  notes: z.string().describe('Additional notes, terms, or warranty information.'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(input: GenerateQuoteInput): Promise<GenerateQuoteOutput> {
  return quoteGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quoteGeneratorPrompt',
  input: { schema: GenerateQuoteInputSchema },
  output: { schema: GenerateQuoteOutputSchema },
  prompt: `You are an expert roofing estimator for "Paul's Roofing". Generate a detailed and professional quote based on the following project information.

Current Date: ${new Date().toISOString().split('T')[0]}

Project Details:
- Client Name: {{{clientName}}}
- Project Address: {{{clientAddress}}}
- Roof Type: {{{roofType}}}
- Roof Size (sq ft): {{{roofSize}}}
- Special Requests: {{{specialRequests}}}

Instructions:
1.  Generate a unique Quote ID starting with "Q-2024-".
2.  Set the quote date to today and the expiry date to 30 days from today.
3.  Create realistic line items for materials and labor. 
    - For Metal roofs, use a base material cost of $9 per sq ft.
    - For Asphalt Shingles, use a base material cost of $4 per sq ft.
    - Labor cost is $6 per sq ft for both.
    - Include line items for underlayment, flashing, fasteners/nails, ventilation, and waste disposal. Adjust quantities based on roof size.
4.  Calculate the subtotal from the line items.
5.  Calculate tax (HST) at 15% of the subtotal.
6.  Calculate the final total.
7.  Include professional notes about the warranty (e.g., "40-Year Material Warranty for Metal" or "25-Year Material Warranty for Shingles") and a thank you message.
`,
});


const quoteGeneratorFlow = ai.defineFlow(
  {
    name: 'quoteGeneratorFlow',
    inputSchema: GenerateQuoteInputSchema,
    outputSchema: GenerateQuoteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
