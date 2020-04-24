
export default interface Keyboard {
    name: string
    convertFrom(input: string): number[]
    convertTo(input: number[]): string
}
