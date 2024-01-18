let displayValue = "";
let operator = "";
let firstOperand = null;
let cursorVisible = true;

function handleButtonClick(event) {
    const buttonValue = event.target.value;

    // Toggle cursor visibility
    cursorVisible = true;

    if (!isNaN(buttonValue) || buttonValue === ".") {
        //number or decimal point clicked
        handleNumberClick(buttonValue);
    } else if (buttonValue === "C") {
        //C button is clicked
        clearDisplay();
    } else if (buttonValue === "=") {
        //= button is clicked
        calculateResult();
        cursorVisible = false; 
    } else if (buttonValue === "Delete") {
        eraseChar();
    } else {
        // If an operator is clicked
        handleOperatorClick(buttonValue);
    }

    updateDisplay();
}

function handleNumberClick(value) {
    if (displayValue === "Error") {
        clearDisplay();
    }

    if (operator && displayValue === firstOperand) {
        displayValue = "";
    }

    // Append the clicked number or decimal point to the display
    if (displayValue === "" || displayValue === "0") {
        displayValue = value;
    } else {
        displayValue += value;
    }
}

function handleOperatorClick(value) {
    if (firstOperand !== null && displayValue !== "") {
        displayValue = `${firstOperand} ${value} `;
    }

    // Update the operator and firstOperand variables
    operator = value;
    firstOperand = displayValue;
    cursorVisible = true; // Show cursor after entering an operator
}

function calculateResult() {
    // Checking if the second operand is a valid number
    if (operator && displayValue !== "") {
        const secondOperand = parseFloat(displayValue);

        if (!isNaN(secondOperand)) {
            switch (operator) {
                case "+":
                    displayValue = (parseFloat(firstOperand) + secondOperand).toString();
                    break;
                case "-":
                    displayValue = (parseFloat(firstOperand) - secondOperand).toString();
                    break;
                case "*":
                    displayValue = (parseFloat(firstOperand) * secondOperand).toString();
                    break;
                case "/":
                    if (secondOperand !== 0) {
                        displayValue = (parseFloat(firstOperand) / secondOperand).toString();
                    } else {
                        displayValue = "Error";
                        return;
                    }
                    break;
                case "%":
                    displayValue = (parseFloat(firstOperand) % secondOperand).toString();
                    break;
            }

            operator = "";
            firstOperand = null;
        } else {
            displayValue = "Error";
        }
    }
}
// Function to erase the last character in the display : DEL button
function eraseChar() {
    if (displayValue !== "Error") {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === "") {
            displayValue = "0";
        }
    }
}

// Function to clear the entire display and reset calculator state //C button
function clearDisplay() {
    displayValue = "";
    operator = "";
    firstOperand = null;
    cursorVisible = true; // Show cursor after clearing
}

// Function to update the display and cursor visibility
function updateDisplay() {
    const displayElement = document.getElementById("display");
    const cursorElement = document.getElementById("cursor");

    // Updation of the text content of the display element
    displayElement.textContent = displayValue;

    // Toggle cursor visibility
    cursorElement.style.visibility = cursorVisible ? "visible" : "hidden";
    cursorVisible = !cursorVisible; // Toggle visibility for blinking effect
}
