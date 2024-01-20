import express from "express";
import authentication from "./autentication/index";
import Users from "./users";

const router = express.Router()
export default (): express.Router => {
    authentication(router);  
    Users(router)
    return router;
  };