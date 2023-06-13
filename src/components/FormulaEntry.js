import './FormulaEntry.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Result from './Result';
import Header from './Header';

function FormulaEntry(){

    const [inputD, setInputData] = useState('')
    const[errorText, setErrorText] = useState('')
    const [rpnFormula, setRPNFormula] = useState('') // this is how i set it
    const [rpnResult, setRPNResult] = useState('') // this is how i set it

    const [outputD, setOutputD] = useState('')

    const submit = async () => {
        
        //console.log(inputD);
        
        const result = await axios.post("http://localhost:5000/api", {
            inputD
        })


        // JSX code to get result:
        // <p>{resultText}</p>
        
        let serverResult = result.data.split(",");
        
        console.log('0 = ', serverResult[0]);
        console.log('1 = ', serverResult[1]);
        setOutputD(result.data);

        setRPNFormula(serverResult[0]);
        setRPNResult(serverResult[1]);
        
    }

    return (

        <div>
            <div style={{border: '1px solid black', background: "ghostwhite", marginLeft: '10px', marginRight: '10px', marginTop: "10px", paddingBottom: "25px"}}>
                <Header></Header>

                <div className='container'>
                    <input type='text' onInput={(e) => setInputData(e.currentTarget.value)} />
                    <button onClick={() => submit()} className='btnCalculate'>Convert</button>
                </div>

            </div>

            <div className='subContainer' style={{marginBottom: '100px', marginTop:'25px'}}>
                <p style={{color: 'red'}}>error text</p>

                <h1 className='subtitle' style={{fontWeight: 'lighter'}}>RPN Formula and Solution:</h1>

                <p>{outputD}</p>

                <div>
                    <p>{rpnFormula}</p>
                    <p>{rpnResult}</p>
                </div>
                
            </div>
        </div>
    
    );
}

export default FormulaEntry