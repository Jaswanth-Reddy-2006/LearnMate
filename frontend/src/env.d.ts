/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COORDINATOR_API_URL?: string
  readonly VITE_PROGRESS_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
