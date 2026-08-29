export const isValidFloat = (value) => !isNaN(value) && isANumberGreaterThanOrEqualToZero(value);
export const isValidInt = (value) => Number.isInteger(Number(value)) && isANumberGreaterThanOrEqualToZero(value);

function isNotEmpty(value) {
    return !(value.includes(' ') || value == "");
}

function isANumberGreaterThanOrEqualToZero(value) {
    return (Number(value) >= 0) && isNotEmpty(value)
}