// parser combinators


//
const equals = a => b => a === b;

const equalsCi = a => {
  a = a.toUpperCase();
  return b => a === b.toUpperCase();
}

const ar$join = xs => xs.join(""); 
const ar$flat =  xs => xs.flat(); 

// const compose = (...fs) =>    x => fs.reduceRight((r, f) => f(r), x);
const _ = f => g => (...x) => f(g(...x));

const formatError = ([tpl, ...xs]) => tpl.replace(/\$(\d+)/g, (_, i) => xs[i]);

// Parser :: Input -> Result v

class Input {
  source
  index

  get isEoI() {
    return this.index >= this.source.length;
  } 

  constructor(source, index) {
    this.source = source;
    this.index = index;
  }

  consume () {
    return [
      this.source[this.index], 
      new Input(this.source, this.index + 1)
    ];
  }

}


Input.from = source => new Input(source, 0);

class Result { }


class Success extends Result {
  state
  value

  constructor(state, value) {
    super();
    this.state = state;
    this.value = value;
  } 

  static of(value, state) {
    return new Success(state, value);
  }

  toString() {
    return "Success : " + this.value;
  }

  get isFailure() {
    return false;
  }
  
  
  get isSuccess() {
    return true;
  }

  match (_, f) {
    return f(this.value);
  }

  filter (predicate) {
    return predicate(this.value)
         ? this
         : Failure.of("Unexpexted " + this.value);
  }

  map (f) {
    return Success.of(f(this.value), this.state);
  }
}

class Failure extends Result {
  error

  constructor(error) {
    super();
    this.error = error;
  } 

  static of(...error) {
    return new Failure([error]);
  }

  toString() {
    return "Failure : " + this.error;
  }
  
  get isFailure() {
    return true;
  }
  
  get isSuccess() {
    return false;
  }

  match (f, _) {
    return f(this.error);
  }

  filter (predicate) {
    return this;
  }
  
  map (f) {
    return this;
  }
}

// parse :: string -> Result
const parse = parser => input => parser(Input.from(input));

const lazy = fparser => 
  input => fparser()(input); 

// filter :: (a -> bool) -> Parser a -> Parser a;
const filter = p => parser => 
  input => parser(input).filter(p);


// // bimap :: (ea -> eb) -> (a -> b) -> Parser a -> Parser b 
// const bimap = f  => g => parser => 
//   input => parser(input).bimap(f, g);

// map :: (a -> b) -> Parser a -> Parser b 
const map = f => parser => 
  input => parser(input).map(f);

// // map :: (ea -> eb) -> Parser a -> Parser a 
// const mapFail = f => parser => 
//   input => parser(input).mapFail(f);


// chain :: (a -> Parser b) -> Parser a -> Parser b
const chain = f => parser => 
  input => {
    const result = parser(input);

    if (result.isFailure) {
      return result;
    }

    return f (result.value) (result.state);
  };


// const label = l => parser =>
//   input => parser(input).mapFail(_ => ["Expecting ", l]);

const seq = (...parsers) =>
  input => {
    const results = [];

    for (const parser of parsers) {
      const result = parser(input);

      if (result.isFailure) {
        return result;
      } 
      
      results.push(result.value);
      input = result.state;
    }

    return Success.of(results, input);
  }

const any = (...parsers) => 
  input => {
    for (const parser of parsers) {
      const result = parser(input);

      if (result.isSuccess) {
        return result;
      }
    }

    return Failure.of("Sequence");
  }

const optional = alt => parser => 
  input => {
    const result = parser(input);
    return result.isFailure 
         ? Success.of(alt, input)
         : result;
  }

const many = parser => 
  input => {
    const results = [];

    while (true) {
      const result = parser(input);

      if (result.isFailure) {
        break;
      } 
      
      results.push(result.value);
      input = result.state;
    }

    return Success.of(results, input);
  }

const manyOne = 
  _ (chain 
      (v => input => v.length === 0 
                   ? Failure.of("Expected at least one") 
                   : Success.of(v, input))) 
    (many);

const sepBy = glue => parser => 
  optional ([]) 
    (map (([x, ...xs]) => [x, ...xs.flat().map(x => x[2])]) 
         (seq (parser, many (seq (glue, parser))))); 

const sepByN = n => glue => parser =>
  chain 
    (v => input => v.length < n
                 ? Failure.of("Expected at least " + n)
                 : Success.of(v, input))
    (sepBy (glue) (parser));

const gluedBy = glue => parser => 
   map (([x, ...xs]) => [x, ...xs.flat(2)])
       (seq (parser, manyOne (seq (glue, parser))));

const between = left => right => parser => 
  map (xs => xs[1]) 
      (seq(left, parser, right));


const eoi = 
  input => input.isEoI
         ? Success.of(undefined, input)
         : Failure.of("Expecting EOI");

const achar =
  input => input.isEoI 
         ? Failure.of("Unexpected EOI")
         : Success.of(...input.consume());

const fchar = p => filter (p) (achar);

const char = c => fchar (equals (c));

const charCi = c => fchar(equalsCi (c));

const mapArToStr = _ (map (ar$join)); 

const charSeq = mapArToStr (seq);

const str = str => charSeq(...Array.from(str).map(char));

const strCi = str => charSeq(...Array.from(str).map(charCi));

const charOptional = optional ();

const charMany = mapArToStr (many);

