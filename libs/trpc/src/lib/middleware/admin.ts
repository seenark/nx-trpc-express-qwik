import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc-utils";

export const isAdminMiddleware = middleware(
  ({ ctx, next, type, input, meta, path, rawInput }) => {
    if (!ctx.isAdmin) {
      throw new TRPCError({
        message: "you are not an admin",
        code: "UNAUTHORIZED",
      });
    }

    return next({
      ctx: {
        user: {
          id: "1",
          name: "HadesGod",
        },
      },
    });
  }
);
