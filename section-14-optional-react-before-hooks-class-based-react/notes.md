# Section 14: [Optional] React Before Hooks: Class-Based React

## Section Overview
- We used to write components as classes 
- You might encounter them in old codebases 
- Feel free to skip this section 

## Our First Class Component
- Our Classy weather app will be We should be able to type in the location and the weather will call an API and show the weather for that region 
- We used to write functions in classes and not functions 
- Hooks are not available in class components 
  - We have to call a constructor for state 
  - There was a lot of boilerplate 

## Working With Event Handlers
- In class components, our render should have as little logic as possible 
- this in our handler function is undefined because of the way JS works 
  - You have to manually bind the this keyword to the handler function 
- You can do small logic in the render component, but anything that needs to be set into a function like an event handler needs to go above 

## Class Components vs. Function Components
- Function components vs class components 
  - Function Components (existed since beginning, but without hooks) - Class Components 
    - Introduced in -- v16.8 (2019, with hooks) - v0.13 (2015)
    - How to create -- HavaScript function (any type) - ES6 class, extending React.Component 
    - Reading props -- desctructuring or props.X - this.props.X
    - Local state -- useState hook - this.setState() 
    - Side effects/lifecycle -- useEffect hook - Lifecycle methods 
    - Event handlers -- Functions - Class methods 
    - Returnign JSX -- Return JSX from function - Return JSX from render method 
    - Advantages 
      - Function 
        - Easier to build (less boilerplate)
        - Cleaner code: useEffect combines all lifecycle-related code in a single place 
        - Easier to share stateful logic 
        - We don't need this keyword anymore 
      - Class 
        - Lifecycle might be easier to understand for beginners 
  - Hooks are the big difference between function and class components 

## Starting the "Classy Weather" App
- Controlled elements still apply in class components 
- You only have to bind the this keyword if you handle the event handler as an outside method, which you should do 

## Fetching Weather Data
- Most of the code for this section has been written for us 
- For multiple state variables, we add them to the this.state object, we don't add them on multiple lines 

## Displaying the Weather
- In class methods there is no easy way of destructuring props 
  - You have to do it manually 

## Removing Boilerplate Code With Class Fields
- With class fields, we can declare properties on a component instance right in the class definition, outside of any method
  - This is a JS feature and not a React feature 
  - We can also do this with functions and not have to bind our function 
  - With class components, it is hard to break our components down 

## Child to Parent Communication
- Child to parent communication, needs to update the state in a parent component, so we have to pass the onChange as a prop 

## Lifecycle Methods
- ComponentDidMount, ComponentDidUpdate, ComponentWillMount 
  - We will use these to let the weather search as we type 
- Lifecycle methods are methods that all components have access to run side effects at different points of the lifecycle 
  - Not the same thing as the useEffect, but they are the closest thing in class components 
- componentDidMount() - called immediately after rendering 
  - Like useEffect with an empty dependency array 
- componentDidUpdate() - gives it access to previos state and previous props 
  - useEffect with a variable in the dependency array 
- componentWillMount() - similar to cleanup 
  - Runs after the component is destoryed, not between renders