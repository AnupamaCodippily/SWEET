// type IPCChannel = 'execute-code' | 'save-file' | 'load-file';

enum IPCChannel {
    executeCode = 'execute-code',
    openExam = 'open-exam',
}

export default IPCChannel;