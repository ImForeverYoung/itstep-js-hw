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
      if(auxiliary < 0){ console.log("Мы потеряли "+ (auxiliary*(-1)) +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок"));  }
      else if(auxiliary > 0) { console.log("Мы получили "+ auxiliary +" " + analitics.WordEnding(auxiliary,"яблоко","яблока","яблок"));  }
      else{ console.log("Кол-во яблок не изменилось!"); }
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
  
  
  let box = new Box(["яблоко","яблока","яблок"]);
  
  let nApples = [];
  let min = -600;
  let max = 600;
  let auxiliary;
  for(let i=0;i<10;i++){ // десять транзакций с изменением количества яблок
  auxiliary = min + Math.floor(Math.random() * (max - min)); // случайное число в диапозоне от -600 до 600 для изменения кол-ва яблок
  nApples[i]= auxiliary; // сохранение значения каждой транзакции в массиве
  box.changeAmount(auxiliary); // накапливание в объекте класса
  log.Border(); // элемент дизайна
  
  
  log.DisplayStatus(nApples); // логирование статуса ящика с яблоками
  log.DisplayChanges(auxiliary); // логирование значения транзакции
  log.DisplayNumber(analitics.SumArray(nApples)/* box.amount */); // логирование общего кол-ва яблок после транзакции
  log.Border(); // элемент дизайна х2
  console.log("\n\n");
  }
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