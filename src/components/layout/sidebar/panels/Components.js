import { useState } from 'react';
import LogInIcon from '@/assets/icons/log-in.svg';
import LogOutIcon from '@/assets/icons/log-out.svg';
import useListReducer from '@/hooks/useListReducer';

const components = [
    { name: 'AND Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'OR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'XOR Gate', category: 'Gates', inputs: 2, outputs: 1 },
    { name: 'NOT Gate', category: 'Gates', inputs: 1, outputs: 1 },
    { name: 'Light', category: 'Visuals', inputs: 1 },
    { name: 'Switch', category: 'Inputs', outputs: 1 },
    { name: 'Button', category: 'Inputs', outputs: 1 },
    { name: 'Constant', category: 'Inputs', outputs: 1 },
    { name: 'Input', category: 'Schematics', outputs: 1 },
    { name: 'Output', category: 'Schematics', inputs: 1 }
];

const categories = [
    {
        name: 'Gates',
        className: 'bg-green-400/20 border-green-400/50 hover:border-green-400',
        color: '#4ade80'
    },
    {
        name: 'Visuals',
        className: 'bg-blue-400/20 border-blue-400/50 hover:border-blue-400',
        color: '#60a5fa'
    },
    {
        name: 'Inputs',
        className: 'bg-orange-400/20 border-orange-400/50 hover:border-orange-400',
        color: '#fb923c'
    },
    {
        name: 'Schematics',
        className: 'bg-rose-400/20 border-rose-400/50 hover:border-rose-400',
        color: '#fb7185'
    }
];

export function ComponentsPanel() {
    const [currentComponent, setCurrentComponent] = useState(null);
    const filters = useListReducer(categories.map((category) => category.name));

    const shownComponents = components.filter((component) => filters.data.includes(component.category));

    return (
        <div className="flex flex-col gap-3 p-3 rounded bg-neutral-900 w-full h-full">
            <p className="text-center font-bold text-neutral-300">Components</p>
            <div className="grid grid-cols-2 gap-2">
                {
                    categories.map((category, index) => (
                        <button type="button" className={`basis-1/2 px-2 py-1 text-sm rounded border ${filters.data.includes(category.name) ? category.className : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600 text-neutral-300'}`} onClick={() => filters.dispatch({ type: 'TOGGLE_VALUE', value: category.name })} key={index}>
                            {category.name}
                        </button>
                    ))
                }
            </div>
            <ul className="grow flex flex-col gap-2">
                {
                    shownComponents.length > 0
                        ? shownComponents.map((component, index) => (
                            <li key={index}>
                                <button type="button" className={`w-full flex items-center justify-between p-3 rounded select-none cursor-pointer ${currentComponent === index ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`} onClick={() => setCurrentComponent(index)}>
                                    <p className="font-mono" style={{ color: categories.find((category) => category.name === component.category)?.color ?? '#ffffff' }}>{component.name}</p>
                                    <div className="flex items-center gap-3 text-neutral-400 text-sm">
                                        <div className={`flex items-center gap-1 ${component.inputs ? 'text-neutral-500' : 'opacity-0'}`}>
                                            <span>{component.inputs ?? 0}</span>
                                            <LogInIcon width="12" height="12" />
                                        </div>
                                        <div className={`flex items-center gap-1 ${component.outputs ? 'text-neutral-500' : 'opacity-0'}`}>
                                            <LogOutIcon width="12" height="12" />
                                            <span>{component.outputs ?? 0}</span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))
                        :
                        <p className="text-neutral-500 text-sm text-center mt-12">No components</p>
                }
            </ul>
        </div >
    );
}