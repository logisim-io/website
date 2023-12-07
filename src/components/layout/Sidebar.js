'use client';

import { useState } from 'react';
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

export default function Sidebar({ className = '' }) {
    const [currentTool, setCurrentTool] = useState('selection');

    return (
        <div className={`flex gap-3 ${className}`}>
            <Toolbar currentTool={currentTool} setCurrentTool={setCurrentTool} />
            {
                currentTool === 'gates'
                    ? <GatesPanel />
                    : currentTool === 'wire'
                        ? <WiresPanel />
                        : <BlankPanel />
            }
        </div>
    );
}

export function Toolbar({ currentTool, setCurrentTool }) {
    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[128px]">
            <p className="text-center font-bold text-neutral-300">Tools</p>
            <ul className="grow flex flex-col gap-2">
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'selection' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('selection')}>
                        <MousePointerIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Selection</span>
                            <span className="font-mono">(s)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'wire' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('wire')}>
                        <PenToolIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Wire</span>
                            <span className="font-mono">(w)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'gates' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('gates')}>
                        <CPUIcon width="18" height="18" />
                        <div className="flex items-center gap-1 text-xs">
                            <span>Gates</span>
                            <span className="font-mono">(g)</span>
                        </div>
                    </button>
                </li>
                <li>
                    <button type="button" className={`w-full p-3 flex flex-col items-center justify-center gap-1 ${currentTool === 'delete' ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'} rounded`} onClick={() => setCurrentTool('delete')}>
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

export function GatesPanel() {
    const [currentGate, setCurrentGate] = useState(null);

    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-[240px]">
            <p className="text-center font-bold text-neutral-300">Gates</p>
            <div className="flex flex-col grow gap-2">
                <ul className="grow flex flex-col gap-2">
                    {
                        gates.map((gate, index) => (
                            <li key={index}>
                                <div className={`flex items-start p-3 rounded cursor-pointer select-none ${currentGate === index ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentGate(index)}>
                                    <div>
                                        <p className="font-mono">{gate.name} Gate</p>
                                        <div className="flex items-center gap-1 text-neutral-400">
                                            <span>{gate.inputs}</span>
                                            <LogInIcon width="12" height="12" />
                                            <LogOutIcon width="12" height="12" className="ml-3" />
                                            <span>{gate.outputs}</span>
                                        </div>
                                    </div>
                                    <button type="button" className="ml-auto p-2 rounded text-neutral-300 hover:bg-neutral-700 hover:text-white">
                                        <InfoIcon width="16" height="16" />
                                    </button>
                                </div>
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

export function BlankPanel() {
    return (
        <div className="flex items-center justify-center rounded bg-neutral-900 w-[240px]">
            <p className="text-center text-neutral-500 text-sm">Select a different tool...</p>
        </div>
    );
}