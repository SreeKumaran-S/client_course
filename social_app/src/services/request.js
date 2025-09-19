export let getUsersInDb = function (callback, data) {
    let url = "http://localhost:4000/users_data";
    makeRequest('GET', url, callback, data);
};

export let addUserInDb = function (callback, data) {
    let url = "http://localhost:4000/users_data";
    makeRequest('POST', url, callback, data);
};

export let updateUserInDb = function (callback, id, data) {
    let url = `http://localhost:4000/users_data/${id}`;
    makeRequest('PUT', url, callback, data);
};

export let deleteUserInDb = function (callback, id) {
    let url = `http://localhost:4000/users_data/${id}`;
    makeRequest('DELETE', url, callback);
};

export let makeRequest = function (method, url, callback, data) {
    sendHTTPRequest(method, url, data)
        .then(response => {
            callback.success(response);
        })
        .catch(error => {
            callback.error(error);
        });
}


let sendHTTPRequest = (method, url, data = null) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        if ((method == 'GET' || method == 'DELETE') && data) {
            let queryParams = new URLSearchParams(data).toString();
            url += '?' + queryParams;
        }

        xhr.open(method, url, true);
        xhr.responseType = "json";

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            }
            else {
                reject(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject("Network error");
        }

        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}