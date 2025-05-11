# Content Canvas - Next.js Blog Starter

This is a Next.js blog starter application called "Content Canvas", built with TypeScript and Tailwind CSS.

## Features

- Sticky header with logo, view toggle (grid/list), and dark/light mode switch.
- Hero section with headline, avatar, and intro text.
- Markdown-based content sourcing from `content/posts/*.md`.
- Front-matter support for title, excerpt, date, readingTime, and coverImage.
- Responsive post listing on the home page with grid and list views.
- Pagination for navigating through posts.
- Statically generated individual blog post pages.
- Styled with Tailwind CSS, including the typography plugin for blog content.
- Dark and light mode support.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The application will be available at [http://localhost:9003](http://localhost:9003) (or the port specified in `package.json`).

## Project Structure

-   `/content/posts`: Contains markdown files for blog posts.
-   `/public`: Public assets (e.g., images, favicons).
-   `/src/app`: Next.js App Router pages and layouts.
    -   `/src/app/page.tsx`: Home page (blog listing).
    -   `/src/app/blog/[slug]/page.tsx`: Individual blog post page.
    -   `/src/app/layout.tsx`: Root layout.
-   `/src/components`: React components.
    -   `/src/components/blog`: Blog-specific components (PostCard, PostListItem, Pagination).
    -   `/src/components/layout`: Layout components (SiteHeader, SiteFooter).
    -   `/src/components/ui`: General UI components (Logo, ThemeToggle, ViewToggle, ShadCN components).
    -   `/src/components/ThemeProvider.tsx`: Theme provider for dark/light mode.
-   `/src/lib`: Utility functions.
    -   `/src/lib/posts.ts`: Functions for fetching and parsing markdown posts.
-   `/src/types`: TypeScript type definitions.

## Adding New Posts

1.  Create a new `.md` file in the `content/posts` directory (e.g., `my-new-post.md`).
2.  Add front-matter to the top of the file:
    ```markdown
    ---
    title: "My New Post Title"
    excerpt: "A short summary of this amazing new post."
    date: "YYYY-MM-DD" # e.g., 2024-08-01
    readingTime: "X min read" # e.g., 7 min read
    coverImage: "my-post-cover-seed" # A unique seed for picsum.photos, or "no-cover"
    ---

    Your markdown content starts here...
    ```
3.  Write your blog post content using Markdown.
4.  The new post will automatically appear on the site after restarting the dev server or rebuilding.

## Customization

-   **Theme Colors:** Modify CSS variables in `src/app/globals.css`.
-   **Tailwind Config:** Update `tailwind.config.ts`.
-   **Logo:** Change the SVG in `src/components/ui/Logo.tsx` or replace the component.
-   **Hero Section:** Edit content in `src/app/page.tsx`.
-   **Footer:** Update links and text in `src/components/layout/SiteFooter.tsx`.
-   **Posts per page:** Change `POSTS_PER_PAGE` in `src/lib/posts.ts`.

Enjoy building your blog with Content Canvas!
