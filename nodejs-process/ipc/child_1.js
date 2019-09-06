class ModuleA {
    monitor() {
        setInterval(() => {
            if (process.send)
                process.send('ModuleA' + Math.random() * 1);
        }, 2000);
    }
}

const moduleA = new ModuleA();
moduleA.monitor();