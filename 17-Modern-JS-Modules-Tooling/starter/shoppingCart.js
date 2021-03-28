// Exporting module
console.log("Exporting module");

// Variables declared in a module are scoped to the module. By default this means that all
// top level variables are private within this module.
const shippingCost = 10;
const cart = [];

// Named export
export const addToCart = function(product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };