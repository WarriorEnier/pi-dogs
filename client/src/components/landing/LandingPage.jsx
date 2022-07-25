import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <body className={style.contenedor}>
            
            <div className={style.flex}>
                <h1 className={style.title}>Dogs</h1>
                <Link to ='/home'>
                    <a className={style.boton}>Press</a>
                </Link>
                
            </div>
        </body>
        
    )
}