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

## Back to React! Connecting Our Redux App With React

## Dispatching Actions from Our React App

## The Legacy Way of Connecting Components to Redux

## Redux Middleware and Thunks

## Making an API Call With Redux Thunks

## The Redux DevTools

## What is Redux Toolkit (RTK)?

## Creating the Store With RTK

## Creating the Account Slice

## Back to Thunks

## Creating the Customer Slice

## Redux vs. Context API
