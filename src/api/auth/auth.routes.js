const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const User = require('../users/user.model');
const jwt = require('../../lib/jwt');
const googleUtils = require('../../lib/google-util');

const router = express.Router();
const googleInstance = new googleUtils();

const schema = yup.object().shape({
    name: yup
    .string()
    .trim()
    .min(2)
    .matches(/[a-z ]+/i)
    .required(),
    email: yup.string().trim().email().required(),
    password: yup
    .string()
    .min(8)
    .max(100)
    .matches(/[^A-Za-z0-9]/, "password must contain a special character")
    .matches(/[A-Z]/, "password must containt an uppercase letter")
    .matches(/[a-z]/, "password must contain a lowercase letter")
    .matches(/[0-9]/, "password must contain a number")
    .required()
})

const errorMessages = {
    emailInUse: "Email in use.",
    invalidLogin: "Invalid login."
}

router.post('/signup', async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        const createUser = {
            name,
            email,
            password
        };

        const existingUser = await User.query().where("email", email).first();

        if (existingUser) {
            const error = new Error(errorMessages.emailInUse);
            res.status(403);
            next(error);
        }

        await schema.validate(createUser, { abortEarly: false });

        const hashedPassword = await bcrypt.hash(password, 12);
        const insertedUser = await User.query().insert({
            name,
            email,
            password: hashedPassword
        })

        delete insertedUser.password;
        const payload = {
            id: insertedUser.id,
            name,
            email
        }
        const token = await jwt.sign(payload)

        res.json({
            user: payload,
            token
        })
    } catch (error) {
        next(error)
    }
})

router.post('/gcode', async (req, res, next) => {
    try {
        const userData = await googleInstance.verify(req.body.code).catch(console.error);

        //check the user in the database. If the user doesn't exist then invalid user
        const user = await User.query()
            .where("email", userData.email).first();
        
        if (!user) {
            const error = new Error(errorMessages.invalidLogin);

            res.status(401);

            next(error);
        } else {
            const token = await jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            });

            res.json({
                token,
                expiresIn: "1"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/signin', async (req, res, next) => {
    // const {
    //     email,
    //     password
    // } = req.body;
    // try {
    //     const createuser = {
    //         name: 'docd',
    //         email,
    //         password
    //     };

    //     const user = await User.query().where("email", email).first();

    //     if (!user) {
    //         const error = new Error(errorMessages.invalidLogin);
    //         res.status(401);
    //         next(error);
    //     }

    //     await schema.validate(createUser, { abortEarly: false });

    //     const validUser = await bcrypt.compare(password, user.password)

    //     if (!validUser) {
    //         const error = new Error(errorMessages.invalidLogin);
    //         res.status(401);
    //         next(error);
    //     }
    //     const payload = {
    //         id: user.id,
    //         name: user.name,
    //         email
    //     }
    //     const token = await jwt.sign(payload)

    //     res.json({
    //         user: payload,
    //         token
    //     })
    // } catch (error) {
    //     next(error)
    // }

    res.json({
        googleURL: googleInstance.urlGoogle()
    })
});

module.exports = router;
