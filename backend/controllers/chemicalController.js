import Chemical from '../models/Chemical.js';

export const postChemical = async (req, res) => {
      try{
        const myChemical = await Chemical.create(req.body)
        res.json({msg: "successfully posted!!", data: myChemical})
      }catch(err){
          res.send(err)
      }
}


export const getChemicals = async (req, res) => {
    try{
        const chemicals = await  Chemical.find({})

        const userChemicals = chemicals.filter(chemical => chemical.user == req.user._id)
    
        res.json({msg: "success!", data: userChemicals})
     
    }catch(err){
        res.send(err)
    }
}



export const deleteChemical = async (req, res) => {
  try{
      const deletedChemical = await Chemical.findByIdAndDelete(req.params.id) 
      res.json({msg: "successfully deleted!!", data: deletedChemical})

  }catch(err){
      res.send(err)
  }
}



