
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateInvoice, GenerateInvoiceOutput } from '@/ai/flows/invoice-generator-flow';
import { generateQuote, type GenerateQuoteOutput } from '@/ai/flows/quote-generator-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Loader2, FileText, FileSignature } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
    quoteId: z.string().min(1, "Original Quote ID is required to fetch details."),
});

type InvoiceFormValues = z.infer<typeof formSchema>;

export function InvoiceGenerator() {
    const [quote, setQuote] = useState<GenerateQuoteOutput | null>(null);
    const [invoice, setInvoice] = useState<GenerateInvoiceOutput & { quoteData: GenerateQuoteOutput } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quoteId: "",
        },
    });

    // This is a mock function. In a real app, you'd fetch this from a database.
    // For now, we will re-generate the quote to get the details.
    async function fetchQuoteDetails(quoteId: string) {
        setIsLoading(true);
        setError(null);
        setQuote(null);
        setInvoice(null);
        try {
            // This is a conceptual step. We can't really "fetch" by ID without a DB.
            // We're making a big assumption that the quote ID format tells us the original inputs.
            // A more robust solution would be to store generated quotes.
            // For this demo, let's just show a message.
            setError("For this demo, please generate a quote first on the 'AI Quote Generator' tab, then copy its details manually into the fields below to create an invoice. Fetching by ID is not yet implemented.");

        } catch (e) {
            console.error(e);
            setError("Could not find a quote with that ID. Please check the ID and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl text-primary flex items-center gap-2">
                    <FileSignature /> AI Invoice Generator
                </CardTitle>
                <CardDescription>
                    Create professional invoices from completed projects. For this demo, functionality to fetch by Quote ID is not yet built.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-20">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Feature Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                    The ability to automatically generate invoices from quotes is under construction.
                </p>
            </CardContent>
        </Card>
    );
}
