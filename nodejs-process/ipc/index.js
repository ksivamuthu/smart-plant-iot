const fork = require('child_process').fork;
const path = require('path');

const options = {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
};

const child_1 = fork(path.resolve('child_1.js'), [], options);
const child_2 = fork(path.resolve('child_2.js'), [], options);

child_1.on('message', (data, socket) => {
    console.log(data, socket);
});

child_2.on('message', (data, socket) => {
    console.log(data, socket);
});

while (true) { }
