// src/lib/turnstile.ts

export interface TurnstileValidationResult {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

export interface TurnstileValidationOptions {
  expectedAction?: string;
  expectedHostname?: string;
  timeout?: number;
}

export class TurnstileValidator {
  private secretKey: string;
  private timeout: number;

  constructor(secretKey: string, timeout: number = 10000) {
    this.secretKey = secretKey;
    this.timeout = timeout;
  }

  async validate(
    token: string, 
    remoteip?: string, 
    options: TurnstileValidationOptions = {}
  ): Promise<TurnstileValidationResult & { error?: string }> {
    // Input validation
    if (!token || typeof token !== 'string') {
      return { success: false, error: 'Invalid token format' };
    }

    if (token.length > 2048) {
      return { success: false, error: 'Token too long' };
    }

    // Prepare request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const formData = new FormData();
      formData.append('secret', this.secretKey);
      formData.append('response', token);
      
      if (remoteip) {
        formData.append('remoteip', remoteip);
      }

      const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        }
      );

      const result: TurnstileValidationResult = await response.json();

      // Additional validation checks
      if (result.success) {
        if (options.expectedAction && result.action !== options.expectedAction) {
          return {
            success: false,
            error: 'Action mismatch',
          };
        }

        if (options.expectedHostname && result.hostname !== options.expectedHostname) {
          return {
            success: false,
            error: 'Hostname mismatch',
          };
        }
      }

      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, error: 'Validation timeout' };
      }

      console.error('Turnstile validation error:', error);
      return { success: false, error: 'Internal error' };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

// Utility function for easy use
export async function validateTurnstileToken(
  token: string,
  remoteip?: string,
  options?: TurnstileValidationOptions
): Promise<{ isValid: boolean; error?: string; data?: TurnstileValidationResult }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    return { isValid: false, error: 'Turnstile secret key not configured' };
  }

  const validator = new TurnstileValidator(secretKey);
  const result = await validator.validate(token, remoteip, options);

  if (result.success) {
    return { isValid: true, data: result };
  } else {
    return { 
      isValid: false, 
      error: result.error || `Validation failed: ${result['error-codes']?.join(', ')}` 
    };
  }
}

// Error code mappings for better user messages
export const TURNSTILE_ERROR_MESSAGES: Record<string, string> = {
  'missing-input-secret': 'Configuration error - please try again',
  'invalid-input-secret': 'Configuration error - please try again',
  'missing-input-response': 'Please complete the captcha',
  'invalid-input-response': 'Invalid captcha - please try again',
  'bad-request': 'Invalid request - please try again',
  'timeout-or-duplicate': 'Captcha expired - please try again',
  'internal-error': 'Service temporarily unavailable - please try again',
};