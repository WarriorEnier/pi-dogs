import React from "react";
import style from './Card.module.css';

export default function Card({name, image, weight, temperament, createInDb}){
   /*  let temperament2;
    if(!createInDb){
         temperament2 = temperament.replaceAll(',','|');
    } */
    //console.log(temperament)
    return(
        
        <div className={style.card}>
            <img src={image} alt={name+'.jpg'}/>
            <h2>{name}</h2>
            <h3>{!!createInDb?temperament.map(el=>el.name+','):temperament}</h3>
            <h3>{weight}</h3>
        </div>
    )
}
