import { middleware } from "../trpc-utils";

type TCookies = {
  A: string;
  B: string;
};

export const getCookiesMiddleware = middleware(
  ({ ctx, next, meta, path, type, input, rawInput }) => {
    const cookies = ctx.req.cookies as TCookies;
    return next({
      ctx: {
        cookies,
      },
    });
  }
);
