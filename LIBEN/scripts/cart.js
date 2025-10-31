let cartItemsList = [
 /*  {
    name: 'productName',
    price: `# 4000 (naira)`,
    image: 'img/iru1.jpg'
  },
  {
    name: 'productName',
    price: `# 7000 (naira)`,
    image: 'img/iru1.jpg'
  },
  {
    name: 'productName',
    price: `# 9000 (naira)`,
    image: 'img/iru1.jpg'
  } */
];

const itemsTotalPrice = document.querySelector('.itemsTotalPrice')

const savedCart = sessionStorage.getItem('cartItems');
if (savedCart) {
  cartItemsList = JSON.parse(savedCart);
}
displayCart()
cartLength()
totalPrice()


function totalPrice(){
    const total = cartItemsList.reduce((sum, item) => {
  const numericPrice = Number(item.price.replace(/[^0-9]/g, ''));
  return sum + numericPrice;
}, 0);
itemsTotalPrice.textContent = total;
return total;
}


