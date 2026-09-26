import * as readline from 'node:readline/promises';
import { INTEREST_RATE } from './constants.js';
import { Writer } from './writer.js';
import { Reader } from './reader.js';
import { Validator } from './validator.js';
import { BorrowingPowerCalculator } from './borrowingPowerCalculator.js';

async function start() {
    const RL = readline.createInterface({ input: process.stdin, output: process.stdout });
    const writer = new Writer(INTEREST_RATE);
    const validator = new Validator();
    const reader = new Reader(RL, validator);
    const borrowingPowerCalculator = new BorrowingPowerCalculator();
    writer.intro();
    let user = await reader.getNewUser();
    let loanResult = await borrowingPowerCalculator.calculateBorrowingPower(user);
    writer.summary(loanResult);
}

start();