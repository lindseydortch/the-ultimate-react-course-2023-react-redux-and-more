# Section 13: Custom Hooks, Refs, and More State

## Section Overview
- Hooks are easy to learn, hard to master
- Rules of hooks 
- Deep dive into useState 
- useRef
- Custom hooks 

## React Hooks and Their Rules
- What are hooks? 
  - React hooks 
    - Special built-in functions that allow us to "hook" into React internals 
      - Creating and accessing state from Fiber tree 
      - Registering side effects in Fiber tree 
      - Manual DOM selections 
      - Many more... 
    - Always start with use (useState, useEffect, etc.)
    - Enable easy reusing of non-visual logiv: we can compose multiple hooks into our own custom hooks 
    - Give function components the ability to own state and run side effects at different lifecycle points (before v16.8 only available in class components)
- Overview of al built-in hooks 
  - Most used
    - useState
    - useEffect 
    - useReducer 
    - useContext 
  - Less used 
    - useRef
    - useCallback 
    - useMemo 
    - useTransition 
    - useDefferedValue 
    - Will not learn: 
      - useLayoutEffect
      - useDebugValue
      - useImperativeHandle 
      - useId
  - Only for libraries 
    - useSyncExternalStore
    - useInsertionEffect
- The rules of hooks 
  - Rules of hooks 
    - Only call hooks at the top level 
      - Do NOT call hooks inside conditionals, loops, nested functions, or after an early return 
      - This is necessary to ensure that hooks are always called in the same order (hooks rely on this)
    - Only call hooks from React functions 
      - Only call hooks inside a function component or a custom hook 
  - These rules are automatically enforced by React's ESLint rules 
- Hooks rely on call order 
  - React Element Tree -- on initial render --> Fiber tree --> Fiber -- props -- list of hooks
    - Linked List of used hooks 
      - State A --> State B --> Effect Z 
      - Linked - the first contains a reference to the second and then the third 
  - See diaram in course slides 
  - Hooks need to be called in the same order on every render 
    - Hooks can only be called at top level 
  - Linked list is the simplest way to associate each hook with its specific value 
    - This means we don't need to manually assign names to each hook, which creates multiple problems

## The Rules of Hooks In Practice
- You can see in the devTools on the components that all of the hooks are listed out 

## More Details of useState
- This is the most important hook in React 
- The values we pass only matter on initial render 
  - React will only look at this on the initial render, so it doesn't get executed to look at it again 
  - One way to overcome this would be using useEffect, but realistically the best way to go about the problem in the example is to use derived state 

## Initializing State with a Callback (Lazy Initial State)
- We will be persisting the watch list in local storage 
  - We can do this two different ways 
    - When we add the movie to the watchlist 
    - Or in an effect
- Reminder you need to use JSON.stringify() to set your data to a string since localStorage only accepts strings 
- We will use an effect because we want to make the data storing reusable 
- Jonas likes to do state --> event handler functions --> effect 
- useState can also take in a callback function, so we can pull localStorage from there and then we return that value 
  - Has to be a pure function, cannot accept any arguments 
  - Only considers this function on initial render 
  - You have to pass in the function because you don't want it to re-run a step from the function over and over on re-render 

## useState Summary
- Summary defininf and updating state 
  - Creating state
    - Simple way
    - Based on function (lazy evaluation)
      - Function must be pure and accept no arguments. Called only on initial render  
  - Updating state 
    - Simple 
      - Passing in the return value 
      - Based on current state 
        - Using the callback function 
        - Function myst be pure and return next state 
    - Make sure NOT to mutate objects or arrays, but to replace them 

## How NOT to Select DOM Elements in React
- React is about being declaritve, so manually adding an event listener is not a great way to do things 

## Introducing Another Hook: useRef
- What are refs? 
  - Ref with useRef 
    - "Box" (object) with a mutable .current property that is persisted across renders ("normal" variables are alway reset)
    - Two big use cases 
      - Creating variables that stays the same between render (e.g. previous state, setTimeout id, etc.)
      - Selecting and storing DOM elements 
    - Refs are for data that is NOT rendered: usually only appear in event handlers or effects, not in JSX (otherwise use state)
    - Do NOT read write or read .current in render logic (like state)
  - We can write to and read from the ref using .current 
- State vs. Refs 
  - State 
    - Persists across renders: YES 
    - Updating causes re-render: YES
    - Immutable: YES 
    - Asynchronous Updates: YES
  - Refs 
    - Persists across renders: YES 
    - Updating causes re-render: NO
    - - Immutable: NO
    - Asynchronous Updates: NO
  - See diagram in slides on the flow between data 

## Refs to Select DOM Elements
- Happens in 3 steps: 
  - use the ref hook
  - set initial value - usually null 
  - set the ref={} on the element 
  - Then put the function you want on the ref in a useEffect

## Refs to Persist Data Between Renders
- Behind the scenes, we want to keep track of how many times a user changes the movie rating before setting and adding to list 
- We will see more real-world use cases for a ref in later sections, but it;s still good to know how they work 

## What Are Custom Hooks? When to Create One?
- Reusing logic with custom hooks 
  - "I need to reuse"
    - UI 
      - Component 
    - Logic
      - Does logic contain any hooks?
        - No -> Regular function 
        - Yes -> Custom Hook 
  - Allow us to reuse non-visual logic in multiple components 
  - One custom hook should have one purpose, to make it reusable and portable (even across multiple projects)
  - Rules of hooks apply to custom hooks too 
  - Unlike components, can receive and return any relevant data (usually [] or {})
    - Needs to use one or more hooks 
    - Function name needs to start with use
      - This is not optional 

## Creating our First Custom Hook: useMovies
- We will create a hook called useMovies 
  - We want to re-use part of our non-visual logic and we want to extract a huge part of our component out into some custom hook 
- Strategy Jonas likes to use is using default exports for components and named exports custom hooks 
- Reminder curly braces is a named import  
- We put these into a custom hook and return the variables we want in an object, then on the component we return that object destructured 
- Reminder function declarations are hosted 
- A custom hook must use at least one React hook 

## Creating useLocalStorageState
- We will create a custom hook that will behave like the useState hook, where the state gets set in localStorage 

## Creating useKey
- We will abstract the functionality for an event handler on keypress 
  - The escape to close the movie 
- See app-v3 in final to see all the code before we started creating all the custom hooks

## CHALLENGE #1: useGeolocate
- Walked through creating custom hook challenge 