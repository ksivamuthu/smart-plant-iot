export class SoilMoistureSensor {
    constructor() { }
    min = 0; max = 880;
    currentMoisture = 400;

    async read(): Promise<{ moisture: number }> {
        if (this.currentMoisture > this.max)
            this.currentMoisture += Math.random() - 50;
        else
            this.currentMoisture += -50 + (Math.random() * 50);

        return {
            moisture: this.currentMoisture
        };
    }
}