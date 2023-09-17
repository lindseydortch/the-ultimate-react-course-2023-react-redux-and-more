# Section 5: Working With Components, Props, and JSX

## Section Overview
- Core concepts: components, props, JSX
- Creating and reusing components 
- Rendering lists 
- Conditional rendering 
- Start writing your own code! 

## Rendering the Root Component and Strict Mode
- Deleted all the files that were created for us in the src folder to start from scratch
- re-creating the files 
  - We have to have a file that's called index.js because webpack the module bundler is looking for this as the name of our entrypoint file 
- Setting up rendering in the index.js without strict mode 
- To enable strict mode, wrap the App component in a strictmode component 
  - Will render our components twice and will look and see if we're using deprecated react features from the React API 
<code>
  import React from 'react';
  import ReactDOM from 'react-dom';

  function App() {
    return <h1>hello react</h1>;
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
</code>

## Before We Start Coding: Debugging
- Make sure the application is actually running 
  - If it is, restart the app 
  - Also try a hard reload of the browser 
- Always keep the terminal and dev tools open in the browser 
- Errors will also display on the as an overlay itself 
  - You can google these errors itself 
- Always work with ESLint 
  - It can warn you that you're about to use something that doesn't work 
- Prettier - Output 
  - You can select a process running in your terminal and will show you why something stopped working 

## Components as Building Blocks
- Components as building blocks 
  - Components 
    - React applications are entirely made out of components 
    - Building blocks of user interfaces in React 
      - React renders a view for each component and then puts all of those views together on the webpage (UI)
    - Piece of UI that has its own data, logic, and appearance (how it works and looks)
    - We build complex UIs by building multiple components and combining them 
    - Components can be reused, nested inside each other, and pass data between them 
- Component Trees 
  - Shows the hierarchy that exists between the components that make up the UI 
    - Shows parent and child components 

## Creating and Reusing a Component
- In React we write new components using functions 
  - There are two rules: 
    - Needs to return some sort of data 
    - And then the name of the function the first letter of the has to be uppercase 
- Each component can return 1 element, so it can't return 2
- Nesting components means we inlclude one components inside of the other, we do not nest the component declaration itself 
  - We will talk about why we will talk about why this is a bad idea 
- Nesting components mean we include one component inside of another 
- All assets in the app go in the public folder because wepback will pull the images from there 
- You can call each component multiple times to reuse it 

## What is JSX?
- What is JSX? 
  - Component - contains: 
    - Data
    - Logic
    - Appearance 
  - JSX 
    - Declarative syntax to describe what components will look like and how they work 
    - Components must return a block of JSX 
    - Extension of JavaScript that allows us to embed JavaScript, CSS, and React components into HTML
      - Babel converts the JSX to HTML 
    - Each JSX element is converted to a React.createElement function call 
    - We could use React without JSX 
      - Makes the code really hard to read and understand, so everyon just uses JSX 
- JSX is declarative 
  - Imperative "How to do things"
    - Manual DOM element selections and DOM traversing 
    - Step-by-steo DOM mytations until we reach the desired UI 
  - Declarative 
    - Describe what the UI should look like using JSX, based on current data (props and state)
      - Happens without addEventListeners, etc
    - React is an abstraction away from DOM: we never touch the DOM 
    - Instead, we think of the UI as a reflection of the current data 

## Creating More Components
- We can write our functions as expressions or arow functions 
- We build complex user interfaces by combining smaller components into one overall component 

## JavaScript Logic In Components
- Since components are just JS functions, we can do any Js in them that we want and that code is executed as soon as the component is initialized 

## Separation of Concerns
- Separation of concerns? 
  - Rise of interactive SPAs -> JavaScript is in charge of HTML -> Logic and UI are tightly coupled -> Why keep them separated? -> React Components + JSX 
    - Fundamental reason for components 
    - HTML and JS are co-located - things that change together should be located as closely together
      - One component per file 
    - One technology per file = "Traditional" separation of concerns 
  - One technology per file - "Traditional" separation of concerns 
  - One component per file - Each component is concerned with one piece of the UI 
    - Completely new paradigm 

## Styling React Applications
- In React we have many different ways to style components, it does not have a preferred way we should style them 
- For inline styles we have to include them in a JS object and then another set of {} to define them 
- We can include an external CSS file, this is the best way to style our applications 
  - We will learn about styled components later 
- In JSX, we cannot use class, we use className
  - Since class is a reserved keyword in JS 
- The styled we are using here are glocal scoped styled and not specific to the component, which we will go over later 
  - This works fine for small projects, but we want our CSS eventually to belong to one component 

## Passing and Receiving Props
- Props - how we pass data between components 
  - A communication channel between a parent and child component 
  - To define, we do it in two steps 
    - Pass props into the component 
      - The order we pass in the props is irrelevant
      - Whenever you want to pass in something that isn't a string you need to enter JS mode 
    - Receive the props into the component we pass them into 
      - We accept the props parameter on the component 
      - 
  - Prop stants for property 

## Props, Immutability, and One-Way Data Flow
- Reviewing props 
  - Props 
    - Props are used to pass data from parent components to child components (down the component tree)
    - Essential tool to configure and customize components (like function parameters)
    - With props, parent components control how child components look and work 
    - Anything can be passed as props: single values, arrays, objects, functions, even other components 
- Props are read-only 
  - Data 
    - Props 
      - Data coming from the outside, and can only be updated by parent component 
    - State 
      - Internal data that can be updated by the component's logic 
    - There are more types, but these are the two that matter now 
  - Props are read-only, they are immutable! This is one of React's strict rules 
  - If you need to mutate props, you actually need state 
    - Why? 
      - Mutating props would affect parent, creating side effects (not pure)
      - Components have to be pure functions in terms of props and state 
      - This allows React to optimize apps, avoid bugs, make apps predictable 
- One-way data flow 
  - Data can only be passed from parents to child components 
    - Angular has two-way data flow 
  - Makes applications way more predictable and easier to understand
  - Makes applications easier to debug, as we have more control over the data 
  - Is more performant 
- What if I wanted to pass state up? 
  - We will learn this in the next section 

## CHALLENGE #1: Profile Card (v1)
- To do this challenge you can either use code sandbox or create your own react app 

## The Rules of JSX
- Rules of JSX 
  - General JSX Rules 
    - JSX works essentially like HTML, but we an enter "JavaScript mode" by using {} (for text or attributes)
    - We can place JavaScript Expressions inside {}
      - Examples: reference variables, create arrays or objects, [].map(), ternary operator 
      - Statements are not allow (if/else, for, switch)
      - JSX produces a JavaScript expression 
        - We can place other pieces of JSX inside {}
        - We can write JSX anywhere inside a components (an if/else, assign to variables, pass it into functions)
      - A piece of JSX can only have one root element. If you need more, use <React.Fragment> (or the short <></>) 
  - Differences Between JSX and HTML 
    - className instead of HTML's class 
    - htmlFor instead of HTML's for 
    - Every tag needs to be closed. Example: <img/> or <br/> 
    - All event handlers and other properties need to be camelCased
      - Example: 
        - onClick or onMouseOver
    - Exceptions: aria-* and data-* are written with dashes like in HTML 
    - CSS inline styles are written like this: {{<style>}} (to reference a variable, and then an object)
    - CSS property names are also camelCased
    - Comments need to be in {} (because they are JS)

## Rendering Lists
- One of the most common things we will do in React 
- When we have an array and want to create a component for each element of that array
  - Example one Pizza component for each pizza in the pizza array 
- Each time we render a list with the map method, we need to put the key prop 
  - For now it doesn't matter what it is, we need to just pass something that is unique
- Because we need to create a new array, we use map instead of forEach because it doesn't return anything 

## Conditional Rendering With &&
- Conditional rendering - is based on whether or not a condition is true to render the code 
- We're short circuiting using the && and it will return the thing if true, if not we don't have to put a second condition

## Conditional Rendering With Ternaries
- Rendering with ternaries is preferred

## Conditional Rendering With Multiple Returns
- There is nothing stopping us from returning another return keyword based on some condition 
- An early return is useful if we want to return whole components conditionally 

## Extracting JSX Into a New Component
- When a component gets to big we can extract parts of them to smaller components to render into a parent component 

## Destructuring Props
- Props is returned as an object 
- All components have access to props even if they don't exist 
- You use {propBeingPassedIn}
- If we try to destructure a property that doesn't esit, we just get undefined  

## React Fragments
- Sometimes we don't want to always render a div, so this is when we need a react fragment 
  - Allows us to not leave any trace in the DOM tree that they are combined 
- Sometimes we need a key to render a react fragment, so that's when we use React.Fragement

## Setting Classes and Text Conditionally
- We can use the ternary operator to add a class or set a string of text 
  - We get to avoid using DOM manipulation and using the classList property that we would have to use in vanillaJS 

## Section Summary
- Section summary 
  - Components are the building block of each app 
    - Components consist of 
      - Data
      - Logic 
      - Appearance: JSX 
        - JSX block is what we return from a component 
        - "HTML"
        - CSS 
        - JS inside {} 
    - Components in component tree which start with the component of App 
    - To pass data from parent to child components we use Props (properties)
      - Props can only be passed down the tree 
  - Rendering multiple components at once using te JavaScript .map() method 
  - Components can be conditionally rendered using JS tools: &&, ?, and multiple return 

## CHALLENGE #2: Profile Card (v2)
- Completed Coding Challenge #2