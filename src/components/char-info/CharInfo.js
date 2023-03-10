import { useEffect } from "react";
import { useState } from "react";
import { useRickMortylService } from "../../service/rickMortyService";
import Skeleton from "../skeleton/Skeleton";
import { SpinnerDark } from "../spinner/SpinnerDark";

import './charInfo.scss'

export const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, getCharacter} = useRickMortylService();

    
    useEffect(() => {
        updateChar();
        // eslint-disable-next-line 
    }, [props.selectedChar]); 

    const updateChar = () => {
        if (!props.selectedChar) {
            return;
        }
        getCharacter(props.selectedChar)
            .then(onCharLoaded)
            
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading ? null : <Skeleton/>;
    const spinner = loading ? <SpinnerDark/> : null;
    const content = !(loading ||  !char) ? <ViewChar char={char}/> : null;

    return (
        <div className="charInfo">
            {skeleton}
            {spinner}
            {content}
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
                    <div className={`char_status ${char.status}`}>{char.status + " - " + char.species}</div>
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