import User from "../models/User.js";
import { getToken } from "../utils/utils.js";
import pkg from "express-validator";
import bcrypt from 'bcrypt'
const { validationResult } = pkg;

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { email, first_name, last_name, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email: email,
        first_name,
        last_name,
        password: bcryptPassword
      });


      if (newUser) {
        res.send({
          _id: newUser._id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
          msg: "Registered successfully!",
          success: true,
        });
      } else {
        res.status(404).send({ msg: "User Not Found" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    const signinUser = await User.findOne({
      email
    });

    if (!signinUser) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
     password,
     signinUser.password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid password");
    }

  else {
      res.send({
        _id: signinUser._id,
        first_name: signinUser.first_name,
        last_name: signinUser.last_name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
        msg: "Login successful!",
      });
    } 
  } catch (err) {
    console.log(err);
    console.log("commuing frombackend");
  }
};
