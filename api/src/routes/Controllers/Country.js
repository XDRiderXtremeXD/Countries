const {Router} = require('express');
// const fetch = require('node-fetch')
const {Country,Activities} = require('../../db')
const axios = require('axios');
const e = require('express');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const router = Router()

// GET /characters
router.get("/",async(req,res,next)=>{
    try {
      let {name} =req.query;
      var paises;
      paises=await Country.findAll();

      if(!paises.length){
      const api = (await axios.get("https://restcountries.com/v3.1/independent?status=true")).data;  
      for(let e of api){
        var find = await Country.findOne({where:{nombre: e.name.common}})
        if(e.capital!=undefined)
          if(!find){
            await Country.create({nombre:e.name.common,
            id:e.cca3, bandera:e.flags.png,continente:e.region,
            subregion:e.subregion,area:e.area,
            poblacion:e.population,capital:e.capital[0]})
          }
        }
      }

      const FiltroDatos={
        attributes: {exclude: ['capital','subregion','area']}
        ,include: {
            model: Activities,
            attributes: ['nombre']
      }}
      //si el string es "P"  entonces me traera todos los paises que comiencen con la letra P
      //si es string es "Pe" entonces me traera todos los paises que comiencen con el texto "Pe"
      paises=name?(
        await Country.findAll({
          where:{nombre: {
            [Op.iLike]:`${name}%`
            }},
           ...FiltroDatos})):
           (await Country.findAll({
           ...FiltroDatos
        }))
           
      res.send(paises);
      } catch (error) {
        next(error)}
})

router.get("/:idpaises",async(req,res,next)=>{
  let {idpaises} =req.params;
        try{
            var find = await Country.findOne({where:{id: idpaises},include:Activities})
            if(find){
              res.send(find);
            }
            res.status(404).json({error: "paises no encontrado"})
        }
        catch(error){
            next(error)
        }
})

module.exports= router