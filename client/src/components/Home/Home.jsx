import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { getDogs } from "../../actions/index"
import AllDogs from "../Dogs/AllDogs";
import Paginacion from "../Dogs/Paginacion";

import { filterByOrdenamiento } from "../../actions/index";
import Creado from "../Filtros/Creado";
import Temperaments from "../Filtros/Temperaments";


import style from './Home.module.css';
import s from '../Filtros/Filtros.module.css';


export default function Home(){
    const dispatch = useDispatch();

    const allDogs = useSelector((state) =>state.dogs);

    const [pag, setPag] = useState(1);
    const [porPag, setPorPag] = useState(8);

    const paginado = (pagNum)=>{
        setPag(pagNum)
    }

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch]);
    

    const [orden, setOrden] = useState('')

    function handleFilterOrder(e){ 
        e.preventDefault();
        dispatch(filterByOrdenamiento(e.target.value))
        setPag(1);
        
        setOrden(`Ordenado ${e.target.value}`)
    }
    const maxPag = allDogs.length/porPag;
    const first = (pag-1)*porPag;
    const end = (pag-1)*porPag+porPag;
    const currentDogs = allDogs.slice(first, end)

    return(
        <>  
        <div className={style.nav}>
                <div className={style.flex}>

                    <div >
                        <i class="fa-solid fa-dog"></i>
                        <h1 className={style.titulo}>DOGS</h1>
                    </div>

                    <div className={style.filtros}>
                        <select /* className={s.select} */ onChange={e => handleFilterOrder(e)}>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                        </select>
                        <Creado/>
                        <Temperaments/>
                    </div>
                    <div className={style.search}>
                        <input 
                            type="text"
                            placeholder="Buscar" 
                            className={style.input}
                        />
                        <button 
                            className={style.boton}
                            type="submit"> Buscar</button>

                    </div>
                </div>
            </div>
            <div className={style.svgSup}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,320L34.3,282.7C68.6,245,137,171,206,122.7C274.3,75,343,53,411,74.7C480,96,549,160,617,160C685.7,160,754,96,823,80C891.4,64,960,96,1029,90.7C1097.1,85,1166,43,1234,37.3C1302.9,32,1371,64,1406,80L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
            </div>
            {/* <Order setPag={setPag}/> */}
            <div /* className={style.container} */>

                <AllDogs currentDogs={currentDogs}/>
                {/* <div className={style.svg}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,186.7C320,181,400,203,480,218.7C560,235,640,245,720,234.7C800,224,880,192,960,197.3C1040,203,1120,245,1200,245.3C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
                </div> */}
            </div>

                <Paginacion pag={pag} setPag={setPag} maxPag={maxPag}/>
        </>

    )
    /*  */
    /* allDogs?.map(el =>{
        return(
            <>
            <Link to={'/home/dog/'+el.id}>
                {el.name},
                {el.image}
            </Link>
            <h1>Estamos en el HOME</h1>
            </>
        )

    }) */
}