import React from "react";
import style from './Form.module.css';

export default function DogCreate({copiaInput}){
    const {name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span_min,
    life_span_max,
    image,
    temperaments} = copiaInput

    return(

        <div>
            <div className={style.contenedorDog}>
                <img src={image ||'https://i.im.ge/2022/07/25/FIlbgf.jpg'} alt="" />
                <h2>Name: {name}</h2>
                <p>
                    Weight: <span>{weight_min} to {weight_max} Kilograms</span>
                </p>
                <p>
                   Height: <span>{height_min} to {height_max} Centimeters</span>
                </p>
                <p>
                   Life Span: <span>{!!life_span_min?life_span_min:'5'} to {!!life_span_max?life_span_max:'15'} Years</span>
                </p>
                <p>Temperaments: <span>{temperaments.map(el => el + ' | ')}</span></p>

            </div>
        </div>
    )
    
}