'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Synchronous code - executed line by line
// Most of the time synchronous code is fine

// Asynchronous code - not occurring at the same time
// Example is the setTimeout function - wait s a certain amount fo time before executing a callback function, however, will not block further code from being executed in the meantime
// Asynchronous code is executed after a task that runs in the 'background' finishes
// The presence of a callback function does NOT automatically make code asynchronous

// AJAX - Asynchronous Javascript And XML - allows us to communicate with remote web servers in an asynchronous way.
// With AJAX calls, we can request data from web servers dynamically.

// API - Application Programming Interface - Piece of software that can be used by another piece of software, in order to allow applications to talk to each other.
// There are many types of APIS in web development - DOM API, Geolocation API, Own Class API, 'Online' API
// 'Online' API - application running on a server, that receives requests for data and sends data back as response

// XML not really used anymore - most APIs use the JSON data format - easy to send across the web

const renderCountry = function (data, className = '') {
  // Create html
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)}m people</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
              </div>
          </article>
        `;

  // Insert to DOM
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // XMLHttpRequest Function - old school way of doing things
  const request = new XMLHttpRequest();

  // GET request to the url specified as second argument
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // Send request
  request.send();

  // Wait for request to be received (load event) then execute callback function to log the response
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    // Render data
    renderCountry(data);
  });
};

// getCountryData('australia');
// getCountryData('spain');
// getCountryData('portugal');

// Callback hell - is inevitable when we need to process asynchronous tasks in order
// Makes code very messy and hard to read - avoid!
// Escape callback hell with promises!

// ----- PROMISES ------

// Modern way of requesting data is via the fetch API

const fetchRequest = fetch('https://restcountries.eu/rest/v2/name/germany');
// Will return a pending promise when fetchRequest is logged to console immediately
// console.log(fetchRequest);

// What is a promise - an object that is used as a placeholder for the future result of an asynchronous operation
// Like a container for an asynchronously delivered value (or future value)
// A classic example of a promise is the response from an AJAX call
// ES6 feature

// Advantages of promises:
// 1) We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results
// 2) Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations - escaping callback hell

// Promise Lifecycle
// 1) Pending - Before the future value is available (the asynchronous task is still running)
// 2) Settled - asynchronous task has finished - either 'Fulfilled' (value is available) or 'Rejected' (an error occurred during the request)
// We can handle these different states in our code - remember states cannot be changed once a promise is settled

// Consuming a promise - use .then() to set a callback function that executes once the promise is fulfilled - the argument passed to the function is the value of the settled promise

// Handling rejected promises
// 2 ways to handle - first is by passing a second callback function into the .then() method
// Fetch API will not reject automatically when a request returns a status error of 404 - only time a Fetch API settles as rejected is when the internet connection is disrupted/absent - bit silly!
// The promise object has a property ok that will be set to false when a status error of 404 is returned
// We can use this knowledge to manually catch 404 errors

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// const getJson = function (url, error = 'Something went wrong!') {
//   return fetch(url).then(response => {
//     // Immediately reject promise if 404 error
//     if (!response.ok) {
//       throw new Error(`${error} ${response.status}`);
//     }

//     return response.json();
//   });
// };

// const getCountryDataP = function (country) {
//   // Country 1
//   getJson(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found!'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       console.log(neighbour);

//       if (!neighbour) throw new Error(`${country} has no neighbours!`);
//       // By returning this new promise for the neighbour country here we avoid callback hell!
//       // Country 2
//       return getJson(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found!'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     // Catches any errors in promise chain e.g. if promise is rejected
//     .catch(err => {
//       console.error(err);
//       renderError(err);
//     })
//     // Called no matter whether errors occur in promise chain
//     // Used when something has to happen at the end of the chain regardless of errors
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryDataP('Australia');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// function whereAmI(coords) {
//   const [lat, lng] = coords;
//   console.log(lat, lng);
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.log(`Error on data retrieval: ${err}`));
// }

// whereAmI([52.508, 13.381]);

///////////////////////////////////////////
// Review of the JS Runtime and the Event Loop

// JS runtime is a container which contains all of the pieces required to execute JS code - heart is the engine
// Engine contains both the HEAP (where objects are stored in memory) and the Call Stack (where code is actually executed)
// Javascript has a single thread of execution, no multitasking!
// Web APIs - APIs provided to the engine that aren't part of the JS language itself - e.g. DOM, Timers, Fetch API
// Callback Queue - ready to b e executed callback functions (coming from events) - kind of like a to do list of tasks the call stack ill eventually need to complete
// The event loop sends callbacks from the queue to the call stack - this is the essential piece to allow asynchronous code in JS
// The event loop allows a non-blocking concurrency model in JS - a concurrency model is how a language handles multiple tasks at the same time

// Event loop looks into the call stack to determine whether it is empty - if the stack is empty (i.e. no code is currently being executed)
// It will take the first callback on the callback queue and place it onto the call stack for execution - this is called an event loop tick
// Event loop decides when each callback is executed: orchestration

// With promises things work in a slightly different way - callbacks related to promises do not go into the callback queue
// Callbacks of promises have a special queue for themselves - microtasks queue - has priority over the callback queue
// If the call stack is empty the event loop tick will take callbacks from the microtasks queue preferentially over the callback queue - cut in line
// Can mean the microtasks queue could potentially 'starve' the callback queue if both are heavily populated

// Example

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// Keep in mind you cannot do precision tasks using JS timers due to the way the event loop works

//////////////////////////////////////////
// Building a promise

// takes one argument - an executor function
// executor function contains the asynchronous task we wish to perform - should return a result value

// const lotteryPromise = new Promise(function (resolve, reject) {
//   //   console.log('Lottery draw is happening');

//   setTimeout(() => {
//     // If our number is >.5 we 'win' the lottery - call resolve
//     if (Math.random() >= 0.5) {
//       // Whatever argument we pass in to the resolve function will be the value available to the .then() handler
//       resolve('You win!');
//       // If our number is < .5 we 'lose' the lottery - call reject
//     } else {
//       // Argument to reject will be the error message we can later .catch() and handle
//       reject(new Error('You lose!'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// Most of the time we only consume promises
// Building promises is only really necessary when we wish to wrap old callback functions into promises - promisifying

// Promisifying the setTimeout function - return a promise
const wait = function (seconds) {
  // No reject parameter required as timer will never fail
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// wait(5).then(() => console.log('Finished waiting'));

// Static method on the constructor
// Promise.resolve('abc'); // --> immediately resolves to the given value
// Promise.reject(new Error('abc')); // immediately reject

// Promisifying the geolocation API

// Normal call
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// Promisified
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

// getPosition().then(pos =>
//   whereAmI([pos.coords.latitude, pos.coords.longitude])
// );

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector('.images');
// let currentImg;

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');

//     img.src = imgPath;
//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('Error loading image'));
//     });
//   });
// };

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Consuming promises with async/await

// Create a special type of function called an async function - designated with async keyword prior to function

const whereAmIAsync = async function () {
  // await keyword will stop code execution inside the async function until the promise is resolved, but not block the call stack execution
  // once the promise resolves we can store the value directly into a variable
  try {
    const location = await getPosition();
    console.log(location);
    const { latitude, longitude } = location.coords;
    const resGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );
    if (!resGeo.ok) {
      throw new Error(`Couldn't fetch location data`);
    }
    const dataGeo = await resGeo.json();
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) {
      throw new Error(`Couldn't fetch country`);
    }
    const [data] = await res.json();
    renderCountry(data);
    console.log(data);

    return `You are in ${dataGeo.city}, ${data.name}`;
  } catch (err) {
    console.error(`${err.message} Oh no!`);

    // Reject promise returned form an async function - must rethrow the error
    throw err;
  }
};

