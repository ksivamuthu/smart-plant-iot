import { randomInt } from './random';
export class LuminositySensor {
    constructor() { }
    async read(): Promise<{ luminosity: number }> {
        return {
            luminosity: randomInt(500.0, 800.0)
        };
    }
}