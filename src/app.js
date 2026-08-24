import { getNewUser } from './consoleReader.js';
import { calculateBorrowingPower } from './borrowingCalculator.js';
import { intro, summary } from "./logger.js";

async function start() {
    intro();

    const user = await getNewUser();    
    const loanResult = calculateBorrowingPower(user);

    summary(loanResult);
}

start();