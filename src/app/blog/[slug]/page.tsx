import { notFound } from 'next/navigation';
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
        <div className="container mx-auto px-4 py-12 md:py-20">
            <article className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-4 text-muted-foreground mb-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Published on {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <Badge variant="secondary">{post.category}</Badge>
                        </div>
                    </div>
                     <h1 className="text-4xl md:text-6xl font-extrabold text-shadow-outline">
                        {post.title}
                    </h1>
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
