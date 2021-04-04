/*const paddRight = (char, length) => s => {
  while(s.length < length) {
    s += char;
  }
  return s;
}
*/
// const paddRight = (char, length) => s => {
//   for (let i = 0; s.length < length; ++i) {
//     s = s + char;
//   }
//   return s;
// }

// const pad = paddRight("*", 10);

// let s = "abcde";

// console.log(pad(s), pad(s).length);
// console.log(pad("asdfsadf"), pad("asdfsadf").length);


// // Числа в обатном порядке

// let n = 10;

// for (let i = n; i >= 0; --i) {
//   console.log(i);
// }

// let i = n;
// while (i >= 0) {
//   console.log(i);
//   i--;
// }

// i = n;
// while (i >= 0){
//   console.log(i); 
//   i--;
// }





// let startYear = 1900;
// const n = 40; // endYear = 1940;

// const endYear = startYear + n;
// for (let year = startYear; year < endYear; year++) {
//   console.log(year + " " + isLeapYear(year));
// }

// console.log("----");

// for (let i = 0; i < n; i++) {
//   const year = startYear + i;
//   console.log(i + ") " + year + " " + isLeapYear(year));
// }

// console.log("----");

// let currentYear = startYear;
// for (let i = 0; i < n; i++) {
//   console.log(currentYear + " " + isLeapYear(currentYear));
//   currentYear++;
// }

// console.log(currentYear);


// console.log("----");

// 1900 - Не високосный
// 2000 - Високосный


// let leapYears = 0;

// let year = startYear;
// while (leapYears < 20) {
//   if (isLeapYear(year)){
//     leapYears++;
//     console.log(year);
//   }

//   year++;
// }

// for (let year = startYear, leapYears = 0; leapYears < 20; year++) {
//   if (isLeapYear(year)){
//     leapYears++;
//     console.log(year);
//   }
// }





// for (let year = startYear; year < endYear; year++) {
//   if (isLeapYear(year)) {
//     console.log(year);
//   }
// }

// Вывести первые n високосных лет начиная с startYear
/*let n = 123123;
let sum = 0;
while (n!=0)
{
        sum += n%10;
        n = Math.trunk(n/ 10);
}
console.log(sum);
*/

let words = ["Победи", "себя", "и", "выиграешь", "тысячи", "битв"];

// **********
// * Победи *
// * себя   *
// * и      *
// **********

/*const frame = words => {
  let max = words[0].length;
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > max) {
            max = words[i].length;
        }
    }
  print("**");
  for(let i=0; i<max;i++){
    print("*");
  }
  print("**\n");
  
  let auxiliary;
  for (let i = 0; i < words.length; i++) {
    auxiliary = max - words[i].length;
    print("* ");
    print(words[i]);
    for(let j=0; j<auxiliary;j++){
      print(" ");
    }
    print(" *\n");
  }
  print("**");
  for(let i=0; i<max;i++){
    print("*");
  }
  print("**\n");

}*/
const analitics = {
  ChangeAnalitics: function(nApples){
    let auxiliaryArray = nApples.map(function(transaction){ if(transaction > 0){ return "Доход"; } else if(transaction < 0){ return "Расход"; } });
    return auxiliaryArray;
  },
  SumArray: function(array){
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    return array.reduce(reducer,0);
  },
  WordEnding: function(quantity,form1,form2,form3){
    if(quantity<0){ quantity*=-1; }  
    if(quantity>=100){    
      quantity %= 100;   
    }
    if(quantity >= 10 && quantity <=20){ return form3; }
    quantity %= 10; 
    if(quantity===1){ return form1; }
    else if(quantity > 1 && quantity < 5){ return form2; }
    else if((quantity >= 5 && quantity <= 9) || quantity === 0){ return form3; }
  }
}

