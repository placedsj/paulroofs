"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestColors, type SuggestColorsOutput } from "@/ai/flows/color-coordinator-flow";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Palette } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  roofColor: z.string().min(3, "Please enter a roof color."),
  houseStyle: z.string().optional(),
});

type ColorFormValues = z.infer<typeof formSchema>;

export function ColorCoordinatorForm() {
  const [suggestion, setSuggestion] = useState<SuggestColorsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofColor: "Charcoal Grey",
      houseStyle: "Ranch",
    },
  });

  async function onSubmit(values: ColorFormValues) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await suggestColors(values);
      setSuggestion(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while getting color suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const ColorDisplay = ({ name, hex, label }: { name: string; hex: string; label: string; }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg border-2" style={{ backgroundColor: hex }} />
        <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-sm text-muted-foreground">{hex.toUpperCase()}</p>
        </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="roofColor" render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Roof Color</FormLabel>
              <FormControl><Input placeholder="e.g., Charcoal Grey" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField
            control={form.control}
            name="houseStyle"
            render={({ field }) => (
            <FormItem>
                <FormLabel>House Style (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select house style to refine results" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="Colonial">Colonial</SelectItem>
                    <SelectItem value="Ranch">Ranch</SelectItem>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Cape Cod">Cape Cod</SelectItem>
                    <SelectItem value="Victorian">Victorian</SelectItem>
                    <SelectItem value="Craftsman">Craftsman</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
          />
          <Button type="submit" className="w-full font-bold text-lg py-6" disabled={isLoading}>
            {isLoading ? <><Loader2 className="animate-spin" /> Thinking...</> : 'Generate Palette'}
          </Button>
        </form>
      </Form>
      
      {isLoading && (
        <div className="text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 mx-auto animate-spin mb-2" />
            <p>Our AI designer is mixing colors...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestion && (
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>Your AI-Generated Color Palette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
                <ColorDisplay name={suggestion.sidingColor.name} hex={suggestion.sidingColor.hex} label="Siding Color"/>
                <ColorDisplay name={suggestion.trimColor.name} hex={suggestion.trimColor.hex} label="Trim Color"/>
                <ColorDisplay name={suggestion.accentColor.name} hex={suggestion.accentColor.hex} label="Accent Color"/>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">DESIGNER'S NOTES</p>
                <p className="text-sm text-foreground/80 border-l-2 border-primary pl-3">{suggestion.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
