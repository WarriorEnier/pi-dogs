import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTemperaments, filterByTemperaments } from "../../actions";
import style from './Filtros.module.css';

export default function Temperaments({setPag}){
    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temps);
    const [pagi, setPagi] = useState(1)
   
    const [order, setOrder] = useState('');

    useEffect(()=>{
        dispatch(getTemperaments());
    },[]);
    
    function handleFilterTemperaments(e){
        e.preventDefault();
        setPag(1);
        
        dispatch(filterByTemperaments(e.target.value))
        /* setPagi(1) */
       
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