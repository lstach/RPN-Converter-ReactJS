import React from "react";


function Modal(){

    return (
        <div className = "modalBackground">
            
            <div className="modalContainer">

                <button>X</button>

                <div className = "title">
                    <h1>About</h1>
                </div>

                <div className = "body">
                    <p>Here's some about information!</p>
                </div>

                <div className = "bottom">
                    <button>Cancel</button>
                    <button>Converter</button>
                </div>
            </div>
            
        </div>
    );
}

export default Modal;