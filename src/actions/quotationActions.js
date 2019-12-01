
export const getAllQuotation = () => (dispatch) => {
    console.log('Actions');
    dispatch({
        type: 'get_quotation',
        payload: 'store.quotation'

    })
}

export const createQuotation = (quotation) => (dispatch) => {
    dispatch({
        type: 'create_quotation',
        payload: quotation
    })
}
