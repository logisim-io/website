'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FileList from '@/components/layout/FileList';
import MenuBar from '@/components/layout/MenuBar';

export default function MainApplication() {
    const path = usePathname();

    const [render, setRender] = useState(false);

    useEffect(() => setRender(true), []);

    return (
        render
            ? <BrowserRouter>
                <div className="flex flex-col w-[100vw] h-[100vh]">
                    <MenuBar />
                    <FileList />
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