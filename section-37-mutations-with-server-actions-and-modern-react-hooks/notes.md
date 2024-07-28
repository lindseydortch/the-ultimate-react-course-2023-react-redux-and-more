# Section 37: Mutations With Server Actions + Modern React Hooks 

## Section Overview 
- Server actions for data mutations 
- Implementing features, creating, updating, and deleting a reservation + updating profile 
- New cutting-edge React hooks 

## What Are Server Actions? 
- What are server actions?
  - Server Actions 
    - The missing piece in the RSC architecture that enables interactive full-stack applications 
    - Async functions that run exclusively on the server, allowing us to perform data mutations
    - Created with the "use server" directive at the top of the function or an entire module
      - Not for server components but for server actions 
      - Server -- "use client" ("<script> tag") --> Client 
      - Client -- "use server" ("API endpoint") --> Server
    - Behind the scenes: Next.js creates an API endpoint (with URL) for each server action. Whenever a server action is called, a POST request is made to its URL (the function itself never reaches client)
      - We don't have to manually create APIs or route handlers to mutate data 
    - Unlike server components, server actions actually require a running web server 
  - Interactive (Be able to handle user input) full-stack appliations --> RSC Acrchitecture 
    - 1. Data Fetching - Server Components 
    - 2. Mutations - Server Actions
  - Server actions can be defined at the top of:  
    - An async function in a server component. Can be used in component or passed to a client component (unlike functions)
    - Standalone file: exported functions become server actions that can be imported into any component [recommended]
      - Server actions can flow to the client 
  - Server actions can be called from: 
    - action attribute <form> element (in server and client components)
    - Event handlers (only client components)
    - useEffect (only client components)
  - In server actions, we can: 
    - Perform data mutations (create, update, delete)
    - Update the UI with new data: Revalidate cache with revalidatePath and revalidateTag 
    - Work with cookies
    - Many More 
    - Code is running on the back-end, so we need to assume inputs are unsafe 

## Updating the Profile Using a Server Action 
- Every thing we export from a file with "use server" in it makes it a server action 
  - These must also be async functions as well 
  - Behind the scenes the server action creates an endpoint, POST request for us 
  - We don't need additional JS or state, it will pass all of our form data using the native form data API 
  - In order for this to work each of our inputs needs a name 
    - Each field in the form data will be indentified by the name we give it here 
- When writing your server action, keep in mind that you are essentially writing backend code, so we need to make sure of two things 
  - We need to make sure the user who is invoking the action has the authorization of the action that the server action is trying to do 
  - Always treat all inputs as unsafe
- It is common practice not to use try/catch blocks in server actions, instead we throw a new error and they will be caught by the closest error boundary 
- FormData is a web API that works in the browser 
- We will check the ID here and check that it is a valid representation 
- We will see the old data if we go away based on the browser cache, so we need to account for that 

## Manual Cache Revalidation 
- The duration of the cache for dynamic pages is 30 seconds, so we need to clear the cache and then refill with the fresh data 
- There are two types of revalidation 
  - Time based - cache will revalidate after a certain amount of time 
  - Manual (on-demand) - when we want to clear the cache and re-fetch the data right away, so basically right when we need it 
    - For this we can use the built in revalidatePath() function
    - This doesn't make sense to revalidate the entire reservations, so we revalidate the route we are on 
- It is important to revalidate our data almost every time we do a server action at least if the data that has been updated should be visible on the screen 

## Displaying a Loading Indicator: The useFormStatus Hook 
- We want to add a visual cue that the data is being sent, so we want to load a spinner as it is loading 
- React gave us a new hook that is part of the DOM 
  - They gave us useFormStatus()
  - Must be used inside a component that is rendered inside a form
    - Not simply a component that contains a form 
    - We took the button our of our form component and made it it's own component and then put that component in our form so we can use this hook 
- useFormState() gives us access to 
  - pending - async work is being done 
  - Not as helpful 
    - formData
    - method 
    - action 
- This is how we get information on if the form is submitting or not or whether the server action is working 
- Reminder: Since this is a hook, our button has to be a client component 

## Building the Guest's Reservations Page 
- We need to fetch all the reservations made by the guest 
  - We are going to pass in the guest ID 
  - Bookings = reservations (reservations are bookings that have not been paid yet because you can only pay when you get to the cabin)

## Deleting a Reservation 
- You can create server actions in wo places, so we can create in a server component 
  - You can create a function in a server component and make sure we use the "use server" directive in the function in case this is imported by a client component 
  - We need to make sure our server action always stays on the server 
- But we will put all our server actions in our 'actions.js'
- We can invoke server actions in different ways 
  - First way we've done it is in a <form>
  - We will call the server action from our button 
    - We will manually have to pass in the date we need 
    - We will invoke the action using the `onClick` property on our component 
      - Sicne we need to use JS, we need to be using a client component, so we must use the "use client" directive 
