const airlines = ["ggline","aerOo","fastflight"];
class Flight{
    date
    from
    where
    price
    airline
    constructor(date=new Date(),from,where,price=1,airline=""){
        this.date=date;
        this.from=from;
        this.where=where;
        this.price=price;
        this.airline=airline;
    }
    static from(data) {
        return new Flight(
          data.date,
          data.from,
          data.where,
          data.price,
          data.airline,
        );
      }
}

function randomDate(start, end, startHour=0, endHour=23) {
    let date = new Date(+start + Math.random() * (end - start));
    let hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}
function createFlights(list){
let flights=[];
for(let i=0;i<800;i++){
    let today = new Date();
    let date=randomDate(today,new Date(today.getFullYear()+1,today.getMonth(),today.getDate()));
    let from = list[randomInt(0,499)];
    let where;
    do{
        where = list[randomInt(0,499)];
    }while(from==where);
    let airline =airlines[randomInt(0,2)];
    let price;
    switch(airline){
        case airlines[0]:{
            price = randomInt(100,200);
            break;
        }
        case airlines[1]:{
            price = randomInt(210,250);
            break;
        }
        case airlines[2]:{
            price = randomInt(300,500);
            break;
        }
    }
    flights[i]=new Flight(date,from,where,price,airline);
}
return flights;
}