# Section 11: How React Works Behind the Scenes

## Section Overview
- How things work inside React 
- You'll become a better and more confident React developer 
- Will be a bit intense
- Watch at least the final lecture 

## Project Setup and Walkthrough
- We aren't using create-react-app for this one, we need to npm i to start 

## Components, Instances, and Elements
- This difference between these is often an interview question 
- Component vs. instance vs. element 
  - Component 
    - Description of a piece of UI 
    - A component is a function that returns React elements (element tree), usually written as JSX 
    - "Blueprint" or "Template"
  - Component Instance 
    - Instances are created when we "use" components 
    - React internally calls Tab() 
    - Actual "physical" manifestation of a component 
    - Has its own state and props 
    - Has a lifecycle (can "be born", "live", and "die")
  - React Element 
    - JSX is converted to React.createElement() function calls 
    - A React element is the result of these function calls 
    - Information necessary to create DOM elements 
  - DOM Element (HTML)
    - Actual visual represenation of the component instance in the browser 

## Instances and Elements in Practice
- We can look at an instance by using it and priting it in the console 
- $$typeof - is security measure that React has put in and protexts us against certain attacks 
- We could call our component iwth a function, but we get a different type of content, it sees the raw React element 
  - It doesn't see the instance and the state the component manages ends up in the parent component 
  - This will violate the rules of hooks that we will talk about later 

## How Rendering Works: Overview
- Quick recap before we get started 
  - We create components and when we use those we then create component instances every time we use them
  - Component -> Component Instance -> React Element -> DOM element (HTML)
- Overview: how components are displayed on the screen 
  - Render is triggered -- by updating somewhere --> 
    - Common sense meaning of the word "render"
      - Render phase -- React calls component functions and figures out how DOM should be updated -->
        - Commit phase -- React actually writes to the DOM, updating, inserting, and deleting elements --> 
          - Browser paint 
  - In React, rendering is NOT updating the DOM or displaying elements on the screen. Rendering only happens internally inside React, it does not produce visual changes. 
- How renders are triggered 
  - The two situations that trigger renders: 
    - Initial render of the application 
    - State is updated in one or more component instances (re-render)
  - The render process is triggered for the entire application 
  - In practice, it looks like React only re-renders the component where the state update happens, but that's not how it works behind the scenes 
  - Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers 

## How Rendering Works: The Render Phase
- Review: The mechanics of state in React 
  - Not true #1: rendering is updating the screen / DOM 
  - Not true #2: React completely discards old view (DOM) on re-render 
- The render phase 
  - Component instances that triggered re-render --> React Elements 
    - New Virtual DOM 
- The Virtual DOM (React element tree)
  - Initial Render 
    - Component Tree --> React Element Tree "Virtual DOM:
  - Virtual DOM: Tree of all React elements created from all instances in the component tree 
  - Cheap and fast to create multiple trees 
  - Nothing to do with "shadow DOM"
  - Re-renders (update state)
    - Component tree (A --> B - C - D(E - E)) --> React element tree D(E-E
  - Rendering a component will cause all of its child components to be rendered as well (no matter if props changed or not))
    - Necessary because React doesn't know whether children will be affected
- The Render Phase 
  - Current fiber tree (before state update) --> Rconciliation + Diffing (reconciler called "Fiber") --> Updated fiber tree 
- What is reconciliation and why do we need it? 
  - Why not update the entire DOM whenever state changes somewhere in the app? 
    - That would be inefficient and wasteful: 
      - Writing to the DOM is (relatively) slow
      - Usually only a small part of the DOM needs to be updated 
    - React reuses as much of the existing DOM as possible --> HOW? 
      - Reconciliation: deciding which DOM elements actually need to be inserted, deleted or updated in order to reflect the latest state changes 
- The reconciler: fiber 
  - React element tree (virtual DOM) -- on initial render --> Fiber tree -- Fiber "Unit of work" -- current state, props, side effects, used hooks, queue of work -- set up as a linked list 
  - Fiber tree: internal tree that has a "fiber" for each component instance and DOM element 
  - Fibers are NOT re-created on ever render 
  - Work can be done acynchronously 
    - Rendering process can be split into chunks, tasks can be prioritized, and work can be passed, reused, or thrown away 
      - Enables concurrent features like Suspese or transitions 
      - Long renders won't block JS engine 
