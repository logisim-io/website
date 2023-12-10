import { useReducer } from 'react';

const authenticationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_LOGIN_MODAL':
            return { ...state, showLoginModal: true };
        case 'CLOSE_LOGIN_MODAL':
            return { ...state, showLoginModal: false };
        case 'SHOW_SIGNUP_MODAL':
            return { ...state, showSignupModal: true };
        case 'CLOSE_SIGNUP_MODAL':
            return { ...state, showSignupModal: false };
        case 'SET_USER':
            return { ...state, isLoggedIn: true, user: action.value };
        default:
            return state;
    }
};

export default function useAuthenticationReducer() {
    const [data, dispatch] = useReducer(authenticationReducer, { isLoggedIn: false, user: null, showLoginModal: false, showSignupModal: false });

    return { data, dispatch };
}