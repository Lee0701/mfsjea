
import SimpleKeyboard from './SimpleKeyboard'
import {standardJamoToCompatJamo, compatJamoToStandardJamo} from '../HangulJamo'

export default class Hangul3Keyboard extends SimpleKeyboard {
    combinations: Map<string, string>
    decombinations: Map<string, string>
    constructor(name: string, layout: string[], combinations: Map<string, string>) {
        super(name, layout)
        this.combinations = combinations
        this.decombinations = new Map(Array.from(combinations.entries()).map(e => [e[1], e[0]]))
    }
    convertFrom(input: string): number[] {
        return super.convertFrom(this.decombinate(compatJamoToStandardJamo(input.normalize('NFD'))))
    }
    convertTo(input: number[]): string {
        return standardJamoToCompatJamo(this.combinate(super.convertTo(input)).normalize('NFC'))
    }
    combinate(input: string): string {
        return input.split('').reduce((a, c) => {
            const sequence = a.charAt(a.length - 1) + c
            return a.slice(0, a.length - 1) + (this.combinations.get(sequence) || sequence)
        }, '')
    }
    decombinate(input: string): string {
        return input.split('').map(c => this.decombinations.get(c) || c).join('')
    }
}
