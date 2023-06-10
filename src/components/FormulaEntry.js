import './FormulaEntry.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"

function FormulaEntry(){

    const [authors, setAuthors] = useState([])
    const [inputD, setInputData] = useState("")
    
    const submit = async () => {
        const myData = "data to backend from frontend!";
        console.log(inputD)
        // const result = await fetch('/api', {myData});
        const result = await axios.post("http://localhost:5000/api", {
            inputD
        })

        // const resultInJson =  await result.json();
        console.log(result);
    }

    return (
        <div className='container'>
            <input type='text' onInput={(e) => setInputData(e.currentTarget.value)} />
            <button onClick={() => submit()} className='btnCalculate'>Convert</button>
        </div>
    );
}

export default FormulaEntry