'use client';

import { useEffect, useState } from 'react';
import BookOpenIcon from '@/assets/icons/book-open.svg';
import CPUIcon from '@/assets/icons/cpu.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import LogInIcon from '@/assets/icons/log-in.svg';
import LogOutIcon from '@/assets/icons/log-out.svg';
import MousePointerIcon from '@/assets/icons/mouse-pointer.svg';
import MoveIcon from '@/assets/icons/move.svg';
import PenToolIcon from '@/assets/icons/pen-tool.svg';

const components = [
    { name: 'AND Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'OR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'XOR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'NOT Gate', category: 'Gates', inputs: 1, outputs: 1 },
    { name: 'NAND Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'NOR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'XNOR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'Bulb', category: 'Visuals', inputs: 1 },
    { name: 'Switch', category: 'Inputs', inputs: 1 },
    { name: 'Button', category: 'Inputs', inputs: 1 },
    { name: 'Constant', category: 'Inputs', inputs: 1 },
    { name: 'Input', category: 'schematics', inputs: 1 },
    { name: 'Output', category: 'Schematics', inputs: 1 }
];

export default function Sidebar({ className = '', isLocked = false }) {
    const [currentTool, setCurrentTool] = useState('selection');

    return (
        <div className={`flex gap-3 ${className}`}>
            <Toolbar currentTool={currentTool} setCurrentTool={setCurrentTool} isLocked={isLocked} />
            <div className="h-full w-[280px]">
                {
                    currentTool === 'components'
                        ? <ComponentsPanel isLocked={isLocked} />
                        : currentTool === 'wire'
                            ? <WiresPanel isLocked={isLocked} />
                            : currentTool === 'schematics'
                                ? <SchematicsPanel isLocked={isLocked} />
                                : <NoOptionsPanel />
                }
            </div>
        </div>
    );
}

export function Toolbar({ currentTool, setCurrentTool, isLocked = false }) {
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
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[128px]">
            <p className="text-center font-bold text-neutral-300">Tools</p>
            <ul className="grow flex flex-col gap-2">
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'selection' ? 'text-green-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('selection')} disabled={isLocked}>
                        <MousePointerIcon width="18" height="18" />
                        <span className="text-xs">Selection</span>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'wire' ? 'text-orange-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('wire')} disabled={isLocked}>
                        <PenToolIcon width="18" height="18" />
                        <span className="text-xs">Wire</span>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'components' ? 'text-blue-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('components')} disabled={isLocked}>
                        <CPUIcon width="18" height="18" />
                        <span className="text-xs">Components</span>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'schematics' ? 'text-purple-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('schematics')} disabled={isLocked}>
                        <BookOpenIcon width="18" height="18" />
                        <span className="text-xs">Schematics</span>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'delete' ? 'text-red-400 bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('delete')} disabled={isLocked}>
                        <DeleteIcon width="18" height="18" />
                        <span className="text-xs">Delete</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export function ComponentsPanel({ isLocked }) {
    // TODO make the components list an attribute to this function
    // TODO color-code components by category, and add filter buttons at the top of the components panel

    const [currentComponent, setCurrentComponent] = useState(null);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (isLocked || !event.code.startsWith('Digit')) return;

            const newComponentIndex = parseInt(event.code.replace('Digit', ''));
            if (newComponentIndex < 1 || newComponentIndex > components.length) return;

            setCurrentComponent(newComponentIndex - 1);
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [components, isLocked]);

    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-full h-full">
            <p className="text-center font-bold text-neutral-300">Components</p>
            <div className="flex flex-col grow gap-2">
                <ul className="grow flex flex-col gap-2">
                    {
                        components.map((gate, index) => (
                            <li key={index}>
                                <button type="button" className={`w-full flex items-start p-3 rounded select-none ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentComponent === index ? 'bg-neutral-800 cursor-pointer' : 'hover:bg-neutral-800 cursor-pointer'}`} onClick={() => setCurrentComponent(index)} disabled={isLocked}>
                                    <div>
                                        <p className="flex items-center gap-1 font-mono">{gate.name}</p>
                                        <div className={`flex items-center gap-1 ${isLocked ? 'text-neutral-500' : 'text-neutral-400'} text-sm`}>
                                            {
                                                gate.inputs
                                                    ? <>
                                                        <span>{gate.inputs}</span>
                                                        <LogInIcon width="12" height="12" />
                                                    </>
                                                    : null
                                            }
                                            {
                                                gate.outputs
                                                    ? <>
                                                        <LogOutIcon width="12" height="12" className={gate.inputs ? 'ml-3' : ''} />
                                                        <span>{gate.outputs}</span>
                                                    </>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <button type="button" className="flex items-center justify-center gap-2 hover:bg-neutral-800 px-3 py-2 rounded text-sm">
                    <MoveIcon width="16" height="16" />
                    <span>Rearrange</span>
                </button>
            </div>
        </div>
    );
}

export function WiresPanel() {
    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-full h-full">
            <p className="text-center font-bold text-neutral-300">Wires</p>
            <p className="text-center mt-12">TODO</p>
        </div>
    );
}

export function SchematicsPanel() {
    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-full h-full">
            <p className="text-center font-bold text-neutral-300">Schematics</p>
            <p className="text-center mt-12">TODO</p>
        </div>
    );
}

export function NoOptionsPanel() {
    return (
        <div className="flex items-center justify-center rounded bg-neutral-900 w-full h-full">
            <p className="text-center text-neutral-500 text-sm">No options for this tool</p>
        </div>
    );
}