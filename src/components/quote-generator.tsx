
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateQuote, type GenerateQuoteOutput } from '@/ai/flows/quote-generator-flow';
import { type Client } from './client-manager';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Loader2, FileText, Printer } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  clientName: z.string().min(2, "Client name is required."),
  clientAddress: z.string().min(5, "Client address is required."),
  roofType: z.enum(['Metal', 'Asphalt Shingles']),
  roofSize: z.coerce.number().min(100, "Roof size must be at least 100 sq ft."),
  specialRequests: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof formSchema>;
export type GeneratedQuote = GenerateQuoteOutput & { formValues: QuoteFormValues };


type QuoteGeneratorProps = {
    client: Client | null;
    onQuoteGenerated: (quote: GeneratedQuote, client: Client) => void;
};

export function QuoteGenerator({ client, onQuoteGenerated }: QuoteGeneratorProps) {
  const [quote, setQuote] = useState<GeneratedQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientAddress: "",
      roofType: 'Asphalt Shingles',
      roofSize: 1500,
      specialRequests: "",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        ...form.getValues(),
        clientName: client.name,
        clientAddress: client.address,
      });
      toast({
        title: `New Quote for ${client.name}`,
        description: "Client details have been pre-filled. Please confirm roof size and type.",
      });
    }
  }, [client, form, toast]);


  async function onSubmit(values: QuoteFormValues) {
    setIsLoading(true);
    setError(null);
    setQuote(null);
    try {
      const result = await generateQuote(values);
      const fullQuote: GeneratedQuote = { ...result, formValues: values };
      setQuote(fullQuote);
      if(client) {
        onQuoteGenerated(fullQuote, client);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the quote. The model may be unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 print:grid-cols-1">
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center gap-2"><FileText /> AI Quote Generator</CardTitle>
          <CardDescription>
            Fill in the project details to generate a professional quote instantly.
            {client && <span className="block mt-1 font-semibold text-primary">Working on: {client.name}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="clientName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="clientAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Address</FormLabel>
                  <FormControl><Input placeholder="e.g., 123 Main St, Moncton, NB" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="roofType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roof Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Asphalt Shingles">Asphalt Shingles</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="roofSize" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roof Size (sq ft)</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 1500" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="specialRequests" render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests / Notes</FormLabel>
                  <FormControl><Textarea placeholder="e.g., Add snow guards, specific ventilation requirements..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? 'Generating Quote...' : 'Generate Quote'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex flex-col">
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-lg font-semibold">Our AI is drafting your quote...</p>
                <p className="text-muted-foreground">This may take a moment.</p>
            </div>
        )}

        {error && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-destructive/50 rounded-lg bg-destructive/10">
                 <Alert variant="destructive">
                    <AlertTitle>Generation Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )}
        
        {!isLoading && !error && !quote && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background print:hidden">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">Your generated quote will appear here.</p>
            </div>
        )}

        {quote && (
          <Card className="flex-grow flex flex-col print:shadow-none print:border-none" id="quote-preview">
            <CardHeader className="bg-secondary/30 print:bg-secondary/30">
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className="text-3xl font-bold text-primary">QUOTE</h2>
                      <p className="text-lg font-semibold">{quote.quoteId}</p>
                      <p className="text-sm text-muted-foreground mt-4"><strong>Prepared For:</strong><br />{quote.formValues.clientName}<br />{quote.formValues.clientAddress}</p>
                  </div>
                  <div className="text-right">
                      <p className="font-bold text-lg">Asphalt Bros Roofing</p>
                      <p className="text-sm text-muted-foreground">contact@asphaltbros.ca</p>
                      <div className="mt-4 text-sm">
                        <p><strong>Date:</strong> {quote.date}</p>
                        <p><strong>Valid Until:</strong> {quote.validUntil}</p>
                      </div>
                  </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.lineItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unitCost)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(quote.subtotal)}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">HST (15%)</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(quote.tax)}</TableCell>
                    </TableRow>
                     <TableRow className="text-xl bg-secondary/30 print:bg-secondary/30">
                        <TableCell colSpan={3} className="text-right font-extrabold text-primary">Total</TableCell>
                        <TableCell className="text-right font-extrabold text-primary">{formatCurrency(quote.total)}</TableCell>
                    </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
            <CardFooter className="bg-secondary/30 mt-auto flex-col items-start gap-4 p-6 print:bg-secondary/30">
                <div className="text-sm text-muted-foreground space-y-2">
                    <p className="font-bold">Notes:</p>
                    <p>{quote.notes}</p>
                </div>
                 <Button onClick={handlePrint} className="w-full font-bold print:hidden">
                    <Printer className="mr-2 h-4 w-4" /> Print Quote
                </Button>
            </CardFooter>
          </Card>
        )}
      </div>
        <style jsx global>{`
            @media print {
                body * {
                    visibility: hidden;
                }
                #quote-preview, #quote-preview * {
                    visibility: visible;
                }
                #quote-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        `}</style>
    </div>
  );
}
