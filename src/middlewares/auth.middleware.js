import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../repositories/auth.repository.js';

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
    const userExists = await getUserByEmail(email);
    if (userExists.rowCount) return res.status(409).send('Email already registered');

    next();
}

async function validateSignIn (req, res, next) {
    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user.rowCount) return res.status(401).send('Email or password invalid');
    const passwordHash = user.rows[0].password;
    
    const isPasswordValid = bcrypt.compareSync(password, passwordHash);
    if(!isPasswordValid) {
      return res.status(401).send('Email or password invalid');
    }

    res.locals.userId = user.rows[0].id;

    next();
}

async function validateToken (req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        res.locals.userId = decode.userId;

        next();
    } catch (error) {
        return res.status(401).send(error);
    }
}

export { validateSignUp, validateSignIn, validateToken };