import './FormulaEntry.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"

function FormulaEntry(){

    const [inputD, setInputData] = useState("")
    const [outputD, setParagraphText] = useState('')
    
    const submit = async () => {
        //console.log('output = ', output)
        const myData = "data to backend from frontend!";
        console.log(inputD)
        
        const result = await axios.post("http://localhost:5000/api", {
            inputD
        })

        // const resultInJson =  await result.json();
        console.log('result = ', result);
        
        //console.log('flag = ', flag);
        setParagraphText(result.data);
    }

    return (
        <div className='container'>
            <input type='text' onInput={(e) => setInputData(e.currentTarget.value)} />
            <button onClick={() => submit()} className='btnCalculate'>Convert</button>
            <p>{outputD}</p>
        </div>

        
        
    );
}

export default FormulaEntry