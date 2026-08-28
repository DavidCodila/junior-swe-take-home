export function getTax(income) {
    return new Promise((resolve) => {
        fetch("http://localhost:3000/api/tax?income=" + income, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789"
            }
        }).then(responseJson => {
            const reader = responseJson.body.getReader();
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            push();
                        });
                    }
                    push();
                }
            });
        })
        .then(stream => new Response(stream))
        .then(response => response.json())
        .then(text => resolve(text.tax))
        .catch(error => {
            throw new Error("Something bad happened: " + error);
        });
    });
}
