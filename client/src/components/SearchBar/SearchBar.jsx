import React,{useState} from "react";
import {getNameDogs} from "../../actions"
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'
import { Link } from "react-router-dom";

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
        setName(e.target.reset());
        
    }
    return(
        <div className={style.search}>
            
            <form action="" onSubmit={e => handleSubmit(e)}>

                        <input 
                            type="text"
                            placeholder="breed name..." 
                            className={style.input}
                            onChange={e => handleInputChange(e)}
                        />
                       

                            <button 
                                className={style.boton}
                                type="submit"
                                
                                > Search</button>
                        
            </form>
            
        </div>
    )
}
