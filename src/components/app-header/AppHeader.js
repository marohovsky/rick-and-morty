import './appHeader.scss'
import logo from '../../resources/logo.svg'
export const AppHeader = () =>{
    return(
        <div className='AppHeader'>
            <img className='logo' src={logo} alt="" />
            <div className='title'>Rick and Morty</div>
        </div>
    )
}