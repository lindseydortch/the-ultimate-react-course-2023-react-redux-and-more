# Section 20: Redux and Modern Redux Toolkit (With Thunks)

## Section Overview
- We'll learn Redux based on useReducer 
- Modern Redux Toolkit
- API requests with Thunks

## Introduction to Redux
- What is Redux?
  - Redux
    - 3-rd Party library to manage globl state 
    - Standalon library, but easy to integrate with React apps using react-redux lbrary 
    - All global state is stored in one globally accessible store, which is easy to update using "actions" (like useReducer)
    - It's conceptually similar to using the Context API + useReducer 
    - Two "versions": (1) Classic Redux (2) Modern Redux Toolkit
      - We will learn both 
  - How it works 
    - Global store is updated ---> All consuming components re-render 
  - You need to have a really good understanding of the useReducer hook in order to understand redux 
- Do you need to learn redux?
  - Historically, Redux was used in most React apps for all global state. Today, that has changed, because there are many alternatives. Many apps don't need Redux anymore, unless they need a lot fo global UI state 
    - You might not need to learn Redux
  - Why learn Redux in this course?
    - Redux can be hard to learn, and this course teaches it well 
    - You will encounter Redux code in your job, so you should undertsand it 
    - Some apps do require Redux (or a similar library)
- Redux Use Cases 
  - UI State -- Global State 
    - Ideal use case for Redux, when there is lots of state that updates frequently 
  - Remote State -- Global State 
    - For remote global state, we have better, more specialized tools 
- The machanism of the useReducer Hook 
  - Event handler in component --- action (object that contains information on how the reducer should update state) ---> dispatch --- action ---> reducer (current state) ---> Next state ---> Re-render
- The mechanism of Redux 
  - Event handler in component -- Action creator function --> disptach ---> Store (reducer, reducer, current state) ---> next state ---> Re-render 
    - Store - all global state lives in this centralized container. It's the single source of truth of global state in the app 
    - Reducer - each reducer is a pure function that calculates the next state (state transition) based on the action and the current state. Usually one reducer per app feature (e.g. shopping cart + user data + theme)
    - Action creator function - To automate writing action. Helpful to keep all possible actions in one central place. (This is convention, not a must)
  - Redux cycle
    - Goal: make the state update logic separate from the rest of the application 
  - Real-world task: depositing $50 into your bank account 
    - Customer: I would like to deposit $50 from my account 
    - Teller - performs action to take money out 

## Creating a Reducer: Bank Account
- We will start learning redux in isolation, so without using React at the moment 
- We start with an initialState 
  - We then create our reducer 
- Reminder reducers are not allowed to modif the existing state or asynchronous logic or other side effects
  - We also set a default in our reducer parameter for state 
- Action names should model what is going to happen 
  - "account/deposit"
- Our defualt is done differently, we just return the original state (initialState)

## Creating a Redux Store
- We installed redux via npm 
- createStore is deprecated, we will first learn redux in this way and then we will transition into redux toolkit 
- We call creatreStore(reducer) and then we use store.dispatch 
- To execute our code we will be using our index.js 
- We will pass in an object as our payload 

## Working With Action Creators
- Action creators - simply functions that return actions 
- Something you will see in older codebases: 
  - const ACCOUNT_DEPOSIT = 'account/deposit' instead of writing the type out in the reducer 

## Adding More State: Customer
- Having our createdAt at the reduccer level creates a side effect
- We usually combine all of our reducers into a root reducer to pass into the store 
  - We also use the combineReducers method to achieve this  

## Professional Redux File Structure: State Slices
- Back in the day there was a reducers folder with reducers and actions for each state 
  - So this is no longer the recommended way to do things 
- We will organize by features, example the customer and account 
- Slice - a piece of the total state 
- The entire state lives in the store so we take one slice of that state
- Default export of the reducer and then the actions as named exports
  - We no longer import the action functions to the redcuer because that is not where we need them 

## Back to React! Connecting Our Redux App With React
- `react-redux` is the package that makes react and reux actually talk to each other 
- Works similarly to the context API, so we use the provider 
  - Our provider element takes in the store={}
- In order to read data from the store we have to use useSelector from `react-redux`
  - useSelector takees in the entire Redux store and then we can get the data we want
  - useSelector creates a subscription to the store like the contextAPI 
- Redux implements some performance implementations similar to the context API 

## Dispatching Actions from Our React App
- To dispatch an action, we get access to the useDispatch hook from `react-redux`

## The Legacy Way of Connecting Components to Redux
- Before hooks existed we had to use the connectAPI,really not used anymore, but went through an example just to see 

