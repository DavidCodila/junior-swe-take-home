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

function calculateNetMonthlyIncome(income, annualTax) {
    return (income - annualTax) / MONTHS_PER_YEAR;
}

function calculateTotalLivingExpenses(expenses, hem) {
    return Math.max(expenses, hem);
}

export function calculateMaxMonthlyRepayment(user, annualTax, hem) {
    // Repayment = income - expenses - liability 
    return calculateNetMonthlyIncome(user.income, annualTax)
        - calculateTotalLivingExpenses(user.expenses, hem)
        - calculateCreditCardLiability(user.creditLimits);
}
