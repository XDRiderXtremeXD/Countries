const {Router} = require('express');
// const fetch = require('node-fetch')
const {Country,Activities} = require('../../db')
const axios = require('axios');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const router = Router()

// GET /characters
router.post("/",async(req,res,next)=>{
  try {
    const {nombre, dificultad,duracion,temporada,paises} = req.body;
      
    var PaisesTotales = await Country.findAll({where:{nombre:paises}})
      if(PaisesTotales){
         ActividadCreada=await Activities.create({nombre:nombre,dificultad:dificultad,duracion:duracion,temporada:temporada})
         console.log(ActividadCreada.__proto__)
         
         await ActividadCreada.addCountries(PaisesTotales)
      }
    res.json("Actividades Creadas correctamente");
   }
   catch (error) {
    res.json((400, {
      error: error,
      msg: "No se pudo actualizar la base de datos"
   }))
  }
})
/*
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre:{
      type: DataTypes.STRING,
    },
    dificultad:{
      type: DataTypes.INTEGER,
    },
    duracion:{
      type: DataTypes.STRING,
    },
    temporada:{
      type: DataTypes.STRING,
    }
  },{
    timestamps: false,
  });
};*/



module.exports= router