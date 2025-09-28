
import { posts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
        <div className="bg-zinc-900 min-h-screen text-center py-20">
            <h1 className="text-4xl font-bold text-zinc-50">Post not found</h1>
            <Link href="/blog" className="text-orange-500 hover:underline mt-4 inline-block">Back to Blog</Link>
        </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen">
        {/* Header */}
        <div className="bg-zinc-800 border-b border-zinc-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-zinc-50">
                    YOUR ROOFING CO.
                </Link>
                <Link href="/blog" className="text-zinc-400 hover:text-orange-500 transition-colors">
                    Back to Blog
                </Link>
            </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <article>
                <h1 className="text-5xl font-extrabold text-zinc-50 mb-4">{post.title}</h1>
                <p className="text-lg text-zinc-400 mb-8">{post.description}</p>
                
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 border border-zinc-700">
                    <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        priority // Prioritize loading the main blog image
                    />
                </div>

                <div className="prose prose-invert prose-lg max-w-none mx-auto text-zinc-300">
                    {post.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-700 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-zinc-500">© 2025 YOUR ROOFING CO. All rights reserved.</p>
                </div>
        </footer>
    </div>
  );
}
