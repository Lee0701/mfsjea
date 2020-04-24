
import Keyboard from '../types/Keyboard'

export default class SimpleKeyboard implements Keyboard {
    layout: string[]
    name: string
    constructor(name: string, layout: string[]) {
        this.name = name
        this.layout = layout
    }
    convertFrom(input: string): number[] {
        return input.split('').map(c => this.layout.indexOf(c))
    }
    convertTo(input: number[]): string {
        return input.map(i => this.layout[i]).join('')
    }
}