- Reconciliation in action 
  - View diagram in course slides 
  - Diffing - comparing elements based on their position in the tree 

## How Rendering Works: The Commit Phase
- The commit phase and browser paint 
  - Commit Phase 
      - Updated DOM 
    - React writes to the DOM: insertions, deletions, and updates (list of DOM updates are flushed to the DOM)
    - Committing is asynchronous: DOM is updated in one go, it can't be interrupted. This is necessary so that the DOM never shows partial results, ensuring consistent UI (in sync with state at all times)
    - After the commit phase completes, the workInProgress fiber tree becomes the current tree for the next render cycle 
  - Broswer Paint 
    - Updated UI on the screen 
      - Performed by whatever browser the user is using 
  - React does not touch the DOM. React only renders. It doesn't know where the render result will go --> 
    - React can be used on different platforms ("hosts")
    - Renderers
      - Renderers do not render, they commit the result of render phase 
        - You can have 
          - ReactDOM
            - Browser
          - React Native 
            - iOs 
            - Android 
          - Remotion 
            - Video
          - Many others 
            - Figma 
            - Word 
- Recap: putting it all together 
  - Trigger 
    - Updated React Elements 
    - Happens only on initial render and state updates 
  - Redner phase 
    - New Virtual DOM & Current Fiber Tree 
      - Reconciliation + Diffing 
    - Does not produce any visual output 
    - Rendering a component also renders all of its child components
    - Asynchronouse: work can be split, paused, resumed 
    - Result of render phase 
      -  Updated fiber tree and List of DOM updtaes 
 -  Commit phase 
    -  Updated DOM 
    -  Synchronous: DOM updates are written in one go, to keep UI consistent 
 -  Browser paint 
    -  Updated UI on screen 

## How Diffing Works
- Diffing - comparing elements step-by-step, based on their position in the tree 
- How diffing works 
  - Diffing uses 2 fundamental assumptions (rules)
    - Two elements of different types will produce different trees 
    - Elements with a stable key prop stay the same across renders 
  - This allows React to go from 1,000,000,000[O(n^3)] to 100 [O(n)] operations per 1000 elements 
  - Same position, different element 
    - React assumes entire sub-tree there is no longer valid 
    - Old components are destroyed and removed from DOM, including state 
    - Tree might be rebuilt if children stayed the same (state is reset)
  - Same position, same element 
    - Element will be kept (as well as child elements), including state 
    - New props / attributes are passed if they changed between renders 

## Diffing Rules In Practice
- Walkthrough of diffing in our code 

## The Key Prop
- What is the key prop? 
  - Key prop 
    - Special prop that we use to tell the diffing algorithm that an element is unique 
    - Allows react to distinguish between multiple instance of the same component type 
    - When a key stays the same across renders, the element will be kept in the DOM (even if the position in the tree changes)
      - Using keys in lists 
    - When a key changes between renders, the element will be destroyed and a new one will be created (even if the position in the tree is the same as before)
      - Using keys to reset state 
- 1. Keys in Lists [stable key]
  - No keys 
    - Same elements, but different position in tree, so they are removed and recreated in the DOM (bad for performance)
  - With keys 
    - Different position in the tree, but the key stays the same, so the lements will be kept in the DOM 
    - Always use keys! 
- 2. Key prop to rest state [changing key]
  - If we have the same lement at the same position in the tree, the DOM element and state will be kept 
  - With no key 
    - State was not preserved. NOT what we want 
  - With key 
    - State was reset 

## Resetting State With the Key Prop
- Added in the key prop to get our tabs to work correctly 

## Using the Key Prop to Fix Our Eat-'N-Split App
- Added in the key prop to fix the form not resetting when we select a new friend 
- You add a key that will stay the same across re-renders 

## Rules for Render Logic: Pure Components
- The two types of logic in react components 
  - Render logic 
    - Code that lives at the top level of the component function 
    - Participates in describing how the component view looks like 
    - Executed every time the component renders 
  - Event handler functions 
    - Executed as a consequence of the event that the handler is listening for (change event in this example)
    - Code that actually does things: updating state, perform an HTTP request, read an input field, navigate to another page, etc. 
