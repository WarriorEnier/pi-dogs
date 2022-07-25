import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated } from "../../actions";
import style from './Filtros.module.css';



export default function Creado(){
    const dispatch = useDispatch();

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    return(
        <>
        <select className={style.select} onChange={e => handleFilterCreated(e)}>
            <option value ='todo'> Todos </option>
            <option value ='creado'> Creado </option>
            <option value ='api'> Api </option>
        </select>
        </>
    )
}