import React from "react";
import { useDispatch } from "react-redux";
import { filterByName } from "../../actions";
import style from './Filtros.module.css';

export default function Name({setPag}){

    const dispatch = useDispatch();

    function handleFilterName(e){
        e.preventDefault();
        dispatch(filterByName(e.target.value));
        setPag(1)
    }

    return(
        <select className={style.select} onChange={e => handleFilterName(e)}>
            <option disabled selected>Alphabetically</option>
            <option value ='A-Z'> A - Z </option>
            <option value ='Z-A'> Z - A </option>
        </select>
    )
}