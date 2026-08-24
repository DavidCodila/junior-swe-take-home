import { getNewUser } from './consoleReader.js';
import { calculateBorrowingPower } from './borrowingCalculator.js';
import { Logger } from "./logger.js";

async function start() {
    Logger.intro();

    const user = await getNewUser();    
    const loanResult = calculateBorrowingPower(user);

    Logger.summary(loanResult);
}

start();