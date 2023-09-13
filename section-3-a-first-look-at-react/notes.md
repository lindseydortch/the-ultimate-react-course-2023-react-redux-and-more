# Section 3: A First Look At React

## Section Overview
- Why react? 
- What us React? 
- React vs. Vanilla JS 
- Setting Up new React apps 

## Why Do Front-End Frameworks Exist?
- The Rise of Single-Page Applications 
  - The "old" way (but now getting modern again) -- server-side rendering 
    - View and Data --> Render Webpage --> HTML, CSS, JS <-- Browser --> Server-Side Rendering  
    - Example WordPress 
    - Becoming more popular through frameworks like Next.js
  - Developers started writing more and more JS code, which led to 
    - Client-side Rendering - the modern way
      - Data --> API <--> Browser & view --> Render webpage --> HTML, CSS, JS --> Client-side rendering
    - Single-Page application (SPA)
      - You're always on the same page 
- Single-Page Application with vanilla JS? 
  - Front-end web applications are all about 
    - Handling data + displaying data in a user interface --> User interface needs to stay in sync (Data <--> UI) --> Very hard problem to solve 
  - Problems with JS and jQuery 
    - Requires lots of direct DOM manipulation and traversing (imperative) --> "Spaghetti code"
    - Data (state) is usally stored in the DOM, shared across entire app --> Hard to reason + tons of bugs 
- Keeping UI in sync with data 
  - Keeping UI and data in sync would be virtually impossible with just vanilla JS 
  - Piece of data = Piece of state 
- Why do front-end frameworks exist? 
  - JavaScript front-end frameworks exist because.. 
    - Keeping a user interface in sync with data is really hard and a lot of work 
      - Front-end frameworks solve this problem and take hard work away from developers 
        - Angular, Vue, Svelte, and React -- Different approaches, same goal 
  - They enforce a "correct" way of structuring and writing code (therefore contributing to solving the problem of "spaghetti code")
  - They give developers and teams a consistent way of building front-end applications 
    - Creates a more consistent code-base and product 

## React vs. Vanilla JavaScript
- In Vanilla JS, we have to do a lot of things manually 
- HTML runs vanilla JS whereas JS runs the react example 

## What is React?
- What is React? 
  - JavaScript library for building user interfaces (according to React)
  - Extremely popular, declarative, component-based state-driven JavaScript library for building user interfaces, created by Facebook
- React is based on Components 
    - Components are the building blocks of user interfaces in React 
    - Components make our code reusable 
- React is declarative 
  - We describe how components look like and how they work ysing a declarative syntax called JSX 
  - Declarative: telling React what a component should look like, based on current data/state 
  - React is abstraction away from DOM: we never touch the DOM 
  - JSX: a syntax that combines HTML, CSS, JS as well as referenceing other components 
- React is state-driven 
  - Example: array of apartments (state) -- Render --> UI (Components written with JSX) -- Search apartments ----> Update state 
  - React reacts to state changes by re-rendering the UI 
- React is a JS library 
  - Is React a [library] or a frameowrk? 
    - Because React is only the "view" layer. We need to pick multiple external libraries to build a complete application. 
    - Next.js and Remix -- Complete frameworks built on top of React 
- React is extremely popular 
  - According to the weekly downloads it is the most downloaded frameowrk 
  - Many large companies have adopted React 
  - Huge job market with high demand for React developers 
  - Large and virbrant React developer community
  - Gigantic third-party library ecosystem 
- React was created by Facebook 
  - React was created in 2011 by Jordan Walke, an engineer working at Facebook at the time 
  - React was open-sourced in 2013, and had since then completely transformed front-end web development 
- Summary 
  - Rendering compoenents on a webpage (UI) based on their current state 
  - Keeping the UI in sync with state, by re-rendering (reacting) when state changes 

## Setting Up Our Development Environment
- VSCode recommended for this course 
- Also need Node.js v18 
- Extensions recommended 
  - ESLint 
  - Prettier
- Settings 
  - Auto-save: On Focus Change 
  - Prettier - Defualt 
  - Esling: Run - OnSave
- Snippets
  - User snippets -> select file 

## Pure React
- To get the URL fo the scripts, we can go to reacts documentation 
  - First script tag is the functionality for components, etc. 
  - Second script tag is the rendering layer
- JSX won't work in an html doc without the build tooling to convert 

## A Quick Look at React's Official Documentation
- Helpful pages in the Learn React section 
  - Escape Hatches 
  - Removing Effect Dependencies 
  - Read these when we get to learning about them 
- Reference
  - Explains all of the hooks that are available in React and read all about it 
  - Good for if you want to go more in depth on a hook we go over quickly 

## Setting Up a New React Project: The Options
- The two options for Setting up a react project 
  - create-react-app 
    - Complete "starter kit" for React applications 
    - Everything is already configured: ESLint, Pretiter, Jest, etc. 
    - Uses slow and outdated technologies (i.e. webpack)
    - Use for tutorials or experiments (most of the course)
    - Don't use for a real-world app 
  - Vite 
    - Modern build tool that contains a template for setting up React applications 
    - Need to manually set up ESLint (and others)
      - Can be a pain to set up 
    - Extremely fast hot module replacement (HMR) and bundling 
      - Takes the updates of reload from 1-2 seconds even faster 
    - Use for modern real-world apps (by the end of the course)
- What about React frameworks? 
  - Next.js or Remix 
  - The React team now advises to use a "React Framework" for new projects 
  - Many people think that this is not the best idea: "vanilla" React apps are important too 
  - This only makes sense for building actual products, not for learning React 
  - Don't worry about this recommentdation for now. Let's just learn React. 

## Setting Up a Project With Create-React-App
- `npx create-react-app@5 pizza-menu`
  - On your own projects, you don't need to add the @5, but for the purposes of being able to follow along with the course we will use it to make sure we're on the same version of create-react-app 
- Development will happen in the src folder 
- Public will be where our assets that end up in the final application go 
- All of these files were created how the developers thought it best to create it 
  - React doesn't care about a lot of these files, once we start building we will rearrange 
- To run the app we will use `npm start`