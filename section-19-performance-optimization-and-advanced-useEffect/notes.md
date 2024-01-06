# Section 19: Performance Optimization and Advanced useEffect

## Section Overview
- Analyzing wasted renders 
- Optimizing performance 
- Deep dive into useEffect 

## Performance Optimization and Wasted Renders
- Performance Optimization Tools
  - Prevent wasted renders 
    - memo 
    - useMemo 
    - useCallback
    - Passing elements as children or regular props 
  - Improve App Speed/ Responsiveness 
    - useMemo
    - useCallback
    - useTransition
  - Reduce Bundle Size
    - Using fewer 3rd Party packages 
    - Code splitting and lazy loading 
  - There's no need to use all of these tools all the time, the goal is to give you access and add them to your toolbox to use them when you need, which we will learn when to use them 
  - This list of tools and techniques is, by no means, exhaustive. You're already doing many optimiations by following the best practice Jonas has been showing 
- When does a components instance re-render?
  - A component instance only gets re-rendered in 3 different situations: 
    - State changes 
    - Context changes 
    - Parent re-renders 
      - Creates the false impression that changing props re-renders a component. This is NOT true. 
  - Remember: a render does not mean that the DOM actually gets updated, it just means the component function gets called. But this can be an expansive operation 
    - Wasted render: a render that didn't produce any change in the DOM 
      - Usually no problem, as React is very fast 
    - Only a problem when they happen too frequenty or when the component is very slow 

## The Profiler Developer Tool
- The profiler we can analyze renders and re-renders, so we can see which components rendered, why they have re-rendered, and how long each render took 
- To update the settings, we need to make sure we select the setting that records why each component has re-rendered 
  - We can then record and then stop the recording 
  - Gray components did not re-render, the more yellow a color, the longer it took to render 

## A Surprising Optimization Trick With children
- We passed our slow component as a child, so it no longer renders the component 
  - SlowComponent gets rendered imemdiately and then when the Counter is clicked it does not get effected, it bails out of re-rendering this component 
- Think of how Providers work because it takes in the children 

## Understanding memo
- What is memoization?
  - Memoization: Optimization technique that executes a pure function once, and saves the result in memory. If we try to execute the function again with the same arguments as before, the previously saved result will be returned, without executing the function again 
  - function A --> Call function A --> Store Result --> Cache ---- Call function A 
    - New Inputs --> New calculated result 
    - Same inputs --> Cached result 
    - See actual slides for the actual diagram 
  - Memoize components with memo 
  - Memoize objects with useMemo 
  - Memoize functions with useCallback 
  - Prevent wasted renders 
  - Improve app speed/responsiveness 
- The Memo function 
  - memo 
    - Used to create a component that will not re-render when its parent re-renders, as long as the props stay the same between renders 
      - Memoize component 
    - Only affects props! A memoized component will still re-render when its own stat changes or when a context that it's subscribed to changes 
    - Only makes sense when the component is heavy (slow rendering), re-renders often, and does so with the same props 
  - Regular behavior (no memo)
    - Components re-renders --> Child re-renders 
  - Memoized child with memo 
    - Components re-renders 
      - Same props --> Memoized child does NOT re-render 
      - New props --> Mempozed child re-renders 

## memo in Practice
- Using the archive in the atomic blog app
- We call memo from React 
  - We wrap the function for the component in const Archive = memo(function Archive() {}) 
- memo tells it the prop that it received is still the same as before when we're changing state elsewhere 

## Understanding useMemo and useCallback
- An issue with memo
  - In React, everything is re-created on every render (including objects and functions) --> 
    - In JavaScript, two objects or functions that look the same, are actually different 
      - Therefore --> If objects or functions are passed as props, the child component will always see them as new props on each re-render --> 
        - If props are different between re-renders, memo will not work 
          - SOLUTION --> We need to memoize objects and functions, to make them stable (preserve) between re-renders (memoized {} === memoized {})
- Two new hooks: useMemo and useCallback 
  - useMemo and useCallback 
    - Used to memoize values (useMemo) and function (useCallback) between renders 
    - Values passed into useMemo and useCallback will be stored in memory ("cached") and returned in subsequent re-renders, as long as dependencies ("inputs") stay the same 
    - useMemo and useCallback have a dependency array (like useEffect): whenever one dependency changes, the value will be re-created 
    - Only use them for one of the three use cases 
  - Regular behavior (no useMemo)
    - Components re-renders --> New value 
  - Memoizing a value with useMemo 
    - Components re-renders 
      - Same deps --> Cached value is returned NO new value 
      - Deps Change --> New value 
  - Three big use cases: 
    - Memoizing props to prevent wasted renders (together with memo)
    - Memoizing values to avoid expensive re-calculations on eery render 
    - Memoizing values that are used in dependency array of another hook 
      - For example to avoid infinite useEffect loops  

## useMemo in Practice
- useMemo takes in a callback function of the object and shows what should be performed on the initial render 
- [] - means the value will only be computed once in the beginning and then never change 
- Stale closure - a function created initially and remembers all of the variables at the start and then never runs again 
- For our example, we will put in posts.length into our array so the bottom updates a well 
  - But this makes rendering a new post makes the object change even though it's memoized 

## useCallback in Practice
- It makes very little sense to wrap every function into a useMemo and useCallback 
  - It's best to find the slow components with bad performance and useCallback there 
- In the future this could disappear because the React team is looking into a compiler that memoizes all of the components already 
- React gaurantees that the setter functions of the useState hook always have a stable identity, which means they will not change on renders 
  - We can think of them as being automatically memoized 
  - This is why we don't include them in the useEffect and useCallback hooks 
    - Even when you're setting the new hook 

