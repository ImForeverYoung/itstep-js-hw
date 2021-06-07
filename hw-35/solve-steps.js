const show$constants = {
  "e": "e",
  "pi": "π", 
}

const show$operations = {
  "+": (r, a, b) => a + " + " + b + " = " + r,
  "-": (r, a, b) => a + " - " + b + " = " + r,
  "*": (r, a, b) => a + " * " + b + " = " + r,
  "/": (r, a, b) => a + " / " + b + " = " + r,
}

// const show$functions  = {
//   "sin": Math.sin,
// }

const solveSteps = ({ type, value, nodes }) => {
  switch (type) {
    case "number":
      return [
        eval$constants[value] || value, 
         undefined
      ];
    
    case "op": {
      const args = nodes.map(solveSteps);
      const values = args.map(xs => xs[0]);
      const result = eval$operations[value](...values);
      
      return [
        result,
        [
          ...args.map(xs => xs[1]).filter(x => x).flat(Infinity),
          show$operations[value](result, ...values)
        ]
      ];
    }

    case "func": { 
      const args = nodes.map(solveSteps);
      const values = args.map(xs => xs[0]);
      const result = eval$functions[value](...values);
       
      return [
        result,
        [
          ...args.map(xs => xs[1]).filter(x => x).flat(Infinity),
          value + "(" + values.join(", ") + ") = " + result
        ]
      ];
    }
  }
}