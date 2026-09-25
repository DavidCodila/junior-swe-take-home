import { getNewUser } from './io/reader.js';
import { calculateBorrowingPower } from './calculator/borrowingCalculator.js';
import { INTEREST_RATE } from './constants.js';
import { Writer } from './writer.js';

async function start() {
    const writer = new Writer(INTEREST_RATE)
    writer.intro();
    let user = await getNewUser();
    let loanResult = await calculateBorrowingPower(user);
    writer.summary(loanResult);
}

start();