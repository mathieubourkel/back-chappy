// import { NextFunction, Request, Response } from "express";
// import { CustomError } from "../utils/CustomError";

// export async function verifyToken(request: Request,response: Response,next: NextFunction) {
//     try {
//       const [type, token] = request.headers.authorization?.split(" ") ?? [];
//       if (!token) throw new CustomError("MDW-TK", 401, "No token find");
//       if (type !== "Bearer") throw new CustomError("MDW-TK", 401, "No bearer find");
//       request["user"] = <CustomJwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       next();
//     } catch (error) {
//       response
//           .status(400)
//           .json({code: "DTO-BAD-REQUEST", message: "you didn't send the good things", expiredAt: error.expiredAt});
//     }
//   }