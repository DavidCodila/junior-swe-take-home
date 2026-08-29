import * as readline from 'node:readline/promises';
import { isValidFloat, isValidInt } from './validator.js';

const RL = readline.createInterface({ input: process.stdin, output: process.stdout });

export async function getNewUser() {
    const income = await obtainValueFromUser("Gross Annual Income: $", isValidFloat);
    const dependents = await obtainValueFromUser("Number of Dependents: ", isValidInt);
    const expenses = await obtainValueFromUser("Declared Monthly Expenses: $", isValidFloat);
    const creditLimits = await obtainValueFromUser("Total Credit Card Limits: $", isValidFloat);

    RL.close();

    return {income, dependents, expenses, creditLimits}
}

async function obtainValueFromUser(prompt, validate) {
    do {
        var value = await RL.question(prompt);
    }
    while (!validate(value));
    return value;
}