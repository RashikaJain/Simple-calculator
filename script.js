let buttons = document.querySelectorAll(".button");
let screen = document.querySelector(".screen");
let operand = document.querySelector(".operand");
let final = document.querySelector(".result");

buttons.forEach((value) => value.addEventListener("click", calculate));

let currentValue = "";
let previousValue = "";
let operator = "";
let total = ""; // To store the expression as a string
let toggleButton = true ; 

function finalanswer(prev, operator, curr) {
    let result = 0;
    switch (operator) {
        case "+":
            result = prev + Number(curr);
            break;
        case "-":
            result = prev - Number(curr);
            break;
        case "*":
            result = prev * Number(curr);
            break;
        case "/":
            if (curr == 0) {
                return "INFINITY ERROR";
            }
            result = prev / Number(curr);
            break;
        case "%":
            result = prev % Number(curr);
            break;
        default:
            return "Error";
    }
    return result;
}

function solveEnter() {
    let ans = 0;
    operand.innerHTML = "";
    let finalValue = "";
    let operator = "";
    let previousValue = 0;

    for (let value of total) {
        if (!isNaN(value) || value === ".") {
            finalValue += value;
        } else {
            if (previousValue === 0) {
                previousValue = parseFloat(finalValue);
                operator = value;
                finalValue = "";
            } else {
                ans = finalanswer(previousValue, operator, finalValue);
                previousValue = ans;
                finalValue = "";
            }
        }
    }
    if (finalValue !== "") {
        ans = finalanswer(previousValue, operator, finalValue);
    }

    console.log(ans);
    final.textContent = ans;
    currentValue = ans.toString();
    total = ""; // Reset for the next calculation
}

function calculate() {
    let inputValue = this.dataset.size;

    if (!isNaN(inputValue) || inputValue === ".") {
        currentValue += inputValue;
        total += inputValue;
        final.textContent = currentValue;
    } else if (["+", "-", "*", "/", "%"].includes(inputValue)) {
        if (currentValue !== "") {
            previousValue = Number(currentValue);
            currentValue = "";
        }
        operator = inputValue;
        total += inputValue;
        operand.innerHTML = total;
        final.innerHTML = "";
    } else if (inputValue === "enter") {
        solveEnter();
    }

    else if (inputValue == "all-clear")
    {
        currentValue = "" ; 
        total = "" ; 
        operator = "" ; 
        final.innerHTML = "" ; 
        operand.innerHTML = "" ; 

    }
    else if (inputValue === "clear") {
        if (currentValue.length > 0) {
            currentValue = currentValue.slice(0, -1); 
            total = total.slice(0, -1);            
            final.textContent = currentValue;      
        } else if (total.length > 0) {
            total = total.slice(0, -1);            // Remove last character from total
            operand.innerHTML = total; 
        }  
    }
}
