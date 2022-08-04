import {React, useState} from 'react'
import style from './Paginacion.module.css'
import {useSelector} from 'react-redux'


export default function Pagination({paginado, porPag, pag}) {

    const allDogs = useSelector((state) => state.dogs);

    const [pageDisplayed, setPageDisplayed] = useState(4);
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(4);
    const [minPageDisplayed, setMinPageDisplayed] = useState(0);


    const arrayPaginado = [];
    const max = Math.ceil(allDogs.length / porPag);
    if(pag>Math.ceil(allDogs.length/porPag)&&pag!==1){paginado(1)}
    for (let n = 1; n <= max; n++) {
        arrayPaginado.push(n)
    }

    const movePages = (page) => {
        if (page === arrayPaginado?.length) {
            movePagesPrevius(0)
            setMaxPageDisplayed(4);
            setMinPageDisplayed(0);

        } else {
            if (page === 0) page = arrayPaginado?.length;
            let maxi = page + pageDisplayed - 1;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi);
            setMinPageDisplayed(mini);
        }
    }

    const movePagesPrevius = (page) => {
        if (page === 1) movePages(0)
        else if (page <= 1 && page > 0) {
            setMaxPageDisplayed(4);
            setMinPageDisplayed(0);
        }
        else {
            if (page === 0) page = 1;
            let maxi = page + pageDisplayed - 3;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi);
            setMinPageDisplayed(mini);
        }
    }


    const handleClik = (page) => {
        movePages(page);
        paginado(pag);

    }

    const firstPage=(e) => {
        e.preventDefault()
        movePages(1)
        paginado(1)
    }

    const lastPage=(e) => {
        e.preventDefault()
        movePages(max - 1 )
        paginado(max)
    }

    const previous = (e, page) => {
        e.preventDefault();
        movePagesPrevius(page);
        if (page === 1) {
            paginado(arrayPaginado?.length);
        }
        else paginado(page - 1);
    }

    const next = (e, page) => {
        e.preventDefault()
        movePages(page);
        if (page === arrayPaginado?.length) {
            paginado(1);
        }
        else {
            paginado(page + 1)
        }
    }

    const renderPageNumber = arrayPaginado?.map((pages) => {

        if (pages < maxPageDisplayed + 1 && pages > minPageDisplayed - 1) {
            return <li key={pages} id={pages} className={pag === pages ? style.active : null} onClick={() => handleClik(pages)}>
                <ul className={style.listaPag} >{pages}</ul>
            </li>
        } else {
            return null;
        }
    });


    return (
        <nav className={style.all}>

            <div className={style.flex}>
                <div >
                    <button  onClick={(e) => firstPage(e)} disabled={pag <= 1} >⋘</button>
                    <button className={style.boton} onClick={(e) => previous(e, pag)} disabled={pag <= 1}> ⪡ </button>
                </div>
                <div>
                    <ul className={style.listaPag}>
                        <li>
                            {renderPageNumber}
                        </li>
                    </ul>
                </div>
                <div>
                    <button className={style.boton} onClick={(e) => next(e, pag)} disabled={pag >= max} > ⪢ </button>
                    <button  onClick={(e) => lastPage(e)} disabled={pag >= max}>⋙</button>
                </div>
            </div>
        </nav>
    )
} 