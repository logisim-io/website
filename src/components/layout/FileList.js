import CloseIcon from '@/assets/icons/x.svg';

export default function FileList() {
    return (
        <ul className="flex items-center gap-1 px-3 pt-3">
            <li>
                <div className="relative cursor-pointer flex items-center gap-2 px-3 py-2 text-sm bg-neutral-900 border-t-2 border-t-neutral-800">
                    <span>Untitled</span>
                    <span className="text-neutral-400 text-xs">(unsaved)</span>
                    <button type="button" className="p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white rounded">
                        <CloseIcon width="14" height="14" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-white bg-neutral-950 hover:bg-neutral-900">
                    <span>Simple XOR</span>
                    <button type="button" className="p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white rounded">
                        <CloseIcon width="14" height="14" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-white bg-neutral-950 hover:bg-neutral-900">
                    <span>Half Adder</span>
                    <button type="button" className="p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white rounded">
                        <CloseIcon width="14" height="14" />
                    </button>
                </div>
            </li>
        </ul>
    );
}