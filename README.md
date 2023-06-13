# The Overlook Hotel Booking

## Table of Contents
* [Description](#Description)
* [Learning Goals](#Learning-Goals)
* [Features](#Features)
* [Installation](#Installation)
* [Contributors](#Contributors)
* [Technologies Used](#Technologies-Used)

## Description
This app will allow a user to log in to their own personalized dashboard on The Overloook Hotel's booking site to browse their confirmed bookings and make new bookings if desired. 

## Learning Goals
- Use object and array prototype methods to perform data manipulation.
- Create a user interface that is easy to use and clearly displays hotel and booking information.
- Write DRY, reusable code that follows SRP and trends toward function purity.
- Implement a robust testing suite using TDD.
- Make network requests to retrieve and post data.
- Use branches, PRs and thorough code reviews to add new code to the main branch.
- Use a project board throughout the evolution of the application.
- Archive 100% accessibility audit score using the Lighthouse dev tool.

## Features
- Upon page load, the user will see a login page, prompting them to validate their credentials in a login form to see their account and to browse avaiable rooms. 

- Upon login, the user will see a welcome message, a list of their current confirmed bookings, and their total amount spent on bookings. The user can see a side bar indicating they can make another booking through this part of the dashboard. 

- They can select a date using a date selector. When choosing a date, they will see all available rooms at The Overlook Hotel on the date chosen. The user may filter these available rooms by room type if desired. In the event there are not rooms avaiable for their chosen date or filter, they will see a message informing them of it and will be prompted to choose another option. 

- The user can look through the listings and click a button to book their chosen room. They will see a confirmation message, and their dashboard will update to include the new listing and updated total spent. 

## Installation
1. `fork` this repository and/or `clone` it to local
1. Once you have cloned the repo, change (cd) into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
1. Run `npm test` to see tests
1. Run `npm run lint` if you would like to see the linter
1. Setup local server by cloning the following repo into another directory: https://github.com/turingschool-examples/overlook-api
    - Follow the instructions in the repo's readme to get it setup
1. Inside the server directory, run `npm start`
1. Inside the project directory run `npm start` and visit `localhost:8080`

## Contributors
- [Paulina Rubio](https://github.com/paulina-isabel)

## Technologies Used
- JavaScript
- CSS
- HTML
- Mocha
- Chai
- Webpack
- Fetch API
- Npm packages