# Section 34: Data Fetching, Caching, and Rendering 

## Section Overview 
- How to work with data effectively in Next.js 
- Streaming with Suspense and loading.js 
- Static vs. dynamic rendering 
- Caching mechanisms 

## Setting Up Supabase 
- Next.js comes with built in support for environment variables 
  - Next JS allows us to make our variables public to the client, you just start it with `NEXT_PUBLIC_SOME_VAR`
- When we originally set up subpase, we didn't care if someone got access to our key because we turned it off for non-authenticated users 
  - We want to use a service_role key - has the ability to bypass row level security 

## Fetching and Displaying Cabin List 
- You can make your components async and then wait for them to fetch data 
  - We don't need any useEffect, useState, or any separate data fetching libraries 
  - All of this happens in the server 
  - We are really close to the data source, we don't typically need an API 
    - Vercel's key value data storage is a good example of this 
  - When we want to load an image directly from a URL, we need to use the fill property or give it a height and width 
  - When you want to use a src where the image is hosted somewhere else, we need to configure that path 

## Streaming Route Segments With loading.js File 
- We can have a specific loader for specific routes
  - You create another loading.js for the route you want to use it for that route and all it's sub routes 
- Having a loafding.js file will activate streaming 
  - Remember streaming requires JS to be turned on in the browser
- We want more granular control over where we want the spinner to be for our cabins page, because the copy doesn't need time to load, but the cabins data does, but in order to do this we need to learn about the suspense component 

