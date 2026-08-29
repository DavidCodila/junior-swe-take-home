import { getNewUser } from './consoleReader.js';
import { calculateBorrowingPower } from './calculator/borrowingCalculator.js';
import { intro, summary } from "./logger.js";

async function start() {
    intro();

    getNewUser()
    .then(user => calculateBorrowingPower(user))  
    .then(loanResult => summary(loanResult))
    .catch(error => console.log("Something went wrong: " + error));
}

start();