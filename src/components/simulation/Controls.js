import ClockIcon from '@/assets/icons/clock.svg';
import OctagonIcon from '@/assets/icons/octagon.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import PlayIcon from '@/assets/icons/play.svg';
import CloseIcon from '@/assets/icons/x.svg';

export default function Controls({ className = '' }) {
    return (
        <div className={`flex items-center gap-8 bg-neutral-900 rounded p-4 ${className}`}>
            <div>
                <p className="text-lg font-bold text-neutral-300">Simulation Controls</p>
                <p className="text-neutral-400 mt-1 text-sm">
                    <span>Tick: </span>
                    <span className="font-mono">0</span>
                </p>
                <p className="text-neutral-400 mt-1 text-sm">
                    <span>Speed: </span>
                    <span className="font-mono">10 ticks/s</span>
                </p>
            </div>
            <div className="w-px h-2/3 bg-neutral-800" />
            <div className="flex items-center gap-3">
                <button type="button" className="px-3 py-2 flex items-center gap-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white">
                    <ClockIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Next Tick</span>
                        <span className="text-xs font-mono text-neutral-400">(&rarr;)</span>
                    </div>
                </button>
                <button type="button" className="px-3 py-2 flex items-center gap-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white">
                    <CloseIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Reset</span>
                        <span className="text-xs font-mono text-neutral-400">(r)</span>
                    </div>
                </button>
            </div>
            <div className="w-px h-2/3 bg-neutral-800" />
            <div className="flex items-center gap-3">
                <button type="button" className="px-3 py-2 flex items-center gap-2 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white">
                    <PlayIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Start</span>
                        <span className="text-xs font-mono text-neutral-400">(space)</span>
                    </div>
                </button>
                <button type="button" className="px-3 py-2 flex items-center gap-2 rounded text-neutral-500 cursor-not-allowed">
                    <PauseIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Pause</span>
                        <span className="text-xs font-mono">(space)</span>
                    </div>
                </button>
                <button type="button" className="px-3 py-2 flex items-center gap-2 rounded text-neutral-500 cursor-not-allowed">
                    <OctagonIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Stop</span>
                        <span className="text-xs font-mono">(esc)</span>
                    </div>
                </button>
            </div>
        </div>
    );
}