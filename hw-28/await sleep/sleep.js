const sleep = (delay) => new Promise((resolve,reject) => {
  console.log("Начали");
  console.log("Ждем "+(Number.isInteger(delay)?delay:"..."));
  setTimeout( Number.isInteger(delay)? resolve:reject, delay);
}).then(
  function(){ console.log("Закончили"); },
  function(){ console.log("Что-то пошло не так :("); }
);


window.addEventListener("load", async () => {
  
  

  await sleep(5000);
  
  
});