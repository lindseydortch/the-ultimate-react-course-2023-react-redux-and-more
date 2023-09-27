# Section 10: Thinking in React: Components, Composition, and Reusability

## Section Overview
- How to think about components 
- Composition 
- Reusablity 
- How to split a component 
- Building layouts

## Setting Up the "usePopcorn" Project
- We will build this project throughout this section and other sections 
- In this section, we will work with static data, but will work with fetching in the next section, we are focusing on components compisition and reusablity 

## How to Split a UI Into Components
- Component Size matters 
  - small -- huge (too many responsibilities) --> component size (see diagram for breakdown)
    - Huge 
      - Too many responsibilities 
      - Might need too many props 
      - Hard to reuse 
      - Complex, code, hard to understand 
    - Small 
      - We end up with 100s of mini-components 
      - Confusing codebase 
      - Too abstracted 
        - Creating something new to hide the implementation details of that thing 
    - Generally we need to find the right balance between too specific and too broad 
- How to splut a UI into components 
  - The 4 criteria for splitting a UI into components 
    - Logical separation of content / layout 
    - Reusability 
    - Reponsibilities / complexity 
    - Personal coding style 
- Framework: when to create a new component 
  - Suggestion: When in doubt, start with a relatively big component, then split it into smaller components as it becomes necessary 
    - Skip if you're sure you need to reuse. But otherwise, you don't need to focus on reusability and complexity early on 
  - You might need a new component if 
    - Logical separation of content / layout  
      - Does the component contain pieces of content or layout that don't belong together?
    - Reusability 
      - Is it possible to reuse part of the component? 
      - Do you want or need to reuse it? 
    - Reponsibilities / complexity 
      - Is the component doing too many different things? 
      - Does the component rely on too many props? 
      - Does the component rely on too many props? 
      - Does the component have too many pieces of state and/or effects? 
      - Is the code, including JSX, too complex/ confusing? 
    - Personal coding style 
      - Do you prefer smaller functions/ components? 
  - These are all guidelines... It will become intuitive 
- Some more general guidelines 
  - Be aware that creating a new component creates a new abstraction. Abstractions have a cost, because more abstractions require more mental energy to switch back and forth between components. So try not to create new components too early. 
  - Name a component according to what it does or what it displays. Don't be afraid of using long component names 
  - Never declare a new component inside another component 
  - Co-locate related components inside the same file. Don't separate components into diferent files too early. 
- Any app has components of different sizes and reusability 
  - Small 
    - Some very small components are necessary 
    - Highly reusable 
    - Very low complexity 
  - Huge 
    - Most apps will have a few huge components 
    - Not meant to be reused (not a problem!)

## Splitting Components In Practice
- We are pretending we are working with a team and one of our team members created a huge component, that we need to split ourselves 
- Your components should do 1 thing, so ask yourself this before you break a component down any further 

## Component Categories
- Component Categories 
  - Most of your components will naturally fall into one of three categories 
    - Stateless/ presentational components 
      - No state 
      - Can receive props and simply present received data or other content 
      - Usually small and reusable 
    - Stateful components 
      - Have state 
      - Can still be reusable 
    - Structural components 
      - "Pages", "layouts", or "screens" of the app 
      - Result of composition 
      - Can be huge and non-reusable (but don't have to)

## Prop Drilling
- Prop drilling - we need to pass some prop through some deeply nested child components to receive the data 
  - So then we end up with a lot of props that we don't need in some components 
- We will look at ways of fixing this later 

## Component Composition
- What is component composition?
  - "Using" a component"
    - Modal example with a modal we want to reuse 
    - Success is inside Modal: we can NOT reuse Modal 
  - Component Composition 
    - Accepts children with the children prop 
    - Sucess is passed into Modal: we can REUSE Modal 
      - This is thanks to the children prop 
  - Component compisition: combining different components using the children prop (or explicitly defined props)
  - With component Composition, we can: 
    - Create highly reusable and flexible components 
    - Fix prop drilling (great for layouts)
      - Possible because components don't need to know their children in advance 

## Fixing Prop Drilling With Composition (And Building a Layout)
<code>
// In App() 
  <NavBar>
    <Logo />
    <Search />
    <NumResults movies={movies} />
  </NavBar>

  function NavBar({ children }) {
    return (
      <nav className='nav-bar'>
        <Logo />
        {children}
      </nav>
    );
  }
</code>
- With component composition, we are able to pass down the prop to the component that actually needs it 

## Using Composition to Make a Reusable Box
- Re-did the List box and watch box to fit for component composition 

## Passing Elements as Props (Alternative to children)
- We call element instead of children on the component and then put element={} on the component it goes into
  - This is important to learn because this is how react router accomplishes this
  - For more than one element we use a fragment <></>
- This is not the cleanest way to do compisition, but it is alternative way to use it without using children 
  - Children is the prefered way of doing things 

## Building a Reusable Star Rating Component
- We will develop this component in complete isolation, so we can reuse anywhere and use it again 
- You can actually set default parameters on your components in the same way you do in a function 

## Creating the Stars
- Created the functionality for the stars 

## Handling Hover Events
- Our hover rating will be different from the rating we actually give the movie 
- There isn't really a hover event, so we use mouseEnter and mouseLeave

## Props as a Component API
- Props as an AI 
  - Component Consumer 
    - Uses the component 
  - Component Creator 
    - Building the component 
    - Abstraction that encapsulates UI and logic
  - The reason for the separation of creator and user we can think of components as Component props = public API 
  - Too little props 
    - Not flexible enough 
    - Might not be useful 
  - Too many props 
    - Too hard to use 
    - Exposing too much complexity 
    - Hard-to-write code 
    - Provide good default values 
  - We need to find the right balance between too little and too many props, that works for both the consumer and the creator 

## Improving Reusability With Props
- Right now our component is only useful for one type of case 
  - If we want to share it to consumers or other developers, we need to be able to make this fit for other programs 
- It's also a good idea to let a user be able to add a className
- We should never initialize state from props, only true if you want the state value to update in case the value is updated
  - But for our app, it will be considered seed data 

## PropTypes
- We can specify the type of value we expect the consumer to put in, this is called type checking 
- If we care about type checking, then just use .ts
  - We are just going over this, but won't do this in every project
- React comes with PropTypes, you just have to import it into your files
- Can also be a great way to document our variables 

## CHALLENGE #1: Text Expander Component
- Walked through Challenge #1