import { IInputOutput, IParamType } from './Evaluator.types';
import { Database } from './schema';

export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type Assessment = Row<'assessment'>;
export type AssessmentInsertDto = InsertDto<'assessment'>;
export type AssessmentUpdateDto = UpdateDto<'assessment'>;

export type Candidate = Row<'candidate'>;
export type CandidateInsertDto = InsertDto<'candidate'>;
export type CandidateUpdateDto = UpdateDto<'candidate'>;

export type Challenge = Row<'challenge'>;
export type ChallengeInsertDto = InsertDto<'challenge'>;
export type ChallengeUpdateDto = UpdateDto<'challenge'>;

export type Exam = Row<'exam'>;
export type ExamInsertDto = InsertDto<'exam'>;
export type ExamUpdateDto = UpdateDto<'exam'>;

export enum Status {
    JOINED = 1,
    SUBMITTED = 2,
}
export enum Difficulty {
    easy = 1,
    medium = 2,
    hard = 3,
}

export const difficultyMap = {
    [Difficulty.easy]: 'Easy',
    [Difficulty.medium]: 'Medium',
    [Difficulty.hard]: 'Hard',
};

export const statusLabels = {
    [Status.JOINED]: 'Joined',
    [Status.SUBMITTED]: 'Submitted',
};

export interface InputOutput {
    inputType: string;
    outputType: string;
    inputOutput: {
        input: string | number | boolean | string[] | number[];
        output: string | number | boolean | string[] | number[];
    }[];
}

export const sampleInput = {
    inputType: [
        {
            name: 'numberParam',
            type: 'number',
        },
        {
            name: 'numberArrayParam',
            type: 'arrayOfNumber',
        },
    ] as IParamType[],
    outputType: {
        name: 'output',
        type: 'number',
    } as IParamType,
    inputOutput: [
        {
            input: ['4', `[1,2,3]`],
            output: '4',
        },
        {
            input: ['3', '[1, 2, 3]'],
            output: '3',
        },
    ] as IInputOutput[],
};
