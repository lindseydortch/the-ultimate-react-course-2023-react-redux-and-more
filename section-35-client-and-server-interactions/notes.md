# Section 35: Client and Server Interactions 

## Section Overview 
- Composing full-stack apps 
- Rendering server components in client components 
- Sharing state between server and client 
- URL and React Context API 
- How to think about data fetching 

## Blurring the Boundary Between Server and Client (RSC - Part 4)
- The Server-Client Boundary: Front-end vs Back-end 
  - Traditional 
    - Back-end [API] <-- JSON DATA [GET] - Mutations [POST, PUT] -->
    - Front-End 
      - Very clear server-client boundary 
      - Communication happens via an API 
      - Once JSON arrives from the back-end, the front-end takes pver 
  - Next.js with RSC + SA 
    - Back-end --> Front-end(Back-end) - Backend(Back-end(front-end) - Front-end)
      - Front-end - client component 
      - Back-end - server component 
    - No clear separation between front-end and back-end anymore 
    - "Knitting": pieces of server and client code interweave (composability)
    - Allow us to build true full-stack applications in just one codebase 
    - No need for an intermediary API in many times 
    - Back-end - Data render directly
      - Front-end - Data: send as props 
      - Front-end to Back-end - Mutations: server actions (SA)
- Importing vs. Rendering 
  - A client component rendering a server component? 
    - Possible if server component is passed as a prop (children or other)
    - D has already been executed here... 
    - See theory lectures to see diagrams to make sense of information in this slide 
    - Dependency Tree (Module Imports) (Where client-server boundaries are) <--> Code <--> Component Tree 
  - Can import - Can render 
    - Client Components 
      - Only client components (can't go back in client-server boundary)
      - Client components and server components passed as props 
    - Server Components 
      - Client and server components 
      - Client and server components 
  - Is C a server or a client component? 
    - It can be both! A component imported inside the client-server boundary creates a client component instance 

## Client Components In Server Components 
- We want to be able to add a show more to some text in the cabin page description
  - You have to use "use client" syntax on a component where you want to use React 
  - Unless you use "use client" your component will be a server component or unless you're calling it in a client component, then it does this 

## Highlighting Current Side Navigation Link 
- We do not see server components on the component tree in the browser because it is the client part 
  - If a component has been rendered by hydrateRoot() it means that it was a server rendered component and then hydrated 
- We can manipulate the suspense boundary in the React Dev tools 
- To highlight current active link in the account 
  - We can use a custom hook that next.js provides us with 
  - We use `usePathname()`
    - Only works in client components 

## Sharing State Between Client and Server: The URL 
- We can pass data from the server to the client, now we're working on taking data from the client to the server 
  - We will be implmenting filters 
  - We will have to implement client components for interactivity, so the button to press the filter and then pass that state to the server components to render 
    - Ways to do this: 
      - Store state in the URL 
        - We get access in the component to `searchParams` -- only available in the page.js 
          - Not available in server components 
        - You then pass the filter to the server component that needs the data 
        - `searchParams` may not be known at runtime -- makes the page a dynamic route 
      - Create a client component with our UI components that interact, so button to filter cabins and then we create a handler function to handle filtering our data 
        - URL search params is a web API that provides a few methods to manipulate the queries in the url parameter 
          - To get the data from the search params on the client is to use the `useSearchParams()` hook from next.js 
          - `params.set` only builds the URL to direct, we need the `.replace()` function by the router hook 
            - useRouter() - allows us to do programmatic navigation between routes in next.js 
          - All of these hooks need to come from `next/navigation` not the outdated 'next/router'
          - We can set the scroll to false, so it doesn't scroll all the way back to the top when clicked 
- We don't see the spinner when the data is being loaded because navigation is wrapped in transition 
  - Suspense doesn't hide the already rendered content, we can fix this and pass in a unique key 
    - We used filter as our unique key because this is what value is changed and used to reload 
- Whenever searchParams changes - the page re-renders because the URL changes 
  - Re-renders the cabin list and then data is re-fetched 
  - The page become dynamic 

## Advanced: Server Components In Client Components 
- The more common option is rendering client components in server components, now we're going to work on the way around 
- We're working on our country select in our update account 
- You can't access the .env variables in a client component 
- We need our <SelectCountry> component to be a server component, it's below the server client boundary 
  - So in order to fix this, we have to pass it as a prop 
    - We can pass it as a children prop 

## Data Fetching Strategies For the Reservation Section 
- Why fetch data in the page and not the components we are bringing, the idea is to get the data in the server component and then pass down to our components because they are eventually going to be client components 
  - The problem with the way we are calling our data is we are creating a blocking waterfall 
    - We're fetching multiple pieces of data that don't depend on each other, but are still blocking one another 
  - One approach to fixing this is to use `Promise.all()` 
    - This is still not perfect because it can only be as fast as its slowest promise 
  - Instead of fetching data on the parent page 
    - We can create a bunch of different components and then have the components only fetch what they need and then those components can be streamed in as they become ready 
- To get rid of unused imports: `Shift + Alt + O`
- Ideally client components should be passed the minimal amount of data 
- Always think about the patterns when fetching your data 

## Using the Context API for State Management 
- onSelect - returns a from with a 2
- To store our date we need a piece of state 
- Because we need the range of dates from a date picker for our form, we need to share our state to other components 
  - We have 3 options 
    - Store it in the url with the advantage it becomes sharable 
      - Won't work for this because this will create a new navigation and re-render and re-fetch the server component 
    - Create a parent component and then place inside of reservation 
      - We could lift the state up, we already know how to do this 
    - Use the React contextAPI 
      - Only works for client components 
- In React 19 we may have access to use - a newer hook 
- We placed our context in the global layout because we will need access to it in other components later 
  - The global access to our state is good for our reservation reminder
- If you want to share state between the client and the server then you have to use the URL 

## Creating An API Endpoint With Route Handlers
- Creating our own API endpoints is as important as it was in the past, now with server actions, it's different
  - To do this we use a future called route handlers 
    - We can create these by creating a convention folder with a file called `route.js` and cannot have a page.js 
  - These route handlers use response API 
    - There are extended Next.js versions of response 
  - We get access to the request and the params in the route.js functions 
- We are setting up these endpoints for our affiliates to extract our data for someone to consume who may want to see it 