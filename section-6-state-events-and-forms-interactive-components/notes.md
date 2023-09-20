# Section 6: State, Events, and Forms: Interactive Components

## Section Overview
- Handling Events 
- State to update the UI 
- Building forms the "React way"
- Controlled elements 

## Let's Build a Steps Component
- Data that doesn't depend on anything in the component needs to be placed outside of the component 

## Handling Events the React Way
- We will not use .addEventListener() because it is imperative and not declarative 
- We use the onClick={function} on the element with a function 
  - It takes in a callback function, meaning we want to call the function at a later time 
  - Always specify a function value
  - Usually we don't define it in the onClick prop, we usually define it in the component body 

## What is State in React?
- What we need to learn 
  - State is the most important concept in React 
    - So we will keep learning about state throughout the entire course 
  - What React developers need to learn about state: 
    - This section 
      - What is state and why do we need it? 
    - Later sections throughout course 
      - How to use state in practice? 
        - useState
        - useReducer 
        - Context API 
      - Thinking about state 
        - When to use state 
        - Where to place state 
        - Types of state 
- What is state? 
  - State 
    - Data that a component can holder over time, necessary for information that it needs to remember throughout the app's lifecycle 
    - "Component's memory"
    - "state variable" / "piece of state": a signle variable in a component (component state)
      - We use these terms interchangeably 
    - Updating component state triggers React to re-render the component 
  - When a single component is rendered this is called a view 
  - State is how react keeps the ui in sync with data
  - State allows developers to
    - Update the component's view (by re-rendering it)
    - Persist local variables between renders 
      - State is a tool. Mastering state will unlock the power of React development

## Creating a State Variable With useState
- To use state, you do it in 3 steps 
  - create a state variable using useState
    - You destructure the array from useState which fives you the variable, then the function to update that variable 
    - Gets imported from react
- useState is a hook 
  - All hooks start with use 
    - We can only call hooks on the top level of a function  
    - You also cannot call it in an if statement 
  - We should only update state using the setter state 

## Don't Set State Manually!
- React has no way of knowing that a state variable not using a setter function wants to update 
- Another way this can break is using an object or array for state 
  - This will work, but mutating objects is a really bad practice, in more complex codebases this won't work 
- Always treat state as immutable in React 

## The Mechanics of State
- The mechanics of state in React 
  - We don't do direct manipulations --> 
    - Because React is declarative 
  - How is a component view updated then? --> In React, a view is updated by re-rendering the component 
    - Important React principle 
    - React calls the component function again 
      - Render / Re-render --> Updated view 
        - State is preserved throughout re-renders 
  - A component is re-rendered when its state is updated 
  - So to update a view, we update state 
  - React is called React because...
    - React reacts to state changes by re-rendering the UI 

## Adding Another Piece of State
- We will be adding a close function for the whole step state
- Even if we update one of our states, it will remember the other set state 

## React Developer Tools
- React devTools can be downloaded from the extensions in the Chrome Store
- Has component and profiler 
  - Component shows us state 
    - You can toggle pieces of state and change thier values 
  - You can also see the whole component tree 

## Updating State Based on Current State
- We should not update state based on the current state
  - We need to create a callback function with the current state and then updated 

## More Thoughts About State + State Guidelines
- One component, one state 
  - Each component has and manages its own state, no matter how may times we render the same component 
- UI as a function of state 
  - UI = f(state)
    - state - UI -------> time 
  - Declarative, revisited 
    - With state, we view UI as a reflection of data changing over time 
    - We describe that reflection of data using state, event handlers, and JSX 
- In practical terms...
  - Practical guidelines about state 
    - Use a state variable for any data that the component should keep track of ("remember") over time. This is data that will change at some point. In Vanilla JS, that's a let variable, or an [] or {}
    - Whenever you want something i the component to be dynamic, create a pievce of state related to that "thing", and update the state when the "thing" should change (aka "be dynamic")
      - Example: A modal window can be open or closed. So we create a state variable isOpen that tracks whether the modal is open or not. On isOpen = true we display the window, on isOpen = false we hide it 
    - If you want to change the way a component looks, or the data is displays, update its state. This usually happens in an event handler function. 
    - When building a component, imagine its view as a reflection of state changing over time 
    - For data that should not trigger component re-renders, don't use state. Use a regular variable instead. This is a common beginner mistake
      - Unecessary re-renders can cause performance issues 

## A Vanilla JavaScript Implementation
- Walkthrough of the differences betweem a vanilla js implementation of the steps app and the react implementation 

## CHALLENGE #1: Date Counter (v1)
- Using nested ternaries is ugly and becomes unreadable, so void using them, but for this small example it's fine 

## Starting a New Project: The "Far Away" Travel List
- We will build a list of things we need to pack for a trip
- How we will break down the components 
  - Logo 
  - Form 
  - PackingList 
    - Item 
  - Stats 
- Eventually we will talk about how to break down these components 

## Building the Layout
- Eventually we will have all of our components in their own individual file, but for now we will put them in the App.js 

## Rendering the Items List
- Mapped through test data provided to render the list 

## Building a Form and Handling Submissions
- Forms are fundamental in web applications 
  - We use the normal HTML form element 
- We can dynamically create our options of numbers using Array.from() to create an array with a length of 20 
- We still have to disable the default behavior of the form on submit 
- In React, we don't pull the value straight from the form like we do in vanilla JS, we use controlled elements which we will learn in the next lecture 

## Controlled Elements
- By default input fields maintain their own state in the DOM, which makes it hard to read their values 
  - So we want to use controlled elements, so React owns and controls the data 
- First create a piece of state 
  - We set the value to our piece of state for the form element 
  - And then connect state to the value we are using, we then need to listen to the change event on the element and it receives the event that was fired off 
    - As we type the state gets updated, you can see this live in hooks under react devTools 
    - State gets resert with each value you put in 
    - On selects, the value comes from the option set
- One caveat, is we can't use props to pass our data to render, we will finish this application in the next section once we learn more about thinking in React 

## State vs. Props
- State vs. props 
  - State 
    - Internal data, owned by component 
    - Component "memory"
    - Can be updated by the component itself 
    - Updating state causes component to re-render 
    - Used to make components interactive
  - Props 
    - External data, owned by parent component 
    - Similar to function parameters
    - Read-only 
    - Receiving new props causes component to re-render. Usually when the parent's state has been updated 
    - Used by parent to configure child component ("settings")

## EXERCISE #1: Flashcards
- Walked through flashcards exercise

## CHALLENGE #2: Date Counter (v2)
- Walked through coding challenge #2