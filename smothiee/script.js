// Define an empty object to store the selected smoothie details.
let selectedSmoothie = {};

// Function to display the order details for a selected smoothie.
function displayOrderDetails(name) {
  // Set the name of the selected smoothie in the selectedSmoothie object.
  selectedSmoothie.name = name;
  document.getElementById("selectedSmoothieName").textContent = name;

  // Generates the image path for the selected smoothie based on its name, and update the image source.
  const smoothieImageName = name.toLowerCase().replace(/\s/g, '');
  selectedSmoothie.imgPath = `images/${smoothieImageName}.png`;
  document.getElementById("selectedSmoothieImage").src = selectedSmoothie.imgPath;
}

// Constructor function for creating a Smoothie object.
function Smoothie(size, quantity, topUps) {
  // Set properties of the Smoothie object based on provided inputs.
  this.size = size;
  this.quantity = quantity;
  this.topUps = topUps;

  // Method to calculate the total cost of the smoothie, including tax.
  this.calculateCost = function () {
    // Initialize the cost variable.
    let cost = 0;

    // Calculate the base cost of the smoothie based on its size.
    if (this.size === "Small") {
      cost = 2.99;
    } else if (this.size === "Medium") {
      cost = 4.99;
    } else if (this.size === "Large") {
      cost = 5.99;
    }

    // Multiply the base cost by the quantity of smoothies ordered.
    cost *= this.quantity;

    // Add additional costs based on selected top-ups.
    if (this.topUps.includes("Fruit")) {
      cost += 1.5;
    }
    if (this.topUps.includes("Protein")) {
      cost += 2.5;
    }
    if (this.topUps.includes("Nuts")) {
      cost += 2;
    }

    // Add tax to the total cost (13% tax rate).
    cost *= 1.13;

    // Return the total cost formatted with two decimal places.
    return cost.toFixed(2);
  };

  // Method to generate the order message and display a thank-you message.
  this.getMessage = function () {
    // Display the thank-you message element on the page.
    document.getElementById("thankyou").style.display = "block";

    // Construct the order message with selected smoothie details and cost.
    return `You've created a ${this.size} size of ${selectedSmoothie.name}, ${this.quantity} smoothies with the following boosts: ${this.topUps.join(", ")}. Your total came to:  " $${this.calculateCost()} plus tax "`;
  };

  // Method to generate an error message when smoothie details are incomplete.
  this.getErrorMessage = function () {
    // Hide the thank-you message element on the page.
    document.getElementById("thankyou").style.display = "none";

    // Return the error message.
    return "Please select a smoothie size and quantity before creating your custom blend.";
  };
}

// Function to get the selected values from input elements.
function getSelectedValue(inputName) {
  // Get all checked input elements with the given name attribute.
  const selectedElements = document.querySelectorAll(`input[name="${inputName}"]:checked`);
  return Array.from(selectedElements).map((el) => el.value);
}

// Add a form submit event listener to process the smoothie order.
document.getElementById("smoothieOrderForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  // Get the selected size, quantity, and top-ups for the smoothie order.
  const size = getSelectedValue("size")[0];
  const quantity = document.getElementById("quantity").value;
  const topUps = getSelectedValue("topUps");

  // Check if all required inputs are filled and a smoothie image is selected.
  if (size && quantity && selectedSmoothie.imgPath) {
    // If all information is provided, create a new Smoothie object.
    const smoothie = new Smoothie(size, quantity, topUps);
    document.getElementById("output").textContent = smoothie.getMessage();
  } else {
    // If any information is missing, create a default Smoothie object.
    const smoothie = new Smoothie();
    document.getElementById("output").textContent = smoothie.getErrorMessage();
  }
});
