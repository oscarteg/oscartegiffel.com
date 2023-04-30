/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
import "../.astro/types.d.ts";

interface InterfaceMetaEnv {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;

  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
  TWITTER_ACCESS_TOKEN_KEY: string;
  TWITTER_ACCESS_TOKEN_SECRET: string;

  PHILIPS_HUE_CLIENT_ID: string;
  PHILIPS_HUE_CLIENT_SECRET: string;

  NOTION_ACCESS_TOKEN: string;
  NOTION_DATABASE_BLOG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
