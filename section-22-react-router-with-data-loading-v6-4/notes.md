# Section 22: React Router With Data Loading (v6.4+)

## Section Overview
- React Router's modern data loading capabiltis 
- How to plan a professional project 
  - This is what this course is all about 

## Setting Up a New Project: "Fast React Pizza Co."
- We will use Vite to create this project 
- We will be running Vite at version 4, normally you specify @latest

## Application Planning
- The Project: Fast React Pizza Co 
  - Remember our very first project? 
  - --> Fast React Pizza Co. 
    - Now the same restaurant (business) needs a simple way of allowing customers to order pizzas and get them delivered to their home 
    - We were hired to build the application front-end 
- How to plan and build a react application 
  - From the earlier "thinking in react" lecture: 
    - Break the desired UI into components 
    - Build a static version (no state yet)
    - Think about state management + data flow 
  - This works well for small apps with one page and a few features 
  - In real-world app, we need to adapt this process 
- How to plan and build a React application 
  - Gather application requirements and features 
  - Divide the application into pages
    - Think about the overall and page-level UI 
    - Break the desired UI into components 
      - From earlier 
    - Design and build a static version 
      - From earlier  
  - Divide the application into feature categories 
    - Think about state management + data flow 
      - From Earlier 
  - Decide on what libraries to use (technology decisions)
  - This is just a rough overview. In the real-world, things are never this linear
- Project requirements from the business 
  - Step 1 
    - Very simple application, where users can order one or more pizzas from a menu 
    - Requires no user accounts and no login: users just input their names before using the app 
    - The pizza menu can change, so it should be loaded from an API (this step is done)
    - Users can add multiple pizzas to a cart before ordering 
    - Ordering requires just the user's name, phone number, and address  
    - If possible, GPS location should also be provided, to make delivery easier 
    - User's can mark their order as "priority" for an additional 20% of the cart price 
    - Orders are made by sending a POST request with the order data (user data + selected pizzas) to the API 
    - Payments are made on delivery, so no payment processing is necessary in the app 
    - Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID 
    - Users should be able to mark their order as "priotity" order even after it has been placed 
- Features + Pages 
  - Step 2 + 3 
    - Feature categories 
      - User 
      - Menu 
      - Cart 
      - Order 
      - All features can be placed into one of these. So this is what the app will essentially be about
    - Necessary Pages 
      - Homepage - /
      - Pizza Menu - /menu
      - Cart - /cart
      - Placing a new order - /order/new
      - Looking up an order - /order/:orderID
- State Management + Technology Decisions 
  - State "Domains" / "Slices" (These usually map nicely to the app features) -- Types of state 
    - User --> Global UI State (no accounts, so stays in app)
    - Menu --> Gloval remote state (menu is fetched from API)
    - Cart --> Global UI state (no need for API, just stored in app)
    - Order --> Global remote state (fetched and submitted to API)
  - Technologies 
    - Routing - React Router - the standard for React SPAs
    - Styling - tailwindcss - Trendy way of styling applications that we want to learn 
    - Remote state management - React Router - New way of fetching data right inside React Router (v6.4+) that is worth exploring ("render-as-you-fetch" instead of "fetch-on-render"). Not really state management, as it doesn't persist state.
    - Jonas' prefers to use React Query, but this is just to give us some practice 
    - UI state manageent - Redux - State is fairly complex. Redux has many advantages for UI state. Also, we want to practice Redux a bit more 

## Setting Up a Professional File Structure
- There are many ways to structure projects, but we will be doing a feature based structure 
- We created the following folders 
  - features 
  - ui - for any reusable components 
  - services - for any code interacting with an API 
  - utils - helper functions that we can reuse in multiple places throughout the application or more stateless helper functions that don't create any side effects (date or number manipulations)
  - In other apps we would use a contexts or hooks or pages, but we won't do that in this structure so we don't have to jump around so much 

## A New Way of Implementing Routes
- With React Router 6 they implemented more powerful ways to fetch and route 
- We will be using react-router-dom version 6
- createBrowserRouter takes in a path and element 
- We get more data loading capabilties like submitting forms, etc. in version 6 of React Router 
  - We will have a special way of handling errors   

## Building the App Layout
- To define the children routes we specify the children property 
- So for example with our AppLayout component we define that as the main element without a path and designate everything as children 
- We use the Outlet component to render the children 
- The <AppLayout/> we used in this one is the layout route since it doesn't have a path 

## Fetching Data With React Router "Loaders": Pizza Menu
- Data loading is called loaders 
  - Loaders fetch data from an API and then we provide that data to the component and it loads once we go to that component 
- We create the loader, then provide the loader, then we provide the data to the page 
- React Router is responsible for providing the data for the page now as well 
  - We get the page and the data all in one place 

## Displaying a Loading Indicator
- We can get the information on if the app isLoading, idle or submitting using, useNavigation() 

## Handling Errors With Error Elements
- With createBrowserRouter we can render an error element 
  - We define the proerty errorElement 
- We have access to the error that occurs using the useRouteError from react-router-dom

## Fetching Orders
- Hooks don't work inside of functions they only work inside of components 
- Our loader() function can take in {params}

## Writing Data With React Router "Actions"
- Actions are used to write data or mutate data that is stores on some server
- react-router-dom provides us with a <Form> element that takes in a method
- We create our action at the bottom of the component like our loaders
- Like we get access to {params} in the loader we get access to {request} in our action function 
- .formData() is provided by the browser 
- React router will allow us to use the <Form> as we used to in old school HTML 
- We cannot use navigate, we have to use redirect from react-router-dom

## Error Handling In Form Actions
