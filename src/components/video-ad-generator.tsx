
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { generateVideoAd, type GenerateVideoAdOutput } from "@/ai/flows/video-ad-generator-flow";
import { type Client } from './client-manager';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, Film, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  beforePhoto: z.any().refine((files) => files?.length === 1, 'Before photo is required.'),
  afterPhoto: z.any().refine((files) => files?.length === 1, 'After photo is required.'),
  roofType: z.string().min(1, "Roof type is required."),
  roofColor: z.string().min(1, "Roof color is required."),
});

type VideoFormValues = z.infer<typeof formSchema>;

type VideoAdGeneratorProps = {
    client: Client | null;
};

export function VideoAdGenerator({ client }: VideoAdGeneratorProps) {
  const [result, setResult] = useState<GenerateVideoAdOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  
  const { toast } = useToast();

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        roofType: 'IKO Cambridge Asphalt Shingles',
        roofColor: 'Charcoal Grey',
    },
  });

  useEffect(() => {
    if (client) {
      toast({
        title: `Video Ad for ${client.name}`,
        description: "Upload before and after photos to get started.",
      });
    }
  }, [client, toast]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
        interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 25) { setProgressMessage('Writing script and generating voice-over...'); return prev + 2; }
                if (prev < 85) { setProgressMessage('Generating video sequence... this is the slow part!'); return prev + 0.5; }
                if (prev < 95) { setProgressMessage('Combining audio and video...'); return prev + 3; }
                return prev;
            });
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') setBeforePreview(reader.result as string);
        else setAfterPreview(reader.result as string);
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

  async function onSubmit(values: VideoFormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const beforePhotoDataUri = await toBase64(values.beforePhoto[0]);
      const afterPhotoDataUri = await toBase64(values.afterPhoto[0]);
      
      const result = await generateVideoAd({
        beforePhotoDataUri,
        afterPhotoDataUri,
        roofType: values.roofType,
        roofColor: values.roofColor,
        companyName: 'Asphalt Bros Roofing',
      });
      
      setResult(result);
      setProgress(100);
      setProgressMessage('Video ready!');
      toast({
        title: "Success!",
        description: "Your video ad has been generated.",
      });
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred during video generation. This is a complex process, please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  const PhotoUpload = ({ name, label, preview, field, handler }: any) => (
     <FormField
        control={form.control}
        name={name}
        render={() => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="relative">
                    <Input 
                        type="file" 
                        accept="image/*"
                        className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                            field.onChange(e.target.files);
                            handler(e, name.includes('before') ? 'before' : 'after');
                        }} 
                    />
                    <div className="border-2 border-dashed rounded-lg p-2 text-center bg-background cursor-pointer aspect-video flex items-center justify-center">
                        {preview ? (
                            <Image src={preview} alt="House preview" width={400} height={300} className="mx-auto rounded-md object-contain h-full" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                    <Upload className="h-8 w-8 mb-2" />
                                <p className="text-xs">Click or drag to upload</p>
                            </div>
                        )}
                    </div>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <Film /> AI Video Ad Generator
        </CardTitle>
        <CardDescription>
            Create a mind-blowing video ad for a completed project. Upload before/after photos and the AI will do the rest.
            {client && <span className="block mt-1 font-semibold text-primary">Working on: {client.name}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="beforePhoto" render={({ field }) => <PhotoUpload name="beforePhoto" label="Before Photo" preview={beforePreview} field={field} handler={handlePhotoChange} />} />
                            <FormField control={form.control} name="afterPhoto" render={({ field }) => <PhotoUpload name="afterPhoto" label="After Photo" preview={afterPreview} field={field} handler={handlePhotoChange} />} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="roofType" render={({ field }) => (
                                <FormItem><FormLabel>Roof Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="roofColor" render={({ field }) => (
                                <FormItem><FormLabel>Roof Color</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <Button type="submit" className="w-full font-bold" disabled={isLoading || !beforePreview || !afterPreview}>
                            {isLoading ? <><Loader2 className="animate-spin" /> Generating...</> : <><Sparkles /> Generate Video Ad</>}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                 <div className="border-2 border-dashed rounded-lg p-4 bg-background aspect-video flex items-center justify-center relative">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8 w-full">
                            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                            <p className="text-lg font-semibold">AI is producing your video...</p>
                            <p className="text-muted-foreground mt-2">{progressMessage}</p>
                            <Progress value={progress} className="w-full mt-4" />
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Video Generation Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {!isLoading && !error && !result && (
                         <div className="text-center text-muted-foreground">
                            <Film className="h-12 w-12 mx-auto mb-4" />
                            <p className="text-lg font-semibold">Your generated video will appear here.</p>
                         </div>
                    )}

                    {result && (
                       <video src={result.videoUrl} controls className="w-full h-full" />
                    )}
                 </div>
                 <p className="text-xs text-muted-foreground text-center mt-2">AI-Generated Result</p>
                 {result && <Button asChild><a href={result.videoUrl} download={`asphalt-bros-ad-${client?.name || 'project'}.mp4`}>Download Video</a></Button>}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
