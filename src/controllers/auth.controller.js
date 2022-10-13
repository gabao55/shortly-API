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
            'INSERT INTO sessions ("userId", token, "creationTimestamp") VALUES ($1, $2, to_timestamp($3 / 1000.0));',
            [userId, token, Date.now()]
        );

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function cleanSessions() {
    const now = Date.now();
    const MILISECONDS = 1000;
    const SECONDS = 60;
    const MINUTES = 60;
    const TWO_HOURS = 2 * MINUTES * SECONDS * MILISECONDS;
    try {
        connection.query(
            'DELETE FROM sessions WHERE "creationTimestamp" < to_timestamp($1 / 1000.0);',
            [now - TWO_HOURS]
        );
    } catch (error) {
        console.log(error);
    }

}

export { singUp, singIn, cleanSessions };