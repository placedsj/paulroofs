
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { visualizeRoof, VisualizeRoofOutput } from "@/ai/flows/roof-visualizer-flow";
import { dynastyShingleColors, cambridgeShingleColors } from '@/lib/colors';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, WandSparkles, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  roofType: z.string().min(1, "Please select a roof type."),
  roofColor: z.string().min(1, "Please select a roof color."),
  photo: z.any().refine((files) => files?.length === 1, 'A photo of the house is required.'),
});

type VisualizerFormValues = z.infer<typeof formSchema>;

export function RoofVisualizer() {
  const [result, setResult] = useState<VisualizeRoofOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<VisualizerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofType: 'asphalt shingle roof',
    },
  });
  
  const roofType = form.watch('roofType');
  const colorOptions = roofType === 'asphalt shingle roof' 
    ? [...dynastyShingleColors, ...cambridgeShingleColors] 
    : [...dynastyShingleColors, ...cambridgeShingleColors]; // Add metal colors here if needed

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setResult(null); // Clear previous result when new photo is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
  });

  async function onSubmit(values: VisualizerFormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const photoFile = values.photo[0];
      const photoDataUri = await toBase64(photoFile);

      const result = await visualizeRoof({
        photoDataUri,
        roofType: values.roofType,
        roofColor: values.roofColor
      });
      setResult(result);
      toast({
        title: "Success!",
        description: "Your new roof has been visualized.",
      });
    } catch (e) {
      console.error(e);
      setError("An error occurred during visualization. The AI model might be busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <WandSparkles /> AI Roof Visualizer
        </CardTitle>
        <CardDescription>
            Upload a photo of a house and select a new roof to see a photorealistic preview of the final result.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>1. Upload House Photo</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => {
                                                field.onChange(e.target.files);
                                                handlePhotoChange(e);
                                            }} 
                                        />
                                        <div className="border-2 border-dashed rounded-lg p-4 text-center bg-background cursor-pointer hover:border-primary aspect-video flex items-center justify-center">
                                            {preview ? (
                                                <Image src={preview} alt="House preview" width={400} height={300} className="mx-auto rounded-md object-contain h-full" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                     <Upload className="h-12 w-12 mb-2" />
                                                    <p>Click or drag to upload photo</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="roofType" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2. Roof Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="asphalt shingle roof">Asphalt Shingles</SelectItem>
                                            <SelectItem value="metal roof">Metal Roof</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="roofColor" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>3. Roof Color</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select a color" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {colorOptions.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                         </div>
                        
                        <Button type="submit" className="w-full font-bold" disabled={isLoading || !preview}>
                            {isLoading ? <><Loader2 className="animate-spin" /> Visualizing...</> : <><Sparkles /> Visualize New Roof</>}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                 <div className="border-2 border-dashed rounded-lg p-4 bg-background aspect-video flex items-center justify-center relative">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8">
                            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                            <p className="text-lg font-semibold">AI is working its magic...</p>
                            <p className="text-muted-foreground">This can take up to 30 seconds.</p>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Visualization Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {!isLoading && !error && !result && (
                         <div className="text-center text-muted-foreground">
                            <WandSparkles className="h-12 w-12 mx-auto mb-4" />
                            <p className="text-lg font-semibold">Your AI-generated image will appear here.</p>
                         </div>
                    )}

                    {result && (
                        <Image src={result.imageDataUri} alt="AI generated roof visualization" fill className="object-contain" />
                    )}
                 </div>
                 <p className="text-xs text-muted-foreground text-center mt-2">AI-Generated Result</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
