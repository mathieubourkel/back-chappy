import { MiddlewaresEnum } from "../enums/middlewares.enum"

export interface RouteInterface {
    middlewares?: any
    method: string,
    route: string,
    controller: any
    action: string
    dto?: any
}

// export interface MiddlewareInterface {
//     name: string,
//     classDto?: unknown
// }

export type RoutesInterface = RouteInterface[]
// export type MiddlewaresInterface = MiddlewareInterface[]