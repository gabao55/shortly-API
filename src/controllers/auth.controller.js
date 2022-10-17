import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { insertUser } from "../repositories/auth.repository.js";

async function singUp (req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 12);

    try {
        await insertUser(name, email, passwordHash);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function singIn (req, res) {
    const userId = res.locals.userId;

    try {
        const token = jwt.sign({
            userId,
        }, process.env.TOKEN_SECRET,
        {
            expiresIn: "2h"
        });

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { singUp, singIn };