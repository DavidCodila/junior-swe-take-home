export const isValidFloat = (value) => !isNaN(value) && isANumberGreaterThanOrEqualToZero(value);
export const isValidInt = (value) => Number.isInteger(Number(value)) && isANumberGreaterThanOrEqualToZero(value);

function isNotEmpty(value) {
    return !(value.toString().includes(' ') || value == "");
}

function isANumberGreaterThanOrEqualToZero(value) {
    return isNotEmpty(value) && (Number(value) >= 0); 
}