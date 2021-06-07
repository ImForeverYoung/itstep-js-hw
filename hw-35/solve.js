const eval$constants = {
  "e": Math.E,
  "pi": Math.PI, 
}

const eval$operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "^": (a, b) => a ^ b,
}

const eval$functions  = {
  "sin": Math.sin,
}

const solve = ({ type, value, nodes}) => {
  switch (type) {
    case "number":
      return eval$constants[value] || value;
    
    case "op": 
      return eval$operations[value](...nodes.map(solve));

    case "func": 
      return eval$functions[value](...nodes.map(solve));
  }
}
