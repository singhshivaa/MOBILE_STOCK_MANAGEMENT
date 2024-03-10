let mobileStock = [];
let isStockVisible = true;

// Load data from local storage on page load
window.onload = function () {
  const storedStock = localStorage.getItem('mobileStock');
  if (storedStock) {
    mobileStock = JSON.parse(storedStock);
    showStock();
  }
};

function toggleStockDisplay() {
  isStockVisible = !isStockVisible;
  showStock();
}

function addStock() {
  const brand = document.getElementById("mb").value;
  const model = document.getElementById("mm").value;
  const color = document.getElementById("mc").value;
  const variant = document.getElementById("mv").value;
  const price = document.getElementById("mp").value;

  if (!brand || !model || !color || !variant || !price) {
    alert("Please fill in all fields");
    return;
  }

  const mobile = {
    brand: brand,
    model: model,
    color: color,
    variant: variant,
    price: price
  };

  mobileStock.push(mobile);

  updateLocalStorage(); // Save to local storage
  showStock(); // Call showStock function to update the dashboard

  clearInputs(); // Move clearInputs call here

  displayMessage("Brand added successfully", true);
}

function removeStock() {
  const brandToRemove = document.getElementById("mb").value;

  if (!brandToRemove) {
    console.log("Please enter the brand to remove");
    displayMessage("Please enter the brand to remove", false);
    return;
  }

  console.log("Brand to remove:", brandToRemove);

  const indexToRemove = mobileStock.findIndex(
    (mobile) => mobile.brand.toLowerCase() === brandToRemove.toLowerCase()
  );

  if (indexToRemove !== -1) {
    mobileStock.splice(indexToRemove, 1);
    console.log("Brand removed successfully");
    updateLocalStorage(); // Save to local storage
    showStock(); // Call showStock function to update the dashboard
    displayMessage("Brand removed successfully", true);
  } else {
    console.log("Brand not found in stock");
    displayMessage("Brand not found in stock", false);
  }

  clearInputs();
}

function updateStock() {
  const brandToUpdate = document.getElementById("mb").value;

  if (!brandToUpdate) {
    console.log("Please enter the brand to update");
    displayMessage("Please enter the brand to update", false);
    return;
  }

  console.log("Brand to update:", brandToUpdate);
  console.log("Stock after update:");

  const indexToUpdate = mobileStock.findIndex(
    (mobile) => mobile.brand.toLowerCase() === brandToUpdate.toLowerCase()
  );

  if (indexToUpdate !== -1) {
    const updatedModel = document.getElementById("mm").value;
    const updatedColor = document.getElementById("mc").value;
    const updatedVariant = document.getElementById("mv").value;
    const updatedPrice = document.getElementById("mp").value;

    if (updatedModel) mobileStock[indexToUpdate].model = updatedModel;
    if (updatedColor) mobileStock[indexToUpdate].color = updatedColor;
    if (updatedVariant) mobileStock[indexToUpdate].variant = updatedVariant;
    if (updatedPrice) mobileStock[indexToUpdate].price = updatedPrice;

    console.log("Product details updated successfully");
    updateLocalStorage(); // Save to local storage
    showStock(); // Call showStock function to update the dashboard
    displayMessage("Product details updated successfully", true);
  } else {
    console.log("This Brand is not available in our Stock");
    displayMessage("This Brand is not available in our Stock", false);
  }

  mobileStock.forEach((mobile) => {
    console.log(`Brand: ${mobile.brand}, Model: ${mobile.model}, Color: ${mobile.color}, Variant: ${mobile.variant}, Price: ${mobile.price}`);
  });

  clearInputs();
}

function searchBrand() {
  const brandToSearch = document.getElementById("mb").value;

  if (!brandToSearch) {
    console.log("Please enter the brand to search");
    displayMessage("Please enter the brand to search", false);
    return;
  }

  console.log("Searching for brand:", brandToSearch);
  const foundMobile = mobileStock.find(
    (mobile) => mobile.brand.toLowerCase() === brandToSearch.toLowerCase()
  );

  if (foundMobile) {
    console.log("Brand found in stock:", foundMobile);
    displayMessage(`Brand found in stock: ${foundMobile.brand}`, true);

    // Display the found brand details in the placeholder
    document.getElementById("mb").value = foundMobile.brand;
    document.getElementById("mm").value = foundMobile.model;
    document.getElementById("mc").value = foundMobile.color;
    document.getElementById("mv").value = foundMobile.variant;
    document.getElementById("mp").value = foundMobile.price;
  } else {
    console.log("Brand not found in stock");
    displayMessage("Brand not found in stock", false);
  }
}
 

function showStock() {
  const stockDisplay = document.getElementById("stockDisplay");

  if (isStockVisible) {
    let stockHTML = "<div class='stock-container'>";
    
    mobileStock.forEach((mobile) => {
      stockHTML += `
        <div class="stock-item">
          <div class="stock-property">Brand:</div>
          <div>${mobile.brand}</div>
          <div class="stock-property">Model:</div>
          <div>${mobile.model}</div>
          <div class="stock-property">Color:</div>
          <div>${mobile.color}</div>
          <div class="stock-property">Variant:</div>
          <div>${mobile.variant}</div>
          <div class="stock-property">Price:</div>
          <div>${mobile.price}</div>
        </div>
      `;
    });
    
    stockHTML += "</div>";
    stockDisplay.innerHTML = stockHTML;
  } else {
    stockDisplay.innerHTML = "";
  }
}



function clearInputs() {
  document.getElementById("mb").value = "";
  document.getElementById("mm").value = "";
  document.getElementById("mc").value = "";
  document.getElementById("mv").value = "";
  document.getElementById("mp").value = "";
}

function displayMessage(message, isSuccess) {
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.innerHTML = message;

  if (isSuccess) {
    messageContainer.style.color = "green";
  } else {
    messageContainer.style.color = "red";
  }

  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 5000); // Clear the message after 5 seconds
}

function updateLocalStorage() {
  localStorage.setItem('mobileStock', JSON.stringify(mobileStock));
}
