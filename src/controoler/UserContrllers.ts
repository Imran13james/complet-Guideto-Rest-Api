import express from "express";

import { deleteUserById, findandUpdate, getUserbyid, getUsers } from "../db/userschma";

export const getAllusers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        if (!users) {
            return res.status(401).json("no user found");
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const delteUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const delteUsers = await deleteUserById(id)
        return res.status(201).json({delteUsers})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateusers = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body
        if(!username){
            return res.status(404).json({suceess:false,message:"no username has been updated"})

        };
        const usersid = await getUserbyid(id)
        usersid.useName = username;
        await usersid.save();

        return res.status(200).json(usersid).end()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}