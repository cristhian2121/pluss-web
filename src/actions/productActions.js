import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    GET_ALL
} from '../types'

export const addProduct = (product) => (dispatch) => {
    console.log('product ** : ', product);
    dispatch({
        type: ADD_PRODUCT,
        entity: product
    })
}


// export const getAll = () => async (dispatch) => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');    
//     dispatch({
//         type: 'get',
//         payload: response ? response.data : []
//     })
// }

export const getProducts = () => (dispatch) => {
    console.log('entro');
    dispatch({
        type: GET_ALL
    })
}

export const removeProduct = (productId) => (dispatch, productId) => {
    dispatch({
        type: REMOVE_PRODUCT,
        productId: productId
    })
}