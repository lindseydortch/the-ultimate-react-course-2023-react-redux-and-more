# Section 28: Advanced React Patterns

## Section Overview
- Advanced patterns used by Senior React Engineers 
- Render props 
- Higher-order components 
- Compound Components 
- Reusable modal windowand context menu 
- Unique content!

## An Overview of Reusability in React
- How to reuse code in react? 
  - I need to reuse 
    - UI 
      - Components and props 
        - Use props as a component API, to enable custom behavior. Can be stateless, stateful, or structural components 
      - children prop
        - To customize component's content
    - Stateful logic (logic with hooks)
      - Custom hooks 
    - Render props pattern 
      - For complete control over what the component renders, by passing in a function that tells the component what to render. Was more common before hooks, but still useful 
    - Compound component pattern 
      - For very self-contained components that need/want to manage their own state. Compound components are like fancy super-components 
  - There ar eeven more patterns, but these ones matter most 

## Setting Up an Example
- Walkthrough of code sandbox project to go overthe render props pattern and what issue we're trying to fix here 

## The Render Props Pattern
- Is all about passing in a prop called render which is a function that a component knows what to render and how to do it 
  - Whenever you can't pass down JSX directly with the children prop, you need to reach for the render props pattern 
- We call this inversion of control 
- Our list no longer cares what it is rendering, it cares about the logic 
- This is not as common anymore, due to custom hooks

## A Look at Higher-Order Components (HOC)
- This one is not super important, but it is important to know 
- Almost no one writes these by hand 
- A component that takes in anotehr component and then returns an even better component
- HOC's commonly start with the word 'with'

## The Compound Component Pattern
- We can create a set of related components that together create a set of common tasks 
- Example, modal windows, pagination, etc. 
- Another example would be using an select element 
- We will use context to create our compound component 
- To create a compound component you:   
  - Create a context 
  - Create a parent component 
  - Create child components to help implemennt the common tasks
    - In this example it would be the increase, decrease components 
  - Add child components as properties to parent component (optional)
- Gives us a ton of flexibility and we can encapsulate state easily 
  - Each of the components on their own don't make sense, but once they come together, then they work together for the overall bigger component 

## Building a Modal Window Using a React Portal
- You can call a function with the optional chaining method 
  - Example: `onCloseModal?.()`
- A react portal allows us to render an element outside of the parent elements prop structure but keep it's place in the component tree 
  - This is great for elements we want to stay on top of other elements 
- createPortal is part of react-dom
  - It takes in the JSX you want it to return and the parent we want to render that element 
    - Example `document.body`
  - A portal is necessary for when someone uses the overflow:hidden set on the parent 
    - This is all about reusability 

## Converting the Modal to a Compound Component
- Our issue right now is the component who uses the modal is keeping track of whether or not the modal is open or not 
  - The modal component itself should keep this state internally 
- cloneElement
  - Is pretty uncommon and can lead to fragile code 
  - Lets you create a new React element using another element as a starting point 

## Detecting a Click Outside the Modal
- We are using a useEffect to create our DOM event listeners and then we use, useRef to reference where we want this event to happen 
- Reminder events bubble up and then the click is detected outside of the modal window and then it immediately detects a click outside of it, so we need to listen to the event as it goes down the DOM tree and not up 

## Confirming Cabin Deletions
- Added Modal functionality for deleting cabins and editing cabins

## Building a Reusable Table
- Made the Table a compound component 

## Applying the Render Props Pattern
- Used the render props pattern along with our compond table component 

## Building a Reusable Context Menu
- We want to give each of our buttons a button to click with the 3 buttons they can choose 
  - Everything will go into a menu 
- Many of the things we've learned in this section have been opinionated and less about React
- One bug that was left is when you scroll the menu stays fixed 