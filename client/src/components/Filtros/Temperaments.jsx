import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, filterByTemperaments } from "../../actions";
import style from './Filtros.module.css';

export default function Temperaments(){
    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temps);

    useEffect(()=>{
        dispatch(getTemperaments());
    },[]);

    function handleFilterTemperaments(e){
        e.preventDefault();
        dispatch(filterByTemperaments(e))
    }
    function mostrar(){
        getTemperaments.forEach(element => {
           console.log(element) 
        });
    }
   
    return(
        <>
            
            <select className={style.select}  onChange={e => handleFilterTemperaments(e)}>
                <option value="todo">Todos</option>
                {allTemps.map((temp,i)=>{
                    return(
                        <option value={temp.name} key={i}>{temp.name}</option>
                    )
                })}
            </select>
        </>
    )


}