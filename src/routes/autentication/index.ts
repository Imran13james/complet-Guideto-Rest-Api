import { Rigester, login } from "../../controoler/users";
import express from "express";


export default (router: express.Router) => {
    router.post("/auth", Rigester)
    router.post("/login",login)
    router.get('/test', (req, res) => {
        res.send('Server is working!');
    });
}