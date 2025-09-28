// src/lib/rate-limit.ts
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string; // Custom key generator
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private getClientKey(req: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req);
    }

    // Default key generation based on IP and User-Agent
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               req.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    return `${ip}:${userAgent}`;
  }

  async isRateLimited(req: NextRequest): Promise<{
    limited: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const key = this.getClientKey(req);
    const now = Date.now();
    const windowEnd = now + this.config.windowMs;

    let entry = rateLimitStore.get(key);

    // If no entry exists or window has expired, create new entry
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 1,
        resetTime: windowEnd,
      };
      rateLimitStore.set(key, entry);
      
      return {
        limited: false,
        remaining: this.config.maxRequests - 1,
        resetTime: windowEnd,
      };
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > this.config.maxRequests) {
      return {
        limited: true,
        remaining: 0,
        resetTime: entry.resetTime,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      };
    }

    return {
      limited: false,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Create rate limit response headers
  createHeaders(result: {
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }): Record<string, string> {
    const headers: Record<string, string> = {
      'X-RateLimit-Limit': this.config.maxRequests.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    };

    if (result.retryAfter) {
      headers['Retry-After'] = result.retryAfter.toString();
    }

    return headers;
  }
}

// Predefined rate limiters for different use cases
export const reportSubmissionLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 reports per 15 minutes per client
});

export const imageAnalysisLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 image analyses per minute per client
});

export const locationLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 location requests per minute per client
});