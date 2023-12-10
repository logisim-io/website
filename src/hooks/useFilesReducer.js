import { useReducer } from 'react';

const filesReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_FILE':
            return { activeIndex: state.list.length, list: [...state.list, { name: 'Untitled', dirty: true }] };
        case 'CLOSE_FILE':
            return { activeIndex: Math.max(Math.min(state.activeIndex, state.list.length - 2), 0), list: [...state.list.slice(0, action.index), ...state.list.slice(action.index + 1)] };
        case 'SET_ACTIVE':
            return { ...state, activeIndex: Math.max(Math.min(action.index, state.list.length - 1), 0) };
        case 'RENAME_FILE':
            return { ...state, list: [...state.list.slice(0, action.index), { ...state.list[action.index], name: action.value }, ...state.list.slice(action.index + 1)] };
        default:
            return state;
    }
};

export default function useFilesReducer() {
    const [data, dispatch] = useReducer(filesReducer, { activeIndex: 0, list: [{ name: 'Untitled', dirty: true }] });

    return { data, dispatch };
}