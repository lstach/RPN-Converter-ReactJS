import './Header.css';

function Header(){
    return (
        <div className='bigContainer'>

            <div className='container'>
                <h1 className='title'>Reverse Polish Notation Converter</h1>
                
            </div>

            <p className='localText'>Enter a formula in infix notation.  It will be converted into Reverse Polish Notation (RPN)
                and then evaluated to give you the result.
            </p>

        </div>
    );
}

export default Header