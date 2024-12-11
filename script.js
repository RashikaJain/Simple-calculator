let buttons = document.querySelectorAll(".button");
let screen = document.querySelector(".screen");
let operand = document.querySelector(".operand");
let final = document.querySelector(".result");

window.addEventListener("keydown" ,(ev)=>
{
    let keyWord ;
    let input = document.querySelector(`div[data-size="${ev.key}"]`) ; 
    if(ev.key == "enter")
    {
        keyWord = enter ; 
    }
    else
    {
        keyWord = input.dataset.size;
    }
    calculateKeywords(keyWord) ;
})
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
    if(total!= "")
        {
            operand.innerHTML = total ; 
            final.innerHTML = "";
        }
    let ans = 0;
    operand.innerHTML = "";
    let finalValue = "";
    let operator = "";
    let previousValue = null;

    for (let value of total) {
        if (!isNaN(value) || value === "." || value === "-" && finalValue === "") {
            finalValue += value;
        } 
        else if (value === "+" && finalValue === "") {
            // Ignore leading "+"
            continue;
        }
        else {
            if(previousValue == null) {
                previousValue = parseFloat(finalValue);
                operator = value;
            }
            else{
                ans = finalanswer(previousValue, operator, finalValue);
                previousValue = ans;
            }
            finalValue = "";
        }
    }
    if (finalValue !== "") {
        ans = finalanswer(previousValue, operator, finalValue);
    }

    console.log(ans);
    final.textContent = ans;
    final.setAttribute("style" , "font-size : 35px ; color : black ; ")
    currentValue = ans.toString();
    total = ans.toString() ; 
    // Reset for the next calculation
}



function calculate() {
    let inputValue = this.dataset.size  ;
    final.setAttribute("style" , "font-size : 20px ; color : rgb(56, 55, 55) ; ")
    if(total!= "")
    {
        operand.innerHTML = total ; 
        final.innerHTML = "";
    }
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

    } else if (inputValue === "Enter") {
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

    else if (inputValue === "toggle") {
        if (currentValue) {
            if (currentValue.startsWith("-")) {
                // If it's negative, make it positive
                currentValue = currentValue.slice(1);
            } else {
                // If it's positive, make it negative
                currentValue = "-" + currentValue;
            }
            total = total.slice(0, -currentValue.length) + currentValue; // Update total
            final.innerHTML = currentValue;
        } else if (total === "") {
            // If no input yet, start with -0
            currentValue = "-";
            total = "-";
            final.innerHTML = currentValue;
        }
    }
    

}


function calculateKeywords(keyword) {
    let inputValue =  keyword ;
    final.setAttribute("style" , "font-size : 20px ; color : rgb(56, 55, 55) ; ")
    if(total!= "")
    {
        operand.innerHTML = total ; 
        final.innerHTML = "";
    }
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

    } else if (inputValue === "Enter") {
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

    else if (inputValue === "toggle") {
        if (currentValue) {
            if (currentValue.startsWith("-")) {
                // If it's negative, make it positive
                currentValue = currentValue.slice(1);
            } else {
                // If it's positive, make it negative
                currentValue = "-" + currentValue;
            }
            total = total.slice(0, -currentValue.length) + currentValue; // Update total
            final.innerHTML = currentValue;
        } else if (total === "") {
            // If no input yet, start with -0
            currentValue = "-";
            total = "-";
            final.innerHTML = currentValue;
        }
    }
    

}