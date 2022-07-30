import dog from '../../img/what2.jpg'
import style from './Error.module.css'
export default function ErrorId(){
    return(
        <div className="con">
            <img src={dog} alt=""  className={style.errorId}/>
        </div>
    )
}