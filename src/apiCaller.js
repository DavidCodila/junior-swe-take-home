import { apiCall } from "./api/logic.js";

export class ApiCaller {
    baseUrl; // should be "http://localhost:3000/api/"
    requestInfo;

    constructor(baseUrl, requestInfo) {
        this.baseUrl = baseUrl;
        this.requestInfo = requestInfo;
    }

    
    async getAnnualTax(income) {
        return new Promise((resolve, reject) => {
            const url = this.baseUrl + "tax?income=" + income;
            apiCall(url)
            .then(text => {
                if (text.error != undefined) {
                    reject(new Error("getAnnualTax API error"));
                } 
                resolve(text.tax)
            });
        })
    }
    
    async getHEM(user) {
        return new Promise((resolve, reject) => {
            const url = this.baseUrl + "hem?income=" + user.income + "&dependents=" + user.dependents;
            apiCall(url)
            .then(text => {
                if (text.error != undefined) {
                    reject(new Error("getHEM API error"));
                } 
                resolve(text.hem)
            });
        })
    }
}