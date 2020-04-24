
import Scorer from '../types/Scorer'

export default class NonHangulPenaltyScorer implements Scorer {
    weight: number
    constructor(weight: number) {
        this.weight = weight
    }
    calculateScore(input: string): number {
        return -input.split('').filter(c => !(c >= '가' && c <= '힣')).length / input.length
    }
}
