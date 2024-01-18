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
- 

## Adding Optional Breakfast
- 

## Checking Out a Booking (+ Fixing a Small Bug)
- 

## Deleting a Booking
- 

## Authentication: User Login with Supabase

## Authorization: Protecting Routes

## User Logout

## Fixing an Important Bug

## Building the Sign Up Form

## User Sign Up

## Authorization on Supabase: Protecting Database (RLS)

## Building the App Header

## Updating User Data and Password

## Implementing Dark Mode With CSS Variables

## Building the Dashboard Layout

## Computing Recent Bookings and Stays

## Displaying Statistics

## Displaying a Line Chart With the Recharts Library

## Displaying a Pie Chart

## Displaying Stays for Current Day

## Error Boundaries

## Final Touches + Fixing Bugs
