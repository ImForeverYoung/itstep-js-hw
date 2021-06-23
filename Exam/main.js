let list,db, auxiliary=0,form,config;
/*window.addEventListener("load", async () => {
  
  console.log(window.indexedDB)
  const db = await IndexedDBStore.open();
  console.log(db);
  console.log("Взлом Пентагона...");
  const requestAll = $fetch("https://api.mockaroo.com/api/cbb26480?count=500&key=d2ad9f00");
  list = await requestAll;
  console.log("Данные получены!");
  db.seed();
});*/
const showFailure = input => state => {
  console.log(state, [input]);
  input.nextSibling.innerHTML = state.error;
  auxiliary=0;
}
const showSuccess = input => state => {
  console.log(state, [input]);
  input.nextSibling.innerHTML = "";
  auxiliary=1;
}
window.addEventListener("load", async () => {
  

  const requestAll = $fetch("https://api.mockaroo.com/api/cbb26480?count=500&key=d2ad9f00");
  list = await requestAll;
  console.log("Данные получены!");
  //let db = window.indexedDB.open("tickets",2) //
  db = await IndexedDBStore.open();
  console.log(db);
  //window.indexedDB.open("tickets",1);
  //await db.clear();
  
  await db.seed(createFlights(list));
  //console.log(await db.getList());
  form = document.forms["form"];
  config = {
    // "name": chain(stripWS, required, minLength (3)),
    //"height": mapError (e => "Недопустимый рост!") (any(re(/^десять$/), chain(stripWS, num, range (300) (50)))),
    // "about": map (v => "О себе: " + v) (chain(stripWS, length (456) (3))),
    // "dateOfBirth": date,
    // "favorite": required,
    // "iAgree": required,
    // "resume": files(/^image\//, 2),
    // "books.title": null,
    // "books.author": null,
    "from": required,
    "where": required,
    "when": chain(required,date),
    "back": chain(required,date,bigger),
  }
  const calendar1 = new Calendar(document.body.getElementsByClassName("calendar")[0],document.body.getElementsByClassName("input")[2]);
  const calendar2 = new Calendar(document.body.getElementsByClassName("calendar")[1],document.body.getElementsByClassName("input")[3]);
  const doubleCalendar = new DoubleCalendar(calendar1,calendar2,document.body.getElementsByClassName("calendarContainer")[0])
  
  Array.from(form.elements).map(createField(form));

  

  
  const updateHistory = query => {
    window.document.title = "Поиск: " + query[0]+" "+query[1]+" "+query[2]+" "+query[3];
    // window.location.href = "http://google.com/search?q=" + window.encodeURIComponent(query);
    window.history.pushState(null, "Поиск: " + query[0]+" "+query[1]+" "+query[2]+" "+query[3], "?query=" + window.encodeURIComponent(query[0]+"_"+query[1]+"_"+query[2]+"_"+query[3]));
  }
  form.addEventListener("input", ev => {
    const { target } = ev; 
    const { name } = target;

    if (name in config) {
      let { value } = target;
      if(name=="from"||name=="where"){
        target.previousSibling.innerHTML="";
        createCity(target)(name)(value);
      }
      Result.switch
        (state => (state.level >= Failure.LEVEL_INPUT) && showFailure(target) (state))
        (showSuccess(target))
        (validate (config[name]) (value));
    }
    
  });
  form.addEventListener("submit",(e)=>{
    //e.preventDefault();
    return false;
    
  });
  form.addEventListener("focusin",ev=>{
    const { target } = ev; 
    const { name } = target;
    let { value } = target;
    ev.preventDefault();
    let auxiliary=0;
    if(name=="from"||name=="where"){
      console.log("Показываем города");
      let arr = createCity(target)(name)(value);
      // target.addEventListener("keydown",(event)=>{
      //   if(event.code=="Enter"){
      //     return false;
      //   }
      // });
      target.addEventListener("keyup",(event)=>{
        console.log(event.code)
        
        switch (event.code) {
          case "ArrowUp": {
            
            if (!Number(target.dataset.opened)) {
              //console.log(arr);
              target.dataset.opened=1;
              arr[0].style.border="1px solid blue";
              auxiliary=0;
            } else{
              //console.log(auxiliary)
              for(let i=0;i<arr.length;i++){
                arr[i].style.border="";
              }
              if(!auxiliary){ auxiliary=arr.length-1; }
              else{ auxiliary-=1; }
              arr[auxiliary].style.border="1px solid blue";
            }
    
          } break;
          case "ArrowDown": {
            
            if (!Number(target.dataset.opened)) {
              //console.log(arr);
              target.dataset.opened=1;
              arr[arr.length-1].style.border="1px solid blue";
              auxiliary=arr.length-1;
            } else{
              for(let i=0;i<arr.length;i++){
                arr[i].style.border="";
              }
              if(auxiliary>=arr.length-1){ auxiliary=0; }
              else{ auxiliary+=1; }
              arr[auxiliary].style.border="1px solid blue";
            }
    
          } break;
          case "Enter": {
            //console.log("gg");
            target.value=arr[auxiliary].firstChild.innerHTML;
            
          } break;
          // case "Backspace": {
          //   //console.log("gg");
          //   target.value=target.value.slice(-1);
            
          // } break;
        }
      })
    }
    else if(name=="when"||name=="back"){
      
      doubleCalendar.show();
    }
    
  });

  form.addEventListener("focusout", ev => {
    const { target } = ev; 
    const { name } = target;
    ev.preventDefault();
    console.log(ev);
    target.dataset.opened=0;
    
    if (name in config) {
      let { value } = target;
      if(name=="from"||name=="where"){
        
        
          target.previousSibling.innerHTML="";

        
      }
      else if(name=="when"||name=="back"){
        
          //doubleCalendar.hide();
        
        
      }
      Result.switch
        (showFailure(target))
        (state => {
          showSuccess(target);
          target.type !== "file" && (target.value = state.serialized);
        })
        (validate (config[name]) (value));
      //callValidation(target,name,value);
      
    }
  });
  // document.getElementById("submit").addEventListener("click",()=>{
  //   form.submit();
  // });
  document.getElementById("submit").addEventListener("click", async ev => {
    ev.preventDefault();
    if(!auxiliary){
      alert("Oshibo4ka");
      return;
    }
    
    let inputs=[form.getElementsByClassName("input")[0].value,form.getElementsByClassName("input")[1].value,
    form.getElementsByClassName("input")[2].value,form.getElementsByClassName("input")[3].value];
    updateHistory([inputs[0],inputs[1],inputs[2],inputs[3]])
    // console.log(form);
    // console.log(inputs);
      
    
    let tickets=[];
    
    const a = await db.findFlights(new Flight(inputs[2],inputs[0],inputs[1]));
    const b = await db.findFlights(new Flight(inputs[3],inputs[1],inputs[0]));
    console.log(a);
    const displayTickets = (arr,domEl,index)=>{
      domEl.style.display="flex";
      for(let i=0;i<arr.length;i++){
        
        const date = $("div",{/*className: "ticketData"*/},"Date📅 : "+onlyDate(arr[i].date));
        const from = $("div",{className: "ticketData"},"From⇗ : "+arr[i].from.city);
        const where = $("div",{className: "ticketData"},"Where⇘ : "+arr[i].where.city);
        const airline = $("div",{className: "ticketData"},"Airline✈ : "+arr[i].airline);
        const price = $("div",{className: "ticketData"},"Price💸 : "+arr[i].price+"$");
        const ticketCell = $("div",{className:"ticketCell",style:{
          display: "flex",

        }, dataset:{ selected: 0 }, onclick: (e)=>{
          //document.getElementsByClassName("ticketCell").map(e=>e.style.border="")
          e.preventDefault();
          const arr=document.getElementsByClassName("ticketCell");
          for(let i=0;i<arr.length;i++){
            arr[i].style.border="";
          }
          //console.log(ticketCell.dataset.selected);
          if(!Number(ticketCell.dataset.selected)){
            ticketCell.style.border="1px solid blue";
            ticketCell.dataset.selected=1;
            tickets[index]=date.innerHTML+";"+from.innerHTML+";"+where.innerHTML+";"+airline.innerHTML+";"+price.innerHTML;
          }else{
            ticketCell.dataset.selected=0;
            ticketCell.style.border="";
            tickets[index]=0;
          }
        }
        },date,from,where,airline,price)
        ticketCell.addEventListener("click",()=>{

        })
        domEl.append(ticketCell);
      }
    }
    displayTickets(a,document.getElementById("resultThere"),0);
    displayTickets(b,document.getElementById("resultBack"),1);
    document.getElementById("buy").style.display="block";
    document.getElementById("buy").addEventListener("click",()=>{
      if(tickets[0]||tickets[1]){
        alert("Билеты куплены!",tickets);
        document.body.innerHTML="<p>Купленные билеты:</p>";
        document.body.append(tickets[0],tickets[1]);
      }
    })
    // console.log(await db.findFlights(new Flight(inputs[2],inputs[0],inputs[1])));
  });


  
  const createCity = input =>name=> value=>{
    const amountOfCities=list.length;
    const nOfCitiesToDisplay=5;
    let arrayAuxiliary=[];
    let result=[];
    if(value==""){
      for(let i=0;i<nOfCitiesToDisplay;i++){
        let auxiliary;
        do{
        auxiliary=randomInt(0,amountOfCities-1);
        
        }while(arrayAuxiliary.findIndex(e=>e==auxiliary)!=-1)
        arrayAuxiliary[i]=auxiliary;
      }
     
    }else{
        let i=0;
        for(let j=0;j<amountOfCities;j++){
          if(i==nOfCitiesToDisplay){ break; }
          if(list[j].city.indexOf(value)==0){
            arrayAuxiliary[i++]=j;        
          }
        }
           
    }
    for(let i=0;i<nOfCitiesToDisplay;i++){
      if(!list[arrayAuxiliary[i]]){ break; }
      let city;
      city = $("div",{className:"city_li",
        onmousedown: (e)=>{
          e.preventDefault();
          console.log(e);
          input.focus();
          input.value=e.target.innerHTML;

          Result.switch
        (state => (state.level >= Failure.LEVEL_INPUT) && showFailure(input) (state))
        (showSuccess(input))
        (validate (config[name]) (input.value));
          //callValidation(input,name,input.value);
          //input.blur();
          //element.dispatchEvent(new Event('input'));
        }
      },$("p",{},list[arrayAuxiliary[i]].city),$("p",{},list[arrayAuxiliary[i]].code));
      // form.addEventListener("keyup",(e)=>{
      //   console.log("gg")
      // })
      input.previousSibling.append(city);
      result.push(city);
    }
    return result;
  }
  
});
const callValidation=(target,name,value/*,config*/)=>{
  Result.switch
      (state => (state.level >= Failure.LEVEL_INPUT) && showFailure(target) (state))
      (showSuccess(target))
      (validate (config[name]) (value));
}
const createField = form => input => {
  
  if (input.tagName === "BUTTON") {
    return;
  }

  const field = $("label", {
    className: "field"
  });
  
  form.insertBefore(field, input);
  
  field.append(
    $("div", { className: "city_ul artificialPH", dataset: {mouse:"false"} }),
    input,
    $("div", { className: "errors" })
  );
}
// window.addEventListener("unload", async () => {
//   indexedDB.deleteDatabase('tickets');
// });
