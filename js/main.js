const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

function safeEval(expr) {
    expr = expr.replace(/%/g, "/100");
    try {
        return Function(`"use strict";return (${expr})`)();
    } catch {
        return "Error";
    }
}

function calculate(btnValue) {
    switch (btnValue) {
        case "=":
            if (output !== "") output = safeEval(output).toString();
            break;
        case "AC":
            output = "";
            break;
        case "DEL":
            output = output.slice(0, -1);
            break;
        default:
            if (output === "" && specialChars.includes(btnValue)) return;
            output += btnValue;
    }
    display.value = output;
}

buttons.forEach(button =>
    button.addEventListener("click", e => calculate(e.target.dataset.value))
);

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", "%", "."].includes(key)) {
        calculate(key);
    } else if (key === "Enter" || key === "=") {
        calculate("=");
    } else if (key === "Backspace") {
        calculate("DEL");
    } else if (key.toLowerCase() === "c") {
        calculate("AC");
    }
});