# Section 12: Effects and Data Fetching

## Section Overview
- Data fetching is essential 
- Effects with useEffect hook 
- Effect cleanup 
- Real-world application! 

## The Component Lifecycle
- Component (instance) lifecycle
  - Mount / Initial Render 
    - Component instance is rendered for the first time 
    - Fresh state and props are created 
  - Re-render (optional)
    - Happens when: 
      - State changes 
      - Props change 
      - Parent re-renders 
      - Context changes 
  - Unmount 
    - Component instance is destoyed and removed 
    - State and props are destroyed 
  - We can define code to run at these specific points in time using useEffect 

## How NOT to Fetch Data In React
- The fetch is introducing a side effect into the components render logic, this code will run as the component first mounts, so we should have no side effects
  - However, when setting state in the render logic, it will repeatedly call the API and keep the component re-rendering

## useEffect to the Rescue
- The idea of the useEffect, this is a place where we can safely write sifeEffects, will be available after certain renders 
  - Doesn't return anything, but we do need pass in a function and a dependency array
  - The dependency array is the most confusing thing about this hook 
    - [] = only runs on mount 
- In a larger more real world application, we may use some external library for data fetching 

## A First Look at Effects
- Where to create side effects
  - Review: A side effect is basically any "interaction between a React component and the world outside the component". We can also think of a side effect as "code that actually does something". Example: Data fetching, setting up subscriptions, setting up timers, manually accessing the DOM, etc. 
  - Side Effect 
    - We need side effects all the time. They make our applications do something. Not in render logic! 
    - Can be made in 
      - Event handlers 
        - Triggered by EVENTS: onClick, onSubmit, etc. 
        - Sometimes this is not enough for the application's needs 
      - Effects (useEffect)
        - Effects allow us to write code that will run at different moments: mount, re-render, or unmount
- Event handlers vs. effects 
  - Both produce the same result, but at different moments  
  - Event handlers 
    - When? 
      - Executed when the corresponding event happens
      - Used to react to an event 
      - Preferred way of creating side effects
  - Effect (useEffect)
    - Executed after the component mounts (initial render), and after subsequent re-renders (according to dependency array)
    - Cleanup function - called before the component re-renders or unmounts
    - Used to keep a component sunchronized with some external system (in this example, with the API movie data)
      - Thinking about synchronization, not lifecycles

## Using an async Function
- The effect function we place into useEffect cannot be used in useEffect, due to race, so we have to create a new function inside

## Adding a Loading State
- We want to display a loading indicator while our data is loading

## Handling Errors
- When working with asynchronous data, we always need to assume something can go wrong 
- finally{} at the end of a try/catch will always be run 

## The useEffect Dependency Array
- What's the useEffect dependency array?
  - The dependency array 
    - By default, effects run after every render. We can prevent that by passing a dependency array.
    - Without the dependency array, React doesn't know when to run the effect 
    - Each time one of the dependencies changes, the effect will be executed again 
    - Every state variable and prop used inside the effect MUST be included in the dependency array
      - Otherwaise, we get a "stale closure". We will go more into depth in a future section. 
- useEffect is a synchronization mechanism 
  - The mechanics of effects 
    - useEffect is like an event listener that is listening for one dependency to change. Whenever a dependency changes, it will execute the effect again 
    - Effects react to updates to state and props used inside the effect (the dependencies). So effecs are "reactive" (like status updates re-renderingt the UI)
  - Dependencies Example 
    - title CHANGES OR userRating CHANGES 
    - Effect is executed again 
    - Document title is updated 
  - Component state/props --> Synchronize with --> External system (side effect)
- Synchronization and lifecycle 
  - Dependency (state or props) changes --> 
    - Effect is executed again or component is re-rendered -- Effects and component lifecycle are deeply connected
    - We can use the dependency array to run effects when the component renders or re-renders 
  - Dependency array -- synchronization -- lifecycle 
    - useEffect(fn, [x,y,z]) -- effect synchronizes with x, y, and z -- Runs on mount and re-renders triggered by updating x, y, or z
    - useEffect(fn, []) -- effect synchronizes with no state/props -- runs only on mount (initial render)
    - useEffect(fn) -- effect synchronizes with everything -- runs on every render (usually bad ⛔️)
- When are effects executed? 
  - Mount (initial render)
  - Commit 
  - Browser Paint 
  - Effect -- asynchronously after it has been painted to the screen 
    - It's because effects are usually fetching data 
    - If an effect set state, an additional render will be required 
  - title CHANGES 
  - Re-render 
  - Commit 
  - Layout Effect
    - Anther type of effect that is very rarely necessary (useLayoutEffect)
    - React discourages 
  - Browser Paint 
  - [Will learn about this gap later]
  - Effect 
  - Unmount 
  - [Will learn about this gap later]

## Synchronizing Queries With Movie Data
- Before re-fetching data, you need to reset the error since you most likely had one before 

## Selecting a Movie
- We will be adding the functionality to select a movie that comes up during the query into the watch box tab 
- We will need the id for our state because 

## Loading Movie Details
- Whenever this component is going to mount, we want to fetch the data for the movie, so each time this component mounts we want a useEffect

## Adding a Watched Movie
- Added functionality to be able to add a movie to the watched list after rating it and remove a movie from the list 

## Adding a New Effect: Changing Page Title
- To change the page title in the browser is a sideEffect because we are interacting with the outside world 
- To change the title you just use document.title

## The useEffect Cleanup Function
- When are effects executed? 
  - Re-render --> Browser paint --> [CLEANUP] --> Effect --> Unmount --> CLEANUP 
- The cleanup function 
  - useEffect cleanup function 
    - Function that we can return from an effect (optional)
    - Runs on two different occasions: 
      - Before the effect is executed again 
      - After a component is unmounted 
  - Necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted 
  - Each effect should do only one thing! Use one useEffect hook for each side effect. This makes effects easier to clean up. 
  - Component renders -> Execute effect if dependency array includes updated data 
  - Component unmounts -> execute cleanup function
    -  Examples 
       -  Effect -- Potential Cleanup 
          -  HTTP request -> cancel request 
          -  API subscription -> cancel subscription 
          -  Start timer -> stop timer 
          -  Add event listener -> remove listener 

## Cleaning Up the Title
- <code>
    return function () {
      document.title = 'usePopcorn';
    };
</code>
- Closures 
  - A function will always remember the variables that were present at the time and the place where the function was created 
  - It closes over the variable 
- The cleanup function runs between re-renders 

## Cleaning Up Data Fetching
- We will be fixing the requests for when you type in a query 
- Race condition, when all of the requests are racing to fetch the data 
- We will be using the abort browser API 

## One More Effect: Listening to a Keypress
- We want a feature where we listen globally to close the movie detail using the "esc" key 
  - We have to attach an event listener for the entire app 
- useEffect is also an escape hatch, so we don't have to write all of our code the React way 

## CHALLENGE #1: Currency Converter
- Walked through Challenge #1