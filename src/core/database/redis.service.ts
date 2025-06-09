import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService{
    public redis: Redis
    constructor() { 
        this.redis = new Redis({
            port: +(process.env.REDIS_PORT as string),
            host: process.env.REDIS_HOST as string,
        });
        this.redis.on('connect', () => {
            console.log('Redis connected');
        });
        this.redis.on('error', () => {
            console.log('Redis connection error');
            this.redis.quit();
        });
    }
    
}