## Redux Middleware and Thunks
- What is Redux middleware?
  - Where to make an asynchronous API call (or any other asyn operation) in Redux? 
  - Component
    - Can make asynchronous operations and then disptach 
    - Fetching data in components is not ideal 
  - dispatch 
  - Middleware 
    - A function that sites between disptaching the action and the store. Allows us to run code after disptaching, but before reaching the reducer in the store 
    - Perfect for asynchronous code 
    - API calls, timers, logging, etc. 
    - The place for side effects 
    - The most popular in Redux is the Thunk package 
  - Store 
    - No asynchronous operations 
    - Reducers need to be pure functions 

## Making an API Call With Redux Thunks
- We will be making a call to a third party API that converts currency 
- To include the middleware we: 
  - First install the middleware package 
    - `redux-thunk`
  - Then include it in the store
    - We applyMiddleware(thunk)
  - Then we use the middleware in our action creator functions 
    - When we return or disptach a function before dispatching, redux will no that is the thunk 
- Think of middleware as sitting between the dispatching and the store 
  - We stop our code from hitting the store until we get the asynchronous data that we need 
- The conversion is completely hidden from our component and is completely hidden in our account slice 

## The Redux DevTools
- This is a three stop process: 
  - Install the Redux devTools with Google Chrome 
  - Then we install the npm package 
    - `redux-devtools-extension`
  - The function we use is `composeWithDevTools` in our store on our apply middleware
- We get access to the type of action and the payload 
- Jump allows us to go back and see what is happening in the state in the UI 
- We can also use the slider to move through the state transitions 
- We can also manually dispatch some actions 
  - Helpful for when you want to fire up some actions instead of putting buttons on the UI 

## What is Redux Toolkit (RTK)?
- What is Redux Toolkit? 
  - Redux toolkit
    - The modern and preferred way of writing Redux code
    - An opinionated approach, forcing us to use Redu best practices 
    - 100% compatible with "classic" Redux, allowung us to use them together 
    - Allows us to write a lot less code to achieve the same result (less "boilerplate")
      - Hides setting up middleware and other things 
    - Gives us 3 big things (but there are many more...)
      - We can write code that "mutates" state inside reducers (will be converted to immutable logic behind the scenes by "Immer" library)
      - Action creators are automatically created 
      - Automatic setup of thunk middleware and DevTools 

## Creating the Store With RTK
- We can start by only converting the store and leaving our slices the way they are 
- We need to install `@reduxjs/toolkit`
- Instead of createStore we use configureStore
  - Automatically combines our reducers and creates our think middleware
- Nothing changes with the react-redux configurations, but our slies will be a lot easier to write 

## Creating the Account Slice
- We can import createSlice from redux toolkit 
- createSlice gives us three big benefits 
  - Automatically create action creators from our reducers
  - Makes writing reducers a lot easier by getting rid of switch statements and handles our 
  - We can mutate our state inside of reducers
- React toolkit forces into a pattern that's a little too opinionated 
- createSlice takes in: 
  - name
  - state (initialState)
  - reducers 
- We now mutate the property without having to call in the whole state because redux toolkit handles that for us 
- By default the automatically created action creators only take in one parameter
  - This is the limitation of these automatic created action creators, but there is a solution 
  - So now we have to prepare the data before it passes it to the reducer, we use `prepare()`
- We have to pay attention to the order of our code
- In a simple sitauation the classic redux can be a good approach 
- You cn use a mix of classic in your slices  

## Back to Thunks
- Using createAsyncThunk is a lot of work, we can write it the way we did before
  - We will learn how to write out createAsyncThunk in a later project 

## Creating the Customer Slice
- The date creation needs to be in the prepared portion and not in the reducer 

## Redux vs. Context API
- Context API vs Redux 
  - Context API + useReducer 
    - Built into React 
    - Easy to set up a single context 
    - Additional state "slice" requires new context set up from scratch ("provider hell" in App.js)
    - No mechanism for async operations 
    - Performance optimization is a pain 
    - Only React DevTools
  - Redux 
    - Requires additional package (larger bundle slice)
    - More work to set up initially 
    - Once set up, it's easy to create additional state "slices" 
    - Supports middleware for async operations 
    - Performance is optimized out of the box 
    - Excellent DevTools
  - Keep in mind that we should not use these solutions for remote state 
- When to use Context API or Redux 
  - Context API + useReducer 
    - "Use the Context API for global state management in small apps"
    - When you just need to share value that doesn'tchange often [Color theme, preferred language, authenticated user, ...]
    - When you need to solve a simple prop drilling problem 
    - When you need to manage state in local sub-tree of the app 
      - For example in the compound component pattern 
  - Redux 
    - "Use Redux for global state management in large apps"
    - When you have lots of global UI state that needs to be updated frequently (because Redux is optimized for this) [Shopping cart, current tabs, complex filters or search, ...]
    - When you have complex state nextes objects and arrays (because you can mutate state with Redux Toolkit)
    - These are not super common in UI state 
  - There is no right anwer that fits every project. It all depends on the project needs 
