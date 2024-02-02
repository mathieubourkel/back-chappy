import { NextFunction, Request, Response } from "express";
import { HttpMessagesUtils } from "../utils/http.messages.utils";
import { RedisClientType, createClient } from "redis";
import { CacheEnum } from "../enums/cache.enum";
import { QueryInterface } from "../interfaces/query.interface";

export abstract class GlobalController {
  private cache:any
  protected async handleGlobal<T>(
    req: Request,
    res: Response,
    next: NextFunction,
    callback: () => Promise<T>,
    status?: number
  ) {
    try {
      let result = await callback();
      res.status(status || 200).json({
        data: result,
        date: new Date().toLocaleString("fr-FR", { timeZone: process.env.TZ }),
        message:
          Object.values(result).length == 0
            ? "No data"
            : HttpMessagesUtils[status || 200],
      });
    } catch (error) {
      next(error);
    }
  }

  async startCache() {
    if (!this.cache) {
      this.cache = createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      });
      await this.cache.connect();
    }
    return this.cache as Promise<RedisClientType>;
  }

  BuildCacheKeyName(initName: CacheEnum, query?: QueryInterface): string {
    if (!query) return `${initName}`
    return `${initName}|${query.params ? query.params : ""}|${
      query.skip ? query.skip : ""
    }|${query.limit ? query.limit : ""}`;
  }

  async delCache(name: CacheEnum, query?: QueryInterface) {
    try {
      await (await this.startCache()).del(this.BuildCacheKeyName(name, query));
    } catch (error) {
      await Promise.reject(error);
    }
  }

  async proceedCache<T>(
    name: CacheEnum,
    callback: () => Promise<T>,
    query?: QueryInterface
  ): Promise<T> {
    try {
      const cache = await (
        await this.startCache()
      ).get(this.BuildCacheKeyName(name, query));
      if (cache) return JSON.parse(cache) as T;

      const datas = await callback();
      if (datas)
        await (
          await this.startCache()
        ).set(this.BuildCacheKeyName(name, query), JSON.stringify(datas));
      return datas as T;
    } catch (error) {
      await Promise.reject(error);
    }
  }
}
