const INITIAL_STATE = {
    quotation: [1, 2],
}

export default (state = INITIAL_STATE, action) => {
    console.log('Ŕeducers', action.type);
    console.log('State', state);
    switch (action.type) {
        case 'get_quotation':
            console.log('hola');
            return { ...state, quotation: action.payload }
        default:
            console.log('chao', state);
            return state;
    };
};
