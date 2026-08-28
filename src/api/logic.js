const BEARER_PAT = "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789";
const REQUEST_INFO = { 
    method: 'GET', withCredentials: true, credentials: 'include', headers: {'Authorization': BEARER_PAT} 
}

export async function apiCall(url) {
    return new Promise((resolve) => {
        fetch(url, REQUEST_INFO)
        .then(response => extractStream(response.body.getReader()))
        .then(stream => new Response(stream))
        .then(response => resolve(response.json()))
        .catch(error => "API call error: " + error);
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