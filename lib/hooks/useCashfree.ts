// app/hooks/useCashfree.ts
"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Cashfree?: (options: { mode: "sandbox" | "production" }) => any;
  }
}

export function useCashfree() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const scriptId = "cashfree-sdk";

    if (document.getElementById(scriptId)) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, [loaded]);

  return window.Cashfree;
}
