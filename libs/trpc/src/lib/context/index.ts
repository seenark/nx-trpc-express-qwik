import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export async function createContext(opts: CreateExpressContextOptions) {
  return {
    req: opts.req,
    res: opts.res,
    isAdmin: true,
  };
}

export type TContext = inferAsyncReturnType<typeof createContext>;
