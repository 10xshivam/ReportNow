// src/types/turnstile.d.ts

declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: TurnstileRenderOptions
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
      isExpired: (widgetId: string) => boolean;
      execute: (element: string | HTMLElement) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: (errorCode?: string) => void;
  'expired-callback'?: () => void;
  'before-interactive-callback'?: () => void;
  'after-interactive-callback'?: () => void;
  'unsupported-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  tabindex?: number;
  'response-field'?: boolean;
  'response-field-name'?: string;
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  language?: string;
  execution?: 'render' | 'execute';
  appearance?: 'always' | 'execute' | 'interaction-only';
  cdata?: string;
  action?: string;
}

export interface TurnstileValidationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
  metadata?: {
    ephemeral_id?: string;
  };
}

export {};