import {cart,save_to_local} from '../Data Structure/cart.js';
let x=0;
cart.forEach(element => {
    x += element.quantity;
});
document.querySelector('.js-numcart').innerHTML=x;
document.querySelector('.js-numcart3').innerHTML=x;
let setTimeid;
document.querySelector('.js-button').addEventListener('click',()=>{
    let isfound= false;
    for(let i=0;i<cart.length;i++){
        if(cart[i].productname === "Blackpink Printed Logo T-shirt"){
            cart[i].quantity+=1;
            save_to_local();
            isfound=true;
            break;
        }
    }
    if(!isfound){
        cart.push({
            productname:"Blackpink Printed Logo T-shirt",
            quantity:1,
            shipOption:0,
            color:"none"
        });
        save_to_local();
    } 
    document.querySelector('.js-numcart').innerHTML=++x;
    document.querySelector('.js-numcart3').innerHTML=x;
    console.log();
    document.querySelector('.js-button').innerHTML='&#x2713; Added';
    clearTimeout(setTimeid);
    console.log('hello');
    setTimeid=setTimeout(function(){
        document.querySelector(`.js-button`).innerHTML='<img style="height: 25px; margin-right: 8px;" src="Pics&Icons/buy-again.png">Buy it again';
    },2000);
})
let showMenue=false;
document.querySelector('.hum_pic').addEventListener('click',()=>{
if(!showMenue){
    document.querySelector('.nav').classList.add('nav_open');
    showMenue=true;
}
else{
    document.querySelector('.nav').classList.remove('nav_open');
    showMenue=false;
}
})