'use client';

import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/icons/x.svg';

export default function FileList({ data, dispatch }) {
    return (
        <ul className="flex items-center gap-1">
            {
                data.list.map((file, index) => (
                    <li key={index}>
                        <FileTab
                            active={data.activeIndex === index}
                            name={file.name}
                            dirty={file.dirty}
                            onChange={() => dispatch({ type: 'SET_ACTIVE', index })}
                            onClose={() => dispatch({ type: 'CLOSE_FILE', index })}
                            onRename={(value) => dispatch({ type: 'RENAME_FILE', index, value })}
                            isClosable={data.list.length > 1}
                        />
                    </li>
                ))
            }
        </ul>
    );
}

export function FileTab({ active, name, dirty, isClosable = true, onChange, onClose, onRename }) {
    const [isEditing, setEditing] = useState(false);
    const inputElem = useRef();

    useEffect(() => {
        setEditing(false);
    }, [active]);

    const handleChange = () => {
        if (active) {
            setEditing(true);
        } else {
            onChange();
        }
    };

    const handleKeyDown = (event) => {
        event.stopPropagation();

        switch (event.key) {
            case 'Enter': {
                onRename(event.target.value);
                setEditing(false);

                break;
            }
            case 'Escape': {
                setEditing(false);

                break;
            }
        }
    };

    const handleBlur = () => {
        setEditing(false);
    };

    return (
        <div className={`relative cursor-pointer select-none flex items-center gap-2 px-3 py-2 text-sm border-t-2 ${active ? 'bg-neutral-900 border-t-neutral-800 text-white' : 'border-t-neutral-950 hover:border-t-neutral-900 text-neutral-500 hover:text-white bg-neutral-950 hover:bg-neutral-900'}`} onClick={() => handleChange()}>
            {
                isEditing
                    ? <input type="text" className="text-sm bg-transparent outline-none" defaultValue={name} placeholder="New name" onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus={true} ref={inputElem} />
                    : <>
                        <span>{name}</span>
                        {
                            dirty
                                ? <span className="text-neutral-400 text-xs">(unsaved)</span>
                                : null
                        }
                    </>
            }
            {
                isClosable
                    ? <button type="button" className="p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white rounded" onClick={(event) => { event.stopPropagation(); onClose(); }}>
                        <CloseIcon width="12" height="12" />
                    </button>
                    : null
            }
        </div>
    );
}