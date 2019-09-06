const EventEmitter = require('events');

class ModuleA extends EventEmitter {
    monitor() {
        setInterval(() => {
            this.emit('data', 'ModuleA' + Math.random() * 1);
        }, 2000);
    }
}

class ModuleB extends EventEmitter {
    monitor() {
        setInterval(() => {
            this.emit('data', 'ModuleB' + Math.random() * 1);
        }, 2000);
    }
}

const moduleA = new ModuleA();
const moduleB = new ModuleB();

moduleA.monitor();
moduleB.monitor();

moduleA.on('data', (data) => console.log(data));
moduleB.on('data', (data) => console.log(data));
