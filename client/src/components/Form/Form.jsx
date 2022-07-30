import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTemperaments, postDogs} from '../../actions/index'
import dog from "../../img/dogForm.jpg"
import style from './Form.module.css';

export default function Form(){
    
    const [errors, setErrors] = useState({});
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

    useEffect(()=>{
        dispatch(getTemperaments())
    },[]);


    function validar(input){
        let errors={};
    }
    
    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
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
    const handleSelectTemp = (e) =>{
        setInput({
            ...input,
            temperaments:[...input.temperaments, e.target.value]
        })
    }
    const handleDeleteTemp = (e) =>{
        setInput({
            ...input,
            temperaments: input.temperaments.filter(g => g !== e)
        })
    }


    console.log(temperaments);

    return(
        <>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,320L34.3,282.7C68.6,245,137,171,206,122.7C274.3,75,343,53,411,74.7C480,96,549,160,617,160C685.7,160,754,96,823,80C891.4,64,960,96,1029,90.7C1097.1,85,1166,43,1234,37.3C1302.9,32,1371,64,1406,80L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg> */}
            <div className={style.contenedor}>
                <div className={style.content}>
                    <div className={style.contentForm}>
                        
                        <div className={style.contentImg}>
                            
                            <div><img src={dog} alt="" /></div>
                        </div>
                        <div className={style.contentInput}>                            
                            <div>                        
                                <h2>Create DOG</h2>
                            </div>
                            {/* Contenedor del name */}
                            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                                
                                <div>
                                    <p>Name<span> *</span></p>
                                    <input 
                                        type="text" 
                                        value={name}
                                        name="name"
                                        onChange={handleChange}
                                        className={style.input}
                                        placeholder="Breed name..." 
                                        />
                                </div>
                                {/* Contenedor del weight */}
                                <div>
                                    <p>Weight<span> *</span></p>
                                    <input 
                                        type="number" 
                                        value={weight_min}
                                        name="weight_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                    />
                                    <input 
                                        type="number" 
                                        value={weight_max}
                                        name="weight_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        placeholder="Max..." 
                                    />
                                </div>
                                {/* Contenedor del Height */}
                                <div>
                                    <p>Height<span> *</span></p>
                                    <input 
                                        type="number" 
                                        value={height_min}
                                        name="height_min"
                                        onChange={handleChange}
                                        className={style.inputIni}
                                        placeholder="Min..." 
                                    />
                                    <input 
                                        type="number" 
                                        value={height_max}
                                        name="height_max"
                                        onChange={handleChange}
                                        className={style.inputFin}
                                        placeholder="Max..." 
                                    />
                                </div>
                                {/* Contenedor del Life_Span */}
                                <div>
                                    <p>life span</p>
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
                                    <p>Image</p>
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
                                    
                                    <select onChange={e => handleSelectTemp(e)} >
                                        <option className={style.temp}>Temperaments</option>
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
                                    <ul>
                                        <li>{temperaments.map(el => 
                                                
                                                <span className={style.span}>{el}
                                                <button 
                                                    className={style.button}
                                                    onClick={()=>handleDeleteTemp(el)}>X
                                                </button>
                                            </span>
                                                )}
                                        </li>
                                    </ul>
                                
                                    {/* {<ul>
                                        <li>{temp.map(el => 
                                            <span>{el}
                                                <button 
                                                    onClick={()=>handleDeleteTemp(el)}>X
                                                </button>
                                            </span>
                                            )}
                                        </li>
                                    </ul>} */}
                                </div>
                                <h3><span>* </span>these values are required</h3>
                             <div className={style.flexBoton}>
                                <button type="submit" className={style.boton}>Accept</button>
                                <button type="submit" className={style.boton}>Reset</button>
                            </div>
                            </form>
                            
                            <div></div>
                        </div>
                            
                    </div>
                    <div className={style.res}><h2>Dog created</h2></div>
                </div>
            </div>
            
        
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,186.7C320,181,400,203,480,218.7C560,235,640,245,720,234.7C800,224,880,192,960,197.3C1040,203,1120,245,1200,245.3C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg> */}
        </>
    )
}