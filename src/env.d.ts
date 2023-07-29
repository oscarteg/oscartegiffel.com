/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
import "../.astro/types.d.ts";

interface InterfaceMetaEnv {
  readonly DEPOY_HOOK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
