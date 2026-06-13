const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

const products = [
    {
        name: "Gaming Laptop",
        price: 79999,
        inStock: true,
        category: "laptop"
    },
    {
        name: "Smartphone Pro",
        price: 49999,
        inStock: true,
        category: "mobile"
    },
    {
        name: "Tablet X",
        price: 29999,
        inStock: false,
        category: "tablet"
    },
    {
        name: "Smart Watch",
        price: 8000,
        inStock: true,
        category: "accessories"
    },
    {
        name: "Power Bank",
        price: 2200,
        inStock: true,
        category: "accessories"
    },
    {
        name: "Headphones",
        price: 3000,
        inStock: true,
        category: "accessories"
    }
];

const filteredProducts = products.filter(product =>
    product.inStock && product.price < 10000
);

const groupedProducts = filteredProducts.reduce((acc, product) => {

    if (!acc[product.category]) {
        acc[product.category] = [];
    }

    acc[product.category].push({
        name: product.name,
        price: product.price
    });

    return acc;

}, {});

const totalValue = filteredProducts.reduce(
    (sum, product) => sum + product.price,
    0
);

console.log("Filtered Products:", filteredProducts);
console.log("Grouped Products:", groupedProducts);
console.log("Total Value:", totalValue);

const outputSection = document.createElement("section");

outputSection.className = "max-w-7xl mx-auto px-6 pb-16";

outputSection.innerHTML = `
    <h2 class="text-3xl font-bold text-center mb-8">
        JavaScript Challenge Output
    </h2>

    <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">
            Grouped Products
        </h3>

        <pre class="bg-gray-100 p-4 rounded overflow-auto">${JSON.stringify(groupedProducts, null, 2)}</pre>

        <h3 class="text-xl font-semibold mt-6">
            Total Value: ₹${totalValue}
        </h3>
    </div>
`;

document.querySelector("footer").before(outputSection);