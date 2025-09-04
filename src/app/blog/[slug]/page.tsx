import { notFound } from 'next/navigation';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <div className="relative h-96">
            <Image 
                src={`https://picsum.photos/1920/1080?random=${post.slug}`}
                alt={post.title}
                fill
                priority
                className="object-cover"
                data-ai-hint="roofing texture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 flex items-end container mx-auto px-4 pb-12">
                <div className="max-w-4xl text-primary-foreground">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-shadow-outline">
                        {post.title}
                    </h1>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 text-muted-foreground mb-8 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Published on {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <Badge variant="secondary">{post.category}</Badge>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90 text-lg">
                    <p className="lead text-xl italic text-muted-foreground">{post.introduction}</p>
                    
                    {post.mainContent.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-3xl font-bold text-primary mt-12 mb-4">{section.heading}</h2>
                            {section.paragraphs.map((p, i) => (
                                <p key={i} className="mb-4">{p}</p>
                            ))}
                        </div>
                    ))}

                    <h3 className="text-2xl font-bold mt-12 mb-4">In Conclusion...</h3>
                    <p>{post.conclusion}</p>
                </div>
            </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
