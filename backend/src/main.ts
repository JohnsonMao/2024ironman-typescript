import express from 'express';
import taskRouter from './routes/task.route';

const port = process.env.PORT || 9453;

class Server {
    private app = express();

    start() {
        this.app.use('/task', taskRouter);

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const server = new Server();

server.start();
