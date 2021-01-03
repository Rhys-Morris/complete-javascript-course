'use strict';

// Notes on OOP

/*
OOP is a programming paradigm based on the concept of objects. We use objects to model real world or abstract features.
Objects may contain both data (proeprties) and code(methods). Using objects allows us to pack the data and behaviour (methods) into one block.
Objects are self-contained blocks of code and are the building blocks of applications. 
Objects interact with one anoher via a public interface (API), that code outside the object uses to interact with code inside the object.
Was developed with the goal of organising code and making it more flexible and easier to mantain

4 Major Principles:

1) Abstraction
Remove or strip away all of the details that don't matter --> we get an overview perspective of the thgn we're implementing without worrying about superfluous details

2) Encapsulaton
Data and methods within an object can be hidden from public use and only accessed from within the object via the public interface (exposed methods). 

3) Inheritance
Allow the inheritance of properties and behaviour from a parent class to reuse common logic and model real-world relationships

4) Polymorphism
Inherited code can be overwritten by child classes to better suit the inherited objects purposes

OOP in JavaScript

'Classical' OOP --> Classes are like blueprints for creating new 'instances' of the class
Objects are instantiated from a class. Class --- Instantiation ---> Instance

OOP in JS - Prototypes
Objects are linked to a prototype object. The prototype contains methods or data that is accessible to all objects that inherit from the prototype. Known as prototypal inheritance. Behaviour (methods) is delegated to the prototype.
This differs from classical OOP with classes as the behaviour is copied to each instantiated instance.

3 Ways of Implementing Prototypal Inheritance in JavaScript:

1) Constructor Functions
Create objects via a function
This is how built-in objects like maps, arrays sets are implemented

2) ES6 Classes
MOdern alternative
Syntactic sugar --> work exactly the same as constructor functions
do NOT behave like classical OOP

3) Object.create()
Easiest and most straightforward way of linking an object to a prototype, however is not as common as the prior methods
*/

// ----- CONSTRUCTOR FUNCTIONS -----
// Arrow functions DO NOT work as constructor functions becasue their this keyword is bound to the lexical scope and we need it bound to the created object
// So only function declarations and function expressions

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this - never create a common method on a constructor function.
  // Imagine we were to create 1000 instances of the Person constructor function - we would create 1000 copies of the calcAge method - AWFUL for performance!
  // Instead methods should always be placed on the object's prototype
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const rhys = new Person('Rhys', 1991);
console.log(rhys);

// Steps when new called
// 1. New {} created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. Function automatically returns {}

// How to check if an object has been created by a specific constructor function:
console.log(rhys instanceof Person); // True

// Prototypes
// Each and every function in JS has a property called prototype, including constructor functions
// All new objects created by the Person constructor function will inherit properties from the Person.prototype object

// this keyword will be set to the calling object i.e. the object created by the Person constructor function
// All instances of the Person constructor function will have access to the calcAge method
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

rhys.calcAge();

// The prototype of rhys is equal to the Person.prototype
console.log(rhys.__proto__);
console.log(rhys.__proto__ === Person.prototype);
// Person.prototype here is not the prototype of Person! Rather it is what will be used on all the objects that are created with the person constructor function

console.log(Person.__proto__);

// True
console.log(Person.prototype.isPrototypeOf(rhys));
//False
console.log(Person.prototype.isPrototypeOf(Person));
// Confusing! This confusion is due to poor naming of the prototype property
// Should probably be called prototypeOfLinkedObjects or something similar

// So from above step 3 sets the rhys.__proto__ to  Person.prototype

// Adding a property to the prototype allows it to be inherited by all objects subsequently created through the constructor function

Person.prototype.species = 'Homo Sapiens';
console.log(rhys.species); // Homo Sapiens

// Checking whether a property is an 'own' property versus inherited from a prototype

console.log(rhys.hasOwnProperty('firstName')); // True
console.log(rhys.hasOwnProperty('species')); // False - inherited from Person.prototype

// Prototype Chain
// If a property is not found on a calling object, JavaScript will look up the prototype chain until the property is found

// [rhys] --> [Person.prototype[] --> [Object.prototype] --> null
// [Object.prototype] is the top of the prototype chain

// Person.prototype
rhys.__proto__;
// Object.prototype - top of prototype chain
rhys.__proto__.__proto__;
// Null
rhys.__proto__.__proto__.proto__;

// Array example
const arr = [1, 2, 3, 4, 5, 6, 3, 4, 5]; // same as using new Array()
console.log(arr.__proto__ === Array.prototype); // True - this is where .map, .filter etc can be found

// Creating a property on the Array.prototype object
// Don't do this in practice as it's not ideal to alter built in prototypes
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();

mercedes.brake();
mercedes.accelerate();
mercedes.brake();

// ----- ES6 Classes -----

// Implement prototypal inheritance behind the scenes with syntactic sugar that makes more sense to people coming from classical OOP languages

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods we write below the constructor function will be added to the PersonCl.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  // Must prepend fullName with _ to prevent an endless loop of calls to the getter/setter
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a valid full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Creating a static method on the constructor function --> won't be inherited by instances of PersonCl
  // prepend with static keyword
  // Useful for creating helper functions
  static hey() {
    console.log('*waves*');
  }
}

