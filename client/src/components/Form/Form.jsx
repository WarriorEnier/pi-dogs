import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTemperaments, postDogs, getDogs} from '../../actions/index'
import dog from "../../img/dogForm.jpg"
import style from './Form.module.css';
import DogCreate from "./DogCreate";

export default function Form(){
    
    const [boton, setBoton] = useState(true)
    const [errors, setErrors] = useState(false);
    
    const [input, setInput] = useState({
        name:"",
        weight_min:"",
        weight_max:"",
        height_min:"",
        height_max:"",
        life_span_min: "",
        life_span_max: "",
        image:"",
        temperaments:[],
    })
    const [copiaInput, setCopiaInput] = useState({})
    const {
        name,
        weight_min,
        weight_max,
        height_min,
        height_max,
        life_span_min,
        life_span_max,
        image,
        temperaments
    } = input;

    const dispatch = useDispatch();
    const temp = useSelector(state => state.temps);
    const allDogs = useSelector(state => state.dogs);

    useEffect(()=>{
        dispatch(getTemperaments())
        dispatch(getDogs())
    },[]);

    function validarName(input){
        if(!input.match(/^\S/)){return 'only text'}      
        if(!input.match((/^[a-zA-Z ]+$/))) {return 'only text '}  
        if(input.length < 4){return 'very short name';}
        if(input.length > 50){return 'very long name';}
    }

    function validarWeightMin(input,max){
        //if(input.match((/[\[\\\^\$\.\|\?\*\+\/\)\{\}]/g)))return'only number';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 99)return'min out of range';
        //if(!input.match((/^[0-9]*$/)))return'only number';
        //if(input<0)return 'only number of positives';
        //if(parseInt(input)>=parseInt(max))return 'min cannot be greater than or equal to max';
    }

    function validarWeightMax(input,min){
        //if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 120)return 'max out of range';
        if(parseInt(input)<=parseInt(min))return 'max cannot be less than or equal to min';
    }

    function validarHeightMin(input, max){
        //if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 99)return 'min out of range';
        //if(parseInt(input)>=parseInt(max))return 'min cannot be greater than or equal to max';
    }
    function validarHeightMax(input, min){
        //if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 120)return 'max out of range';
        if(parseInt(input)<=parseInt(min))return 'max cannot be less than or equal to min';
    }

    function validarLifeSpanMin(input, max){
        //if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 10)return 'min out of range';
        //if(parseInt(input)>=parseInt(max))return 'min cannot be greater than or equal to max';
    }

    function validarLifeSpanMax(input, min){
        //if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return  'only number';
        if(input > 20)return 'max out of range';
        if(parseInt(input)<=parseInt(min))return 'max cannot be less than or equal to min';
    }

    function validarTemperament(input){
        if(input.length===0)return 'min 1 temperaments per breed';
    }

    function validarImage(input){
        if(!input.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))return 'invalid URL'
    }

    const errorName = validarName(input.name);
    const errorWeightMin = validarWeightMin(input.weight_min, input.weight_max);
    const errorWeightMax = validarWeightMax(input.weight_max, input.weight_min);
    const errorHeightMin = validarHeightMin(input.height_min, input.height_max);
    const errorHeightMax = validarHeightMax(input.height_max, input.height_min);
    const errorLifeSpanMin = validarLifeSpanMin(input.life_span_min, input.life_span_max);
    const errorLifeSpanMax = validarLifeSpanMax(input.life_span_max, input.life_span_min);
    const errorTemperament = validarTemperament(input.temperaments);
    const errorImage = validarImage(input.image);

    function validarErrores(name, weight_min, weight_max, height_min, height_max, life_min, life_max, temperaments ){  
        if(name!==undefined
            && weight_min!==undefined
            && weight_max!==undefined
            && height_min!==undefined
            && height_max!==undefined
            && life_min!==undefined
            && temperaments!==undefined
            && life_max!==undefined)return true;                    
    }
    const resValidar = validarErrores(
        errorName,
        errorWeightMin,
        errorWeightMax,
        errorHeightMin,
        errorHeightMax,
        errorLifeSpanMin,
        errorLifeSpanMax,
        errorTemperament,
        );
    

    
    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })   
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        const nameRep = allDogs.filter(dog => dog.name.toLowerCase()===input.name.toLowerCase())
        if(nameRep.length>0){            
            return alert('already this breed!!!')
        }else if(name.trim()===''
        ||weight_min.trim()===''
        ||weight_max.trim()===''
        ||height_min.trim()===''
        ||height_max.trim()===''
        ||temperaments.length===0){
            
            return alert('Missing fields to complete!!!')
                
        }else{     
            setCopiaInput(input)
            setErrors(true)      
            dispatch(postDogs(input))
            setInput({
                name:"",
                weight_min:"",
                weight_max:"",
                height_min:"",
                height_max:"",
                life_span_min: "",
                life_span_max: "",
                image:"",
                temperaments:[],
            })
        }
        
    }
    const handleSelectTemp = (e) =>{
        
        (temperaments.length < 6)&&setInput({
            ...input,
            temperaments:temperaments.includes(e.target.value)?[...temperaments]:[...temperaments, e.target.value]      
        })
       
        if(temperaments.length === 6){            
            setBoton(false)
        }

        if(errors){            
            setErrors(false)
        }
    }
    const handleDeleteTemp = (e) =>{
        setInput({
            ...input,
            temperaments: temperaments.filter(t => t !== e)
        })
        if(temperaments.length<7){
            setBoton(true)
        }
    }
    const handleReset = (e) =>{
        e.preventDefault();
        setInput({
            name:"",
            weight_min:"",
            weight_max:"",
            height_min:"",
            height_max:"",
            life_span_min: "",
            life_span_max: "",
            image:"",
            temperaments:[],
        })
    }

    

    return(
        <>
            <div className={style.contenedor}>
                <div className={style.content}>
                    <div className={style.contentForm}>
                        
                        <div className={style.contentImg}>
                            
                        <button>

                        🢀<Link to= {'/home'}><span>back to home</span></Link>
                        </button>
                            <div><img src={dog} alt="" /></div>
                        </div>
                        <div className={style.contentInput}>                            
                            <div>                        
                                <h2>Create DOG</h2>
                                
                            </div>
                            {/* Contenedor del name */}
                            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                                
                                <div>
                                    <div className={style.flexErrors}>
                                        <p>Name<span> *</span></p>
                                        {input.name&&(<p className={style.pError}>{errorName}</p>)}
                                        
                                    </div>
                                    
                                    <input 
                                        type="text" 
                                        value={name}
                                        name="name"
                                        onChange={e=>handleChange(e)}
                                        className={style.input}
                                        placeholder="Breed name..." 
                                        
                                        />
                                        
                                </div>
                                {/* Contenedor del weight */}
                                <div>
                                    <div className={style.flexErrors}>
                                        <p>{`Weight (kg)`}<span> *</span></p>
                                        {input.weight_min && (<p className={style.pError}>{errorWeightMin}</p>)}
                                        {input.weight_max && (<p className={style.pError}>{errorWeightMax}</p>)}
                                    </div>
                                    <input 
                                        type="text" 
                                        value={weight_min}
                                        name="weight_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        min="1"
                                        max="98"
                                        placeholder="Min..." 
                                        
                                    />
                                    <input 
                                        type="text" 
                                        value={weight_max}
                                        name="weight_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        min="2"
                                        max="99"
                                        placeholder="Max..." 
                                        
                                    />
                                </div>
                                {/* Contenedor del Height */}
                                <div>
                                    <div className={style.flexErrors}>
                                        <p>{`Height (cm)`}<span> *</span></p>
                                        {input.height_min && (<p className={style.pError}>{errorHeightMin}</p>)}
                                        {input.height_max && (<p className={style.pError}>{errorHeightMax}</p>)}
                                    </div>
                                    <input 
                                        type="text" 
                                        value={height_min}
                                        name="height_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                        
                                    />
                                    <input 
                                        type="text" 
                                        value={height_max}
                                        name="height_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        placeholder="Max..." 
                                        
                                    />
                                </div>
                                {/* Contenedor del Life_Span */}
                                <div>
                                    <div className={style.flexErrors}>
                                        <p>{`Life span (year)`}</p>
                                        {input.life_span_min && (<p className={style.pError}>{errorLifeSpanMin}</p>)}
                                        {input.life_span_max && (<p className={style.pError}>{errorLifeSpanMax}</p>)}
                                    </div>
                                    <input 
                                        type="text" 
                                        value={life_span_min}
                                        name="life_span_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                    />
                                    <input 
                                        type="text" 
                                        value={life_span_max}
                                        name="life_span_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        placeholder="Max..." 
                                        />
                                </div>
                                {/* Contenedor de Image */}
                                <div className="">
                                    
                                    <div className={style.flexErrors}>
                                    <p>Image</p>
                                    <div></div>
                                    {input.image && (<p className={style.pError}>{errorImage}</p>)}
                                </div>
                                    <input 
                                        type="text" 
                                        value={image}
                                        name="image"
                                        onChange={handleChange}
                                        className={style.input}
                                        placeholder="http://myDog.jpg" 
                                    />
                                </div>
                                
                                {/* Contenedor del Select */}
                                <div className={style.contentSel}>
                                    
                                    <select onChange={e => handleSelectTemp(e)} disabled={!boton}>
                                    
                                        <option className={style.temp} disabled selected>Temperaments</option>
                                        
                                        {temp.map((el, i) =>{
                                            return(
                                                <option 
                                                className={style.temp}
                                                value={el.name}
                                                key={i}>{el.name}
                                            
                                                
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <div className={style.flexErrors}>

                                        {temperaments&&(<p className={style.pError}>{errorTemperament}</p>)}
                                    </div>
                                </div>
                                <h3><span>* </span>these values are required</h3>
                             <div className={style.flexBoton}>
                                <button type="submit" className={style.boton} /* disabled={!resValidar} */>Accept</button>
                                <button type="submit" className={style.boton} onClick = {e => handleReset(e)}>Reset</button>
                            </div>
                            </form>
                            
                            <div></div>
                        </div>
                            
                    </div>
                    <div className={style.res}>
                        <div>
                            {/* <h2>Dog created</h2> */}
                            <div>
                                {errors&&<DogCreate copiaInput={copiaInput}/>}
                                
                            </div>
                        </div>
                        <div>
                        {temperaments.map(el =>
                                            <div className={style.flexSelect}>
                                                <p>{el}</p>
                                                <button onClick={()=>handleDeleteTemp(el)}>X</button>
                                            </div>
                                        )}
                        </div>
                    </div>
                </div>
            </div>
                
            
        
            
        </>
    )
}