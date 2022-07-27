import React,{useState} from "react";
import {getNameDogs} from "../../actions"
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getNameDogs(name));
    }
    return(
        <div className={style.search}>
                        <input 
                            type="text"
                            placeholder="Buscar" 
                            className={style.input}
                            onChange={e => handleInputChange(e)}
                        />
                        <button 
                            className={style.boton}
                            type="submit"
                            onClick={e => handleSubmit(e)}
                            > Buscar</button>

        </div>
    )
}
