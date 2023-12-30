# Section 18: Advanced State Management: The Context API

## Section Overview
- Context API patterns 
- State management deep dive 
- Including an interactive map 

## CHALLENGE #1: Understand "The Atomic Blog" App
- At first glance to see if this project was built using Vite or Create React App, we look at the package.json and see there are React scripts, which means it was created using Create React App 
- Next we need to install the node modules

## What Is the Context API?
- A Solution to prop drilling
  - TASK: Passing state into multiple deeply nested child components 
  - SOLUTION 1: Passing Props 
    - PROBLEM: "PROP DRILLING"
  - Remember that a good solution to "prop drilling" is better component composition (see "Thinking In React" section)
  - SOLUTION 2: CONTEXT API 
    - Read state from everywhere 
- What is the Context API? 
  - Context API
    - System to pass data throughout the app without manually passing props down the tree 
    - Allows us to "broadcast" global state to the entire app 
    - Provider: gives all child components access to value 
    - Value: data that we want to make available (usually state and functions)
    - Consumers: all components that read the provided context value
  - Value is updated -> All consumers re-render 
    - A new way of re-rendering components 

## Creating and Providing a Context
- We are starting with refacotring this atomic blog app to learn about the context API 
- We use createContext() which is provided with React 
  - We can pass in a default value but we usually don't do that because the value cannot change over time, so we either set it to null or leave it empty 
  - Variable name always starts with a capital letter because it technically is a component 
- Usually we would have one context per state domain 
  - So typically we would separate the post and the search into their own context 

## Consuming the Context
- useContext is a hook we use to consume the context 
  - Returns the entire value we did pass into the context and then we can destructure it and take out the part we need 
- Our data is being injected by the provider without having to pass it via props 

## Advanced Pattern: A Custom Provider and Hook
- The implementation we have now is fine, but we can make this more advanced by implementing more advanced patterns
- We placed the context into it's own context file and then passed it down using the children props 
- Now we will create our own custom hook
  - Having to write PostContext over and over again can be annoying, so we can encapsulate this into it's own hook 
  - You cannot access the context in the parent the way we set it up, we can check if the context is undefined 

## Thinking In React: Advanced State Management
- Review: What is state management? 
  - State management: giving each piece of state the right home 
    - We learned about: 
      - When to use state (See lecture: Fundamentals of state management for flow chart)
      - Types of state (accesibility): local vs global 
    - What we'll learn in this lecture: 
      - Types of state (domain): UI vs remote 
      - Where to place each piece of state 
      - Tools to manage all types of state 
- Types of state 
  - State accessibility 
    - Local state 
      - Needed only by one or few components
      - Only accesible in component and child components 
    - Global state 
      - Might be needed by many components 
      - Accessible to every component in the application 
    - If this component was rendered twice, should a state update in one of them reflect in the other one?
      - No? Use Local State 
      - Yes? Use Global State 
  - State domain 
    - Remote State 
      - All application data loaded from a remote server (API)
      - Usually asynchronous
      - Needs re-fetching + updating
    - UI State 
      - Everything else 
      - Theme, list filters, form data, etc. 
      - Usually synchronous and stored in the application 
- State Placement Options 
  - Where to placestate? -- Tools -- When to use? 
    - Local Component -- useState, useReducer or useRef -- Local state 
    - Parent Component -- useState, useReducer, or useRef -- Lifting up state 
    - Context -- Context API + useState or useReducer -- Global state (preferably UI state)
    - 3rd-party library -- Redux, React Query, SWR, Zustand, etc. -- Global state (remote or UI)
    - URL -- React Router -- Global state, passing between pages 
    - Browser -- Local storage, session storage, etc. -- Storing data in user's browser 
      - State that doesn't re-render any components, but still application state 
- State Management Tool Options 
  - How to manage different types fo state in practice? 
    - State Accessibility 
      - Local State and UI State 
        - useState 
        - useReducer 
        - useRef
      - Local State and Remote State 
        - fetch + useEffect + useState/useReducer (Mostly in small applications) 
      - Global State and UI State
        - Context API + useState/useReducer 
        - Redux, Zustand, Recoil, etc. 
        - React Router 
      - Global State and Remote State 
        - Context API + useState/useReducer
        - Redux, Zustand, Recoil, etc. 
        - Tools highly specialized in handling remote state 
          - React Query 
          - SWR
          - RTK Query 
    - State Domain 
      - UI State and Local State 
        - useState 
        - useReducer 
        - useRef
      - Remote State and Local State 
        - fetch + useEffect + useState/useReducer (Mostly in small applications) 
      - UI State and Global State 
        - Context API + useState/useReducer 
        - Redux, Zustand, Recoil, etc. 
        - React Router 
      - Remote State and Global State 
        - Context API + useState/useReducer
        - Redux, Zustand, Recoil, etc. 
        - Tools highly specialized in handling remote state 
          - React Query 
          - SWR
          - RTK Query 