- Refresher: Functional Programming Principles 
  - Side effect: dependency on or modification of any data outside the function scope. "Interaction with the outside world". Examples: mutating external variables, HTTP requests, writing to DOM 
    - Side effect: outside variable mutation 
  - Unpredictable output (date changes)
  - Pure function: a function that has no side effects
    - Does not change any variables outside its scope 
    - Given the same input, a pure function always returns the same output
  - Side effects are not bad! A program can only be useful if it has some interaction with the outside world
- Rules for render logic 
  - Components must be pure when it comes to rneder logic: given the same props (input), a component instance should always return the same JSX (output)
  - Render logic must produce no side effects: no interaction with the "outside world" is allowed. So, in tender logic: 
    - Do NOT perform network requests (API calls)
    - Do NOT start timers 
    - Do NOT directly use the DOM API 
    - Do NOT mutate objects or variables outside of the function scope 
      - This is why we can't mutate props 
    - Do NOT update state (or refs): this will create an infinite loop 
  - Side effects are allowed (and encouraged) in event handler functions! There is also a special hook to register side effects (useEffect)

## State Update Batching
- How state updates are batched 
  - Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers 
  - Event handler function (non-example)
    - See diagram in course slides for code example 
      - Three states are being updated, it does not re-render these one at a time 
    - Batched state update -- Just one render and commit per event handler 
      - No wasted renders, better for performance 
- Updating state is asynchronous 
  - State is stored in the Fiber tree during render phase --> At this point, re-render has not happened yet --> therefore, answer still contains current state, not the updated state ('') "stale state" --> Updating state in React is asynchronous 
    - Updated state variables are not immediately available after setState call, but only after the re-render 
    - This also applies when only one state variable is updated 
    - If we need to update state based on previous update, we use setState with callback (setAnswer(answrer => ...))
- Batching beyond event handler functions 
  - Automatic batching in...
    - React 17 and 18 
    - Event handlers - yes and yes 
    - Timeouts - no and yes 
    - Promises - no and yes 
    - Native Events - no and yes (ex: addEventListener)
    - We now get automatic batching at all times, everywhere 
  - We can opt out of automatic batching by wrapping a state update in ReactDOM.flushSync() (but you will never need this)
  - You may still see a codebase in React 17, so you may not have access to automatic batching since it was introduced for other events in 18 

## State Update Batching In Practice
- Reminder state is updated after re-render 
- If the state value is at it's defualt value, it will not re-render since the new state is the same as the current state 
  - Example hitting the undo button if likes are already at 0 which is the initial state value 
- Always use the callback function when setting state because you never know what another developer will do later on for another feature and we don't want stale state 

## How Events Work In React
- DOM Refresher: Event propagation and delegation
  - DOM tree (not Fiber tree or React element tree)
  - Event gets created at the very top of the tree and then will travel down the tree in the capturing phase 
    - Then goes to the target element and then the event travels back up the tree in the bubbling phase 
  - Two important things to understand this: 
    - The event travels through every single child 
    - By default, event handlers listen to events on the target and during the bubbling phase 
    - We can prevent bubbling with e.stopPropigation() 
  - Event delegation 
    - Handling events for multiple elements centrally in one single parent 
    - Better for performance and memory as it needs only one handler function 
      - Add handler to parent 
      - Check for target element 
      - If target is one of the elements handle the the event 
    - Very common in vanilla JS apps, but not so much in React apps 
- How React handles events 
  - React registers all event handlers on the root DOM container. This is where all events are handled 
    - Usually div#root, but can be any DOM element 
  - Behind the scenes, React performs event delegation for all events in our applications
  - It's really the DOM tree that matters here and not the component 
- Synthetic events 
  - In vanilla JS we get access too 
    - PointerEvent 
    - MouseEvent 
    - KeyboardEvent 
  - SyntheticEvent in React 
    - Wrapper around the DOM's natice event object 
    - Has same interface as native event objects, like stopPropagation() and preventDefault() 
    - Fixes browser inconsistencies, so that event works in the exact same way in all browsers 
    - Most synthetic events bubble (including focus, blur, and change), except for scroll 
  - Event handlers in React vs JS 
    - Attributes for event handlers are named using camelCase (onClick instead of onclick or click)
    - Default behavior can not be prevented by returning false (only by using preventDefault())
    - Attach "capture" if you need to handle during capture phase (example: onClickCapture)

