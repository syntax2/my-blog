
import Link from 'next/link';
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 py-8 bg-background">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
          <Link
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="https://github.com/syntax2/"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/ashishkadian8/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ashish-kadian/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Linkedin size={20} />
          </Link>
        </div>
        <p className="text-sm">
          &copy; 2018–{currentYear} Blogs and Stories by Ashish. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
