# Section 39: [OPTIONAL] Legacy Next.js: The "Pages" Router 

## Section Overview 
- Legacy "pages" router 
- You need to have watched previous sections 
- "App" router vs. "pages" router 
- Don't use "pages" router for new projects! 

## Setting Up Another Project 
- `npx create-next-app@14`
- We will build a stripped down version of The Wild Oasis App without Authentication or the Guest Area 
- The _ doesn't work here and we can't place these folders in our pages folder 
- We will need 
  - `npm i @supabase/supabase-js@2.42.1 @heroicons/react@2.1.3`
- The pages folder is essentially the app folder 

## Routes, Pages, and Navigation 
- In the app router we would create a new folder and that wpuld become the route 
  - In the legacy router, you created a .js file after the route in the pages folder 
- We still use the Link to navigated 
- To nest routes, you create a folder with an index.js and then you can create the route .js from there
- This architecture no longer uses the RSC 
  - We can use React hooks anywhere 
- Everything is serverside rendered once 
  - This is all simplified 

## Dynamic Routes 
- Creating the route `/cabin/${cabinId}` 
  - Create the cabin folder 
  - Use the same convention with the [] as we did in the app router 
- Getting the params is different 
  - We have to use useRouter from 'next/router'

## Creating a Layout With a Custom_App
- We do not have all the convention files we have in the app router, we have to do all of those manually 
  - The _document and _app will come from next.js if we don't specify this 
  - Usually we don't alter the _document.js so we can remove it 
  - The _app is like an application initializer 
- The font and image optimizer works the same as in the app router 
  - In the RootLayout using the app router we could just use the children prop, but we don't get access to that here, so we have to use the component 
- There is no way in the pages router to created a nested layout 

## Creating Pages 
- Created the rest of the pages for the app using the starter files 

## Defining Page Title and Favicon 
- You would think you add the title in the _document.js, but you actually do it in the custom app 
- We use the <Head> component from 'next/head'
- To make this change in other pages, you just redefine the Head in the page you want to change 

## Fetching Data With getStaticProps (SSG)
- We want to fetch all the cabins and then render them like we did, but before this is not a server component, so we cannot have async components 
  - We still want to fetch data on the server like we did before 
  - Next.js had to come up with their own API to achieve this 
- We return props with what we want and pass that to our component 
- It's called static props 
  - The rendering strategy is based on whether or not we use getStaticProps (static render) or getserverSideProps (server side render)
    - This lets it decide if it is generated dynamically or statically 
    - We get to make the decision

## Fetching Data With getServerSideProps (SSR)
- We will use the dynamic individual cabin pages 
- What's special about getServerSide Props is that we get access to the query param 
- We can also make our params known 
  - We would have to use getStaticPaths 
  - It could go back to being statically rendered like we learned earlier in the course 
- Incremental static regeneration 
  - We implemented in the app router using a variable called revalidate 
  - In the pages router, you set it in getStaticProps() in the return of your fetching function 
- You can also fetch data using the client like we did when we were doing our React projects 
- It makes sense to fetch as much data from the server as possible to improve page speeds 

## API Routes 
- Similar to route handlers we used in the app router 
- We need to create a folder called api in the pages folder 
  - The file name will define the URL for that endpoint 
- We only create one function which will then be called once the API endpoint is hit 
- These endpoint run on the server 
  - We don't have server actions here 
  - We need to create one API endpoint for each data mutation we want to run on the server 
- The difference between server actions and these API endpoints, we're going to have to call these endpoints manually from our components 

## Handling Form Submissions 
- The way we handled forms to create one state variable for each of the inputs 
  - This is not mandatory 
  - When we submit a form, we get access to submitEvent 
    - We can use this to get all the data of the fields in the form 