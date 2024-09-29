import express, { NextFunction, Request, Response, Router } from 'express';
import { ZodError } from 'zod';
import { controllers } from './controllers';
import { validateMetadata } from './utils/decorators/controller.decorator';

const port = process.env.PORT || 9453;

class Server {
    private app = express();

    private corsMiddleware() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        })
    }

    private registerRoutes() {
        controllers.forEach((Controller) => {
            const controller = new Controller();
            const { basePath, routers } = validateMetadata(Controller);
            const router = Router();

            routers.forEach(({ method, path, handlerName }) => {
                router[method](
                    path,
                    controller[handlerName as keyof typeof controller].bind(controller)
                );
            });

            this.app.use(basePath, router);
        });
    }

    private errorMiddleware() {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ZodError) {
                res.status(400).json({ message: err.errors });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
    }

    start() {
        this.corsMiddleware();

        this.app.use(express.json());

        this.registerRoutes();

        this.errorMiddleware();

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const server = new Server();

server.start();
