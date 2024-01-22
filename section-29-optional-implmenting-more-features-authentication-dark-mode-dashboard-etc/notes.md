# Section 29: [Optional] Implementing More Features: Authentication, Dark Mode, Dashboard, etc

## Section Overview
- Building real-world app features 
- Filter, sort, pagination 
- Dark mode 
- Dashboardwith charts 
- Authentication and authorization 
- This section will not introduce anything new about React, but instead will show how to build real-world features that are commonly seen on web apps 

## Client-Side Filtering: Filtering Cabins
- We will be adding in filtering for discounts and other criteria in the table 
- We will be storing the value by which the table should be filterable in the URL so it can be easily save and bookmarked 
  - We can then put our filter component anywhere we want since we're storing state in the URL 

## Client-Side Filtering: Sorting Cabins
- Adding in functionality to sort the cabins 

## Building the Bookings Table
- We not only need to load the booking information from our API, but we also need to bring in the information of the cabin and guest with the booking 
  - Supabase API makes it easy to do this, we do this in the .select() 
  - We can limit the dowbloaded data to what we need

## Uploading Sample Data
- We have data in our data folder with an uploader component, we can import all of our sample data and delete all existing 
  - This will go in our sidebar

## API-Side Filtering: Filtering Bookings
- We will filter our data in a fundamentally different way than we did with the cabins 
- The operations happened on the cabin side, this time we will be on the server side
  - We need to filter in our query in the API 
- Example: 
  - `.eq("status", "unconfirmed");`
- We can't use the useSearchParams in our apiBookings file, so we will filter in the useBookings.js
- You can add a variable to the queryKey so React Query will re-fetch or re-load your data when that variable changes 

## API-Side Sorting: Sorting Bookings
- Added in functionality using server side rendering to sort our bookings

## Building a Reusable Pagination Component
- The pagination will be similar to the filter and sortBy functions 
- It will be read from the URL and handled on the server-side 

## API-Side Pagination: Paginating Bookings
- Supabase allows us to pass in a second argument with the count property
  - This can be helpful if you don't want to query the entire data 
  - This will also return a variable on the object called count 

## Prefetching With React Query 
- PRefetching is all about fetching some data we know might become necessary before we actually need that data to render it on the user interface
  - So in the case of pagination we load the data for the next page and the same thing for going back 
- We prefetch using the same params as useQuery() 
- React Query also has infinite scroll, we will not be implementing it, but we can look it up in the documentation 

## Building the Single Booking Page
- We will be adding in a context menu so we can go to a single bookings page 
- We can read the bookingId from the params, we can do is in our useBooking function so it doesn't depend on anything outside 
- React Query tries to re-fetch data 3 times and then it fails, but you can set it to false 

## Checking In a Booking
- We want to check in the user on the booking details and a link in the context menu on the booking table itself 

## Adding Optional Breakfast
- Added functionality for users to add breakfast at check in 

## Checking Out a Booking (+ Fixing a Small Bug)
- Added in functionality to check out of a booking and fixed the page loading bug 

## Deleting a Booking
- Added in functionality for deleting a booking 

## Authentication: User Login with Supabase
- We will use subapase to sign up a user and update a user and update an avatar
- You can enable all sorts of providers like Apple, Github, etc
  - For this app we will only be using the email 
- Behind the scenes supabase uses JWT 
- Supabase adds the user to localStorage
- We do a mutation because it is easier to handle the success and error states 

## Authorization: Protecting Routes
- We will wrap our entire application into a protected route 
- We can also set some data in react queries cache using useQueryClient and then .setQueryData() 

## User Logout
- Reminder that replace: true, when using useNavigate gets rid of the history of the navigation, so the user can't go back in the history and access the page 

## Fixing an Important Bug
- We get a user in our cache if we try to access the route url, but this is in the route url 

## Building the Sign Up Form
- Only employees of this hotel can sign up for this app 
  - These users can only be created inside of the application 

## User Sign Up
- Set up the sign up form using react-forms

## Authorization on Supabase: Protecting Database (RLS)
- You can use a service called tempmail to test signups of fake users 
- We set the target role in supabase to authenticated 

## Building the App Header
- Built out the header for the application with the user avatar and logout and account page functionality 

## Updating User Data and Password
- Added functionality for updating user data like the name, avatar and password 

## Implementing Dark Mode With CSS Variables
- We used CSS variables to set a class that has light-mode or dark-mode and we turn this class on and off 
- We also need to store the information on if light or dark mode is on, so we will need global state for this 

## Building the Dashboard Layout
- Started building the layout of the dashboard page 

## Computing Recent Bookings and Stays
- In the dashboard it is important to distinguish our data between our bookings and our stays, we need this information for different parts in our dashboard 
  - A booking is an actual sale 
  - A stay is a guest actually staying in the hotel 

## Displaying Statistics
- Added in functionality to display the stays, sales, check ins and occupancy rate on the dashboard

## Displaying a Line Chart With the Recharts Library
- There are many chart libraries, the easiest one to use is recharts, but the documentation is not that great, so refer back to this video and the next 

## Displaying a Pie Chart
- Added in a pie chart to display the duration summary 

## Displaying Stays for Current Day
- Finished by Writing out the activities for the day for check ins and check outs on the dashboard

## Error Boundaries
- It's normal bugs can end up in production, so to avoid the white screen we get if something doesn't exist we need to set up error boundaries 
  - They are like try/catch 
  - These are hard to use because they implemented using class components
    - So everyone uses react-error-boundary
- Most of the time React only catches these during rendering 

## Final Touches + Fixing Bugs
- Fixed a DOM bug with toggling the context menu in the table 
- We can get access to the system darkmode setting 
  - `window.matchMedia('(prefers-color-scheme:dark)').matches` returns a Boolean
- What we could have implemented: 
  - Actually create new bookings from this application if a guest comes in 
  - You can add the feature with check in and checkout times 
  - Cabins don't have a fixed price, user can set a price for every single price 
  - You can add a resturaunt and add a bill value for them to pay when they check out 
  - Generate a page where it generates a PDF of their bill to email to the guest 