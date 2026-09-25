import * as readline from 'node:readline/promises';
import { calculateBorrowingPower } from './calculator/borrowingCalculator.js';
import { INTEREST_RATE } from './constants.js';
import { Writer } from './writer.js';
import { Reader } from './reader.js';

async function start() {
    const RL = readline.createInterface({ input: process.stdin, output: process.stdout });
    const writer = new Writer(INTEREST_RATE)
    writer.intro();
    const reader = new Reader(RL);
    let user = await reader.getNewUser();
    let loanResult = await calculateBorrowingPower(user);
    writer.summary(loanResult);
}

start();