'use client';

import { useEffect, useState } from 'react';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';

export default function MenuBar({ files: { dispatch: filesDispatch } }) {
    const [currentDropdown, setCurrentDropdown] = useState(null);

    useEffect(() => {
        if (!currentDropdown) return;

        const onClick = (event) => {
            if (!currentDropdown) return;

            const targetContainer = document.querySelector(`[data-dropdown="${currentDropdown}"]`);

            if (!targetContainer.contains(event.target)) {
                setCurrentDropdown(null);
            }
        };

        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, [currentDropdown]);

    const newFile = () => {
        setCurrentDropdown(null);
        filesDispatch({ type: 'CREATE_FILE' });
    };

    return (
        <ul className="flex bg-neutral-900 text-sm">
            <li>
                <div>
                    <span className="block px-5 py-2">
                        <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">logisim</span>
                        <span className="text-neutral-400">.io</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="file">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'file' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'file' ? null : 'file')} onMouseOver={() => currentDropdown && setCurrentDropdown('file')}>
                        <span>File</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'file' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left" onClick={() => newFile()}>New File</button>
                        </li>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Save...</button>
                        </li>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Save as...</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="edit">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'edit' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'edit' ? null : 'edit')} onMouseOver={() => currentDropdown && setCurrentDropdown('edit')}>
                        <span>Edit</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'edit' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Copy</button>
                        </li>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Cut</button>
                        </li>
                        <li>
                            <button type="button" className="px-3 py-2 cursor-not-allowed text-neutral-500 w-full text-left">Paste</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="selection">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'selection' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'selection' ? null : 'selection')} onMouseOver={() => currentDropdown && setCurrentDropdown('selection')}>
                        <span>Selection</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'selection' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Select All</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="view">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'view' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'view' ? null : 'view')} onMouseOver={() => currentDropdown && setCurrentDropdown('view')}>
                        <span>View</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'view' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">&times; Components</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="simulate">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'simulate' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'simulate' ? null : 'simulate')} onMouseOver={() => currentDropdown && setCurrentDropdown('simulate')}>
                        <span>Simulate</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'simulate' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Start</button>
                        </li>
                        <li>
                            <button type="button" className="px-3 py-2 text-neutral-500 cursor-not-allowed w-full text-left">Stop</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="relative" data-dropdown="help">
                    <button type="button" className={`flex items-center gap-1 px-3 py-2  ${currentDropdown === 'help' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentDropdown(currentDropdown === 'help' ? null : 'help')} onMouseOver={() => currentDropdown && setCurrentDropdown('help')}>
                        <span>Help</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                    <ul className={`list-none absolute z-10 flex flex-col min-w-full w-[240px] top-full left-0 bg-neutral-800 ${currentDropdown === 'help' ? 'block' : 'hidden'}`}>
                        <li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Release Notes</button>
                        </li><li>
                            <button type="button" className="px-3 py-2 hover:bg-neutral-700 w-full text-left">Community Discord</button>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="ml-auto">
                <div className="relative">
                    <button type="button" className="px-3 py-2  hover:bg-neutral-800">
                        <span>Log in</span>
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="px-3 py-2  hover:bg-neutral-800">
                        <span>Sign up</span>
                    </button>
                </div>
            </li>
        </ul>
    );
}