function add(num1,num2=0){
    return num1 + num2
}
function subtract(num1, num2=0){
    return num1 - num2
}
function multiply(num1, num2=1){
    return num1 * num2 
}
function divide(num1, num2 =1){
    if(num2== 0) return 'cant divide by zero'
    return num1 /num2
}
function operate(operator, num1, num2){
  return operator(num1, num2)
 
}
// numbers to screennnnnn
const dot= document.querySelector('.dot')
const screen = document.querySelector('#screen')
const numbers = document.querySelectorAll('.number')
numbers.forEach(b=> b.addEventListener('click', e=>{
   let added =b.textContent
   operators.forEach(b=> b.disabled=false)
   if(b===dot){
    dot.disabled=true
    if(screen.textContent == result || screen.textContent=='')screen.textContent =`0${added}`
    else screen.textContent +=added
   }else{
    if(screen.textContent == result)screen.textContent =added
    else screen.textContent +=added
   }
}))
//keyboard support
window.addEventListener('keypress', e=>{
    console.log()
    if(e.key==dot.textContent ||!isNaN(e.key)){
        let added =e.key
        operators.forEach(b=> b.disabled=false)
        if(e.key===dot.textContent){
         dot.disabled=true
         if(screen.textContent.includes('.')) return
         if(screen.textContent == result || screen.textContent=='')screen.textContent =`0${added}`
         else screen.textContent +=added
        }else{
         if(screen.textContent == result)screen.textContent =added
         else screen.textContent +=added
        }
    }
})
//delete key
const delkey = document.querySelector('#delete')
delkey.addEventListener('click',del)
window.addEventListener('keydown',del)
function del(e){
    if(e.key== 'Backspace'|| e.target==delkey)
    screen.textContent= screen.textContent.substr(0,screen.textContent.length-1)
}
//clearall
const Clear = document.querySelector('#clear')
Clear.addEventListener('click',e=>{ 
    values = []
    screen.textContent= ''
    usedOperators= []
})

//operations
let values= [];
let usedOperators = [];
let result;
const operators = document.querySelectorAll('.operator')
operators.forEach(b=> b.disabled = true);
operators.forEach(b=> b.addEventListener('click', calc))

function calc(e){
    dot.disabled=false;
    if(e.target.classList.item(0)== 'operator'){
        values.push(Number(screen.textContent))
        operators.forEach(b=> b.disabled = true);
        usedOperators.push(eval(e.target.classList.item(1)))
        screen.textContent = '' 
        if(values.length === 2 ){ // if theres 2 items in value does the previous stored operation
            let thiso= usedOperators.shift()
            result= values.reduce((a,b)=> operate(thiso,a,b))
            screen.textContent = result    //displays the result in the screen then store it in values 
            values= [result]}
//when = is used            
    }else{
        values.push(Number(screen.textContent))
        document.querySelector(".equal").disabled = true
        thiso= usedOperators.shift()
        result= values.reduce((a,b)=> operate(thiso,a,b))
        screen.textContent = result    //displays the result in the screen then empty values 
        values= []
        if(result=== 'cant divide by zero')  operators.forEach(b=> b.disabled = true);
    }
}