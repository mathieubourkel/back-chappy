import { NextFunction, Request, Response } from "express";
import { HTTPMessages } from "../utils/HTTPMessages";

export abstract class GlobalController {

  protected async handleGlobal(req: Request,res: Response,
    next: NextFunction,
    callback: () => Promise<any>,
    status?: number
  ) {
    try {
      let result = await callback();
      if (result == null || result.length == 0) result = "Aucune data trouvée"
      res.status(status || 200)
        .json({
          data: result,
          date: new Date(),
          message: HTTPMessages[status || 200],
        });
    } catch (error) {
      next(error);
    }
  }

  protected async badRoute(req: Request, res: Response, next: NextFunction) {
    res.status(404).json(HTTPMessages[404]);
  }

}
