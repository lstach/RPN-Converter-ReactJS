import './Result.css';

import React, { useEffect, useState } from 'react'

function Result(){

  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    console.log('render')
  }, []);

  function ready(){
    return backendData == 'hello, stuff!';
  }

  console.log('backendData = ', backendData);

    return (
        <div className='subContainer' style={{marginBottom: '100px', marginTop:'25px'}}>
            <p style={{color: 'red'}}>error text</p>
            <h1 className='subtitle' style={{fontWeight: 'lighter'}}>Result:</h1>
            
          

            {(backendData === 'hello, stuff!') ? (
                <p>{backendData}</p>
            ): (
                <p>loading...</p>
            )}

        </div>
    );
}

export default Result