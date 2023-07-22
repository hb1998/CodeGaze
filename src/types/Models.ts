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

export type Challenge = Omit<Row<'challenge'>, 'input_output'> & { input_output: InputOutput };
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
    inputType: IParamType[];
    outputType: IParamType;
    inputOutput: IInputOutput[];
}

