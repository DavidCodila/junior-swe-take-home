export async function apiCall(url) {
    const bearerPAT = "Bearer pat_abcdefghijklmnopqrstuvwxyz0123456789";
    const requestInfo = { 
        method: 'GET', withCredentials: true, credentials: 'include', headers: {'Authorization': bearerPAT} 
    }
    return new Promise((resolve) => {
        fetch(url, requestInfo)
        .then(response => {
            resolve(new Response(response.body).json())
        })
    });
}