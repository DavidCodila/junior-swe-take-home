import { apiCall } from "./logic.js";

export async function getTax(income) {
    return new Promise((resolve) => {
        const url = "http://localhost:3000/api/tax?income=" + income;
        apiCall(url)
        .then(text => resolve(text.tax))
        .catch(error => {
            throw new Error("getTax API call error: " + error);
        });
    });
}

export async function getHEM(income, dependents) {
    return new Promise((resolve) => {
        const url = "http://localhost:3000/api/hem?income=" + income + "&dependents=" + dependents;
        apiCall(url)
        .then(text => resolve(text.hem))
        .catch(error => {
            throw new Error("getHEM API call error: " + error);
        });
    });
}