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

## Frequent Next.js Updates + Documentation 
- To update your project to the latest Next.js version, just run this command in your project folder: 
  - `npm install next@latest react@latest react-dom@latest eslint-config-next@latest`

## Defining Routes and Pages 
- Each page in Next.js is a React component that is exported from a page.js file 
  - Convention is to just call this component `Page()`
- You can now add custom labels in VSCode so we can easily see what file we're working in because they're all named page.js 
  - Settings -> Custom Labels -> patterns -> Add item 
    - `**/app/**/page.js` - `PAGE | ${dirname}` 

## Navigating Between Pages 
- Using a <a> element creates a full page reload 
  - We still want it to feel like a Single Page Application like we had before, this is where we use the <Link> Component
- <Link> needs to be imported
  - Behind the scenes it provides a few optimization techniques
    - Will prefetch all the links 
    - Each page is downloaded separately 
    - Each page we visit will be cached right in the browser 

## Creating a Layout 
- Each next.js app has to have a global layout 
  - The layout wraps the entire application 
  - Convention is to call it `RootLayout()`
  - Needs to contain the <html> and <body> tag
    - We don't include the head tag there is another way to deal with the head 
- This is where we use the children prop to pass down the components we want to use 
  - You can pass down a page or another layout 
- We can export the page metadata from this layout 
  - For example, the page's title 
- Next.js is all about conventions 
  - For example routes and variables you can export 
- Layouts are Server Components - components that are rendered on the server 
  - This is a completely new paradigm in React 

## What Are React Server Components? (RSC - Part 1)
- Why React Server Components? 
  - 100% Client-Side 
    - Ui = f(state)
    - We "hack" this by storing fetched data in state too 
    - Interactive 
    - Components 
    - Requires lots of JS 
    - Client-server data waterfalls 
  - 100% server-side 
    - UI = f(data)
    - No Components 
    - Easy and fastt to fetch all data 
    - Close to the data source 
    - Needs to ship 0kb of JS
  - React Server Components 
    - UI = f(data, state)
    - Closer to what a real-wrold app is 
  - What if we could tak the best of both worlds? 
    - The answer is a completely new React paradigm: React Server Components (RSC) 
- What are React Server Components? 
  - React Server Components (RSC)
    - A new full-stack architecture for React apps 
    - Introduces the server as an integral part of React component tress: server components 
    - We write frontend code next to backend code in a natural way that "feels" like regular React 
    - RSC is NOT active by default in new React apps (e.g. Vite apps): it needs to be implemented by a framework like Next.js ("app router")
    - Name of the new paradigm 
  - Client Components 
    - UI = f(state)
    - "Regular" components 
    - Created with the "use client" directive at the top of the module 
  - Server Components 
    - Name of the new Component type 
    - UI = f(data)
    - Component that are only rendered on the server 
    - Don't make it into the bundle (0kb)
    - We can build the back-end with React 
    - Default in apps that use the RSC architecture (like Next.js)
- An Example + The Server-Client Boundary 
  - Server Component 
  - App --> Sidebar - Header (Avatar - DarkMode "use client" (CC)) - Main (Table -> CabinRow (Menu "use client" (CC) --> Duplicate (CC) - Edit (CC) - Delete (CC)) -- SortBy "use client" (CC)) 
    - CC = Client Component 
  - Server-client Boundary - split point between server and client code 
    - Client sub-tree. Child modules don't need to use "use client"
