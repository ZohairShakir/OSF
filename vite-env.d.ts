/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
  export default src;
}

// Some editors/lint setups miss Vite's ImportMeta augmentation; keep a safe fallback.
interface ImportMeta {
  readonly env: Record<string, any>;
}

