interface IBlock {
    blockframe: Array<any>;
    blocklanguages: Array<any>;
    blockpoints: Array<any>;
    blocktext: Array<string>;
    foundText: boolean;
}

interface ILine {
    lineframe: Array<any>;
    linelanguages: Array<any>;
    linepoints: Array<any>;
    linetext: Array<string>;
}

interface IWord {
    lineframe: Array<any>;
    linelanguages: Array<any>;
    linepoints: Array<any>;
    linetext: Array<string>;
}

export interface IOcrObject {
    blocks: IBlock;
    lines: ILine;
    words: IWord;
}


