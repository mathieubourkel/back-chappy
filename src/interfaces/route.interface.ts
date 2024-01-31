export interface RouteInterface {
    method: string,
    route: string,
    controller: any
    action: string
    middlewares?: MiddlewaresInterface
}

export interface MiddlewareInterface {
    name: string,
    classDto?: unknown
}

export type RoutesInterface = RouteInterface[]
export type MiddlewaresInterface = MiddlewareInterface[]