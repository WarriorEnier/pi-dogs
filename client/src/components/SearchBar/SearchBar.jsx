import React,{useState} from "react";
import {getNameDogs} from "../../actions"
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'


export default function SearchBar({setPag}){
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
        setPag(1)
        
        
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
