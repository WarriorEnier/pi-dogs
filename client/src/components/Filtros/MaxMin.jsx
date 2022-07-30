/* import React from "react";
import { useDispatch } from "react-redux";
import { filterByWeight} from "../../actions";
import style from './Filtros.module.css';

export default function MaxMin({setPag}){
    const dispatch = useDispatch();
    const handleFilterWeight=(e)=>{
        e.preventDefault();
        dispatch(filterByWeight(e.target.value));
        setPag(1)
    }
    return(
        <>
        <select  className={style.select} onChange={e=>handleFilterWeight(e)}>
                <option>Peso</option>
                <option value="max">Max</option>
                <option value="min">Min</option>
        </select>
        </>
    )
}
        //export default function MaxMin({setPag}){
           /*  const dispatch = useDispatch();
            function handleFilterWeight(e){
                e.preventDefault();
                dispatch(filterByWeight(e.target.value));
            } */
            /* onChange={e=>handleFilterWeight(e)} */
            /* return(
                <>
                <select  className={style.select}>
                        <option>Peso</option>
                        <option value="max">Max</option>
                        <option value="min">Min</option>
                </select>
                </>
            ) */
        //} 