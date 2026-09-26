export class Reader {
    constructor(readlineInterface, validator) {
        this.readLine = readlineInterface;
        this.validator = validator;
    }

    async getNewUser() {
        const income = await this.#obtainValueFromUser("Gross Annual Income: $", "isValidFloat");
        const dependents = await this.#obtainValueFromUser("Number of Dependents: ", "isValidInt");
        const expenses = await this.#obtainValueFromUser("Declared Monthly Expenses: $", "isValidFloat");
        const creditLimits = await this.#obtainValueFromUser("Total Credit Card Limits: $", "isValidFloat");
    
        this.readLine.close();
    
        return {income, dependents, expenses, creditLimits}
    }

    async #obtainValueFromUser(prompt, type) {
        this.validator.setValidationType(type);
        do {
            var value = await this.readLine.question(prompt);
        }
        while (!this.validator.validate(value));
        return value;
    }
}