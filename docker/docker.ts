const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');

const docker = new Docker();

async function runCodeInDocker(code, language, testCases) {
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const codeFilePath = path.join(tempDir, `code.${getExtension(language)}`);
    fs.writeFileSync(codeFilePath, code);

    const testCaseFilePath = path.join(tempDir, 'test_cases.json');
    fs.writeFileSync(testCaseFilePath, JSON.stringify(testCases));

    const runCommand = getRunCommand(language);

    const container = await docker.createContainer({
        Image: 'sweet/multilang-executor',
        Cmd: ['/bin/sh', '-c', runCommand],
        AttachStdout: true,
        AttachStderr: true,
        HostConfig: {
            Binds: [`${tempDir}:/workspace`],
        },
    });

    await container.start();
    const logs = await container.logs({ follow: true, stdout: true, stderr: true });

    await container.stop();
    await container.remove();

    return logs.toString();
}

function getExtension(language) {
    return {
        'python': 'py',
        'javascript': 'js',
        'typescript': 'ts',
        'java': 'java',
        'cpp': 'cpp',
        'rust': 'rs',
        'golang': 'go'
    }[language];
}

function getRunCommand(language) {
    return {
        'python': 'python3 /workspace/code.py',
        'javascript': 'node /workspace/code.js',
        'typescript': 'tsc /workspace/code.ts && node /workspace/code.js',
        'java': 'javac /workspace/code.java && java -cp /workspace Code',
        'cpp': 'g++ /workspace/code.cpp -o /workspace/code && /workspace/code',
        'rust': 'rustc /workspace/code.rs -o /workspace/code && /workspace/code',
        'golang': 'go run /workspace/code.go'
    }[language];
}

module.exports = { runCodeInDocker };
