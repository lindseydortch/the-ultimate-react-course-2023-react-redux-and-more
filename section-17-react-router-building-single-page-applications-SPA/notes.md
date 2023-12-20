# Section 17: React Router: Building Single-Page Applications (SPA)

## Section Overview
- React Router - most important 3rd party library 
- Building our first single-page application (SPA)
  - WorldWise
- Styles with CSS Modules 

## Creating Our First Ap With Vite: "WorldWise"
- We're going to use vite to set up this project 
- This is our biggest project yet
- We will be using routing to build out a complete UI with routing 
- We will be using a fake API in this project as well 
- We will use `npm create vite@latest` for this project we will use @4
- Vite is a modern build tool, you can use it for more than React 
- Vite likes to use JSX vs JS 
- We don't use `npm start` we use `npm run dev`
  - You have to manually open the localhost 
  - You can press command and click on the link in terminal to open in VSCode
- In the past using Vite, you needed configure ESLint, but after 4.3.x ESLint already comes configured 

## Routing and Single-Page Applications (SPAs)
- What is routing? 
  - Routing -- "Client-side routing" - most frontend libraries have client side routing built in 
    - With routing, we match different URLs to different UI views (React components): routes 
      - Examples 
        - www.example.com/
        - www.example.com/login 
        - www.example.com/app
    - This enables users to navigate between different applications screens, using the browser URL 
    - Keeps the UI in sync with the current browser URL 
    - React uses React Router
- Single-Page Applications (SPA)
  - Single-Page Application 
    - Application is executed entirely on the client (browsers)
    - Routes: different URLs correspond to different views (components)
    - JavaScript (React) is used to update the page (DOM)
    - The page is never reloaded 
      - It's the entire app in one page 
    - Feels like a native app 
    - Additional data might be loaded from a web API 
  - SPA running on client 
    - User clicks router link -> 
    - URL is changed -> 
      - In React, react-router package does this job 
    - DOM is updated: React component corresponding to the new URL is rendered 
      - <-- Server --> 
        - Load data from web API 

## Implementing Main Pages and Routes
- To install React Router we use `npm i react-router-dom`
- We will define our routes the declartive way: 
  - We will use a couple of special components react router gives us to define our routes 
- We import BrowserRouter and then bring it into the return of our app or wherever we're using React Router 
  - We also bring in the Routes component 
  - BroswerRouter -> Routes -> Route with path
- We use the element in our Route so we can pass in props 
- You can set a route with the path of * and it will catch all of the routes that don't exist and this is where you put your not found page 

## Linking Between Routes with <Link /> and <NavLink />
- Using an <a> causes your page to reload 
- We use the <Link> component and use the to="" attribute
- You have to include the page nav inside of every page because it won't work if it's just on the App component 
- React Router gives us the ability to highlight the active page, using <NavLink>
  - Gives the element a class of Active 

## Styling Options For React Applications
- Styling options in React 
  - Styling Option - React doesn't care about styling 
    - Option - Where? - How? - Scope - Based On
      - Inline CSS - JSX Elements - style prop - JSX element (local) - CSS 
      - CSS or Sass file - External file - className prop - Entire App (Global, causes problems) - CSS 
        - Does not take into account React's separation of concerns 
      - CSS Modules - One external file per component - className prop - Component - CSS 
      - CSS-in-JS - External file or component file - Creates new component - Component - JavaScript 
        - Allows us to have our styles applied directly to the component 
      - Utility-first CSS (tailwindcss) - JSX elements - className prop - JSX element - CSS 
      - Alternative to styling with CSS: UI libraries like MUI, Chakra UI, Matine, etc. 

## Using CSS Modules
- Comes out of the box with Vite and Create React App 
  - We create one external CSS file for component 
    - Component.module.css 
- You can only use class selectors and not element selectors 
- You then use the className and enter JS mode and select the stiles from your import 
- CSS modules attaches a random ID it creates itself 
- Sometimes you do need global css, so you still use an external stylesheet for those 
- You can import the file as index.css and import it into main.jsx 
  - Don't use any class names 
  - To define global in the modules 
    - :global(.test)
    - Useful for classes like .active when we don't really have access to it because React creates it 

## Building the Pages
- We will be pulling images from our public folder and not src/assets
- When writing css modules we use camel case for our class names 

## Building the App Layout
- In a bigger app, we would have a folder for each of the components, but for this project we will have a flat file structure 
- There is a user snippet for a styled component and you can use csm

## Nested Routes and Index Route
- We need nested route when we need the UI to interact with part of the URL 
  - Example our list of cities, countries, or when we click on the map and the form pops up 
  - We use nested routes to show some part of the UI to show based off of the URL 
- This is done inside of the Route Element 
  - We then create routes inside of the one, making the main one a parent 
- So how do we display another component inside of another component
  - This is where the Outlet component comes in 
  - It is similar to the children prop
  - To show a default, we use an indexRoute, this is the default child route if none of the routes match
    - We just put index instead of path  

## Implementing the Cities List
- You can run a command on your json server that causes a delay, so it always looks like it takes a second to load your data 

## Implmenting the Countries List
- When making your own react applications, we need to think about where we want certain props to render and where would be best to render them 

## Storing State in the URL
- The URL for State Management 
  - The URL is an excellent place to store UI state and an alternative to useState in some situations! 
    - Examples: open/closed panels, currently selected list item, list sorting order, applied list filters 
  - Easy way to store state in a global place, accessible to all components in the app 
  - Good way to "pass" data from one page into the next page 
  - Makes it possible to bookmark and share the page with the exact UI state it had at the time 
  - www.example.com/app/cities/lisbon?lat=38&lng=-9
    - lisbon = params 
    - lat and lng = query string 
- Example: Params and Query String 
  - www.example.com/app/cities/lisbon?lat=38&lng=-9
    - City name and GPS location were retreived from the URL instead of application state 

## Dynamic Routes With URL Parameters
- We pass the id of the city and then we read the id of the city from the URL 
- Three steps to use params 
  - Create a new route 
  - Link to that route 
  - In that route we read the state from the URL 
- We use useParams which comes to us with React Router 

## Reading and Setting a Query String
- We will be adding the data to the query string URL, and we add it to the path the user will go to when they click on the link 
  - We use a ? after, but go after the variable and then we use the & symbol if we have more than one query string 
- We get access to a position object from our data so we will use that to get our long and lat
- We use the useSearchParams() custom hook that React Router gives us
  - Similar to React's useState array 
  - We have to use the .get() method to get the variabes and we set it on the first value in the array 
- This is really helpful because we don't have to keep creating new pieces of state 
  - This will be helpful later when are trying to get the map to move to a certain city whenever we click on it 
- We can update the query string using the setSearchParam functions
  - It's very powerful because the state changes not only on the screen, but in the URL too 

## Programmatic Navigation with useNavigate
- Programmatic Navigation - to move to a new URL without a user having to click on a link
  - An example of this would be a form 
  - We will be implementing this when the user clicks on the map it opens the form component 
- useNavigate returns a function called navigate and then we can use this to move to any URL when we call it 
- We can also use the useNavigate to navigate back
  - This used to be called useHistory in a previos version of React router 
  - In the navigate() function our param is how many params we want to move back, but consider the component you're in 

## Programmatic Navigation with <Navigate/>
- Navigate component is a declarative way 
- Not used so much anymore, except for in nested routes
- Think of this as working like a redirect 
- Use replace to replace the current element in the history stack due to <Navigate replace/> component 
- We will learn all about context in a small intermediate project and come back to finishing this project later 
