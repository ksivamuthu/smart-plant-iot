import { randomInt } from './random';
export class LuminositySensor {
    constructor() { }
    async read(): Promise<{ luminosity: number }> {
        return {
            luminosity: randomInt(1000, 1500)
        };
    }
}