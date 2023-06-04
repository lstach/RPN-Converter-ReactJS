import './Footer.css';
import { useState } from "react";
import {ReactComponent as GithubIcon} from '../github.svg'; 
import React from 'react';
import Popup from 'reactjs-popup';
import Modal from './Modal';



function Footer(){

    const gitHub = () => {
        window.open("https://github.com/lstach/RPN-Converter-ReactJS");
    }

    const about = () =>{
        
    }
    
    return (
        <div className='footer'>

            

            <GithubIcon className='image'/>
            <button className='button' onClick={gitHub}>
                GitHub
            </button>

            <button className='button' onClick={about}>About</button>            
        </div>
    );
}

export default Footer