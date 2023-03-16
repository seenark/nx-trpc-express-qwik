import { publicProcedure, router } from "../trpc-utils";
import { userRouter } from "./users";

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return "Hi";
  }),
  logToServer: publicProcedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("Invalid input");
    })
    .mutation((req) => {
      console.log(`client says: ${req.input}`);
      return true;
    }),
  users: userRouter,
});

export type TAppRouter = typeof appRouter;
