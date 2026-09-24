import { getNewUser } from './io/reader.js';
import { calculateBorrowingPower } from './calculator/borrowingCalculator.js';
import { intro, summary } from "./io/writer.js";

async function start() {
    intro();
    let user = await getNewUser();
    let loanResult = await calculateBorrowingPower(user);
    summary(loanResult);
}

start();