- Reminder: when we do a server action and we want the result to be reflected on the UI, we need to refetch that data
  - Most of the time, we just revalidate the cache 
- revalidateTag - an alternative to revalidatePath 
  - Adds a tag to some piece of data that is fetched, but we can pass in the date we want to update 
  - It's harder to define a tag when we're fetching data 
- `--data-raw '[21]` - shows the booking ID we are deleting, a user could then use a curl request to input the ID to delete the booking 
  - These are the things we need to keep in mind when we're doing backend development 

## Another Loading Indicator: The useTransition Hook 
- We used the `useFormStatus()` in our other components to check for when there is a loading state because we were in a form 
  - Our delete cabins button is not part of a form, so we instead need to use the `useTransition()` React hook 
- `useTransition() `
  - Introduced in React 18 as a concurrent feature 
  - We didn't talk about this earlier in the course because it is hard to see it in action where it's useful 
  - Allows us to mark a state update as a so called transition, when it's marked as a transition, that update will happen without blocking the UI 
  - We can use this in the background so the UI stays responsive 
  - In next.js we can mark a server action as a transition too 
  - Gives us two things 
    - isPending 
    - startTransition - function 
      - Function we use to wrap the heavy state update into 
      - We wrap the function we want to happen into a the start transition function as a callback 
      - By doing this, we tell the function this is marked as a transition and isPending becomes true 
- All navigations are wrapped into transitions 

## CHALLENGE #1: Updating a Reservation 
- Notes on this challenge: 
  - Notice in the Reservation card, we have a new page to update our reservation
  - We need to create the route and copy our page component from the `reservation-edit.js` component in the starter files 
  - In this page you probably need to get the page from the current booking you are trying to edit 
    - Use the `getBooking()` from data-service 
  - Create an action for updating the reservation 
  - Remember to keep in mind the user should be the only one who can edit their booking
  - You need to pass the bookingID into the form action 
    - Add hidden input field to the form 
      - input with hidden set the value prop to the bookingID 
  - Redirect to the reservations page using the redirect function from 'next/navigation'
  - Think about what needs to be revalidated, revalidting should happen before being redirected 

## Removing Reservations Immediately: The useOptimistic Hook 
- A technique called optimistic UI 
  - A trick to improve the perceived performance 
    - We assume a action will be successful 
  - We will remove a booking from the UI with the assumption it will be deleted and if not it will reshow in the UI 
- We need to make our reservation list component a client component and then we can use the `useOptimistic` hook 
- useOptimistic() 
  - This hook can become confusing because we basically need to be thinking about two types of state 
    - Actual state 
    - The optimistic state, the one where we already deleted what we wanted 
  - This hook returns the optimisitc state and then a function for the optimistic state 
    - Similar to useState() 
    - Also similar to the .reducer() method 
    - Takes in the current state and then whatever we pass into the setter function 
      - We get in a value that will help us determine the next optimistic state 
  - To test this works we can add a delay in the server action and then throw an error to watch it render back after 2 or whatever you set the timeout for  seconds if it doesn't work 
- You should use this pattern whenever you can 
- Review: 
  - useOptmistic - takes in two arguments 
    - currentState (what is currently rendered)
    - state Update function 
      - Takes in the current state and the information necessary to render that optimistic state 
    - You use your optimisticBookings when you render instead of your actual state 
    - The function that returns from this hook is like the reducer hook and returns based off of what we want to delete 
  - Reminder that this can only be used in a client component 
- Apparently the loading.js does not get passed down to child routes, so make sure to add in sub routes 

## Back to the Cabin Page: Finishing the Date Selector 
- The first part we will finish the date selector component 

## Creating a New Reservation 
- In our update reservation form, we only had to send two pieces of data, so it made sense to put this data in a hidden input, but in our create form we will be passing a ton of data 
  - Our second alternative is to use the .bind() method 
    - The bind method sets the this keyword to that function 
    - Allows us to pass some additional arguments into the function 
- .bind() takes in two arguments, what you want to set your keyword to and the additional arguments 
  - In this case we don't care about the this keyword, so we set it to null 
  - This creates a new function and then we pass that as our action 
- As we use the bind function 
  - The second argument that we pass into the bind will become the first argument of the function we are binding 
- This workaround is suggested in the Next.js docs 
- If we had a lot of data in our formData, instead of doing `formData.get` for everything in the form we could do: 
  - `Object.entries(formData.entries())`
  - This would then create an object which contains all the data in the formData 
- We could validate our data using `zod`, which is very popular right now 
- On server side we should also just double check that a cabin hasn't been booked for specific dates 
  - Implement this as a challenge 
- Now we need to fix some issues 
  - Disable the range that has been selected 
    - We want to call the resetRange 
      - We don't have access to this on the server, so we have to call after the server action has been called 
    - Then we need to revalidate the data to make these greyed out dates show 
      - This will only clear the browser cache here 
      - On demand clears the router/browser and data cache, but our page is dynamic, this is for Statically Generated Sites 