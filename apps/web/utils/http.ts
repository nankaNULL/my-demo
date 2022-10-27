class Http {
    get(url: string) {
        const option = {
            method: 'GET'
        };
        return this.request(url, option);
    }
    post(url: string, body?: any) {
        const option: any = {
            method: 'POST'
        };
        if (body) option.body = JSON.stringify(body);
        return this.request(url, option);
    }
    request(url: string, option: any) {
        return fetch(url, option).then((response) => {
            const { status } = response;
            switch (status) {
                case 200:
                    return response;
                case 400:
                case 404:
                case 504:
                    return Promise.reject(response);
            }
            return response;
        }).then((response) => {
            return response.json();
        }).then((response) => {
            return response;
        }).catch((error) => {
            throw error;
        })
    }
}
export default new Http(); 