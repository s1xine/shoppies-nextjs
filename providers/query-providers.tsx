"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
        },
      },
    });

    // enable cross-tab sync for carts and wishlists
    broadcastQueryClient({
      queryClient: qc,
      broadcastChannel: "shoppies-query-broadcast",
    });

    return qc;
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
