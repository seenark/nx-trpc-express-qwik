import { initTRPC } from "@trpc/server";
import { TContext } from "./context";

const t = initTRPC.context<TContext>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
