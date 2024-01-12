import { redis } from '../index'
import { Request, Response, NextFunction } from "express";
import { RequestWithUserInfo } from '../interfaces/request.interface';

export const fetchDataFromRedis = async (req: RequestWithUserInfo, res: Response, next: NextFunction) => {
  const result = await redis.get(req.url);
  if (result && result !== null) {
    res.status(200).json({data: JSON.parse(result), message: "data from cache"})
  } else {
    next()
  }
};