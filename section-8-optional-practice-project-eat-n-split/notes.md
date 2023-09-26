# Section 8: [Optional] Practice Project: Eat-'N-Split

## Section Overview
- Review everything we learned in a project 
- No new concepts 
- This practice is extremely important for your progress 

## Project Setup
- This main functionality is you can share a meal with a friend, select that friend and then shows who owes what or if you are even 
  - Some additional functionality I would add for this app 
    - Ability to check off once you've paid 
    - Put an amount in that you've paid or you've been paid 
- Splitting the UI 
  - List of Friends 
    - Friend 
  - Form 
    - Add a Friend 
    - Split Form 

## Building the Static App: List of Friends
- We will work on rendering the list of friends 
- Here we use short circuiting for rendering out the balance owed because we don't want to use a nested ternary 

## Building the Static App: Forms
- We will build the two forms for adding the friend and the bill 

## Displaying the New Friend Form
- We will conditionally display the new friend form 
- Our button doesn't have the onClick property, so we need to send it as a prop 

## Adding a New Friend
- Working on the ability to add new friends to the list 
- Reminder, you handle adding the new friend to the array in the parent component, but the actual submit of the form in that component 

## Selecting a Friend
- Working on the usability of the user to select the friend 
- Passing on prop striaght down to a child prop and not actually using it is called prop drilling
  - Not problematic when we're working with 2 levels, but when working with 5-6 levels this can be an issue 

## Creating Controlled Elements
- We will take the elements we have and make them controlled elements in the split the bill form 
- As of now when we select a new friend the value in the inputs stays there right now, we will fix this later once we have more knowledge of bigger concepts in React 

## Splitting a Bill
- Walked through the split bill logic