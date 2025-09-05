"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(values);
        setIsLoading(false);
        setIsSubmitted(true);
        form.reset();
    }

    if (isSubmitted) {
        return (
            <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <CheckCircle className="w-16 h-16 text-primary mb-4" />
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground">Your message has been sent successfully. We'll be in touch with you shortly.</p>
                    <Button onClick={() => setIsSubmitted(false)} className="mt-6">Send Another Message</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">REQUEST A FREE QUOTE!</CardTitle>
                <CardDescription>Let us know the details of what you are looking for, and we'll contact you with a quote.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input type="email" placeholder="Your Email" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input type="tel" placeholder="Your Phone (Optional)" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input placeholder="Address (Street, City, Zip Code)" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Textarea placeholder="Tell us about your project..." rows={4} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? 'SENDING...' : 'SEND'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
