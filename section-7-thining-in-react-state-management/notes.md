# Section 7: Thinking In React: State Management

## Section Overview
- Thinking in React 
- State management 
- When and where to create state? 
- Derived state 
- Lifting Up State 

## What is "Thinking In React?"
- Thinking In React is a core skill 
  - How to work with React API -- This is hwere professional React apps are built -- Thinking In React 
  - Thinking in React
    - React Mindset 
    - Thinking about components, state, data flow, effects, etc. 
    - Thinking in state transitions, not element mutations 
- Thinking in react is a process (not a rigis process)
  - The thinking in react process
    - Break the desired UI into components and establish the component tree 
    - Build a static version in React (without state)
    - State management
      - Think about state: 
        - When to use state 
        - Types of state: local vs. global 
        - Where to place each piece of state 
      - Establish data flow 
        - One-way data flow 
        - Child-to-parent communication 
        - Accessing global state 
  - When you know how to think in react, you will be able to answer: 
    - How to break up a UI design into components 
    - How to make some components reusable 
    - How to assemble UI from reusable components 
    - What pieces of state do I need for interactivity 
    - Where to place state? (What component should "own" each piece of state?)
    - What types of state can or should I use
    - How to make data flow through the app 

## Fundamentals of State Management
- What is state management? 
  - State management: Deciding when to create pieces of state, what types of state are necessary, where to place each piece of state, and how data flows through the app  
    - Giving each piece of state a home 
  - Example from Udemy 
    - searchQuery 
    - shoppingCart
    - coupons
    - notifications
    - language
    - isOpen 
    - user 
- Types of state: Local vs global state 
  - Local state 
    - State needed only by one or few components 
    - State that is defined in a component and only that component and child components have access to it (by passing via props)
    - Example: search term input into a search query 
    - We should always start with local state 
  - Global state
    - State tat many components might need
    - Shared state that is accessible to every component in the entire application 
      - Using Context API or Redux 
    - Example 
      - Shopping cart and what is in there 
  - During parts 1 and 2 of this course we will only focus on local state, we will get into globl state in later parts of this course 
- State: When and where? (See diagram in slides)
  - Need to store data -> will this data change at some point -- NO --> Regular const variable 
    - -- YES --> Can be computer from existing state/props? -- YES --> Derive state 
    - -- NO --> should it re-render component? -- NO --> Ref (useRef, more on this later)
    - -- YES --> Place a new piece of state in component (this is where when to create state ends and where place state begins)
      - Only used by this component? -- YES --> Leave in component 
      - -- NO --> Also used by a child component -- YES --> Pass to child via props 
      - -- NO --> Used by on or a few sibling components? -- YES --> Lift state up to first common parent  
      - -- NO --> Probably global state. Global state management later in the course...

## Thinking About State and Lifting State Up
- We will set state to an empty array to then set the state so we have access to it since we want to component to re-render when a new item is added
- Reminder the whole goal of react is to be immutable 
  - Data cannot be pass sideways or up, so this is where we lift up state 
    - We lift the state up to our app 
- When passing a function you call it onFunction={functionName} -- this is just a convention a lot of people use 

## Reviewing: "Lifting Up State"
- Problem: Sharing state with sibling component 
  - Checkout example 
    - Checkout 
      - Promotions 
        - Coupons and setCoupons 
      - Total 
        - How do we give the total component the coupon state? 
          - Data can only flow down to children (via props), not sideways to siblings 
          - How do we share state with other components? We lift the state up 
            - We place the state in the parent component that these two share and then pass down using props 
            - By lifting state up, we have successfully shared one piece of state with multiple components in different positions in the component tree
- Child to parent communication 
  - If data flows from parent to children, how can Promotions (child) update stae in Checkout (parent)? 
    - Child-to-parent communication (inverse data flow): child updating parent state (data "flowing" up)

## Deleting an Item: More Child-to-Parent Communication!
- In our callback function on events, it returns the event, you have to use a callback function for only when the event happens 

## Updating and Item: Complex Immutable Data Operation
- Code example of handling the checkbox toggle 
- <code>
  setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : { item }
      )
    );
  </code>

## Derived State
- Deriving state 
  - Derived state: state that is computer from an existing piece of state or from props 
  - Just regular variables, no useState
  - cart state is the single source of truth for this related data
  - Works because re-rendering component will automatcally re-calculate derived state 
    - Example (see slides for code example)
      - Three separate pieces of state, even though numItems and totalPrice depend on cart 
      - Need to keep them in sync (update together)
      - 3 state updates will cause 3 re-renders 

## Calculating Statistics as Derived State
- Our example will be calculating the percentages in the footer
  - So we don't want to useState to do this because this cause multiple re-renders 
- We set as a regular variable, the piece of state re-renders, the item state will update 

## Sorting Items
- We will allow users to sort from 3 different criteria 

## Clearing the List
- We will add a button to clear the entire list at once

## Moving Components Into Separate Files
- We export defualt and then import into our app.js
- You need to import any parts of react that you need into every component file
  - For instance you can't include useState in just the App.js, it needs to be everywhere 
- You can refactor into it's own file by Right clicking on the function and then hitting refactor and it will create the new file for you 

## EXERCISE #1: Accordion Component (v1)
- Walkthrough of building an Accordion component in code sandbox

## The "children" Prop: Making a Reusable Button
- We want to create a reusable button instead of creating the button manually in the code, so we will return one button element 
- Our props are getting out of hand, we will now make use of the children prop 
  - Using the children prop will input what we have in between the opening and closing of our tag, so we can avoid having 5 million props 
- The children prop 
  - props.children 
    - An empty hole that can be filled by any JSX the component receives as children 
    - Children of Button is accessible through props.children 
  - The children prop allows us to pass JSX into an element (besides regular props)
  - Essential tool to make reusable and configurable components (especially component content)
  - Really useful for generic components that don't know their content before being used (e.g. modal)

## More Reusability With the "children" Prop
- Walkthrough of adding in a step message on our steps app 

## EXERCISE #2: Accordion Component (v2)
- Walkthrough of making the accordion close all of the other ones if one is open 

## CHALLENGE #1: Tip Calculator
- Walked through coding challenge #1