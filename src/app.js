import { getNewUser } from './consoleReader.js';
import { calculateBorrowingPower } from './borrowingCalculator.js';
import { intro, summary } from "./logger.js";

async function start() {
    intro();

    const user = await getNewUser();    
    //const user = {income : 120000, dependents : 2, expenses : 3000, creditLimits : 10000};
    calculateBorrowingPower(user)
    .then(loanResult => summary(loanResult));
}

start();