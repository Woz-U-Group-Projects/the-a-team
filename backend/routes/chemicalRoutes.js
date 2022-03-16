import express from 'express';
import {postChemical, getChemicals, deleteChemical} from '../controllers/ChemicalController.js'
import { isAuth } from '../utils/utils.js';


const router = express.Router();

router.get("/chemicals", isAuth, getChemicals)

router.post("/chemicals", isAuth,   postChemical)

router.delete("/chemicals/:id", isAuth, deleteChemical)


export default router;