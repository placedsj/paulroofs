
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { visualizeRoof, VisualizeRoofOutput } from "@/ai/flows/roof-visualizer-flow";
import { metalColors, shingleColors, type ColorOption } from '@/lib/colors';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WandSparkles, Upload, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  photo: z.any().refine((files) => files?.length === 1, 'A photo of your house is required.'),
  roofType: z.enum(['metal', 'shingles']),
  roofColorName: z.string().min(1, "Please select a roof color."),
});

type VisualizerFormValues = z.infer<typeof formSchema>;

export function AIVisualizer() {
  const [result, setResult] = useState<VisualizeRoofOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('metal');

  const form = useForm<VisualizerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofType: 'metal',
      roofColorName: metalColors[0].name,
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
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
        roofType: values.roofType === 'metal' ? 'metal roof' : 'asphalt shingle roof',
        roofColor: values.roofColorName,
      });
      setResult(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred during visualization. The AI might be shy, or the image might be too complex. Please try another photo.");
    } finally {
      setIsLoading(false);
    }
  }
  
  const ColorPicker = ({ field }: { field: any }) => {
    const colors = activeTab === 'metal' ? metalColors : shingleColors;
    return (
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
            {colors.map((color: ColorOption) => (
                <div key={color.name} onClick={() => field.onChange(color.name)} className="cursor-pointer group" title={color.name}>
                    <div 
                        className={cn(
                            "w-full h-12 rounded-md border-2 border-transparent group-hover:border-primary transition-all",
                            field.value === color.name && "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        )}
                        style={{ backgroundColor: color.color }}
                    />
                    <p className="text-xs text-center mt-1 text-muted-foreground truncate">{color.name}</p>
                </div>
            ))}
        </div>
    );
  };


  return (
    <Card className="max-w-6xl mx-auto">
        <CardHeader className="text-center">
            <WandSparkles className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl md:text-4xl mt-2">AI Roof Visualizer</CardTitle>
            <CardDescription className="text-lg">
                Upload a photo of your house and see your new roof come to life!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">1. Upload a Photo of Your House</FormLabel>
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
                                                <Image src={preview} alt="House preview" width={500} height={375} className="rounded-md object-contain h-full w-full" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                     <Upload className="h-12 w-12 mb-2" />
                                                    <p className="font-semibold">Click or drag to upload</p>
                                                    <p className="text-sm">For best results, use a clear, front-facing photo.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel className="text-lg font-semibold">2. Choose Your Roofing</FormLabel>
                            <Tabs
                                defaultValue="metal"
                                className="w-full"
                                onValueChange={(value) => {
                                    form.setValue('roofType', value as 'metal' | 'shingles');
                                    setActiveTab(value);
                                    form.setValue('roofColorName', value === 'metal' ? metalColors[0].name : shingleColors[0].name)
                                }}
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="metal">Metal</TabsTrigger>
                                    <TabsTrigger value="shingles">Asphalt Shingles</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </FormItem>
                        
                        <FormField
                            control={form.control}
                            name="roofColorName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">3. Select a Color</FormLabel>
                                <FormControl>
                                    <ColorPicker field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        <Button type="submit" className="w-full font-bold text-lg py-6" disabled={isLoading || !preview}>
                            {isLoading ? <><Loader2 className="animate-spin" /> Visualizing...</> : <><WandSparkles /> Visualize My New Roof</>}
                        </Button>
                    </form>
                </Form>
                
                <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-center mb-2">AI Generated Result</h3>
                    <div className="border-2 border-dashed rounded-lg aspect-video flex items-center justify-center bg-background p-2 relative overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 bg-background/80 z-10 flex flex-col items-center justify-center text-center p-4">
                                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                                <p className="text-lg font-semibold">Our AI is building your new roof...</p>
                                <p className="text-muted-foreground">This magical process can take up to a minute. Please be patient!</p>
                            </div>
                        )}
                        {!result && !isLoading && (
                            <div className="text-center text-muted-foreground">
                                <ImageIcon className="h-16 w-16 mx-auto mb-2" />
                                <p>Your new roof visualization will appear here.</p>
                            </div>
                        )}
                        {result?.imageDataUri && (
                            <Image src={result.imageDataUri} alt="House with new roof" fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
                        )}
                         {error && (
                            <Alert variant="destructive" className="absolute bottom-4 left-4 right-4 z-20">
                                <Sparkles className="h-4 w-4" />
                                <AlertTitle>Visualization Failed</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
