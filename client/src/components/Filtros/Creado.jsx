import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreated, reset, getDogs } from "../../actions";
import style from './Filtros.module.css';



export default function Creado(){
    const dispatch = useDispatch();
    const dog = useSelector(state => state.dogs)
    useEffect(()=>{
        if(dog.length ===0){
            dispatch(getDogs())
        }
    },[dispatch])
    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        dispatch(reset())
    }

    return(
        <>
        <select className={style.select} onChange={e => handleFilterCreated(e)}>
            <option value ='todo'> All </option>
            <option value ='creado'> Created </option>
            <option value ='api'> Api </option>
        </select>
        </>
    )
}