
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import type { Post } from '@/types';
import { ScrollProgressBar } from '@/components/blog/ScrollProgressBar';
import { NewsletterSubscription } from '@/components/blog/NewsletterSubscription';

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

  const showCoverImage = post.coverImage !== "no-cover";
  // Define coverImageUrl, ensuring it's always a valid string if showCoverImage is true
  let coverImageUrl = '';
  if (showCoverImage) {
    if (post.coverImage) { // Use specific seed if available
      coverImageUrl = `https://picsum.photos/seed/${post.coverImage}/1200/600`;
    } else { // Fallback to slug-based seed if coverImage is undefined/empty but not "no-cover"
      coverImageUrl = `https://picsum.photos/seed/${post.slug}/1200/600`;
    }
  }


  return (
    <div className="relative">
      <ScrollProgressBar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"> 
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            {showCoverImage && coverImageUrl && (
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden shadow-xl mb-8 group">
                <Image
                  src={coverImageUrl}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  data-ai-hint="blog post cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm mb-8">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5 text-primary" />
                <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-primary" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>
          
          <div
            className="prose dark:prose-invert prose-lg max-w-none 
                       prose-headings:font-bold prose-headings:tracking-tight
                       prose-a:text-primary hover:prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-lg prose-img:shadow-lg
                       prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-sm
                       prose-code:px-1.5 prose-code:py-1 prose-code:bg-muted prose-code:rounded-md
                       prose-pre:bg-secondary/70 prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-inner
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                       prose-hr:border-border/70 my-5"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>
        
        <div className="max-w-3xl mx-auto">
            <NewsletterSubscription />
        </div>
      </div>
    </div>
  );
}
