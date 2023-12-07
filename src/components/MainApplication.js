'use client';

import { useEffect, useReducer, useState } from 'react';
import FileList from '@/components/layout/FileList';
import MenuBar from '@/components/layout/MenuBar';
import Sidebar from '@/components/layout/Sidebar';
import Canvas from '@/components/simulation/Canvas';

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

export default function MainApplication() {
    const [render, setRender] = useState(false);
    const [filesState, filesDispatch] = useReducer(filesReducer, { activeIndex: 0, list: [{ name: 'Untitled', dirty: true }] });

    useEffect(() => setRender(true), []);

    return (
        render
            ? <div className="flex flex-col w-[100vw] h-[100vh]">
                <MenuBar files={{ data: filesState, dispatch: filesDispatch }} />
                <div className="grow flex gap-3 p-3">
                    <Sidebar />
                    <div className="grow flex flex-col">
                        <FileList data={filesState} dispatch={filesDispatch} />
                        <div className="grow bg-neutral-900 rounded overflow-hidden">
                            <Canvas className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
            : <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                <span className="font-light text-6xl">Loading...</span>
            </div>
    );
}