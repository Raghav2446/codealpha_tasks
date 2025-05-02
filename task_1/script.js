const products = [
    { id: 1, name: "Eco-Friendly Notebook", price: 12.99, img: "https://www.mop.com.sg/wp-content/uploads/2020/10/eco-notepad-7-green-2.jpg" },
    { id: 2, name: "Reusable Water Bottle", price: 19.99, img: "https://i5.walmartimages.com/seo/MILTON-6-Pc-Reusable-Water-Bottles-Bulk-Pack-12-Oz-Plastic-Bottles-with-Caps-Blue_b207039c-28fa-4b19-b273-5cb7fe3d891a.a3474d3c765ebb4e5309beecfb105657.jpeg" },
    { id: 3, name: "Bamboo Toothbrush Set", price: 7.49, img: "https://m.media-amazon.com/images/I/818HQZIZgZL._SL1500_.jpg" },
    { id: 4, name: "Organic Cotton Bag", price: 5.99, img: "https://i.etsystatic.com/16345621/r/il/f95c75/1392702151/il_fullxfull.1392702151_r1ly.jpg" },
    { id: 5, name: "Natural Skincare Soap", price: 4.99, img: "https://images.indianexpress.com/2021/10/Pixabay_soap-bar_1200.jpg" },
    { id: 6, name: "Wooden Sunglasses", price: 29.99, img: "https://cdn.shopify.com/s/files/1/0941/2500/collections/the_hipster_wooden_sunglasses_woodgeek_1600_px_cadefbcb-b90e-432e-8b9e-6a5f6a1ffe12_2048x.jpg?v=1563415321" }
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');
  const totalDiv = document.getElementById('total');
  
  function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      const img = document.createElement('img');
      img.src = product.img;
      img.alt = product.name;
      img.onload = () => img.classList.add('loaded');
      img.onerror = () => img.src = 'https://via.placeholder.com/240x180?text=Image+Not+Found'; // Fallback image on error
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      div.insertBefore(img, div.firstChild); // Insert the image at the start
      productList.appendChild(div);
    });
  }
  
  function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <strong>${item.name}</strong>
        <p>Price: $${item.price} × ${item.quantity}</p>
        <div class="cart-item-controls">
          <button onclick="decreaseQuantity(${index})">−</button>
          <button onclick="increaseQuantity(${index})">+</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartList.appendChild(div);
    });
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCart();
  }
  
  function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
  }
  
  function increaseQuantity(index) {
    cart[index].quantity++;
    renderCart();
  }
  
  function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      removeItem(index);
    }
    renderCart();
  }
  
  function checkout() {
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment-method').value;
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }
    setTimeout(() => {
      alert(`✅ Thank you for your order!\n🏠 Delivering to: ${address}\n💳 Payment: ${payment}`);
      cart = [];
      localStorage.removeItem("cart");
      renderCart();
      document.getElementById('address').value = '';
    }, 500);
  }
  
  renderProducts();
  renderCart();
  