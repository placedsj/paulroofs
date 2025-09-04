
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateHomeStory, GenerateHomeStoryOutput } from "@/ai/flows/home-story-generator-flow";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Home, Sparkles, Copy, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  roofType: z.string().min(1, "Please select a roof type."),
  photo: z.any().refine((files) => files?.length === 1, 'Photo is required.'),
});

type StoryFormValues = z.infer<typeof formSchema>;

export function HomeStoryGenerator() {
  const [story, setStory] = useState<GenerateHomeStoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roofType: 'a beautiful new metal roof',
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
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

  async function onSubmit(values: StoryFormValues) {
    setIsLoading(true);
    setError(null);
    setStory(null);
    try {
      const photoFile = values.photo[0];
      const photoDataUri = await toBase64(photoFile);

      const result = await generateHomeStory({
        photoDataUri,
        roofType: values.roofType,
      });
      setStory(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while writing the story. The AI might be camera shy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (story) {
      navigator.clipboard.writeText(story.story);
      toast({
        title: "Copied to clipboard!",
        description: "The home's story is ready to be shared.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <Home /> AI Homestead Storyteller
        </CardTitle>
        <CardDescription>
            Upload a photo of a client's house to generate a magical, heartwarming story. A unique gift that builds connection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload House Photo</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => {
                                                field.onChange(e.target.files);
                                                handlePhotoChange(e);
                                            }} 
                                        />
                                        <div className="border-2 border-dashed rounded-lg p-8 text-center bg-background cursor-pointer hover:border-primary">
                                            {preview ? (
                                                <Image src={preview} alt="House preview" width={400} height={300} className="mx-auto rounded-md object-contain h-48" />
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
                         <FormField control={form.control} name="roofType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>The New Roof</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="a beautiful new metal roof">Metal Roof</SelectItem>
                                        <SelectItem value="a strong new set of asphalt shingles">Asphalt Shingles</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <Button type="submit" className="w-full font-bold" disabled={isLoading || !preview}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? 'Writing Story...' : 'Generate Home Story'}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-lg font-semibold">Our AI storyteller is gazing at the photo...</p>
                        <p className="text-muted-foreground">This magical process takes a moment.</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!isLoading && !error && !story && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background">
                        <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold text-muted-foreground">The home's unique story will appear here.</p>
                    </div>
                )}
                
                {story && (
                    <Card className="bg-secondary/30 flex-grow">
                        <CardHeader>
                            <CardTitle>A Story for the Homeowner</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="bg-background/50 p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground max-h-96 overflow-y-auto">
                                <p>{story.story}</p>
                           </div>
                           <Button onClick={handleCopy} className="w-full font-bold">
                               <Copy className="mr-2 h-4 w-4" /> Copy Story
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
