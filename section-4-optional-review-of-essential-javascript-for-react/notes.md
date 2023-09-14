# Section 4: [Optional] Review of Essential JavaScript for React

## Section Overview
- Destrucuring, spread operator, template literals, ternaries 
- Promises 
- Async/ await 
- Map, filter, reduce, sort 
  - We work a lot with immutable arrays 

## Destructuring Objects and Arrays
- We will be using an extension called Quokka.js to run our code in this section
- Destructuring is useful when we need to get data out of an object or an array 
  - The names we destructure with need to be the same as the name we're pulling from 
- Destrucutring arrays relies on the position where as destructuring objects relies on the property name 

## Rest/Spread Operator
- Creates an array of the remaining elements of the array
- This must go at the end of the destructuring 
- The same syntax of the rest operator is used for the spread
  - Spread can be used for arrays and objects
  - Builds a new array and adds elements we want at the end
  - Allows us to add new properties or update exising properties on objects 

## Template Literals
- ES6 JS feature 
  - Allows us to include variables inside of a string 
  - Any JS expression can be placed into this block
  - Simple, but we will use these all the time in react 

## Ternaries Instead of if/else Statements
- Used instead of an if/else statements 
  - Has 3 parts: condition, result 1 and result 2 
  - Used to define a variable conditionally 

## Arrow Functions
- ES6 way of writing functions 
- Many people use arrow functions for everything 
  - Jonas recommends only using them for 1 liner functions 
- If you have more than one line, you need to add the return keyword 

## Short-Circuiting And Logical Operators: &&, ||, ??
- && and || have short circuiting 
  - Will immediately return the first value and not return the second value 
  - Truthy value is anything that is not a falsey value 
    - Falsey values: 0, '', null, undefined 
- && returns the first falsey value 
- || return the first truthy value
  - When you want 0, you can use the nullish coalescing operator 
- ?? -- short circuits for falsey values 
  - Works similarly to || but also short circuits for falsey values 

## Optional Chaining
- We can ask JS to read only properties that only exist 
  - If it is undefined it will no longer try to read the undefined 
  - Then you can use he nullish coalescing operator to set to 0 instead of undefined 

## The Array map Method
- These methods do not mutate the original array, return a new array based on the original one
- map 
  - Loops over the array and return a new array with the same length with some operation applied to the elements of the array 
- If you want to return an object from a map array without writing a return, you can wrap the object in ()

## The Array filter Method
- You can use an && to chain to check for more than one filter or you can chain another .filter() method on it 
- .filter() looks for a condition and returns an array where the condition returns true 

## The Array reduce Method
- The most versatile and most powerful of all array methods in JS 
  - We could recreate all of the other methods just using this method
- Reduce because it reduces the entire array down to one value 
  - Boils down the array to one value --> second argument is the starter vlaue for the final value we want to obtain 
- Imagine the accumulator as the value we pile more and more onto to get our final number 
- The initial value doesn't have to be a number, it can also be an array 

## The Array sort Method
- We can use this method to sort an array 
- a and b are the current value and then the next value 
  - a - b will always sort in an ascending way 
  - b - a will sort descending 
- Will also sort the original array as well 
  - This is a method that mutates the original array 
    - Usually we don't want that to happen, so we need to copy the array using slice and then chain sort onto it 

## Working With Immutable Arrays
- Many operations need to be immutable, so we need to have operations where we don't manipulate the original data structure 
- The most common data structure we will work with will be an array of objects 
- To add we create a new array and spread the existing array and add to the end 
- To delete we use filter becuase it makes the array shorter 
- To update we use map because it creates an array with the exact same length as the original and to update we spread the original object and change the property we are looking to change 

## Asynchronous JavaScript: Promises
- JS runs in the meantime while fetching the data, it will not wait until the data is fetched, it will execute this function and then keep going 
- A fetch returns a promise 
  - It can be pending, rejected or fulfilled 
  - We can call the .then() method 
- Promises are used for more than data fetching 

## Asynchronous JavaScript: Async/Await
- Makes the fetch syntax a lot cleaner 
  - The whole idea of promises doesn't go away, the only thing that goes away is the .then() handlers 
- On an async function, it will await the code pauses until the data is received
  - The result value of the async function is always a promise 