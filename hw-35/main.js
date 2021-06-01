function operation(string){
    switch(string){
        case '+':
            break;
    }
}
window.addEventListener("load", () => {
    let input = document.getElementById("calcInput");
    let result = document.getElementById("result");
    input.addEventListener("input",()=>{
        if(input.value.match(/^\s*[-+]?\s*(\d+)\s*[+-\/*]\s*(\d+)\s*$/g)){
            let fDigit = Number(input.value.match(/^\s*(\d+)\s*/g));
            let sDigit = Number(input.value.match(/\s*(\d+)\s*$/g));
            
            
            /*result.innerText = Math.toSource(input.value);*/
            result.innerText = "контакт est";
        }
        else{
            result.innerText = "контактa net";
        }
    });
    
});