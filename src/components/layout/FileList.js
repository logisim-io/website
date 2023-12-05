import CloseIcon from '@/assets/icons/x.svg';

export default function FileList() {
    return (
        <ul className="flex items-center px-3 pt-3">
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-900 border-t-2 border-t-neutral-800">
                        <span>Untitled</span>
                        <span className="text-neutral-400 text-xs">(unsaved)</span>
                        <CloseIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-950 text-neutral-500">
                        <span>Simple XOR</span>
                        <CloseIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-950 text-neutral-500">
                        <span>Half Adder</span>
                        <CloseIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
        </ul>
    );
}