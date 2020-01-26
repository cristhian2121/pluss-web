import {
    ADD_PRODUCT,
    REMOVE_PRODUCT
} from '../types'

export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        entity: product
    }    
}

export const removeProduct = (productId) => {
    return {
        type: REMOVE_PRODUCT,
        productId: productId
    }
}