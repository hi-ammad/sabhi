import mongoose from "mongoose";
import RedisCache from "@/library/redis";

/**
 * Enhances Mongoose queries with caching support.
 */
export const enhanceQueryWithCache = () => {
  const exec = mongoose.Query.prototype.exec;

  mongoose.Query.prototype.cache = function (options: {
    key?: string;
    ttl?: number;
  } = {}) {
    this.useCache = true;
    this.ttl = options.ttl ?? 60 * 60 * 24; // 24h
    this.customCacheKey = options.key;
    return this;
  };

  mongoose.Query.prototype.exec = async function (...args: any[]) {
    if (!this.useCache) {
      return exec.apply(this, args);
    }

    try {
      /** 🔥 AUTO SCOPE DETECTION */
      const scope =
        this.op === "findOne" || this.op === "findById"
          ? "doc"
          : "list";

      /** 🔑 FINAL REDIS KEY */
      const key = this.customCacheKey ?? JSON.stringify({
        model: this.model.modelName,
        scope,
        op: this.op,
        query: this.getQuery(),
        options: this.getOptions(),
      });

      const cached = await RedisCache.client.json.get(key);
      if (cached) {
        this.isCached = true;
        return cached;
      }

      const result = await exec.apply(this, args);

      await RedisCache.client.json.set(key, "$", result);
      await RedisCache.client.expire(key, this.ttl);

      this.isCached = false;
      return result;
    } catch (err) {
      console.error("Redis cache error:", err);
      return exec.apply(this, args);
    }
  };
};

/**
 * Clears a Redis cache entry associated with a hash key
 * @param hashKey
 */
export const clearHash = (hashKey: string) => {
  try {
    RedisCache.client.del(JSON.stringify(hashKey));
  } catch (err) {
    console.error("Failed to clear cache:", err);
  }
};
