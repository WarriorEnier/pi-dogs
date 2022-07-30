import React,{useState, useEffect} from "react";
import { getDogs } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import page from './Paginacion.module.css';

export default function Paginacion({pag, setPag, maxPag, isTrue, setIsTrue}){
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.allDogs);
    const [input, setInput] = useState(pag)

    /* useEffect(()=>{
      dispatch(getDogs())
      
        
      
    },[]) */
    
    const nextPage = () =>{
        setInput(parseInt(input)+1);
        setPag(parseInt(pag)+1);
    };

    const previousPage = () =>{
        setInput(parseInt(input)-1);
        setPag(parseInt(pag)-1);
    }

    const onKeyDown = e => {
        if (e.keyCode == 13) {
          setPag (parseInt (e.target.value));
          if (
            isNaN ((e.target.value)) ||
            parseInt (e.target.value < 1) ||
            parseInt (e.target.value) > Math.ceil (maxPag)
            
          ) {
            setPag (1);
            setInput (1);
          } else {
            setPag (parseInt (e.target.value));
          }
        }
        
      };
    const onChange = (e) =>{
        setInput(e.target.value);
        setInput(pag)    
    

    };
    return (
            <div className={page.flex}>
                <button disabled={pag===1||pag<1} 
                    onClick={previousPage}
                    className={page.boton}
                    >
                🢀
                </button>
                <input
                    onChange={e=>onChange(e)}
                    onKeyDown={e=>onKeyDown(e)}
                    name='page'
                    autoComplete="off"  
                    /* disabled  */                 
                    value={pag}
                    className={page.input}
                />
                <p className={page.p}>de {Math.ceil(maxPag)}</p>
                <button
                    disabled={pag === Math.ceil(maxPag) || pag > Math.ceil(maxPag)}
                    onClick={nextPage}
                    className={page.boton}
                >
                    🢂
                </button>
            </div>
    )
}