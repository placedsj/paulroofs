
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateInvoice, type GenerateInvoiceOutput, type GenerateInvoiceInput } from '@/ai/flows/invoice-generator-flow';
import { type Client } from './client-manager';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Loader2, FileSignature, FileText, Trash2, PlusCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const lineItemSchema = z.object({
  item: z.string().min(1, 'Item description is required.'),
  quantity: z.coerce.number().min(0, 'Quantity must be positive.'),
  unitCost: z.coerce.number().min(0, 'Unit cost must be positive.'),
  total: z.number(),
});

const formSchema = z.object({
  clientName: z.string().min(2, "Client name is required."),
  clientAddress: z.string().min(5, "Client address is required."),
  workDescription: z.string().min(10, "Work description is required."),
  lineItems: z.array(lineItemSchema).min(1, "At least one line item is required."),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  quoteId: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof formSchema>;
type LineItem = z.infer<typeof lineItemSchema>;

type InvoiceGeneratorProps = {
    client: Client | null;
};

export function InvoiceGenerator({ client }: InvoiceGeneratorProps) {
  const [invoice, setInvoice] = useState<GenerateInvoiceOutput & { input: GenerateInvoiceInput } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientAddress: "",
      workDescription: "",
      lineItems: [{ item: 'Asphalt Shingles', quantity: 1500, unitCost: 4, total: 6000 }],
      subtotal: 0,
      tax: 0,
      total: 0,
      quoteId: "",
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        clientName: client.name,
        clientAddress: client.address,
        workDescription: `Complete roof replacement for the property at ${client.address}.`,
        lineItems: [{ item: 'Asphalt Shingles', quantity: 1500, unitCost: 4, total: 6000 }],
        quoteId: `Q-2024-` // Example, you might have this stored on the client object
      });
      toast({
        title: `New Invoice for ${client.name}`,
        description: "Client details have been pre-filled. Please add line items and details.",
      });
    }
  }, [client, form, toast]);


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems"
  });

  const watchLineItems = form.watch("lineItems");

  const calculateTotals = useCallback(() => {
    let subtotal = 0;
    form.getValues('lineItems').forEach((item, index) => {
        const quantity = Number(item.quantity) || 0;
        const unitCost = Number(item.unitCost) || 0;
        const total = quantity * unitCost;
        if (form.getValues(`lineItems.${index}.total`) !== total) {
             form.setValue(`lineItems.${index}.total`, total);
        }
        subtotal += total;
    });
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    form.setValue("subtotal", subtotal);
    form.setValue("tax", tax);
    form.setValue("total", total);
  }, [form]);
  
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && name.startsWith('lineItems')) {
        calculateTotals();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, calculateTotals]);
  
  useEffect(() => {
    calculateTotals();
  }, [fields, calculateTotals]);


  async function onSubmit(values: InvoiceFormValues) {
    setIsLoading(true);
    setError(null);
    setInvoice(null);

    const inputForAI: GenerateInvoiceInput = {
        ...values,
        lineItems: values.lineItems.map(item => ({
            item: item.item,
            quantity: Number(item.quantity),
            unitCost: Number(item.unitCost),
            total: item.total
        }))
    };

    try {
      const result = await generateInvoice(inputForAI);
      setInvoice({ ...result, input: inputForAI });
      // form.reset(); // Don't reset so user can see what they submitted
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the invoice. The model may be unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };


  return (
    <div className="grid lg:grid-cols-2 gap-8 print:grid-cols-1">
      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <FileSignature /> AI Invoice Generator
          </CardTitle>
          <CardDescription>
            Create professional invoices from completed projects. The AI will generate invoice dates and notes.
            {client && <span className="block mt-1 font-semibold text-primary">Working on: {client.name}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="clientName" render={({ field }) => (
                  <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="clientAddress" render={({ field }) => (
                  <FormItem><FormLabel>Project Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="workDescription" render={({ field }) => (
                <FormItem><FormLabel>Work Description</FormLabel><FormControl><Textarea placeholder="e.g., Complete roof replacement with asphalt shingles." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="quoteId" render={({ field }) => (
                <FormItem><FormLabel>Original Quote ID (Optional)</FormLabel><FormControl><Input placeholder="e.g., Q-2024-001" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <div>
                <FormLabel>Line Items</FormLabel>
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Description</TableHead><TableHead>Qty</TableHead><TableHead>Unit Cost</TableHead><TableHead className="text-right">Total</TableHead><TableHead></TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                    {fields.map((field, index) => (
                        <TableRow key={field.id}>
                            <TableCell><Input {...form.register(`lineItems.${index}.item`)} placeholder="Item description" /></TableCell>
                            <TableCell><Input type="number" {...form.register(`lineItems.${index}.quantity`)} placeholder="1" className="w-20" /></TableCell>
                            <TableCell><Input type="number" {...form.register(`lineItems.${index}.unitCost`)} placeholder="100" className="w-24" /></TableCell>
                            <TableCell className="text-right">{formatCurrency(watchLineItems[index]?.total || 0)}</TableCell>
                            <TableCell><Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ item: '', quantity: 1, unitCost: 0, total: 0 })} className="mt-2"><PlusCircle className="mr-2" />Add Line Item</Button>
              </div>

              <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? 'Generating Invoice...' : 'Generate Invoice'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex flex-col">
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-lg font-semibold">Our AI accountant is crunching the numbers...</p>
            </div>
        )}

        {error && (
             <Alert variant="destructive">
                <AlertTitle>Generation Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        
        {!isLoading && !error && !invoice && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background print:hidden">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">Your generated invoice will appear here.</p>
            </div>
        )}

        {invoice && (
          <Card className="flex-grow flex flex-col print:shadow-none print:border-none" id="invoice-preview">
            <CardHeader className="bg-secondary/30 print:bg-secondary/30">
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
                      <p className="text-lg font-semibold">{invoice.invoiceId}</p>
                      <p className="text-sm text-muted-foreground mt-4"><strong>Bill To:</strong><br />{invoice.input.clientName}<br />{invoice.input.clientAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">Asphalt Bros Roofing</p>
                    <p className="text-sm text-muted-foreground">contact@asphaltbros.ca</p>
                    <div className="mt-4 text-sm">
                      <p><strong>Issue Date:</strong> {invoice.issueDate}</p>
                      <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                    </div>
                  </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Description</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.input.lineItems.map((item, index) => (
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
                        <TableCell className="text-right font-bold">{formatCurrency(invoice.input.subtotal)}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">HST (15%)</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(invoice.input.tax)}</TableCell>
                    </TableRow>
                     <TableRow className="text-xl bg-secondary/30 print:bg-secondary/30">
                        <TableCell colSpan={3} className="text-right font-extrabold text-primary">Total Due</TableCell>
                        <TableCell className="text-right font-extrabold text-primary">{formatCurrency(invoice.input.total)}</TableCell>
                    </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
            <CardFooter className="bg-secondary/30 mt-auto flex-col items-start gap-4 p-6 print:bg-secondary/30">
                <div className="text-sm text-muted-foreground space-y-2">
                    <p className="font-bold">Notes:</p>
                    <p>{invoice.notes}</p>
                    {invoice.input.quoteId && <p>Original Quote ID: {invoice.input.quoteId}</p>}
                </div>
                 <Button onClick={handlePrint} className="w-full font-bold print:hidden">
                    <Printer className="mr-2 h-4 w-4" /> Print Invoice
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
                #invoice-preview, #invoice-preview * {
                    visibility: visible;
                }
                #invoice-preview {
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
