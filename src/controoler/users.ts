import { CreateUsers, GetUseremal } from "../db/userschma";
import { authentication, random } from "../helpers/index";
import express from "express"; // we are importingit because of typescript other wise it will shows an error

export const Rigester = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, useName } = req.body;
        if (!email || !password || !useName) {
            console.error("Bad Request: Missing required fields");
            return res.sendStatus(400);
        }

        const existEmail = await GetUseremal(email);
        // console.log("Existing email:", existEmail);
        if (existEmail) {
            console.error("Bad Request: Email already exists");
            return res.sendStatus(400);
        }

        const salt = random();

        const users = await CreateUsers({
            useName,
            email,
            authenticatoion: {
                salt,
                password: authentication(salt, password),
            },
        });

        console.log("User registration successful:", users);
        return res.status(200).json(users).end();
    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    }
};
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await GetUseremal(email).select('+authenticatoion.salt +authenticatoion.password');

        if (!user) {
            return res.status(404).send("User not found");
        }
        const expectedHash = authentication(user.authenticatoion.salt, password);
        console.log('Expected Hash:', expectedHash);
        console.log('Actual Hash:', user.authenticatoion.password);
        if (user.authenticatoion.password !== expectedHash) {
            return res.status(401).send("Invalid password");
        }

        const salt = random();
        user.authenticatoion.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('imran_ali', user.authenticatoion.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

