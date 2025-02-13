import React, { useState } from "react";
import { evaluate, factorial } from "mathjs"; // Import factorial function from mathjs
import "./App.css";

function App() {
  const [value, setValue] = useState("");

  // Function to calculate factorial manually
  const factorialCustom = (num) => {
    if (num < 0) return "ERROR"; // factorial is not defined for negative numbers.
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  const handleClick = (val) => {
    if (val === "AC") {
      setValue("");
    } else if (val === "DE") {
      setValue(value.slice(0, -1));
    } else if (val === "=") {
      try {
        setValue(String(evaluate(value))); // Calculate the equation
      } catch {
        setValue("ERROR");
      }
    } else if (val === "!") {
      try {
        const num = parseInt(value, 10);
        if (!isNaN(num)) {
          setValue(String(factorialCustom(num))); // Calculate the factorial
        } else {
          setValue("ERROR");
        }
      } catch {
        setValue("ERROR");
      }
    } else {
      setValue(value + val);
    }
  };

  const buttons = [
    ["AC", "DE", "(", ")", "/"],
    ["7", "8", "9", "sin", "cos"],
    ["4", "5", "6", "tan", "log"],
    ["1", "2", "3", "√", "^"],
    ["0", ".", "x²", "!", "="], // Add factorial button(!)

  ];

  return (
    <div className="container">
      <h1 className="title">scientific calculator</h1>
      <div className="calculator">
        <div className="display">
          <input type="text" value={value} className="inputResult" readOnly />
        </div>
        {buttons.map((row, i) => (
          <div key={i}>
            {row.map((btn, j) => (
              <button
                key={j}
                className={
                  !isNaN(btn) ? "number" : btn === "=" ? "equal" : "operator"
                }
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
