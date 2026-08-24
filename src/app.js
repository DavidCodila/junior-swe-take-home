import * as readline from 'node:readline/promises';
import { calculateBorrowingPower } from './borrowingCalculator.js';
import { Logger } from "./logger.js";

async function start() {
    Logger.intro();
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const income = await rl.question("Gross Annual Income: $");
    const dependents = await rl.question("Number of Dependents: ");
    const expenses = await rl.question("Declared Monthly Expenses: $");
    const creditLimits = await rl.question("Total Credit Card Limits: $");

    //to do add valadator class for rl.question results
    const loanResult = calculateBorrowingPower(
        income,
        dependents,
        expenses,
        creditLimits
    );

    Logger.summary(loanResult);

    rl.close();

}

start();