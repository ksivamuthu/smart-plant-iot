export class PressureSensor {
    constructor() { }
    min = 20.0; max = 100.0;
    currentPressure = 30.0;

    async read(): Promise<{ pressure: number }> {
        if (this.currentPressure > this.max)
            this.currentPressure += Math.random() - 0.5;
        else
            this.currentPressure += -0.25 + (Math.random() * 1.5);

        return {
            pressure: this.currentPressure
        };
    }
}