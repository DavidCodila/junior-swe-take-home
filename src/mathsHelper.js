import { INTEREST_RATE } from './constants.js';

const MONTHS_PER_YEAR = 12;

export class MathsHelper {
    creditCardLiabilityFactor; // 0.03; // ~3%
    assessmentRateBuffer; //3.0; 3.0% buffer added to interest rates
    loanTermInMonths; //360;
    
    constructor(creditCardLiabilityFactor, assessmentRateBuffer, loanTermInMonths) {
        this.creditCardLiabilityFactor = creditCardLiabilityFactor;
        this.assessmentRateBuffer = assessmentRateBuffer;
        this.loanTermInMonths = loanTermInMonths;
    }
    calculateMaxLoanAmount(maxMonthlyRepayment) {
        const assessmentRate = INTEREST_RATE + this.assessmentRateBuffer;
        const monthlyRate = (assessmentRate / 100) / MONTHS_PER_YEAR;
    
        // Loan amount = repayment * (1 - (1 + rate)^-number_of_months) / rate
        return maxMonthlyRepayment * ((1 - Math.pow(1 + monthlyRate, -this.loanTermInMonths)) / monthlyRate);
    }
    
    #calculateCreditCardLiability(creditLimits) {
        return creditLimits * this.creditCardLiabilityFactor;
    }
    
    #calculateNetMonthlyIncome(income, annualTax) {
        return (income - annualTax) / MONTHS_PER_YEAR;
    }
    
    #calculateTotalLivingExpenses(expenses, hem) {
        return Math.max(expenses, hem);
    }
    
    calculateMaxMonthlyRepayment(user, annualTax, hem) {
        // Repayment = income - expenses - liability 
        return this.#calculateNetMonthlyIncome(user.income, annualTax)   
            - this.#calculateTotalLivingExpenses(user.expenses, hem)
            - this.#calculateCreditCardLiability(user.creditLimits);
    }
}