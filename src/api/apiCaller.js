class ApiCaller {
    baseUrl;
    apiProvider;

    constructor(baseUrl, apiProvider) {
        this.baseUrl = baseUrl;
        this.apiProvider = apiProvider;
    }

    
    async getAnnualTax(income) {
        return new Promise((resolve, reject) => {
            const url = this.baseUrl + "tax?income=" + income;
            this.apiProvider.apiCall(url)
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
            const url = 
                this.baseUrl + "hem?income=" + user.income + "&dependents=" + user.dependents;
            this.apiProvider.apiCall(url)
            .then(text => {
                if (text.error != undefined) {
                    reject(new Error("getHEM API error"));
                } 
                resolve(text.hem)
            });
        })
    }
}

module.exports = ApiCaller;