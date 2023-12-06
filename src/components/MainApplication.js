'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FileList from '@/components/layout/FileList';
import MenuBar from '@/components/layout/MenuBar';

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
}

export default function MainApplication() {
    const path = usePathname();
    const [render, setRender] = useState(false);
    const [filesState, filesDispatch] = useReducer(filesReducer, { activeIndex: 0, list: [{ name: 'Untitled', dirty: true }] });

    useEffect(() => setRender(true), []);

    return (
        render
            ? <BrowserRouter>
                <div className="flex flex-col w-[100vw] h-[100vh]">
                    <MenuBar files={[filesState, filesDispatch]} />
                    <FileList
                        {...filesState}
                        onChange={(index) => filesDispatch({ type: 'SET_ACTIVE', index })}
                        onClose={(index) => filesDispatch({ type: 'CLOSE_FILE', index })}
                        onRename={({ index, value }) => filesDispatch({ type: 'RENAME_FILE', index, value })}
                    />
                    <div className="grow bg-neutral-900">
                        <Routes>
                            <Route path="/" element={<p className="p-5">TODO</p>} />
                            <Route path="*" element={<p className="p-5">Unknown page: {path}</p>} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
            : <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                <span className="font-light text-6xl">Loading...</span>
            </div>
    );
}