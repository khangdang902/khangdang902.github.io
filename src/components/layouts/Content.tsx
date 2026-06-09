import type React from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-6 grid-rows-2 gap-8 h-full">{children}</div>;
}
