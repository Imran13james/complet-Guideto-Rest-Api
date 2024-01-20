import express from "express";
import {isAuthenticated, isOwner} from '../../middlerware/index'
import { delteUsers, getAllusers, updateusers } from "../controoler/UserContrllers";

export default (router:express.Router) => {
    router.get("/getusers",isAuthenticated,getAllusers)
    router.delete("/delteUser/:id",isAuthenticated,isOwner,delteUsers)
    router.patch("/update/:id",isAuthenticated,isOwner,updateusers)

}