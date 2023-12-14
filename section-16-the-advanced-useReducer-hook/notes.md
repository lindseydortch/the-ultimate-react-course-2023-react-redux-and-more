# Section 16: The Advanced useReducer Hook

## Section Overview
- useReducer hook 
  - Another powerful way of managing state 
  - Important to understand Redux
  - Half the section is essentially another project 

## Yet Another Hook: useReducer
- We will be working with the date counter that we worked with in some previous challenges for the next two lectures 
- useReducer - a more complex way of managing state 
  - Will take in the previous state and an action 
  - Reducer function takes in some sort of state and action 
    - Function gets called due to dispatch function 
      - Think as the setState function, but works a little bit differently 
  - Reducer gets access to the current state and then the action which is what the state will become 
    - So you take the current state plus the action and return the next state 
  - You always want to include the type and payload in disptach 
    - This is important for when we get into Redux 

## Managing Related Pieces of State
- We usually use reducers when we have more complex state to manage 
- It is common to use a switch statement inside of a reducer function, instead of and if statement 
- When working with multiple pieces of state, we can make one state transition on a reset instead of having to do multiptle setState functions 
- You could move your dispatches into the JSX since all of the event handlers are just handling dispatches 

## Managing State With useReducer
- Why useReducer? 
  - State management with useState is NOT enough in certain situations 
  - When components have a lot of state variables and state updates, spread across many event handlers all over the component 
  - When multiple state updaes need to happen at the same time (as a reaction to the same event, like "starting a game")
  - When updating one piece of state depends on one or multiple other pieces of state 
- Managing state with useReducer 
  - State with useReducer 
    - An alternative way of setting state, ideal for complex state and related pieces of state 
    - Store related pieces of tate in a state object 
    - useReducer needs reducer: function containing all logic to update state. Decouples state logic from component 
      - Like setState() with superpowers 
    - reducer: pure function (no side effects!) that takes current state and action, and returns the next state 
    - action: object that describes how to update state 
      - Usually takes in a type and payload 
    - dispatch: function to trigger state updates, by "sending" actions from event handlers to the reducer
      - Instead of setState()
- How reducers update state 
  - Updating state in a components -> disptach with action (object that contains information how the reducer should update state) --> reducer with action --> returns next state --> re-render 
    - Reducer note: just like array.reduce(), reducers accumulate ("reduce") actions over time 
  - useState 
    - setState (updated state) -- Update --> Next (updated) state -> re-render 
- A mental model for reducers 
  - Real-world task: withdrawing $5,000 from your bank account 
    - You do not go to your bank and take the money straight from the bank's vault (setState example)
  - You go to the teller and then the teller checks to make sure you have the cash and then goes to the vault to handle the money to you 
  - State (what needs to be updated) - Vault 
  - Dispatcher (who requests the update) - Person requesting money 
  - Reducer (who makes the update) - The teller 
  - Action (how to make the update) - the action of checking the account and instructions with the right amount 

## The "React Quiz" App
- We will make this project more real world by separating our components into different files 
- use the rfc snippet to create new components 

## Loading Questions from a Fake API
- We aren't using a real API, we are using json-server (needs to be open in a separate tab)
  - We will need to add something to our npm scripts 
- We will use a status state instead of isLoading to give us more options
  - It's a nicer way for us to handle all the different states our data can be in 

## Handling Loading, Error, and Ready Status
- Destructured the status using destructuring in the reducer instead of having to do state.status everywhere 

## Starting a New Quiz
- Worked through starting a new quiz 

## Displaying Questions
- Went through displaying the questions on the app 

## Handling New Answers
- When using conditional CSS we should always use ternaries 
- Whenever possible we need to put as much logic for calculating the next state right in the reducer 

## Moving to the Next Question
- Added in a new dispatch function to make the next button go to the next question 

## Displaying Progress
- Worked on the UI and functionality to display the progress bar 
- We can use the <progress /> element in react to create a progress bar 

## Finishing a Quiz
- Implented finishing the quiz and storing the high score 

## Restarting a Quiz
- Implemented the restart button for the quiz 

## Setting Up a Timer With useEffect
- We will use the useEffect hook to create a side effect on mount 
- We are putting this in the Timer component because it will mount as soon as the game starts, we don't do this in the App component because it starts as soon as the app loads 
- Our timer needs a cleanup function
- Features you can implement yourself: 
  - Allow the user to select a certain number of questions or choose difficulty 
  - Store the highscore in the API and call on re-render 
  - Store all the answers in an array so the user can go back and review their answers  

## Section Summary: useState vs. useReducer
- useState vs useReducer 
  - useState 
    - Ideal for single, independent pieces of state (numbers, strings, single array, etc.)
    - Logic to update state is placed directly in event handlers or effects, spread all over on or multiple components 
    - State is updated by calling setState (setter returned from useState)
    - Imperative state updates 
    - Easy to understand and to use 
  - useReducer 
    - Ideal for multiple related pieces of state and complex state (e.g. object with many values and nested objects or arrays)
    - Logic to update state lives in one central place, decoupled from components: the reducer 
    - State is updated by dispatching an action to a reducer 
    - Declarative state updates: complex state transitions are mapped to actions 
    - More difficult to understand and implement 
- When to use useReducer?
  - Just one piece of state?
    - Yes - useState
    - No -> Do states frequently update together?
      - Yes -> Are you willing to implement slightly more complex code?
        - No - useState 
        - Yes - useReducer 
    - No -> Over 3 or 4 pieces of related state, including objects?
      - Yes ->  Are you willing to implement slightly more complex code?
        - No - useState 
        - Yes - useReducer 
    - No -> Too many event handlers make components large and confusing?
      - Yes ->  Are you willing to implement slightly more complex code?
        - No - useState 
        - Yes - useReducer 
    - No -> useState

## CHALLENGE #1: Creating a Bank Account With useReducer
- Walked through Challenge #1