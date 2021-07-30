import { createAction, handleActions } from 'redux-actions';

const CODE = 'login/CODE';

export const code = createAction(CODE);

const initialState = {
    code : ''
}

export default handleActions( {
    [CODE]: (state, action) => {
        return { code : state.code + 'hello'};
    },
}, initialState);