import { ReactNode } from "react";

interface ScreenProps {
  children: ReactNode;
  tone?: "default" | "danger";
  className?: string;
}

/**
 * Page body for the clinic finder flow. Pads for the safe area itself since app-config hides Zalo's action bar.
 */
export default function Screen({
  children,
  tone = "default",
  className = "",
}: ScreenProps) {
  const toneClass =
    tone === "danger" ? "bg-danger-soft text-danger-ink" : "bg-background";

  return (
    <div
      className={`grow shrink-0 flex flex-col px-4 pb-6 pt-[calc(var(--safe-top)+12px)] ${toneClass} ${className}`}
    >
      {children}
    </div>
  );
}
