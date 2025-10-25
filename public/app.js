
// Inline message instead of alert
function showMessage(text, color = "red") {
  const msg = document.getElementById("messageBox");
  msg.textContent = text;
  msg.style.color = color;

 
  setTimeout(() => {
    msg.textContent = "";
  }, 2000);
}

// Load products from server
async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    const products = await res.json();
    productList.innerHTML = "";
    products.forEach((p) => {
      const li = document.createElement("li");
     li.textContent = `${p.id}. ${p.name} | ${p.quantity} | ${p.description}`;


      productList.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
    showMessage("⚠️ Failed to load products.", "red");
  }
}

// ✅ Add product
addBtn.addEventListener("click", async () => {
  const name = document.getElementById("productName").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const description = document.getElementById("description").value.trim();

  if (!name || !quantity) {
    showMessage("⚠️ Please fill in both Product Name and Quantity!", "red");
    return;
  }

  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, description }),
    });

    if (!res.ok) {
      showMessage("❌ Failed to add product!", "red");
      return;
    }

    const product = await res.json();
    console.log("✅ Product Added:", product);
    showMessage("✅ Product added successfully!", "green");
    loadProducts();

    // Clear inputs
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("description").value = "";
  } catch (err) {
    console.error("Failed to add product:", err);
    showMessage("❌ Server error — try again later!", "red");
  }
});


loadProducts();
