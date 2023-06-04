import './AboutRPN.css';

function AboutRPN(){
    return (

        <div style={{backgroundColor: 'white',}}>
            <div className='subContainer'>
                <h2 className='subtitle'>
                    How to type?
                </h2>

                <hr className='line'></hr>

                <p className='text'>
                    Surround negative numbers in parentheses, e.g. (-3.2). Ensure that parentheses are matched.
                </p>

                <h2 className='subtitle'>
                    About RPN
                </h2>
                <hr className='line'></hr>

                <p className='text'>
                Infix notation is the standard notation used in Mathematics. However, 
                because infix notation isn't read from left-to-right (due to the order of operations) 
                but rather requires you to read back-and-forth, it is extremely difficult for a computer 
                to interpret it.
                </p>

                <p className='text'>
                RPN is a notation schema where operators follow their operands, 
                which is much easier for a computer to understand. Infix notation is converted to RPN using 
                the shunting yard algorithm, which this website implements.
                </p>

                <a href="https://en.wikipedia.org/wiki/Reverse_Polish_notation">More about RPN</a>

            </div>
        </div>   
    );
}

export default AboutRPN