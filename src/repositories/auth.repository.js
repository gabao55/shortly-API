import connection from "../db/db.js";

function insertUser(name, email, passwordHash) {
    return connection.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
        [name, email, passwordHash]
    );
}

function getUserByEmail(email) {
    return connection.query(
        'SELECT * FROM users WHERE email = $1;', 
        [email]
    );
}

export { insertUser, getUserByEmail };