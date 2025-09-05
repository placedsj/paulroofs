
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateBlogPost, type GenerateBlogPostOutput, type GenerateBlogPostInput } from "@/ai/flows/blog-post-generator-flow";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PenSquare, Copy, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  topic: z.string().min(1, 'The main topic of the blog post (e.g., "Benefits of Asphalt Shingles").'),
  keywords: z.array(z.string()).min(1, 'A list of SEO keywords to include in the post (e.g., "roofing contractors", "asphalt shingles").'),
});

type BlogFormValues = z.infer<typeof formSchema>;

export function BlogPostGenerator() {
  const [blogPost, setBlogPost] = useState<GenerateBlogPostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'Benefits of Asphalt Shingles',
      keywords: ['asphalt shingles', 'roofing', 'curb appeal'],
    },
  });

  async function onSubmit(values: BlogFormValues) {
    setIsLoading(true);
    setError(null);
    setBlogPost(null);
    try {
      const result = await generateBlogPost(values as GenerateBlogPostInput);
      setBlogPost(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the blog post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (blogPost) {
        const textToCopy = `
Title: ${blogPost.title}
Slug: ${blogPost.slug}
Category: Asphalt Roofing (You can change this)
Published Date: ${blogPost.publishedDate}

---

**Introduction**
${blogPost.introduction}

---

${blogPost.mainContent.map(section => `
**${section.heading}**
${section.paragraphs.join('\n\n')}
`).join('\n---\n')}

---

**Conclusion**
${blogPost.conclusion}
        `;
      navigator.clipboard.writeText(textToCopy.trim());
      toast({
        title: "Copied to clipboard!",
        description: "The blog post content is ready to be pasted.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <PenSquare /> AI Blog Post Generator
        </CardTitle>
        <CardDescription>
            Generate a new SEO-friendly blog post for your website. Just provide a topic and some keywords.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField control={form.control} name="topic" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blog Post Topic</FormLabel>
                                <FormControl><Input placeholder="e.g., Benefits of Asphalt Shingles" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="keywords" render={({ field }) => (
                            <FormItem>
                                <FormLabel>SEO Keywords (comma-separated)</FormLabel>
                                <FormControl><Input placeholder="e.g., asphalt shingles, roofing" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(k => k.trim()))} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? 'Writing Post...' : 'Generate Blog Post'}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border rounded-lg bg-background">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <p className="text-lg font-semibold">Our AI writer is working on it...</p>
                        <p className="text-muted-foreground">This might take a moment.</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!isLoading && !error && !blogPost && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg bg-background">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-semibold text-muted-foreground">Your new blog post will appear here.</p>
                    </div>
                )}
                
                {blogPost && (
                    <Card className="bg-secondary/30 flex-grow">
                        <CardHeader>
                            <CardTitle>{blogPost.title}</CardTitle>
                            <CardDescription>Slug: {blogPost.slug} | Published: {blogPost.publishedDate}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="bg-background/50 p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground max-h-96 overflow-y-auto">
                                <h3 className="font-bold">Introduction</h3>
                                <p>{blogPost.introduction}</p>
                                <hr className="my-4" />
                                {blogPost.mainContent.map((section, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-bold">{section.heading}</h3>
                                        {section.paragraphs.map((p, i) => <p key={i} className="mt-2">{p}</p>)}
                                    </div>
                                ))}
                                <hr className="my-4" />
                                <h3 className="font-bold">Conclusion</h3>
                                <p>{blogPost.conclusion}</p>
                           </div>
                           <Button onClick={handleCopy} className="w-full font-bold">
                               <Copy className="mr-2 h-4 w-4" /> Copy Post Content
                           </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
