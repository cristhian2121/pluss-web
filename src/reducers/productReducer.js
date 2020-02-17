import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    GET_ALL
} from '../types'

const INITIAL_STATE = {
    products: [],
    error: false,
    loader: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT:
            state.products.filter(_ => _.productId !== action.productId)
            return { ...state }
        case ADD_PRODUCT:
            state.products = [...state.products, action.entity]
            return { ...state };
        case GET_ALL:
            console.log('state: ', state);
            return { ...state }
        default:
            console.log('defaul: ', state);
            return { ...state }
    }
}