- Server Components vs. Client Components 
  - Client Components ("use client") - Server Components (default) 
    - State/ hooks - Yes - No 
    - Lifting state up - Yes - N.A.
    - Props - Yes - Yes (Must be serializable when passed to client components. No functions or classes)
    - Data fetching - Also possible, preferably with library - Preferred. Use async/await in component
    - Can import - Only client components (can't go back in the client-server boundary) - Client and server components 
      - Importing - the component module imports another module using the import syntax
    - Can render - Client components and server components passed as props - Client and server components 
      - Render - one component calls another one 
    - When re-render? - On state change - On URL change (navigation)
- A simple new mental model 
  - "Traditional" React 
    - Components -> View -> Interaction -- Update state --> Re-render Components -- Fetch data 
  - React with RSC 
    - The core remains the same 
    - Server Components --> View -- Fetch data or can pass props to the client component 
    - Client Components -> View -> Interaction -- Update state --> Re-render Components -- Update URL -- Re-render --> Server Component 
- The Good and Bad of the RSC Architecture 
  - The Good 
    - We can compose entire full-stack apps with React Components alone (+ server actions)
    - One single codebase for front and back-end 
    - Server components have more direct and secure access to the data source (no API, no exposing API keys, etc.)
    - Eliminate client-side waterfalls by fetching all the data needed for a page at once before sending it to the client (not each component)
    - "Disappearing code": server components ship no JS, so they can import huge libraries "for free"
  - The Bad 
    - Makes React more complex 
    - More things to learn and understand 
    - Things like Context API don't work in server components 
    - More decisions to make: "Should this be a client or a server component?", "Should I fetch this data on the server or the client?", etc. 
    - Sometimes you still need to build an API (for example if you also have a mobile app)
    - Can only be used within a framework 

## Fetching Data In a Page 
- Each page is a server component
- Logs from server components will log in the terminal, client components will still render in the browser console 

## Adding Interactivity With Client Components 
- There is hydration here, but the user is able to see the most important content, but is not able to interact 
- All components are rendered on the initial render, we will learn more about this later 

## Displaying a Loading Indicator
- We will build our loading indicator because it is a global loader so it will apply to any page in the application 
- With the loading file we can display an instant loading space that displays while the route is fetching data 
- loading.js - this activates streaming 
  - Will be streamed from the server to the client automatically and not sent in one go 
  - This uses renderToReadableStream() 
  - This feature needs JS to work in the browser 

## How RSC Works Behind the Scenes (RSC - Part 2)
- A Quick Review of Rendering In React 
  - "Traditional" React 
    - Components (A B C)
    - --> Tree of component instances (Component tree) -- RENDER --> React element tree ("Virtual DOM") -- Commit to DOM --> DOM Elements (HTML)
- How RSC Works Behind the Scenes 
  - Server Component (SC) and Client Component (CC)
  - Server
    - Component Tree -- Render SC --> "Virtual DOM" of SC + Trees of CC (RSC Payload) -- Send to Client -->
  - Client 
    - Not server and client in the typical sense 
    - --> Complete "Virtual DOM"
  - Component tree (contains SC and CC Components) -- RENDER SC --> React Element (The code from the SC has disappeared)
    - This is why we can't use hooks in server components because there is no way to send useState to the browser, there would be no way to keep track of state 
  - Client Components 
    - "Hole" where the CC will be rendered 
      - Serialized props passed from SC to CC 
      - URL to script with component code   
        - Powered by the framework's bundler 
  - "Virtual DOM" of SC + Trees of CC (RSC Payload) 
  - See class lecture to see what this actual diagram looks like 
  - Why RSC Payload? Why not renders SCs as HTML 
    - Describes the UI as data, not as finished HTML 
    - When a SC is re-rendered: React is able to merge ("reconcile") the current tree on the client with a new tree coming from the server 
    - As a result, UI state can be preserved when a SC re-renders, instead of completely re-generating the page as HTML 
- A Simplified Review 
  - "Traditional" React
    - Component Tree -- Render --> "Virtual DOM" -- Commit --> DOM Elements 
  - React With RSC 
    - Server - Component tree of SC and CC -- Render SC --> "Virtual DOM" of SC + Component trees of CC (RSC Payload - For Each CC in Tree) -- Send "RSC Payload" to client - Render CC --> Client - Complete "Virtual DOM" -- Commit --> DOM Elements 
      - RSC Payload for Each CC in tree: 
        - "Hole" where CC will render 
        - Serialized props from SC 
        - URL to script with code 
    - Steps don't wait for one another. Completed render work is streamed to client 
    - UI = f(data, state) -- is actually UI = f(data)(state)

## RSC vs SSR: How Are They Related? (RSC - Part 3)
- Review: Server-Side Rendering (SSR) 
  - We'll be talking about dynamic SSR (HTML generated at runtime)
  - Server - (Component Tree -- Render --> HTML) -- JS --> Client - Hydrate --> Interactive React App
  - SSR: "Just take this component tree, render it as HTML, and send that HTML to the browser" 
  - "Also send the React code to make the HTML interactive" - Client step 
- The Relationship Between RSC and SSR 
  - RSC vs. SSR 
    - RSC is NOT the same as SSR: they are seperate technologies
    - RSC does NOT replace SSR 
    - They usually work together: frameworks can combine them 
    - Both client and server components are initially rendered on the server when SSR is used** (Most important thing to remember)
    - In the RSC model, "server" just means "the developer's computer" 
    - Result: RSC does NOT require running a web server! Components could run only once at build time (static site generation)
  - Server - Doesn't need to be an actual web server. Simply "another computer" 
  - Client - Doesn't need to be a browser 
  - SSR: "Just take this component tree, render it as HTML, and send that HTML to the browser" -- Also works like this when coupled with RSC. All components are pre-rendered on the server 
  - RSC Payload 
    - Sent to the client along with component tree and HTML 
    - So that React has the entire component tree on the client, not just HTML. Necessary to preserve UI state on future SC re-renders 
  - Only client component get hydrated 
  - SSR happens only on initial render. On re-renders, client components only render on the actual client 