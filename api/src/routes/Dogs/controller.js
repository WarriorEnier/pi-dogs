const {Dog, Temperament} = require('../../db')
const {getAllDogs} = require('../../utils/index');


//Funcion que me mapea todos los perros tanto de la API como de la BD
//pasamos name por query,condicionamos name,buscamos y mostramos por este. 
//pasamos id por params, condicionamos id, buscamos y mostramos por este.
const getDogsApi = async(req, res) =>{
    try {
        const {name} = req.query;
        const {id} = req.params;
        const dogsAll = await getAllDogs();
        //console.log(dogsAll.length)
        if(name){
            let dogName = dogsAll.filter(el=>el.name.toLowerCase().includes(name.toString().toLowerCase()));
            dogName.length
                ?res.status(200).send(dogName)
                :res.status(404).send('No se encontro un Dog con ese nombre')
                ;
        }else if(id){
            //let dogId = dogsAll.findByPk(id, {include:[{model:Temperament}]}) 
            let dogId = dogsAll.filter(el => el.id == id);
            dogId.length
                ?res.status(200).send(dogId)
                :res.status(400).send('No se encontro un video juego con el ID = '+ id);
        }else{
            
            return res.status(200).send(dogsAll);
        }
      
    } catch (error) {
        throw new Error(error+' Error en el getDogsApi')
    }
}

const postDogs = async(req, res) =>{
    try{
        let {
            name,
            height,
            weight,
            life_span,
            image,
            temperament,
            createInDb
        } = req.body;

        const dogsAll = await getAllDogs();
        const result = dogsAll.filter(el => el.name.toLowerCase() === name.toLowerCase());
        if(!result.length){
            const dogCreate = await Dog.create({
                name,
                height,
                weight,
                life_span,
                image,
                createInDb
            })

            let tempDb = await Temperament.findAll({where:{name:temperament}});
            dogCreate.addTemperament(tempDb);
            return res.send('Dog creado con exito')
        }
        return res.send(`El Dog ${name} ya se encuentra en nuestra BD`)

    }catch(error){
        res.status(400).send(error+' Problemas al ingresar al Dog')
    }
}

module.exports = {
    getDogsApi,
    postDogs
}