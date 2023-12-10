import { useEffect } from 'react';
import ClockIcon from '@/assets/icons/clock.svg';
import OctagonIcon from '@/assets/icons/octagon.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import PlayIcon from '@/assets/icons/play.svg';
import CloseIcon from '@/assets/icons/x.svg';

export default function Controls({ className = '', currentTick = 0, tickSpeed = 10, isRunning = false, isPaused = false, onTickSpeedUpdate, onStart, onStop, onPause, onNextTick, onReset }) {
    useEffect(() => {
        const onKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowRight': {
                    if (isRunning) return;

                    onNextTick();

                    break;
                }
                case 'KeyR': {
                    if (currentTick < 1 || isRunning) return;

                    onReset();

                    break;
                }
                case 'Space': {
                    if (isRunning) {
                        onPause();
                    } else {
                        onStart();
                    }

                    break;
                }
                case 'Escape': {
                    if (!isRunning && !isPaused) return;

                    onStop();

                    break;
                }
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isRunning, isPaused, currentTick]);

    return (
        <div className={`flex items-center gap-8 bg-neutral-900 rounded p-4 ${className}`}>
            <div>
                <p className="text-lg font-bold text-neutral-300">Simulation Controls</p>
                <p className="text-neutral-400 mt-1 text-sm">
                    <span>Tick: </span>
                    <span className="font-mono">{currentTick}</span>
                </p>
                <p className="flex items-center gap-1 text-neutral-400 mt-1 text-sm">
                    <span>Speed:</span>
                    <span className="flex items-center gap-1 font-mono">
                        <input type="number" className="px-2 py-1 border border-neutral-800 disabled:border-transparent focus:border-neutral-700 rounded bg-transparent outline-none" defaultValue={tickSpeed} min="1" max="100" step="1" onChange={(event) => onTickSpeedUpdate(event.target.value)} disabled={isRunning} />
                        <span>ticks/s</span>
                    </span>
                </p>
            </div>
            <div className="w-px h-2/3 bg-neutral-800" />
            <div className="flex items-center gap-3">
                <button type="button" className={`px-3 py-2 flex items-center gap-2 rounded ${isRunning ? 'text-neutral-500 cursor-not-allowed' : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'}`} onClick={() => onNextTick()} disabled={isRunning}>
                    <ClockIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Next Tick</span>
                        <span className="text-xs font-mono text-neutral-500">(&rarr;)</span>
                    </div>
                </button>
                <button type="button" className={`px-3 py-2 flex items-center gap-2 rounded ${currentTick < 1 || isRunning ? 'text-neutral-500 cursor-not-allowed' : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'}`} onClick={() => onReset()} disabled={currentTick < 1 || isRunning}>
                    <CloseIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Reset</span>
                        <span className="text-xs font-mono text-neutral-500">(r)</span>
                    </div>
                </button>
            </div>
            <div className="w-px h-2/3 bg-neutral-800" />
            <div className="flex items-center gap-3">
                <button type="button" className={`px-3 py-2 flex items-center gap-2 rounded ${isRunning ? 'text-neutral-500 cursor-not-allowed' : 'hover:bg-neutral-800 text-green-600 hover:text-green-500'}`} onClick={() => onStart()} disabled={isRunning}>
                    <PlayIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Start</span>
                        <span className="text-xs font-mono text-neutral-500">(space)</span>
                    </div>
                </button>
                <button type="button" className={`px-3 py-2 flex items-center gap-2 rounded ${isRunning ? 'hover:bg-neutral-800 text-yellow-600 hover:text-yellow-500' : 'text-neutral-500 cursor-not-allowed'}`} onClick={() => onPause()} disabled={!isRunning}>
                    <PauseIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Pause</span>
                        <span className="text-xs font-mono text-neutral-500">(space)</span>
                    </div>
                </button>
                <button type="button" className={`px-3 py-2 flex items-center gap-2 rounded ${isRunning || isPaused ? 'hover:bg-neutral-800 text-red-600 hover:text-red-500' : 'text-neutral-500 cursor-not-allowed'}`} onClick={() => onStop()} disabled={!isRunning && !isPaused}>
                    <OctagonIcon width="16" height="16" />
                    <div className="flex items-center gap-1">
                        <span>Stop</span>
                        <span className="text-xs font-mono text-neutral-500">(esc)</span>
                    </div>
                </button>
            </div>
        </div>
    );
}