const log = { 
  Balance: function(appleNumber) { 
    console.log("Ура мы накопили "+analitics.SumArray(appleNumber)+ " "+ analitics.WordEnding(analitics.SumArray(appleNumber),"яблоко","яблока","яблок"));
  }, 
  AllPositive: function(appleNumber){
    if(appleNumber.every(apple => apple > 0)){
    console.log("Все транзакции были положительные!");
    }
  },
  ZeroExist: function(appleNumber){
    if(appleNumber.some(apple => apple === 0)){
    console.log("Есть транзакции с нулевым значением!");
    }
  },
  IncomeSum: function(appleNumberP){
    console.log("Сумма доходов составила: "+analitics.SumArray(appleNumberP));
  },
  ConsumptionSum: function(appleNumberN){
    console.log("Сумма расходов составила: "+(analitics.SumArray(appleNumberN)*(-1)));
  },
  IncomeAvg: function(appleNumberP){
    console.log("Средний доход за 1 транзакцию: "+(analitics.SumArray(appleNumberP)/12));
  },
  ConsumptionAvg: function(appleNumberN){
    console.log("Средний расход за 1 транзакцию: "+((analitics.SumArray(appleNumberN)*(-1))/12));
  },
  DisplayNumber: function(quantity){
    console.log("В ящике " +quantity+ " "+ analitics.WordEnding(quantity,"яблоко","яблока","яблок"));
  },
  Border: function(){
    console.log("**********************************************");
  },
  DisplayStatus: function(quantity){
    if(quantity < 0){
      console.log("Кредитный ящик!");
    }
    else if(quantity > 0){
      console.log("Полный!");
    }
    else if(quantity === 0){
      console.log("Пустой!");
    }
  },
  DisplayChanges: function(auxiliary){
    if(auxiliary < 0){ console.log("Мы потеряли "+ (auxiliary*(-1)) +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок")); /*nSum+=(auxiliary*(-1));*/ }
    else if(auxiliary > 0) { console.log("Мы получили "+ auxiliary +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок")); /*pSum+=auxiliary;*/ }
    else{ console.log("Кол-во яблок не изменилось!"); }
  }
}

let nApples = [];
let min = -600;
let max = 600;
let auxiliary;
for(let i=0;i<10;i++){
auxiliary = min + Math.floor(Math.random() * (max - min));
nApples[i]= auxiliary;
log.Border();
log.DisplayStatus(nApples);
log.DisplayChanges(auxiliary);
log.DisplayNumber(analitics.SumArray(nApples));
log.Border();
console.log("\n\n");
}
let nApplesN = nApples.filter(apple => apple < 0); 
let nApplesP = nApples.filter(apple => apple > 0);
let aTransaction = analitics.ChangeAnalitics(nApples);
log.Balance(nApples);
log.AllPositive(nApples); 
log.ZeroExist(nApples); 
log.IncomeSum(nApplesP);
log.ConsumptionSum(nApplesN);
log.IncomeAvg(nApplesP);
log.ConsumptionAvg(nApplesN);



// дз 9 пункт 3
const multiMap = operations => array => 
  Object.entries(operations)
    .forEach(([name, operation]) => {
      const result = array.map(operation);
      console.log(name, result);
    });



/*function displayOperationArray(array,object1){
for (const [key, value] of Object.entries(object1)) {

  console.log(`${key}: ${array.map(elem=>object1.key(elem))}`);
}
}*/
//displayOperationArray(nApples,log);

window.addEventListener("load", function(){
  
})




function joinElem(array,between=""){ // дз 8
  let auxiliary1="";
  for(let i=0;i<array.length;i++){
    auxiliary1+=(array[i]);
    if(i!=array.length - 1){
      auxiliary1+=(between);
    }
  }
  return auxiliary1;
}
let arr = [1,2,3];
console.log(joinElem(arr,"&&"));












































const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));


const createArray = length => {
  let array = [];
  for (let i = 0; i < length; i++){
    array.push(i);
  }
  return array;
}

console.log(createArray(10));


const createRandomArray = (min, max, length) => {
  // let arr = [];
  // for (let i = 0; i < length; i++){
  //   arr.push(randomInt(min, max));
  // }
  // return arr;
};
