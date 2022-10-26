const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
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
      unique: true
    },
    dificultad:{
      type: DataTypes.SMALLINT,
      validate: {
        min: 0,
        max: 5,
      }
    },
    duracion:{
      type: DataTypes.SMALLINT,
      validate: {
        min: 1,
        max: 12,
      }
    },
    temporada:{
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno','Primavera')  
    }
  },{
    timestamps: false,
  });
};
