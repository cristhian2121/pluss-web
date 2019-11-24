export const getAllQuotation = () => (dispatch) => {
    console.log('Actions');
    dispatch({
        type: 'get_quotation',
        payload: [1,2,3,]
    })
}

export const createQuotation = (entity) => (dispatch, entity) => {
    dispatch({
        type: 'create_quotation',
        payload: entity
    })
}
