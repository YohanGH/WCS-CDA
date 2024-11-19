import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <div className="relative border-2 border-border bg-background/40 p-8">
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-border -translate-x-1 -translate-y-1" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-border translate-x-1 -translate-y-1" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-border -translate-x-1 translate-y-1" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-border translate-x-1 translate-y-1" />
      <Loader2 className="w-12 h-12 text-foreground animate-spin" />
    </div>
  </div>
);

export default Loading;