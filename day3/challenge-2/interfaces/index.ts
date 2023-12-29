export interface IAdjacentLinesGearRatio {
    gearIndex: number;
    
    lineIndex: number;
    
    lines: string[];
}
export interface ICurrentLineGearRatio extends IAdjacentLinesGearRatio {}


export interface ILineParts {
    gearIndex: number;

    currentLine: string;

    direction: 'left' | 'right';
}

export interface ILinesResponse {

    gearRatio: number;

    matches: boolean

}