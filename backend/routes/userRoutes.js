import express from "express";
import pkg from "express-validator";
const { check } = pkg;
const router = express.Router();
import User from "../models/User.js";

import { registerUser, loginUser } from "../controllers/userController.js";

router.post("/register",
  [
    check("email", "email must be valid").isEmail()
    .custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must have a minimum length of 5"),
  ],
  registerUser
);

router.post("/login", loginUser);

export default router;
