'use strict';

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',

  printGoals: function (...playerNames) {
    let sum = 0;
    playerNames.forEach(player => {
      sum += 1;
      console.log(`Goal for ${player}. Total goals: ${sum}`);
    });
  },

  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const {
  players: [players1, players2],
} = game;

console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Perisisc', 'Coutinho'];
console.log(players1Final);

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

game.printGoals('Thiago', 'Coutinho', 'Reus');

team1 < team2 && console.log('Team 1 favourites');
team2 < team1 && console.log('Team 2 favourites');

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  restaurantGuests: 0,

  // This evaluates to the object restaurant.
  orderItem(starter, main) {
    console.log(
      `Starter: ${this.starterMenu[starter - 1]}, Main: ${
        this.mainMenu[main - 1]
      }`
    );
    return [this.starterMenu[starter - 1], this.mainMenu[main - 1]];
  },

  // Evaluates this to lexical scope thus the window object when invoked
  testArrow: () => {
    console.log(this);
  },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const [index, item] of menu.entries()) {
  console.log(`${index + 1}: ${item}`);
}

// Nullish coalescing operator (??) - checks for nullish values only to evalute as false not falsey
// 0 and '' will evaluate as true
const guests = restaurant.restaurantGuests ?? 10;
console.log(guests);

const [myStarter, myMain] = restaurant.orderItem(2, 1);
console.log(myStarter, myMain);

restaurant.testArrow();

// Optional chaning. If object key is not found then will evaluate to undefined, rather than continuing chain and throwing an error
console.log(restaurant.openingHours?.fri?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`${day}: ${open}`);
}

// const users = [
//   {
//     name: 'Jonas',
//     age: 31,
//   },
// ];

const users = [];

console.log(users[0]?.name ?? 'User array is empty');

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const entries = Object.entries(openingHours);

console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open ${open} to ${close}`);
}

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1
for (const [goal, player] of game.scored.entries()) {
  console.log(`Goal ${goal + 1}: ${player}`);
}

// 2
let averageOdds = 0;
for (const odds of Object.values(game.odds)) {
  averageOdds += odds;
}
averageOdds = averageOdds / Object.values(game.odds).length;
console.log(averageOdds);

// 3
for (const [team, odds] of Object.entries(game.odds)) {
  game[team] && console.log(`Odds of victory ${game[team]}: ${odds}`);
  game[team] || console.log(`Odds of draw: ${odds}`);
}

// 4
let scorers = {};
for (const [goal, player] of game.scored.entries()) {
  scorers[player] ? (scorers[player] += 1) : (scorers[player] = 1);
}
console.log(scorers);

const orderSet = new Set([
  'Pizza',
  'Pasta',
  'Pizza',
  'Garlic Bread',
  'Pasta',
  'Garlic Bread',
]);

console.log(orderSet);
console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
orderSet.add('Risotto');
console.log(orderSet);
orderSet.delete('Pizza');
console.log(orderSet);
// orderSet.clear();

// Can not retrieve items from a set with index - non-indexed!
// Only need sets for seeing whether an item is present
// Main use case is to delete duplicate values of arrays

const staff = ['Waiter', 'Chef', 'Chef', 'Waiter', 'Manager'];
const uniqueStaffSize = new Set(staff).size;
const uniqueStaff = [...new Set(staff)];
console.log(uniqueStaffSize);
console.log(uniqueStaff);

// Creating new map without lots of set()
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);

// App

// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }
// const answer = Number(prompt());
// console.log(question.get(answer === question.get('correct')));

// When to use a specific data structure?

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

console.log(
  `An event happend, on average, every ${90 / gameEvents.size} minutes`
);

for (const [minute, event] of gameEvents) {
  minute < 45 && console.log(`[FIRST HALF] ${minute}: ${event}`);
  minute > 45 && console.log(`[SECOND HALF] ${minute}: ${event}`);
}

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!
*/

function convertSnake(string) {
  let convertedStr = '';
  const splitStr = string.trim().toLowerCase().split('_');
  for (let [i, word] of splitStr.entries()) {
    if (i > 0) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    convertedStr = convertedStr + word;
  }
  return convertedStr;
}

console.log(convertSnake('underscore_case'));
console.log(convertSnake(' first_name'));
console.log(convertSnake('Some_Variable '));
console.log(convertSnake('  calculate_AGE'));
console.log(convertSnake('delayed_departure'));
