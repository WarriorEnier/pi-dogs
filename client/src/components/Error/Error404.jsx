import dog from '../../img/404Not.jpg'
import style from './Error.module.css';
import { Link } from 'react-router-dom';

export default function Error404(){
    return(
        <div>
            <Link to='/home'>
                <button  className={style.boton}>
                    🢀 Atras
                </button>
            </Link>
            <img src={dog} alt="404notFound.jpg" className={style.notFound} />
        </div>
    );
}