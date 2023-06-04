import './Result.css';

function Result(){
    return (
        <div className='subContainer' style={{marginBottom: '100px', marginTop:'25px'}}>
            <p style={{color: 'red'}}>error text</p>
            <h1 className='subtitle' style={{fontWeight: 'lighter'}}>Result:</h1>
            <p>RPN formula and answer go here</p>
        </div>
    );
}

export default Result