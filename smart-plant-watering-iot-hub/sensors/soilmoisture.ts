import { randomInt } from "./random";

export class SoilMoistureSensor {
    constructor() { }
    min = 0.0; max = 100.0;
    currentMoisture = 100.0;
    watering = false;
    waterlevel = 0.0;

    async read(): Promise<{ waterlevel: number, moisture: number, watering: boolean }> {

        if (this.watering === false) {
            this.currentMoisture += -5.0 + (Math.random() * 1.5);
        }

        if (this.currentMoisture <= this.min) {
            this.currentMoisture = 0.0;
        }

        return {
            waterlevel: this.watering ? randomInt(20, 50) : 0.0,
            watering: this.watering,
            moisture: this.currentMoisture
        };
    }

    async water(level: number): Promise<{ moisture: number }> {

        this.watering = true;

        if (level >= this.max) level = this.max;

        while (this.currentMoisture <= level) {
            this.currentMoisture += 2.5;
            await this.delay(300);
        }

        if (this.currentMoisture >= this.max) this.currentMoisture = this.max;

        this.watering = false;

        return {
            moisture: this.currentMoisture
        }
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}