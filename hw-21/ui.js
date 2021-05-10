/*
 * Есть активная игра
 * Есть предыдущая игра
 * 0 0 - Нет таймера, нет паузы, есть кнопка начать
 * 0 1 - Таймер предыдущей игры, нет паузы, есть кнопка начать
 * 1 _ - Таймер текущей игры, есть паузаб , нет кнопки начать (прервать текущую )
 * 
 */

const hasActiveGame = false;
const hasPerviousGame = false;
let arr=[];
let click=false;
let N;
let M;
const createUi = () => {
  const home = document.getElementById("home");
  const gameContainer = document.getElementById("game");
  const buttonStart = document.getElementById("button-start");

  const gameTimer = document.getElementById("game-timer");

  const gameState = document.getElementById("game-state");
  const buttonPause = document.getElementById("button-pause");
  const cardSelectorPanel = document.getElementById("cardSelectorPanel");
  const cardSelector = document.getElementById("cardSelector");
  const panelPart = document.getElementById("panelPart");
  for(let i=1;i<4;i++){
    for(let j=1;j<4;j++){
      const card = $("div",{className: "miniCard",
      dataset:{
        row: i,
        column: j
      }
      });
      card.addEventListener("mouseover",()=>{
        if(!click){
        if((card.dataset.row * card.dataset.column)%2==0){
          /*console.log(card);*/
          arr.forEach((element) => {
            element.classList.remove("blueC");
            element.classList.remove("redC");
            if(element.dataset.column <= card.dataset.column && element.dataset.row <= card.dataset.row){
              element.classList.add("blueC");
            }
          });
        }
        else{
          arr.forEach((element) => {
            element.classList.remove("blueC");
            element.classList.remove("redC");
            if(element.dataset.column <= card.dataset.column && element.dataset.row <= card.dataset.row){
              element.classList.add("redC");
            }
          });
        }
        }
      });
      /*card.addEventListener("mouseout",()=>{
        arr.forEach((element) => {
          
            
        });
        
      });*/
      card.addEventListener("click",()=>{
        if(!click){
          
        if((card.dataset.row * card.dataset.column)%2==0){
          arr.forEach((element) => {
            if(element.dataset.column <= card.dataset.column && element.dataset.row <= card.dataset.row){
              click=true;
              N=card.dataset.column;
              M=card.dataset.row;
            }
          });
          
        }
        }
        else{
          click=false;
          arr.forEach((element) => {
            element.classList.remove("blueC");
            element.classList.remove("redC");
            
          });
        }
      });
      arr.push(card);
      panelPart.append(card);
    }
  }
  
  console.log(arr);
  cardSelector.addEventListener("click", () => {
    if(click){
    cardSelectorPanel.classList.add("cardSelectorPanel_hidden");
    home.classList.add("home_hidden");
    cardSelectorPanel.classList.add("cardSelectorPanel_hidden");
    gameState.classList.remove("game-state_hidden");
    buttonPause.classList.remove("button-pause_hidden");
    
    const game = createGame(gameContainer, gameTimer, (time) => {
      home.classList.remove("home_hidden");
      buttonPause.classList.add("button-pause_hidden");
      buttonStart.classList.remove("button-start_hidden");

      buttonPause.removeEventListener("click", togglePause);

      console.log("Game over", time);
    });

    const togglePause = () => {
      const isRunning = game.togglePause();
      // const isRunning = game.togglePause();

      console.log(isRunning);

      if (isRunning) {
        home.classList.add("home_hidden");
      } else {
        home.classList.remove("home_hidden");
      }
    };

    buttonPause.addEventListener("click", togglePause);

    game.start();
    }
  });
  buttonStart.addEventListener("click", () => {
    buttonStart.classList.add("button-start_hidden");
    cardSelectorPanel.classList.remove("cardSelectorPanel_hidden");
    

  });
}