import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTemperaments, postDogs} from '../../actions/index'
import dog from "../../img/dogForm.jpg"
import style from './Form.module.css';

export default function Form(){
    
    const [boton, setBoton] = useState(true)
    const [errors, setErrors] = useState(false);
    const [tempSel, setTemp] = useState([])
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
    },[]);

    function validarName(input){
        if(!input.match(/^\S/)){return 'only text'}      
        if(!input.match((/^[a-zA-Z ]+$/))) {return 'only text '}  
        if(input.length < 4){return 'very short name';}
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
        if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 99)return 'min out of range';
        if(parseInt(input)>=parseInt(max))return 'min cannot be greater than or equal to max';
    }
    function validarHeightMax(input, min){
        if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 120)return 'max out of range';
        if(parseInt(input)<=parseInt(min))return 'max cannot be less than or equal to min';
    }

    function validarLifeSpanMin(input, max){
        if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return 'only number';
        if(input > 99)return 'min out of range';
        if(parseInt(input)>=parseInt(max))return 'min cannot be greater than or equal to max';
    }

    function validarLifeSpanMax(input, min){
        if(input<0)return 'only number of positives';
        if(!input.match((/^\d+$/)))return  'only number';
        if(input > 120)return 'max out of range';
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
    
    /* function validar(input){
        let errors={};
        const nameRep = allDogs.filter(dog => dog.name.toLowerCase()===input.name.toLowerCase())
        console.log(nameRep)
        
        if(!input.name){errors.name = 'name field is required';}
        else if(!input.name.match((/^[a-zA-Z ]+$/))) {errors.name ='only text '}

        
        if(!input.weight_min){errors.weight_min = 'min field is required';}
        else if(!input.weight_min.match((/^\d+$/))){errors.weight_min = 'only number';}
        else if(input.weight_min > 100){errors.weight_min = 'min out of range';}
        else if(parseInt(input.weight_min)>=parseInt(input.weight_max))errors.weight_min = 'min cannot be greater than or equal to max';
        
        if(!input.weight_max){errors.weight_max = 'max field is required';}
        else if(!input.weight_max.match((/^\d+$/))){errors.weight_max = 'only number';}
        else if(input.weight_max > 150){errors.weight_max = 'max out of range';}
        else if(parseInt(input.weight_max)<=parseInt(input.weight_min))errors.weight_min = 'max cannot be less than or equal to min';


        if(!input.height_min){errors.height_min = 'min field is required';}
        else if(!input.height_min.match((/^\d+$/))){errors.height_min = 'only number';}
        else if(input.height_min > 100){errors.height_min = 'min out of range';}
        else if(parseInt(input.height_min)>=parseInt(input.height_max))errors.height_min = 'min cannot be greater than or equal to max';
        
        if(!input.height_max){errors.height_max = 'max field is required';}
        else if(!input.height_max.match((/^\d+$/))){errors.height_max = 'only number';}
        else if(input.height_max > 150){errors.height_max = 'max out of range';}
        else if(parseInt(input.height_max)<=parseInt(input.height_min))errors.height_min = 'max cannot be less than or equal to min';

        
        if(!input.life_span_min.match((/^\d+$/))){errors.life_span_min = 'only number';}
        else if(input.life_span_min > 100){errors.life_span_min = 'min out of range';}
        else if(parseInt(input.life_span_min)>=parseInt(input.life_span_max))errors.height_min = 'min cannot be greater than or equal to max';
        
        
        if(!input.life_span_max.match((/^\d+$/))){errors.life_span_max = 'only number';}
        else if(input.life_span_max > 150){errors.life_span_max = 'max out of range';}
        else if(parseInt(input.life_span_max)<=parseInt(input.life_span_min))errors.height_min = 'max cannot be less than or equal to min';

        if(temperaments.length > 6)errors.temperaments = 'maximum 6 temperaments per breed';

        if(!input.image.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))errors.image = 'URL invalida'
        //else if(nameRep.length>0){errors.name = 'this name is already in the DB'}
        /* 
        
        if(height_min.trim()==='')errors.height_min = 'height min field is required';
        if(life_span_max.trim()==='')errors.height_max = 'height min field is required';
        
        
        
        if(!height_min.match(/^\d+$/))errors.height_min = 'only number';
        if(!height_max.match(/^\d+$/))errors.height_max = 'only number';
        if(!life_span_min.match(/^\d+$/))errors.life_span_min = 'only number';
        if(!life_span_max.match(/^\d+$/))errors.life_span_max = 'only number';
        
        
        if(parseInt(height_min)>=parseInt(height_max))errors.height_min = 'min cannot be greater than or equal to max';
        if(parseInt(height_max)<=parseInt(height_min))errors.height_min = 'max cannot be less than or equal to min';
        if(parseInt(life_span_min)>=parseInt(life_span_max))errors.life_span_min = 'min cannot be greater than or equal to max';
        if(parseInt(life_span_max)<=parseInt(life_span_min))errors.life_span_max = 'max cannot be less than or equal to min';
          
        
        return errors;
    } */
    
    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

       //setErrors(validar({...input, [e.target.name] : e.target.value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const nameRep = allDogs.filter(dog => dog.name.toLowerCase()===input.name.toLowerCase())
        
        if(name.trim()===''
            ||weight_min.trim()===''
            ||weight_max.trim()===''
            ||height_min.trim()===''
            ||height_max.trim()===''
            ||temperaments.length===0){
                setErrors(true)
                //return alert('Faltan campos por completar')
        }else if(nameRep.length!==0){
                setErrors(true)
                return alert('Ya esta el perro')
        }else{           
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
        //temperaments.length === 6&&setBoton(false)
        if(temperaments.length === 6){            
            setBoton(false)
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

    console.log(errors);

    return(
        <>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,320L34.3,282.7C68.6,245,137,171,206,122.7C274.3,75,343,53,411,74.7C480,96,549,160,617,160C685.7,160,754,96,823,80C891.4,64,960,96,1029,90.7C1097.1,85,1166,43,1234,37.3C1302.9,32,1371,64,1406,80L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg> */}
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
                                {/* {errors?(<p className={style.pError}>Este perro ya se encuentra</p>):null} */}
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
                                        required
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
                                        required
                                    />
                                    <input 
                                        type="number" 
                                        value={weight_max}
                                        name="weight_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        min="2"
                                        max="99"
                                        placeholder="Max..." 
                                        required
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
                                        type="number" 
                                        value={height_min}
                                        name="height_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                        required
                                    />
                                    <input 
                                        type="number" 
                                        value={height_max}
                                        name="height_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        placeholder="Max..." 
                                        required
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
                                        type="number" 
                                        value={life_span_min}
                                        name="life_span_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                    />
                                    <input 
                                        type="number" 
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
                        <h2>Dog created</h2>
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
            
        
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,186.7C320,181,400,203,480,218.7C560,235,640,245,720,234.7C800,224,880,192,960,197.3C1040,203,1120,245,1200,245.3C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg> */}
        </>
    )
}