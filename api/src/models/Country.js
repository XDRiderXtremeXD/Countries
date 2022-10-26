const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true,
      validate: {
        isAlpha:true,
        isEven(value) {
            if(value.length<3)
            throw new Error(`ID valor Tiene que tener 3 letras`)
        }
      }
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bandera:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.DOUBLE,
    },
    poblacion:{
      type: DataTypes.INTEGER,
    },
    creador:{
      type: DataTypes.STRING,
      defaultValue: "Claudio Chumpitaz"
    }
    //string nombre creado por
  },{
    timestamps: false,
  });
};
