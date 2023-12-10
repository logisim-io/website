'use client';

import { useEffect } from 'react';
import CloseIcon from '@/assets/icons/x.svg';

export default function Modal({ show = true, className = '', onClose, children }) {
    useEffect(() => {
        if (show) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
    }, [show]);

    return (
        <div className={`absolute z-40 top-0 left-0 w-[100vw] h-[100vh] ${show ? 'block' : 'hidden'}`}>
            <div className="absolute top-0 left-0 w-full h-full z-40 bg-black/50 backdrop-blur" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-neutral-900 border-2 border-neutral-800 p-5 rounded-lg w-[640px] max-w-[90vw] ${className}`}>
                {children}
            </div>
            <button type="button" className="absolute top-4 right-4 z-50 p-2" onClick={() => onClose()}>
                <CloseIcon width="24" height="24" />
            </button>
        </div>
    );
}