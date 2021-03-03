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



let nApples = 0;
let min = -600;
let max = 600;
let auxiliary,nSum=0,pSum=0;
for(let i=0;i<10;i++){
auxiliary = min + Math.floor(Math.random() * (max - min));
nApples += auxiliary;
border();
displayStatus(nApples);
if(auxiliary < 0){ console.log("Мы потеряли "+ (auxiliary*(-1)) +" " + wordEnding(auxiliary,"яблоко","яблока","яблок")); nSum+=(auxiliary*(-1)); }
else if(auxiliary > 0) { console.log("Мы получили "+ auxiliary +" " + wordEnding(auxiliary,"яблоко","яблока","яблок")); pSum+=auxiliary; }
else{ console.log("Кол-во яблок не изменилось!"); }
displayNumber(nApples);
border();
console.log("\n\n");
}
console.log("Ура мы накопили "+nApples+ " "+ wordEnding(nApples,"яблоко","яблока","яблок"));
console.log("Сумма доходов составила: "+pSum);
console.log("Сумма расходов составила: "+nSum);
console.log("Средний доход за 1 транзакцию: "+(pSum/12));
console.log("Средний расход за 1 транзакцию: "+(nSum/12));
function border(){
  console.log("**********************************************");
}
function displayStatus(quantity){
  if(quantity < 0){
    console.log("Кредитный ящик!");
  }
  else if(quantity > 0){
    console.log("Полный!");
  }
  else if(quantity === 0){
    console.log("Пустой!");
  }
}
function displayNumber(quantity){
  console.log("В ящике " +quantity+ " "+ wordEnding(quantity,"яблоко","яблока","яблок"));
}
function wordEnding(quantity,form1,form2,form3){
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
