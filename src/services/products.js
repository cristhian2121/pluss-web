
import config from '../config'

export class ProductsService {

    constructor() { }

    response = {
        status: 200,
        data: [],
        state: true,
        messagge: ''
    }

    getProducts = async () => {
        try {
            const res = await fetch(`${config.api_url}/product/`)
            this.response.data = await res.json();
        }
        catch (error) {
            console.log('error', error)
            this.response.state = false
            this.response.messagge = error.messagge
        }
        return new Promise(resolve => resolve(this.response));
    }

}
