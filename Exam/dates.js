const d1 = new Date();

const d2 = new Date("asdf");

//console.log(d2);

// console.log(d1);
// console.log(d2);

// console.log(d1.toISOString());
// console.log(d1.toJSON());

// console.log(d1.toDateString());
// console.log(d1.toTimeString());
// console.log(d1.toUTCString());

// console.log(d1.toLocaleString());
// console.log(d1.toLocaleDateString());
// console.log(d1.toLocaleTimeString());

const dateClone = d => new Date(d.getTime());

const addDays = (d, n) => {
  const date = dateClone(d);
  date.setDate(date.getDate() + n); 
  return date; 
}

const onlyDate = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const today = () => onlyDate(new Date());


const getFirstDayOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);

const getLastDayOfMonth = d => new Date(d.getFullYear(), d.getMonth() + 1, 0);

const getDaysInMonth = d => getLastDayOfMonth(d).getDate();

const getDaysInYear = d => 337 + getDaysInMonth(new Date(d.getFullYear(), 1))

const getWeekDay = d => (6 + d.getDay()) % 7;

const getFirstDayOfWeek = d => addDays(d, -getWeekDay(d));
  // const wd = -getWeekDay(d);


  // получить день недели 
  // найти разницу с понедельником 
// }

// 365 / 366 = 337
// console.log(getWeekDay(addDays(today(), 5)));

// console.log(getDaysInYear(today()));

[].filter(o => o.dateOfCreation > dateX)


const day0 = getFirstDayOfWeek(today());
const oneDay = 24 * 60 * 60 * 1000;

// createArray(i => new Date(day0.getTime() + i * oneDay)) (7)
//   .forEach(d => console.log(d));

/*createArray(i => addDays(day0, i)) (7)
  .forEach(d => console.log(d));*/


