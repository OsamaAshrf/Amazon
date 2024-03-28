import {products} from '../Data Structure/Data.js';
import  {cart,save_to_local} from '../Data Structure/cart.js' ;
import { Search,shuffle } from './Functions.js';

// array of color:
let colArray = [];
for(let i=0; i<products.length;i++){
    colArray[i]="none";
}
for(let i=0; i<products.length;i++){
    if(products[i].color !== "none"){
        colArray[i]=products[i].color[0].color2
    }
}

//displaying the main HTML products:
let HTMLTotal='';
/*let arr_shuffle = products;
shuffle(arr_shuffle);*/
products.forEach((value,index)=>{
    HTMLTotal += `
    <div class="elementBody">
        <div class="elementBody_Img js-img-display-${index}">
            <img class="Img1" src="${value.image}">
        </div>
        <div class="elementBody_text" data-index=${index}>
            <div class="Tite">${value.name}</div>
            <div class="Rarting">
                <img class="ratImg" src="images/ratings/rating-${value.rating.stars * 10}.png">
                <div class="ratNum">${value.rating.count}</div>
            </div>
            <div class="Prize_text">$${((value.priceCents)/100).toFixed(2)}</div>
            <div class="Product_num_div js-product_quantNum">
                <select class="container_button js-product_quantNum-${index}">
                    <option selected value="1">1</option>
                    <option value="2">2</option><option value="3">3</option><option value="4">4</option>
                    <option value="5">5</option><option value="6">6</option><option value="7">7</option>
                    <option value="8">8</option><option value="9">9</option><option value="10">10</option>
                </select>
            </div>
            <div class="Color_Div js-color-option-${index}"></div>
            <div style="flex: 1;"></div>
            <div class="display_addtoCart js-display_addtoCart-${index}" style="height:25px;
            margin-top: 13px; margin-bottom: 3px;"></div>
            <button class="Added_t0_cart js-Add_to_cart" data-product-name="${value.name}">Add to cart</button>
        </div>
    </div>
    `
});
document.querySelector('.js-Gridview').innerHTML=HTMLTotal;

// displaying the color options & interactving:
products.forEach((value,index)=>{
    if (value.color !== "none"){
        let HTML_colur='<div>Color</div>';
        value.color.forEach((color,ind)=>{
            HTML_colur += `
            <button class="colDesign js-option-color-${index}-${ind}">${color.color2}</button>
            `;
        });
        document.querySelector(`.js-color-option-${index}`).innerHTML=HTML_colur; // buttons has been created .
        //interactiving the buttons
        let ispressed = false;
        document.querySelector(`.js-option-color-${index}-${0}`).classList.add('colDesign2');
        value.color.forEach((color,ind)=>{
            document.querySelector(`.js-option-color-${index}-${ind}`).addEventListener('click',()=>{
                document.querySelector(`.js-img-display-${index}`).innerHTML=`
                <img class="Img1" src="${color.src}">`;
                colArray[index]=`${color.color2}`;
                // illustrate itself
                document.querySelector(`.js-option-color-${index}-${ind}`).classList.add('colDesign2');
                //turn off other
                for(let i=0; i<value.color.length;i++){
                    if(i === ind ){
                        continue;
                    }
                    document.querySelector(`.js-option-color-${index}-${i}`).classList.remove('colDesign2');
                }
                if(!ispressed){
                    ispressed = true;
                }
            })
        })
    }
});

// interactving the cart:
let cartnum =0;
cart.forEach((obj)=>{
    cartnum = cartnum+obj.quantity;
})
let Cartdisplay = document.querySelector('.js-numcart')
Cartdisplay.innerHTML=cartnum;
document.querySelector('.js-numcart2').innerHTML=cartnum;



let setTimeid;
let lastpress=0;
let ispress=0;
// Add to Cart button interactiving:
document.querySelectorAll('.js-Add_to_cart').forEach((button,i)=>{
    button.addEventListener('click',()=>{
    // check the quantity box number:
    let prod_quant = document.querySelector(`.js-product_quantNum-${i}`).value;
 // 1st update the numcart
    cartnum+=Number(prod_quant);
    Cartdisplay.innerHTML=cartnum;
    document.querySelector('.js-numcart2').innerHTML=cartnum;
 // 2nd add objects to cart
    let isfound=false;
    const productname = button.dataset.productName;//the name after data-with camel case which was written in kabab case
     // check if there is a color option:
    if(document.querySelector(`.js-color-option-${i}`).innerHTML === ''){
        for(let i=0;i<cart.length;i++){
            if(cart[i].productname === productname){
                cart[i].quantity+=Number(prod_quant);
                save_to_local();
                isfound=true;
                break;
            }
        }
        if(!isfound){
            cart.push({
                productname:productname,
                quantity:Number(prod_quant),
                shipOption:0,
                color: "none"
            });
            save_to_local();
        }  
    } else{
        for(let j=0;j<cart.length;j++){
        if(cart[j].productname === productname && cart[j].color === colArray[i]){
            cart[j].quantity+=Number(prod_quant);
            save_to_local();
            isfound=true;
            break;
        }}
        if(!isfound){
        cart.push({
            productname:productname,
            quantity:Number(prod_quant),
            shipOption:0,
            color: colArray[i]
        });
        save_to_local();
        };
    }
    //
    console.log(cart);
 //3rd display is added for 2 secs
    document.querySelector(`.js-display_addtoCart-${i}`).innerHTML='<img class="checkmark" src="Pics&Icons/checkmark.png"> Added';
    ispress=i;
    if(ispress===lastpress){
        clearTimeout(setTimeid);
        setTimeid=setTimeout(function(){
            document.querySelector(`.js-display_addtoCart-${i}`).innerHTML='';
        },2000);
    }else{
        setTimeout(function(){
            document.querySelector(`.js-display_addtoCart-${i}`).innerHTML='';
        },2000);
    }
    lastpress = ispress;
    });
});

document.querySelector('.js-srch_button').addEventListener('click',()=>{
    Search();
})


//hamburger menu//
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