## Optimizing Context Re-Renders
- You only need to optimize your context if these three things are true at the same time: 
  - The state in the context needs to change all the time 
  - The context has many consumers 
  - The app is slow and laggy 
- Optimizing your context can be quite confusing, so there is no set recipe for this 
- Your options are to pass the children or memoize the direct descendents of the context 

## Back to The "WorldWise" App
- Cleaning up getCity function in useEffect that ESLint wanted us to fix 
  - This is a real world situation where the useCallback can be used 

## Optimizing Bundle Size With Code Splitting
- The bundle and code splitting 
  - Server -- On initial load --> JS to Client 
  - Bundle: JavaScript file containing the entire application code. Downloading the bundle will load the entire app at once, turning it into a SPA 
    - No more Files are loaded 
    - Spa runs entirely on the client 
    - Produced by a tool like Webpack (inside create-react-app) or Vite 
  - Bundle size: Amount of JavaScript users have to download to start using the app. One of the most important things to be optimized, so that the bundle takes less time to download 
  - Code splitting: splitting bundle into multiple parts that can be downloaded over time ("lazy loading")
- The most common way is to split at the page level 
  - This is what most applications do 
  - Any component can be lazy loaded the way Joans' shows us in this lecture 
- `npm run build` will bundle our code 
  - Using dynamic import will help us 
- This is where the suspense API comes into play 
  - This is a concurrent feature that is part of modern React that allows components to suspend (allow them to wait while something else happens)
    - Allows us to have a fallback so in our case a Loader 

## Don't Optimize Prematurely
- Don't optimize prematurely 
  - DO's 
    - Find performance bottlenecks using the Profilerand visual inspection (laggy UI)
    - Fix those real performance issues 
    - Memoize expensive re-renders 
    - Memoize expensive caluclations 
    - Optimize context fi it has many consumers and changes often 
    - Memoize contact value + child components 
    - Implement code splitting + lazy loading for SPA routes 
  - DON'T!
    - Don't optimize prematurely! 
    - Don'toptimize anything if there is nothing to optimize...
    - Don't wrap all components in memo() 
    - Don't wrap all values in useMemo() 
    - Don't wrap all functions in useCallback() 
    - Don't optimize context if it's not slow and doesn't have many consumers 

## useEffect Rules and Best Practices
- useEffect dependency array rules 
  - Dependency array rules 
    - Every state variable, prop used inside the effect MUST be included in the dependency array 
    - All "reactive valies must be included! That means any function or variable that reference any other reactive values 
      - Reactive value: state, prop, or context value, or any other value that references a reactive value 
    - Dependencies choose themselves: NEVER ignore the exhaustive-deps ESLint rule! 
    - Do NOT use objects or arrays as dependencies (objects are recreated on each render, and React sees new objects as different, {} !== {})
  - The same rules apply to the dependency arrays of other hooks: useMemo and useCallback 
- Removing unnecessary dependencies
  - Removing function dependencies 
    - Move function into the effect 
    - If you need the function in multiple places, memoize it (useCallback)
    - If the function doesn't reference any reactive values, move it out of the component 
  - Removing object dependencies 
    - Instead of including the entire object, include only the properties you need (primitive values)
    - If that doesn't work, use the same strategies as for functions (moving or memoizing object)
  - Other strategies
    - If you have multiple related reactive values as dependencies, try using a reducer (useReducer)
    - You don't need to include setState (from useState) and disptach (from useReducer) in the dependencies, as React gaurantees them to be stable across renders 
- When not to use an effect 
  - Effects should be used as a last resort, when no other solution makes sense. React calls them an "escape hatch" to step outside of React 
  - Three cases where effects are overused: (avoid these as a beginner)
    - Responding to a user event. An event handler function should be used instead 
    - Fetching data on component mount. This is fine in small apps, but in real-world app, a library like React Query should be used 
    - Synchronizing state changes with one another (setting state based on another state variable). Try to use derived state and event handlers. 
      - We actually do this in the current project, but for a good reason 

## CHALLENGE #1: Fix Performance Issues in "Workout Timer"
- We will set up a small project 
- The small clock is causing our performance issues in this app 
  - Since it is re-rendered every single second 
  - You can memo the `export default memo(Component)` at the bottom of the component 

## Setting State Based on Other State Updates
- Our issue is we need one of our derived state variables to update based on the input, but also based on the buttons 
- We will use the useEffect hook to synchronize these states with one another 
  - We typically shouldn't do this, but in this case, it's best with as many variables we are trying to update
  - useEffect is causing two renders, so be aware of this issue when going this route 

## Using Helper Functions In Effects
- We will be playing a sound whenever the duration changes, this will cause a ton of issues that we will work through 
- Putting the sound in our useEffect is not allowing us to update the state here, but because playSound is part of the dependency array, it is breaking our state and run the useEffect hook 
- We can synchronize the duration state and the sound 
- Each effect needs to be responsible for one thing, not setting the duration and playing the sound, we need two different useEffects for these two states

## Closures in Effects
- Why does useEffect need the dependency array?
  - In JS a closure is basically the fact that a function captures all of the variables from it's lexical scope at the time the function was created
    - It closes over the effects 
    - It will always have access to the variables where they were created 
- React hooks rely heavily on closures, this is very true for useEffect 
- When the function was created it creates a closure and closes over the props and the state 
  - We can call this a snapshot, so we still have access to this initial snapshot 
  - With the dependency array being empty, it won't get access to the change 
  - So when we specify, we tell the useEffect hook that you only need to re-run this effect when x changes 
    - But it will still show stale values, we need to add all the values we want the effect to run when those variables states change 