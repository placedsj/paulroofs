
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LineItemSchema = z.object({
    item: z.string().describe('Description of the line item.'),
    quantity: z.number().describe('Quantity of the item.'),
    unitCost: z.number().describe('Cost per unit.'),
    total: z.number().describe('Total cost for the line item (quantity * unitCost).')
});

export type GenerateInvoiceInput = z.infer<typeof GenerateInvoiceInputSchema>;
const GenerateInvoiceInputSchema = z.object({
  clientName: z.string().describe('The name of the client.'),
  clientAddress: z.string().describe('The address where the work was completed.'),
  workDescription: z.string().describe('A brief summary of the work completed.'),
  lineItems: z.array(LineItemSchema).describe('A detailed list of materials and labor costs.'),
  subtotal: z.number().describe('The sum of all line item totals.'),
  tax: z.number().describe('The calculated tax amount.'),
  total: z.number().describe('The final total amount due.'),
  quoteId: z.string().optional().describe('The original quote ID, if applicable.'),
});

export type GenerateInvoiceOutput = z.infer<typeof GenerateInvoiceOutputSchema>;
const GenerateInvoiceOutputSchema = z.object({
  invoiceId: z.string().describe('A unique identifier for the invoice (e.g., INV-2024-001).'),
  issueDate: z.string().describe('The date the invoice was issued (YYYY-MM-DD).'),
  dueDate: z.string().describe('The date the payment is due (e.g., 14 days from issue date).'),
  notes: z.string().describe('Additional notes, such as payment instructions or a thank you message.'),
});


export async function generateInvoice(input: GenerateInvoiceInput): Promise<GenerateInvoiceOutput> {
  const prompt = ai.definePrompt({
    name: 'generateInvoicePrompt',
    input: { schema: GenerateInvoiceInputSchema },
    output: { schema: GenerateInvoiceOutputSchema },
    prompt: `You are the accounting department for "Asphalt Bros Roofing LTD". Generate a professional invoice based on the following completed project information.

    Current Date: ${new Date().toISOString().split('T')[0]}

    Project Details:
    - Client Name: {{{clientName}}}
    - Project Address: {{{clientAddress}}}
    - Work Summary: {{{workDescription}}}
    - Original Quote ID: {{{quoteId}}}
    - Subtotal: {{{subtotal}}}
    - Tax: {{{tax}}}
    - Total: {{{total}}}

    Instructions:
    1.  Generate a unique Invoice ID starting with "INV-2024-".
    2.  Set the Issue Date to today.
    3.  Set the Due Date to 14 days from today.
    4.  Include professional notes with payment instructions (e.g., "Payment can be made via e-transfer to mikehenderson.abr@gmail.com or by cheque.") and a brief thank you message to the client for supporting a family-run business.
    `,
  });
  
  const { output } = await prompt(input);
  return output!;
}
