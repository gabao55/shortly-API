import connection from "../db/db.js";

async function singUp (req, res) {
    const { name, email, password } = req.body;

    try {
        await connection.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
            [name, email, password]
        );

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function singIn (req, res) {

}

export { singUp, singIn };