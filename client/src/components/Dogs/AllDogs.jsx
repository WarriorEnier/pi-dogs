import React from "react";

import Loading from "../Loading/Loading";
import Card from "./Card";

import style from './Card.module.css'



export default function AllDogs({currentDogs}){
    
  
  
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
                            createInDb = {el.createInDb}
                            />                                     
                                                    
                ))                      
                :<Loading/>}
        </div>
        
       </>
        
       
    )
    
}