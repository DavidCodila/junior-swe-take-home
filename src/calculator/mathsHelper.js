import { getAnnualTax, getHEM } from '../api/calls.js';
import { INTEREST_RATE } from '../constants.js';

export const MONTHS_PER_YEAR = 12;

export function calculateMaxLoanAmount(maxMonthlyRepayment) {
    const loanTermInMonths = 360; // 30 Years
    const assessmentRateBuffer = 3.0; // 3.0% buffer added to interest rates
    const assessmentRate = INTEREST_RATE + assessmentRateBuffer;
    const monthlyRate = (assessmentRate / 100) / MONTHS_PER_YEAR;

    // Loan amount = repayment * (1 - (1 + rate)^-number_of_months) / rate
    return maxMonthlyRepayment * ((1 - Math.pow(1 + monthlyRate, -loanTermInMonths)) / monthlyRate);
}

function calculateCreditCardLiability(creditLimits) {
    const creditCardLiabilityFactor = 0.03; // ~3%
    return creditLimits * creditCardLiabilityFactor;
}

async function calculateNetMonthlyIncome(income) {
    const annualTax = await getAnnualTax(income);
    return (income - annualTax) / MONTHS_PER_YEAR;
}

async function calculateTotalLivingExpenses(user) {
    return Math.max(user.expenses, await getHEM(user));
}

export async function calculateMaxMonthlyRepayment(user) {
    // Repayment = income - expenses - liability 
    return await calculateNetMonthlyIncome(user.income)
        - await calculateTotalLivingExpenses(user)
        - calculateCreditCardLiability(user.creditLimits);
}
