import { useEffect, useReducer } from 'react';
import Controls from '@/components/simulation/Controls';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TICK_SPEED':
            return { ...state, tickSpeed: action.tickSpeed };
        case 'START':
            return { ...state, isRunning: true };
        case 'PAUSE':
            return { ...state, isRunning: false, isPaused: true };
        case 'STOP':
            return { ...state, isRunning: false, isPaused: false, currentTick: 0 };
        case 'NEXT_TICK':
            return { ...state, currentTick: state.currentTick + 1 };
        case 'RESET':
            return { ...state, isRunning: false, isPaused: false, currentTick: 0 };
        default:
            return state;
    }
};

export default function useSimulationControls() {
    const [data, dispatch] = useReducer(reducer, { isRunning: false, isPaused: false, currentTick: 0, tickSpeed: 10 });

    useEffect(() => {
        if (!data.isRunning) return;

        const interval = setInterval(() => {
            dispatch({ type: 'NEXT_TICK' });
        }, 1000 / data.tickSpeed);

        return () => clearInterval(interval);
    }, [data.isRunning, data.tickSpeed]);

    return {
        isRunning: data.isRunning,
        currentTick: data.currentTick,
        tickSpeed: data.tickSpeed,
        render: (
            <Controls
                isRunning={data.isRunning}
                isPaused={data.isPaused}
                currentTick={data.currentTick}
                tickSpeed={data.tickSpeed}
                onTickSpeedUpdate={(value) => dispatch({ type: 'UPDATE_TICK_SPEED', value })}
                onStart={() => dispatch({ type: 'START' })}
                onStop={() => dispatch({ type: 'STOP' })}
                onPause={() => dispatch({ type: 'PAUSE' })}
                onNextTick={() => dispatch({ type: 'NEXT_TICK' })}
                onReset={() => dispatch({ type: 'RESET' })}
            />
        )
    };
}