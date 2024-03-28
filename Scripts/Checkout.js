import { cart ,save_to_local} from '../Data Structure/cart.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {products} from '../Data Structure/Data.js';
/*
import {Recalc_displayALL,update_hide_save,save_hide_update,updating} from './Functions.js';
*/
console.log(cart);
if(cart.length === 0){
    empty_cart();
}
//display items you,ve choosed:
let checkHTML='';
let totprize = 0;
let totship = 0;
let beforeTax_value;
let addTax_value;
let orderTot_value;
export let x = 0; //total items quantity

cart.forEach((element,y) => {
    let name =element.productname;
    let quantnum = element.quantity;
    let ship = element.shipOption;
    let color = element.color;
    x = x + quantnum;
    let matchingProduct;
    products.forEach((object)=>{
        if(object.name === name){
            matchingProduct = object;
        }
    })
    totprize += matchingProduct.priceCents * quantnum ;
    totship += ship;
    // creating the Html for cart products that does not have color and for color items //
    if(color === 'none'){
        checkHTML += `
        <div class="div_product js-${y}">
            <div class="div_product_Info js-div_product_Info">Delivery date: <span class="js-div_product_Info-${y}"></span></div>
            <div class="div_product_cont">
                <div class="div_product_leftsec">
                    <div class="div_product_pic">
                        <img class="prod_img" src=${matchingProduct.image}>
                    </div>
                    <div class="div_product_id">
                        <div class="product_id_1st">${matchingProduct.name}</div>
                        <div class="product_id_2nd">$${((matchingProduct.priceCents)/100).toFixed(2)}</div>
                        <div class="update_div">
    
                        </div>
                        <div class="js-div_update_del" data-y="${y}" data-product-name="${matchingProduct.name}"
                            data-product-color=${color} data-product-prize="${matchingProduct.priceCents}">
                            Quantity: <span class="js-quant-${y}">${quantnum}</span>
                            <input class="js-newquant_update-${y} newquant_update" type="number" value="1">
                            <span class="product_id_3rd_save js-save-${y}">Save</span>
                            <span class="product_id_3rd js-update-${y}">Upate</span>
                            <span class="product_id_3rd js-delet" data-product-name="${matchingProduct.name}"
                            data-y="${y}" data-product-prize="${matchingProduct.priceCents}"
                            data-product-color=${color}>Delete</span>
                        </div>
                    </div>
                </div>
                <div class="div_product_rightsec">
                    <div class="div_rightsec_1stlay">Choose a delivery option:</div>
                    <div class="div_rightsec_2ndlay js-div_rightsec_2ndlay" data-y="${y}">
                        <div class="div_radio_circle">
                            <input class="radio_circle js-radio_circle1" checked name="${matchingProduct.name}"
                            data-y="${y}" data-product-name="${matchingProduct.name}" 
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info1-${y}"></div>
                            <div class="Time_info2">Free Shipping</div>
                        </div>
                    </div>
                    <div class="div_rightsec_2ndlay">
                        <div>
                            <input class="radio_circle js-radio_circle2" name="${matchingProduct.name}"
                            data-y="${y}" data-product-name="${matchingProduct.name}"
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info2-${y}"></div>
                            <div class="Time_info2">$4.99-shipping</div>
                        </div>
                    </div>
                    <div class="div_rightsec_2ndlay">
                        <div>
                            <input class="radio_circle js-radio_circle3" name="${matchingProduct.name}" 
                            data-y="${y}" data-product-name="${matchingProduct.name}" 
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info3-${y}"></div>
                            <div class="Time_info2">$9.99-shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    } else{
        let img_src;
        for(let i=0;i<matchingProduct.color.length;i++){
            if(color === matchingProduct.color[i].color2){
                img_src=matchingProduct.color[i].src;
            }
        }
        checkHTML += `
        <div class="div_product js-${y}">
            <div class="div_product_Info js-div_product_Info">Delivery date: <span class="js-div_product_Info-${y}"></span></div>
            <div class="div_product_cont">
                <div class="div_product_leftsec">
                    <div class="div_product_pic">
                        <img class="prod_img" src=${img_src}>
                    </div>
                    <div class="div_product_id">
                        <div class="product_id_1st">${matchingProduct.name}</div>
                        <div class="product_id_2nd">$${((matchingProduct.priceCents)/100).toFixed(2)}</div>
                        <div style="margin-bottom:3px">Color: ${color}</div>
                        <div class="js-div_update_del" data-y="${y}" data-product-name="${matchingProduct.name}"
                        data-product-color=${color} data-product-prize="${matchingProduct.priceCents}">
                            Quantity: <span class="js-quant-${y}">${quantnum}</span>
                            <input class="js-newquant_update-${y} newquant_update" type="number" value="1">
                            <span class="product_id_3rd_save js-save-${y}">Save</span>
                            <span class="product_id_3rd js-update-${y}">Upate</span>
                            <span class="product_id_3rd js-delet" data-product-name="${matchingProduct.name}"
                            data-y="${y}" data-product-prize="${matchingProduct.priceCents}"
                            data-product-color=${color}>Delete</span>
                        </div>
                    </div>
                </div>
                <div class="div_product_rightsec">
                    <div class="div_rightsec_1stlay">Choose a delivery option:</div>
                    <div class="div_rightsec_2ndlay js-div_rightsec_2ndlay" data-y="${y}">
                        <div class="div_radio_circle">
                            <input class="radio_circle js-radio_circle1" checked name="${matchingProduct.name} ${color}"
                            data-y="${y}" data-product-name="${matchingProduct.name}"
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info1-${y}"></div>
                            <div class="Time_info2">Free Shipping</div>
                        </div>
                    </div>
                    <div class="div_rightsec_2ndlay">
                        <div>
                            <input class="radio_circle js-radio_circle2" name="${matchingProduct.name} ${color}"
                            data-y="${y}" data-product-name="${matchingProduct.name}" 
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info2-${y}"></div>
                            <div class="Time_info2">$4.99-shipping</div>
                        </div>
                    </div>
                    <div class="div_rightsec_2ndlay">
                        <div>
                            <input class="radio_circle js-radio_circle3" name="${matchingProduct.name} ${color}" 
                            data-y="${y}" data-product-name="${matchingProduct.name}"
                            data-product-color=${color} type="radio">
                        </div>
                        <div>
                            <div class="Time_info1 js-Time_info3-${y}"></div>
                            <div class="Time_info2">$9.99-shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
});
document.querySelector('.Cart_contents').innerHTML=checkHTML;
Recalc_displayALL(x,totprize,totship);
// calc of days:
const day = dayjs();
let day7_dilv = ((day.add(7,'days')).format('dddd, MMMM D'));
let day3_dilv = ((day.add(3,'days')).format('dddd, MMMM D'));
let day1_dilv = ((day.add(1,'days')).format('dddd, MMMM D'));
document.querySelectorAll('.js-div_rightsec_2ndlay').forEach((div)=>{
    let div_Timeid = div.dataset.y;
    document.querySelector(`.js-Time_info1-${div_Timeid}`).innerHTML=day7_dilv ;
    document.querySelector(`.js-Time_info2-${div_Timeid}`).innerHTML= day3_dilv;
    document.querySelector(`.js-Time_info3-${div_Timeid}`).innerHTML= day1_dilv;
    //default shipping option
    document.querySelector(`.js-div_product_Info-${div_Timeid}`).innerHTML=day7_dilv;
})

//update interactive:
document.querySelectorAll('.js-div_update_del').forEach((div_id)=>{
    let v = div_id.dataset.y;
    let prod_id = div_id.dataset.productName;
    let prod_colo = div_id.dataset.productColor;
    let prod_prize = div_id.dataset.productPrize;
    document.querySelector(`.js-update-${v}`).addEventListener('click',()=>{
        save_hide_update(v);
        document.querySelector(`.js-save-${v}`).addEventListener('click',()=>{
            let quant_update = document.querySelector(`.js-newquant_update-${v}`).value;
            console.log(quant_update);
            if(prod_colo==="none"){
                if(quant_update < '0'){
                    console.log('less than');
                    alert('Please Enter a Valid Number');
                }else if(quant_update === '0'){
                    console.log('equal');
                    Delete_Item(prod_id,prod_prize,prod_colo,v);
                    if(cart.length === 0){
                        empty_cart();
                    }
                } else{
                    console.log('big than');
                    cart.forEach((elem,i)=>{
                    if(elem.productname === prod_id) {updating(prod_prize,quant_update,elem,i,v);}
                });
                console.log(cart);
            }
            }else{
                if(quant_update < '0'){
                    alert('Please Enter a Valid Number');
                }else if(quant_update === '0'){
                    Delete_Item(prod_id,prod_prize,prod_colo,v);
                }else{
                cart.forEach((elem,i)=>{
                    if(elem.productname === prod_id && elem.color === prod_colo) {updating(prod_prize,quant_update,elem,i,v);}
                });
                console.log(cart);
            }
            }
        });
    });
});

//delete interactive:
document.querySelectorAll('.js-delet').forEach((button)=>{
    button.addEventListener('click',()=>{
        let prod_name = button.dataset.productName;
        let prizeRemove_num = button.dataset.productPrize;
        let prod_colo = button.dataset.productColor;
        let z = button.dataset.y;
        Delete_Item(prod_name,prizeRemove_num,prod_colo,z);
        if(cart.length === 0){
            empty_cart();
        }
    });
});

//shipping interactive:

// shipping choise 1
document.querySelectorAll('.js-radio_circle1').forEach((radio)=>{
    radio.addEventListener('click',()=>{
        Shiping (radio,0,1);
    })
})
// shipping choise 2
document.querySelectorAll('.js-radio_circle2').forEach((radio)=>{
    radio.addEventListener('click',()=>{
        Shiping (radio,499,2);
    })
})
// shipping choise 3
document.querySelectorAll('.js-radio_circle3').forEach((radio)=>{
    radio.addEventListener('click',()=>{
        Shiping (radio,999,3);
    })
})

//paypal:

let ispressed=false;
document.querySelector('.js-paypal-toggle').addEventListener('click',()=>{
    if(!ispressed){
        document.querySelector('.js-pay').style.display="block";
        document.querySelector('.js-place').style.display="none";
        ispressed=true;
    } else{
        document.querySelector('.js-pay').style.display="none";
        document.querySelector('.js-place').style.display="flex";
        ispressed=false;
    }

})

//place your order:
function pay_fun(){
    window.open("https://www.sandbox.paypal.com/checkoutnow?sessionID=uid_dd8d2cc612_mtq6mju6mde&buttonSessionID=uid_9a05488d40_mtq6mju6ndc&stickinessID=uid_9380ea7842_mtc6ndy6mta&smokeHash=&sign_out_user=false&fundingSource=paypal&buyerCountry=EG&locale.x=en_US&commit=true&client-metadata-id=uid_dd8d2cc612_mtq6mju6mde&clientID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R&env=sandbox&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz9jbGllbnQtaWQ9dGVzdCZjdXJyZW5jeT1VU0QmZGlzYWJsZS1mdW5kaW5nPXZlbm1vLHBheWxhdGVyIiwiYXR0cnMiOnsiZGF0YS11aWQiOiJ1aWRfZHZqanphc3Jwb3VnaXltaXNna3VzaHZvbXdlamh3In19&xcomponent=1&version=5.0.425&token=9U335919188241357","_blank")
}
function debit(){
    document.querySelector('.js-depit_option').style.display="block";
    document.querySelector('.js-paypal').style.display="none"
}
if(cart.length === 0){}else{
document.querySelector('.js-paypal').addEventListener('click',pay_fun);
document.querySelector('.js-debit').addEventListener('click',debit);
document.querySelector('.js-close').addEventListener('click',()=>{
    document.querySelector('.js-depit_option').style.display="none";
    document.querySelector('.js-paypal').style.display="block"

})
}
document.querySelector('.js-payNow').addEventListener('click',()=>{
    alert('Please fill all the required data!');
})


















//Checkout functions:
//recalculate and display:
function Recalc_displayALL(x,totprize,totship){
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
function update_hide_save(v){
    document.querySelector(`.js-newquant_update-${v}`).style.display='none';
    document.querySelector(`.js-save-${v}`).style.display='none';
    document.querySelector(`.js-update-${v}`).style.display='inline-block';
    document.querySelector(`.js-quant-${v}`).style.display='inline-block';
}
//appear save hide update:
function save_hide_update(v){
    document.querySelector(`.js-newquant_update-${v}`).style.display='inline-block';
    document.querySelector(`.js-save-${v}`).style.display='inline-block';
    document.querySelector(`.js-update-${v}`).style.display='none';
    document.querySelector(`.js-quant-${v}`).style.display='none';
}
//updating method:
function updating(prod_prize,quant_update,elem,i,v){
    totprize += prod_prize * (quant_update-elem.quantity);
    x += (Number(quant_update)-elem.quantity);
    cart[i].quantity=Number(quant_update);
    save_to_local();
    //displaying:
    Recalc_displayALL(x,totprize,totship);
    document.querySelector(`.js-quant-${v}`).innerHTML=quant_update;
    update_hide_save(v);
}
//Deleting an item:
function Delete_Item(prod_name,prizeRemove_num,prod_colo,z){
    let quantRemove_num;
    if(prod_colo === "none"){
        cart.forEach((obj,ind)=>{
            if(obj.productname === prod_name){
                quantRemove_num=obj.quantity;
                cart.splice(ind,1);
                save_to_local();
            }
        });
    }else{
        cart.forEach((obj,ind)=>{
            if(obj.productname === prod_name && obj.color === prod_colo){
                quantRemove_num=obj.quantity;
                cart.splice(ind,1);
                save_to_local();
            }
        });
    }
    document.querySelector(`.js-${z}`).remove();
    //recalc the displ num of items & tototal prize and total shiping
    x = x -quantRemove_num;
    totprize=totprize-quantRemove_num*prizeRemove_num;
    totship = 0;
    cart.forEach((element)=>{
    let ship = element.shipOption;
    totship += ship;
    })
    Recalc_displayALL(x,totprize,totship);
    console.log(cart);
    if(cart.length === 0){
        console.log('empty');
        document.querySelector('.js-empty_cart').style.display="block";
    }
}
// Shiping:
function Shiping (radio,num,n){
        let radioID = radio.dataset.y;
        let radioProdname = radio.dataset.productName;
        let elem_col = radio.dataset.productColor;
        // update date at main product info
        document.querySelector(`.js-div_product_Info-${radioID}`).innerHTML
        =document.querySelector(`.js-Time_info${n}-${radioID}`).innerHTML;
        console.log(document.querySelector(`.js-div_product_Info-${radioID}`).innerHTML);
        console.log(document.querySelector(`.js-Time_info${n}-${radioID}`).innerHTML);
        // update the ship_Option inside the cart
        //check the color:
        if(elem_col === "none"){
            console.log('no color');
            totship = 0;
            cart.forEach((prod,indx)=>{
                if(prod.productname === radioProdname){
                    cart[indx].shipOption = num;
                    save_to_local();
                }
            });
            //recalc the shiping
            totship = 0;
            cart.forEach((element)=>{
                let ship = element.shipOption;
                totship += ship;
            })
            console.log(cart);
            Recalc_displayALL(x,totprize,totship);
        }else{
            console.log('with color');
            totship = 0;
            cart.forEach((prod,indx)=>{
                if(prod.productname === radioProdname && prod.color === elem_col){
                    cart[indx].shipOption = num;
                    save_to_local();
                }
            });
            //recalc the shiping
            totship = 0;
            cart.forEach((element)=>{
                let ship = element.shipOption;
                totship += ship;
            })
            console.log(cart);
            Recalc_displayALL(x,totprize,totship);
        }
}

//empty cart:
function empty_cart(){
    document.querySelector('.js-empty_cart').style.display="block";
    document.querySelector('.js-place').style.opacity="0.6";
    document.querySelector('.js-payment').style.opacity="0.6";
    document.querySelector('.js-paypal').removeEventListener('click',pay_fun);
    document.querySelector('.js-debit').removeEventListener('click',debit);
    document.querySelector('.js-paypal').style.background="#ffc439";
    document.querySelector('.js-paypal').style.cursor="default";
    document.querySelector('.js-debit').style.background="black";
    document.querySelector('.js-debit').style.cursor="default";
    document.querySelector('.js-debit').style.color="rgba(224, 224, 224, 0.993)";
}