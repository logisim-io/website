'use client';

import { useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/x.svg';

export default function FileList({ data, dispatch }) {
    return (
        <ul className="flex items-center gap-1 px-3 pt-3">
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
                        />
                    </li>
                ))
            }
        </ul>
    );
}

export function FileTab({ active, name, dirty, onChange, onClose, onRename }) {
    // FIXME closing the current file which is being name-edited will keep the name editor open for the next file

    const [isEditing, setEditing] = useState(false);

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

    return (
        <div className={`relative cursor-pointer select-none flex items-center gap-2 px-3 py-2 text-sm border-t-2 ${active ? 'bg-neutral-900 border-t-neutral-800 text-white' : 'border-t-neutral-950 hover:border-t-neutral-900 text-neutral-500 hover:text-white bg-neutral-950 hover:bg-neutral-900'}`} onClick={() => handleChange()}>
            {
                isEditing
                    ? <input type="text" className="text-sm bg-transparent outline-none" defaultValue={name} placeholder="New name" onKeyDown={handleKeyDown} autoFocus={true} />
                    : <>
                        <span>{name}</span>
                        {
                            dirty
                                ? <span className="text-neutral-400 text-xs">(unsaved)</span>
                                : null
                        }
                    </>
            }
            <button type="button" className="p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white rounded" onClick={(event) => { event.stopPropagation(); onClose(); }}>
                <CloseIcon width="14" height="14" />
            </button>
        </div>
    );
}