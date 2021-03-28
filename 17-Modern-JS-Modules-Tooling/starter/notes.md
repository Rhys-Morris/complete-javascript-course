## Overview of Modern JavaScript Development

Modern JavaScript development is based on modules, which can share data between themselves. This makes our code more organised and maintainable. 

We can also include 3rd party modules into our own code, known as packages. These packages are hosted on the npm repository. React or JQuery are examples of npm packages. 

NPM stands for `Node Package Manager`, however, it is now the go to repository for modern JavaScript development. 

To download, use and share packages we use the npm software installed on our computer - command line interface. Therefore npm is both the repository in which packages live and a program installed on our computers to install and manage these packages. 

## Build Process

Where modules are bundled together to output a single JavaScript file. This is the final file that is deployed to our web server for production. 

A build process can be quite complex, but for simplicity we will break it down into two major steps. 

1) Bundling

All our modules are bundled into one big file. Eliminates unused code and compresses our code as well. Very important step! Older browsers don't support modules at all, therefore, code that's in a module won't be executed. Much better for performance by sending only one file to the browser, and this code being compressed during bundling. 

2) Transpiling/Polyfilling

Converts modern JavaScript and ES6 features back to ES5 syntax so older browsers can understand our code without breaking - usually done via a tool called `Babel`.

To implement this build process for us we use webpack or parcel - JavaScript bundlers. Webpack is more popular, however it can be confusing to set it up. 

Parcel is a zero configuration bundler that works 'out-of-the-box'. 

These development tools are also available on npm e.g. parcel, babel, live-server. 

## An Overview of Modules

A module is a reusable piece of code that encapsulates implementation details of a certain piece of our project. 

Usually a standalone file, but it doesn't have to be. 

We can export values out of a module, for example certain values or even functions. Whatever is exported from a module is known as the `public API`.

In modules we can also import values from other modules. Modules that we import values from are known as dependencies of the importing module, because the code inside the importing module cannot work without the code that is imported form the external module. 

Advantages of modules:

1) Compose software - modules are small building blocks that we can put together to build complex applications. Think of a module like a small piece of a camera. The whole camera is the software, but the camera is made up of component modules such as the screen, the lens, the controller.
2) Isolate components: Modules can be developed in isolation without thinking about the entire codebase.
3) Abstract code: Implement low-level code in modules and iomport these abstractions into other modules.
4) Organised code: Modules lead to a more organised codebase.
5) Reuse code: Modules allow us to easily reuse the same code, even across multiple projects. For example, if we use a module to implement mathematical functions, we can import these functions into any project that requires their use. 

## Native ES6 Modules

Modules stored in files, exactly one module per file. 

Comapring ES6 Modules to Scripts:

ES6 Modules:

- Top level variables are scoped to the module
- Always executed in strict mode
- Top level this is undefined
- Allows import and export of values
- HTML script tag - <script type="module">
- File downloading is automatically asynchronous. True for modules loaded by HTMl as well as for modules loaded by import statements.

Script:

- Top level variables are global - this can lead to issues like global namespace pollution where multiple scripts try to name variables with the same name, resulting in collision. 
- Executed in 'sloppy' mode unless specifically set to strict mode.
- Top level this is the window
- No ability to import or export values
- HTML script tag - <script>
- By defualt are downloaded synchronously (blocking) unless we use async or defer attributes on the script tag. 

Imports and exports can only happen at the top level! Outside of any function or block. Imports are hoisted! Importing values is always the first thing that happens in a module.

## How ES6 Modules are Imported

```
// index.js
import { rand } from './math.js';
import { showDice } from './dom.js';
const dice = rand(1, 6, 2);
showDice(dice);

//math.js
const rand - () => {
    // Random numbers
};
export { rand };

// dom.js
const showDice = () => {
    // Display dice
};
export { showDice };
```

Steps:

1) Parsing index.js - read code without executing it, this is the moment in which imports are hoisted. Therefore, imports occur before code execution. This is only possible due to top-level 'static' imports.
2) Modules are imported synchronously. This makes bundling and dead code elimination possible. That is, only the code that is required from an importing module is imported. Consider the example where we only want a single function form a large third party module, it would be impractical and effect performance negatively if we had to import the whole module.
3) Modules are downloaded from the server, this occurs asynchronously. 
4) After download the modules are parsed, and their exports linked to the imports in `index.js`. For example `math.js` exports a function called `rand`, and this export is connected to the `rand` import in the `index.js` module. This is a live connection. So exported values are not 'copied' to imports. Instead the import is just a reference to the exported value - similar to a pointer. Therefore, if the value changes in the exporting module, the same value changes in the importing module. This is unique to ES6 modules - keep this in mind!
5) Code in the imported modules is executed i.e. `math.js` and `dom.js` above.
6) The code in the importing module is executed i.e. `index.js` above.

