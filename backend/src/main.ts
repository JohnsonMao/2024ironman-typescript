import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import taskRouter from './routes/task.route';

const port = process.env.PORT || 9453;

class Server {
    private app = express();

    start() {
        this.app.use(express.json());

        this.app.use('/task', taskRouter);

        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ZodError) {
                res.status(400).json({ message: err.errors });
            } else {
                res.status(500).json({ message: err.message });
            }
        });

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const server = new Server();

server.start();
