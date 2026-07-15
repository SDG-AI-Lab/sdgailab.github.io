/// <reference types="astro/client" />

declare module 'particles.js' {
  const particlesJs: Record<string, never>;
  export default particlesJs;
}

declare global {
  interface Window {
    particlesJS?: {
      load: (tagId: string, pathConfigJson: string, callback?: () => void) => void;
    };
  }
}

export {};
