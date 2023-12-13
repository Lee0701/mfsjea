
import { isSyllable } from './hangul'
import { Keyboard, presetKoKeyboards, presetEnKeyboards } from './keyboards'

/**
 * Automatically detects input and output layouts from conversion result,
 * and returns the best possible.
 * @param text An input string
 */
export function enko(text: string): string {
    const list = enkoList(text)
    const scores = list.map((result) => result.output.split('').filter((c) => isSyllable(c)).length)
    const max = Math.max(...scores)
    const index = scores.indexOf(max)
    return list[index].output
}

export function enkoList(text: string): ConversionResult[] {
    return presetEnKeyboards.flatMap((en) => {
        return presetKoKeyboards.map((ko) => {
            return convert(en, ko, text)
        })
    })
}

export function convert(from: Keyboard, to: Keyboard, text: string): ConversionResult {
    const codes = from.encode(text)
    const result = to.decode(codes)
    return {
        from: from.name,
        to: to.name,
        input: text,
        output: result,
    }
}

export interface ConversionResult {
    from: string
    to: string
    input: string
    output: string
}
