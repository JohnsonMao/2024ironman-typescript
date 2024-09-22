import express from 'express';

const port = process.env.PORT || 9453;

class Server {
    private app = express();

    start() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const server = new Server();

server.start();
