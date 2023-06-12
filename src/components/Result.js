import './Result.css';

import React, { useEffect, useState } from 'react'

function Result(){

  const [backendData, setBackendData] = useState([{}])
  const [paragraphText, setParagraphText] = useState('') // this is how i set it

  
  useEffect(() => {
    console.log('render')
  }, []);

    return (
        <div className='subContainer' style={{marginBottom: '100px', marginTop:'25px'}}>
            <p style={{color: 'red'}}>error text</p>
            <h1 className='subtitle' style={{fontWeight: 'lighter'}}>Result:</h1>
        </div>
    );
}

export default Result