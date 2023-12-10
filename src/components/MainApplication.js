'use client';

import { useEffect, useState } from 'react';
import getUser from '@/actions/getUser';
import LoginModal from '@/components/authentication/LoginModal';
import SignupModal from '@/components/authentication/SignupModal';
import FileList from '@/components/layout/FileList';
import MenuBar from '@/components/layout/MenuBar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Canvas from '@/components/simulation/Canvas';
import useAuthenticationReducer from '@/hooks/useAuthenticationReducer';
import useFilesReducer from '@/hooks/useFilesReducer';
import useSimulationControls from '@/hooks/useSimulationControls';

export default function MainApplication() {
    const [render, setRender] = useState(false);
    const simulationControls = useSimulationControls();
    const files = useFilesReducer();
    const authentication = useAuthenticationReducer();

    useEffect(() => setRender(true), []);

    useEffect(() => {
        const sessionToken = window.localStorage.getItem('session');
        if (sessionToken.length < 1) return;

        (async () => {
            try {
                const user = await getUser('@me', sessionToken);

                authentication.dispatch({ type: 'SET_USER', value: user });
            } catch (e) {
                console.warn(e);
            }
        })();
    }, []);

    return (
        render
            ? <>
                <LoginModal authentication={authentication} onClose={() => authentication.dispatch({ type: 'CLOSE_LOGIN_MODAL' })} />
                <SignupModal authentication={authentication} onClose={() => authentication.dispatch({ type: 'CLOSE_SIGNUP_MODAL' })} />
                <div className="flex flex-col w-[100vw] h-[100vh]">
                    <MenuBar files={files} authentication={authentication} />
                    <div className="grow flex gap-3 p-3">
                        <Sidebar isLocked={simulationControls.isRunning} />
                        <div className="grow flex flex-col gap-3">
                            <div className="grow flex flex-col">
                                <FileList {...files} />
                                <div className={`grow bg-neutral-900 ${files.data.activeIndex !== 0 ? 'rounded' : 'rounded-b rounded-r'} overflow-hidden`}>
                                    <Canvas className="w-full h-full" />
                                </div>
                            </div>
                            {simulationControls.render}
                        </div>
                    </div>
                </div>
            </>
            : <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                <span className="font-light text-6xl">Loading...</span>
            </div>
    );
}