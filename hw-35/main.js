Array.prototype.iter = function(f) {
  return this.map(x => {
    f(x);
    return x;
  });
};


// console.log(State.map (x => 1) (State.from("ab")));

// [
//   State.map (x => 1),
//   chain (map(x => x + 1) (identity)) (map(x => 1) (identity)) 
// ]
//   .map(p => parse (p) ("ab"))
//   .iter(r => console.log(r))
//   .iter(r => console.log(r.toString()));


// console.log( state$ap(Success.of(x => x * 2)) (Success.of(2)));
const parser =
  // map 
    // (r => r.toUpperCase())
    // (many (char("a")))
    // (any (str ("ab"), str ("ac")))
    // charseq(char("a"), char("b"))
    math
;

// console.log(parser);

[
  "", 
  "ab",
  "sin(pi/(1*2+1*4))", 
  "10", 
  "-10", 
  "10.23", 
  "10+-10.23", 
  "e", 
  "pi-10", 
  "10+(11.2-e)", 
  "10*11.2/e", 
  "(10+11.2)*e", 
  "10*11.2-e",
  "sin(-10+2)"
]
  .map(parse(parser))
  .iter(r => {
    console.log(r);
  })
  .iter(r => {
    console.log(r.toString());
  })
  // .iter(r => {
  //   if (r.isSuccess)
  //     console.log(simplify(r.value));
  // })
  ;


window.addEventListener("load", () => {
  const answer = $("div");
  const steps = $("ol");
  const input = $("input", {
    oninput: handleInput(answer, steps),
  });

  document.body.append(input, answer, steps);
});

const handleInput = (answer, steps) => (e) => {
  const input = e.target.value;

  const result = parse (math) (input);
  console.log(result.value);

  result.match(
    e => {
      answer.innerHTML = e;
      steps.innerHTML =  "";
    },
    tree => {
      answer.innerHTML = solve(tree);
      steps.innerHTML = "";
      steps.append(...solveSteps(tree)[1].map(s => $("li", {}, s)));
    }
  )

};