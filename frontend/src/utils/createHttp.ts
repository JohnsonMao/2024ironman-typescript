type Source = Record<string, unknown>;

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export const ROOT_URL = 'http://localhost:9453';

const createUrl = <S extends Source>(pathname: string, method: Method, source?: S) => {
    const url = `${ROOT_URL}${pathname}`;

    if (method !== Method.GET) return url;

    const urlSearchParams = new URLSearchParams();

    Object.entries(source || {}).forEach(([key, value]) => {
        if (typeof value === 'string' && value !== '') {
            urlSearchParams.append(key, value);
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            urlSearchParams.append(key, value.toString());
        }
    });

    return `${url}?${urlSearchParams.toString()}`;
};

const createHttp =
    (method: Method) =>
    async <R, S extends Source = {}>(pathname: string, source?: S): Promise<R> => {
        const requestInit: RequestInit = { method };

        requestInit.headers = {
            'Content-Type': 'application/json',
        };

        if (method !== Method.GET) {
            requestInit.body = JSON.stringify(source);
        }

        try {
            const url = createUrl(pathname, method, source);
            const response = await fetch(url, requestInit);

            if (response.ok) return response.json();
            throw response;
        } catch (error) {
            if (error instanceof Response) {
                const errorResponse: { message?: unknown } = await error.json();
                throw errorResponse?.message || errorResponse;
            }
            throw error;
        }
    };

const http = {
    get: createHttp(Method.GET),
    post: createHttp(Method.POST),
    put: createHttp(Method.PUT),
    delete: createHttp(Method.DELETE),
};

export default http;
