import './Footer.css';
import {ReactComponent as GithubIcon} from '../github.svg'; 



function Footer(){
    return (

        <div className='footer'>

            <GithubIcon className='image'/>
            <button className='button'>
                GitHub
            </button>

            <button className='button'>About</button>            
        </div>
    );
}

export default Footer