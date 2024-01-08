# Section 23: [Optional] Tailwind CSS Crash Course: Styling the App

## Section Overview
- A complete Tailwind CSS crash course 
- Super popular technology 
- You can skip if you're not interested in Tailwind 

## What is Tailwind CSS?
- What is tailwind CSS?
  - Tailwind CSS 
    - "A utility first CSS framework packed with utility classes like flex, text-center and rotate-90 that can be composed to build any design, directly in your markup (HTML or JSX)"
    - Utility-first CSS approach: writing tiny classes with one single purpose, and then combining them to build entire layouts 
    - In tailwain, these classes are already written for us. So we're not gonna write any new CSS, but instead use some of tailwind's hundreds of classes 
- The good and bas about tailwind 
  - The good 
    - You don't need to think about class names 
    - No jumping betwen files to write markup and styles 
      - These two are enough to give tailwind a try 
    - Immediately understand styling in any project that uses tailwind 
    - Tailwind is a design system: many decisions have been taken for you, which makes UIs look better and more consistent 
    - Saves a lot of time e.g. on responsive design 
    - Docs and VS Code integration are great 
  - The bad 
    - Markup (HTML or JSX) looks very unreadable, with lots of class names (you get used to it)
    - You have to learn a lot of class names (but after a day of usage you know fundamentals)
    - You need to install and set up tailwind on each new project 
    - You're giving up on "vanilla CSS"
  - Many people love to hate on tailwind for no reason. Please don't be that person! Try before judging

## Setting Up Tailwind CSS
- We have to set up tailwind on each new project we work on 
- We will be going through the documentation, we will be using version 3 
- We installed the tailwind extenstion which tells us what the classes are doing and autocompletion 
- We also downlaoded the prettier-tailwind plugin which orders the clsses the way tailwind recommends 

## Working With Color
- Tailwind comes with these predefined colors, but we can also add our own using the config file 
- For this project our main color will be yellow-500 
- To change the color of text we use `text-${color}-${shade}` 
  - For background color `bg-${color}`

## Styling Text
- We can use the classes in the HTML as well 
- Font-size doesn't just effect the font size but the line height as well 
- If we want to give our styles an arbitrary value we would put the proprty and the size in brackets 
  - `tracking-[5px]`

## The Box Model: Spacing, Borders, and Display
- For margin-bottom is mb 
- M always stands for margin 
- x is left and right 
- y is top and bottom 
- t - top 
- b - bottom 
- r - right 
- l - left 
- p - padding
- Tailwind includes a class that allows us to add spacing, on the parent we add `space-${direction}-${value}`
- For the display is the name of the value, so like, hidden, inline, etc. 

## Responsive Design
- Tailwind comes with 5 breakpoints that are mobile first, so they are min-width media queries 
- We can prefix any of our classes with one of the responsive queries 
  - Example: `sm:my16`
- If you are using tailwind in a real world projects, you should customize your own media queries, but for this course we will go with out of the box tailwind 

## Using Flexbox
- Pretty simple, you define flex 
- For align-items you use `items-${value}`
- For jusitfy-content you use `justify-${value}`

## Using CSS Grid
- We want to set up 3 rows for the content on the page in our AppLayout
- To set up rows and columns 
  - Rows: `grid-rows-${amountOfRows}`
    - To define our own example: `grid-rows-[auto_1fr_auto]`
  - Columns: `grid-cols-${amountOfColumns}`
  - Gap: `gap-${value}`
- h-screen - gives us a viewport height of 100% 
- In situations where you want a fluid design, you should always use max-width 

## Styling Buttons: Element States and Transitions
- To use hover you use: `hover:text-blue-500`
- `rounded-full` gives us a pill shape button
- You don't want to just do `outline:none` on a button focus state because this causes accessbility issues, so tailwind created `focus:ring` which is shadows for the element 

## Styling Form Elements
- To style the checkbox, we define the height and width and the accent which gives us a background color on the checkbox

## Reusing Styles with @apply
- We can create a new layer in our CSS to create classes to reuse for our input 
- This way of creating new classes should be the exception and not the rule, best practice would be to create a reusable component 

## Reusing Styles with React Components ##(Stretch Goal)
- Created a reusable button component to reused the same CSS classes throughout 

## Absolute Positioning, z-index, and More
- To set the position to 0, we use inset, to set an opacity we add a / after the folow name 
  - Example: `bg-slate-200/20`

## Configuring Tailwind: Custom Font Family
- One of the biggest advantages of tailwind is it's flexibility 
- We put the font link into our html and then update the theme property in the tailwind config 
- In order to use the font in the JSX we just write `font-${namedInConfig}` in the class name 
- To extend or add in new colors, we can add it into the extends on the tailwind config file
- We now use `dvh` instead of `vh` because this causes issues on mobile
  - Sometimes the viewport height isn't actually 100% 

## Styling the Menu
- The divide class in tailwind, places some lines between all of the child elements, similar to the space element 
- Specifying a margin-top of auto pushes an element to the bottom in a flex container 

## Styling the Cart
- Went through styling of the cart page and components

## Styling the Order Form
- You can use a CSS trick from CSS tricks to make your favicon an emoji 

## Styling the Order Overview 
- The design principles section in Jonas' HTML and CSS course goes over the design principles mentioned throughout this section 