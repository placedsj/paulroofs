"use client";

import { useState } from 'react';
import { recommendMaterials, type RecommendMaterialsOutput } from "@/ai/flows/material-recommendation-tool";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  houseStyle: z.string().min(1, "Please select a house style."),
  location: z.string().min(2, "Please enter a location."),
});

export function RecommendationForm() {
  const [recommendation, setRecommendation] = useState<RecommendMaterialsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      houseStyle: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await recommendMaterials(values);
      setRecommendation(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while getting your recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="houseStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your house style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Colonial">Colonial</SelectItem>
                    <SelectItem value="Ranch">Ranch</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Cape Cod">Cape Cod</SelectItem>
                    <SelectItem value="Victorian">Victorian</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (City, Province/State)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Quispamsis, New Brunswick" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendation && (
        <Card className="mt-8 bg-secondary/30">
          <CardHeader>
            <CardTitle>Your Custom Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-primary">Recommended Material</h3>
              <p>{recommendation.materialRecommendation}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">Recommended Color</h3>
              <p>{recommendation.colorRecommendation}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">Reasoning</h3>
              <p className="text-muted-foreground">{recommendation.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
