# Section 36: Authentication With NextAuth (Auth.js)

## Section Overview
- NextAuth library (Auth.js) for authentication
- Google provider 
- Middleware for authorization
- Accounts in Supabase DB

## Setting Up NextAuth 
- At some point Auth.js will work for multiple libraries and not just Next.js 
  - We're going to use this library instead of the superbase one 
  - We're going to use the Google Provider 
  - You can use Clark or Lucia instead -- you do have to pay at some point 
- We set up an auth.js file in our _lib folder 
- Before we can get started, we do have to set a few configs 
  - NEXTAUTH_URL
  - NEXTAUTH_SECRET
    - We have to generate a secret, we can use a small app called generate secret vercel 
  - These have to be spelled correctly 
- We then have to configure google 
  - We go to google developer console and then Create a Project 
    - Once a project is created we select it and go to APIs & Services 
    - Once you want to publish the app you then go in and publish 
    - We then need to Create OAuth Client ID
    - When we deploy we'll have to update the URL's we input 
- We then need to install nextauth 
  - `npm i next-auth@beta`
- In our auth.js 
  - We set up authConfig that takes an array of providers, etc. 
  - For your own credentials, you would use the credentials provider, but we won't set this up 
  - We then call the NextAuth() function with the authConfig
  - And then we need to create API endpoints and import them from our auth.js
    - Once this is configured we can go to the endpoints we created 
    - You can go to routes like signin, etc. 

## Getting the User Session 
- We want to display the user avatar when the user is logged in 
- The auth function we can call in any server component we want, so this gives us the session 
- `referrerPolicy="no-referrer"` is sometimes required on images to display coming from Google 
- Whenever we use the auth() function it makes our route dynamic 
  - Because it uses headers and cookies 
  - With displaying the user image it makes our whole site dynamic because we're calling that auth() function 
- There is a way to use the auth() function on client components
  - But it is very beneficial to keep this stuff on the server, only dealing with logged in and logged out users right on the server 
- Authentication - getting the right information about the current user and making sure the user is who they claim to be 
- Authorization - only allow access to certain parts of our site to users who are logged in 

## What Is Middleware In Next.js? 
- How Middleware Works In Next.js 
  - Request -- Middleware --> Response 
  - Middleware Details: 
    - By default, middleware runs before every route in a project, but we can specify which paths using a match 
    - Analogy: chunk of code that's in every page.js component 
    - Only one middleware function needs to be exported from middleware.js (or .ts) in the project root folder 
    - Middleware needs to produce a response 
      - 1 - Redirect or rewrite to a route 
        - Request --> Middleware -- 1 --> App Routes --> Response 
      - 2 - Send response directly (usually JSON)
        - Request --> Middleware -- 2 --> Response 
        - Can be useful when all you want to do is send some data like JSON from an API
        - Most of the time we won't be using this  
  - Use Cases: 
    - Read and set cookies and headers 
    - Authentication and authorization 
    - Server-side analytics 
    - Redirect based on geolocation 
    - A/B testing 

## Protecting Routes With NextAuth Middleware 
- We are going to protect our guest area routes 
- middleware.js needs to be created at the root of the project (not the app)
  - You need to export a function called middleware 
    - This function does get access to the request 
  - We need to return NextResponse from 'next/server' and then we can redirect 
  - Remember the middleware runs on every single route 
    - This is where we introduce the concept of the 'matcher' and we give an array of all the routes this should apply 
  - The auth() function from NextAuth() also works as a middleware
    - We can then set the middleware to auth, then we need to specify some callbacks in our authConfig 
- In the next lecture we will build our own sign in and signout pages and button 

## Building a Custom Sign In Page
- The idea is to replace the page that nextAuth creates 
- How do we tell auth we want to go to this page and not this page? 
  - We create an object in our other config called 'pages'
  - But then our button does nothing, to login with Google, so we have to connect it with the authentication flow 
  - We need to export the signin and signOut for NextAuth()
- Since our button is a server component, we need to create a Server action 
  - Server Action - allow us to add interactivity to server components, like forms 
  - There are multiple places we can define a server action, but the best place to do this is in an action.js

## Building a Custom Sign Out Button 
- Our signOut button gets loaded into a client component, but we still need to use a server action 
  - Server actions can be called from the client and even then be executed on the server  

## Creating a New Guest On First Sign In 
- The last step is to connect a logged in user with a guest profile in our supabase database 
  - This is where we use our guest database 
  - Each guest has an email, name, nationality, and country 
  - Whenever a user signs in we need to check if that user exists in our guests table and then if not then we create a new one 
  - We can specify another callback called sign in in our auth.js 
    - This runs before the signUp process happens, it's a bit like middleware
      - Happens after the user has put in their credentials, but before they're logged into the application 
    - The signin function gets passed in some information 
      - user 
      - account 
      - profile 
- The ID of our user is important because this is what we use to create our bookings 
  - If we get the session using the auth() function, we still don't get access to the guest ID 
  - We can access the id in one central place in our auth callback 
  - session callback - runs after our signIn callback 
    - Make sure to return the session or else it will break when you call auth() 
  - You cannot set the id for the guest in the signIn callback because the session hasn't been created yet, so this is why it's a two step process 