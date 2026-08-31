export async function apiCall(url) {
    const bearerPAT = "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789";
    const requestInfo = { 
        method: 'GET', withCredentials: true, credentials: 'include', headers: {'Authorization': bearerPAT} 
    }
    return new Promise((resolve) => {
        fetch(url, requestInfo)
        .then(response => extractStream(response.body.getReader()))
        .then(stream => new Response(stream))
        .then(response => resolve(response.json()))
    });
}

function extractStream(reader) {
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
}