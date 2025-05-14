
"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

export function ViewToggle() {
  const router = useRouter();

  const setView = (view: ViewMode) => {
    // Navigate to the homepage with the selected view parameter
    router.push(`/?view=${view}`);
  };

  return (
    <div className="flex items-center space-x-1 rounded-md bg-secondary p-0.5">
      <Button
        variant="ghost"
        size="sm" // Using sm size for consistency with h-8 w-8 effect
        onClick={() => setView("grid")}
        className={cn(
          "w-8 h-8",
          "text-muted-foreground hover:text-foreground" // Default style, no active state
        )}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm" // Using sm size for consistency with h-8 w-8 effect
        onClick={() => setView("list")}
        className={cn(
          "w-8 h-8",
          "text-muted-foreground hover:text-foreground" // Default style, no active state
        )}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
