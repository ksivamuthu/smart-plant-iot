function randomInt(min: number, max: number): number // min and max included
{
    return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));
}
export { randomInt };