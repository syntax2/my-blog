
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription, // Added DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FidgetSpinner from "./FidgetSpinner";
import { Wind } from "lucide-react";

export function FidgetSpinnerModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-accent/20" aria-label="Open Zen Spin">
          <Wind className="h-[1.2rem] w-[1.2rem] text-foreground group-hover:text-accent" />
          <span className="sr-only">Zen Spin</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-md p-0 bg-background/95 dark:bg-background/80 backdrop-blur-md border-border shadow-2xl rounded-lg">
        <DialogHeader className="p-6 pb-2 text-center">
          <DialogTitle className="text-2xl font-semibold text-foreground">Zen Spin</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Click the spinner or the button to spin.
          </DialogDescription>
        </DialogHeader>
        <div className="px-2 pb-6">
          <FidgetSpinner />
        </div>
      </DialogContent>
    </Dialog>
  );
}
