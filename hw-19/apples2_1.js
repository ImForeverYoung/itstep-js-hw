

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
    Balance: function(appleNumber,displayHTML=0) { 
      let string = ("Ура мы накопили "+analitics.SumArray(appleNumber)+ " "+ analitics.WordEnding(analitics.SumArray(appleNumber),"яблоко","яблока","яблок"));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    }, 
    AllPositive: function(appleNumber,displayHTML=0){
      let string ="Все транзакции были положительные!";
      if(appleNumber.every(apple => apple > 0)){
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
      }
    },
    ZeroExist: function(appleNumber,displayHTML=0){
      let string = ("Есть транзакции с нулевым значением!");
      if(appleNumber.some(apple => apple === 0)){
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
      }
    },
    IncomeSum: function(appleNumberP,displayHTML=0){
      let string = ("Сумма доходов составила: "+analitics.SumArray(appleNumberP));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    ConsumptionSum: function(appleNumberN,displayHTML=0){
      let string = ("Сумма расходов составила: "+(analitics.SumArray(appleNumberN)*(-1)));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    IncomeAvg: function(appleNumberP,displayHTML=0){
      let string = ("Средний доход за 1 транзакцию: "+(analitics.SumArray(appleNumberP)/12));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    ConsumptionAvg: function(appleNumberN,displayHTML=0){
      let string = ("Средний расход за 1 транзакцию: "+((analitics.SumArray(appleNumberN)*(-1))/12));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    DisplayNumber: function(quantity,displayHTML=0){
      let string = ("В ящике " +quantity+ " "+ analitics.WordEnding(quantity,"яблоко","яблока","яблок"));
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    Border: function(displayHTML=0){
      let string = ("**********************************************");
      console.log(string);
      if(displayHTML==1){
        return (string);
      }
    },
    DisplayStatus: function(quantity,displayHTML=0){
      if(quantity < 0){
        let string = ("Кредитный ящик!");  
        console.log(string);   
        if(displayHTML==1) {
          return string;
        }
      }
      else if(quantity > 0){
        let string = ("Полный!");
        console.log(string);
        if(displayHTML==1) {
          return string;
        }
      }
      else if(quantity === 0){
        let string = ("Пустой!");
        console.log(string);
        if(displayHTML==1) {
          return string;
        }
      }
    },
    DisplayChanges: function(auxiliary,displayHTML=0){
      if(auxiliary < 0){ let string = ("Мы потеряли "+ (auxiliary*(-1)) +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок")); console.log(string); if(displayHTML==1){ return (string); } }
      else if(auxiliary > 0) { let string = ("Мы получили "+ auxiliary +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок")); console.log(string); if(displayHTML==1){ return (string); } }
      else{ let string = ("Кол-во яблок не изменилось!"); console.log(string); if(displayHTML==1){ return (string); } }
    }
  }



class Box { // analitics.SumArray(appleNumber)     можно заменить на     box.amount
    amount;
    forms=[];
    constructor(forms=[], amount = 0) {
      this.amount = amount;
      this.forms=forms;    
    }
    getQuantityString(quantity){
      return (quantity+ " " + analitics.WordEnding(quantity, this.forms));
    }
    changeAmount(transaction) {
      this.amount += transaction;
    }
    
} 


window.addEventListener("load", () => {
  const container = $("div",{ className: "container"});
  const list = $("ul",{className: "list",name: "list"});
  const button = $("button",{className: "addButton"});
  document.body.append(container);
  container.append(list);
  container.append(button);
  let box = new Box(["яблоко","яблока","яблок"]);
  
  
  let nApples = [];
  let min = -600;
  let max = 600;
  let auxiliary;
  console.log(list);
  let i=1;
  button.addEventListener("click", () => {
    console.log("Нажали");
    auxiliary = min + Math.floor(Math.random() * (max - min)); // случайное число в диапозоне от -600 до 600 для изменения кол-ва яблок
  nApples[i]= auxiliary; // сохранение значения каждой транзакции в массиве
  box.changeAmount(auxiliary); // накапливание в объекте класса
  log.Border(); // элемент дизайна
  
     
  
  
  
  log.DisplayStatus(nApples); // логирование статуса ящика с яблоками
  log.DisplayChanges(auxiliary); // логирование значения транзакции
  log.DisplayNumber(analitics.SumArray(nApples)/* box.amount */); // логирование общего кол-ва яблок после транзакции
  log.Border(); // элемент дизайна х2
  console.log("\n\n");
  let li = $("li",{className:"list_child"});
  li.innerHTML= "Транзакция №-" + (i) + "" + "<br>" + log.DisplayChanges(auxiliary,1) + "<br>" + log.DisplayNumber(analitics.SumArray(nApples),1) + "<br>" + log.Border(1);
  li.className="list_child";
  list.append(li);
  if(i==10){
    let nApplesN = nApples.filter(apple => apple < 0); // транзакции меньше нуля
    let nApplesP = nApples.filter(apple => apple > 0); // транзакции больше нуля
    let aTransaction = analitics.ChangeAnalitics(nApples); // массив строк "Доход", "Расход"
    log.Balance(nApples); // логирование окончательного кол-ва яблок
    log.AllPositive(nApples); // логирование в случае если все транзакции были положительные
    log.ZeroExist(nApples); // логирование в случае если была транзакция со значением 0
    log.IncomeSum(nApplesP); // логирование суммы дохода
    log.ConsumptionSum(nApplesN); // логирование суммы расхода
    log.IncomeAvg(nApplesP); // логирование среднего значения дохода
    log.ConsumptionAvg(nApplesN); // логирование среднего значения расхода
    let li = $("li",{className:"list_child"});
    li.innerHTML= "<br>" + "<br>" + log.Balance(nApples,1)+ "<br>" + log.IncomeSum(nApplesP,1)+ "<br>" + log.ConsumptionSum(nApplesN,1)+ "<br>" +log.IncomeAvg(nApplesP,1) + "<br>"+log.ConsumptionAvg(nApplesN,1);
    li.className="list_child red";
    list.append(li);
    button.style.display = "none";
    }
  i++;
  });
  
});
  