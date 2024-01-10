# Section 25: Setting Up Our Biggest Project + Styled Components

## Section Overview
- Plan and build this stunning application 
- Styling with Styled Components in this section 
- We will even set up our own backend with Supabase 

## Application Planning
- The Project: The Wild Oasis 
  - The Wild Oasis 
    - "The Wild Oasis" is a small boutique hotel with 8 luxiorious wooden cabins 
    - They need a custom-built application to manage everything about the hotel: bookings, cabins and guests 
    - This is the internal application used inside the hotel to check in guests as they arrive 
    - They have nothing right now, so they also need the API 
    - Later they will probably want a customer-facing website as well, where customer will be able to book stays, using the same API 
  - API 
    - Internal hotel management app 
    - Customer-facng website to book stays (Later)
- Review: How to plan a React application 
  - Gather application requirements and features 
  - Divide the application into pages 
  - Divide the application into feature categories 
  - Decide on what libraries to use (technology decisions)
- Project requirements from the business 
  - Authentication 
    - Users of the app are hotel employees. They need to be logged into the application to perform tasks 
    - New users can only be signed up inside the applications (to gaurantee that only actual hotel employees can get accounts)
    - Users should be able to upload an avatar, and change their name and password 
  - Cabins
    - App needs a table view with all cabins, showing the cabin photo, name, capacity, price and current discount 
    - Users should be ableto update or delete a cabin, and to create new cabins (including a photo)
  - Bookings
    - App needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data 
    - The booking status can be "unconfirmed" (booked but not yet checked in), "checked in" or "checked out". The table should be filterable by this important status. 
    - Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price 
  - Check In / Out 
    - Users should be able to delete, check in, or check out a boooking as the gurst arrives (no editing necesarry for now)
    - Booking may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)
    - On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already 
  - Guests
    - Guest data should contain: full name, email, national ID, nationality, and a country flag for easy identification 
  - Dashboard 
    - The initial app screen should be a dashboard, to display important information for the last 7, 30, or 90 days:
      - A list of guests checking in and out on the current day. Users should be able to perform these tasks from here 
      - Statistics on recent bookings, sales, check ins, and occupancy rate 
      - A chart showing all daily hotel sales, showing both "total" sales and "extras" sales (only breakfast at the moment)
      - A chart showing statistics on stay durations, as this is an important metric for the hotel 
  - Settings 
    - Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking 
    - App needs a dark mode 
- Features + Pages 
  - Feature categories 
    - Bookings 
    - Cabins 
    - Guests 
    - Dashboard 
    - Check in and out 
    - App Settings 
    - Authentication 
  - Necessary Pages 
    - Dashboard - /dashboard 
    - Bookings - /bookings 
    - Cabins - /cabins 
    - Booking check in - /checkin/:bookingID
    - App Settings - /settings 
    - User Sign Up - /users 
    - Login - /login 
    - Account Settings - /settings 
  - Things are never this linear so everything won't always be completely planned out like this 
  - We will discuss state later. Most of it will be global
- Client-Side Rendering (CSR) or Server-Side Rendering (SSR)?
  - CSR with Plain React 
    - Used to build Single-Page Applications (SPAs)
    - All HTML is rendered on the client 
    - All JavaScript needs to be downloaded before apps start running: bad for performance 
    - One perfect use case: apps that are used "internally" as tools inside companies, that are entirely hidden behind a login 
      - This is exactly what we want to build in this project 
  - SSR with Frameowrk (Next.js or Remix)
    - Used to build Multi-Page Applications (MPAs)
    - Some HTML is rendered in the server 
    - More performant, as less JavaScript needs to be downloaded 
    - The React team is moving more and more in this direction 
- Technology Decisions 
  - Routing - React Router - The standard for React SPAs 
  - Styling - <styled components> - Very popular way of writing component-scoped CSS, right inside JavaScript. A technology worth learning 
  - Remote state management - React Query - The best way of managing remote state, with features like caching, automatic re-fetching, pre-fetching, offline support, etc. Alternatives are SWR and RTK Query, but this is the most popular 
  - UI State management - Conext API - There is almost no UI state needed in this app, so one simple context with useState will be enough. No need for Redux. 
  - Form management - React Hook Form - Handling bigger forms can be a lot of work, such as manual state creation and error handling. A library can simplify all this 
  - Other tools - React icons/ React hot toast / Recharts / date-fns / Supabase 

## Please Download Starter Files Again
- A note on re-downloading starter files if needed 

## Setting Up the Project: "The Wild Oasis"
- Each of our pages will have no side effects, but instead they will delegate all of their functionality to the components for that feature 

## Introduction to Styled Components
- Allows us to write CSS inside of our JS component files 
- Need to install styled-components library 
- The styled components extension gives us access to be able to autocomplete CSS 
- How do we style the component as a whole, we create a styled component to replace the div 

## Global Styles With Styled Components
- We use the createGlobalStyle function from styled components 
- The global Styles component we created needs to be added into our App and accept no children 
- It's better to stick to native CSS than using themes, but you can learn about them in styled components documentation 
  - It is a lot more work than writing CSS variables which is why native CSS is better 
- We do our :hover the same way as in SCSS using the & 

## Styled Component Props and the "css" Function
- Since our CSS is in a template literal, we can write a template literal 
- We can use the type attribute/prop to define the type of element 
- To make our markup semantically correct we use the as prop/attribute to tell the html we want it to be a heading as h1, h2 etc. 

## Building More Reusable Styled Components
- We can set defaultProps for our CSS and specify the type if it's not passed in 

## Setting Up Pages and Routes
- We will be using the declarative way of setting up our routes 

## Building the App Layout
- Set up the AppLayout with a header and sidebar and styled them 

## Building the Sidebar and Main Navigation
- We can use the styled() to style elements brought in from things like react-router-dom etc. 
- Reminder that react-router puts an .active class on the active link 
- React-icons 
  - Download `react-icons` package 