## Back to "WorldWise": Creating a CitiesContext
- Just because you know how to use the ContextAPI it doesn't mean that it is always the best solution to manage state 

## Consuming the CitiesContext
- Creating a custom hook to be able to use the context anywhere in the application

## Finishing the City View
- In bigger applications it is better to do a new HTTP request for singular objects 
  - The single objects have more data than what may be given when you call all of them

## Including a Map With the Leaflet Library
- Many applications require a map, we will `npm i react-leaflet leaflet`
  - This is the biggest open source library to include maps 
- When using react-leaflet, you still have to set up the base leaflet
  - You can incude the link tags using @import in your stylesheets
- Used the fr/hot url for our map to change the style 
- To change when you scroll, set scrollWheelZoom to true

## Displaying City Markers on Map
- The popup has been pre-styled by Jonas, so you can reuse in another application 

## Interacting With the Map
- Leaflet gives us access to certain hooks like, useMap() and map.setView() 
- We used our useState and the set longitude and latitude to set a useEffect to change the map whenever those variables are updated 
- When we add a new city, we need to give the form component access to the position we clicked on the form, so as we click on it, we can navigate using the params 

## Setting Map Positiong With Geolocation
- We will be using the custom hook we wrote in one of the earlier challenges to get position 
- It's better to use named exports when working with hooks
- There is a push in React to write as little effects as possible, but we will be going over more of this in the next section 

## Fetching City Data In the Form
- Here we're creating a custom hook that requires a custom hook

## Creating a New City
- Whenever we need something we don't want to build ourselves, we use npm 
  - We will be using the react-datepicker from npm 
- For this app, we will keep our application state in sync with remote state
  - Not the way to go in bigger applications, we use React Query for this 
- Reminder when we need multiple classes with CSS modules we create a template literal 
- Your handler function can be an async function 

## Deleting a City
- Remember when deleting we filter out the array 

## Advanced State Management System: Context + useReducer
- We will refactor our code in the city context to use useReducer 
- Reducers need to be pure functions, so fetch requests cannot be done, they need to be done outside in separate functions and then we can dispatch actions when the data has been received 
- When naming cases it is important to model your actions as events and not setters, it makes it easier to see all the related state transitions 
  - Examples: cities/loaded 
  - Example above is used primarily in Redux 
- When we are working with asynchrnous data and code we have two options when it comes to the disptach function: 
  - First option is we pass in all the state plus the dispatch function into the value and then we can use the disptach function inside of the components, so we cannot have our logic in the reducer 
  - Second option we pass the dispatch function into event handler functions and then we pass those functions into the context 
- When reading from the URL our data always comes back to us as a string 

## Adding Fake Authentication: Setting Up Context
- In a typical frontend app, user auth usually works in 3 steps 
  - First we get a username and password from a login form and then check if the username and password are correct from an API endpoint 
  - If correct we direct the user to the main app and then save the user object in our state 
  - Then we need to protect our application from users who are not logged in 
- For fake auth, we are just checking if the user and password are correct 
  - In a later app, we will work on real authentication 
- When creating a new context you always 
  - import createContext and useContext, create function for the Provider that takes in the children prop and your custom hook that first checks if the value is undefined 
  <code>
    import { createContext, useContext } from 'react';

    const AuthContext = createContext();

    function AuthProvider({ children }) {
      // Handler functions here, example: login, logout 

      return <AuthContext.Provider>{children}</AuthContext.Provider>;
    }

    function useAuth() {
      const context = useContext(AuthContext);

      if (context === undefined)
        throw new Error('AuthContext was used outside of AuthProvider');
      
      return context;
    }

    export { AuthProvider, useAuth };
  </code>
- A context doesn't have to do anything with data fetching, we can broadcast data to the entire tree 

## Adding Fake Authentication: Implmenting "Login"
- When you build your own applications you should never, use a fake user with a password of password 
  - They'll be able to see it, we're only doing this for the mechanics of authentication implementation 
- Order of your providers doesn't matter, just depends when you're calling state from one place to another 
- replace{} in the useNavigate portion, tells the browser to replace that page/component in the history stack 

## Adding Fake Authentication: Protecting a Route
- We should not call navigate from top level code because that is in an effect and effects belong in useEffect()
  - Our ProtectedRoute component will initially render the children and then everything the user is trying to read, so it still tries to attempt to execute the render 
- We will come back to this application in the next section

## CHALLENGE #2: Refactoring "React Quiz" to Context API
- Walked through Challenge #2