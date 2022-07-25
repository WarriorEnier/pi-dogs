import {
    GET_DOGS,
    GET_DOGS_TEMPERAMENTS,
    GET_NAME_DOGS,
    GET_ID_DOG,
    ORDENAMIENTO,
    FILTER_ALL,
    FILTER_BY_API,
    FILTER_BY_CREATED,
    FILTER_BY_NAME,
    FILTER_BY_TEMP,
    FILTER_BY_WEIGHT,
    RESET
} from '../actions/index'



const initialState = {
    dogs:[],
    allDogs:[],
    temps:[],
    detail:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs:action.payload,
                allDogs: action.payload
            }
        case GET_DOGS_TEMPERAMENTS:
            return{
                ...state,
                temps:action.payload
            }
        case GET_NAME_DOGS:
            return{
                ...state,
                dogs:action.payload
            }
        case GET_ID_DOG:
            return{
                ...state,
                detail:action.payload
            }
        case ORDENAMIENTO:
            const orderArr = action.payload === 'asc'
            ?state.dogs.sort((a, b) =>{
                if(a.name > b.name){
                    return 1   
                }else if(a.name < b.name){
                    return -1
                }else{
                    return 0
                }
            })
            :state.dogs.sort((a, b) =>{
                if(a.name > b.name){
                    return -1
                }else if(a.name < b.name){
                    return 1
                }else{
                    return 0
                }
                          
            })
            return{
                ...state,
                dogs:orderArr
            }
        case FILTER_BY_CREATED:
            const allDogs2 = state.allDogs;
            const creado = action.payload ==='creado'
                ?allDogs2.filter(el=>el.createInDb)
                :allDogs2.filter(el=>!el.createInDb);
            console.log(action.payload)
            return{
                ...state,
                dogs: action.payload === 'todo'
                    ?allDogs2
                    :creado
            }
        case FILTER_BY_WEIGHT:
            const allDogs4 = state.allDogs;
            
            return{

            }  
        case FILTER_BY_TEMP:
            const allDogs3 = state.dogs;
            const statusTemp = action.payload === 'todo'
                ?allDogs3
                :allDogs3.filter(el => !!el.createInDb
                    ?el.temperaments?.some((tem, i) => tem[i].name.toLowerCase()===action.payload.toLowerCase())
                    :el.temperaments?.some((tem) => tem.toLowerCase()===action.payload.toLowerCase()));
                console.log(action.payload);
                console.log(statusTemp)
            return{
                ...state,
                dogs:statusTemp
            }
        //case POST_VIDEOGAME:
        //    return {...state}
        case RESET:
            return{
                ...state,
                detail:{}
            }
        default:
            return {...state}
    }
}

export default rootReducer;