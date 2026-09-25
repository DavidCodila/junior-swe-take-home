export class Validator {
    validationType;

    setValidationType(type) {
        this.validationType = type;
    }

    validate(value) {
        switch (this.validationType) {
            case "isValidFloat":
                return !isNaN(value) && this.#isANumberGreaterThanOrEqualToZero(value);
            case "isValidInt":
                return Number.isInteger(Number(value)) && this.#isANumberGreaterThanOrEqualToZero(value);
            default:
                throw new Error("Can not validate type: " + value);
        } 
    }

    #isNotEmpty(value) {
        return !(value.toString().includes(' ') || value == "");
    }

    #isANumberGreaterThanOrEqualToZero(value) {
        return this.#isNotEmpty(value) && (Number(value) >= 0); 
    }
}