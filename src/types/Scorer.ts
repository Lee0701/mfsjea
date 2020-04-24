
export default interface Scorer {
    weight: number
    calculateScore(input: string): number
}
