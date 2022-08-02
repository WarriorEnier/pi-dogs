const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:'5'
    },
    height_max:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:'30'
    },
    weight_min:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:'2'
    },
    weight_max:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:'10'
    },
    life_span_min:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "5"
    },
    life_span_max:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "15"
    }, 
    image: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },
  {
    timestamps:false
  }
  );
};
