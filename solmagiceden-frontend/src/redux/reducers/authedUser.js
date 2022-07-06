import * as ActionTypes from '../ActionTypes';

export const AuthedUser = (state = {
    isLoading: false,
    errMess: null,
    authedUser: {}
}, action) => {
        switch(action.type) {
            case ActionTypes.LOGGED_IN:
                sessionStorage.setItem("auth", action.payload.wallet);
                return {...state, isLoading: false, errMess: null, authedUser: action.payload}
            case ActionTypes.UPDATE_USER:
                return {...state, isLoading: false, errMess: null, authedUser: action.payload}
            case ActionTypes.LOGGED_OUT:
                sessionStorage.removeItem("auth");
                return {...state, isLoading: false, errMess: null, authedUser: {}}
            default:
                return state;
        }
};