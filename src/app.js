import * as readline from 'node:readline/promises';
import { INTEREST_RATE } from './constants.js';
import { Writer } from './io/writer.js';
import { Reader } from './io/reader.js';
import { Validator } from './io/validator.js';
import { BorrowingPowerCalculator } from './calculator/borrowingPowerCalculator.js';
import { ApiCaller } from './api/apiCaller.js';
import { MathsHelper } from './calculator/mathsHelper.js';
import { ApiProvider } from './api/apiProvider.js';

async function start() {
    const RL = readline.createInterface({ input: process.stdin, output: process.stdout });
    const writer = new Writer(INTEREST_RATE);
    const validator = new Validator();
    const reader = new Reader(RL, validator);
    const loanTermInMonths = 360; // 30 Years
    const assessmentRateBuffer = 3.0; // 3.0% buffer added to interest rates
    const creditCardLiabilityFactor = 0.03; // ~3%
    const mathsHelper = 
        new MathsHelper(creditCardLiabilityFactor, assessmentRateBuffer, loanTermInMonths);
    const baseUrl = "http://localhost:3000/api/";
    const bearerPAT = "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789";
    const requestInfo = { 
        method: 'GET', withCredentials: true, credentials: 'include', headers: {'Authorization': bearerPAT} 
    }
    const apiProvider = new ApiProvider(requestInfo);
    const apiCaller = new ApiCaller(baseUrl, apiProvider);
    const borrowingPowerCalculator = new BorrowingPowerCalculator(mathsHelper, apiCaller);
    
    writer.intro();
    let user = await reader.getNewUser();
    let loanResult = await borrowingPowerCalculator.calculateBorrowingPower(user);
    writer.summary(loanResult);
}

start();