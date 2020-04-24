
import Scorer from '../types/Scorer'

export default class DictionaryScorer implements Scorer {
    weight: number
    dictionary: Map<string, number>
    preprocess: (string) => string
    constructor(weight: number, dictionary: Map<string, number>, preprocess: (string) => string = (word) => word) {
        this.weight = weight
        this.dictionary = dictionary
        this.preprocess = preprocess
    }
    calculateScore(input: string): number {
        const words = input.split(' ')
        return words.map(word => this.dictionary.get(this.preprocess(word)) || 0).reduce((a, c) => a + c) / words.length
    }
}
