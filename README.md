# My Blog website
 Feel free to fork it and create your own custom blog website

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
Create a new `.md` file in the `content/posts` directory (e.g., `my-new-post.md`).

