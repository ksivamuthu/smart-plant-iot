export class TemperatureSensor {
    constructor() { }
    min = 20; max = 100;
    currentTemp = 30;

    async read(): Promise<{ temperature: number }> {
        if (this.currentTemp > this.max)
            this.currentTemp += Math.random() - 0.5;
        else
            this.currentTemp += -0.25 + (Math.random() * 1.5);

        return {
            temperature: this.currentTemp
        };
    }
}