## Types of Exports

1) Named exports - simply add `export` ahead of a variable definition. 

```
export const addToCart = function(product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
```

Named exports must be imported within curly braces. We can export multiple values with named exports. We can change the name of an imported value with the `as` keyword:

```
import { totalPrice as price } from './shoppingCart.js'
```

We can also create a Namespaced object when importing all values form an external module:

```
import * as ShoppingCart from './shoppingCart.js'
```

2) Default exports - Used when we only want to export one thing per module.

```
export default function(product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
```

Can be given any name when imported:

```
import add from './shoppingCart.js'
```

We can import both default and named exports from another module:

```
import add, { addToCart, totalPrice as price } from './shoppingCart.js'
```

However in practice this is never done! Choose one or the other based on what makes more sense for the use case.

## The Module Pattern

How modules were created prior to ES6 modules. Important to understand as will still be seen in some code bases.

Main goals are to encapsulate functionality, have private data and to expose a public API. best way to do this is with a function. A function gives us private data by default and allows us to return values, which can become our public API.

Best written with an IIFE. Don't have to call seperately, and we can ensure it is only called once. Wrap function in parentheses and then immediately call.

```
const ShoppingCart2 = (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 23;
    const totalQuantity = 23;

    const addToCart = function(product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
    };

    const orderStock = function(product, quantity) {
    console.log(`${quantity} ${product} ordered form supplier`);
    };

    // Return what we wish to make public
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    };
})()
```

This works because of closures!

## CommonJS Modules

Have been used in Node.js for almost all of its existence. Only very recently have ES6 modules been implemented in Node.js. Big consequence of this is that almost all of the modules in the npm repository still use the `CommonJS` module system. The reason for this is that npm was originally only intended ot be used with Node.js. Only later did npm become the standard repository for thw hole JavaScript world. Therefore, there is a lot of CommonJS still around.

Similar to ES6, in `CommonJS` one file is one module. We export something from a module with the following syntax:

// Export 
```
export.addToCart = function(product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
```

This won't work in the browser, but it would work in Node.js. The `export` keyword is an object that is defined in Node.js.

// Import

```
const { addToCart } = require('./shoppingCart.js')
```

Again `require` is not defined in our browser environment, but it is defined in Node.js.

In the long run it is likely that ES6 modules will replace other module systems, but it will take a while!

## Introduction to NPM

Why do we need npm? Before npm we use to include external libraries right into our HTML with a script tag, this would expose a global variable which we could use. 

This can create problems in large projects:

1) It doesn't make sense to have our HTML loading all our JavaScript - very messy!
2) We used to have to download libraries to our computer, whenever they were updated, the file would have to be redownloaded prior to inclusion as a script.
3) Prior to npm there wasn't a single repository that contained all the packages we might need. Made it difficult to manually download libraries and manage them on our computers.

To check if we have npm installed:

```
npm -v
```

In each project we wish to use npm, we need to start bby initialising it:

```
npm init
```

Asks us some questions in order to create a `package.json` file. This file stores the entire configuration of our project. 

To install leaflet with npm:

```
npm install leaflet
```

In our `package.json` file we can now see leaflet listed under `dependencies`. We can also see a new folder called `node_modules` has been created in our directory, which contains the leaflet folder. All of the leaflet libraries code is included here.

So we've installed our leaflet library, but now if we wish to use it we need a module bundler. this is because the leaflet library uses the CommonJS module system. We cannot directly import it into our code.

Installing lodash-es (ES modules):

```
npm i lodash-es
```

Once installed we can see in our node_modules/lodash-es folder that we have one file for each of the methods that are available in the lodash library.

If we wish to import the `cloneDeep` method:

```
import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
```

## Bundling with Parcel and NPM Scripts

Parcel is a build tool available on npm:

```
npm i parcel --save-dev
```

Appears under devDependencies in `package.json`. This tool is only required in development!

Parcel is another cli, however we cannot do:

```
parcel index.html
```

This own't work with locally installed packages, and parcel was installed locally. 

To use parcel we either have to use `npx` or `npm` scripts.

### NPX

An application built into `npm`. 

```
npx parcel index.html
```

The argument that we pass to parcel is the entry point - `index.html`, this is where the file that we wish to bundle (`script.js`) exists.

Once the script has finished running, parcel will create a new localhost server. 

We must remember that parcel creates a script, not a module. So now we need to change the type attribute of script.js in the HTML. 

Parcel creates a `dist` folder in our working directory, with a new `index.html` and some JavaScript files. 

In parcel we can activate `hot module replacement`.