## Libraries vs. Frameworks & The React Ecosystem
- First an analogy 🍣
  - All-in-one kit 
    - Ease of mind: all ingredients are included 
    - No choice: you're stuck with kit's ingredients 
    - Angular, Vue, Svelte
  - Separate ingredients 
    - Freedom: you can choose the best ingredients 
    - Decision fatigue: you need to research and buy all ingredients separately 
    - React 
- Framework vs. Library 
  - Framework - All-in-one kit 
    - Frameworks include everything 
      - HTTP requests, styling, routing, form management 
    - Ease of mind: everything you need to build a complete application is included in the framework (batteries included)
    - No choice: you're stuck wih the framework's tools and conventions (which is not always bad!)
  - Library - Separate ingredients 
    - React - "view" library
    - External libraries need to be brought in like HTTP requests, styling, routing, form management 
    - Freedom: You can (or need to) choose multiple 3-rd party libraries to build a complete application 
    - Decision fatigue: you need to research, download, learn, and stay up-to-date with multiple external libraries 
- React 3rd party library ecosystem 
- Library options for different React application needs -- () means most important or what we'll go over in this course
  - Routing (for SPAs) -- (React Router) or React Location 
  - HTTP requests -- (JS fetch()) or Axios 
  - Remote state management -- (React Query) or SWR or Apollo 
  - Global state management -- (Context API) or (Redux) or ustand 
  - Styling -- (CSS modules) or (styled components) or (tailwindCSS )
  - Form management -- (React Hook Form) -- Formik 
  - Animations/transitions -- Motion or react-spring
  - UI components -- Material UI or chakra or mantine 
- Frameworks built on top of React
  - "Opinionated" React frameworks 
    - Next.js 
    - Remix 
    - Gatsby 
  - React frameworks offer many other features: server-side rendering (SSR), static site generation (SSG), better developer experience (DX), etc
    - Full stack frameworks 
  - next.js section will not be made available until later 

## Section Summary: Practical Takeaways
- Practical summary 
  - A component is like a blueprint for a piece of UI that will eventually exist on the screen. When we "use" a component, React creates a component instance, which is like an actual physical manifestation of a component, containing props, state, and more. A component instance, when rendered, will return a React element 
  - "Rendering" only means calling component functions and calculating what DOM elements need to be inserted, deleted, or updated. It has nothing to do with writing to the DOM. Therefore, each time a component instance is rendered and re-rendered, the function is called again 
  - Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component
  - When a component instance gets re-rendered as well. This doesn't mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders. But all this re-rendering can still have an impact on performance (more on that later in the course)
  - Diffing is how React decides which DOM elements need to be added or modified. If, between renders, a certain React element stays at the same position in the element tree, the corresponding DOM element and component and component state will stay the same. If the element changed to a different position, or if it's a different element type, the DOM element and state will be destroyed 
  - Giving elements a key prop allows React to distinguish between multiple component instances. When a key stays the same across renders, the element is kep in the DOM. This is why we need to use keys in lists. When we change the key between renders, the DOM element will be destroyed and rebuilt. We can use this as a trcik to reset state. 
  - Never declare a new component inside another component! Doing so will re-create the nested compoonent every time the parent component re-renders. React will always see the nested component as new, and therefore reset its state each time the parent state is updated. 
  - The logic that produces JSX output for a component instance "render logic" is not allowed to produce any side effects: no API calls, no timers, no object or variable mutations, no state updates. Side effects are allowed in event handlers and useEffect (next section)
  - The DOM is updated in the commit phase, but not by React, but by a "renderer" called ReactDOM. That's why we always need to include both libraries in a React web app project. We can use other renderers to use React on different platforms, for example to build mobile or native apps 
  - Multiple state updates inside an event handler function are batched, so they happen all at once, causing only one re-render. This means we can not access a state variables immediately after updating it: state updates are asynchronous. Since React 18, batching also happens in timeouts, promises, an native event handlers 
  - When using events in even handlers, we get access to a synthetic event object, not the browser's native object, so that events work the same way across all browsers. The difference is that most synthetic events bubble, including focus, blur, and change, which do not bubble as native browser events. Only the scroll event does not bubble 
  - React is a library, not a framework. This means that you can assemble your application using your favorite third-party libraries. The downside is that you need to find and learn all these additional libraries. No problem, as you will learn about the most commonly used libraries in this course 