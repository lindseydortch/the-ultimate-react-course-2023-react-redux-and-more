# Section 30: Deployment with Netlify and Vercel

## Section Overview
- Let's finish by deploying our project 
- Top hosting providers: Netlify and Vercel 
- Git and Github 
- Continuous Deployment 

## Deploying to Netlify
- We won't be code-splitting with this app because it will have very few users 
- Running a build creates a `dist` folder
- We have to create a file in our dist folder called `netlify.toml`
  - Copy this file and put it in your public folder so it gets copied every time you run a build 
- You can upload your dist folder manually to have it host your app
- Go to deploys and drag and drop into
  - You can also set up continuous deployment by putting your repo into Github and then setting up from there 

## Setting Up Git and GitHub Repository
- Walkthrough of how to set up git repo and GitHub 
- You can set up a personal access token instead of setting up SSH
  - You need to copy the token and then keep it somewhere safe 
- Only source code itself should be committed to the repository 

## Deploying to Vercel
- Vercel created NextJS, so they sepcialize in deploying NextJS apps 