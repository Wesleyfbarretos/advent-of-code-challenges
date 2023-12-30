export interface IAdjacentLinesGearRatio {

    gearIndex: number;
    
    lineIndex: number;
    
    lines: string[];

}

export interface ICurrentLineGearRatio extends IAdjacentLinesGearRatio {}


export interface ILineParts {

    gearIndex: number;

    currentLine: string;

    direction?: 'left' | 'right';

}

export interface ISearchAdjacentLineParts extends ILineParts {}

export interface ISearchAdjacentLinePartsResponse {

    leftNumbersTotal: string,

    rightNumbersTotal: string

}