/*
- Не зависим от формы
- Повторное исопльзовние кода 

- Валидация "на ходу"
  - Две версии (focus или нет)

- Одна ошибка на поле 

- Валидация + трансформация
  1. Трансформация только когда теряем фокус
  2. Прямо по мере ввода
*/

// validator :: (State) -> State


const identity = x => x;

// Sum Type
class Result {
  input

  constructor(input) {
    this.input = input;
  }
}
class Success extends Result {
  serialized
  value

  constructor(input, value, serialized) {
    super(input);
    this.value = value;
    this.serialized = serialized;
  }
}
class Failure extends Result {
  level
  error

  constructor(input, error, level) {
    super(input);
    this.error = error;
    this.level = level;
  }
}
Result.from = input => 
  new Success(input, input, input);



Result.switch = f => g => state => {
  switch (state.constructor) {
    case Failure: return f(state);
    case Success: return g(state);
  }
}

Result.merge = a => b => 
  Result.switch
    (state => new Failure(b.input, state.error, state.level))
    (state => new Success(b.input, state.value, state.serialized))
    (a)

Result.continue = Result.switch (identity);

Result.bichain = f => g => 
  Result.switch
    (state => Result.merge (f(state.error)) (state))
    (state => Result.merge (g(state.value)) (state));

Result.chain = g =>
  Result.continue 
    (state => Result.merge (g(state.value)) (state));

Result.map = g =>
  Result.continue 
    (state => Result.merge (Success.of(g(state.value))) (state));
  
Result.mapError = f =>
  Result.switch 
    (state => Result.merge (Failure.of(f(state.error))) (state))
    (identity);
  




Success.of = (value, serialized) => 
  new Success(null, value, serialized || value);

// ErrorLevel : CHANGE
// ErrorLevel : INPUT



Failure.LEVEL_CHANGE = 0;
Failure.LEVEL_INPUT = 1;


Failure.of = (error, level) => 
  new Failure(null, error, typeof level === "undefined" ? Failure.LEVEL_INPUT : level);

const validate = validator => input => 
  validator(Result.from(input));

const chain = (...validators) => 
  Result.continue 
    (initialState => 
      validators.reduce(
        (state, validator) => 
          Result.continue(Result.merge (validator(state))) (state), 
        initialState))

const any = (...validators) => 
  Result.continue 
    (initialState => {
      let state = null;
      // let errors = [];
      return validators.find(validator => {
              state = validator(initialState);
              return state instanceof Success;
            }) 
            ? Result.merge (state) (initialState)
            : Result.merge (Failure.of("Ошибка")) (initialState);
    });

const map = f => validator =>
  Result.continue
    (state => Result.map(f) (validator(state)));

const mapError = f => validator =>
  Result.continue
    (state => Result.mapError(f) (validator(state)));
  
////

const required =  
  Result.chain
    (value => (value === 0 || (value && (!Array.isArray(value) || value.length > 0))) 
            ? Success.of(value) 
            : Failure.of("Обязательное поле"));
const bigger = 
    Result.chain
    (value => {
        let date = document.getElementsByClassName("input")[2].value;
        let value1 = date.match(/\-/g)? date.split('-'):date.split('.');
        value1.map(d=>Number(d));
        
        const d = new Date(value1[2],value1[1]-1,value1[0]);
        const d1 = new Date(value);
        //console.log(date);
        return isNaN(d.getTime())
        ? Failure.of("Не корректная дата отправления") 
        : (value.getTime()>d.getTime()
          ? Success.of(d1,d1.toLocaleDateString())
          : Failure.of("Дата обратного полета раньше даты отправления"));});

const length = maxLength => minLength => 
  Result.chain
    (value => (value.length < minLength && value !== "")
            ? Failure.of(`Длина должна быть не меньше ${minLength}`)
            : value.length > maxLength
              ? Failure.of(`Длина должна быть не больше ${maxLength}`)
              : Success.of(value));

const minLength = length (Number.MAX_VALUE);
const maxLength = maxLength => length (maxLength) (0);


const num = 
  Result.chain
    (value => {
      if (value === "") {
        return Success.of(value);
      }

      const n = Number(value);

      return (isNaN(n) || String(n) !== value)
           ? Failure.of("Значение должно быть числом")
           : Success.of(n, value)
    });

const int = 
  chain(
    num, 
    Result.chain
      (n => (String(parseInt(n)) !== String(n))
          ? Failure.of("Значение должно быть целым числом")
          : Success.of(n, String(n))) 
  );

// Предполагаем, что value это число
const range = max => min => 
  Result.chain
    (n => n === ""
        ? Success.of(n)
        :  n < min
          ? Failure.of(`Значение должно быть больше ${min}`)
          : n > max
            ? Failure.of(`Значение должно быть меньше ${max}`)
            : Success.of(n, String(n)));

const min = range (Number.MAX_VALUE);
const max = max => range (max) (0);


const reMultiWs = /\s{2,}/g;

const stripWS =
  Result.chain
    (value => Success.of(
      value.trim(" ").replace(reMultiWs, " ")
    ));


const date = 
  Result.chain
    (value => {
      // if (value === "") {
      //   return Success.of(value);
      // }
      // Добавить собственный парсер даты


      // govno solution

      // const year = value.match(/[.,-:]\d{4}/g);
      // const month = Number(value.match(/[.,-:]\d{1,2}[.,-:]/g))-1;
      // let day = toString(value.match(/^\d{1,2}[.,-:]/g));
      // day = Number(day.slice(0, -1));
      // console.log(`${year} ${month} ${day}`);


      // norm solution
      let date = value.match(/\-/g)? value.split('-'):value.split('.');
      date.map(d=>Number(d));
      //console.log(date[0]);
      const d = new Date(date[2],date[1]-1,date[0]);
      //console.log(d);
      return isNaN(d.getTime()) 
           ? Failure.of(`Значение должно быть датой`)
           : Success.of(d, d.toLocaleDateString());
    });

// const files = (type, size) => 
//   Result.chain
//     (files => {
//       if (files.length === 0) {
//         return Success.of(files);
//       }

//       return files.some(file => file.type.search(type) < 0)
//             ? Failure.of(`Файлы должны быть типа ${type}`)
//             : files.some(file => file.size > size)
//               ? Failure.of(`Файлы не должны превышать ${size} байт`)
//               : Success.of(files);
//     }); 

// const filesType = type => files(type, Number.MAX_VALUE);
// const filesSize = size => files("", size);


const re = re =>
  Result.chain 
    (value => {
      if (value === "") {
        return Success.of(value);
      }

      return !re.test(value) 
           ? Failure.of(`Значение должно быть в формате ${re}`)
           : Success.of(value);
    });


const email = re(/^.+@.+$/);

// rangeDate
// arrayLength
// phone
// ИИН


// Проверка, которая зависит от значения другого поля
// const depend = (form, key, predicate)

  // Контроль других атрибутов полей: disabled, отображается или нет
  
  // Списки полей 