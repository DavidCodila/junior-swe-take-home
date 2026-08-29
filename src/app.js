import { getNewUser } from './io/reader.js';
import { calculateBorrowingPower } from './calculator/borrowingCalculator.js';
import { intro, summary } from "./io/writer.js";

async function start() {
    intro();

    getNewUser()
    .then(user => calculateBorrowingPower(user))  
    .then(loanResult => summary(loanResult))
    .catch(error => console.log("Something went wrong: " + error));
}

start();