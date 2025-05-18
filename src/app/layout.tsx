
// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
// import { ThemeProvider } from '@/components/ThemeProvider';
// import { SiteHeader } from '@/components/layout/SiteHeader';
// import { SiteFooter } from '@/components/layout/SiteFooter';
// import { Toaster } from "@/components/ui/toaster";

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: "Ashish", // Updated title
//   description: "My Blogs, Stories and freshly brewed content.",
//   icons: {
//     icon: "https://media.gettyimages.com/id/1160027332/vector/creative-elegant-letter-a-vector-emblem.jpg?s=612x612&w=gi&k=20&c=2LyIPLLrLF3P9CDe7DT2mR97WQzv6KtiV915MaE2F40=",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <SiteHeader />
//           <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {children}
//           </main>
//           <SiteFooter />
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ashish',
  description: 'My Blogs, Stories and freshly brewed content.',
  // ================================
  // 👇 Your custom favicons live under public/favicon-for-app
  // ================================
  icons: {
    // a classic fallback
    icon: [
      { url: '/favicon-for-app/favicon.ico' },
      { url: '/favicon-for-app/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-for-app/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-for-app/favicon.svg', type: 'image/svg+xml' },
    ],
    // iOS home screen icon
    apple: '/favicon-for-app/apple-touch-icon.png',
    // manifest for Android/chrome
    shortcut: '/favicon-for-app/favicon.ico',
    other: [
      { rel: 'manifest', url: '/favicon-for-app/site.webmanifest' },
      // if you generated a safari mask icon:
      // { rel: 'mask-icon', url: '/favicon-for-app/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  // optionally mirror the theme-color tags RLF generated:
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
