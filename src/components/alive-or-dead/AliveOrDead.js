import { useState, useEffect } from 'react'
import { useRickMortylService } from '../../service/rickMortyService';

import { CONSTANT } from '../../Constant/constant';

import { CheckMark } from '../check-component/CheckMark';
import { CloseIcon } from '../check-component/CloseIcon';
import { Spinner } from '../spinner/Spinner';

import './aliveOrDead.scss'

export const AliveOrDead = () => {
    const [char, setChar] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null)
    const {loading, getCharacter} = useRickMortylService();
    
    useEffect(() => {
        updateRandomChar();
        // eslint-disable-next-line 
    },[]);

    const updateRandomChar = () => {
        setUserAnswer(null);
        const randomID = Math.floor(Math.random() * CONSTANT.TOTAL_CHARACTERS) + 1;
        getCharacter(randomID).then(onCharLoaded);

    }

    const onCharLoaded = (char) => {
        setChar(char); 
    }

    const checkUserAnswer =  (ans) =>{
        if(loading){
            return false;
        }
        setUserAnswer(ans);
        setTimeout(updateRandomChar, 2000)
        
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || !char) ? <ViewChar char={char} /> : null;
    const correctAnswer = (userAnswer !== null  && userAnswer === char.status)  ? <CheckMark/>: <CloseIcon/>;

    return (
        <div className="AliveOrDead">
            <div className ='randomChar'>
                {spinner}
                {(userAnswer !== null) ? correctAnswer : content}
                
            </div>
            <div className ='menu'>
                <div className='staticMenu'>
                    <p className='staticMenu_title'>What do you think, this character is alive?</p>
                    <p>Make your choice and check how many know about "The Rick and Morty" universe</p>
                </div>
                <div className="dinamicMenu">
                    <button className="btn green" onClick={() => checkUserAnswer('Alive')}>Alive</button>
                    <button className="btn red" onClick={() => checkUserAnswer('Dead')}>Dead</button>
                </div>
            </div>
        </div>
    )
}

const ViewChar = ({char})=>{
    return(
        <div className='char'>
            <img className='char_img' src={char.image} alt="" />
            <div className='char_info'>
                <div className='char_baseInfo'>
                    <div className='char_name'>{char.name}</div>
                    <div className='char_status'>{char.species}</div>
                </div>
                <div className='char_originLocation'>
                    <div className='static_info'>First seen in:</div>
                    <div>{char.origin.name}</div>
                </div>
                <div className='char_lastLocation'>
                    <div className='static_info'>Last known location:</div>
                    <div>{char.location.name}</div>
                </div>
            </div>
        </div>
    )
}
