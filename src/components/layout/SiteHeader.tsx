
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { FidgetSpinnerModal } from "@/components/ui/FidgetSpinnerModal";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-2 sm:space-x-4">
          <FidgetSpinnerModal /> 
          <ViewToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
