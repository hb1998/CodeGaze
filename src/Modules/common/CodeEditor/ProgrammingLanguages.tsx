// CodeMirror Languages Imports
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

export enum Language {
    C = 'C',
    CPP = 'C++',
    JAVA = 'Java',
    JAVASCRIPT = 'Javascript',
    PYTHON = 'Python',
}

export const ProgrammingLanguages = {
    c: {
        id: 50,
        name: Language.C,
        lang: cpp(),
    },
    cpp: {
        id: 54,
        name: Language.CPP,
        lang: cpp(),
    },
    java: {
        id: 62,
        name: Language.JAVA,
        lang: java(),
    },
    javaScript: {
        id: 63,
        name: Language.JAVASCRIPT,
        lang: javascript({ jsx: true }),
    },
    python: {
        id: 71,
        name: Language.PYTHON,
        lang: python(),
    },
} as const;

export type languageObjectType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];
export type languageNameType = languageObjectType['name'];

export const languagesNameMap = Object.keys(ProgrammingLanguages).reduce(
    (acc, key) => {
        acc[ProgrammingLanguages[key].name] = ProgrammingLanguages[key];
        return acc;
    },
    {} as Record<languageNameType, languageObjectType>,
);