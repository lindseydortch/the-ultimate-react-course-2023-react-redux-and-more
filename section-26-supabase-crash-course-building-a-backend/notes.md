# Section 26: Supabase Crash Course: Building a Backend!

## Section Overview
- Plan application data 
- Model relationshups between data tables 
- Load data into the app via Supabase API 

## What is Supbase?
- What is supabase? 
  - Supabase 
    - Service that allows developers to easily create a back-end with a Postgres database 
    - Automatically creates a database and API so we can easily request and receive data from ther server 
    - No back-end development needed 
    - Perfect to get up and running quickly 
    - Not just an API: Supabase also comes with easy-to-use user authentication and file storage
  - Back-end 
    - Web server <--> DB <--> App Cycle 
      - With supabase, we don't need to do any of this manually! It's all included 

## Creating a New Database
- An alternative to Firebase and it's a lot easier to ease 
  - You can create two projects for free 
  - They will pause your project without a week of use 

## Modeling Application State
- Modeling State 
  - State "Domains"/"Slices"
    - Bookings 
    - Cabins 
    - Guests 
    - Settings
    - Users
  - Feature categories 
    - Bookings -- Bookings
    - Cabins -- Cabins
    - Guests -- Guests
    - Dashboard -- Bookings 
    - Check in and out -- Bookings 
    - App settings -- Settings
    - Authentication -- Users
  - All this state will be a global remote state, stored within Supabase 
  - There will be one table for each state "slice" in the database 
- The bookings table 
  - Bookings are about a guest renting a cabin 
  - So a booking needs information about what a guest is booking which cabin: we need to connect them 
  - Supabase uses a Postgres DB, which is SQL (relational DB). So we join tables using foreign keys 
    - We connect a booking with a cabin by storing the cabin's id (primary key) inside the booking cabinID (foreign key)

## Creating Tables
- We will upload our image into a bucket and then paste the URL as a string

## Relationships Between Tables
- We just connect our cabinID and guestID to the booking, we do this in supabase by clicking the link icon 
  - This is called a foreign key ID 
- If you want to create your own databases so you need to think about the type of relationships your data is going to have 

## Adding Security Policies (RLS)
- Supabase creates API documentation for our API
- curl makes an http request right in the terminal 
- Row level security - returns an empty array, prevents anyone with our key from doing whatever they want, we only want certain operations to be allowed 
- To handle the settings for our RLS in supabase we go to Authentication -> Policies

## Connecting Supabase With Our React App
- We are exposing our key to the client because we only allowed reading data from our API 

## Setting Up Storage Buckets
- You create buckets in storage and then upload your images there and you can get the links and place them 
- We will learn later how to programatically upload images to supabase