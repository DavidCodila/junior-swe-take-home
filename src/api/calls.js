import { apiCall } from "./logic.js";

export async function getAnnualTax(income) {
    return new Promise((resolve, reject) => {
        const url = "http://localhost:3000/api/tax?income=" + income;
        apiCall(url)
        .then(text => {
            if (text.error != undefined) {
                reject(new Error("getAnnualTax API error"));
            } 
            resolve(text.tax)
        });
    })
}

export async function getHEM(user) {
    return new Promise((resolve, reject) => {
        const url = "http://localhost:3000/api/hem?income=" + user.income + "&dependents=" + user.dependents;
        apiCall(url)
        .then(text => {
            if (text.error != undefined) {
                reject(new Error("getHEM API error"));
            } 
            resolve(text.hem)
        });
    })
}