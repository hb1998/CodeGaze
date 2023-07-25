import { ExamInsertDto, ExamUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';

export class ExamAPIService {
    static async getAll() {
        const { data, error } = await supabase.from('exam').select('*,challenge(*)');
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: string) {
        const { data, error } = await supabase.from('exam').select('*, challenge(*)').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(exam: ExamInsertDto) {
        const { data, error } = await supabase.from('exam').insert(exam).select('*,challenge(*)');
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }

    static async update(exam: ExamUpdateDto) {
        const { data, error } = await supabase.from('exam').update(exam).eq('id', exam.id);
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }

    static async delete(id: string): Promise<void> {
        const { error } = await supabase.from('exam').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }

    static async updateExamChallenges(examId: string, challengeIds: Set<string>) {
        // Extract the array of challenge IDs from the exam_challenge data
        const { data: examChallengeData, error: examChallengeError } = await supabase
            .from('exam_challenge')
            .select('challenge_id')
            .eq('exam_id', examId);
        if (examChallengeError) {
            throw examChallengeError;
        }

        const currentChallengeIds = examChallengeData.map((row) => row.challenge_id);
        const newChallengeIds = Array.from(challengeIds).filter((id) => !currentChallengeIds.includes(id));
        const deletedChallengeIds = currentChallengeIds.filter((id) => !challengeIds.has(id));

        // Insert new challenges into the exam_challenge table
        const newChallengeRecords = newChallengeIds.map((challengeId) => ({
            exam_id: examId,
            challenge_id: challengeId,
        }));

        if (newChallengeRecords.length > 0) {
            const { error: insertError } = await supabase.from('exam_challenge').insert(newChallengeRecords);

            if (insertError) {
                throw insertError;
            }
        }

        // Delete challenges from the exam_challenge table
        if (deletedChallengeIds.length > 0) {
            const { error: deleteError } = await supabase
                .from('exam_challenge')
                .delete()
                .in('challenge_id', deletedChallengeIds)
                .eq('exam_id', examId);

            if (deleteError) {
                throw deleteError;
            }
        }
    }
}
