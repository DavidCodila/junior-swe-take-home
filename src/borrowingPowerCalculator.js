export class BorrowingPowerCalculator {
    loanResult;
    mathsHelper;
    apiProvider;

    constructor(mathsHelper, apiProvider) {
        this.loanResult = { maxLoanAmount: 0, monthlyRepayment: 0 };
        this.mathsHelper = mathsHelper;
        this.apiProvider = apiProvider;
    }

    async calculateBorrowingPower(user) {
        return new Promise(async (resolve) => {
            const hem = await this.apiProvider.getHEM(user);
            const annualTax = await this.apiProvider.getAnnualTax(user.income);
            const maxMonthlyRepayment = 
                await this.mathsHelper.calculateMaxMonthlyRepayment(user, annualTax, hem);
            if (maxMonthlyRepayment > 0) {
                this.loanResult.maxLoanAmount = 
                    this.mathsHelper.calculateMaxLoanAmount(maxMonthlyRepayment);
                this.loanResult.monthlyRepayment = 
                    maxMonthlyRepayment;
            }
    
            resolve(this.loanResult);
        })
    }
}