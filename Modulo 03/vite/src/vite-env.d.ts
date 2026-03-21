/// <reference types="vite/client" />

// We'll add here our environment variables. Remember all have string values.
interface ImportMetaEnv {
  readonly VITE_SOME_KEY: string;
}
