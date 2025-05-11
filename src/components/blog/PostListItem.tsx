import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { Badge } from '@/components/ui/badge';

interface PostListItemProps {
  post: Post;
}

export function PostListItem({ post }: PostListItemProps) {
  const coverImageUrl = post.coverImage 
    ? `https://picsum.photos/seed/${post.coverImage}/200/120` 
    : `https://picsum.photos/seed/${post.slug}/200/120`;

  return (
    <article className="py-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <Link href={`/blog/${post.slug}`} className="block shrink-0">
        <div className="relative w-full sm:w-40 h-32 sm:h-24 rounded-md overflow-hidden shadow-md">
          <Image
            src={coverImageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-300"
            data-ai-hint="article thumbnail"
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/blog/${post.slug}`} className="block group">
          <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{post.excerpt}</p>
        <div className="text-xs text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          <span className="mx-1.5">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
