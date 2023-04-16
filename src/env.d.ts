/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Utility type primarily for optional props in Svelte because the `prop:?`
// syntax is not supported
type Optional<T> = T | undefined;
