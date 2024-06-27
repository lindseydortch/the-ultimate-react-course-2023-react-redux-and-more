# Section 32: Overview of Next.js With the "App" Router 

## Section Overview 
- What we will learn
  - What is server-side rendering (SSR) and why do we need it? 
  - What is Next.js? 
  - Deep dive into React Server Components 

## Download Fresh Starter Files + Slides! 
- Downloaded Theory Slides and updated Repo 

## An Overview of Server-Side Rendering (SSR)
- Review: The Rise of Single-Page Applications
  - The "Old" Way 
    - Server/ Back-end -- Client/ Front-end
    - Server-Side Rendering 
      - Render Webpage (php, wordpress) --> HTML, CSS, JS <--> Browser --> Webpage 
  - The "Modern" Way
    - Client-Side Rendering 
      - API <--> Browser --> Render Webpage --> HTML, CSS, JS --> Webpage 
    - This is where we got React, Angular, Vue, Svelte
  - We're seeing a change back to server-side rendering 
    - We are now blending the best of client side and server side rendering 
- Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)
  - Client-Side Rendering (React)
    - HTML is rendered on the client (the user's computer) using JavaScript 
    - Slower initial page loads: 
      - Bigger JavaScript bundle needs to be downloaded before app starts running 
      - Data is fetched after components mount 
    - Highly interactive: All the code and content has already been loaded (except data)
    - SEO can be problematic 
  - Server-Side Rendering (Next.js)
    - HTML is rendered on the server (the developer's computer)
    - Faster initial page loads: 
      - Less JavaScript needs to be downloaded and executed 
      - Data is fetched before HTML is rendered 
    - Less interactive: Pages might be downloaded on demand and require full page reloads 
      - Next.js does work around this 
    - SEO-friendly: Content is easier for search engines to index 
- When to use CSR and SSR 
  - Client-Side Rendering 
    - SPAs: Perfect for building highly interactive web apps 
    - Apps that don't need SEO
      - Apps that are used "internally" as tools inside companies 
      - Apps that are entirely hidden behind a login 
      - This is what we've been doing so far 
  - Server-Side Rendering 
    - Content-driven websites or apps where SEO is essential: E-Commerce, blogs, news, marketing websites, etc. 
    - Two types of SSR: 
      - Static: HTML generated at build time (often called Static Site Generation, or SSG)
      - Dynamic: HTML generated each time server receives new request (some call only this SSR)
      - More on these later 
- Typical Timeline of CSR vs. SSR with Data Fetching 
  - Content paint (LCP) - the time it takes for the page to show all the relevant content to the user 
  - First paint - something has just been painted onto the screen 
  - CSR 
    - From Server: Empty page -- To Client --> Download JS Bundle -> Render spinner (FCP) -- To Server --> Fetch Data -- To Client --> Render app with data --> Content paint (LCP)
  - SSR 
    - From Server: Fetch data --> Render app with data -- To Client --> HTML, CSS, JS (FCP and LCP) Download JS bundle --> Hydrate 

## Experiment: Manual SSR With React DOM + Node.js 
- Starting in Node 20 you can use the `--watch` flag instead of using nodemon 
  - Needs to be added after `node`
- Server side react renders the whole html as a string, this makes our page not interactive 

## The Missing Piece: Hydration 
- What is hydration?
  - Server - React component tree --> SSRd HTML -- To Client --> (LCP) Rendered webpage DOM 
  - React component tree -- The React bundle is sent as well --> Hydration 
  - Hydration 
    - Adds back the interactivity and event handlers that were lost when HTML was server-side rendered 
    - Watering the "dry" HTML with the "water" of interactivity and event handlers 
    - React builds the component tree on the client and compares it with the actual SSRd DOM: They must be the same so React can adopt it 
    - Common hydration error causes: incorrect HTML element nesting, different data used for rendering, using browser-only APIs, side effects, etc. 

## Implementing Hydration 
- When we slow the app down to slow 3G it can be very slow to load, but you still see the first paint 
- We won't have to write this type of code ever again, this is why we have frameworks 

## What Is Next.js? 
- What is Next.js? 
  - Next.js 
    - "The React Frameowrk for the web" -Vercel
    - Meta-framework built on top of React: we still use components, props, react hooks, etc. 
    - Opinionated way of building React apps: set of conventions and best practices regarding routing, data fetching, etc. 
    - Allows us to build complex full-stack web apps and sites 
    - Allows us to use cutting-edge React features that need to be integrated into a frameowrk: Suspense, Server Components, Server Actions, steaming, etc. 
      - React's full-stack architecture vision
- The Next.js Key Ingredients 
  - Server-Side Rendering (Dynamic and Static)
    - Dynamic or static can be selected for each route 
  - File-Based Routing Conventions 
    - Folders are routes 
    - Special files for pages, layouts, loaders, etc. 
  - Data Fetching and Mutation on the Server 
    - Fetching data directly in Server Components 
    - Mutations in Server Actions 
  - Optimizations 
    - Images 
    - Fonts 
    - SEO 
    - Preloading 
- Two Flavours of Next.js: "App" and "Pages" Router 
  - Modern Next.js: "App" Router 
    - Introduced in Next.js 13.4 (2023)
    - Recommended for new projects 
    - Implements React's full-stack architecture: Server Components, Server Actions, Streaming, etc. 
    - Easy fetching with fetch() right in components 
    - Extremely easy to create layouts, loaders, etc. 
    - More advanced routing (parallel routing, etc.)
    - Better DX (Developer Experience) and UX
    - Caching is very aggressive and confusing 
    - Steep learning curve (but it's React)
  - Legacy Next.js: "Pages" Router 
    - The first Next.js Router since v1 (2016)
    - Still supported and updated in the future 
    - Overall more simple and easy to learn 
    - Simple things like layouts are confusing to implement 
    - Data fetching using Next.js-specific APIs such as `getStaticProps` and `getserverSideProps`
  - We're gonna learn the "app" router from the start. At the end, there is a section on fundamentals of the "pages" router 

## Setting Up a Next.js Project 
- `npx create-next-app@latest`
  - Use v14, to stay on track with the course 
- Tailwind is tightly integrated with tailwindCSS 
- 

## Frequent Next.js Updates + Documentation 
- 

## Defining Routes and Pages 
- 

## Navigating Between Pages 

## Creating a Layout 

## What Are React Server Components? (RSC - Part 1)

## Fetching Data In a Page 

## Adding Interactivity With Client Components 

## Displaying a Loading Indicator 

## How RSC Works Behind the Scenes (RSC - Part 2)

## RSC vs SSR: How Are They Related? (RSC - Part 3)