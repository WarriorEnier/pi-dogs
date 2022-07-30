import React, { useEffect } from 'react'
import dog from '../../img/perroNot.jpg'
import { Link } from 'react-router-dom'
import style from './Error.module.css'
import { reset, getDogs } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Error(){

    const dispatch = useDispatch();
    const allDogs = useSelector((state) =>state.dogs);

    useEffect(()=>{
        reset()
    },[])
    const handleReset = ()=>{
        dispatch(getDogs())
    }
    return(
        <>
        <div className={style.contenedor}>
                <button onClick={handleReset} className={style.boton}>
                🢀 Atras
                </button>
            <div className={style.cont}>
                <h1>Perrito no encontrado</h1>
                <img src={dog} alt="" />

            </div>
            
                
        </div>
        
        </>
    )
}