import Joi from 'joi';
import connection from '../db/db.js';

const signUpSchema = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(1),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(1),
});

async function validateSignUp (req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    const { email } = req.body;
    const userExists = await connection.query(
        'SELECT * FROM users WHERE email = $1', 
        [email]
    );
    if (userExists.rowCount) return res.status(409).send('Email already registered');

    next();
}

export { validateSignUp };