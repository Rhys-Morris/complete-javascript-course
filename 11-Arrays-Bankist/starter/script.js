'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // /////////////////////////////////////////////////

// const eurToUsd = 1.1;

// const movementsUsd = movements.map(val => val * eurToUsd)

// console.log(movements);
// console.log(movementsUsd);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(val, key, map) {
//   console.log(`${key}: ${val}`);
//   console.log(map);
// })

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR'])
// console.log(currenciesUnique);

// // Keep the same 3 parameters, however, argument 1 is equal to argument 2 --> both are set to the value
// // Underscore = throwaway value
// currenciesUnique.forEach(function(val, _, set) {
//   console.log(`${val}`);
//   console.log(...set);
// })

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

*/

// const checkDogs = function(arr1, arr2) {
//   const copyArr1 = arr1.slice(1, -1);
//   const total = [...copyArr1, ...arr2]
//   total.forEach((dog, i) => {
//     const lifeStage = dog < 2 ? "still a puppy" : `an adult, and is ${dog} years old`;
//     console.log(`Dog number ${i + 1} is ${lifeStage}`);
//   })
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
// console.log(`---- DATASET 2 -----`);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4])

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
// */

// const calcAverageHumanAge = function (array) {
//   return array
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(humanAge => humanAge >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let sortedMovements = false;

// ---- HELPER FUNCTIONS -----

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const transaction = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${transaction}">${
      i + 1
    } ${transaction}</div>
      <div class="movements__value">${mov} EUR</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(acct => {
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummary = function (acct) {
  const income = acct.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  const expenses = acct.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest =
    acct.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr) *
    (acct.interestRate / 100);

  labelSumIn.textContent = `${income} EUR`;
  labelSumOut.textContent = `${Math.abs(expenses)} EUR`;
  labelSumInterest.textContent = `${interest} EUR`;
};

const updatePage = function () {
  displayMovements(currentAccount.movements);
  calcDisplaySummary(currentAccount);
  calcDisplayBalance(currentAccount.movements);
};

const login = function (username, pin) {
  const user = accounts.find(
    acct => acct.username === username && acct.pin === Number(pin)
  );

  // If no user print error message and exit
  if (!user) {
    console.log('Invalid username or password!');
    return;
  }

  // Set current user and update UI
  currentAccount = user;

  labelWelcome.textContent = `Welcome back, ${user.owner.split(' ')[0]}`;
  containerApp.style.opacity = 1;
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();
  updatePage();
};

const transfer = function (recipientAccount, transferAmount) {
  // Find target account and check current balance
  const targetAccount = accounts.find(acct => acct.owner === recipientAccount);
  const currentBalance = currentAccount.movements.reduce(
    (acc, curr) => acc + curr,
    0
  );
  currentAccount.balance = currentBalance;

  // Check valid transfer
  if (!targetAccount) {
    console.log(`No account name: ${recipientAccount}`);
    return;
  } else if (currentBalance < transferAmount || transferAmount <= 0) {
    console.log(`Insufficient funds or invalid transfer amount`);
    return;
  } else {
    targetAccount.movements.push(Number(transferAmount));
  }

  // Update withdrawal history in current acount
  currentAccount.movements.push(Number(-transferAmount));
  currentAccount.balance -= Number(transferAmount);

  // Update UI
  updatePage();
};

const closeAccount = function (user, pin) {
  const targetAccount = accounts.find(
    acct => acct.username === user && acct.pin === pin
  );

  if (!targetAccount) {
    console.log(`Attempting to close account that does not exist: ${user}`);
    return;
  } else if (targetAccount !== currentAccount) {
    console.log(`Attempting to delete account that is not current user`);
    return;
  }

  let targetIndex = accounts.findIndex(acct => acct === targetAccount);
  accounts.splice(targetIndex, 1);

  containerApp.style.opacity = 0;
  labelWelcome.textContent = `Log in to get started`;
  inputCloseUsername = inputClosePin = '';
};

const requestLoan = function (amount) {
  if (currentAccount.movements.some(deposit => deposit > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updatePage();
  } else {
    console.log(`Ineligible for loan`);
    return;
  }
};

const sortMovements = function (mov) {
  if (sortedMovements === false) {
    let copy = mov.slice(0);
    const sorted = copy.sort((a, b) => (a > b ? 1 : -1));
    displayMovements(sorted);
  } else {
    displayMovements(mov);
  }
  sortedMovements = !sortedMovements;
};

// ----- EVENT LISTENERS -----

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  login(inputLoginUsername.value, inputLoginPin.value);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  transfer(inputTransferTo.value, inputTransferAmount.value);
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  closeAccount(inputCloseUsername.value, Number(inputClosePin.value));
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  requestLoan(Number(inputLoanAmount.value));
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortMovements(currentAccount.movements);
});

const randArr = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 6));
console.log(randArr);

// const movements = account1.movements;

// // First parameter = accumulator, second parameter = current value we're iterating on
// const balance = movements.reduce((acc, curr, i, arr) => acc + curr, 0);

// console.log(balance);

// Find max value of an array using reduce
// const maxValue = account1.movements.reduce((acc, curr) =>
//   acc > curr ? acc : curr
// );

// console.log(maxValue);

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));
console.log(dogs);

//2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
if (sarahDog.curFood > sarahDog.recommendedFood * 1.1) {
  console.log('Eating too much!');
} else if (sarahDog.curFood < sarahDog.recommendedFood * 0.9) {
  console.log('Eating too little!');
} else {
  console.log('Appropriate food intake');
}

//3
const overeatingDogsOwners = dogs
  .filter(dog => dog.recommendedFood * 1.1 < dog.curFood)
  .map(dog => dog.owners);
const undereatingDogsOwners = dogs
  .filter(dog => dog.recommendedFood * 0.9 > dog.curFood)
  .map(dog => dog.owners);

//4
const string1 = overeatingDogsOwners.flat().join(' and ');
console.log(`${string1}'s dogs eat too much!`);
const string2 = undereatingDogsOwners.flat().join(' and ');
console.log(`${string2}'s dogs eat too little!`);

//5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//6
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

// 7
let eatingWell = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(eatingWell);

//8
let copyDogs = dogs.slice();
copyDogs.sort((a, b) => {
  return a.recommendedFood > b.recommendedFood ? 1 : -1;
});
console.log(copyDogs);
