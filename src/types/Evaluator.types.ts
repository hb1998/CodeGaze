export enum ParamType {
    STRING = 'string',
    NUMBER = 'number',
    ARRAY_OF_STRING = 'arrayOfString',
    ARRAY_OF_NUMBER = 'arrayOfNumber',
    OBJECT = 'object',
    ARRAY_OF_OBJECT = 'arrayOfObject',
    BOOLEAN = 'boolean'
}

export interface IParamType {
    type: ParamType;
    name: string;
}

export interface IInputOutput {
    input: string[];
    output: string;
}

export enum CompilationStatus {
    IN_QUEUE = 1,
    PROCESSING = 2,
    ACCEPTED = 3,
    WRONG_ANSWER = 4,
    TIME_LIMIT_EXCEEDED = 5,
    COMPILATION_ERROR = 6,
    RUNTIME_ERROR_SIGSEGV = 7,
    RUNTIME_ERROR_SIGXFSZ = 8,
    RUNTIME_ERROR_SIGFPE = 9,
    RUNTIME_ERROR_SIGABRT = 10,
    RUNTIME_ERROR_NZEC = 11,
    RUNTIME_ERROR_OTHER = 12,
    INTERNAL_ERROR = 13,
    EXEC_FORMAT_ERROR = 14
}

export interface CodeOutput {
    compile_output: string;
    memory: number;
    message: string;
    status: {
        id: CompilationStatus;
        description: string;
    };
    stderr: string;
    stdout: string;
    time: string;
    token: string;
}

export const FUNCTION_NAME = 'solve';