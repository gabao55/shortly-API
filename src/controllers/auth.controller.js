import connection from "../db/db.js";
import bcrypt from 'bcrypt';

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

}

export { singUp, singIn };