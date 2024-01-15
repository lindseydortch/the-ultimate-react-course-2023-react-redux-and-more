# Section 27: React Query: Managing Remote State

## Section Overview
- Remote state management 
- React Query will take over data fetching and storage 
- This feels magical 

## What is React Query?
- What is React Query?
  - React Query 
    - Powerful library for managing remote (server) state 
    - Many features that allow us to write a lot less code, while also making the UC a lot better
      - Data is stored in a cache 
        - API <- No additional requests-> React Query (Cache -- cabins) <--> Component A and Component B both get cabins without additional API requests 
      - Automatic loading and error states 
      - Automatic re-fetching to keep state synced 
      - Pre-fetching 
        - Pagination - getting data for current page and then the next page without displaying a loading spinner 
      - Easy remote state mutation (updating)
      - Offline support 
    - Needed because remote state is fundamentally different from regular (UI) state 
    - Other libraries are not as popular as React Query 

## Setting Up React Query
- The official name is now Tanstack Query because there is now support for Svelte and Vue and other frameworks 
- Has the same concept as the Context API and Redux, we set up a place for the data to live and then provide it 
- There are a lot of defaults we can override 
- We can also install the devTools as an npm package 
  - Devtools just has to be the first child of our provider and is self-closing

## Fetching Cabin Data
- useQuery() will be the hook we use all the time 
  - This takes in a queryKey and a queryFn
    - queryKey which uniquely identifies what we'requerying
      - Needs to be an array 
      - Identifies each data 
    - queryFn: this the function that is responsible for actually querying, so fetching the data 
- We can set the staleTime to 0 and the data will automatically always become stale as soon as something changes 

## Mutations: Deleting a Cabin
- We created a policy to be able to delete data 
- The way we do mutations with React Query is with mutations and not query 
  - Takes in the mutation function (the function react query will call)
  - We get the isLoading and mutate function 
    - The mutate function we can use as our way of 
- The UI doesn't update because we need to invalidate the cache when this action happens 
  - We put in the onSuccess and we call invalidate the queryClient and we specify the query key 
- We also get access to the onError handlers and we can decide what we want to do 

## Displaying Toasts (Notifications)
- We will bring in a 3rd party library called react-hot-toast
- We have to create a self-closing component in order for us to use the Toaster so it knows which options we want to use

## Introducing Another Library: React Hook Form
- The library we will be using is really about handling errors and submission
- We didn't make any of our inputs controlled elements, we will do everything within React Hook Form 
  - We register inputs into our form 
  - `{...register("value")}`
  - Gives us props associated with these functions 
- The first step is to register all the input fields and then call the handleSubmit form with our own function we want to be called when we submit the form 
  - We pass this function to the habndleSubmit we pass in to the useForm() 
- For the cancel button in our form, we specify a type of reset 

## Creating a New Cabin
- What happens behind the scens is React state, but we don't see this, it isn't anything magical 
- All we have to do is call mutate on our form submit
- The reason we don't handle the reset in the onSubmit is because we are handling for success, so it makes this handler nice and clean 

## Handling Form Errors
- Where React Hook forms shines is in it'sform validation 
- We can get props from the children component 

## Uploading Images to Supabase
- We have to pass the image into our mutate function 
  - We pass it in on our component level and then our api level handles the uploading to supabase 

## Editing a Cabin
- We can pass in some values to our React hook form, such as defaultValues 
  - When we're creating a cabin, we don't want to use this, it would just be empty 
- We are putting all of our functionality in the createCabin function since there is a lot of duplicate code

## Abstracting React Query Into Custom Hooks
- The hooks folder is for hooks that can be reused throughout multiple features and now just one component 
- We can use the onSuccess function to pass in our reset since we are still technically mutating via React Query 
- With the custom hook, we made it easy to 

## Duplicating Cabins
- Added in functionality for duplicating a cabin 

## Fetching Applications Settings
- .single() object instead of the entire array 

## Updating Application Settings
