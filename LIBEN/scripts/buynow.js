const buyNow = document.querySelectorAll(".buy-now");

buyNow.forEach((item) => {
  item.addEventListener("click", () => {
    const phoneNumber = '2348161283017';
    const items = Array.isArray(cartItemsList) ? cartItemsList.map(item => `* PRODUCT NAME: ${item.name} \n PRODUCT PRICE: ${item.price} \n\n ` ).join(' ') : cartItemsList;
    const message = `I WANT TO BUY: \n ${items} \n\n TOTAL PRICE: ${totalPrice()}`
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappURL, '_blank');
  });
});