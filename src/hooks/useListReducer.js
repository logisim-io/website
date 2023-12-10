import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'PUSH':
            return [...state, ...action.values];
        case 'REMOVE_INDEX':
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
        case 'REMOVE_VALUE': {
            const index = state.findIndex((value) => value === action.value);
            if (index < 0) return state;

            return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        case 'TOGGLE_VALUE': {
            const index = state.findIndex((value) => value === action.value);

            if (index >= 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)];
            } else {
                return [...state, action.value];
            }
        }
        default:
            return state;
    }
};

export default function useListReducer(initialState = []) {
    const [data, dispatch] = useReducer(reducer, initialState);

    return { data, dispatch };
}