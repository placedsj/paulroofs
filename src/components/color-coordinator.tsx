"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestColors, type SuggestColorsOutput } from "@/ai/flows/color-coordinator-flow";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  roofColor: z.string().min(3, "Please enter a roof color."),
  houseStyle: z.string().optional(),
});

type ColorFormValues = z.infer<typeof formSchema>;

export function ColorCoordinator() {
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

  const ColorDisplay = ({ name, hex }: { name: string; hex: string }) => (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: hex }} />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{hex.toUpperCase()}</p>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <Wand2 /> AI Color Coordinator
        </CardTitle>
        <CardDescription>
            Enter the client's chosen roof color to generate a palette of complementary siding, trim, and accent colors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="roofColor" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Roof Color</FormLabel>
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
                    <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        {isLoading ? 'Generating Palette...' : 'Suggest Colors'}
                    </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-lg font-semibold">Our designer AI is thinking...</p>
                        <p className="text-muted-foreground">This may take a moment.</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!isLoading && !error && !suggestion && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background">
                        <Palette className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold text-muted-foreground">Your suggested color palette will appear here.</p>
                    </div>
                )}
                
                {suggestion && (
                    <Card className="bg-secondary/30 flex-grow">
                        <CardHeader>
                            <CardTitle>Suggested Color Palette</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">SIDING COLOR</p>
                                <ColorDisplay name={suggestion.sidingColor.name} hex={suggestion.sidingColor.hex} />
                            </div>
                             <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">TRIM COLOR</p>
                                <ColorDisplay name={suggestion.trimColor.name} hex={suggestion.trimColor.hex} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">ACCENT (DOOR/SHUTTERS)</p>
                                <ColorDisplay name={suggestion.accentColor.name} hex={suggestion.accentColor.hex} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">DESIGNER'S NOTES</p>
                                <p className="text-sm text-foreground/80 border-l-2 border-primary pl-3">{suggestion.reasoning}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
