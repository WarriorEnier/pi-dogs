const axios = require('axios');
const {Dog, Temperament} = require('../db');
const API_URL = 'https://api.thedogapi.com/v1/breeds?x-api-key=';
const {API_KEY} = process.env;

//Funcion para capturar todos los temperamentos de los perros,
//crear un solo array separados con el join().split(', '),
//y retornar nuevamente con el join().split(',') para dejarlo listo
const getTemperament = async()=>{
    try {
        const apiDogs = await axios.get(API_URL+API_KEY);
        const temp = apiDogs.data.map(el => el.temperament).join().split(', ');
        return temp.join().split(",");

    } catch (error) {
        throw new Error(error +' Error al guardar los temperamentos')
    }
}


//En esta funcion traemos los datos(id, name) desde mi BD temperaments
//para luego cuando ser utilizados
const getTemperamentMyDb = async(req, res) =>{
    try {
        const temperament = await Temperament.findAll({
            attributes:['id', 'name']
        });
        return temperament
    } catch (error) {
        throw new Error(error + 'Error en la extracion de temperamentos de la BD')
    }
}

//Funcion que me trae toda la info desde la api de dogs, se mapea y se retorna
const getApiDogs = async()=>{
    try {
        const temperament = await getTemperamentMyDb();
        let dogs = await axios.get(API_URL+API_KEY);
        let temp = dogs.data.map(el=>el.temperament);
        //console.log(temp.join('|'));
        let dog = dogs.data.map(el =>{
            //temp = el.temperament.replaceAll(',','|')
            return{
                id:el.id,

                name:el.name,

                weight_min:el.weight.metric.split(' - ').length===1
                                            ? '2'
                                            :el.weight.metric.split(' - ')[0]!=='NaN'
                                                ?el.weight.metric.split(' - ')[0]:'2',

                weight_max:el.weight.metric.split(' - ').length===1
                                            ? el.weight.metric!=='NaN'?el.weight.metric:'10'
                                            :el.weight.metric.split(' - ')[1],

                height_min:el.height.metric.split(' - ').length===1
                                            ? '5'
                                            :el.height.metric.split(' - ')[0],

                height_max:el.height.metric.split(' - ').length===1
                                            ? el.height.metric
                                            :el.height.metric.split(' - ')[1],     

                temperaments:!!el.temperament?[el.temperament].join().split(', '):['Temperament not found'],

                image: el.image.url,

                life_span_min: el.life_span.replace(' years','').split(' - ').length===1
                                            ? '5'
                                            :el.life_span.replace(' years','').split(' - ')[0],
                life_span_max: el.life_span.replace(' years','').split(' - ').length===1
                                            ? el.life_span.replace(' years','')
                                            :el.life_span.replace(' years','').split(' - ')[1],                            
            }
        })
        
        
        return dog;
    } catch (error) {
        throw new Error(error+' Error al extraer los perros de la API')
    }
}
//Funcion que me trae toda la info desde mi BD dogs, 
//relacionamos la info temperaments con lo que tenemos en la BD de temperaments
//creada por nosotros, se termina retornado la respuesta 
const getMyDb = async() =>{
    try {
        const db = await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through:{
                    attributes:[]
                }
            }
        })
        //ojo acá
        const dbNew = db.map(e =>{
            return {
                id: e.id,
                name: e.name,
                image: e.image || 'https://i.im.ge/2022/07/25/FIlbgf.jpg',
                height_min: e.height_min,
                height_max: e.height_max,
                weight_min: e.weight_min,
                weight_max: e.weight_max,
                life_span_min: e.life_span_min || '5',
                life_span_max:e.life_span_max || '15',
                createInDb: e.createInDb,
                temperaments: e.temperaments.map(e => e.name)
            }
        })
        return dbNew
    } catch (error) {
        throw new Error(error +' Error en la captura de datos en BD')
    }
}

//Funcion que concatena la llamada de la API junto con la llamada a la BD
const getAllDogs = async(req, res)=>{
    
    try {
        const dogApi = await getApiDogs();
        const dogDb = await getMyDb();
        const allDogs = dogApi.concat(dogDb);
        return allDogs;
    } catch (error) {
        throw new Error(error+' Error al concatenar la respuesta de miBd con la de la APi')
    }
}

module.exports = {getAllDogs, getTemperament}