// Can still also write methods directly onto the prototype outside of the ES6 class declaration

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

const jessica = new PersonCl('Jessica', 1996);

console.log(jessica.__proto__);
jessica.calcAge();
jessica.greet();
jessica.fullName = 'Jessica Davis';
console.log(jessica.fullName);

// 1. Classes are NOT hoisted!
// 2. Classes are first-class citizens --> can be passed into and return from functions
// 3. Body of class is always executed in strict mode

// ----- Getters and Setters -----

const account = {
  owner: 'rhys',
  movements: [100, 200, 530, 400],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

// Note with a setter we can use the assignment operator to pass the parameter, rathe than account.latest(50)
account.latest = 50;
console.log(account.movements);

// Static methods

const headers = Array.from(document.querySelectorAll('h1'));
// Will throw a not a function error
// [1, 2, 3].from();

// This is because the function .from() is attached to the Array constructor, not Array.prototype --> instances of the Array Object do not inherit .from()

// Another example is .parseFloat() which is only available on the Number constructor
const numCheck = Number.parseFloat(12);
console.log(numCheck);

// Creating a static method on the Person constructor

Person.hey = function () {
  console.log('*waves*');
  // this will be the Person constructor function
};

Person.hey();

// Object.create

// No prototype properties or constructor functions/new keyword
// We can use Object.create to manually set the prototype of an object to any other Object we want

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Empty object linked to PersonProto as its __proto__
const steven = Object.create(PersonProto);

console.log(steven.__proto__ === PersonProto);

// A bit more straightforward! In the real world, however,  this is the least used method of implementing prototypal inheritance.

// Now we can use init to set our properties inside the steven Object

steven.init('Steven', 2002);
steven.calcAge();

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // Instance methods inherited from prototype
  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return `Speed in miles / hour: ${this.speed / 1.6}`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const audi = new CarClass('Audi', 120);

console.log(audi.make);
console.log(audi.speed);
audi.accelerate();
audi.brake();
console.log(audi.speedUS);
audi.speedUS = 100;
console.log(audi.speed);

// Inheritance between 'Classes' with Constructor Functions

const Student = function (firstName, birthYear, course) {
  // Must use .call() to pass the this keyword in the call to Person as the empty object created in the instantiation of a new Student
  // This way when we set this.firstName = firstName in the call to Person - the firstName property is set on the empty Student object
  // If we look at an instantiated student like 'mike' below - we can see that mike has firstName and birthYear properties on the mike Object
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// To link Student to Person we must manually set Student.prototype.__proto__ to be Person.prototype
// The easiest way to do this is via the Object.create() method
// This must be done before creating any new methods on the Student.prototype Object

Student.prototype = Object.create(Person.prototype);
// Only issue now is that Student.prototype.constructor has been set to the Person constructor function
// Manually reset to Student
Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

Student.prototype.introduce = function () {
  console.log(`I'm ${this.firstName} & I'm studying ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Engineering');
console.log(mike);
mike.introduce();
mike.calcAge();

// Should both be true
console.log(mike instanceof Person);
console.log(mike instanceof Student);

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  // Pass to Car the currently empty new EV instance object as this
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going ${this.speed}km/hr, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 100, 50);

tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();
console.log(tesla);

// Inheritance Between Classes: ES6 Classes

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    // Always needs to happen first!
    // Responsible for creation of the this keyword
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`I'm ${this.firstName} & I'm studying ${this.course}`);
  }

  // Polymorphism
  calcAge() {
    console.log(`I don't really think of myself as an 'age' perse...`);
  }
}

const martha = new StudentCl('Martha', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();

// Inheritance Between Classes: Object.create

// Using PersonProto example from previous

// Set PersonProto as __proto__ of PersonProto --> StudentProto inherits from PersonProto
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

// Create new 'student' jay --> jay inherits from StudentProto
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');

console.log(jay);

// EXAMPLE

// Encapsulation - public and private fields/methods
// Think of a field as a property that is on all instances
// Underscore is the convention developers use to indicate a protected property -> not intended to be accessed externally

class Account {
  // Public fields
  locale = navigator.language;

  // Private fields
  // Hash indicates a private field
  #movements = [];
  // Initialise private field for pin outside constructor
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public interface for our object - aka API
  // Public methods
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved! Deposited ${val} into account`);
      return this;
    }
  }

  // Private methods
  // Not yet implemented in browsers
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);

// Chaining methods on classes is possible if the object is returned by the function call i.e. return this
acc1.deposit(100).withdraw(50).requestLoan(1000).withdraw(50);
console.log(acc1.getMovements());

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCLass extends CarClass {
  // Charge field set to private
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going ${this.speed}km/hr, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCLass('Rivian', 120, 23);
rivian
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .chargeBattery(100)
  .accelerate();

console.log(rivian);
