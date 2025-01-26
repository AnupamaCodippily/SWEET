import { IPCChannel } from "./IPCChannel";

export {};

declare global {
  interface Window {
    electron: {
      send(channel: IPCChannel, ...args: any[]): void; 
      invoke(channel: IPCChannel, ...args: any[]): Promise<any>;
      on(channel: IPCChannel, listener: (...args: any[]) => void): void;
      removeListener(channel: IPCChannel, listener: (...args: any[]) => void): void;
    };
  }
}
