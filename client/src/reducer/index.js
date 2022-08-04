import {
    GET_DOGS,
    GET_DOGS_TEMPERAMENTS,
    GET_NAME_DOGS,
    GET_ID_DOG,
    ORDENAMIENTO,
    POST_DOG,
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
            const ordenTemp = action.payload.sort((a,b)=> a.name>b.name?1:-1)
            return{
                ...state,
                temps:ordenTemp
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
            return{
                ...state,
                dogs: action.payload === 'todo'
                    ?allDogs2
                    :creado
            }
        case FILTER_BY_WEIGHT:
            let allDogs4 = [...state.dogs];
            let ordenarPeso = action.payload === 'max'
                ?allDogs4.sort((a,b)=>{
                    if(parseInt(a.weight_max) > parseInt(b.weight_max)){

                        return -1   
                    }
                    if(parseInt(a.weight_max) < parseInt(b.weight_max)){

                        return 1
                    }
                    
                    return 0
                    
                })
                :allDogs4.sort((a,b)=>{
                    if(parseInt(a.weight_min) < parseInt(b.weight_min)){
                        return -1   
                    }
                    if(parseInt(a.weight_min) > parseInt(b.weight_min)){
                        return 1
                    }
                        return 0
                    
                })               
            return{
                ...state,
                dogs:ordenarPeso
            }
        case FILTER_BY_NAME:
            let allDogs5 = [...state.dogs];
            let ordenarAlfa = action.payload === 'Z-A'
            ?allDogs5.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1   
                }else if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1
                }else{
                    return 0
                }
            })
            :allDogs5.sort((a,b)=>{
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1   
                }else if(a.name > b.name){
                    return 1
                }else{
                    return 0
                }
            })               
        return{
            ...state,
            dogs:ordenarAlfa
        }
        case FILTER_BY_TEMP:
            const allDogs3 = state.dogs;
            const statusTemp = action.payload === 'todo'
                ?allDogs3
                :allDogs3.filter(el => !!el.createInDb
                    ?el.temperaments?.some((tem) => tem.toLowerCase()===action.payload.toLowerCase())
                    :el.temperaments?.some((tem) => tem.toLowerCase()===action.payload.toLowerCase()));                
            return{
                ...state,
                dogs:statusTemp
            }
        case POST_DOG:
            return {...state}
        case RESET:
            return{
                ...state,
                detail:{},
                
            }
        default:
            return {...state}
    }
}

export default rootReducer;