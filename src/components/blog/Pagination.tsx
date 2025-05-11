"use client";

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Button }
from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = [];
  const maxPagesToShow = 5; // Max number of page links to show
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (currentPage <= halfMaxPages) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }
  if (currentPage + halfMaxPages >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 mt-12">
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage <= 1}
        className={cn(currentPage <= 1 && "opacity-50 cursor-not-allowed")}
      >
        <Link href={createPageURL(currentPage - 1)} scroll={false}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Link>
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="ghost" size="sm" asChild><Link href={createPageURL(1)} scroll={false}>1</Link></Button>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          size="sm"
          asChild
        >
          <Link href={createPageURL(page)} scroll={false}>{page}</Link>
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
          <Button variant="ghost" size="sm" asChild><Link href={createPageURL(totalPages)} scroll={false}>{totalPages}</Link></Button>
        </>
      )}
      
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage >= totalPages}
        className={cn(currentPage >= totalPages && "opacity-50 cursor-not-allowed")}
      >
        <Link href={createPageURL(currentPage + 1)} scroll={false}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </Button>
    </nav>
  );
}
