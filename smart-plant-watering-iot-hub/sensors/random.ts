function randomInt(min: number, max: number): number // min and max included
{
    return Math.random() * (max - min + 1) + min;
}
export { randomInt };