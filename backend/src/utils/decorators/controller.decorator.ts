import { z } from 'zod';
import './symbol.polyfill';

enum MetadataKeys {
    BASE_PATH = 'basePath',
    ROUTERS = 'routers',
}

enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

const routerConfigSchema = z.object({
    method: z.enum([Method.GET, Method.POST, Method.PUT, Method.DELETE]),
    path: z.string(),
    handlerName: z.string().or(z.symbol()),
});

const metadataSchema = z.object({
    [MetadataKeys.BASE_PATH]: z.string(),
    [MetadataKeys.ROUTERS]: z.array(routerConfigSchema),
});

export const validateMetadata = <T extends new (...args: any[]) => {}>(target: T) => {
    return metadataSchema.parse(target[Symbol.metadata]);
};

export const Controller = (basePath: string) => {
    return (_: new (...args: any[]) => {}, ctx: ClassDecoratorContext) => {
        ctx.metadata[MetadataKeys.BASE_PATH] = basePath;
    };
};

const methodDecoratorFactory = (method: Method) => {
    return (path: string = '') => {
        return (_: Function, ctx: ClassMethodDecoratorContext) => {
            const metadataRouters = ctx.metadata[MetadataKeys.ROUTERS];
            const routers: z.infer<typeof routerConfigSchema>[] = Array.isArray(metadataRouters)
                ? metadataRouters
                : [];

            routers.push({
                method,
                path,
                handlerName: ctx.name,
            });

            ctx.metadata[MetadataKeys.ROUTERS] = routers;
        };
    };
};

export const Get = methodDecoratorFactory(Method.GET);
export const Post = methodDecoratorFactory(Method.POST);
export const Put = methodDecoratorFactory(Method.PUT);
export const Delete = methodDecoratorFactory(Method.DELETE);
