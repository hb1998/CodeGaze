import Axios from 'axios';
import { AssessmentUpdateDto, CandidateInsertDto, Status } from '../../../types/Models';
import { DatabaseCode } from '../../../types/Util.types';
import { supabase } from '../../API/supabase';
import { CodeOutput } from '../../../types/Evaluator.types';

export class CandidateAssessmentAPIService {
    static async getAll() {
        const { data, error } = await supabase.from('assessment').select('*, candidate(*), exam(*), challenge(*)');
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getByExam(exam_id: number) {
        const { data, error } = await supabase
            .from('assessment')
            .select('*, candidate(*), exam(*)')
            .eq('exam_id', exam_id);
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: string) {
        const { data, error } = await supabase
            .from('assessment')
            .select('*, candidate(*), exam(*), challenge(*)')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(payload: Pick<CandidateInsertDto, 'emailId' | 'name'> & { exam_id: string }) {
        const response = await supabase
            .from('candidate')
            .insert({
                emailId: payload.emailId,
                name: payload.name,
            })
            .select();
        const { error } = response;
        let candidateData = response.data;
        if (error?.code === DatabaseCode.ALREADY_EXISTS) {
            const { data, error } = await supabase.from('candidate').select().eq('emailId', payload.emailId);
            if (error) {
                throw error;
            }
            candidateData = data;
        } else if (error) {
            throw error;
        }
        const candidate = candidateData?.[0];
        if (candidate) {
            const { data: assessmentData, error: assessmentError } = await supabase
                .from('assessment')
                .insert({
                    exam_id: payload.exam_id,
                    candidate_id: candidate.id,
                    joinedAt: new Date().toISOString(),
                    status: Status.JOINED,
                })
                .select();
            if (assessmentError) {
                throw assessmentError;
            }
            return assessmentData?.[0];
        }
    }

    static async runCode(code: string, language_id: string): Promise<CodeOutput> {
        const response = await Axios.post(import.meta.env.VITE_COMPILER_ENDPOINT || '', {
            source_code: code,
            language_id,
        });
        return response.data;
    }

    static async submit(payload: Pick<AssessmentUpdateDto, 'code' | 'language' | 'id'>) {
        const { data, error } = await supabase
            .from('assessment')
            .update({
                ...payload,
                status: Status.SUBMITTED,
            })
            .eq('id', payload.id)
            .select();
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }
}
