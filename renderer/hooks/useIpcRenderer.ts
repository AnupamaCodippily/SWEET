import { useEffect } from 'react';
import IPCChannel from '../types/IPCChannel';


export const useIpcRenderer = (channel: IPCChannel, callback: (...args: any) => any) => {
    useEffect(() => {
        const listener = (...args: any) => callback(...args);

        console.log(window.electron);

        window.electron.on(channel, listener);

        return () => {
            window.electron.removeListener(channel, listener);
        };
    }, [channel, callback]);
};
