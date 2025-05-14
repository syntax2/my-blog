
import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData, POSTS_PER_PAGE } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { PostListItem } from '@/components/blog/PostListItem';
import { Pagination } from '@/components/blog/Pagination';
import type { Post } from '@/types';

// Make sure to handle searchParams as a promise if needed, or ensure it's correctly passed
// For Vercel deployment, ensure that if this page is statically generated, searchParams access is compatible.
// If dynamic, ensure Next.js version and Vercel config handle it.
// The current error is in /blog/[slug], so this page might be fine, but good to keep in mind.
export const dynamic = 'force-dynamic'; // Retain dynamic if searchParams are actively used and vary

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { view?: 'grid' | 'list'; page?: string };
}) {
  const allPosts = getSortedPostsData();
  
  // Safely access searchParams properties
  const currentPage = Number(searchParams?.page) || 1;
  const currentView = searchParams?.view || 'grid';

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 bg-secondary/30 dark:bg-secondary/20 rounded-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <Image
              src="https://picsum.photos/seed/avatar-main/128/128"
              alt="Ashish"
              width={128}
              height={128}
              className="rounded-full shadow-lg border-4 border-background"
              data-ai-hint="person portrait"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            My Blogs, Stories and freshly brewed content.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Welcome to my personal space where I share insights on technology,
            design, and life. Explore my latest articles and connect with me on{" "}
            <Link
              href="https://www.ashishkadian.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              my personal site
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Posts Section */}
      {paginatedPosts.length > 0 ? (
        <section>
          {currentView === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="space-y-6 divide-y divide-border">
              {paginatedPosts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-10">
          No posts found. Check back soon!
        </p>
      )}
    </div>
  );
}
