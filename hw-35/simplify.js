const show$constants = {
  "e": "e",
  "pi": "π", 
}

const show$operations = {
  "+": (a, b) => "(" + a + " + " + b + ")",
  "-": (a, b) => "(" + a + " - " + b + ")",
  "/": (a, b) => "(" + a + " / " + b + ")",
  "*": (a, b) => "(" + a + " * " + b + ")",
}

// const show$functions  = {
//   "sin": Math.sin,
// }

const show$function = (name, args) => name + "(" + args.join(", ") + ")";

const show = ({ type, value, nodes }) => {
  switch (type) {
    case "number":
      return show$constants[value] || value;
    
    case "op": 
      return show$operations[value](...nodes.map(show));

    case "func": 
      return show$function(value, nodes.map(show));
  } 
}

// 2 * 1 + 1 * 2
// 2 + 1 * 2
// 2 + 2
// 4



const simplify = ({ type, value, nodes }) => {
  switch (type) {
    case "number":
      return [
        eval$constants[value] || value, 
        show$constants[value] || String(value)
      ];
    
    case "op": {
      const args = nodes.map(simplify);
      const values = args.map(xs => xs[0]);
      const steps = args.map(xs => xs[1]);
      const result = eval$operations[value](...values);
      
      return [
        result, 
        [
          show$operations[value](...values),
          result
        ]
      ];
    }

    case "func": { 
      const args = nodes.map(simplify);
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