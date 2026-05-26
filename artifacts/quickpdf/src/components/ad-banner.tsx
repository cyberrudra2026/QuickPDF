import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
  label?: boolean;
}

const PUBLISHER_ID = import.meta.env.VITE_ADSENSE_PUBLISHER_ID as string | undefined;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({ slot, format = "auto", className = "", label = true }: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!PUBLISHER_ID || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, []);

  if (!PUBLISHER_ID) {
    return (
      <div className={`flex flex-col items-center justify-center w-full ${className}`}>
        {label && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 select-none">
            Advertisement
          </p>
        )}
        <div className="w-full max-w-2xl h-[90px] rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            Ad space — set <code className="text-primary">VITE_ADSENSE_PUBLISHER_ID</code> to activate
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      {label && (
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 select-none">
          Advertisement
        </p>
      )}
      <ins
        ref={ref}
        className="adsbygoogle block w-full"
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        style={{ display: "block" }}
      />
    </div>
  );
}
