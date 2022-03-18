import express from "express";
import userRoutes from "./routes/userRoutes.js";
import chemicalRoutes from './routes/chemicalRoutes.js'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://demariogibson:Aurora1129@cluster0.ncd3l.mongodb.net/chemical_app?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected!!!!"))
  .catch((err) => console.log(err));

app.use("/", userRoutes);
app.use('/', chemicalRoutes)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}!!!`));
