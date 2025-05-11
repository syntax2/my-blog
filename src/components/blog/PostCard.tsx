import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const coverImageUrl = post.coverImage 
    ? `https://picsum.photos/seed/${post.coverImage}/600/400` 
    : `https://picsum.photos/seed/${post.slug}/600/400`;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint="article cover"
          />
        </div>
      </Link>
      <CardHeader>
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl font-semibold hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
        <span className="mx-1.5">&middot;</span>
        <span>{post.readingTime}</span>
      </CardFooter>
    </Card>
  );
}
