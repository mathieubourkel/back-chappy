import { RedisClientType, createClient } from "redis";

export enum CacheEnum {
    CATEGORIES = 'cat'
}
export interface QueryInterface {
    skip?: number;
    limit?: number;
}

export class CacheUtils {
    private cache;

    async startCache() {
        if (!this.cache) {
            this.cache = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` })
            await this.cache.connect();   
        } 
        return this.cache as Promise<RedisClientType>
    }


    BuildCacheKeyName(initName: CacheEnum, query: QueryInterface): string {
        return `${initName}|${query.skip}|${query.limit}`
    }

    async proceedCache<T>(name: CacheEnum, query: QueryInterface, callback: Function): Promise<T> {
        try {
            const cache = await (await this.startCache()).get(this.BuildCacheKeyName(name,query))
            if (cache) return JSON.parse(cache) as T;

            const datas = await callback();
            if (datas) await (await this.startCache()).set(this.BuildCacheKeyName(name, query), JSON.stringify(datas), );
            return datas as T;

        } catch (error) {
                
        }
    }
}