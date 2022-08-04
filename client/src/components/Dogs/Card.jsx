import React from "react";
import style from './Card.module.css';
import {Link} from 'react-router-dom';

export default function Card({id,name, image, weight_min, weight_max, temperaments, createInDb}){
  
    return(
       

            <div className={style.card}>
                <div>

                    <img src={image} alt={name+'.jpg'}/>
                    <h2 className={style.title}>{name}</h2>
                
                    <h3><span className={style.temp}>😊😡:</span> {
                        !!createInDb
                        ?temperaments.map((el, i)=>{
                        return i === temperaments.length-1?el:el+ ' | '})
                        :temperaments.map((el, i) => {return i === temperaments.length-1?el:el+' | '})
                        }
                    </h3>
                    <h3><span className={style.peso}>Peso:</span> {weight_min}<span> to </span>{weight_max}</h3>
                </div>
                <div className={style.boton}></div>
                <Link to={'/home/dog/'+id} target="_blank">                 
                        <a>{`ver mas >`}</a>                
                </Link>

            </div>
         
    )
}
