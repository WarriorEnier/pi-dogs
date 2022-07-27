/* import React from "react";
import { useDispatch } from "react-redux";
import { filterByWeight} from "../../actions";
import style from './Filtros.module.css';

export default function MaxMin(){
    const dispatch = useDispatch();
    function handleFilterWeight(e){
        e.preventDefault();
        dispatch(filterByWeight(e.target.value));
    }
    return(
        <>
        <select name="" id="" className={style.select} onChange={e=>handleFilterWeight(e)}>
            <option value="max">Peso maximo</option>
            <option value="min">Peso min</option>
            
        </select>
        </>
    )
} */