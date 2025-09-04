
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generatePromotion, type GeneratePromotionOutput } from "@/ai/flows/project-promoter-flow";
import { type Client } from './client-manager';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Megaphone, Copy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  roofType: z.string().min(1, "The type of roofing material used is required."),
  roofColor: z.string().min(1, "The color of the new roof is required."),
  location: z.string().min(1, "The general location of the project is required."),
  keyDetail: z.string().optional(),
});

type PromotionFormValues = z.infer<typeof formSchema>;

type ProjectPromoterProps = {
    client: Client | null;
};

export function ProjectPromoter({ client }: ProjectPromoterProps) {
  const [promotion, setPromotion] = useState<GeneratePromotionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofType: 'Standing Seam Metal',
      roofColor: 'Charcoal Grey',
      location: 'Quispamsis',
      keyDetail: '',
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        ...form.getValues(),
        location: client.address.split(',')[1] || client.address.split(',')[0] || 'Southern New Brunswick',
        keyDetail: `Another fantastic project completed for the owners of the ${client.name}!`,
      });
       toast({
        title: `Promote project for ${client.name}`,
        description: "Client details have been pre-filled. Adjust as needed and generate a post!",
      });
    }
  }, [client, form, toast]);


  async function onSubmit(values: PromotionFormValues) {
    setIsLoading(true);
    setError(null);
    setPromotion(null);
    try {
      const result = await generatePromotion(values);
      setPromotion(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the promotion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (promotion?.socialMediaPost) {
      navigator.clipboard.writeText(promotion.socialMediaPost);
      toast({
        title: "Copied to clipboard!",
        description: "The social media post is ready to be pasted.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <Megaphone /> AI Project Promoter
        </CardTitle>
        <CardDescription>
            Generate an engaging social media post for a completed project. Just fill in the details and let the AI do the writing!
            {client && <span className="block mt-1 font-semibold text-primary">Working on: {client.name}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="roofType" render={({ field }) => (
                             <FormItem>
                                <FormLabel>Roof Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Standing Seam Metal">Standing Seam Metal</SelectItem>
                                        <SelectItem value="Asphalt Shingles">Asphalt Shingles</SelectItem>
                                        <SelectItem value="Other Metal">Other Metal</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="roofColor" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Roof Color</FormLabel>
                                <FormControl><Input placeholder="e.g., Charcoal Grey" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Location (Town/Area)</FormLabel>
                                <FormControl><Input placeholder="e.g., Rothesay" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="keyDetail" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key Highlight (Optional)</FormLabel>
                                <FormControl><Textarea placeholder="e.g., Replaced a 30-year-old leaky roof." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? 'Generating Post...' : 'Generate Social Media Post'}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-lg font-semibold">Our AI is writing...</p>
                        <p className="text-muted-foreground">Crafting the perfect post.</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!isLoading && !error && !promotion && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background">
                        <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold text-muted-foreground">Your generated social media post will appear here.</p>
                    </div>
                )}
                
                {promotion && (
                    <Card className="bg-secondary/30 flex-grow">
                        <CardHeader>
                            <CardTitle>Generated Social Media Post</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="bg-background/50 p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground">
                                {promotion.socialMediaPost}
                           </div>
                           <Button onClick={handleCopy} className="w-full font-bold">
                               <Copy className="mr-2 h-4 w-4" /> Copy Text
                           </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
