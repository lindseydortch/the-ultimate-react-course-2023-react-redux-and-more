# Section 38: Deployment With Vercel 

## Section Overview 
- Deploy "The Wild Oasis" website to Vercel 
- Set up environment variables and authentication credentials 

## Setting Up the Github Repository
- Create next app automatically creates a git repository for your files 

## Deploying to Vercel 
- Vercel can get expensive the more users you have 
  - You can look at documentation for how to deploy with alternatives 
- We can easily copy our environment variables 
- Then we can deploy and see the output 
- We can set a custom URL in the dashboard 
- We have one problem with login and it's because we didn't update our environment variables and Google console 

## Updating Environment Variables and OAuth Credentials 
- We need to update our nextAuth URL 
- We then need to redeploy our project 
- You can also add analytics to your site and view them there 
- Each time you push to your repo you get a new deployment 
- We get speed and logs insights 
  - A lot of these features are limited when you're on the free plan 