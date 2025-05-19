"use client";

import { AudioProvider } from "@/providers/AudioProvider";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      <div className="w-full">{children}</div>
    </AudioProvider>
  );
}

export default RootLayout;
