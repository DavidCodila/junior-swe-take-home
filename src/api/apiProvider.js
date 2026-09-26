export class ApiProvider {
    requestInfo;

    constructor(requestInfo) {
        this.requestInfo = requestInfo;
    }

    async apiCall(url) {
        return new Promise((resolve) => {
            fetch(url, this.requestInfo)
            .then(response => {
                resolve(new Response(response.body).json())
            })
        });
    }
    
}