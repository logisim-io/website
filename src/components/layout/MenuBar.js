import ChevronDownIcon from '@/assets/icons/chevron-down.svg';

export default function MenuBar() {
    return (
        <ul className="flex bg-neutral-900">
            <li>
                <div>
                    <span className="block px-3 py-2 text-sm">
                        <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">logisim</span>
                        <span className="text-neutral-400">.io</span>
                    </span>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>File</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Edit</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Selection</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>View</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Simulate</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Help</span>
                        <ChevronDownIcon width="14" height="14" className="text-neutral-500" />
                    </button>
                </div>
            </li>
            <li className="ml-auto">
                <div className="relative">
                    <button type="button" className="px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Log in</span>
                    </button>
                </div>
            </li>
            <li>
                <div className="relative">
                    <button type="button" className="px-3 py-2 text-sm hover:bg-neutral-800">
                        <span>Sign up</span>
                    </button>
                </div>
            </li>
        </ul>
    );
}