import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";
import { z } from "zod";
import { isAdminMiddleware } from "../middleware/admin";
import { getCookiesMiddleware } from "../middleware/cookies";
import { publicProcedure, router } from "../trpc-utils";

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));

const adminProcedure = publicProcedure.use(isAdminMiddleware);

const updateEventEmitter = new EventEmitter();

export const userRouter = router({
  getUsers: userProcedure.use(getCookiesMiddleware).query(({ input, ctx }) => {
    // console.log("ctx:", ctx);
    // console.log("ctx isAdmin:", ctx.isAdmin);
    console.log("cookies", ctx.cookies);
    return [{ id: input.userId, name: "HadesGod" }];
  }),
  getSecretData: adminProcedure.query(({ ctx }) => {
    return "this is secret data";
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      console.log(
        `Updating user ${req.input.userId} to have name ${req.input.name}`
      );
      updateEventEmitter.emit("update", req.input.name);
      return { id: req.input.userId, name: req.input.name, password: "1234" };
    }),
  onUpdate: publicProcedure.subscription(() => {
    return observable<string>((emit) => {
      updateEventEmitter.on("update", (value) => {
        console.log("value", value);
        emit.next(value);
      });

      return () => {
        updateEventEmitter.off("update", emit.next);
      };
    });
  }),
});
