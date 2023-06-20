const {
  UnknownTokenError,
  ParenthesesError,
  DoubleOperatorError,
} = require("./errors.js");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length == "0") {
      throw new Error("error");
    }
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }
}

app.post("/api", async (req, res) => {
  // **** req.body.inputD is the input data as a string
  //  res.json(req.body.inputD)   //////

  let tempS = req.body.inputD + " hi";

  let infixTokens = [];
  error = false;

  // CHECK FOR PARSING ERRORS
  try {
    infixTokens = parse(req.body.inputD);
  } catch (error) {
    console.log("error caught");
    return res.status(500).send(error.message);
  }

  let rpnTokens = [];
  let result = -1;

  try {
    rpnTokens = shunt(infixTokens);
    result = calculate(rpnTokens);
  } catch (error) {
    return res.status(500).send(error.message);
  }

  let rpnFormula = rpnTokens.join("   ");

  serverResult = rpnFormula + "," + result;
  res.json(serverResult);
});

// *************** // SHUNT
// implements the Shunting Yard Algorithm
// input: list of valid tokens
// output: list of tokens in Reverse Polish Notation
function shunt(tokens) {
  stack = new Stack();
  var output = [];

  for (let i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (isOperator(token)) {
      while (
        !stack.isEmpty() &&
        precedenceLevel(token) <= precedenceLevel(stack.peek())
      ) {
        if (precedenceLevel(token) > precedenceLevel(stack.peek())) {
          stack.push(token);
        } else {
          output.push(stack.pop());
        }
      }
      stack.push(token);
    } else if (isLeftParen(token)) {
      stack.push(token);
    } else if (isRightParen(token)) {
      //not working for some reason.
      while (!isLeftParen(stack.peek())) {
        output.push(stack.pop());
      }
      stack.pop();
    } else if (isNumeric(token)) {
      output.push(token);
    }
  }

  while (!stack.isEmpty()) {
    //add !stack.isEmpty() condition here
    output.push(stack.pop());
  }

  return output;
}

//takes list of RPN tokens as input, outputs result
function calculate(tokens) {
  var x, y;
  stack = new Stack();

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (isNumeric(token)) {
      stack.push(token);
    } else {
      y = parseFloat(stack.pop());
      x = parseFloat(stack.pop());
      switch (token) {
        case "+":
          stack.push(x + y);
          break;
        case "-":
          stack.push(x - y);
          break;
        case "*":
          stack.push(x * y);
          break;
        case "/":
          stack.push(x / y);
          break;
        case "^":
          stack.push(Math.pow(x, y));
      }
    }
  }

  ans = stack.pop();
  if (Number.isInteger(ans)) {
    return ans;
  }

  return ans.toFixed(3);
}

//************************/ PARSE FUNCTION
// input: string
// output: list of tokens
function parse(expression) {
  //parses a given Math expression in infix notation into individual tokens

  var tokens = [];
  var numberBuilder = "";
  let stack = new Stack(); // stack used to validate parentheses
  expression.replace(/\s/g, "");

  for (var i = 0; i < expression.length; i++) {
    var givenChar = expression.substring(i, i + 1);

    if (isNumeric(givenChar) || givenChar == ".") {
      //if given character is a numeric operand OR a decimal point
      numberBuilder += givenChar;
    } else if (
      givenChar == "-" &&
      prevCharExists(expression, i) &&
      isLeftParen(expression.substring(i - 1, i))
    ) {
      numberBuilder += givenChar;
    } else if (isLeftParen(givenChar)) {
      if (numberBuilder.length > 0) {
        tokens.push(numberBuilder);
        numberBuilder = "";
      }

      // TODO: need to test if this works! (implicit multiplication)
      /*if (prevCharExists(tokens)){
              var prevChar = tokens.get(tokens.length - 1);
              if (isNumeric(prevChar) || isRightParen(prevChar)){
                  tokens.push("*");
              }
          }*/
      tokens.push(givenChar);
      stack.push(givenChar);
    } else if (isRightParen(givenChar)) {
      try {
        stack.pop();
      } catch (error) {
        //console.log('hit');
        //console.log('givenChar= ', givenChar);
        throw new ParenthesesError("ParenthesesError," + givenChar);
      }
      if (numberBuilder.length > 0) {
        tokens.push(numberBuilder);
        numberBuilder = "";
      }
      tokens.push(givenChar);

      // TODO: need to test if this works! (implicit multiplication)
      //determines if there is a character after this one.
      /*if (!expression.endsWith(givenChar)){
              var nextChar = expression.substring(i+1, i+2)
              if (isNumeric(nextChar) || isLeftParen(nextChar)){
                  tokens.push("*");
              }
          }*/
    } else if (isOperator(givenChar)) {
      /*if (numberBuilder.length > 0 || (prevCharExists(token, i) && !isOperator(tokens[tokens.length - 1]))){
            
            if (numberBuilder.length > 0){
              tokens.push(numberBuilder);
              numberBuilder = "";
            }
              
            
            tokens.push(givenChar);
          } else{
            console.log('error');
            throw new DoubleOperatorError("DoubleOperator," + givenChar);
          }*/

      if (numberBuilder.length > 0) {
        tokens.push(numberBuilder);
        numberBuilder = "";
      }

      tokens.push(givenChar);
      console.log("tokens = ", tokens);
    } else {
      throw new UnknownTokenError("UnknownToken," + givenChar);
    }
  }

  if (numberBuilder != "") {
    tokens.push(numberBuilder);
  }

  if (stack.size() > 0) {
    throw new ParenthesesError("Parentheseserror," + stack.peek());
  }

  if (isOperator(tokens[tokens.length - 1])) {
    console.log("hit!!!");
    throw new DoubleOperatorError("DoubleOperator", +givenChar);
  }

  return tokens;
}

//************************/ HELPER FUNCTIONS

function prevCharExists(expression, i) {
  var prevCharExists = true;
  try {
    var prevChar = expression.charAt(i - 1);
  } catch (error) {
    prevCharExists = false;
  }
  return prevCharExists;
}

function nextCharExists(expression, i) {
  var nextCharExists = true;
  try {
    var nextChar = expression.charAt(i + 1);
  } catch (error) {
    nextCharExists = false;
  }
  return nextCharExists;
}

function isOperator(token) {
  var operators = ["+", "-", "/", "*", "^"];
  return operators.includes(token);
}

function isNumeric(token) {
  return !isNaN(token);
}

function isLeftParen(token) {
  return token == "(";
}

function isRightParen(token) {
  return token == ")";
}

function precedenceLevel(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 0;
    case "*":
    case "/":
      return 1;
    case "^":
      return 2;
  }
}

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
