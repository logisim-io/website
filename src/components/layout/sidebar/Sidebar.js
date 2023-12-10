'use client';

import { useEffect, useState } from 'react';
import BookOpenIcon from '@/assets/icons/book-open.svg';
import CPUIcon from '@/assets/icons/cpu.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import MousePointerIcon from '@/assets/icons/mouse-pointer.svg';
import PenToolIcon from '@/assets/icons/pen-tool.svg';
import { ComponentsPanel } from '@/components/layout/sidebar/panels/Components';
import { NoOptionsPanel } from '@/components/layout/sidebar/panels/NoOptions';
import { SchematicsPanel } from '@/components/layout/sidebar/panels/Schematics';
import { WiresPanel } from '@/components/layout/sidebar/panels/Wires';

export default function Sidebar({ className = '', isLocked = false }) {
    const [currentTool, setCurrentTool] = useState('selection');

    useEffect(() => {
        const onKeyDown = (event) => {
            if (isLocked) return;

            switch (event.code) {
                case 'KeyS': {
                    setCurrentTool('selection');

                    break;
                }
                case 'KeyW': {
                    setCurrentTool('wire');

                    break;
                }
                case 'KeyG': {
                    setCurrentTool('components');

                    break;
                }
                case 'KeyC': {
                    setCurrentTool('schematics');

                    break;
                }
                case 'KeyD': {
                    setCurrentTool('delete');

                    break;
                }
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isLocked]);

    return (
        <div className={`flex gap-3 ${className} ${isLocked ? 'saturate-0 pointer-events-none' : ''}`}>
            <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[128px]">
                <p className="text-center font-bold text-neutral-300">Tools</p>
                <ul className="grow flex flex-col gap-2">
                    <li>
                        <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'selection' ? 'text-green-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('selection')} disabled={isLocked}>
                            <MousePointerIcon width="18" height="18" />
                            <span className="text-xs">Selection</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'wire' ? 'text-orange-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('wire')} disabled={isLocked}>
                            <PenToolIcon width="18" height="18" />
                            <span className="text-xs">Wire</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'components' ? 'text-blue-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('components')} disabled={isLocked}>
                            <CPUIcon width="18" height="18" />
                            <span className="text-xs">Components</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'schematics' ? 'text-purple-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('schematics')} disabled={isLocked}>
                            <BookOpenIcon width="18" height="18" />
                            <span className="text-xs">Schematics</span>
                        </button>
                    </li>
                    <li>
                        <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'delete' ? 'text-red-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('delete')} disabled={isLocked}>
                            <DeleteIcon width="18" height="18" />
                            <span className="text-xs">Delete</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="h-full w-[280px]">
                {
                    currentTool === 'components'
                        ? <ComponentsPanel />
                        : currentTool === 'wire'
                            ? <WiresPanel />
                            : currentTool === 'schematics'
                                ? <SchematicsPanel />
                                : <NoOptionsPanel />
                }
            </div>
        </div>
    );
}