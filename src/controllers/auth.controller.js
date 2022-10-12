import connection from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function singUp (req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 12);

    try {
        await connection.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
            [name, email, passwordHash]
        );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function singIn (req, res) {
    const userId = res.locals.userId;
    const token = uuid();

    try {
        await connection.query(
            'INSERT INTO sessions ("userId", token) VALUES ($1, $2);',
            [userId, token]
        );

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { singUp, singIn };