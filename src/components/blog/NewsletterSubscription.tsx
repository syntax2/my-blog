
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2 } from 'lucide-react';

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
        toast({
            title: "Error",
            description: "Please enter your email address.",
            variant: "destructive",
        });
        return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Subscribed!",
      description: `Thanks for subscribing with ${email}. You'll get our latest posts.`,
    });
    setEmail('');
  };

  return (
    <section className="mt-16 py-12 border-t border-border/60 bg-secondary/30 dark:bg-secondary/20 rounded-lg shadow-sm">
      <div className="max-w-xl mx-auto text-center px-4">
        <h3 className="text-2xl font-semibold text-foreground mb-3">Stay Updated</h3>
        <p className="text-muted-foreground mb-6">
          Get the latest blog posts and updates delivered straight to your inbox. No spam, ever.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow text-base h-11"
            aria-label="Email address for newsletter"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="text-base px-6 h-11">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
               <Mail className="mr-2 h-4 w-4" />
            )}
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
