import { apiCall } from "./logic.js";

export async function getAnnualTax(income) {
    return new Promise((resolve) => {
        const url = "http://localhost:3000/api/tax?income=" + income;
        apiCall(url)
        .then(text => resolve(text.tax))
        .catch(error => {
            throw new Error("getTax API call error: " + error);
        });
    });
}

export async function getHEM(user) {
    return new Promise((resolve) => {
        const url = "http://localhost:3000/api/hem?income=" + user.income + "&dependents=" + user.dependents;
        apiCall(url)
        .then(text => resolve(text.hem))
        .catch(error => {
            throw new Error("getHEM API call error: " + error);
        });
    });
}