const charManyOne = mapArToStr (manyOne);

// const _3 = f => g => h => x => f(g(h(x)));


// const formatError = ([tpl, ...xs]) => tpl.replace(/\$(\d+)/g, (_, i) => xs[i]);
// const formatErrors = es => es.map(formatError).join("\n  ")


// const array$reduce = a0 => f => xs => 
//   xs.reduce((a, x) => f (x) (a), a0);

// // ---


// class Success extends Result {
//   value

//   get data() {
//     return {
//       input: this.input,
//       value: this.value,
//     };
//   }

//   constructor(source, input, index, value) {
//     super(source, input, index);
//     this.value = value;
//   } 

//   static of(value, index = 0) {
//     return new Success(null, null, index, value);
//   }

//   toString() {
//     return this.source + "\n  -> Success : " + this.index + " : " + this.value;
//   }
// }

// class Failure extends Result {
//   error

//   get data() {
//     return {
//       input: this.input,
//       error: this.error,
//     };
//   }

//   constructor(source, input, index, error) {
//     super(source, input, index);
//     this.error = error;
//   } 

//   static of(...error) {
//     return new Failure(null, null, null, [error]);
//   }

//   toString() {
//     return this.source + "\n  Failure : " + this.index + " : " + formatErrors(this.error);
//   }
// }

// Result.isSuccess = state => state instanceof Success;
// Result.isFailure = state => state instanceof Failure;

// Result.switch = f => g => state => {
//   switch(state.constructor) {
//     case Failure: return f(state);
//     case Success: return g(state);
//   }
// }

// Result.continue = Result.switch (identity);

// Result.succeed = (value, consumed = 0) => state =>
//   new Success(
//     state.source,
//     state.input.slice(consumed),
//     state.index + consumed, 
//     value, 
//   ); 

// Result.fail = error => state => {
//   console.log(state.error);
//   return new Failure(
//     state.source,
//     state.input,
//     state.index, 
//     Array.isArray(state.error) ? error.concat(state.error) : error 
//   );
// }
  
// Result.merge =
//   Result.switch
//     (state => Result.fail(state.error))
//     (state => Result.succeed(state.value, state.index));

// Result.bimap = f => g =>
//   Result.switch
//     (state => Result.fail    (f (state)) (state)) 
//     (state => Result.succeed (g (state)) (state))

// Result.map = Result.bimap (identity);

// Result.mapError = f => Result.bimap (f) (identity);


// Result.bichain = f => g => 
//   Result.switch
//     (state => Result.merge (f (state)) (state))
//     (state => Result.merge (g (state)) (state));

// Result.chain = Result.bichain (identity);

// Result.chainError = f => Result.bicahin (f) (identity);

// Result.ap = g => x =>
//   Result.chain (g => Result.map (g) (x)) (g);

// //---
// // type Parser :: State -> State

// const parse = parser => source => parser(Result.from(source));

// const chain = _2 (_2) (Result.chain);

// const bimap = f => g => parser =>
//   Result.continue
//     (_2 (Result.bimap (f) (g)) 
//         (parser));

// const map = bimap (identity);
// const mapFailure = f => bimap (f) (identity);


// //----

// const seq = (...ps) => 
//   Result.continue
//     (state => {
//       let v = [], 
//           s = state;

//       for (const p of ps) {
//         s = Result.continue (p) (s);
//         v.push(s.value);
//       }

//       return Result.switch 
//         (({ error }) => Result.fail ([["Expected sequence"], ...error]) (state))
//         (Result.map(() => v)) 
//         (s);
//     });

// const any = (...ps) => 
//   Result.continue
//     (state => {
//       for (const p of ps) {
//         let next = p (state);
//         if (Result.isSuccess (next)) {
//           return next;
//         } 
//       }

//       return Result.fail ([["Expected any of"]]) (state);
//     });

// const many = parser => 
//     Result.continue
//       (state => {
//         let v = [];
//         s = state;
//         last = state;
//         while (Result.isSuccess(s = Result.continue(parser) (s))) {
//           v.push(s.value);
//           last = s;
//         }

//         return Result.map(() => v) (last);
//       });

// //----

// const anyChar =
//   Result.chain
//     (({ input }) => 
//       input.length <= 0
//       ? Failure.of("Expecting some character but got EOI instead")
//       : Success.of(input.charAt(0), 1));

// const char = c =>
//   chain
//     (Result.bichain
//       (() => Failure.of("Expecting '$0' but got EOI instead", c))
//       (({ value }) => 
//           value !== c.charAt(0)
//           ? Failure.of("Expecting '$0' but got '$1' instead", c, value)
//           : Success.of(value, 0)))
//     (anyChar);

// // State.chain
//   //   (({ input }) => 
//   //     input.length <= 0
//   //     ? Failure.of("Expecting '$0' but got EOI instead", c)
//   //     : input.charAt(0) !== c.charAt(0)
//   //       ? Failure.of("Expection '$0' but got '$1' instead", c, input.charAt(0))
//   //       : Success.of(c, 1)
//   //   );


// const str = str => 
//   bimap
//     ((error, input) => {
//       error[0] = ["Expecting '$0' but got '$1'", str, input.slice(0, str.length)]; 
//       return error;
//     })
//     (value => value.join(''))
//     (Result.continue
//       (seq (...str.split('').map(char))));


// //----