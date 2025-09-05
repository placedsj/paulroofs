

import Link from 'next/link';
import { posts } from '@/lib/posts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  const [latestPost, ...otherPosts] = sortedPosts;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-shadow-outline">THE ROOFING CHRONICLES</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Expert advice from the Asphalt Bros on everything roofing, siding, and home exteriors in Southern New Brunswick.
            </p>
          </div>
          
          {latestPost && (
            <Card className="mb-12">
                <div className="p-8">
                    <Badge variant="secondary" className="mb-2">Latest Post</Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        <Link href={`/blog/${latestPost.slug}`} className="hover:text-primary transition-colors">{latestPost.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{latestPost.introduction}</p>
                    <Button asChild>
                        <Link href={`/blog/${latestPost.slug}`}>
                            Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </Card>
          )}


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden group">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl h-20">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">{post.introduction}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button asChild variant="link" className="p-0 h-auto text-base">
                        <Link href={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
