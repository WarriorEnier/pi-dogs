const {getTemperament} = require('../../utils/index')
const {Temperament} = require('../../db')


//Funcion que captura la info mandada desde getTemperament()
//se pasa por un Set() para quitar los datos repetidos
//el result lo pasamos por un forEach para guardar en la tabla
//sin antes evaluar si el dato viene vacio, odviando este ultimo
const getTemperamentResult = async(req, res)=>{
    try{
        const temp = await getTemperament();     
        let data = new Set(temp);
        let result = [...data]        
        result.forEach(el => {
            if(!!el){
                Temperament.findOrCreate({
                    where:{name:el}
                })
            }
            })
        const allTempMyDb = await Temperament.findAll();
        return res.status(200).send(allTempMyDb);
    }catch(error){
        return res.status(400).send(error+' no trajo desde miBD')
    }
}

module.exports = {getTemperamentResult}