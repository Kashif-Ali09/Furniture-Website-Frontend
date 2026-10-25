const products = [
  {id:1,name:"The Haven Sofa",category:"Sofas",price:89500,tag:"BESTSELLER",description:"Soft, inviting, everyday comfort",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80"},
  {id:2,name:"Olive Lounge Chair",category:"Chairs",price:32500,tag:"POPULAR",description:"A quiet corner, made better",image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80"},
  {id:3,name:"Solace Bed Frame",category:"Beds",price:112000,tag:"NEW ARRIVAL",description:"A calmer start and end to your day",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"},
  {id:4,name:"Oak Dining Table",category:"Tables",price:67500,tag:"TIMELESS",description:"Bring everyone a little closer",image:"https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=80"},
  {id:5,name:"Cloud Two-Seater",category:"Sofas",price:74500,tag:"CUSTOMER LOVE",description:"Relaxed shape, generous comfort",image:"https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=900&q=80"},
  {id:6,name:"The Reading Chair",category:"Chairs",price:28900,tag:"SMALL SPACE",description:"Your favourite place to pause",image:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80"},
  {id:7,name:"Linen Dream Bed",category:"Beds",price:98500,tag:"REST & RESET",description:"Simple lines for restful nights",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"},
  {id:8,name:"Everyday Side Table",category:"Tables",price:18500,tag:"JUST RIGHT",description:"A useful detail for any room",image:"https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=80"}
];

const productGrid = document.getElementById("productGrid");
const filterRow = document.getElementById("filterRow");
const searchInput = document.getElementById("searchInput");
const resultsMessage = document.getElementById("resultsMessage");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let activeCategory = "All";
let cartItems = 0;
let toastTimer;

function formatPrice(price) {
  return "Rs. " + price.toLocaleString("en-PK");
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const categoryMatches = activeCategory === "All" || product.category === activeCategory;
    const searchMatches = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(searchTerm);
    return categoryMatches && searchMatches;
  });

  resultsMessage.textContent = `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"} to explore`;
  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state"><h3>No furniture found</h3><p>Try another search or choose a different category.</p></div>';
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-badge">${product.tag}</span>
        <button class="quick-add" data-add="${product.id}" type="button">＋ Add to bag</button>
      </div>
      <div class="product-meta">
        <span class="product-type">${product.category}</span>
        <div class="product-name-row">
          <span class="product-name">${product.name}</span>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <p class="product-desc">${product.description}</p>
      </div>
    </article>
  `).join("");
}

function chooseCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === category);
  });
  renderProducts();
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

filterRow.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (button) chooseCategory(button.dataset.filter);
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => chooseCategory(button.dataset.category));
});

searchInput.addEventListener("input", () => {
  activeCategory = "All";
  document.querySelectorAll(".filter").forEach(button => button.classList.toggle("active", button.dataset.filter === "All"));
  renderProducts();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(item => item.id === Number(button.dataset.add));
  cartItems += 1;
  cartCount.textContent = cartItems;
  showToast(`${product.name} added to your bag`);
});

document.getElementById("cartButton").addEventListener("click", () => {
  showToast(cartItems ? `Your bag has ${cartItems} ${cartItems === 1 ? "item" : "items"}. Demo only — checkout is not connected.` : "Your bag is empty. Add a favourite piece first.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  document.getElementById("newsletterMessage").textContent = `Thanks! ${email} has been added for this demo.`;
  event.target.reset();
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

renderProducts();
