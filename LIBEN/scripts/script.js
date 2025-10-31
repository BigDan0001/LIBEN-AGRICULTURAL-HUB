const form = document.querySelector("form");
const toggle = document.getElementById("toggle");
const toggleCarts = document.querySelectorAll(".toggleCart");
const nav = document.getElementById("main-nav");
const searchInput = document.getElementById("search-input");
const products = document.querySelectorAll(".product");
const noResults = document.getElementById("no-results");
const button = document.querySelector(".searchBtn");
const cartSection = document.querySelector(".cart-section");
const mainSection = document.querySelector(".main-section");
const backHome = document.getElementById("back-home");
const addItemToCartBtn = document.querySelectorAll(".add-to-cart");
const cartContainer = document.querySelector(".cartItems");
const orderBtn = document.querySelector(".orderBtn");
const noItem = document.getElementById("no-item");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function menuNav() {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");

    if (toggle.classList.contains("fa-bars")) {
      toggle.classList.remove("fa-bars");
      toggle.classList.add("fa-xmark");
    } else {
      toggle.classList.remove("fa-xmark");
      toggle.classList.add("fa-bars");
    }
  });
}
menuNav();

function cartPage() {}
cartPage();

function searchProduct() {
  searchInput.addEventListener("input", () => {
    const searchItem = searchInput.value.toLowerCase();
    let anyVisible = false;
    console.log(searchItem);

    products.forEach((product) => {
      const nameOfProduct = product.querySelector(".product-name");
      const productName = nameOfProduct
        ? nameOfProduct.textContent.toLowerCase()
        : "";

      if (productName.includes(searchItem)) {
        product.style.display = "flex";
        anyVisible = true;
      } else {
        product.style.display = "none";
      }
    });
    noResults.style.display = anyVisible ? "none" : "flex";
  });
}
searchProduct();

toggleCarts.forEach((toggleCart) => {
  toggleCart.addEventListener("click", () => {
    if (mainSection.style.display !== "none") {
      mainSection.style.display = "none";
      cartSection.style.display = "flex";
    }
  });
});

backHome.addEventListener("click", () => {
  if (cartSection.style.display === "flex") {
    cartSection.style.display = "none";
    mainSection.style.display = "flex";
  }
});

addItemToCartBtn.forEach((addItemToCart) => {
  addItemToCart.addEventListener("click", (e) => {
    const product = e.target.closest(".product");

    const productImgSrc = product.querySelector(".product-img img").src;
    const productName = product.querySelector(".product-name").textContent;
    const productPrice = product.querySelector(".product-price").textContent;
    const newItem = {
      name: productName,
      price: `# ${productPrice} (naira)`,
      image: productImgSrc,
    };

    //Avoid duplicate item
    const itemAlreadyInCart = cartItemsList.some(
      (item) => item.name === productName
    );
    if (itemAlreadyInCart) {
      
      showAlert(`${productName} already in cart`);
      return;
    }

    addToCart(productName);
    cartItemsList.push(newItem);
    cartLength()
    displayCart();
    totalPrice();
    saveCart()
  });
});

function addToCart(productName) {
  const added = `Added ${productName} to cart`;
  showAlert(added);
}

function displayCart() {
  

  if (cartItemsList.length === 0) {
    noItem.style.display = "flex";
    cartContainer.style.display = "none";
    orderBtn.style.display = "none";
    return;
  } else {
    noItem.style.display = "none";
    cartContainer.style.display = "flex";
    orderBtn.style.display = "flex";
  }
cartContainer.innerHTML = "";
  cartItemsList.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem");
    cartItem.innerHTML = `
      <div class="product-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="product-details">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-price">${item.price}</p>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItemsList.splice(index, 1);
      displayCart();
      cartLength()
      totalPrice()
      saveCart()
    });
  });
}

function showAlert(message, duration = 2000){  
const alert = document.querySelector('.alert');
  alert.textContent = message;
  alert.classList.add('show');

  setTimeout(() => {
    alert.classList.remove('show')
  }, duration)
}

function cartLength() {
  const circles = document.querySelectorAll('.circle');
  circles.forEach(circle => {
    circle.textContent = cartItemsList.length;
  })
  
}

function saveCart() {
  sessionStorage.setItem('cartItems', JSON.stringify(cartItemsList));
}

