'strict mode';

const shoppingCart = Object.freeze([
  { product: 'bread', quantity: 6 },
  { product: 'pizza', quantity: 2 },
  { product: 'milk', quantity: 4 },
  { product: 'water', quantity: 10 },
]);

const allowedItems = Object.freeze({
  lisbon: 5,
  others: 7,
});

const checkMaximumQuantity = function (cart, allowedItems, city) {
  // Guard
  if (!cart.length) return [];

  const maximumQuantity = allowedItems?.[city] ?? allowedItems.others;

  return cart.map(item => {
    const { product, quantity } = item;
    return {
      product,
      quantity: quantity > maximumQuantity ? maximumQuantity : quantity
    };
  });
};

const updatedShoppingCart = checkMaximumQuantity(
  shoppingCart,
  allowedItems,
  'lisbon'
);

console.log(updatedShoppingCart);
console.log(shoppingCart);

const createOrderDescription = (cart) => {
  const [{ product: p, quantity: q }] = cart;

  return `Order with ${q} ${p}, ${cart.length > 1 ? 'etc...' : '.'}`
};

console.log(createOrderDescription(updatedShoppingCart));

