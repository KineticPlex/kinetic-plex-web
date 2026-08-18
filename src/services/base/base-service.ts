class BaseService {
    protected static getHeaders = () => {

        const headers = {
            'Content-Type': 'application/json'
        };

        return headers;
    }
}

export default BaseService;