class Token {
  type
  value
  nodes

  constructor(type, value, ...nodes) {
    this.type = type;
    this.value = value;
    this.nodes = nodes;
  }

  toString() {

    return this.type 
         + ":" + this.value 
         + (this.nodes.length > 0 
           ? "[" + this.nodes +"]"
           : "");
  }
}

const tNumber = name => 
  map (v => new Token("number", v));

const _operation = xs => {
  if (xs.length === 3) {
    return new Token("op", xs[1], xs[0], xs[2]);
  } else {
    return new Token("op", xs[xs.length - 2], _operation(xs.slice(0, -2)),  xs[xs.length - 1]);
  }
}

// 1 * 2 * 3




const tOperations = name =>
  map (_operation);

const tFunction = name =>
  map (([name, args]) => new Token("func", name, ...args));



const _digits = "0123456789";
const isDigit = c => _digits.includes(c);

const digits = charManyOne(fchar(isDigit)); // \d+
const optionalSign = charOptional(char("-")); // -?
const signedDigits = charSeq(optionalSign, digits); // -?\d+

const mapToNumber = map (Number);

const natural = mapToNumber (digits);

const integer = mapToNumber (signedDigits);

const rational = mapToNumber (charSeq(signedDigits, charOptional(charSeq(char("."), digits)))) // -?\d+(\.\d+)?

const eulers  = charSeq(optionalSign, charCi("E")); 
const pi  = charSeq(optionalSign, strCi("PI")); 

const real = tNumber("число") (any(rational, eulers, pi));



const plus = char("+");
const minus = char("-");
const multiply = char("*");
const divide = char("/");

const funcArg = lazy(() => any(expression));
const func = tFunction() (
  seq(
    any (str ("sin")), 
    between 
      (char("(")) (char(")")) 
      (sepByN (1) 
              (char(",")) 
              (funcArg))));


const factor = lazy(() => any (func, real, bracketed));
  const product = tOperations("Произведение") (gluedBy (any (multiply, divide)) (factor)); 
// const product = seq(factor, multiply, factor).label("Произведение");

const term = lazy(() => any(func, product, real, bracketed)); //lazy (() => any(real));
const sum = tOperations ("Сумма") (gluedBy (any(plus, minus)) (term));

const expression = any(func, sum, product, real) ;
const bracketed = between (char("(")) (char(")")) (expression);

const math = map (v => v[0]) (seq (any(expression, bracketed), eoi)); // $




