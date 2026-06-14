const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  mobileMenu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
  );
}

const products = [
  { name: "Laptop",     price: 45000, inStock: true,  category: "electronics", image: "assets/image.png" },
  { name: "Shirt",      price: 1200,  inStock: false, category: "clothing",    image: "assets/image1.png" },
  { name: "Phone",      price: 25000, inStock: true,  category: "electronics", image: "assets/image1.png" },
  { name: "Shoes",      price: 3500,  inStock: true,  category: "clothing",    image: "assets/image2.png" },
  { name: "Tablet",     price: 18000, inStock: false, category: "electronics", image: "assets/image2.png" },
  { name: "Watch",      price: 8000,  inStock: true,  category: "accessories", image: "assets/watch.png" },
  { name: "Bag",        price: 2200,  inStock: true,  category: "accessories", image: "assets/powerbank.png" },
  { name: "Headphones", price: 3000,  inStock: true,  category: "electronics", image: "assets/headphones.png" },
];


const filtered = products.filter(p => p.inStock && p.price < 10000);

const grouped = filtered.reduce((acc, p) => {
  if (!acc[p.category]) acc[p.category] = [];
  acc[p.category].push({ name: p.name, price: p.price });
  return acc;
}, {});

const totalValue = filtered.reduce((sum, p) => sum + p.price, 0);

console.log("Filtered:", filtered);
console.log("Grouped:", grouped);
console.log("Total Value:", totalValue);

const groupedOut = document.getElementById("groupedOut");
const totalOut = document.getElementById("totalOut");
if (groupedOut) groupedOut.textContent = JSON.stringify(grouped, null, 2);
if (totalOut)   totalOut.textContent = `Total Value: ₹${totalValue.toLocaleString("en-IN")}`;

/* =========================================================
   Challenge 2 — Dynamic Product Cards + Sort Toggle
   ========================================================= */
const inStockProducts = products.filter(p => p.inStock);
const grid = document.getElementById("dynamicGrid");
const sortBtn = document.getElementById("sortBtn");
const sortIcon = document.getElementById("sortIcon");
let sortAsc = true;

const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

const badgeClass = (cat) => ({
  electronics: "badge badge-electronics",
  clothing:    "badge badge-mobile",
  accessories: "badge badge-accessories",
}[cat] || "badge badge-electronics");

function renderCards() {
  if (!grid) return;
  const sorted = [...inStockProducts].sort((a, b) =>
    sortAsc ? a.price - b.price : b.price - a.price
  );

  grid.innerHTML = sorted.map((p, i) => `
    <article class="product-card bg-white rounded-2xl shadow p-4 animate-fade-up" style="animation-delay:${i * 60}ms">
      <div>
        <div class="overflow-hidden rounded-xl bg-gray-50 aspect-square flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-2" />
        </div>
        <div class="mt-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">${p.name}</h3>
          <span class="${badgeClass(p.category)}">${p.category}</span>
        </div>
      </div>
      <div class="mt-auto">
        <p class="font-bold text-blue-600 mt-2 text-lg">${formatPrice(p.price)}</p>
        <button class="btn-primary w-full text-white py-2 rounded-lg font-medium mt-3">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

if (sortBtn) {
  sortBtn.addEventListener("click", () => {
    sortAsc = !sortAsc;
    if (sortIcon) sortIcon.textContent = sortAsc ? "↑" : "↓";
    renderCards();
  });
}

renderCards();

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));
