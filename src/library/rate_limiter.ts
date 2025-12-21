import RedisCache from "@/library/redis";
import AppError from "@/library/app_error";
import type { IRateLimitOptions } from "@/type/rate_limiter.type";


async function rateLimit({
  key,
  limit,
  windowInSeconds,
}: IRateLimitOptions) {
  const client = RedisCache.client;
  const redisKey = `rate-limit:${key}`;

  const current = await client.incr(redisKey);

  if (current === 1) {
    await client.expire(redisKey, windowInSeconds);
  }

  if (current > limit) {
    throw new AppError("Too many requests, please try again later.", 429);
  }
}

export const rateLimitByUser = (
  action: string,
  limit: number,
  windowInSeconds: number
) => async (req: any) => {
  if (!req.user) return;

  await rateLimit({
    key: `${action}:user:${req.user.id}`,
    limit,
    windowInSeconds,
  });
};

export const rateLimitByIP = (
  action: string,
  limit: number,
  windowInSeconds: number
) => async (req: any) => {
  await rateLimit({
    key: `${action}:ip:${req.ip}`,
    limit,
    windowInSeconds,
  });
};

export const rateLimitCustom = (
  buildKey: (req: any) => string,
  limit: number,
  windowInSeconds: number
) => async (req: any) => {
  await rateLimit({
    key: buildKey(req),
    limit,
    windowInSeconds,
  });
};
