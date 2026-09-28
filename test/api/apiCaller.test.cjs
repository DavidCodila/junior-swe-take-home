const ApiCaller = require("../../src/api/apiCaller.js");
const ApiProvider = require("../../src/api/apiProvider.js")

jest.mock("../../src/api/apiProvider.js");
//const mockApiCall = jest.fn();




describe('API getAnnualTax call tests', () => {
    let apiCaller;
    let mockApiProvider;

    beforeEach(() => {
        jest.clearAllMocks();
        const baseUrl = "baseUrl";

        mockApiProvider = new ApiProvider();
        apiCaller = new ApiCaller(baseUrl, mockApiProvider);
    });
    test('Happy path', async () => {
        const expected = {tax: 1};
        mockApiProvider.apiCall = jest.fn().mockResolvedValue(expected);
        const result = await apiCaller.getAnnualTax();
        expect(result).toBe(expected.tax);
    })
});

describe('API getHEM call tests', () => {

});
