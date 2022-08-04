import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, filterByTemperaments } from "../../actions";
import style from './Filtros.module.css';

export default function Temperaments({setPag}){
    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temps);
    

    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch]);
    
    function handleFilterTemperaments(e){
        e.preventDefault();
        setPag(1);
        
        dispatch(filterByTemperaments(e.target.value))             
    }
   
   
    return(
        <>
            
            <select className={style.select}  onChange={e => handleFilterTemperaments(e)}>
                <option value="" disabled selected>Temperaments</option>
                <option value="todo" >All</option>
                {allTemps.map((temp,i)=>{
                    return(
                        <option value={temp.name} key={i}>{temp.name}</option>
                    )
                })}
            </select>
        </>
    )


}