const ApiCaller = require("../../src/api/apiCaller.js");
const ApiProvider = require("../../src/api/apiProvider.js");

jest.mock("../../src/api/apiProvider.js");

describe('API getAnnualTax call tests', () => {
    const baseUrl = "baseUrl";
    let apiCaller;
    let mockApiProvider;

    beforeEach(() => {
        jest.clearAllMocks();

        mockApiProvider = new ApiProvider();
        apiCaller = new ApiCaller(baseUrl, mockApiProvider);
    });

    test('Passing correct url', () => {
        const expected = {tax: 1};
        const income = 1;
        mockApiProvider.apiCall = jest.fn().mockResolvedValue(expected);
        apiCaller.getAnnualTax(income);
        expect(mockApiProvider.apiCall).toHaveBeenCalledWith(baseUrl + "tax?income=" + income);
    })

    test('Happy path', async () => {
        const expected = {tax: 1};
        const income = 1;
        mockApiProvider.apiCall = jest.fn().mockResolvedValue(expected);
        const result = await apiCaller.getAnnualTax(income);
        expect(result).toBe(expected.tax);
    });

    test('Unhappy path', async () => {
        const expected = new Error("getAnnualTax API error");
        const income = "error";
        const errorReply = {error: "error"};
        mockApiProvider.apiCall = jest.fn().mockResolvedValue(errorReply);
        expect(async () => { 
            await apiCaller.getAnnualTax(income)
        }).rejects.toThrow(expected);
    });        
});