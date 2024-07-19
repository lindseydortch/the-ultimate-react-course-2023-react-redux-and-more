# Section 33: Starting to Build the "Wild Oasis" Website 

## Section Overview 
- Next.js project structure 
- Implementing Pages 
- Font and Image Optimization techniques 
- Adding metadata and favicon 
- Nested Layouts 

## Project Planning: "The Wild Oasis" Customer Website 
- The Project: The Wild Oasis Website 
  - The Wild Oasis --> 
    - Remember: "The Wild Oasis" is a small boutique hotel with 8 luxurious cbins 
    - We built their application to manage everything about the hotel: bookings, cabins and guests 
    - We build the API using Supabase 
    - Now they need a customer-facing website where guests can learn about the hotel, browse all cabins, reserve a cabin, and creae and update their profile 
    - Updating data in the internal app should update the website, so we use the same BM and API 
    - API <--> Internal Hotel Management App & Customer-Facing Website to book stays 
- Project Requirements from the business  
  - Users of the app are potential guests and actual guests 
  - About 
    - Guests should be able to learn all about the Wild Oasis Hotel 
  - Cabins
    - Guests should be able to get information about each cabin and see booked dates 
    - Guests should be able to filter cabins by their maximum guest capacity 
  - Reservations 
    - Guests should be able to reserve a cabin for a certain date range 
    - Reservations are not paid online. Payments will be made at the property upon arrival. Therefore, new reservations should be set to "unconfirmed" (booked but not yet checked in)
    - Guests should be able to view all their past and future reservations 
    - Guests should be able to update or delete a reservation
  - Authentication  
    - Guests need to sign up and log in before they can reserve a cabin and perform any operation 
    - On sign up, each quest should get a profile in the DB 
  - Profile 
    - Guests should be able to set and update basic data about their profile to make check-in at the hotel faster 
- Features + Pages 
  - Feature Categories
    - About
    - Cabins 
    - Reservations 
    - Authentication 
    - Profile 
  - Necessary Pages 
    - Homepage -- /
    - About Page -- /about (About)
    - Cabin overview -- /cabins/ (Cabins)
    - Cabin Detail -- /cabins/:cabinId (Cabins)
    - Login -- /login (Authentication)
    - Reservation List -- /account/reservations (Reservations)
    - Edit Reservations -- /account/reservations/edit (Reservations)
    - Update Profile -- /account/profile (Profile)
- Technology Desicions 
  - Framework 
    - Next.js 
    - The most popular React meta-framework. Handles routing, SSR, data fetching and even remote state management (in a way...), therefore replacing many tools we had to include before 
  - UI State Management 
    - Context API 
    - We might still need global UI state in a Next.js app. For that, we can use the Context API, Redux or any of the other solutions. In this case the Context API will be enough
  - DB/API 
    - supabase 
    - We'll use the data and API we already built in the first "Wild Oasis" project. If you skipped that project, please go back to the "Supabase" section to set everything up 
  - Styling 
    - tailwindcss 
    - Modern way of writing CSS. Extremely easy to integrate into Next.js. Most styles and markup will be pre-written anyway in this project 

## Project Organization 
- Colocate components 
  - You can move into the page folder, but this only gives us access in that page 
  - Only makes sense if you are building a really really small app 
- Best option is to have a components folder, but this then creates a new route 
  - To fix this, you start a folder name with a _ - this takes it out of the router 
  - You could also have a src folder, but this is really something to use in bigger apps 
- Folders for 
  - styles (private)
  - lib - files we need in the application that don't belong to any components 
- Next.js supports aliases '@/app/..'

## Styling With Tailwind CSS 
- In a fresh tailwind install you get the first 3 lines we see in our global.css
- To customize theme, instead of the ones they come with and you extends the theme with the colors in the config and paste in there 
- CSS modules are supported out of the box with Next.js
  - Styled components are starting to become out of style, so that's why we're using tailwind here 

## Adding Page Metadata and Favicon 
- We should not add manually text to the head, we should use the metadata tag 
- Next.js has a caching bug with the title on reload 
- We can export metadata from every single page 
- To keep the title of the page in the name 
  - And we can put a template with '%s' will replace 
- favicon 
  - All you have to do is place a favicon.ico in the app root 

## Loading and Optimizing Fonts
- Next.js includes very nice performance optimizations for fonts out of the box 
- It allows us to self host any google font we want without that font being downloaded from google 
- Using fonts from google fonts is not great for privacy 
- You need to import the font and then set the subsets (latin, greek, etc.) and then the display which is for the font weight 
  - Display - swap 
    - Display text in default and once it has been downloaded, swap that in 
    - Variable fonts are best for performance 

## Improving the Navigation and Root Layout 
- Finished our layout and navigation 

## Optmizing Images With Next.js <Image /> Component 
- The most important thing that needs to be optimized is images 
  - The biggest factors that contribute to page size and impact laod speeds 
- We can use the Image component 
  - `import Image from "next/image"`
  - The image component does 3 important things 
    - It will automatically serve correctly sized images in modern formats (.webp) and will only do this on demand 
    - Prevents layout shifts, it forces us to define a set height and width 
    - Lazy loads images only when they enter the viewport 
  - We get a srcset which gives us multiple sizes for different uses 
  - The image component can be used in many different ways 
- Another way is to import the image and then put it in the src attribute 
  - This allows next to analyze the image to see what it needs to do with it 

## Building the Home Page 
- Instead of specifying a height and a width on our images, we can specify the fill 
  - Similar to background-size 
- placeholder - can blur the image as it is loading 

## Building the About Page With Responsive Images 
- We want our images to be repsonsive and resize as the page shrinks 
- To get around using the image component without setting the height and width:
  - Static can import the image 
  - Sometimes we don't have access to import the image source, like when we're calling an API
  - Or, we can add the fill property with the parent having a position of relative and then set the aspect-ratio to square 1/1 (square is for tailwind)
- placeholder="blur" can only be used with static images 
- Google measures layout shift, this is a huge metric for SEO 

## Adding Nested Routes and Pages
- Sub-routes are called segments
- To create a nested route, you just create a sub folder

## Adding a Nested Layout 
- We want a layout that stays on the page for all of the account routes 
- So we add a layout.js at our routes top level 
  - The one for the whole app is the RootLayout and for nested routes, we typically call our component Layout()
- A common technique is to create an array of objects with your link information and then output them 