import "./FormulaEntry.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Result";
import Header from "./Header";

function FormulaEntry() {
  const [inputD, setInputData] = useState("");
  const [errorText, setErrorText] = useState("");
  const [rpnFormula, setRPNFormula] = useState(""); // this is how i set it
  const [rpnResult, setRPNResult] = useState(""); // this is how i set it

  const [outputD, setOutputD] = useState("");

  const submit = async () => {
    let errorFlag = false;
    var result;

    /*
    axios.post("http://localhost:5000/api/", {
        inputD,
    })
    .then(function (response){
      console.log("hello");
    })
    .catch(function (error) {
      console.log('goodbye');
    });*/

    if (inputD != "") {
      try {
        let requestString = "";
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
          requestString = "http://localhost:5000/api/";
        } else {
          requestString = "/api/";
        }

        result = await axios.post(requestString, {
          inputD,
        });
      } catch (error) {
        //console.log('hello');
        if (error.response && error.response.status === 400) {
          let apiError = error.response;
          //console.log(typeof(apiError));
          //console.log(apiError);
          //console.log(apiError.response);
          //setErrorText(apiError.response);
        } else if (error.response && error.response.status === 500) {
          let apiError = error.response;
          let split = apiError.data.split(",");
          let errorType = split[0];
          let token = split[1];
          console.log("token = ", token);
          //setErrorText(errorType);

          switch (errorType) {
            case "UnknownToken":
              setErrorText("Unknown token: '" + token + "'");
              break;
            case "DoubleOperator":
              setErrorText("Error: missing an operator before '" + token + "'");
              break;
            case "DoubleOperand":
              setErrorText("Error: missing an operand before '" + token + "'");
              break;
            case "ParenthesesError":
              setErrorText("Mismatched parentheses '" + token + "'");
              break;
            default:
              setErrorText("Error in parsing; check input and try again.");
              break;
          }
          setRPNFormula("");
          setRPNResult("");
        }

        return;
      }

      let serverResult = result.data.split(",");
      setRPNFormula(serverResult[0]);
      setRPNResult("= " + serverResult[1]);
      setErrorText("");
    } else {
      setErrorText("");
    }

    // JSX code to get result:
    // <p>{resultText}</p>
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          background: "ghostwhite",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "10px",
          paddingBottom: "25px",
        }}
      >
        <Header></Header>

        <div className="container">
          <input
            type="text"
            onInput={(e) => setInputData(e.currentTarget.value)}
          />
          <button onClick={() => submit()} className="btnCalculate">
            Convert
          </button>
        </div>
      </div>

      <div
        className="subContainer"
        style={{ marginBottom: "100px", marginTop: "25px" }}
      >
        <p style={{ color: "red" }}>{errorText}</p>

        <h1 className="subtitle" style={{ fontWeight: "lighter" }}>
          RPN Formula and Solution:
        </h1>

        <p>{outputD}</p>

        <div>
          <p className="resultText">{rpnFormula}</p>
          <p>{rpnResult}</p>
        </div>
      </div>
    </div>
  );
}

export default FormulaEntry;
