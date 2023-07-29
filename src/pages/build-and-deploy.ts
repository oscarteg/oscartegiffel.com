import type { APIRoute } from "astro";
import type { ImportMeta } from "../env";

// HACK: This is a hack to get around the fact that the `env` variable is not available in the `astro` module.
const { DEPLOY_HOOK } = (import.meta as unknown as ImportMeta).env;

export const get: APIRoute = async function get() {
  return await fetch(DEPLOY_HOOK, {
    method: "POST",
  });
};
