const monthes=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const weeks=["пн","вт","ср","чт","пт","сб","вс"];

class Calendar{
    container
    weeksBody
    selectWrapper
    inputItem
    constructor(container,inputItem){
        this.container=container;
        this.inputItem=inputItem;
        this.selectWrapper=$("div",{className: "calendar__selectwrapper"});
        this.selectCreate();
        this.weeksBody=$("div",{className: "calendar__weeks-body"});
        this.monthTableCreate(new Date());
        const weekNames = $("div",{className:"calendar__weekdays"});
        for(let i=0;i<7;i++){
            weekNames.appendChild($("div",{className:"calendar__weekdays__day textarea_center"},weeks[i]));
        }
        
        this.container.appendChild(this.selectWrapper);
        this.container.appendChild(weekNames);
        this.container.appendChild(this.weeksBody);
        /*this.container.addEventListener("mousedown",(e)=>{
            //console.log("gg")
            e.preventDefault();
            this.inputItem.focus();
        })*/
    }
    selectCreate(){
        const selecter = $("select",{className: "calendar__select",/*mousedown:(e)=>{
            console.log("gg")
            
            this.inputItem.focus();
            e.preventDefault();
            //return false;
            // if (e.preventDefault){
            //     e.preventDefault();
            // }else{
            //     e.returnValue = false;
            // }
        }*/});
        /*selecter.addEventListener("mousedown",(e)=>{
            
            e.preventDefault();
            this.inputItem.focus();
            console.log("gg");
        });*/
        const monthName = $("p",{className: "calendar__select__monthname"});
        const dateToday = new Date();
        let year = dateToday.getFullYear();
        selecter.appendChild(
            $("option",{disabled: "true", style: {color: "black"}},year+" ↓")
        );
        for(let i=0,month=dateToday.getMonth();i<12;i++,month++){
            //console.log("gg");
            selecter.appendChild(
                $("option",{value: year+"-"+month, style: {color: "#0c73fe"}/*, dataset: { month: month, year: year }*/},monthes[month])
            );
            if(month==11){
                month=-1;
                selecter.appendChild(
                    $("option",{disabled: "true", style: {color: "black"}},(year++)+1+" ↓")
                );        
            }          
        }
        selecter.addEventListener("change",(e)=>{
            this.weeksBody.innerHTML="";
            this.monthTableCreate(new Date(e.target.value.match(/\d{4}/g), (Number(e.target.value.match(/\d{1,2}$/g))), 1));
            //console.log(e.target.value.match(/\d{4}/g) +" "+ e.target.value.match(/\d{1,2}$/g) + " "+dateToday.getMonth());
            
        });
        

        this.selectWrapper.appendChild(monthName);
        this.selectWrapper.appendChild(selecter);
        //console.log(`${dateToday.getFullYear()} ${dateToday.getMonth()} ${dateToday.getDate()}`);
    }
    monthTableCreate(dateToday){
        
        
        //console.log(getDaysInMonth(dateToday))
        let dayAuxiliary=1, firstDay=getFirstDayOfMonth(dateToday).getDay();
        
        if(firstDay==0){firstDay=7;}  
        while(dayAuxiliary<=getDaysInMonth(dateToday)){
        const weekRow=$("div",{className:"calendar__weeks__row"});
        
        for(let i=1;i<=7;i++){   
            
            let day;
            let dayValue= (firstDay)==i? dayAuxiliary : " ";
            if(dayAuxiliary >= (dateToday).getDate() && firstDay!=0){
                day = $("div",{className:"calendar__weeks__day textarea_center active", dataset: { date: dayAuxiliary+"-"+dateToday.getMonth()+"-"+dateToday.getFullYear(), 
                input: this.inputItem.name } ,
                onmousedown: (e) => {
                    // let event = new Event("dayClick"); 
                    // this.inputItem.dispatchEvent(event, {bubbles: true});
                    e.preventDefault();
                    this.inputItem.focus();
                //console.log(this.inputItem); 
                this.inputItem.value=e.target.innerHTML+"-"+(dateToday.getMonth()+1)+"-"+dateToday.getFullYear();
                callValidation(this.inputItem,this.inputItem.name,this.inputItem.value);
                } }, dayValue);
            }
            else{
                day = $("div",{className:"calendar__weeks__day textarea_center notactive"}, dayValue);
            }
            
            if((firstDay)==i){ dayAuxiliary++; firstDay++; }
            
            weekRow.appendChild(day);
            //console.log(firstDay);
            if(dayAuxiliary==getDaysInMonth(dateToday)+1)
            {  
                firstDay=0;
            }
            //console.log("----"+dayAuxiliary);
        }
        this.weeksBody.appendChild(weekRow);
        firstDay=1;
        }
    }
}
class DoubleCalendar{
    calendar1
    calendar2
    container
    constructor(calendar1,calendar2,container){
      this.calendar1=calendar1;
      this.calendar2=calendar2;
      this.container=container;
    }
    show(){
        this.container.style.display="";
    }
    hide(){
        this.container.style.display="none";
    }
}