// whereAmIAsync();

// Error handling with try...catch

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// Good use case for an IIFE - getting a return value from an async function

(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(city);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
  console.log(`Finished getting location`);
})();

// Running promises in parallel

const getJson = function (url, error = 'Something went wrong!') {
  return fetch(url).then(response => {
    // Immediately reject promise if 404 error
    if (!response.ok) {
      throw new Error(`${error} ${response.status}`);
    }

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // This doesn't make logical sense as we're running AJAX calls in sequence
    // const [data1] = await getJson(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJson(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJson(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    // Promise.all() - static method - takes an array of promises and returns a new promise that runs each promise in the array in parallel
    // Very important for efficiency
    const [[data1], [data2], [data3]] = await Promise.all([
      getJson(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJson(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    // If one promise rejects - Promise.all 'short-circuits' which means all promises reject

    console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('australia', 'canada', 'sweden');

// Other promise combinators

// Promise.race
// Takes an array of promises - Promise.race returns as soon as one of the promises in the array settles (whether rejected or fulfilled)
(async function () {
  const data = await Promise.race([
    getJson(`https://restcountries.eu/rest/v2/name/italy`),
    getJson(`https://restcountries.eu/rest/v2/name/germany`),
    getJson(`https://restcountries.eu/rest/v2/name/spain`),
  ]);
  console.log(data[0].capital);
})();

// Promise.race can be useful for manually creating a timeout function if the use has a poor internet connection
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  timeout(3),
  getJson(`https://restcountries.eu/rest/v2/name/zimbabwe`),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// Returns an array of all settled promises
const allSettled = async function () {
  const data = await Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Nope'),
    Promise.resolve('Yep'),
  ]);
  console.log(data);
};

allSettled();

//Promise.any [ES2021]
// Returns first fulfilled promise that isn't rejected

const anySettled = async function () {
  const data = await Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Nope'),
    Promise.resolve('Yep'),
  ]);
  console.log(data);
};

anySettled();

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');

    img.src = imgPath;
    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Error loading image'));
    });
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('./img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('./img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    // Will return an array of promises
    const loadedImages = imgArr.map(async img => await createImage(img));
    // Handle the promises to get the images out
    const resolvedImages = await Promise.all(loadedImages);
    resolvedImages.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