## What Is React Suspense? 
- What is React Suspense? 
  - Suspense 
    - Built-in React component that we can use to catch/isolate components (or entire subtrees) that are not ready to be rendered ("suspending")
    - What causes a component to be suspending? 
      - Fetching data (with a supported library)
      - Loading code (with React's lazy loading)
    - Native way to support asynchronous operations in a declarative way (no more isLoading states and render logic)
  - App -> Nav - Suspense (Products -> List - Filter)
    - Suspense - built-in React component 
    - Products - Component in Next.js that will fetch data (will be suspending)
- How Does Suspense Work? 
  - While rendering, suspending component is found --> 
    - Go to closest Suspense parent ("boundary") and discard already rendered children --> 
    - Display fallback component/JSX (Spinner) -- After Async work is done --> 
    - Render subtree under Suspense boundary 
  - Important: Components do not automatically suspend just because an async operation is happening inside them. Integrating async operations with Suspense is hard, so we use libraries (React Query, Next.js, etc.)
  - App -> Nav - Suspense --> Spinner 
- A Look Behind the Scenes 
  - Fiber Tree Representation 
    - App -- Child --> Nav - Suspense - Activity(Products --> List - Filter)
      - Activity - another built-in compoenent  -- contains the fallback Spinner 
        - Hidden in the fiber tree 
      - If component re-renders later, the fallback displays again 
      - State is preserved in subsequent suspending 
    - Fallback will NOT be shown again if the Suspense trigger is wrapped in a transition(startTransition). In Next.js, that's the case with page navigations. We can reset the Suspense boundary with a unique key prop 
    - How does Suspense actually know that a component is suspending? 
      - Triggers Suspense by throwing promise 
        - throw new Promise(...)

## Streaming UI With Suspense: Cabin List 
- Our text could be loaded in immediately, we should have a more granular way of showing data without affecting the whole page 
  - To do this in Next.js we can do this using a Suspense Boundary 
- We move all the data fetching into it's own component and then wrap that component in a suspense boundary 
- Get used to having the data fetching as close as possible to the place that needs that data
- To use <Suspense> you import it from React and then provide it with a fallback prop 
  - fallback has to be a React element 
- Two options for streaming 
  - Global one - this can create a blocking UI 
  - Granular only a certain component streamed in 
    - Move data loading into it's own component 
    - Suspense needs to be outside of the component that does asynchronous work 
- Keep data fetching as close to the components that actually need the data 

## Dynamic Route Segments: Building the Cabin Page 
- We are in a situation where we don't know the predetermined value of something 
  - Value gets filled at request time or can be pre-rendered(we will learn more about this later)
- We use [`param`] folder with page.js 
- Any page associated with a dynamic route segment, gets access to a params prop 

## Generating Dynamic Metadata
- Instead of exporting the metadata variable, we can export a generateMetadata() function 
  - Next will wait for this function to complete before streaming the UI 

## Error Handling: Setting Up Error Boundaries 
- Example a user has an old data that doesn't exist and then user gets a component error, this is more of a not found error
- Example - trying to access an object that doesn't exist, so we want to set up a global error boundary to show the error on the frontend 
- The error boundary always needs to be a client component, so we need to use the "use client" syntax on the component 
  - We get access to the error object and a function to reset the error boundary 
  - We can have nested error bondaries like layout.js and page.js 
  - This works for all errors only in rendering 
    - Any errors that happen in callback functions  
  - Error.js does not catch errors in the root layout 
    - We would have to create a global-error.js
      - You can find more about this in the documentation 

## Error Handling: "Not Found" Errors 
- We create a 'not-found.js'
  - Not found can be triggered in two ways 
    - Going to a route that doesn't exist 
    - Manually trigger the page by calling the notFound function 

## Different Types of SSR: Static vs. Dynamic Rendering 
- Server-Side Rendering In Next.js 
  - Next.js is a React framework, so rendering is done by React, following the rules we learned earlier 
  - Remember: Both Server and Client components are rendered on the server on the initial render
  - In Next.js, the server-side rendering work is split by routes 
  - Each route can be either `static`(also called pre-rendered) or `dynamic` 
  - There is also Partial Pre-Rendering (PPR) which mixes dynamic and static rendering in the same route (more on this later)
  - Route of the same app 
    - / - static 
    - /search - dynamic 
    - /product - static 
- Static vs Dynamic Rendering 
  - Static Rendering 
    - HTML is generated at build time, or periodically in the background by re-fetching data (ISR, more on this later)
    - Useful when data doesn't change often and is not personalized to user (e.g. product page)
    - Default rendering strategy in Next.js (even when a page or component fetches data)
    - When deployed to Vercel, each static route is automatically hosted on a CDN (Content Delivery Network)
    - If all routes of an app are static, the entire app can be exported as a static site (SSG)
  - Dynamic Rendering 
    - HTML is generated at request time (for each new request reaches the server)
    - Makes sense if: 
      - The data changes frequently and is personalized to the user (e.g. cart)
      - Rendering a route requires information that depends on request (e.g. search params)
    - A route automatically switches to dynamic rendering in certain conditions (next slide)
    - When deployed to Vercel, each dynamic route becomes a serverless function 
- When Next.js Switches To Dynamic Rendering 
  - Usually, developer don't directly choose whether a route should be static or dynamic. Next.js will automatically switch to dynamic rendering in the following scenarios:  
    - The route has a dynamic segment (age uses params)
    - searchParams are used in the page component 
      - /product?quantity=23
    - headers() or cookies() are used in any of the route's server components 
    - An uncached data request is made in any of the route's server components 
  - This is necessary because any of these values cannot be known by Next.js at built time 
  - We can also force Next.js to render a route dynamically:
    - `export const dynamic = 'force-dynamic';` from page.js 
    - `export const revalidate = 0;` from page.js
    - These incluence caching, more on this later  
      - `{cache: 'no-store'}` added to a 'fetch' request in any of the route's server components 
      - noStore() in any of the route's server components
- Some Terminology You Might Need 
  - Content Delivery Network (CDN): A network of servers located around the globe that cache and deliver a website's static content (HTML, CSS, JS, images) from as close as possible to each user 
  - Serverless computing: With the serverless computing model, we can run application code, usually backend code, without managing the server ourselves. Instead, we can just run single functions on a cloud provider: serverless functions. The server is initialized and active only for the duration the serverless function is running, unlike a traditional Node.js app where the server is constantly running. 
    - Remember: each dynamic route becomes a serverless function
  - The "edge": "As close ass possible to the user". A CDN is part of an "edge" etwork, but there is also severless "edge" computing. This is serverless computing that does not happen on a central server, but on a network that's distributed around the globe, as close as possible to the user (like a CDN, but for running code). 
    - Important: we can select certain routes to run on the edge when deployed to Vercel 
  - Incremental Static Regeneration (ISR): A Next.js feature that allows developers to update the content of a static page, in the background, even after the website has already been built and deployed. This happens by re-fetching the data of a component or entire route after a certain interval. More on this later 

## Analyzing Rendering in Our App
- To see how each route is actually rendered, we need to build the site using the build command next.js provides us 
- There is a way to tell Next.js all the ID's we'll need for a dynamic route 

## Making Dynamic Pages Static With generateStaticParams 
- Next.js will handle our cabins pages in a dynamic way, so we need to change this since we have 8 different ID's 
  - We know which ID's we care about, so we tell Next.js about it and possible set of ID's and it will be able to render those pages as static pages 
  - We have to export generateStaticParams() 
    - We have to return an array and for the value we need to return an object that has the name (cabinId) with the corresponding value 
    - This will pre-render a static page 

## Static Site Generation (SSG)
- `npm run build`, but before we do this we have to update our next.config and add `output: "export"`
  - Will create an `out` folder
  - But if you have any sort of dynamic routes this will not work, everything needs to be static in order for this to work
  - To see the static build you can open in VSCode and then use liveserver, but the images don't work 
  - The out folder contains the RSC payload 
  - You can also look at the bundled up next.js code  
- Images don't work because they were optimized behind the scenes with Vercel, so we no longer have access to the Vercel server 
  - There are two ways to fix this:
    - Create our own custom loader - using cloudinary 
    - Or remove all the images using Next.js image optimization 

## Partial Pre-Rendering 
- Partial Pre-rendering (PPR): A Whole New Way of Rendering 
  - Idea/problem: Most pages don't need to be 100% static or 100% dynamic 
  - Solution: Partial Pre-rendering 
  - New rendering strategy that combines static and dynamic rendering in the same route 
  - 1. A static (pre-rendered) shell is served immediately from a CDN, leaving holes for dynamic content 
  - 2. The slower dynamic content is streamed in as it's rendered on the server
  - Result: Even faster pages that can mostly be delivered from the edge (CDN) even when there are small dynamic parts
  - Examples 
    - / - 100% static
      - "Pre-rendered" 
    - /product - 100% dynamic
    - /search - static shell - then loads dynamic content 
      - 80% static 
      - 20% dynamic
- How to use partial pre-rendering 
  - As of Next.js, PPR is highly experimental and should not be used in production 
  - PPR needs to be turned on in config gile 
  - By default, as much as possible of any route will be statically rendered, creating a static shell 
  - Dynamic parts (components) should be placed inside `Suspense Boundaries` 
  - There are no new APIs to learn
  - These boundaries tell Next.js that anything within the boundary is dynamic 
  - The boundary prevents the dynamic part (e.g. reading a header or making a non-cached fetch request) from spreading onto the entire route 
  - Dynamic components or sub-trees are intserted into the static shell as they become available  

## How Next.js Caches Data 
- Caching In Next.js 
  - Next.js Caching 
    - Caching: storing fetched or computed data in a temporary location for future access, instead of having to re-fetch or re-compute the data every time it's needed 
    - Next.js caches very aggressively: everything that is possible to cache, is cached 
    - Next.js provides APIs for cache revalidation: removing data from the cache and updating it with fresh data (re-fetched or re-computed)
    - Makes next.js apps more performant and saves costs (computing and data access)
    - Caching always ON by default: strange and unexpected behavior in some situations. Some caches can't be turned off 
    - Very confusing: many different Next.js APIs affect and control caching 
- The Caching Mechanisms 
  - Where? - What Data? - How long? - Enables 
    - Request Memoization - Server - Data fetched with similar GET requests (same url and options in fetch function) - One page request (one render, one user) - No need to fetch at the top of tree: the same fetch in multiple components only makes one request 
      - Only in components (not route handlers or server actions)
    - Data Cache - Server - Data fetched in a route or a ingle fetch request - Indefinitely, even across re-deploys (can revalidate or opt out) - Data for static pages + ISR when revalidated 
      - This is the most important one 
    - Full Route Cache - Server - Entire static pages (HTML and RSC payload) - Until the "Data Cache" is invalidated (or app is re-deployed) - Static pages
    - Router Cache - Client - Pre-fetch and visited pages: static and dynamic - 30 sec dynamic / 5 min static (throughout one user session) - SPA-like navigation (instant navigation and no full reloads)
  - This is the behavior in production mode. Caching doesn't work in development 
    - How to revalidate? - How to opt out? 
      - Request Memoization - N.A. - AbortController 
      - Data Cache & Full Route Cache 
        - Time-based (automatic) for all data on page: `export const revalidate = <time>;` (page.js)
        - Time-based (automatic) for one data request: `fetch('-', {next: {revalidate: <time>} })` 
        - On-demand (manual): `revalidatePath` or `revalidateTag`
        - How to opt out? 
          - Entire page: 
            - `export const revalidate = 0;` (page.js)
            - `export const dynamic = 'force-dynamic';` (page.js)
            - Individual Request:
              - `fetch('-', {cache: 'no-store' })`
            - Individual Server Component: 
              - `noStore()`
            - These forces page to become dynamic, which also opts out of the Full Route Cache 
        - Router Cache 
          - `revalidationPath` or `revalidateTag` in SA
          - `router.refresh`
          - `cookies.set` or `cookies.delete` in SA
          - Not possible to opt out of this cache (can be very problematic)

## Experimenting With Caching and ISR 
- We need to simulate a production environment 
  - So we use the build and start commands together 
  - Since we statically rendered the cabin page, so it's not ideal to have caching here, so we need to force our route to be dynamic 
  - The revalidate variable cannot be a value 
- In many situations, we need a happy medium in between 
  - This is where Incremental Static Regeneration comes into play
    - So we just updated the revalidate value 
  - This is great for data that changes from time to time, but not constantly 
- We can do this at the component level 
  - Opting one components, renders part of the route as static
- We only did time-based, we will do server based actions for caching later 
- It is very important to understand how all of this works and ties together 
  - Experiment with this, so you can learn more about how this affects your application 

## CHALLENGE #1: Fetching the Number of Cabins 
- Made number of cabins on about page dynamic 