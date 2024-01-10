# Section 24: Adding Redux and Advanced React Router

## Section Overview
- Implementing a shopping cart 
- Advanced part of React Router 
- Real-world use cases of Redux 

## Modeling the "User" State With Redux Toolkit
- Our user state will be global UI state because we need it throughout the app 

## Reading and Updating the User State 
- We should not link our form to the redux store, it still needs to be a controlled element using state 

## Modeling the "Cart" State
- Many of the state management principles we've learned throughout the course here 
  - We just want the cart array because orderTotal and number of items are derived state because they can be determined by the cart array itself 
- We will go over how to model data in our next project  

## Adding Menu Items to the Cart
- Added functionality for adding menu items to cart 

## Building the Cart Overview With Redux Selectors
- Redux recommends we do data manipulation in the selector function and not out in the component 
- Having selectors in your slices in bigger applications can cause performance issues 
  - We use the re-select library to optimize this 

## Building the Cart Page
- Added functionality to clear the cart and display the order in the cart 

## Deleting Cart Items
- Added in functionality for deleting individual items from the cart and from the menu page once it has been added to cart 

## Updating Cart Quantities
- This step will be similar to how we deleted items from the cart 
- You can use caseReducers to call another reducer in another reducer

## Using the Cart for New Orders
- Worked on functionality for submitting an order

## Redux Thunks With createAsyncThunk
- We will be using thunks to implement the geolocation features for the app to have the geolocation API input the users address based on their location 
- To create a think we will use createAsyncThunk() functioon 
  - Takes in the action name and then the code we want to execute when called 
- This will create 3 additional action types 
  - Pending 
  - Fulfilled 
  - Rejected
- We then add in extraReducers in the createSlice() and add cases 
- This is the recipe you have to follow to create thunks using redux-toolkit

## Integrating Geolocation
- Added functionality for button to work for getting the location in our createOrder form 

## Fetching Data Without Navigation: useFetcher
- We want to fetch and mutate data without causing navigations and moving to another page 
- We do this using, useFetcher 
- We want to have the ingredients for the pizza ordered rendered under it on the order 
- This is part of React Router, a more advanced part of it 

## Updating Data Without Navigation
- We want users to be able to mark their order as a priority order, even after they've placed the order 
- We will again use the useFetcher hook to update 
- We use a form component that the fetcher provides 