import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { client } from "../trpc/client";

export default component$(() => {
  useVisibleTask$(async () => {
    const users = await client.users.getUsers.query({ userId: "1" });
    console.log("users:", users);
  });
  return (
    <div>
      <h1>
        Welcome qwik <span class="lightning">⚡️</span>
      </h1>
      <Link class="mindblow" href="/flower/">
        Blow my mind 🤯
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
