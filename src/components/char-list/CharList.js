import { useEffect } from 'react';
import { useState } from 'react'
import { useRickMortylService } from '../../service/rickMortyService';
import { Spinner } from '../spinner/Spinner';
import './charList.scss'
export const CharList = (props) =>{
    const {loading, getCharactersPage} = useRickMortylService();
    const [page, setPage] = useState(1);
    const [charList, setCharList] = useState([])
    
    useEffect(()=>{
        updatePage();
        // eslint-disable-next-line 
    }, [])

    const updatePage = () =>{
        if(page === 42){
            return false;
        }

        getCharactersPage(page).then(onCharListLoaded);  
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setPage(page => page + 1);
    }


    const renderItemsList = (arr) => {
        const items =  arr.map((item, i) => {
            let classNames = (item.id === props.selectedChar) ? 'selected' : '';
            return (
                <li 
                    className={`item ${classNames}`}
                    key={i}
                    onClick={() => {
                        props.onCharSelected(item.id);
                      
                    }}>
                        <img className="img_item" src={item.image} alt={item.name}/>
                </li>
            )
        });
        
        return (
            <ul className="char_list">
                {items}
            </ul>
        )
    }

    const items = renderItemsList(charList);
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="all_char">
                {items}
                {spinner}
            <button 
                className="btn red"
                style={{'display': (loading || page === 42) ? 'none' : 'block'}}
                onClick={() => updatePage(page)}>
                Load More
            </button>
        </div>
    )
}