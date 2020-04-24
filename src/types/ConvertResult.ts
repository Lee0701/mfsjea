
export default class ConvertResult {
    input: string
    output: string
    score: number
    inputName: string
    outputName: string
    constructor(input: string, output: string, score: number, inputName: string, outputName: string) {
        this.input = input
        this.output = output
        this.score = score
        this.inputName = inputName
        this.outputName = outputName
    }
    applyScore(score: number) {
        return new ConvertResult(this.input, this.output, score, this.inputName, this.outputName)
    }
}
