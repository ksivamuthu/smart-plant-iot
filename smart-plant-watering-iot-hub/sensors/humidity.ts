import { randomInt } from './random';
export class HumiditySensor {
    constructor() { }
    async read(): Promise<{ humidity: number }> {
        return {
            humidity: randomInt(24, 27)
        };
    }
}