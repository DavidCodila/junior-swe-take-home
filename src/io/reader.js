import * as readline from 'node:readline/promises';

//to do add valadator class for rl.question results
export async function getNewUser() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const income = await rl.question("Gross Annual Income: $");
    const dependents = await rl.question("Number of Dependents: ");
    const expenses = await rl.question("Declared Monthly Expenses: $");
    const creditLimits = await rl.question("Total Credit Card Limits: $");

    rl.close();

    return {income, dependents, expenses, creditLimits}
}