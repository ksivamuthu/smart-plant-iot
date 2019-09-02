import { randomInt } from './random';
export class WindSensor {
    constructor() { }

    windDirections = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];

    async read(): Promise<{ speed: number, direction: string }> {
        const randomIndex = Math.round(randomInt(0, 7));
        return {
            speed: randomInt(3, 25),
            direction: this.windDirections[randomIndex]
        };
    }
}