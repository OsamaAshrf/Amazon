export let cart=JSON.parse(localStorage.getItem('cart2')) || [{
    productname: "Blackpink Printed Logo T-shirt",
    quantity:1,
    shipOption: 0,
    color: "none"
}];

export function save_to_local(){
    localStorage.setItem('cart2', JSON.stringify(cart));
}