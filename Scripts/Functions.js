import { products} from "../Data Structure/Data.js";
import  {cart,save_to_local} from '../Data Structure/cart.js' ;
//

document.querySelector('.js-search').addEventListener('keydown',(event)=>{
    onkeydown2(event);
})
function onkeydown2(event){
    console.log('helo')
    if(event.key === 'Enter'){
        Search();
    }
}

export function  Search(){
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
    //differences from main html,
    let search_key = document.querySelector('.js-search').value;
    console.log(document.querySelector('.js-search').value);
    let srch_Result_array = [];
    products.forEach((product)=>{
    let Keyword_arr = product.keywords;
    Keyword_arr.forEach((word)=>{
        if(word.toLocaleLowerCase() === search_key.toLocaleLowerCase()){
            srch_Result_array.push(product);
        }
    });
    });
    //
    let HTMLTotal='';
    srch_Result_array.forEach((value,index)=>{
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
srch_Result_array.forEach((value,index)=>{
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
            //
                if((color.color2).toLowerCase() === search_key.toLocaleLowerCase()){
                    document.querySelector(`.js-option-color-${index}-${0}`).classList.remove('colDesign2');
                    document.querySelector(`.js-option-color-${index}-${ind}`).classList.add('colDesign2');
                    document.querySelector(`.js-img-display-${index}`).innerHTML=`
                    <img class="Img1" src="${color.src}">`;
                    colArray[index]=`${color.color2}`;
                }
            //
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
                    console.log('hello');
                    document.querySelector(`.js-option-color-${index}-${i}`).classList.remove('colDesign2');
                }
                if(!ispressed){
                    ispressed = true;
                }
            })
        })
    }
})

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
}

export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  //Checkout functions:
  //recalculate and display:
  export function Recalc_displayALL(x,totprize,totship,beforeTax_value,addTax_value,orderTot_value){
    document.querySelector('.js-totquant').innerHTML=x;
    document.querySelector('.js-Cart_Head').innerHTML=x;
    document.querySelector('.js-totprize').innerHTML=`$${((totprize)/100).toFixed(2)}`;
    document.querySelector('.js-totshiping').innerHTML=`$${((totship)/100).toFixed(2)}`;
    beforeTax_value = totship + totprize;
    addTax_value = beforeTax_value * 0.1 ;
    orderTot_value = addTax_value + beforeTax_value ;
    document.querySelector('.js-tot_bef_tax').innerHTML=`$${((beforeTax_value)/100).toFixed(2)}`;
    document.querySelector('.js-estimat_tax').innerHTML=`$${((addTax_value)/100).toFixed(2)}`;
    document.querySelector('.js-Order_tot').innerHTML=`$${((orderTot_value)/100).toFixed(2)}`;
}
//appear update hide save:
export function update_hide_save(v){
    document.querySelector(`.js-newquant_update-${v}`).style.display='none';
    document.querySelector(`.js-save-${v}`).style.display='none';
    document.querySelector(`.js-update-${v}`).style.display='inline-block';
    document.querySelector(`.js-quant-${v}`).style.display='inline-block';
}
//appear save hide update:
export function save_hide_update(v){
    document.querySelector(`.js-newquant_update-${v}`).style.display='inline-block';
    document.querySelector(`.js-save-${v}`).style.display='inline-block';
    document.querySelector(`.js-update-${v}`).style.display='none';
    document.querySelector(`.js-quant-${v}`).style.display='none';
}
//updating method:
export function updating(prod_prize,quant_update,i){
    totprize += prod_prize * (quant_update-elem.quantity);
    x += (Number(quant_update)-elem.quantity);
    cart[i].quantity=Number(quant_update);
    save_to_local();
    //displaying:
    Recalc_displayALL(x,totprize,totship);
    document.querySelector(`.js-quant-${v}`).innerHTML=quant_update;
    update_hide_save(v);
}