/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />

interface InterfaceMetaEnv {
	readonly PROD: boolean;
	readonly PUBLIC_DEPOY_HOOK: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
