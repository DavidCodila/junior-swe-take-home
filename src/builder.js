import * as readline from 'node:readline/promises';
import { INTEREST_RATE } from './constants.js';
import { Writer } from './io/writer.js';
import { Reader } from './io/reader.js';
import { Validator } from './io/validator.js';
import { BorrowingPowerCalculator } from './calculator/borrowingPowerCalculator.js';
import { ApiCaller } from './api/apiCaller.js';
import { MathsHelper } from './calculator/mathsHelper.js';
import { ApiProvider } from './api/apiProvider.js';

export function buildWriter() {
    return new Writer(INTEREST_RATE);
}

export function buildReader() {
    const RL = readline.createInterface({ input: process.stdin, output: process.stdout });
    const validator = new Validator();
    return new Reader(RL, validator);
}

export function buildBorrowingPowerCalculator() {
    return new BorrowingPowerCalculator(buildMathsHelper(), buildAPICaller());
}

function buildApiProvider() {
    const bearerPAT = "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789";
    const requestInfo = { 
        method: 'GET', withCredentials: true, credentials: 'include', headers: {'Authorization': bearerPAT} 
    }
    return new ApiProvider(requestInfo);
}

function buildAPICaller() {
    const baseUrl = "http://localhost:3000/api/";
    return new ApiCaller(baseUrl, buildApiProvider());
}

function buildMathsHelper() {
    const loanTermInMonths = 360; // 30 Years
    const assessmentRateBuffer = 3.0; // 3.0% buffer added to interest rates
    const creditCardLiabilityFactor = 0.03; // ~3%
    return new MathsHelper(creditCardLiabilityFactor, assessmentRateBuffer, loanTermInMonths);
}