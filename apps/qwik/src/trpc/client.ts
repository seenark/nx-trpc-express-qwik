import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { TAppRouter } from "@nx/trpc";

let token = "";

function setToken(newToken: string) {
  token = newToken;
}

export const client = createTRPCProxyClient<TAppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3333/trpc",
      headers() {
        const authToken = `Bearer ${token}`;
        return {
          Authorization: authToken,
        };
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});
