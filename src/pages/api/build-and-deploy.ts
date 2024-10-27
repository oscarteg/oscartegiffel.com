import type { APIRoute } from "astro";

// HACK: This is a hack to get around the fact that the `env` variable is not available in the `astro` module.
const { PUBLIC_DEPLOY_HOOK } = import.meta.env;

export const get: APIRoute = async function get() {
  return fetch(PUBLIC_DEPLOY_HOOK, {
    method: "POST",
  });
};
