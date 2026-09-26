import { buildBorrowingPowerCalculator, buildReader, buildWriter } from "./builder.js";

async function start() {
    const writer = buildWriter();
    const reader = buildReader();
    const borrowingPowerCalculator = buildBorrowingPowerCalculator();

    writer.intro();
    let user = await reader.getNewUser();
    let loanResult = await borrowingPowerCalculator.calculateBorrowingPower(user);
    writer.summary(loanResult);
}

start();