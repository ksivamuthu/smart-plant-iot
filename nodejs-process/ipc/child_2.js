class ModuleB {
    monitor() {
        setInterval(() => {
            process.send('ModuleB' + Math.random() * 1);
        }, 2000);
    }
}

const moduleB = new ModuleB();
moduleB.monitor();