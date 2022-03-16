import mongoose from "mongoose";

const chemicalSchema = new mongoose.Schema({
  chemicalName: {
    type: String,
    required: true,
  },
  chemicalQuantity: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  time : { type : Date, default: Date.now}

});

const ChemicalModel = mongoose.model("Request", chemicalSchema);

export default ChemicalModel;