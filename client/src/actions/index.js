import axios from 'axios';
export const GET_DOGS = 'MOSTRAR TODOS LOS PERROS';
export const GET_DOGS_TEMPERAMENTS = 'MOSTRAR TODOS LOS TEMPERAMENTOS';
export const GET_NAME_DOGS = 'MOSTRAR DOGS X NAME';
export const GET_ID_DOG = 'MOSTRAR DOG X ID'
export const POST_DOG = 'GUARDAR PERRO';
export const ORDENAMIENTO = 'ORDENAMIENTO ASC DES';
export const FILTER_BY_WEIGHT = 'ORDENAMIENTO POR PESO';
export const FILTER_BY_NAME = 'ORDENAMIENRO POR NOMBRE';
export const FILTER_BY_TEMP = 'FILTRAR POR TEMPERAMENTO'
export const FILTER_BY_CREATED = 'FILTRAR SOLO CREADO';
export const FILTER_BY_API = 'FILTRAR SOLO API';
export const FILTER_ALL ='MOSTRAR CREADO Y API';
export const RESET = 'RESETEAR';

const URL_DOGS = 'http://localhost:3001/dogs';
const URL_TEMPS = 'http://localhost:3001/temp';
const URL_NAME = 'http://localhost:3001/dogs?&name=';
const URL_ID = 'http://localhost:3001/dogs/';



export const getDogs =()=> {
    return async function(dispatch){
        try {
            let json = await axios.get(URL_DOGS);
            return dispatch({
                
                type: GET_DOGS,
                payload:json.data
            })
        } catch (error) {
            throw new Error(error+' en el llamado a Dogs')
        }
    }
}

export const getTemperaments =()=>{
    return async function(dispatch){
        try {
            const temp = await axios.get(URL_TEMPS);

            return dispatch({
                type: GET_DOGS_TEMPERAMENTS,
                payload:temp.data
            })
        } catch (error) {
            throw new Error(error +' Al capturar los temperamentos')
        }
    }
}

export const getNameDogs = (name)=>{
    return async function(dispatch){
        try {
            const nameJson = await axios.get(URL_NAME+name);
            return dispatch({
                type: GET_NAME_DOGS,
                payload: nameJson.data
            });
        } catch (error) {
            console.log(error);
			return dispatch({ type: GET_NAME_DOGS, payload:'Error'});
        }
    }
}


export const getDogById = (id) =>{
    return async function(dispatch){
        try {
            const idJson = await axios.get(URL_ID+id);
            return dispatch({
                type: GET_ID_DOG,
                payload:idJson.data
            })
        } catch (error) {
            return dispatch({ type: GET_ID_DOG, payload:'Error'});
        }
    }
}

export const filterByOrdenamiento = (payload) =>{
    return {
        type: ORDENAMIENTO,
        payload
    }
}

export const filterByTemperaments = (payload)=>{
    return{
        type: FILTER_BY_TEMP,
        payload
    }
}


export const filterCreated = (payload) =>{
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export const filterByApi = (payload) =>{
    return{
        type:FILTER_BY_API,
        payload
    }
}

export const filterAll = (payload) =>{
    return{
        type: FILTER_ALL,
        payload
    }
}

export const filterByName = (payload) =>{
    return{
        type: FILTER_BY_NAME,
        payload
    }
}

export const filterByWeight = (payload)=>{
    return{
        type:FILTER_BY_WEIGHT,
        payload
    }
}

export const postDogs = (payload) =>{
    return async function(dispatch){
        const post = await axios.post(URL_DOGS, payload)
        return post;
    }
}

export const reset = () =>{
    return{
        type: RESET
    }
}