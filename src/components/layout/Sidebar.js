'use client';

import { useEffect, useState } from 'react';
import CPUIcon from '@/assets/icons/cpu.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import InfoIcon from '@/assets/icons/info.svg';
import LogInIcon from '@/assets/icons/log-in.svg';
import LogOutIcon from '@/assets/icons/log-out.svg';
import MousePointerIcon from '@/assets/icons/mouse-pointer.svg';
import MoveIcon from '@/assets/icons/move.svg';
import PenToolIcon from '@/assets/icons/pen-tool.svg';

const gates = [
    { name: 'AND', inputs: 2, outputs: 1 },
    { name: 'OR', inputs: 2, outputs: 1 },
    { name: 'XOR', inputs: 2, outputs: 1 },
    { name: 'NOT', inputs: 1, outputs: 1 },
    { name: 'NAND', inputs: 2, outputs: 1 },
    { name: 'NOR', inputs: 2, outputs: 1 },
    { name: 'XNOR', inputs: 2, outputs: 1 }
];

export default function Sidebar({ className = '', isLocked = false }) {
    const [currentTool, setCurrentTool] = useState('selection');

    return (
        <div className={`flex gap-3 ${className}`}>
            <Toolbar currentTool={currentTool} setCurrentTool={setCurrentTool} isLocked={isLocked} />
            {
                currentTool === 'gates'
                    ? <GatesPanel isLocked={isLocked} />
                    : currentTool === 'wire'
                        ? <WiresPanel />
                        : <NoOptionsPanel />
            }
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
                    setCurrentTool('gates');

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
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'selection' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('selection')} disabled={isLocked}>
                        <MousePointerIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Selection</span>
                            <span className="font-mono">(s)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'wire' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('wire')} disabled={isLocked}>
                        <PenToolIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Wire</span>
                            <span className="font-mono">(w)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'gates' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('gates')} disabled={isLocked}>
                        <CPUIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Gates</span>
                            <span className="font-mono">(g)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentTool === 'delete' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('delete')} disabled={isLocked}>
                        <DeleteIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Delete</span>
                            <span className="font-mono">(d)</span>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export function GatesPanel({ isLocked }) {
    // TODO make gates a component attribute

    const [currentGate, setCurrentGate] = useState(null);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (isLocked || !event.code.startsWith('Digit')) return;

            const newGateID = parseInt(event.code.replace('Digit', ''));
            if (newGateID < 1 || newGateID > gates.length) return;

            setCurrentGate(newGateID - 1);
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [gates, isLocked]);

    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[240px]">
            <p className="text-center font-bold text-neutral-300">Gates</p>
            <div className="flex flex-col grow gap-2">
                <ul className="grow flex flex-col gap-2">
                    {
                        gates.map((gate, index) => (
                            <li key={index}>
                                <button type="button" className={`w-full flex items-start p-3 rounded select-none ${isLocked ? 'text-neutral-500 cursor-not-allowed' : currentGate === index ? 'bg-neutral-800 cursor-pointer' : 'hover:bg-neutral-800 cursor-pointer'}`} onClick={() => setCurrentGate(index)} disabled={isLocked}>
                                    <div>
                                        <p className="flex items-center gap-1 font-mono">
                                            {
                                                index < 9
                                                    ? <span className={`${isLocked ? 'text-neutral-500' : 'text-neutral-300'} text-xs`}>({index + 1})</span>
                                                    : null
                                            }
                                            <span>{gate.name} Gate</span>
                                        </p>
                                        <div className={`flex items-center gap-1 ${isLocked ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                            <span>{gate.inputs}</span>
                                            <LogInIcon width="12" height="12" />
                                            <LogOutIcon width="12" height="12" className="ml-3" />
                                            <span>{gate.outputs}</span>
                                        </div>
                                    </div>
                                    <button type="button" className={`ml-auto p-2 rounded ${isLocked ? 'text-neutral-500' : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'}`}>
                                        <InfoIcon width="16" height="16" />
                                    </button>
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
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[240px]">
            <p className="text-center font-bold text-neutral-300">Wires</p>
            <p className="text-center mt-12">TODO</p>
        </div>
    );
}

export function NoOptionsPanel() {
    return (
        <div className="flex items-center justify-center rounded bg-neutral-900 w-[240px]">
            <p className="text-center text-neutral-500 text-sm">No options for this tool</p>
        </div>
    );
}