```
if (module.hot) {
    module.hot.accept()
}
```

This is code that is used by parcel, but won't make it into the final bundle. Whenever we change one of the modules, this will trigger a rebuild, and this new modified bundle will be injected into the browser without triggering a whole page reload. 

In module bundlers there's no need to specify the entire path to a module in your import statement:

```
import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
```

can be simplified to:

```
import cloneDeep from 'lodash-es'
```

### NPM Scripts

Automate repetitive tasks - create a script in `package.json`:

```
"start": "parcel index.html"
```

To run: `npm run start`

This mimics `npx parcel index.html` as above.

```
"build": "parcel build index.html"
```
Builds final bundle - compressed and has code elimination.

## Configuring Babel and Polyfilling

Transpile ES6 back to ES5 code - very important for accessibility.

Parcel automatically uses Babel to transpile our code. 

Babel works with plugins and presets that can be configured. 

A plugin is a specific JavaScript feature that we wish to transpile. For example we only want to transpile arrow-functions (this doesn't make any sense, but is an educational example).

It is more common to use a preset, which is a bunch of plugins bundled together. By default, babel uses `preset-env` which automatically selects which JavaScript features should be compiled based on browser support. Only browsers with market share < 0.25% are ignored by this preset.

For real new features added to ES6 that have no ES5 equivalent (e.g. Promises, array methods like find), there is no way for Babel to transpile the code. 

For these examples we cannot transpile, we must polyfill. 

```
npm i core-js
```

```
import 'core-js/stable'
```

This will allow Babel to recreate the `find` method by polyfilling. You can also cherry-pick just the features you wish to polyfill. This is a bit of work, but can reduce the bundle size if this is of concern.

```
import 'core-js/stable/array/find'
import 'core-js/stable/promise'
```

There is one feature that is not polyfilled via `core-js` - async functions.

```
npm i regenerator-runtime
```

```
import 'regenerator-runtime/runtime'
```

Think of the above as a recipe you need to follow to correctly polyfill ES6 code for older browser support!

## Writing Clean and Modern JavaScript Code

### Readable Code

- Write code so that others can understand it. Avoid 'clever' and overcomplicated code. 
- Use descriptive variable names: what they contain
- Use descriptive function names: what they do

### General

- DRY principle (refactor code)
- Don't pollute global namespace, encapsulate instead
- Don't use var
- Use strong type checks (=== and !==)

### Functions

- Should only do one thing
- Don't use more than 3 function parameters
- Use default parameters whenever possible
- In general return same data type as received
- Use arrow functions when they make code more readable

### OOP

- Use ES6 classes
- Encapsulate data and don't mutate it from outside the class
- Implement method chaining
- Do not use arrow functions as methods (in regular objects)

### Avoid Nested Code

- Use early return (guard clause)
- Use ternary or logical operators instead of if
- Use multiple if instead of if/else-if
- Avoid for-loops, use array methods instead
- Avoid callback based async APIs.

### Asynchronous Code

- Consume promises with async/await for best readability
- Whenever possible, run promises in parallel (Promise.all)
- Handle erros and promise rejections

## Declarative and Functional JavaScript Principles

Two fundamentally diffeent ways of writing code (paradigms)

1. Imperative
2. Declerative

### Imperative

Programmer explains how to do things - we explain to the computer every step it has to follow to achieve a result.
Example: Step-by-step recipe to bake a cake

```
const arr = [2, 4, 6, 8];
const doubled = [];
for (let i = 0; i < arr.length; i++) 
    doubled[i] = arr[i] * 2;
```

### Declarative

Programmer only tells what to do - we describe the way the computer should achieve the result. 

The how (step-by-step instructions) gets abstracted away

Example: Description of a cake

```
const arr = [2, 4, 6, 8];
const doubled = arr.map(n => n * 2);
```

### Functional Programming

Declarative programming paradigm.

Based on the idea of writing software by combining many pure functions, avoiding side effects and mutating data.

A `side effect` is modification (mutation) of any data outside of the function (mutating external variables, logging to console, writing to DOM, etc).

`Pure function`: Function without side effects. Does not depend on external variables. Given the same inputs, always returns the same outputs.

`Immutability`: State (data) is never modified! Instead state is copied and the copy is mutated and returned. 

Less bugs and more readable code!

Functional Programming Techniques:

- Try to avoid data mutations
- Use built in methods that don't produce side effects
- Do data transformations with methods such as `.map()`, `.filter()` and `.reduce()`
- Try to avoid side effects in functions - this is of course not always possible!

Declarative Syntax:

- Use array and object destructuring
- Use the spread operator (...)
- Use the ternary oprator
- Use template literals

In JavaScript there is a built-in way to make an object immutable: `Object.freeze`