/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SALT: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
