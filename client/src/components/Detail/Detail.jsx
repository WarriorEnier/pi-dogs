import React, { useEffect } from "react";
import { getDogById, reset } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import Loading from "../Loading/Loading";
import style from './Detail.module.css';



export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogById(props.match.params.id));
        dispatch(reset());
    },[dispatch])

    const myDog = useSelector(state => state.detail);

    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,320L34.3,282.7C68.6,245,137,171,206,122.7C274.3,75,343,53,411,74.7C480,96,549,160,617,160C685.7,160,754,96,823,80C891.4,64,960,96,1029,90.7C1097.1,85,1166,43,1234,37.3C1302.9,32,1371,64,1406,80L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
            <div className={style.containerMain}>

                {
                    myDog.length>0
                    ?<div className={style.container}>
                        <div className={style.conteImg} >
                            <img src={myDog[0].image}/>
                        </div>
                        <div className={style.body}>
                            <h2>Nombre : {myDog[0].name}</h2>
                            <h3>Peso   : {myDog[0].weight_min} a {myDog[0].weight_max} kilos</h3>
                            <h3>Tamaño : {myDog[0].height_min} a {myDog[0].height_max} cm</h3>
                            <h3>Esperanza de vida : {myDog[0].life_span_min} a {myDog[0].life_span_max} años</h3>
                            <h3>Temperamento : {!!myDog[0].createInDb
                                ?myDog[0].temperaments.map((tem, i) =>{ 
                                    return i === tem.length-1
                                    ?tem.name:tem.name+' | '
                                })
                                :myDog[0].temperaments.map((tem, i) =>{ 
                                    return i === tem.length-1
                                    ?tem:tem+' | '
                                })
                                }</h3>
                        </div>
                    </div>
                    :<Loading/>
                }
                <button>

                🢀<Link to= {'/home'}><span>Volver al home</span></Link>
                </button>
                
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eaaf0b" fill-opacity="1" d="M0,256L40,240C80,224,160,192,240,186.7C320,181,400,203,480,218.7C560,235,640,245,720,234.7C800,224,880,192,960,197.3C1040,203,1120,245,1200,245.3C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        </>
    )
}