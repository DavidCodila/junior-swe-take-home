# Borrowing Power Calculator

This repository is my attempt to complete the Ferocia Junior Engineering Code Exercise, namely: Borrowing Power Calculator. The real "Borrowing Power Calculator" can be found here: (https://www.bendigobank.com.au/personal/loans/calculators/borrowing-power/). 

# Technology Stack

Node.js, JavaScript, npm, Mocha.js and nyc.

# Requirements

- The getTax(income), getHEM(income, dependents) functions were to be replaced by API calls. The code for the APIs is found in the server.js file and information on the server.js file is found within the server.md file.
- Refactor the calculator code to make it manageable.
- Test suite to pass with full coverage.

# Prerequisite

- Node.js

# Setup
- git clone https://github.com/DavidCodila/junior-swe-take-home.git
- cd junior-swe-take-home
- npm install
- (---in a new terminal---) npm run api 
- npm start

# Testing

Unit tests: 
- npm test

Unit tests with coverage: 
- npm run coverage

# Exclusions

- It was determined that the scope of the assessment was pertaining to the refinement and enhancement of the codebase, save the server.js file. Therefore, the server.js file has only been touched to maintain file importing standards, and no tests were written for it.
- As app.js was a function with no parameters, no variables and only 5 lines long, it was determined to be excluded from testing. 
- Due to the complexity involved with testing console and readline methods and functions, the reader.js and writer.js files were also not tested. 

## Justification

It was determined, as I have very limited knowledge of JavaScript and Node.js, that if I were to embark on the above mentioned exclusions, then I would have well exceeded the 8 hour limit of the assignment. I would be very happy to provide another code base using OOP with Dependency Injection, mocking all the required objects if desired.

## PS

I hope you enjoy reading the code as much as I enjoyed writing it!