import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import type { Post } from '@/types';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found."
    }
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map(path => ({ slug: path.slug }));
}

export default async function PostPage({ params }: Props) {
  let post: Post;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    notFound();
  }

  const coverImageUrl = post.coverImage 
    ? `https://picsum.photos/seed/${post.coverImage}/1200/600` 
    : `https://picsum.photos/seed/${post.slug}/1200/600`;

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-6">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        {post.coverImage !== "no-cover" && ( // Add a way to explicitly disable cover
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
            <Image
              src={coverImageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="blog post cover"
            />
          </div>
        )}
      </header>
      
      <div
        className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-accent prose-img:rounded-md prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
      />
    </article>
  );
}
