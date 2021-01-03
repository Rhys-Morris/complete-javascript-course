'use strict';

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}!`);
  };
};

greet('Hello')('Rhys');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Rhys');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// // This is now a regular function expression which breaks the this keyword --> now set to undefined as not being called on an object
const book = lufthansa.book;
// book(23, 'Sarah'); // This will throw an error

book.call(eurowings, 23, 'Sarah');
console.log(eurowings.bookings);

// We can use the call method on functions to explicitly set the this keyword on any funtion we wish to call
// In this scenario we have passed the book function the eurowings object on which 'this' is bound.

const addTax = rate => value => {
  return value + value * rate;
};

const taxVAT = addTax(0.23);

console.log(taxVAT(100));

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let printPrompt = '';
    printPrompt += `${this.question}\n`;
    this.options.forEach(option => (printPrompt += `${option}\n`));
    const answer = Number(prompt(`${printPrompt}`));
    if (typeof answer === 'number' && answer < 4 && answer > 0) {
      this.answers[answer]++;
    }
    this.displayResults();
  },
  displayResults(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string') {
      console.log(`The poll results are: ${this.answers.join(' ')}`);
    }
  },
};

const pollButton = document.querySelector('.poll');
pollButton.addEventListener('click', poll.registerNewAnswer.bind(poll));

const arr1 = [5, 2, 3];
const arr2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: arr2 }, 'string');

// Immediately Invoked Function Expression IIFE
(function () {
  // Private variable - encapsulated
  const isPrivate = 23;
  console.log('This will never run again!');
})();

(() => {
  console.log("Also I won't run again");
})();

// IIFE's are not used often anymore because we can create closures inside of block scope w/ let and const

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

// Closure allows a function to remember and access the variable environment that was present at creation
// Despite the fact that the execution context for secureBooking has left the callstack, when booker is subsequently invoked
// The closure is the variable environment attached to the function, exactly as it was at the time and placce the function was created
// CLosure has priority over scope chain!
booker();

// Allows us to look at the closure variable environment within the console
console.dir(booker);

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
