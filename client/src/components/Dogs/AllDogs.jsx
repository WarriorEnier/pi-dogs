import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Card from "./Card";
import Paginacion from "./Paginacion";
import style from './Card.module.css'



export default function AllDogs({currentDogs}){
    const [error, setError] = useState(false)
  /*   const allDogs = useSelector((state) =>state.dogs);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch]);
    

    const [pag, setPag] = useState(1);
    const [porPag, setPorPag] = useState(8);

    const maxPag = allDogs.length/porPag;
    const first = (pag-1)*porPag;
    const end = (pag-1)*porPag+porPag;
    const currentDogs = allDogs.slice(first, end) */
    /* .replace(/,/g,' |') */
  
    return(
       <>
       
        <div className={style.container}>
               
            {currentDogs.length 
                ?currentDogs.map(el =>( 
                    
                        <Card 
                            id={el.id}
                            name={el.name} 
                            image={el.image} 
                            weight_min={el.weight_min} 
                            weight_max={el.weight_max} 
                            temperaments={!!el.createInDb?el.temperaments:el.temperaments}
                            /* temperament = {el.temperament} */
                            createInDb = {el.createInDb}
                            />                                     
                                                    
                ))                      
                :<Loading/>}
        </div>
        
       </>
        
       
    )
    
}