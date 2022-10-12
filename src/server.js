import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth.router.js'
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter)

server.get('/status', (req, res) => {
    res.sendStatus(200);
});

server.listen(process.env.PORT, console.log(`Magic happens on ${process.env.PORT}`))