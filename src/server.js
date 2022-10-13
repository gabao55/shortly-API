import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth.router.js';
import urlRouter from './routers/url.router.js';
import { cleanSessions } from './controllers/auth.controller.js';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(urlRouter);

server.get('/status', (req, res) => {
    res.sendStatus(200);
});

setInterval(cleanSessions, 600000);

server.listen(process.env.PORT, console.log(`Magic happens on ${process.env.PORT}`))