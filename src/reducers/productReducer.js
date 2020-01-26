import {
    ADD_PRODUCT,
    REMOVE_PRODUCT
} from '../types'

const INITIAL_STATE = {
    products: [],
    error: false,
    loader: false
}

export const productsReducer = (INITIAL_STATE, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT:
            INITIAL_STATE.products.filter(_ => _.productId !== action.productId)
            return INITIAL_STATE
        case ADD_PRODUCT:
            INITIAL_STATE.push(action.entity)
            return INITIAL_STATE;
        default: return INITIAL_STATE
    }
}